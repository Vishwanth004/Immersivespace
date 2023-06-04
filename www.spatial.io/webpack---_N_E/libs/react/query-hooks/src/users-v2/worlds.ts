import { QueryClient, UseQueryOptions, useQuery } from "@tanstack/react-query"

import { SapiUsersV2Client } from "@spatialsys/js/sapi/clients/users-v2"
import { GetUsersWorldsRequest, GetUsersWorldsResponse } from "@spatialsys/js/sapi/clients/users-v2/endpoints/worlds"

export const GET_USERS_WORLDS_QUERY_KEY = "GET_USERS_WORLDS"

export const useGetUsersWorldsQuery = (
  sapiUsersV2Client: SapiUsersV2Client,
  args: GetUsersWorldsRequest,
  options?: UseQueryOptions<GetUsersWorldsResponse>
) => {
  return useQuery({
    queryKey: [GET_USERS_WORLDS_QUERY_KEY, args.userId],
    queryFn: () => sapiUsersV2Client.worlds.getUsersWorlds(args),
    /** This shouldn't change very often, so set a stale time of 5 minutes */
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

/**
 * Updates usersWorlds cache, targeting all cache keys that begin with {@link GET_USERS_WORLDS_QUERY_KEY}
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a list of spaces. This function should update the list with
 * a new list of spaces, if applicable.
 */
export const updateUsersWorldsCache = async (
  queryClient: QueryClient,
  mutateFn: (worlds: GetUsersWorldsResponse["worlds"]) => GetUsersWorldsResponse["worlds"]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([GET_USERS_WORLDS_QUERY_KEY])
  const cacheEntries = queryClient.getQueriesData<GetUsersWorldsResponse>([GET_USERS_WORLDS_QUERY_KEY])

  if (cacheEntries) {
    cacheEntries.forEach(([key]) => {
      queryClient.setQueryData<GetUsersWorldsResponse>(key, (prev) => {
        return prev ? { ...prev, worlds: mutateFn(prev.worlds) } : undefined
      })
    })
  }

  return cacheEntries
}
