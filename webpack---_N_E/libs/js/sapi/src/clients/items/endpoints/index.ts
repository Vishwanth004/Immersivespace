import { AxiosInstance } from "axios"

import { Item, WorldCurrencyPriceUpdate } from "../../../types"

export type GetItemRequest = { itemId: string }

export type CreateItemRequest = Pick<
  Item,
  | "assetSKU"
  | "consumable"
  | "consumableCoolDownInSeconds"
  | "consumableDurationInSeconds"
  | "description"
  | "name"
  /** For now, omit scope from the request, it is derived by SAPI and cannot be edited */
  // | "scope"
  | "shopListed"
  | "stackable"
  | "type"
  | "worldID"
> & { worldCurrencyPrice: WorldCurrencyPriceUpdate }

export type UpdateItemRequest = Pick<
  Item,
  | "consumable"
  | "consumableCoolDownInSeconds"
  | "consumableDurationInSeconds"
  | "description"
  | "id"
  | "name"
  /** For now, omit scope from the request, it is derived by SAPI and cannot be edited */
  // | "scope"
  | "shopListed"
  | "stackable"
  | "worldID"
> & { worldCurrencyPrice: WorldCurrencyPriceUpdate }
export type PublishItemRequest = GetItemRequest
export type UnpublishItemRequest = GetItemRequest

export type UpdateItemThumbnailRequest = { itemId: string; thumbnail: Blob }
export type DeleteItemThumbnailRequest = { itemId: string }

export function createItemsEndpoint(client: AxiosInstance) {
  return {
    async getItem(req: GetItemRequest) {
      const response = await client.get<Item>(`/${req.itemId}`)
      return response.data
    },

    /** Create a new item */
    async createItem(req: CreateItemRequest) {
      const response = await client.post<Item>("", req)
      return response.data
    },

    /** Update a new item */
    async updateItem(req: UpdateItemRequest) {
      const { id, worldCurrencyPrice, ...rest } = req
      // When updating an item, the `worldCurrencyPrice` properties must be trimmed
      // to omit certain fields like `currencyID`
      const worldCurrencyPriceFormatted = worldCurrencyPrice
        ? { price: worldCurrencyPrice.price, quantity: worldCurrencyPrice.quantity }
        : null
      const response = await client.put<Item>(`/${id}`, { ...rest, worldCurrencyPrice: worldCurrencyPriceFormatted })
      return response.data
    },
    async updateItemThumbnail(req: UpdateItemThumbnailRequest) {
      const response = await client.put<Item>(`/${req.itemId}/thumbnail`, req.thumbnail)
      return response.data
    },
    async deleteItemThumbnail(req: DeleteItemThumbnailRequest) {
      await client.delete<void>(`/${req.itemId}/thumbnail`)
    },

    /** Publish an item */
    async publishItem(req: PublishItemRequest) {
      const response = await client.post<void>(`/${req.itemId}/publish`)
      return response.data
    },

    /** Unpublish an item */
    async unpublishItem(req: UnpublishItemRequest) {
      const response = await client.post<void>(`/${req.itemId}/unpublish`)
      return response.data
    },
  }
}

export type ItemsEndpoint = ReturnType<typeof createItemsEndpoint>
