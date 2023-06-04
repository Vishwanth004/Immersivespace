import { AxiosInstance } from "axios"

import { World } from "../../../types"

export type GetUsersWorldsRequest = {
  userId: string
}

export type GetUsersWorldsResponse = { worlds: Omit<World, "members">[] }

export function createWorldsEndpoint(client: AxiosInstance) {
  return {
    /**
     * Gets all worlds for a given user
     */
    async getUsersWorlds({ userId }: GetUsersWorldsRequest): Promise<GetUsersWorldsResponse> {
      const response = await client.get<GetUsersWorldsResponse>(`/${userId}/worlds`)
      return response.data
    },
  }
}

export type WorldsEndpoint = ReturnType<typeof createWorldsEndpoint>
