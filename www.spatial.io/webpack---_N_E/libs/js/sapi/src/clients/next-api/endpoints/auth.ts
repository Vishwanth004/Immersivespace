import { AxiosInstance } from "axios"

/** POST /auth/session */
export type CreateSessionArgs = {
  idToken: string
  refreshToken: string
}

export type VerifyAndRefreshSessionResponse = {
  expiresAt: number
  idToken: string
}

export function createAuthEndpoints(client: AxiosInstance) {
  return {
    /**
     * Creates an auth session, encoding ID and refresh tokens in a cookie
     */
    async createAuthSession(args: CreateSessionArgs) {
      return await client.post<void>(`/auth/session`, args)
    },

    /** Clears auth session, clearing the cookie */
    async clearAuthSession() {
      return await client.delete<void>(`/auth/session/delete`)
    },

    /**
     * Refresh auth session. This request does not send any parameters,
     * the auth session is parsed from the request cookie.
     */
    async refreshAuthSession() {
      const response = await client.post<VerifyAndRefreshSessionResponse>(`/auth/session/refresh`)
      return response.data
    },

    /**
     * Verifies auth session. This request does not send any parameters,
     * the auth session is parsed from the request cookie.
     */
    async verifyAuthSession() {
      const response = await client.post<VerifyAndRefreshSessionResponse>(`/auth/session/verify`)
      return response.data
    },
  }
}

export type AuthEndpoint = ReturnType<typeof createAuthEndpoints>
