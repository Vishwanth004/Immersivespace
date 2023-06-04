import { AxiosInstance } from "axios"

export function createNotificationEndpoints(client: AxiosInstance) {
  return {
    async addDeviceToken(token: string): Promise<void> {
      await client.post("/deviceToken", { deviceToken: token })
    },
    async removeDeviceToken(token: string): Promise<void> {
      await client.delete(`/deviceToken/${token}`)
    },
  }
}

export type NotificationEndpoint = ReturnType<typeof createNotificationEndpoints>
