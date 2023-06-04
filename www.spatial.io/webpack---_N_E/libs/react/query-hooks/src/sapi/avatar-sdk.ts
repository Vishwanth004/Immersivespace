import { UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useEffect, useMemo } from "react"
import { useInterval } from "react-use"

import {
  AvatarPreviewResponse,
  AvatarSdkDto,
  AvatarSdkPlayer,
  AvatarSdkStatus,
  AvatarSdkToken,
  CreateAvatarArgs,
  CreateAvatarResponse,
  SapiClient,
  UserData,
} from "@spatialsys/js/sapi/clients/sapi"
import { AvatarSdkDataOnboarding } from "@spatialsys/js/sapi/types"

export const GET_AVATAR_SDK_TOKEN_QUERY_KEY = ["GET_AVATAR_SDK_TOKEN"]

/**
 * [The avatar SDK docs](https://api.avatarsdk.com/#api-basics) don't specify how long the access token is
 * valid for. Marking it as stale after 1 hour seems reasonable.
 */
const GET_AVATAR_SDK_TOKEN_STALE_TIME = 1000 * 60 * 60 // 1 hour

/** Fetch the AvatarSDK token */
export const useAvatarSdkTokenQuery = (
  sapiClient: SapiClient,
  isAuthenticated: boolean,
  options?: UseQueryOptions<AvatarSdkToken, unknown, AvatarSdkToken, string[]>
) => {
  return useQuery(GET_AVATAR_SDK_TOKEN_QUERY_KEY, () => sapiClient.avatars.getAvatarSdkToken(), {
    staleTime: GET_AVATAR_SDK_TOKEN_STALE_TIME,
    refetchInterval: GET_AVATAR_SDK_TOKEN_STALE_TIME,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    /**  Wait until user is authenticated before sending this request */
    enabled: isAuthenticated,
    ...options,
  })
}

type AvatarSdkTokenQuery = { avatarSdkToken: AvatarSdkToken } & Omit<UseQueryResult<AvatarSdkToken, unknown>, "data">

/**
 * A convenience wrapper around `useAvatarSdkTokenQuery` to get the avatar SDK token.
 * It renames the `data` field to `avatarSdkToken` and explicitly types it as `AvatarSdkToken` rather
 * than `AvatarSdkToken | undefined`. There must be an ancestor `RequiresAvatarSdkToken`
 * somewhere in the component tree for this type guarantee to hold true.
 */
export function useAvatarSdkToken(sapiClient: SapiClient): AvatarSdkTokenQuery {
  const { data, ...rest } = useAvatarSdkTokenQuery(sapiClient, true)
  return { avatarSdkToken: data as AvatarSdkToken, ...rest }
}

export const GET_AVATAR_PREVIEW_QUERY_KEY = "avatarSdkGetAvatarPreview"

/**
 * Fetch the preview image from avatar SDK for a given avatar ID
 * This query will only be called when `token` and `avatarId` are both defined.
 */
export const useGetAvatarPreviewQuery = (
  sapiClient: SapiClient,
  previewUrl?: string,
  options?: UseQueryOptions<AvatarPreviewResponse, unknown, AvatarPreviewResponse, (string | undefined)[]>
) => {
  return useQuery(
    [GET_AVATAR_PREVIEW_QUERY_KEY, previewUrl],
    () => sapiClient.avatars.getAvatarPreview(previewUrl as string),
    {
      // Only run the query when avatarID is defined
      enabled: Boolean(previewUrl),
      // The preview for a given avatarId will never change.
      // There is no way to update an avatar's image after it has been created
      staleTime: Infinity,
      ...options,
    }
  )
}

export const GET_AVATAR_QUERY_KEY = "avatarSdkGetAvatar"

const useGetAvatarQuery = (
  sapiClient: SapiClient,
  code: string,
  token: AvatarSdkToken,
  playerUid: string,
  options?: UseQueryOptions<AxiosResponse<AvatarSdkDto>, unknown, AxiosResponse<AvatarSdkDto>, string[]>
) => {
  return useQuery([GET_AVATAR_QUERY_KEY, code], () => sapiClient.avatars.getAvatarInfo(code, token, playerUid), options)
}

const useCreateAvatarMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<AxiosResponse<CreateAvatarResponse>, unknown, CreateAvatarArgs>
) => {
  return useMutation(sapiClient.avatars.uploadAvatar, options)
}

const useCreateAvatarSdkUserMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<AxiosResponse<AvatarSdkPlayer>, unknown, { user: string; token: AvatarSdkToken }>
) => {
  return useMutation(
    (args: { user: string; token: AvatarSdkToken }) => sapiClient.avatars.createAvatarSDKUser(args.user, args.token),
    options
  )
}

const REFETCH_INTERVAL_MS = 2500

/**
 * Makes requests and manages state for creating an AvatarSDK avatar.
 * - Creates a playerUID if one does not exist already
 * - Returns `createAvatarMutation` for creating an avatar
 * - Polls ASDK (`avatarInfoQuery`) while an avatar is being created
 *
 * @param avatarSdkDataOnboarding if enabled, we always fetch avatar info. Otherwise, we only fetch
 * after a successful `createAvatar` mutation
 */
export const useCreateAvatar = (
  sapiClient: SapiClient,
  user: UserData,
  avatarSdkDataOnboarding?: AvatarSdkDataOnboarding
) => {
  const { avatarSdkToken } = useAvatarSdkToken(sapiClient)

  // Note: the existing code is also calling `uploadToS3`, but I have no clue why...
  // It doesn't seem like it's being used?
  const createAvatarMutation = useCreateAvatarMutation(sapiClient)
  const createAvatarSdkUserMutation = useCreateAvatarSdkUserMutation(sapiClient)

  const playerUid = user.avatarData?.avatarUserID || createAvatarSdkUserMutation.data?.data.code

  const avatarInfoQuery = useGetAvatarQuery(
    sapiClient,
    (avatarSdkDataOnboarding ? avatarSdkDataOnboarding.avatarID : createAvatarMutation.data?.data.code) as string,
    avatarSdkToken,
    (avatarSdkDataOnboarding ? avatarSdkDataOnboarding.avatarUserID : playerUid) as string,
    {
      /** This is fired right after the mutation succeeds */
      enabled: createAvatarMutation.isSuccess || Boolean(avatarSdkDataOnboarding),
    }
  )

  const isProcessing = useMemo(() => {
    return (
      avatarInfoQuery.data?.data.status === "Uploading" ||
      avatarInfoQuery.data?.data.status === "Queued" ||
      avatarInfoQuery.data?.data.status === "Computing"
    )
  }, [avatarInfoQuery.data?.data.status])

  /** Poll while the avatar is being created */
  useInterval(
    () => {
      void avatarInfoQuery.refetch()
    },
    isProcessing ? REFETCH_INTERVAL_MS : null
  )

  /** If player ID doesn't exist yet, create one. */
  useEffect(() => {
    if (!user.avatarData?.avatarUserID && createAvatarSdkUserMutation.isIdle) {
      createAvatarSdkUserMutation.mutate({ user: user.id, token: avatarSdkToken })
    }
  }, [avatarSdkToken, createAvatarSdkUserMutation, user.avatarData?.avatarUserID, user.id])

  return {
    avatarInfoQuery,
    createAvatarMutation,
    data: avatarInfoQuery.data,
    isComplete: avatarInfoQuery.data?.data.status === AvatarSdkStatus.Completed,
    isProcessing,
    isReadyToCreate: Boolean(playerUid),
    playerUid,
  }
}
