import { AxiosInstance } from "axios"

import { Badge, Item, World } from "../../../types"

export type GetWorldsItemsRequest = {
  worldId: string
}

export type UpdateWorldRequest = {
  description: string
  displayName: string
  worldId: string
}

export type GetWorldsPublishedItemsResponse = {
  continuationToken: string
  items: Item[]
}

export type GetWorldsItemsResponse = {
  items: Item[]
}

export type GetWorldRequest = {
  worldId: string
}

export type GetWorldsBadgesRequest = {
  worldId: string
}
export type GetWorldsBadgesResponse = {
  badges: Badge[]
}

export type GetWorldCurrencyRequest = { worldId: string }

export function createWorldsEndpoint(client: AxiosInstance) {
  return {
    /** Get a world by ID */
    async getWorld({ worldId }: GetWorldRequest) {
      const response = await client.get<World>(`/${worldId}`)
      return response.data
    },

    /** Update a world by ID */
    async updateWorld({ worldId, ...rest }: UpdateWorldRequest) {
      const response = await client.put<World>(`/${worldId}`, rest)
      return response.data
    },

    /**
     * Gets all _published_ items associated with a world
     */
    async getPublishedItems({ worldId }: GetWorldsItemsRequest) {
      const response = await client.get<GetWorldsPublishedItemsResponse>(`/${worldId}/shop`)
      return response.data
    },

    /**
     * Gets all items associated with a world, published and unpublished
     */
    async getItems({ worldId }: GetWorldsItemsRequest) {
      const response = await client.get<GetWorldsItemsResponse>(`/${worldId}/items`)
      return response.data
    },

    /**
     * Gets all badges associated with a world
     */
    async getBadges({ worldId }: GetWorldsBadgesRequest) {
      const response = await client.get<GetWorldsBadgesResponse>(`/${worldId}/badges`)
      return response.data
    },

    /**
     * Gets currency for a world, if it exists. Returns 404 if it doesn't exist
     */
    async getCurrency({ worldId }: GetWorldCurrencyRequest) {
      const response = await client.get<Item>(`/${worldId}/currency`)
      return response.data
    },
  }
}

export type WorldsEndpoint = ReturnType<typeof createWorldsEndpoint>
