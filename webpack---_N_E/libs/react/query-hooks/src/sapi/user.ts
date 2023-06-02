import {
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  AcknowledgeNotificationRequest,
  IntegrationsResponse,
  PatchUserRequest,
  SapiClient,
  SetKeybindsRequest,
  UserData,
  VerifyNFTOwnedByUserRequest,
} from "@spatialsys/js/sapi/clients/sapi"
import { formatAvatarMixpanelProperties } from "@spatialsys/js/sapi/helpers"
import {
  AvatarData,
  PatchSocialProfileDataRequest,
  SetRecentEmotesRequest,
  SocialProfile,
  SpaceAndCreator,
  VerifyNFTResponse,
} from "@spatialsys/js/sapi/types"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"

import { makeSocialProfileQueryKey, mutateGetSocialProfileOptimistically } from "../users/profiles"

export const GET_ME_QUERY_KEY = ["getMe"]

/**
 * Fetch the current user's profile. This hook is mounted in the application globally, and the profile is never re-fetched automatically — it must be re-fetched manually.
 * It may be preferable to refetch on an interval (say, every 10 minutes), to try to keep up to sync with changes made elsewhere (i.e. in another browser), but
 * this caused problems with long-term sessions (see DEV-10810)
 *
 * `cacheTime` is set to `Infinity` because there we never want this query to be garbage collected. The user profile is ALWAYS required throughout the entire application.
 */
export const useMeQuery = (
  sapiClient: SapiClient,
  isAuthenticated: boolean,
  options?: UseQueryOptions<UserData, unknown, UserData, string[]>
) => {
  return useQuery(GET_ME_QUERY_KEY, () => sapiClient.users.getMe(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    /**  Wait until user is authenticated before sending this request */
    enabled: isAuthenticated,
    ...options,
  })
}

export const updateGetMeCache = async (queryClient: QueryClient, updateFn: (userData: UserData) => UserData) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries(GET_ME_QUERY_KEY)

  // Optimistically update the user profile in the cache
  const previousUserProfile = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)
  queryClient.setQueryData<UserData>(GET_ME_QUERY_KEY, (prev) => {
    if (!prev) return undefined

    return updateFn(prev)
  })

  return previousUserProfile
}

/**
 * Save user's avatar data. Optimistically mutates the user profile in cache, and refetches on error or success.
 */
export const useSaveAvatarDataMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<void, unknown, AvatarData, { previousUserProfile: UserData | undefined }>
) => {
  const queryClient = useQueryClient()
  const trackInteraction = useTrackInteraction()

  return useMutation(sapiClient.avatars.saveAvatarData, {
    onMutate: async (avatarData) => {
      // Get the subset of properties that we want to track.
      trackInteraction(
        { name: InteractionName.SaveAvatarData, type: InteractionType.Submission },
        formatAvatarMixpanelProperties(avatarData)
      )

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(GET_ME_QUERY_KEY)

      // Optimistically update the user profile in the cache
      const previousUserProfile = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)
      queryClient.setQueryData<UserData>(GET_ME_QUERY_KEY, (prev) => {
        if (!prev) {
          return undefined
        }
        return {
          ...prev,
          avatarData,
        }
      })

      // Return a context object with the snapshotted value
      return { previousUserProfile }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newUser, context) => {
      if (context?.previousUserProfile) {
        queryClient.setQueryData(GET_ME_QUERY_KEY, context.previousUserProfile)
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      void queryClient.invalidateQueries(GET_ME_QUERY_KEY)
    },
    ...options,
  })
}

export const rollbackUsersPublishedSpacesCache = (
  queryClient: QueryClient,
  previousSpaces?: [QueryKey, SpaceAndCreator[] | undefined][]
) => {
  if (previousSpaces) {
    previousSpaces.forEach(([key, spaces]) => {
      if (spaces) {
        queryClient.setQueryData<SpaceAndCreator[]>(key, spaces)
      }
    })
  }
}

type SocialProfileMutateContext = {
  rollbackFn: (queryClient: QueryClient) => void
}

export const usePatchMySocialProfileMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<
    void,
    unknown,
    PatchSocialProfileDataRequest & { username: string },
    SocialProfileMutateContext
  >
) => {
  const queryClient = useQueryClient()
  return useMutation(({ username: _, ...args }) => sapiClient.users.patchSocialProfile(args), {
    ...options,
    onMutate: async (args) => {
      const profileData = args.profileData as SocialProfile

      const derivedFields: Partial<SocialProfile> = {
        bannerSpaceID: profileData.profileBackgroundSpaceID,
      }

      const prevData = await mutateGetSocialProfileOptimistically(queryClient, { userID: args.userID }, (prev) => {
        return {
          ...prev,
          ...profileData,
          ...derivedFields,
        }
      })
      const prevDataUsername = await mutateGetSocialProfileOptimistically(
        queryClient,
        { username: args.username },
        (prev) => {
          return {
            ...prev,
            ...profileData,
            ...derivedFields,
          }
        }
      )
      const prevUserProfile = await updateGetMeCache(queryClient, (prev) => {
        return {
          ...prev,
          displayName: profileData.displayName ?? prev.displayName,
          userSocialProfile: {
            ...prev.userSocialProfile,
            ...profileData,
            ...derivedFields,
          },
        }
      })

      return {
        rollbackFn: (queryClient) => {
          queryClient.setQueryData(makeSocialProfileQueryKey({ userID: args.userID }), prevData)
          queryClient.setQueryData(makeSocialProfileQueryKey({ username: args.username }), prevDataUsername)
          queryClient.setQueryData(GET_ME_QUERY_KEY, prevUserProfile)
        },
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, args, context) => {
      context?.rollbackFn(queryClient)
    },
    onSettled: (_data, _err, args) => {
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ userID: args.userID }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ username: args.username }))
      void queryClient.invalidateQueries(GET_ME_QUERY_KEY)
    },
  })
}

const GET_INTEGRATION_QUERY_KEY = ["GET_INTEGRATION"]
export const useGetIntegrationsQuery = (
  sapiClient: SapiClient,
  options?: UseQueryOptions<IntegrationsResponse, unknown, IntegrationsResponse, string[]>
) => {
  return useQuery(GET_INTEGRATION_QUERY_KEY, () => sapiClient.integrations.getIntegrationResponse(), options)
}

const GET_NFT_VERIFICATION_QUERY_KEY = "GET_NFT_OWNERSHIP_VERIFICATION"
export const useNftVerificationQuery = (
  sapiClient: SapiClient,
  args: VerifyNFTOwnedByUserRequest,
  options?: UseQueryOptions<VerifyNFTResponse, unknown, VerifyNFTResponse, (string | VerifyNFTOwnedByUserRequest)[]>
) => {
  return useQuery([GET_NFT_VERIFICATION_QUERY_KEY, args], () => sapiClient.users.verifyNFTOwnedByUser(args), options)
}

export const getAcknowledgeNotificationsOptions = (
  sapiClient: SapiClient,
  queryClient: QueryClient
): UseMutationOptions<void, unknown, AcknowledgeNotificationRequest, { previousUserProfile: UserData | undefined }> => {
  return {
    mutationFn: (req: AcknowledgeNotificationRequest) => {
      return sapiClient.users.acknowledgeNotification(req)
    },
    onMutate: async (notification) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(GET_ME_QUERY_KEY)

      // Optimistically update the user profile in the cache
      const previousUserProfile = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)

      queryClient.setQueryData<UserData>(GET_ME_QUERY_KEY, (prev) => {
        if (!prev) {
          return undefined
        }
        const prevNotifs = prev?.acknowledgedInAppNotificationKeys ?? []
        const newNotifs = prevNotifs.concat([notification.notification])
        return {
          ...prev,
          acknowledgedInAppNotificationKeys: newNotifs,
        }
      })

      // Return a context object with the snapshotted value
      return { previousUserProfile }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, req, context?) => {
      if (context?.previousUserProfile) {
        queryClient.setQueryData(GET_ME_QUERY_KEY, context.previousUserProfile)
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      void queryClient.invalidateQueries(GET_ME_QUERY_KEY)
    },
  }
}

export const useAcknowledgeNotificationMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<
    void,
    unknown,
    AcknowledgeNotificationRequest,
    { previousUserProfile: UserData | undefined }
  >
) => {
  const queryClient = useQueryClient()
  return useMutation({ ...getAcknowledgeNotificationsOptions(sapiClient, queryClient), ...options })
}

/**
 * Update the current user's profile. Optimistically updates the user object in the query cache. If something goes wrong, reverts to the previous state
 * In either case of success or error, re-fetches the user profile.
 *
 * Warning: the logic here can be misleading because SAPI accepts values in the request that are named differently from the actual user object response on /me.
 * For example, SAPI accepts an argument `acceptTerms: boolean`, which it uses to set `acceptTerms: timestamp` on the user object.
 * Logic is added to set `acceptedPrivacyPolicy` if `acceptPrivacyPolicy` is true in the payload, but there may be fields that are not accounted for.
 * To be safe, consumers of this mutation should consider manually awaiting a `refetch` after the mutation succeeds,
 * before considering the operation to be completed successfully.
 */
export const usePatchMeMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<void, unknown, PatchUserRequest, { previousUserProfile: UserData | undefined }>
) => {
  const queryClient = useQueryClient()

  return useMutation((user: PatchUserRequest) => sapiClient.users.patchMe(user), {
    onMutate: async (newUser) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(GET_ME_QUERY_KEY)

      // Optimistically update the user profile in the cache
      const previousUserProfile = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)
      const { acceptPrivacyPolicy, acceptUpdatedPrivacyPolicy, acceptTerms, termsType, acceptUpdatedTerms } = newUser
      const timestamp = new Date().toISOString()
      const acceptedEarlyTerms = acceptTerms && termsType === "EARLY"
      const acceptedStandardTerms = acceptTerms && termsType === "STANDARD"
      queryClient.setQueryData<UserData>(GET_ME_QUERY_KEY, (prev) => {
        if (!prev) return undefined

        return {
          ...prev,
          ...newUser,
          // Manually update these values for onboarding flow to proceed seamlessly
          acceptedEarlyTerms: acceptedEarlyTerms ? timestamp : prev.acceptedEarlyAccessTerms,
          acceptedStandardTerms: acceptedStandardTerms ? timestamp : prev.acceptedStandardTerms,
          acceptedSept2022StandardTerms:
            acceptedStandardTerms || acceptUpdatedTerms ? timestamp : prev.acceptedSept2022StandardTerms,
          acceptedPrivacyPolicy: acceptPrivacyPolicy ? timestamp : prev.acceptedPrivacyPolicy,
          acceptedSept2022PrivacyPolicy:
            acceptPrivacyPolicy || acceptUpdatedPrivacyPolicy ? timestamp : prev.acceptedSept2022PrivacyPolicy,
        }
      })

      // Return a context object with the snapshotted value
      return { previousUserProfile }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newUser, context) => {
      if (context?.previousUserProfile) {
        queryClient.setQueryData(GET_ME_QUERY_KEY, context.previousUserProfile)
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      void queryClient.invalidateQueries(GET_ME_QUERY_KEY)
    },
    ...options,
  })
}

/**
 * In this mutation, we optimistically update the user's recent emotes.
 * We don't rollback if the mutation fails, since this would be pretty disruptive in the UI.
 * Instead, we just keep the optimistically mutated state, and the state will "revert" when the user refreshes the page — that's ok.
 * This also means that we don't re-fetch the user profile on success or on error(which isn't needed in this case).
 */
export const useUpdateRecentEmotesMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<void, unknown, SetRecentEmotesRequest>
) => {
  const queryClient = useQueryClient()
  return useMutation((args) => sapiClient.users.updateRecentEmotes(args), {
    onMutate: async (args) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(GET_ME_QUERY_KEY)
      const previousUserProfile = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)

      // Optimistically update the user profile in the cache
      queryClient.setQueryData<UserData>(GET_ME_QUERY_KEY, (prev) => {
        if (!prev) return undefined
        return {
          ...prev,
          recentEmotes: args.recentEmotes,
        }
      })

      // Return a context object with the snapshotted value
      return { previousUserProfile }
    },
    ...options,
  })
}

/**
 * In this mutation, we optimistically update the user's recent keybinds.
 * We don't rollback if the mutation fails, since this would be pretty disruptive in the UI.
 * Instead, we just keep the optimistically mutated state, and the state will "revert" when the user refreshes the page — that's ok.
 * This also means that we don't re-fetch the user profile on success or on error(which isn't needed in this case).
 */
export const useUpdateKeybindsMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<void, unknown, SetKeybindsRequest>
) => {
  const queryClient = useQueryClient()
  return useMutation((args) => sapiClient.users.updateKeybindings(args), {
    onMutate: async (args) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(GET_ME_QUERY_KEY)
      const previousUserProfile = queryClient.getQueryData<UserData>(GET_ME_QUERY_KEY)

      // Optimistically update the user profile in the cache
      queryClient.setQueryData<UserData>(GET_ME_QUERY_KEY, (prev) => {
        if (!prev) return undefined
        return {
          ...prev,
          keybinds: args.keybinds,
        }
      })

      // Return a context object with the snapshotted value
      return { previousUserProfile }
    },
    ...options,
  })
}
