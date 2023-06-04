import {
  InfiniteData,
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  DeleteRoomRequest,
  EditRoomRequest,
  GetRoomContentsResponse,
  GetTokenGateAccessResponse,
  SapiClient,
  SetTokenGateAccessRequest,
} from "@spatialsys/js/sapi/clients/sapi"
import {
  GetCategorySpacesResponse,
  GetFeedResponse,
  GetSpacesResponse,
  SearchSpacesResponse,
} from "@spatialsys/js/sapi/clients/spaces"
import {
  FeedVideo,
  GetRoomArgs,
  GetRoomResponse,
  SAPIRoom,
  SpaceAndCreator,
  SpaceMetadata,
  TokenGateConfig,
} from "@spatialsys/js/sapi/types"

import {
  mutateGetFeedOptimistically,
  mutateGetSpacesOptimistically,
  mutateSpaceOptimistically,
  rollBackGetCategorySpacesCache,
  rollBackGetFeedCache,
  rollBackGetSpacesCache,
  rollBackSearchSpacesCache,
  updateGetCategorySpacesCache,
  updateSearchSpacesCache,
} from "../spaces"
import { updateGetUsersPublishedSpacesCache } from "../users/profiles"
import { rollbackUsersPublishedSpacesCache } from "./user"

const GET_SPACE_QUERY_KEY = "space"
const GET_SPATIAL_PARK_QUERY_KEY = ["park"]

/**
 * Fetch a single space
 *
 * This query does not combine its cache with `useSpacesQuery`. We could consider doing this in the future, but the complexity would be quite huge
 */
export const useSpaceQuery = (
  sapiClient: SapiClient,
  args: GetRoomArgs,
  options?: UseQueryOptions<GetRoomResponse, unknown, GetRoomResponse, string[]>
) => {
  return useQuery(makeSpaceQueryConfig(sapiClient, args, options))
}

export const makeSpaceQueryConfig = (
  sapiClient: SapiClient,
  args: GetRoomArgs,
  options?: UseQueryOptions<GetRoomResponse, unknown, GetRoomResponse, string[]>
) => {
  return {
    queryKey: [GET_SPACE_QUERY_KEY, args.roomId],
    queryFn: () => sapiClient.rooms.getRoom(args),
    ...options,
  }
}

export const useSpatialParkQuery = (
  sapiClient: SapiClient,
  options?: UseQueryOptions<SAPIRoom, unknown, SAPIRoom, string[]>
) => {
  return useQuery(GET_SPATIAL_PARK_QUERY_KEY, sapiClient.rooms.getSpatialPark, {
    /** Never cache this request, since the instance to join can change very frequently. */
    cacheTime: 0,
    ...options,
  })
}

/**
 * Edit the name, description, and tags of a space
 * Updates the query cache optimistically, updating the space in all query caches that match `GET_SPACES_QUERY_KEY`
 * If the mutation fails, restores the cache to its previous value
 */
export const useEditSpaceMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<
    void,
    unknown,
    EditRoomRequest,
    {
      rollbackFn: (queryClient: QueryClient) => void
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation(sapiClient.rooms.editRoomDetails, {
    onMutate: async ({ roomId, name, description, tags }) => {
      const mutateFn = (space: SpaceMetadata) => ({
        ...space,
        name,
        description: description ?? space.description,
        tags: tags ?? space.tags,
      })

      const rollbackFn = await mutateSpaceOptimistically(queryClient, roomId, mutateFn)

      return {
        rollbackFn,
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, args, context) => {
      context?.rollbackFn(queryClient)
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

/**
 * Deletes a space
 * Updates the query cache optimistically, removing the deleted space from all query caches that match `GET_SPACES_QUERY_KEY`
 * If the mutation fails, restores the cache to its previous value
 */
export const useDeleteSpaceMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<
    void,
    unknown,
    DeleteRoomRequest,
    {
      previousSpaces: [QueryKey, GetSpacesResponse | undefined][]
      previousPublishedSpaces: [QueryKey, SpaceAndCreator[] | undefined][]
      previousSearchSpaces: [QueryKey, SearchSpacesResponse | undefined][]
      previousGetCategorySpaces: [QueryKey, InfiniteData<GetCategorySpacesResponse> | undefined][]
      previousFeed: GetFeedResponse | undefined
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (args: DeleteRoomRequest) => {
      return sapiClient.rooms.deleteRoom(args)
    },
    onMutate: async ({ roomId }) => {
      const updateFn = (data: SpaceAndCreator[]) =>
        data.filter((spaceAndCreator) => spaceAndCreator.space.id !== roomId)

      // FeedVideo and SpaceAndCreator can be handled the same way
      const updateFeedComponentFn = <T extends { data: { spaces: Array<FeedVideo | SpaceAndCreator> } }>(
        item: T
      ): T => {
        return {
          ...item,
          data: {
            ...item.data,
            spaces: item.data.spaces.filter((space) => space.space?.id !== roomId),
          },
        }
      }

      const previousSpaces = await mutateGetSpacesOptimistically(queryClient, updateFn)
      const previousPublishedSpaces = await updateGetUsersPublishedSpacesCache(queryClient, updateFn)
      const previousSearchSpaces = await updateSearchSpacesCache(queryClient, updateFn)
      const previousGetCategorySpaces = await updateGetCategorySpacesCache(queryClient, updateFn)
      const previousFeed = await mutateGetFeedOptimistically(queryClient, (data) => {
        return {
          feedItems: data.feedItems.map((item) => updateFeedComponentFn(item)),
        }
      })

      // Return a context object with the snapshotted value
      return {
        previousSpaces,
        previousPublishedSpaces,
        previousSearchSpaces,
        previousGetCategorySpaces,
        previousFeed,
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _roomToDelete, context) => {
      rollBackGetSpacesCache(queryClient, context?.previousSpaces)
      rollbackUsersPublishedSpacesCache(queryClient, context?.previousPublishedSpaces)
      rollBackSearchSpacesCache(queryClient, context?.previousSearchSpaces)
      rollBackGetCategorySpacesCache(queryClient, context?.previousGetCategorySpaces)
      rollBackGetFeedCache(queryClient, context?.previousFeed)
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

export enum ThumbnailType {
  Persistent = "PERSISTENT",
  Transient = "TRANSIENT",
  Cubemap = "CUBEMAP",
  Custom = "CUSTOM",
}

export const GET_ROOM_CONTENTS_QUERY_KEY = "roomContents"

/**
 * Get the room contents of a space as a JSON object. We immediately mark the response as stale
 */
export const useGetSpaceContentsQuery = (
  sapiClient: SapiClient,
  { roomId }: GetRoomArgs,
  options?: UseQueryOptions<GetRoomContentsResponse, unknown, GetRoomContentsResponse, string[]>
) => {
  return useQuery([GET_ROOM_CONTENTS_QUERY_KEY, roomId], () => sapiClient.rooms.getRoomContents({ roomId }), {
    /** Never cache this, always re-fetch the room contents */
    cacheTime: 0,
    staleTime: 0,
    ...options,
  })
}

export const useSetTokenGateAccessMutation = (
  sapiClient: SapiClient,
  options?: UseMutationOptions<
    void,
    unknown,
    SetTokenGateAccessRequest,
    { prevConfig: TokenGateConfig | undefined; queryKey: QueryKey }
  >
) => {
  const queryClient = useQueryClient()
  return useMutation((args: SetTokenGateAccessRequest) => sapiClient.rooms.setTokenGateAccess(args), {
    onMutate: (args: SetTokenGateAccessRequest) => {
      const queryKey = [GET_TOKEN_GATE_ACCESS_QUERY_KEY, args.roomId]
      const config = args.config
      const prevConfig = queryClient.getQueryData<TokenGateConfig>(queryKey)

      queryClient.setQueryData<TokenGateConfig>(queryKey, (prev) => {
        return prev ? { ...prev, ...config } : config
      })

      return { prevConfig, queryKey }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _args, context) => {
      if (context?.prevConfig) {
        queryClient.setQueryData(context.queryKey, context.prevConfig)
      }
    },
    // Always refetch after error or success
    onSettled: (_data, _err, _args, context) => {
      void queryClient.invalidateQueries(context?.queryKey)
    },
    ...options,
  })
}

export const GET_TOKEN_GATE_ACCESS_QUERY_KEY = "tokenGate"

export const useGetTokenGateAccessQuery = (
  sapiClient: SapiClient,
  roomId: string,
  options?: UseQueryOptions<GetTokenGateAccessResponse, unknown, GetTokenGateAccessResponse, string[]>
) => {
  return useQuery([GET_TOKEN_GATE_ACCESS_QUERY_KEY, roomId], () => sapiClient.rooms.getTokenGateAccess(roomId), {
    retry: false,
    ...options,
  })
}
