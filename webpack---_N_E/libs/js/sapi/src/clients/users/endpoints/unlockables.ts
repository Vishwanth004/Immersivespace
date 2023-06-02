import { AxiosInstance } from "axios"

import { ProfileUnlockable } from "../../../types"

export type RegisterUnlockableRequest = {
  unlockableID: string
}

export type RegisterUnlockableResponse = {
  unlockables: Record<string, ProfileUnlockable>
  userID: string
}

export type MarkUnlockableReadRequest = {
  unlockableId: string
}

export function createUnlockablesEndpoints(client: AxiosInstance) {
  return {
    /** Begin an unlockable streak */
    registerUnlockable: async function (req: RegisterUnlockableRequest) {
      const response = await client.post<RegisterUnlockableResponse>("/unlockables", req)
      return response.data
    },
    /** Marks an unlockable as read */
    markRead: async function (req: MarkUnlockableReadRequest) {
      const { unlockableId } = req
      const response = await client.put<void>(`/unlockables/${unlockableId}`)
      return response.data
    },
  }
}

export type UnlockablesEndpoints = ReturnType<typeof createUnlockablesEndpoints>
