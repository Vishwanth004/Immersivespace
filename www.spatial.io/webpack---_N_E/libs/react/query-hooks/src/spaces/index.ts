import {
  InfiniteData,
  QueryClient,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useMemo } from "react"

import {
  CreateCategoryRequest,
  DeleteCategoryRequest,
  DeleteCustomThumbnailRequest,
  EditCategoryRequest,
  EditFeedConfigRequest,
  FeaturedCarouselItem,
  GetCategoriesRequest,
  GetCategorySpacesResponse,
  GetFeaturedCarouselResponse,
  GetFeedConfigHistoryResponse,
  GetFeedForConfigRequest,
  GetFeedResponse,
  GetLovedSpacesRequest,
  GetLovedSpacesResponse,
  GetSpacesQueryType,
  GetSpacesRequest,
  GetSpacesResponse,
  GetTagAutocompleteRequest,
  GetTagAutocompleteResponse,
  ReportSpaceRequest,
  ReportSpaceResponse,
  SapiSpaceClient,
  SearchSpacesRequest,
  SearchSpacesResponse,
  SetCustomThumbnailRequest,
  SetCustomThumbnailResponse,
  SetSpaceLovedRequest,
  UploadReportImageRequest,
} from "@spatialsys/js/sapi/clients/spaces"
import {
  FeedCategory,
  FeedComponent,
  FeedConfig,
  FeedVideo,
  SpaceAndCreator,
  SpaceMetadata,
} from "@spatialsys/js/sapi/types"

import { debouncedQueryFunction } from "../debounced-query-function"
import { rollbackUsersPublishedSpacesCache } from "../sapi/user"
import { updateGetUsersPublishedSpacesCache } from "../users/profiles"

export const enum SpacesQueryKeys {
  GetCategories = "getCategories",
  GetCategory = "getCategory",
  GetCategorySpaces = "getCategorySpaces",
  GetFeaturedCarousel = "getFeaturedCarousel",
  GetLovedSpaces = "getLovedSpaces",
  GetFeed = "getFeed",
  GetFeedConfig = "getFeedConfig",
  GetFeedConfigHistory = "getFeedConfigHistory",
  GetSpaces = "getSpaces",
  GetSpacePreview = "GetSpacePreview",
  GetSpaceCategories = "getSpaceCategories",
  SearchSpaces = "searchSpaces",
  GetTagAutocomplete = "getTagAutocomplete",
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetSpacesCache = (
  queryClient: QueryClient,
  previousSpaces?: [QueryKey, GetSpacesResponse | undefined][]
) => {
  if (previousSpaces) {
    previousSpaces.forEach(([key, spaces]) => {
      if (spaces) {
        queryClient.setQueryData<GetSpacesResponse>(key, spaces)
      }
    })
  }
}

/**
 * Mutates a space optimistically, updating the `getSpaces` result in any cache that begins with {@link SpacesQueryKeys.GetSpaces}
 * Spaces can show up in multiple tabs which is why we fuzzy match on the key If a space is guaranteed to show up in only one tab,
 * we could instead optimistically updated only the key [SpacesQueryKeys.GetSpaces, queryType]
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a list of spaces. This function should update the list with
 * a new list if spaces, if applicable.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.GetSpaces}
 */
export const mutateGetSpacesOptimistically = async (
  queryClient: QueryClient,
  mutateFn: (spaces: SpaceAndCreator[]) => SpaceAndCreator[]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.GetSpaces])
  // Get all the spaces in the query cache using fuzzy matching on `SpacesQueryKeys.GetSpaces`
  const previousSpaces = queryClient.getQueriesData<GetSpacesResponse>([SpacesQueryKeys.GetSpaces])

  if (previousSpaces) {
    previousSpaces.forEach(([key]) => {
      queryClient.setQueryData<GetSpacesResponse>(key, (prev) => {
        return prev ? { ...prev, spaces: mutateFn(prev.spaces) } : undefined
      })
    })
  }

  return previousSpaces
}

/**
 * Fetches list of spaces.
 */
export const useGetSpacesQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: GetSpacesRequest,
  options?: Omit<
    UseQueryOptions<GetSpacesResponse, unknown, GetSpacesResponse, (SpacesQueryKeys | GetSpacesQueryType)[]>,
    "queryKey" | "queryFn"
  >
) => {
  const { type } = args
  return useQuery({
    ...options,
    queryKey: [SpacesQueryKeys.GetSpaces, type],
    queryFn: () => sapiSpaceClient.spaces.getSpaces({ type }),
  })
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetFeedCache = (queryClient: QueryClient, prev?: GetFeedResponse) => {
  if (prev) {
    queryClient.setQueryData<GetFeedResponse>([SpacesQueryKeys.GetFeed], prev)
  }
}

/**
 * Mutates a space optimistically, updating the `getFeed` result in any cache that begins with {@link SpacesQueryKeys.GetFeed}
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a list of feed items. This function should update each feed item with
 * a new list of spaces, if applicable.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.GetFeed}
 */
export const mutateGetFeedOptimistically = async (
  queryClient: QueryClient,
  mutateFn: (feed: GetFeedResponse) => GetFeedResponse
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.GetFeed])
  const previousFeed = queryClient.getQueryData<GetFeedResponse>([SpacesQueryKeys.GetFeed])

  queryClient.setQueryData<GetFeedResponse>([SpacesQueryKeys.GetFeed], (prev) => {
    if (prev) {
      return mutateFn(prev)
    }

    return prev
  })

  return previousFeed
}

/**
 * Fetches list of sections to be displayed in the feed.
 */
export const useGetFeedQuery = (
  sapiSpaceClient: SapiSpaceClient,
  options?: Omit<UseQueryOptions<GetFeedResponse, unknown, GetFeedResponse, SpacesQueryKeys[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    staleTime: 5000 * 60,
    ...options,
    queryKey: [SpacesQueryKeys.GetFeed],
    queryFn: () => sapiSpaceClient.spaces.getFeed(),
  })
}

/**
 * Fetches the feed for the given configuration.
 */
export const useGetFeedForConfigQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: GetFeedForConfigRequest,
  options?: Omit<UseQueryOptions<GetFeedResponse, unknown, GetFeedResponse, string[]>, "queryKey" | "queryFn">
) => {
  const argsKey = useMemo(() => JSON.stringify(args), [args])
  return useQuery({
    staleTime: 5000 * 60,
    ...options,
    queryKey: [SpacesQueryKeys.GetFeed, argsKey],
    queryFn: () => sapiSpaceClient.spaces.getFeedForConfig(args),
  })
}

/**
 * Fetches the current feed configuration
 */
export const useGetFeedConfigQuery = (
  sapiSpaceClient: SapiSpaceClient,
  options?: Omit<UseQueryOptions<FeedConfig, unknown, FeedConfig, SpacesQueryKeys[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    staleTime: 5000 * 60,
    ...options,
    queryKey: [SpacesQueryKeys.GetFeedConfig],
    queryFn: () => sapiSpaceClient.spaces.getFeedConfig(),
  })
}

/**
 * Edits the feed configuration
 */
export const useEditFeedConfigMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<void, unknown, EditFeedConfigRequest>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (args: EditFeedConfigRequest) => sapiSpaceClient.spaces.editFeedConfig(args),
    onSuccess: () => {
      void queryClient.invalidateQueries([SpacesQueryKeys.GetFeedConfig])
      void queryClient.invalidateQueries([SpacesQueryKeys.GetFeedConfigHistory])
    },
    ...options,
  })
}

/**
 * Fetches the feed configuration history
 */
export const useGetFeedConfigHistoryQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: { count: number },
  options?: UseInfiniteQueryOptions<
    GetFeedConfigHistoryResponse,
    unknown,
    GetFeedConfigHistoryResponse,
    GetFeedConfigHistoryResponse,
    [string]
  >
) => {
  const { count } = args
  return useInfiniteQuery({
    queryKey: [SpacesQueryKeys.GetFeedConfigHistory],
    queryFn: ({ pageParam = 0 }) => sapiSpaceClient.spaces.getFeedConfigHistory({ start: pageParam, count }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < count ? undefined : count * allPages.length
    },
    staleTime: 5000 * 60,
    ...options,
  })
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackSearchSpacesCache = (
  queryClient: QueryClient,
  previousSpaces?: [QueryKey, SearchSpacesResponse | undefined][]
) => {
  if (previousSpaces) {
    previousSpaces.forEach(([key, spaces]) => {
      if (spaces) {
        queryClient.setQueryData<SearchSpacesResponse>(key, spaces)
      }
    })
  }
}

/**
 * Updates searchSpaces cache, targeting all cache keys that begin with {@link SpacesQueryKeys.SearchSpaces}
 * Spaces can show up in multiple search queries which is why we fuzzy match on the key
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a list of spaces. This function should update the list with
 * a new list of spaces, if applicable.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.SearchSpaces}
 */
export const updateSearchSpacesCache = async (
  queryClient: QueryClient,
  mutateFn: (spaces: SpaceAndCreator[]) => SpaceAndCreator[]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.SearchSpaces])
  // Get all the spaces in the query cache using fuzzy matching on `SpacesQueryKeys.SearchSpaces`
  const previousSpaces = queryClient.getQueriesData<SearchSpacesResponse>([SpacesQueryKeys.SearchSpaces])

  if (previousSpaces) {
    previousSpaces.forEach(([key]) => {
      queryClient.setQueryData<SearchSpacesResponse>(key, (prev) => {
        return prev ? { ...prev, results: mutateFn(prev.results) } : undefined
      })
    })
  }

  return previousSpaces
}

/**
 * Search for a space
 */
export const useSearchSpacesQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: SearchSpacesRequest,
  options?: Omit<
    UseQueryOptions<SearchSpacesResponse, unknown, SearchSpacesResponse, (SpacesQueryKeys | string)[]>,
    "queryKey" | "queryFn"
  >
) => {
  const { query } = args
  return useQuery({
    enabled: Boolean(query), // Only execute if the query string is truthy
    ...options,
    queryKey: [SpacesQueryKeys.SearchSpaces, query],
    queryFn: () => sapiSpaceClient.spaces.searchSpaces({ query }),
  })
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetCategorySpacesCache = (
  queryClient: QueryClient,
  previousData?: [QueryKey, InfiniteData<GetCategorySpacesResponse> | undefined][]
) => {
  if (previousData) {
    previousData.forEach(([key, data]) => {
      if (data) {
        queryClient.setQueryData<InfiniteData<GetCategorySpacesResponse>>(key, data)
      }
    })
  }
}

/**
 * Updates getCategorySpaces cache, targeting all cache keys that begin with {@link SpacesQueryKeys.GetCategorySpaces}
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a list of spaces. This function should update the list with
 * a new list of spaces, if applicable.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.GetCategorySpaces}
 */
export const updateGetCategorySpacesCache = async (
  queryClient: QueryClient,
  mutateFn: (spaces: SpaceAndCreator[]) => SpaceAndCreator[]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.SearchSpaces])
  const previousCategories = queryClient.getQueriesData<InfiniteData<GetCategorySpacesResponse>>([
    SpacesQueryKeys.GetCategorySpaces,
  ])
  if (previousCategories) {
    for (const [key] of previousCategories) {
      // Go through each category
      queryClient.setQueryData<InfiniteData<GetCategorySpacesResponse>>(key, (category) => {
        if (!category) {
          return undefined
        }
        return {
          ...category,
          // Go through each page of the category's data and update the spaces in that page
          pages: category.pages.map((data) => {
            return {
              ...data,
              results: mutateFn(data.results),
            }
          }),
        }
      })
    }
  }

  return previousCategories
}

/**
 * Get spaces in a category
 */
export const useGetCategorySpacesQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: { category: string; count: number },
  options?: Omit<
    UseInfiniteQueryOptions<
      GetCategorySpacesResponse,
      unknown,
      GetCategorySpacesResponse,
      GetCategorySpacesResponse,
      (SpacesQueryKeys | string)[]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { category, count } = args
  return useInfiniteQuery({
    queryKey: [SpacesQueryKeys.GetCategorySpaces, category],
    queryFn: ({ pageParam = 0 }) => sapiSpaceClient.spaces.getCategorySpaces({ category, count, start: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // If the last result returned fewer than the requested count, there are no more results
      return lastPage.results.length < count ? undefined : count * allPages.length
    },
    ...options,
  })
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetCategoriesCache = (
  queryClient: QueryClient,
  previousCategories?: [QueryKey, FeedCategory[] | undefined][]
) => {
  if (previousCategories) {
    previousCategories.forEach(([key, categories]) => {
      if (categories) {
        queryClient.setQueryData<FeedCategory[]>(key, categories)
      }
    })
  }
}

/**
 * Mutates a category optimistically, updating the `getCategories` result in any cache that begins with {@link SpacesQueryKeys.GetCategories}
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a category. This function should update the category, if applicable.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.GetCategories}
 */
const mutateGetCategoriesOptimistically = async (
  queryClient: QueryClient,
  mutateFn: (categories: FeedCategory[]) => FeedCategory[]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.GetCategories])
  // Get all the categories in the query cache using fuzzy matching on `SpacesQueryKeys.GetCategories`
  const previousCategories = queryClient.getQueriesData<FeedCategory[]>([SpacesQueryKeys.GetCategories])

  if (previousCategories) {
    previousCategories.forEach(([key]) => {
      queryClient.setQueryData<FeedCategory[] | undefined>(key, (prev) => {
        if (prev) {
          return mutateFn(prev)
        }

        return prev
      })
    })
  }

  return previousCategories
}

/**
 * Mutates a category optimistically, updating all caches that contain the category.
 * @param queryClient The react-query client.
 * @param categoryId The ID (slug) of the category to mutate.
 * @param mutateCategoryFn A pure function that is called with the space to mutate. This function should return the mutated space.
 * @returns `rollbackFn` - a function that can be called to revert the query cache to its previous state, i.e. when a mutation fails.
 */
const mutateCategoryOptimistically = async (
  queryClient: QueryClient,
  categoryId: string,
  mutateCategoryFn: (category: FeedCategory) => FeedCategory
) => {
  const mutateFn = (data: FeedCategory) => {
    if (data.slug !== categoryId) {
      return data
    }
    return mutateCategoryFn(data)
  }

  const mutateArrayFn = (array: FeedCategory[]) => array.map(mutateFn)
  const previousCategories = await mutateGetCategoriesOptimistically(queryClient, mutateArrayFn)

  return (queryClient: QueryClient) => {
    rollBackGetCategoriesCache(queryClient, previousCategories)
  }
}

/**
 * Get all categories matching a query
 */
export const useGetCategories = (
  sapiSpaceClient: SapiSpaceClient,
  args: GetCategoriesRequest,
  options?: Omit<
    UseQueryOptions<FeedCategory[], unknown, FeedCategory[], (SpacesQueryKeys | string)[]>,
    "queryKey" | "queryFn"
  > & { debounceMs?: number }
) => {
  const { query } = args
  return useQuery({
    ...options,
    queryKey: [SpacesQueryKeys.GetCategories, query ?? ""],
    queryFn: debouncedQueryFunction(() => sapiSpaceClient.spaces.getCategories(args), options?.debounceMs ?? 0),
  })
}

export const useCreateCategoryMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<
    void,
    unknown,
    CreateCategoryRequest,
    {
      previousCategories: [QueryKey, FeedCategory[] | undefined][]
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (args: CreateCategoryRequest) => sapiSpaceClient.spaces.createCategory(args),
    onMutate: async ({ category }) => {
      const mutateFn = (categories: FeedCategory[]) => categories.concat(category)

      const previousCategories = await mutateGetCategoriesOptimistically(queryClient, mutateFn)

      return {
        previousCategories,
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [SpacesQueryKeys.GetCategories] })
      void queryClient.invalidateQueries({ queryKey: [SpacesQueryKeys.GetSpaceCategories] })
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _args, context) => {
      rollBackGetCategoriesCache(queryClient, context?.previousCategories)
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

export const useEditCategoryMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<
    void,
    unknown,
    EditCategoryRequest,
    {
      rollbackFn: (queryClient: QueryClient) => void
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation((args: EditCategoryRequest) => sapiSpaceClient.spaces.editCategory(args), {
    onMutate: async ({ category }) => {
      const mutateFn = (_: FeedCategory) => {
        return { ...category }
      }

      const rollbackFn = await mutateCategoryOptimistically(queryClient, category.slug, mutateFn)

      return {
        rollbackFn,
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _args, context) => {
      context?.rollbackFn(queryClient)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [SpacesQueryKeys.GetCategories] })
      void queryClient.invalidateQueries({ queryKey: [SpacesQueryKeys.GetSpaceCategories] })
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

export const useDeleteCategoryMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<
    void,
    unknown,
    DeleteCategoryRequest,
    {
      previousCategories: [QueryKey, FeedCategory[] | undefined][]
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (args: DeleteCategoryRequest) => sapiSpaceClient.spaces.deleteCategory(args),
    onMutate: async ({ category }) => {
      const mutateFn = (categories: FeedCategory[]) => categories.filter((c) => c.slug !== category)

      const previousCategories = await mutateGetCategoriesOptimistically(queryClient, mutateFn)

      // Return a context object with the snapshotted value
      return {
        previousCategories,
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _args, context) => {
      rollBackGetCategoriesCache(queryClient, context?.previousCategories)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [SpacesQueryKeys.GetCategories] })
      void queryClient.invalidateQueries({ queryKey: [SpacesQueryKeys.GetSpaceCategories] })
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetLovedSpacesCache = (
  queryClient: QueryClient,
  previousLovedSpaces?: [QueryKey, GetLovedSpacesResponse | undefined][]
) => {
  if (previousLovedSpaces) {
    previousLovedSpaces.forEach(([key, prev]) => {
      if (prev) {
        queryClient.setQueryData<GetLovedSpacesResponse>(key, prev)
      }
    })
  }
}

/**
 * Mutates a space optimistically, updating the `getLovedSpaces` result in any cache that begins with {@link SpacesQueryKeys.GetLovedSpaces}
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a dictionary of space IDs and whether the space is loved or not.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.GetLovedSpaces}
 */
export const mutateGetLovedSpacesOptimistically = async (
  queryClient: QueryClient,
  mutateFn: (spacesLoved: GetLovedSpacesResponse["spacesLoved"]) => GetLovedSpacesResponse["spacesLoved"]
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.GetLovedSpaces])
  // Get all the spaces in the query cache using fuzzy matching on `SpacesQueryKeys.GetLovedSpaces`
  const previousLovedSpaces = queryClient.getQueriesData<GetLovedSpacesResponse>([SpacesQueryKeys.GetLovedSpaces])

  previousLovedSpaces.forEach(([key]) => {
    queryClient.setQueryData<GetLovedSpacesResponse>(key, (prev) => {
      if (prev) {
        return {
          ...prev,
          spacesLoved: mutateFn(prev.spacesLoved),
        }
      }

      return prev
    })
  })

  return previousLovedSpaces
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetFeaturedCarouselCache = (queryClient: QueryClient, prev?: GetFeaturedCarouselResponse) => {
  if (prev) {
    queryClient.setQueryData<GetFeaturedCarouselResponse>([SpacesQueryKeys.GetFeaturedCarousel], prev)
  }
}

/**
 * Mutates a space optimistically, updating the `getLovedSpaces` result in any cache that begins with {@link SpacesQueryKeys.GetLovedSpaces}
 *
 * @param queryClient the react-query client
 * @param mutateFn a function that is called with a dictionary of space IDs and whether the space is loved or not.
 * @returns the cached data for all queries with key {@link SpacesQueryKeys.GetLovedSpaces}
 */
export const mutateGetFeaturedCarouselOptimistically = async (
  queryClient: QueryClient,
  mutateFn: (featured: GetFeaturedCarouselResponse) => GetFeaturedCarouselResponse
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries([SpacesQueryKeys.GetFeaturedCarousel])
  const prevFeaturedCarousel = queryClient.getQueryData<GetFeaturedCarouselResponse>([
    SpacesQueryKeys.GetFeaturedCarousel,
  ])

  queryClient.setQueryData<GetFeaturedCarouselResponse>([SpacesQueryKeys.GetFeaturedCarousel], (prev) => {
    if (prev) {
      return mutateFn(prev)
    }

    return prev
  })

  return prevFeaturedCarousel
}

/**
 * Mutates a space optimistically, updating all caches that contain the space.
 * @param queryClient The react-query client.
 * @param spaceId The ID of the space to mutate.
 * @param mutateSpaceFn A pure function that is called with the space to mutate. This function should return the mutated space.
 * @returns `rollbackFn` - a function that can be called to revert the query cache to its previous state, i.e. when a mutation fails.
 */
export const mutateSpaceOptimistically = async (
  queryClient: QueryClient,
  spaceId: string,
  mutateSpaceFn: (space: SpaceMetadata) => SpaceMetadata
) => {
  const mutateFn = (data: SpaceAndCreator) => {
    if (data.space.id !== spaceId) {
      return data
    }
    return {
      ...data,
      space: mutateSpaceFn(data.space),
    }
  }

  // FeedVideo and SpaceAndCreator can be handled the same way
  const mutateFeedComponentFn = <T extends { data: { spaces: Array<FeedVideo | SpaceAndCreator> } }>(item: T): T => {
    const newSpaces = item.data.spaces.map((space: FeedVideo | SpaceAndCreator) => {
      if (space.space?.id !== spaceId) {
        return space
      }
      return { ...space, space: mutateSpaceFn(space.space) }
    })
    return { ...item, data: { ...item.data, spaces: newSpaces } }
  }

  const mutateArrayFn = (array: SpaceAndCreator[]) => array.map(mutateFn)
  const previousSpaces = await mutateGetSpacesOptimistically(queryClient, mutateArrayFn)
  const previousPublishedSpaces = await updateGetUsersPublishedSpacesCache(queryClient, mutateArrayFn)
  const previousSearchSpaces = await updateSearchSpacesCache(queryClient, mutateArrayFn)
  const previousGetCategorySpaces = await updateGetCategorySpacesCache(queryClient, mutateArrayFn)
  const previousSpacePreview = await updateGetSpacePreviewCache(queryClient, spaceId, mutateFn)

  const previousFeaturedCarousel = await mutateGetFeaturedCarouselOptimistically(queryClient, (data) => {
    return data.map((slide): FeaturedCarouselItem => {
      if (!slide.space || slide.space.id !== spaceId) {
        return slide
      }
      return { ...slide, space: mutateSpaceFn(slide.space) }
    })
  })

  const previousFeed = await mutateGetFeedOptimistically(queryClient, (data) => {
    return {
      feedItems: data.feedItems.map((item): FeedComponent => mutateFeedComponentFn(item)),
    }
  })

  return (queryClient: QueryClient) => {
    rollBackGetSpacesCache(queryClient, previousSpaces)
    rollbackUsersPublishedSpacesCache(queryClient, previousPublishedSpaces)
    rollBackSearchSpacesCache(queryClient, previousSearchSpaces)
    rollBackGetCategorySpacesCache(queryClient, previousGetCategorySpaces)
    rollBackGetSpacePreviewCache(queryClient, spaceId, previousSpacePreview)
    rollBackGetFeaturedCarouselCache(queryClient, previousFeaturedCarousel)
    rollBackGetFeedCache(queryClient, previousFeed)
  }
}

/**
 * Given a list of spaces, returns if the user has loved each space or not
 */
export const useGetLovedSpacesQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: GetLovedSpacesRequest,
  options?: Omit<
    UseQueryOptions<GetLovedSpacesResponse, unknown, GetLovedSpacesResponse, (SpacesQueryKeys | string)[]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...options,
    queryKey: [SpacesQueryKeys.GetLovedSpaces, ...args.spaceIds],
    queryFn: () => sapiSpaceClient.spaces.getLovedSpaces(args),
  })
}

/**
 * Fetches the featured carousel
 */
export const useGetFeaturedCarouselQuery = (
  sapiSpaceClient: SapiSpaceClient,
  options?: Omit<
    UseQueryOptions<GetFeaturedCarouselResponse, unknown, GetFeaturedCarouselResponse, SpacesQueryKeys[]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    /**
     * This data rarely changes, and if it does it would cause a huge UI mixup — so set
     * staleTime to Infinity to avoid ever refetching
     */
    staleTime: Infinity,
    cacheTime: Infinity,
    queryKey: [SpacesQueryKeys.GetFeaturedCarousel],
    queryFn: sapiSpaceClient.spaces.getFeaturedCarousel,
    ...options,
  })
}

/**
 * Loves/unloves a space for the current user, then increments/decrements the love count depending on what the loved state changed to.
 * Updates the query cache optimistically, updating the space in all query caches that match `GET_SPACES_QUERY_KEY`
 * If the mutation fails, restores the cache to its previous value
 */
export const useSetSpaceLovedMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<
    void,
    unknown,
    SetSpaceLovedRequest,
    {
      previousLovedSpaces: [QueryKey, GetLovedSpacesResponse | undefined][]
      rollbackFn: (queryClient: QueryClient) => void
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation((args: SetSpaceLovedRequest) => sapiSpaceClient.space.setSpaceLoved(args), {
    onMutate: async ({ spaceId, isLoved }) => {
      const mutateFn = (space: SpaceMetadata) => {
        // Increment/decrement like count depending on state change.
        const loveCount = space.likeCount + (isLoved ? 1 : -1)
        return { ...space, likeCount: loveCount, liked: isLoved }
      }
      const rollbackFn = await mutateSpaceOptimistically(queryClient, spaceId, mutateFn)

      const previousLovedSpaces = await mutateGetLovedSpacesOptimistically(queryClient, (data) => {
        if (data[spaceId]) {
          return { ...data, [spaceId]: false }
        }
        return { ...data, [spaceId]: true }
      })

      // Return a context object with the snapshotted value
      return {
        previousLovedSpaces,
        rollbackFn,
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _args, context) => {
      rollBackGetLovedSpacesCache(queryClient, context?.previousLovedSpaces)
      context?.rollbackFn(queryClient)
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

/**
 * Sets a space's thumbnail
 * Updates the query cache, updating the space in all query caches that match `GET_SPACES_QUERY_KEY`
 * If the mutation fails, restores the cache to its previous value
 */
export const useSetCustomThumbnailMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<
    SetCustomThumbnailResponse,
    unknown,
    SetCustomThumbnailRequest,
    {
      rollbackFn: () => void
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation(sapiSpaceClient.space.setCustomThumbnail, {
    onSuccess: async (response, args) => {
      const mutateFn = (space: SpaceMetadata): SpaceMetadata => ({
        ...space,
        roomThumbnails: {
          ...space.roomThumbnails,
          customGetUrl: response.customGetUrl,
        },
      })

      const rollbackFn = await mutateSpaceOptimistically(queryClient, args.roomId, mutateFn)

      return {
        rollbackFn,
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, args, context) => {
      context?.rollbackFn()
    },
    // It's common practice to refetch all data after error or success using `onSettled`
    // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
    ...options,
  })
}

/**
 * Deletes a space's thumbnail
 * Updates the query cache optimistically, removing the thumbnail from all query caches that match `GET_SPACES_QUERY_KEY`
 * If the mutation fails, restores the cache to its previous value
 */
export const useDeleteCustomThumbnailMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<
    void,
    unknown,
    DeleteCustomThumbnailRequest,
    {
      rollbackFn: (queryClient: QueryClient) => void
    }
  >
) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (args: DeleteCustomThumbnailRequest) => {
      await sapiSpaceClient.space.deleteCustomThumbnail(args)
    },
    {
      onMutate: async ({ roomId }) => {
        const updateSpaceAndCreatorFn = (space: SpaceMetadata): SpaceMetadata => ({
          ...space,
          roomThumbnails: {
            ...space.roomThumbnails,
            customGetUrl: "",
          },
        })

        const rollbackFn = await mutateSpaceOptimistically(queryClient, roomId, updateSpaceAndCreatorFn)

        // Return a context object with the snapshotted value
        return { rollbackFn }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (_err, _roomToDelete, context) => {
        context?.rollbackFn(queryClient)
      },
      // It's common practice to refetch all data after error or success using `onSettled`
      // However, since there is so much data in the various query keys, we will avoid doing so in this scenario
      ...options,
    }
  )
}

export const useTagAutocompleteQuery = (
  sapiSpaceClient: SapiSpaceClient,
  request: GetTagAutocompleteRequest,
  options?: UseQueryOptions<GetTagAutocompleteResponse> & { debounceMs?: number }
) => {
  const { query } = request
  return useQuery({
    queryKey: [SpacesQueryKeys.GetTagAutocomplete, query],
    queryFn: debouncedQueryFunction(() => sapiSpaceClient.space.getTagAutocomplete(request), options?.debounceMs ?? 0),
    // No need to fetch if input is empty.
    enabled: query.length > 0,
    // Setting keepPreviousData prevents flickering when user types.
    // When input is empty, we don't want to show any previous suggestions, so we set keepPreviousData to true only if non-empty.
    keepPreviousData: query.length > 0,
    staleTime: 60 * 1000,
    ...options,
  })
}

/**
 * Choose a 5 minute stale time because this data does not change frequently, but is used
 * in various places like `RoomHead` and `LoadingSplash`. Setting a longer stale time prevents too many
 * requests in quick succession
 */
const GET_SPACE_PREVIEW_STALE_TIME = 5000 * 60

/**
 * Fetches space data. This query can be accessed without authentication.
 */
export const useGetSpacePreviewQuery = (
  sapiSpaceClient: SapiSpaceClient,
  spaceId: string,
  options?: UseQueryOptions<SpaceAndCreator, unknown, SpaceAndCreator, (SpacesQueryKeys | string)[]>
) => {
  return useQuery([SpacesQueryKeys.GetSpacePreview, spaceId], () => sapiSpaceClient.space.getSpacePreview(spaceId), {
    staleTime: GET_SPACE_PREVIEW_STALE_TIME,
    ...options,
  })
}

/** Reverts the query cache to its previous state using the provided context, i.e. when a mutation fails */
export const rollBackGetSpacePreviewCache = (
  queryClient: QueryClient,
  spaceId: string,
  previousResponse?: SpaceAndCreator
) => {
  const queryKey = [SpacesQueryKeys.GetSpacePreview, spaceId]
  if (previousResponse) {
    queryClient.setQueryData<SpaceAndCreator>(queryKey, previousResponse)
  }
}

/**
 * Updates the an individual entry for `getSpacePreview`
 *
 * @param queryClient the react-query client
 * @param spaceId the spaceId. Forms the query key `[{@link SpacesQueryKeys.GetSpacePreview}, spaceId]`
 * @param updateFn a function that is called with a single `SpaceAndCreator`.
 * @returns the cached data for the current cached entry `[{@link SpacesQueryKeys.GetSpacePreview}, spaceId]`
 */
export const updateGetSpacePreviewCache = async (
  queryClient: QueryClient,
  spaceId: string,
  updateFn: (response: SpaceAndCreator) => SpaceAndCreator
) => {
  const queryKey = [SpacesQueryKeys.GetSpacePreview, spaceId]
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries(queryKey)
  const prevQueryData = queryClient.getQueryData<SpaceAndCreator>(queryKey)

  queryClient.setQueryData<SpaceAndCreator>(queryKey, (prev) => {
    if (!prev) return undefined

    return updateFn(prev)
  })

  return prevQueryData
}

/**
 * Fetches a space's categories
 */
export const useGetSpaceCategories = (
  sapiSpaceClient: SapiSpaceClient,
  spaceId: string,
  options?: UseQueryOptions<FeedCategory[], unknown, FeedCategory[], (SpacesQueryKeys | string)[]>
) => {
  return useQuery(
    [SpacesQueryKeys.GetSpaceCategories, spaceId],
    () => sapiSpaceClient.space.getSpaceCategories(spaceId),
    {
      ...options,
    }
  )
}

/**
 * Sends a report for this space
 */
export const useReportSpaceMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<ReportSpaceResponse, unknown, ReportSpaceRequest>
) => {
  return useMutation(sapiSpaceClient.space.reportSpace, {
    ...options,
  })
}

/**
 * Uploads image for a given report to s3
 */
export const useUploadReportImageMutation = (
  sapiSpaceClient: SapiSpaceClient,
  options?: UseMutationOptions<void, unknown, UploadReportImageRequest>
) => {
  return useMutation(sapiSpaceClient.space.uploadReportImage, {
    ...options,
  })
}
