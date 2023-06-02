import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { SapiBadgesClient } from "@spatialsys/js/sapi/clients/badges"
import {
  CreateBadgeRequest,
  UpdateBadgeIconRequest,
  UpdateBadgeRequest,
} from "@spatialsys/js/sapi/clients/badges/endpoints/badges"
import { Badge, GetBadgeRequest, GetBadgeResponse } from "@spatialsys/js/sapi/types"

import { buildGetWorldsBadgesQueryKey } from "../worlds"

export type UserIdAndUsernameType = { userID: string; username: string }

export const GET_BADGE_QUERY_KEY = "GET_BADGE"
export const buildGetBadgeQueryKey = (args: GetBadgeRequest) => [GET_BADGE_QUERY_KEY, args.badgeId]
export const useGetBadgeQuery = (
  sapiBadgesClient: SapiBadgesClient,
  args: GetBadgeRequest,
  options?: UseQueryOptions<GetBadgeResponse>
) => {
  return useQuery({
    queryKey: buildGetBadgeQueryKey(args),
    queryFn: () => sapiBadgesClient.badges.getBadge(args),
    ...options,
  })
}

const invalidateWorldBadgeQueries = (queryClient: QueryClient, prevBadge: Badge) => {
  void queryClient.invalidateQueries({ queryKey: buildGetWorldsBadgesQueryKey({ worldId: prevBadge.worldID }) })
}

export const useCreateBadgeMutation = (
  sapiBadgesClient: SapiBadgesClient,
  options?: UseMutationOptions<Badge, unknown, CreateBadgeRequest>
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sapiBadgesClient.badges.createBadge,
    onSuccess(data) {
      queryClient.setQueryData(buildGetBadgeQueryKey({ badgeId: data.id }), data)
      invalidateWorldBadgeQueries(queryClient, data)
    },
    ...options,
  })
}

export const useUpdateBadgeMutation = (
  sapiBadgesClient: SapiBadgesClient,
  options?: UseMutationOptions<Badge, unknown, UpdateBadgeRequest>
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sapiBadgesClient.badges.updateBadge,
    onSuccess(data) {
      queryClient.setQueryData<Badge>(buildGetBadgeQueryKey({ badgeId: data.id }), (prev) => ({ ...prev, ...data }))
      invalidateWorldBadgeQueries(queryClient, data)
    },
    ...options,
  })
}

export const useUpdateBadgeThumbnailMutation = (
  sapiBadgeClient: SapiBadgesClient,
  options?: UseMutationOptions<Badge, unknown, UpdateBadgeIconRequest>
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sapiBadgeClient.badges.updateBadgeIcon,
    onSuccess(data) {
      const badgeId = data.id
      const prevBadge = queryClient.getQueryData<Badge>(buildGetBadgeQueryKey({ badgeId }))
      if (!prevBadge) return

      queryClient.setQueryData<Badge>(buildGetBadgeQueryKey({ badgeId: data.id }), {
        ...prevBadge,
      })
      invalidateWorldBadgeQueries(queryClient, data)
    },
    ...options,
  })
}
