import { AxiosInstance } from "axios"

import { SpaceAndCreator } from "../../../types"

export type GetRecommendedSpacesRequest = { count: number }
export type GetRecommendedSpacesResponse = { spaces: SpaceAndCreator[] }

export function createRecommendedEndpoints(client: AxiosInstance) {
  return {
    /**
     * Gets a list of recommended spaces. Will be updated in the future to be specific to the user and current space (optional)
     */
    getRecommendedSpaces: async function (args: GetRecommendedSpacesRequest): Promise<GetRecommendedSpacesResponse> {
      const response = await client.get<GetRecommendedSpacesResponse>(`/recommended?count=${args.count}`)
      return response.data
    },
  }
}

export type RecommendedSpacesEndpoint = ReturnType<typeof createRecommendedEndpoints>
