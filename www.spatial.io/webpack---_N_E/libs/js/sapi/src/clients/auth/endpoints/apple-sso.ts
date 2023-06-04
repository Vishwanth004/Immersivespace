import { AxiosInstance } from "axios"

type RefreshTokenResponse = {
  refresh_token: string
}

export function createAppleSsoEndpoints(client: AxiosInstance) {
  return {
    async getRefreshToken(authorizationCode: string): Promise<RefreshTokenResponse> {
      const response = await client.post<RefreshTokenResponse>(`/apple/refresh`, { authorizationCode })
      return response.data
    },
    async revokeRefreshToken(refreshToken: string): Promise<void> {
      await client.post<void>(`/apple/revoke`, { refresh_token: refreshToken })
    },
  }
}

export type AppleSsoEndpoint = ReturnType<typeof createAppleSsoEndpoints>
