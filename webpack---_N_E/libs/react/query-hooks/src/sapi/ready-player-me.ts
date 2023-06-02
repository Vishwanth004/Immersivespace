import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { SpatialLogger } from "@spatialsys/js/logger"
import {
  RpmAvatarJsonMetadata,
  RpmRenderApiRequest,
  RpmRenderApiResponse,
  RpmRenderApiScene,
  SAPILogChannel,
  SapiClient,
  UserData,
} from "@spatialsys/js/sapi/clients/sapi"
import { AvatarData } from "@spatialsys/js/sapi/types"
// FIXME: This import is not correct. We should have a common Logger interface that both mobile/logger and js/logger adhere to.
import type { Logger } from "@spatialsys/mobile/logger"

import { GET_ME_QUERY_KEY, useSaveAvatarDataMutation } from "./user"

const GET_RPM_AVATAR_METADATA_QUERY_KEY = "getRpmAvatarmetdata"

/**
 * Gets the metadata for an RPM avatar.
 */
const useGetRpmAvatarMetadataQuery = (
  sapiClient: SapiClient,
  glbUrl: string,
  options?: UseQueryOptions<RpmAvatarJsonMetadata, unknown, RpmAvatarJsonMetadata, string[]>
) => {
  return useQuery([GET_RPM_AVATAR_METADATA_QUERY_KEY, glbUrl], () => sapiClient.avatars.getRpmAvatarMetadata(glbUrl), {
    /**
     * RPM rewrites to the same URL when an avatar is updated, rather than generating a new URL.
     * Thus, we always consider the data stale after fetching by explicitly setting staleTime to 0.
     */
    staleTime: 0,
    ...options,
  })
}

/**
 * Creates a thumbnail of an RPM avatar. See https://docs.readyplayer.me/render-api/render-api for full docs
 */
const useCreateRpmThumbnailMutation = (
  sapiClient: SapiClient,
  logger: SpatialLogger | Logger,
  options?: UseMutationOptions<RpmRenderApiResponse, unknown, RpmRenderApiRequest>
) => {
  const queryClient = useQueryClient()
  const saveAvatarDataMutation = useSaveAvatarDataMutation(sapiClient)

  return useMutation(sapiClient.avatars.createRpmThumbnail, {
    onSuccess: (response, reqBody) => {
      if (response.renders.length > 0) {
        const key =
          reqBody.scene === RpmRenderApiScene.LowerBodyPortraitTransparentV1 ||
          reqBody.scene === RpmRenderApiScene.LowerBodyPortraitV1
            ? "lowerBody"
            : "upperBody"

        const userData = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)
        const newAvatarData: AvatarData = {
          ...userData?.avatarData,
          readyPlayerMeUrl: reqBody.model,
          readyPlayerMeThumbnails: { ...userData?.avatarData?.readyPlayerMeThumbnails, [key]: response.renders[0] },
        }
        // This mutation will optimistically update the user profile, and revert it on error.
        saveAvatarDataMutation.mutate(newAvatarData)
      }
    },
    // Since this is not a SAPI call, we log the error ourselves for some basic metrics.
    onError: (error) => {
      // Check logger type and log accordingly between SpatialLogger and Logger
      if (logger instanceof SpatialLogger) {
        logger.error(SAPILogChannel, "Failed to create RPM thumbnail", error as Error)
      } else {
        logger.error(error as Error)
      }
    },
    ...options,
  })
}

const RPM_DEFAULT_ARMATURE = "ArmatureTargetMale"

/**
 * Generates an RPM avatar thumbnail for the current user if needed
 * i.e. if an RPM avatar exists but no thumbnail exists, generate RPM thumbnail
 * This functionality is disabled by default. You must explicitly enable it.
 *
 * @param enabled Enables background generation
 * @param glbUrlOverride A url to use instead of `avatarData.readyPlayerMeUrl`
 */
export const useGenerateRpmThumbnailIfNeeded = (
  sapiClient: SapiClient,
  logger: SpatialLogger | Logger,
  user?: UserData,
  enabled = false,
  glbUrlOverride?: string,
  onThumbnailGenerated?: (resp: RpmRenderApiResponse) => void
) => {
  const glbUrl = glbUrlOverride ?? (user?.avatarData?.readyPlayerMeUrl as string)
  const hasRpmAvatar = Boolean(glbUrl)
  const hasRpmThumbnail = Boolean(user?.avatarData?.readyPlayerMeThumbnails?.upperBody)

  const createRpmThumbnailMutation = useCreateRpmThumbnailMutation(sapiClient, logger)

  // If the user has an RPM avatar but no thumbnail, fetch the metadata, then generate the thumbnail
  const { data } = useGetRpmAvatarMetadataQuery(sapiClient, glbUrl, {
    // We only enable this query if the user has an RPM avatar, but no thumbnail
    enabled: hasRpmAvatar && !hasRpmThumbnail && enabled,
    onSettled(data) {
      if (!createRpmThumbnailMutation.isLoading) {
        // This mutation will directly mutate `user.avatarData`, and save it to SAPI
        createRpmThumbnailMutation.mutate(
          {
            model: glbUrl,
            scene: RpmRenderApiScene.UpperBodyTransparentSpatial,
            armature: data
              ? data.outfitGender === "masculine"
                ? "ArmatureTargetMale"
                : "ArmatureTargetFemale"
              : RPM_DEFAULT_ARMATURE,
          },
          { onSuccess: onThumbnailGenerated }
        )
      }
    },
  })

  return { isGenerating: createRpmThumbnailMutation.isLoading, rpmAvatarMetadata: data }
}
