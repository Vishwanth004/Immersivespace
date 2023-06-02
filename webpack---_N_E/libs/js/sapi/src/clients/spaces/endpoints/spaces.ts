import { AxiosInstance, AxiosRequestConfig } from "axios"

import {
  Badge,
  CreatorMetadata,
  FeedCategory,
  FeedComponent,
  FeedConfig,
  SpaceAndCreator,
  SpaceMetadata,
} from "../../../types"

/**
 * The value in this enum should be the value sent to SAPI
 * in the `type` query parameter of `getSpaces`.
 */
export enum GetSpacesQueryType {
  Admin = "admin",
  LiveNow = "live",
  Loved = "loved",
  Newest = "newest",
  Popular = "popular",
  Recent = "recent",
  Team = "team",
  Trending = "trending",
  YourSpaces = "my_space",
}

/**
 * A subset of `GetSpacesQueryType` which can be fetched without authentication
 */
export const publicGetSpacesQueries = [
  GetSpacesQueryType.Trending,
  GetSpacesQueryType.Popular,
  GetSpacesQueryType.LiveNow,
  GetSpacesQueryType.Newest,
]

/**
 * A subset of `GetSpacesQueryType` that can be fetched only be fetched by an authenticated user
 */
export const authenticatedGetSpacesQueries = [GetSpacesQueryType.Recent, GetSpacesQueryType.YourSpaces]

export type GetSpacesRequest = {
  type: GetSpacesQueryType
}

/** Defined in SAPI `services/explore/explore.go` */
export type GetSpacesResponse = {
  spaces: SpaceAndCreator[]
  title: string
  type: GetSpacesQueryType
}

export type SearchSpacesRequest = {
  query: string
}

export type SearchSpacesResponse = { results: SpaceAndCreator[] }

export type GetCategorySpacesResponse = {
  results: SpaceAndCreator[]
  title: string
}

export type GetCategorySpacesRequest = {
  category: string
  count?: number
  start?: number
}

export type GetCategoriesRequest = {
  count?: number
  query?: string
}

export type GetCategoryRequest = {
  category: string
}

export type EditCategoryRequest = {
  category: FeedCategory
}

export type CreateCategoryRequest = {
  category: FeedCategory
}

export type DeleteCategoryRequest = {
  category: string
}

export type GetFeedResponse = { feedItems: FeedComponent[] }

export type GetFeedForConfigRequest = AxiosRequestConfig & { config: FeedConfig["config"] }

export type EditFeedConfigRequest = {
  feedConfig: FeedConfig
}

export type GetFeedConfigHistoryRequest = {
  count: number
  start: number
}

export type GetFeedConfigHistoryResponse = FeedConfig[]

export type GetLovedSpacesRequest = { spaceIds: string[] }
export type GetLovedSpacesResponse = {
  spacesLoved: Record<string, boolean>
}

/**
 * A single item in the featured carousel
 */
export type FeaturedCarouselItem = {
  badge?: Badge
  creator?: CreatorMetadata
  ctaTitle: string
  ctaUrl?: string
  description: string
  id: string
  /** Integer */
  position: number
  space?: SpaceMetadata
  title: string
  /** A S3 path in `spatial-public-assets` bucket, without the `.mp4` suffix. */
  videoPath: string
}

export type GetFeaturedCarouselResponse = FeaturedCarouselItem[]

export function createSpacesEndpoints(client: AxiosInstance) {
  return {
    /**
     * For now, this request is not paginated. We will add pagination in "v2" of live explore.
     */
    async getSpaces({ type }: GetSpacesRequest): Promise<GetSpacesResponse> {
      const resp = await client.get<GetSpacesResponse>(`/rooms`, { params: { type } })
      return { ...resp.data, type }
    },
    async searchSpaces({ query }: SearchSpacesRequest): Promise<SearchSpacesResponse> {
      const resp = await client.get<SearchSpacesResponse>(`/search`, { params: { query } })
      return resp.data
    },
    async getCategorySpaces({ category, count, start }: GetCategorySpacesRequest): Promise<GetCategorySpacesResponse> {
      const resp = await client.get<GetCategorySpacesResponse>(`/feed/categories/${category}`, {
        params: { start, count },
      })
      return resp.data
    },
    async getCategories({ query, count }: GetCategoriesRequest): Promise<FeedCategory[]> {
      const resp = await client.get<FeedCategory[]>(`/categories`, { params: { count, query } })
      return resp.data
    },
    async getCategory({ category }: GetCategoryRequest): Promise<FeedCategory> {
      const resp = await client.get<FeedCategory>(`/categories/${category}`)
      return resp.data
    },
    async editCategory({ category }: EditCategoryRequest): Promise<void> {
      await client.put(`/categories/${category.slug}`, category)
      return
    },
    async createCategory({ category }: CreateCategoryRequest): Promise<void> {
      await client.post(`/categories`, category)
      return
    },
    async deleteCategory({ category }: DeleteCategoryRequest): Promise<void> {
      await client.delete(`/categories/${category}`)
      return
    },
    async getFeed(options?: AxiosRequestConfig): Promise<GetFeedResponse> {
      const resp = await client.get<GetFeedResponse>(`/feed`, options)
      return resp.data
    },
    async getFeedForConfig({ config, ...options }: GetFeedForConfigRequest): Promise<GetFeedResponse> {
      const resp = await client.post<GetFeedResponse>("/feed", config, options)
      return resp.data
    },
    async getFeedConfig(): Promise<FeedConfig> {
      const resp = await client.get("/feed/config")
      return resp.data
    },
    async editFeedConfig({ feedConfig }: EditFeedConfigRequest): Promise<void> {
      await client.post("/feed/config", feedConfig)
      return
    },
    async getFeedConfigHistory({ count, start }: GetFeedConfigHistoryRequest): Promise<GetFeedConfigHistoryResponse> {
      const resp = await client.get(`/feed/config/history`, { params: { count, start } })
      return resp.data
    },
    async getLovedSpaces({ spaceIds }: GetLovedSpacesRequest): Promise<GetLovedSpacesResponse> {
      const resp = await client.post<GetLovedSpacesResponse>(`/rooms/love`, {
        roomIDs: spaceIds,
      })
      return resp.data
    },
    async getFeaturedCarousel(): Promise<GetFeaturedCarouselResponse> {
      const resp = await client.get<GetFeaturedCarouselResponse>("/featured")
      return resp.data
    },
  }
}

export type SpacesEndpoint = ReturnType<typeof createSpacesEndpoints>
