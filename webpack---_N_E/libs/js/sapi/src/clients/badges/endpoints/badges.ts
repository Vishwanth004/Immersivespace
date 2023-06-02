import { AxiosInstance } from "axios"

import { Badge, ClaimBadgeRequest, GetBadgeRequest, GetBadgeResponse } from "../../../types"

export type CreateBadgeRequest = {
  description: string
  name: string
  worldID: string
}

export type UpdateBadgeRequest = {
  badgeId: string
  description: string
  name: string
}

export type UpdateBadgeIconRequest = {
  badgeId: string
  icon: Blob
}

export function createBadgesEndpoint(client: AxiosInstance) {
  return {
    /** Gets badge by badge ID */
    async getBadge(args: GetBadgeRequest): Promise<GetBadgeResponse> {
      const response = await client.get<any>(`/${args.badgeId}`)
      return response.data
    },
    /** Claim whitelisted badge by ID */
    async claimBadge({ badgeId, spaceID }: ClaimBadgeRequest): Promise<void> {
      const response = await client.post<any>(`/${badgeId}/claim`, {
        spaceID,
      })
      return response.data
    },

    /** Creates a new badge, associated with a world  */
    async createBadge(req: CreateBadgeRequest) {
      const response = await client.post<Badge>(``, req)
      return response.data
    },

    async updateBadge(req: UpdateBadgeRequest) {
      const { badgeId, ...body } = req
      const response = await client.put<Badge>(`/${badgeId}`, body)
      return response.data
    },

    async updateBadgeIcon(req: UpdateBadgeIconRequest) {
      const response = await client.put<Badge>(`/${req.badgeId}/icon`, req.icon)
      return response.data
    },
  }
}

export type BadgesEndpoint = ReturnType<typeof createBadgesEndpoint>
