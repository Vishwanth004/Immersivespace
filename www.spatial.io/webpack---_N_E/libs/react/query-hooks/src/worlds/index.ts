import { UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { SapiWorldsClient } from "@spatialsys/js/sapi/clients/worlds"
import {
  GetWorldCurrencyRequest,
  GetWorldRequest,
  GetWorldsBadgesRequest,
  GetWorldsBadgesResponse,
  GetWorldsItemsRequest,
  GetWorldsItemsResponse,
  GetWorldsPublishedItemsResponse,
} from "@spatialsys/js/sapi/clients/worlds/endpoints"
import { Item, World } from "@spatialsys/js/sapi/types"

import { updateUsersWorldsCache } from "../users-v2/worlds"

const GET_WORLD_QUERY_KEY = "GET_WORLD"
export const buildGetWorldQueryKey = (args: GetWorldRequest) => [GET_WORLD_QUERY_KEY, args.worldId]

export const useGetWorldQuery = (
  sapiWorldsClient: SapiWorldsClient,
  args: GetWorldRequest,
  options?: UseQueryOptions<World>
) => {
  return useQuery({
    queryKey: buildGetWorldQueryKey(args),
    queryFn: () => sapiWorldsClient.api.getWorld(args),
    /** This shouldn't change very often, so set a stale time of 5 minutes */
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

export const useUpdateWorldMutation = (sapiWorldsClient: SapiWorldsClient) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sapiWorldsClient.api.updateWorld,
    onSuccess(data) {
      queryClient.setQueryData(buildGetWorldQueryKey({ worldId: data.id }), data)
      void updateUsersWorldsCache(queryClient, (worlds) => {
        return worlds.map((world) => {
          return world.id === data.id ? data : world
        })
      })
    },
  })
}

const GET_WORLDS_PUBLISHED_ITEMS_QUERY_KEY = "GET_WORLDS_PUBLISHED_ITEMS"
export const buildGetWorldsPublishedItemsQueryKey = (args: GetWorldsItemsRequest) => [
  GET_WORLDS_PUBLISHED_ITEMS_QUERY_KEY,
  args.worldId,
]
export const useGetWorldsPublishedItemsQuery = (
  sapiWorldsClient: SapiWorldsClient,
  args: GetWorldsItemsRequest,
  options?: UseQueryOptions<GetWorldsPublishedItemsResponse>
) => {
  return useQuery({
    queryKey: buildGetWorldsPublishedItemsQueryKey(args),
    queryFn: () => sapiWorldsClient.api.getPublishedItems(args),
    /** This shouldn't change very often, so set a stale time of 5 minutes */
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

const GET_WORLDS_ITEMS_QUERY_KEY = "GET_WORLDS_ITEMS"
export const buildGetWorldsItemsQueryKey = (args: GetWorldsItemsRequest) => [GET_WORLDS_ITEMS_QUERY_KEY, args.worldId]
export const useGetWorldsItemsQuery = (
  sapiWorldsClient: SapiWorldsClient,
  args: GetWorldsItemsRequest,
  options?: UseQueryOptions<GetWorldsItemsResponse>
) => {
  return useQuery({
    queryKey: buildGetWorldsItemsQueryKey(args),
    queryFn: () => sapiWorldsClient.api.getItems(args),
    /** This shouldn't change very often, so set a stale time of 5 minutes */
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

const GET_WORLDS_BADGES_QUERY_KEY = "GET_WORLDS_BADGES"
export const buildGetWorldsBadgesQueryKey = (args: GetWorldsItemsRequest) => [GET_WORLDS_BADGES_QUERY_KEY, args.worldId]
export const useGetWorldsBadgesQuery = (
  sapiWorldsClient: SapiWorldsClient,
  args: GetWorldsBadgesRequest,
  options?: UseQueryOptions<GetWorldsBadgesResponse>
) => {
  return useQuery({
    queryKey: buildGetWorldsBadgesQueryKey(args),
    queryFn: () => sapiWorldsClient.api.getBadges(args),
    /** This shouldn't change very often, so set a stale time of 5 minutes */
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

const GET_WORLD_CURRENCY_QUERY_KEY = "GET_WORLD_CURRENCY"
export const buildGetWorldCurrencyQueryKey = (args: GetWorldCurrencyRequest) => [
  GET_WORLD_CURRENCY_QUERY_KEY,
  args.worldId,
]
export const useGetWorldCurrencyQuery = (
  sapiWorldsClient: SapiWorldsClient,
  args: GetWorldCurrencyRequest,
  options?: UseQueryOptions<Item>
) => {
  return useQuery({
    queryKey: buildGetWorldCurrencyQueryKey(args),
    queryFn: () => sapiWorldsClient.api.getCurrency(args),
    /** This shouldn't change very often, so set a stale time of 5 minutes */
    staleTime: 5 * 60 * 1000,
    /** Do not retry on error, it probably means currency for the world doesn't exist */
    retry: false,
    ...options,
  })
}
