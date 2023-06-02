import { AxiosInstance } from "axios"

import { Badge, UserBadge } from "../../../types"

export type GetBadgesRequest = {
  /** max number of items to return in the page */
  limit?: number
  userId: string
}

export type GetBadgesResponse = {
  badges: Badge[]
}

export function createBadgesEndpoint(client: AxiosInstance) {
  return {
    /**
     * Gets all badges for a given user
     * Defaults to a limit of 50 badges
     */
    async getBadges({ userId, limit = 50 }: GetBadgesRequest): Promise<GetBadgesResponse> {
      const response = await client.get<{ badges: UserBadge[] }>(`/${userId}/badges?limit=${limit}`)
      return response.data
    },
  }
}

export type BadgesEndpoint = ReturnType<typeof createBadgesEndpoint>
