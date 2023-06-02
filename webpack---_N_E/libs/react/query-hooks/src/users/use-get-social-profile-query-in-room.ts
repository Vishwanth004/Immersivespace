import { UseQueryOptions, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { SapiUsersClient } from "@spatialsys/js/sapi/clients/users"
import { GetSocialProfileRequest, SocialProfile } from "@spatialsys/js/sapi/types"
import { ActorMetaData, SocialProfileState } from "@spatialsys/unity/app-state"

import { makeSocialProfileQueryKey, useGetSocialProfileQuery } from "./profiles"

/**
 * Creates a SocialProfile from a SocialProfileState
 */
const getSocialProfile = (userID: string, state: SocialProfileState): SocialProfile => ({
  ...state,
  userID,
  avatarImageURL: state.profilePictureURL,
})

type Options = {
  /**
   * If true, it will always use the social profile from the Unity app state if available.
   * Otherwise, it will use the Unity app state only if the user is authless.
   */
  preferUnityAppState?: boolean
}

/**
 * Get the social profile of a participant in a room.
 * It sends a request to the server if the user is not authless.
 * Otherwise, it reads the social profile from the Unity app state, since authless users do not have a SAPI profile.
 */
export const useGetSocialProfileQueryInRoom = (
  sapiUsersClient: SapiUsersClient,
  query: GetSocialProfileRequest,
  participantMetadata: ActorMetaData | undefined,
  options?: UseQueryOptions<SocialProfile, unknown, SocialProfile, string[]> & Options
) => {
  const { preferUnityAppState = false } = { ...options }

  const [isAuthless, setIsAuthless] = useState(participantMetadata?.isAuthless)
  useEffect(() => {
    if (participantMetadata) {
      setIsAuthless(participantMetadata.isAuthless)
    }
  }, [participantMetadata])

  const queryClient = useQueryClient()

  const userId = query.userID

  useEffect(() => {
    if ((isAuthless || preferUnityAppState) && participantMetadata && userId) {
      const authlessSocialProfile = getSocialProfile(userId, participantMetadata.socialProfile)
      queryClient.setQueryData(makeSocialProfileQueryKey({ userID: userId }), authlessSocialProfile)
    }
  }, [isAuthless, participantMetadata, userId, queryClient, preferUnityAppState])

  const result = useGetSocialProfileQuery(sapiUsersClient, query, {
    enabled: !(isAuthless || (preferUnityAppState && participantMetadata)),
    ...options,
  })

  return {
    ...result,
    isAuthless,
  }
}
