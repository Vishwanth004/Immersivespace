import { AxiosInstance } from "axios"

import { UnityPackage } from "../../../types"

export type GetPackagesRequest = {
  /** max number of items to return in the page */
  limit?: number
  offset?: number
  userId: string
}

export type GetPackagesResponse = { packages: UnityPackage[] }

export function createPackagesEndpoint(client: AxiosInstance) {
  return {
    /**
     * Gets all Unity Packages created by a user
     * Defaults to a limit of 50 packages
     */
    async getPackages({ userId, limit = 50, offset = 0 }: GetPackagesRequest): Promise<GetPackagesResponse> {
      const response = await client.get<GetPackagesResponse>(`/${userId}/sdk-packages?limit=${limit}&offset=${offset}`)
      return response.data
    },
  }
}

export type PackagesEndpoint = ReturnType<typeof createPackagesEndpoint>
