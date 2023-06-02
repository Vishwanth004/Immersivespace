import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { SapiUsersClient } from "@spatialsys/js/sapi/clients/users"
import {
  GetFollowersResponse,
  GetFollowingResponse,
  GetSocialProfileRequest,
  SocialProfile,
  SpaceAndCreator,
} from "@spatialsys/js/sapi/types"

export type UserIdAndUsernameType = { userID: string; username: string }

export const GET_SOCIAL_PROFILE_QUERY_KEY = "GET_SOCIAL_PROFILE_QUERY"
export const makeSocialProfileQueryKey = (args: GetSocialProfileRequest) =>
  args.userID
    ? [GET_SOCIAL_PROFILE_QUERY_KEY, args.userID]
    : [GET_SOCIAL_PROFILE_QUERY_KEY, `username:${args.username}`]

export const useGetSocialProfileQuery = (
  sapiUsersClient: SapiUsersClient,
  query: GetSocialProfileRequest,
  options?: UseQueryOptions<SocialProfile, unknown, SocialProfile, string[]>
) => {
  return useQuery(makeSocialProfileQueryKey(query), () => sapiUsersClient.users.getSocialProfile(query), {
    // Defaults stale time to 1 min, user profiles don't change that often.
    staleTime: 60 * 1000,
    retry: 1,
    ...options,
  })
}

/**
 * Mutates user's SocialProfile optimistically. Note that the social profile query can use either
 * the `userId` or the `username` as the query key. Thus, when calling this function, you likely want to
 * call it twice, once with the `userId` and once with the `username`.
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with an old SocialProfile
 * @returns the previous social profile for the given userId or username
 */
export const mutateGetSocialProfileOptimistically = async (
  queryClient: QueryClient,
  args: GetSocialProfileRequest,
  mutateFn: (following: SocialProfile | undefined) => SocialProfile | undefined
) => {
  const querySocialProfileKey = makeSocialProfileQueryKey(args)
  const prevSocialProfileData = queryClient.getQueryData<SocialProfile>(querySocialProfileKey)

  await queryClient.cancelQueries(querySocialProfileKey)
  queryClient.setQueryData<SocialProfile>(querySocialProfileKey, mutateFn)

  return prevSocialProfileData
}

const GET_FOLLOWING_QUERY_KEY = "GET_FOLLOWING_QUERY"
export const useGetFollowingQuery = (
  sapiUsersClient: SapiUsersClient,
  userID: string,
  options?: UseQueryOptions<GetFollowingResponse, unknown, GetFollowingResponse, string[]>
) => {
  return useQuery(
    [GET_FOLLOWING_QUERY_KEY, userID],
    () =>
      sapiUsersClient.users.getFollowing({
        userID,
      }),
    options
  )
}

/**
 * Mutates user's following optimistically
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with an old GetFollowingResponse
 * @returns the previous data of that user's following
 */
const mutateGetFollowingOptimistically = async (
  queryClient: QueryClient,
  userID: string,
  mutateFn: (following: GetFollowingResponse | undefined) => GetFollowingResponse | undefined
) => {
  const queryFollowingKey = [GET_FOLLOWING_QUERY_KEY, userID]
  const prevFollowingData = queryClient.getQueryData<GetFollowingResponse>(queryFollowingKey)

  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries(queryFollowingKey)
  queryClient.setQueryData<GetFollowingResponse>(queryFollowingKey, mutateFn)

  return prevFollowingData
}

const GET_FOLLOWERS_QUERY_KEY = "GET_FOLLOWERS_QUERY"
export const useGetFollowersQuery = (
  sapiUsersClient: SapiUsersClient,
  userID: string,
  options?: UseQueryOptions<GetFollowersResponse, unknown, GetFollowersResponse, string[]>
) => {
  return useQuery(
    [GET_FOLLOWERS_QUERY_KEY, userID],
    () =>
      sapiUsersClient.users.getFollowers({
        userID,
      }),
    options
  )
}

/**
 * Mutates user's followers optimistically
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with an old GetFollowersResponse
 * @returns the previous data of that user's followers
 */
const mutateGetFollowersOptimistically = async (
  queryClient: QueryClient,
  userID: string,
  mutateFn: (following: GetFollowersResponse | undefined) => GetFollowersResponse | undefined
) => {
  const queryUserFollowersKey = [GET_FOLLOWERS_QUERY_KEY, userID]
  const prevFollowersData = queryClient.getQueryData<GetFollowersResponse>(queryUserFollowersKey)

  await queryClient.cancelQueries(queryUserFollowersKey)
  queryClient.setQueryData(queryUserFollowersKey, mutateFn)

  return prevFollowersData
}

const GET_USERS_PUBLISHED_SPACES_QUERY_KEY = "GET_USERS_PUBLISHED_SPACES_QUERY"
export const useGetUsersPublishedSpacesQuery = (
  sapiUsersClient: SapiUsersClient,
  userId: string,
  options?: UseQueryOptions<SpaceAndCreator[], unknown, SpaceAndCreator[], string[]>
) => {
  return useQuery(
    [GET_USERS_PUBLISHED_SPACES_QUERY_KEY, userId],
    () => sapiUsersClient.users.getPublishedSpaces(userId),
    options
  )
}

export const updateGetUsersPublishedSpacesCache = async (
  queryClient: QueryClient,
  mutateFn: (spaceAndCreatorList: SpaceAndCreator[]) => SpaceAndCreator[]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([GET_USERS_PUBLISHED_SPACES_QUERY_KEY])
  // Get all the spaces in the query cache using partial matching on `GET_USERS_PUBLISHED_SPACES_QUERY_KEY`
  const prevCacheData = queryClient.getQueriesData<SpaceAndCreator[]>([GET_USERS_PUBLISHED_SPACES_QUERY_KEY])

  prevCacheData.forEach(([key]) => {
    queryClient.setQueryData<SpaceAndCreator[]>(key, (prev) => {
      if (prev) {
        return mutateFn(prev)
      }

      return prev
    })
  })

  return prevCacheData
}

interface FollowUserMutationContext {
  prevLocalFollowingData: GetFollowingResponse | undefined
  prevUserFollowersData: GetFollowersResponse | undefined
  prevLocalProfileData: SocialProfile | undefined
  prevLocalProfileDataUsername: SocialProfile | undefined
  prevUserProfileData: SocialProfile | undefined
  prevUserProfileDataUsername: SocialProfile | undefined
}

type UseFollowUserMutationArgs = {
  localUserID: string
  localUsername: string
}

/**
 * The social profile query hook accepts either `userId` or `username` as the argument.
 * To account for this, we need to optimistically mutate the query cache for both the
 * `userId` and the `username`.
 */
export const useFollowUserMutation = (
  sapiUsersClient: SapiUsersClient,
  { localUserID, localUsername }: UseFollowUserMutationArgs,
  options?: UseMutationOptions<void, unknown, UserIdAndUsernameType, FollowUserMutationContext>
) => {
  const queryClient = useQueryClient()
  return useMutation((args) => sapiUsersClient.users.followUser({ userID: args.userID }), {
    ...options,
    onSettled: (_data, err, args, context) => {
      if (err) {
        if (context?.prevLocalFollowingData)
          queryClient.setQueryData([GET_FOLLOWING_QUERY_KEY, localUserID], context.prevLocalFollowingData)
        if (context?.prevUserFollowersData)
          queryClient.setQueryData([GET_FOLLOWERS_QUERY_KEY, args.userID], context.prevUserFollowersData)
        if (context?.prevUserProfileData)
          queryClient.setQueryData(makeSocialProfileQueryKey({ userID: args.userID }), context.prevUserProfileData)
        if (context?.prevUserProfileDataUsername)
          queryClient.setQueryData(
            makeSocialProfileQueryKey({ username: args.username }),
            context.prevUserProfileDataUsername
          )
        if (context?.prevLocalProfileData)
          queryClient.setQueryData(makeSocialProfileQueryKey({ userID: localUserID }), context.prevLocalProfileData)
        if (context?.prevLocalProfileDataUsername)
          queryClient.setQueryData(
            makeSocialProfileQueryKey({ username: localUsername }),
            context.prevLocalProfileDataUsername
          )
      }

      void queryClient.invalidateQueries([GET_FOLLOWING_QUERY_KEY, localUserID])
      void queryClient.invalidateQueries([GET_FOLLOWERS_QUERY_KEY, args.userID])
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ userID: localUserID }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ username: localUsername }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ userID: args.userID }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ username: args.username }))
    },
    onMutate: async (args) => {
      const prevUserProfileData = await mutateGetSocialProfileOptimistically(
        queryClient,
        { userID: args.userID },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowers: prev.numFollowers + 1 }
        }
      )
      const prevUserProfileDataUsername = await mutateGetSocialProfileOptimistically(
        queryClient,
        { username: args.username },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowers: prev.numFollowers + 1 }
        }
      )

      const prevLocalProfileData = await mutateGetSocialProfileOptimistically(
        queryClient,
        { userID: localUserID },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowing: prev.numFollowing + 1 }
        }
      )
      const prevLocalProfileDataUsername = await mutateGetSocialProfileOptimistically(
        queryClient,
        { username: localUsername },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowing: prev.numFollowing + 1 }
        }
      )

      const prevLocalFollowingData = await mutateGetFollowingOptimistically(queryClient, localUserID, (prev) => {
        if (prev === undefined) return undefined

        return {
          followings: [
            ...prev.followings,
            {
              userID: args.userID,
              username: prevUserProfileData?.username || "",
              avatarImageURL: prevUserProfileData?.avatarImageURL || "",
              displayName: prevUserProfileData?.displayName || "",
            },
          ],
        }
      })

      const prevUserFollowersData = await mutateGetFollowersOptimistically(queryClient, args.userID, (prev) => {
        if (prev === undefined) return undefined

        return {
          followers: [
            ...prev.followers,
            {
              userID: localUserID,
              username: prevLocalProfileData?.username || "",
              avatarImageURL: prevLocalProfileData?.avatarImageURL || "",
              displayName: prevLocalProfileData?.displayName || "",
            },
          ],
        }
      })

      return {
        prevLocalFollowingData,
        prevUserFollowersData,
        prevUserProfileData,
        prevUserProfileDataUsername,
        prevLocalProfileData,
        prevLocalProfileDataUsername,
      }
    },
  })
}

interface UnfollowUserMutationContext {
  prevLocalFollowingData: GetFollowingResponse | undefined
  prevUserFollowersData: GetFollowersResponse | undefined
  prevLocalProfileData: SocialProfile | undefined
  prevLocalProfileDataUsername: SocialProfile | undefined
  prevUserProfileData: SocialProfile | undefined
  prevUserProfileDataUsername: SocialProfile | undefined
}

type UseUnfollowUserMutationArgs = UseFollowUserMutationArgs

/**
 * The social profile query hook accepts either `userId` or `username` as the argument.
 * To account for this, we need to optimistically mutate the query cache for both the
 * `userId` and the `username`.
 */
export const useUnfollowUserMutation = (
  sapiUsersClient: SapiUsersClient,
  { localUserID, localUsername }: UseUnfollowUserMutationArgs,
  options?: UseMutationOptions<void, unknown, UserIdAndUsernameType, UnfollowUserMutationContext>
) => {
  const queryClient = useQueryClient()
  return useMutation((args) => sapiUsersClient.users.unfollowUser({ userID: args.userID }), {
    ...options,
    onSettled: (_data, err, args, context) => {
      if (err) {
        if (context?.prevLocalFollowingData)
          queryClient.setQueryData([GET_FOLLOWING_QUERY_KEY, localUserID], context.prevLocalFollowingData)
        if (context?.prevUserFollowersData)
          queryClient.setQueryData([GET_FOLLOWERS_QUERY_KEY, args.userID], context.prevUserFollowersData)
        if (context?.prevUserProfileData)
          queryClient.setQueryData(makeSocialProfileQueryKey({ userID: args.userID }), context.prevUserProfileData)
        if (context?.prevUserProfileDataUsername)
          queryClient.setQueryData(
            makeSocialProfileQueryKey({ username: args.username }),
            context.prevUserProfileDataUsername
          )
        if (context?.prevLocalProfileData)
          queryClient.setQueryData(makeSocialProfileQueryKey({ userID: localUserID }), context.prevLocalProfileData)
        if (context?.prevLocalProfileDataUsername)
          queryClient.setQueryData(
            makeSocialProfileQueryKey({ username: localUsername }),
            context.prevLocalProfileDataUsername
          )
      }

      void queryClient.invalidateQueries([GET_FOLLOWING_QUERY_KEY, localUserID])
      void queryClient.invalidateQueries([GET_FOLLOWERS_QUERY_KEY, args.userID])
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ userID: localUserID }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ username: localUsername }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ userID: args.userID }))
      void queryClient.invalidateQueries(makeSocialProfileQueryKey({ username: args.username }))
    },
    onMutate: async (args) => {
      const prevUserProfileData = await mutateGetSocialProfileOptimistically(
        queryClient,
        { userID: args.userID },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowers: prev.numFollowers - 1 }
        }
      )
      const prevUserProfileDataUsername = await mutateGetSocialProfileOptimistically(
        queryClient,
        { username: args.username },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowers: prev.numFollowers - 1 }
        }
      )

      const prevLocalProfileData = await mutateGetSocialProfileOptimistically(
        queryClient,
        { userID: localUserID },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowing: prev.numFollowing - 1 }
        }
      )
      const prevLocalProfileDataUsername = await mutateGetSocialProfileOptimistically(
        queryClient,
        { username: localUsername },
        (prev) => {
          if (prev === undefined) return undefined

          return { ...prev, numFollowing: prev.numFollowing - 1 }
        }
      )

      const prevLocalFollowingData = await mutateGetFollowingOptimistically(queryClient, localUserID, (prev) => {
        if (prev === undefined) return undefined

        return {
          followings: prev.followings.filter((v) => {
            return v.userID !== args.userID
          }),
        }
      })

      const prevUserFollowersData = await mutateGetFollowersOptimistically(queryClient, args.userID, (prev) => {
        if (prev === undefined) return undefined

        return {
          followers: prev.followers.filter((v) => {
            return v.userID !== localUserID
          }),
        }
      })

      return {
        prevLocalFollowingData,
        prevUserFollowersData,
        prevUserProfileData,
        prevUserProfileDataUsername,
        prevLocalProfileData,
        prevLocalProfileDataUsername,
      }
    },
  })
}
