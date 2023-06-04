import { AxiosInstance } from "axios"

type CustomToken = {
  accessToken: string
}

export function createAzureSsoEndpoints(client: AxiosInstance) {
  return {
    /** Exchanges an Azure token for a custom token that can be used to sign in to Firebase */
    async exchangeAzureToken(accessToken?: string, email?: string): Promise<CustomToken> {
      const response = await client.post<CustomToken>(`/auth/v1/token/exchange`, {
        accessToken,
        email,
        loginProvider: "microsoft",
      })
      return response.data
    },
  }
}

export type AzureSsoEndpoint = ReturnType<typeof createAzureSsoEndpoints>
