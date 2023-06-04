import { AxiosInstance } from "axios"

export type GetSdkTokenResponse = {
  accessToken: string
}

export function createSpatialSdkEndpoints(client: AxiosInstance) {
  return {
    async getSdkToken(): Promise<GetSdkTokenResponse> {
      const resp = await client.get<GetSdkTokenResponse>("/token")
      return resp.data
    },
  }
}

export type SpatialSdkEndpoints = ReturnType<typeof createSpatialSdkEndpoints>
