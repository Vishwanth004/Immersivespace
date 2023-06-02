import { AxiosInstance } from "axios"

type PostLoginResponse = {
  profileExists: boolean
}

export function createPostLoginEndpoints(client: AxiosInstance) {
  /**
   * This endpoint should be called after the user successfully logs in. It does the following:
   * - Returns whether or not a profile exists for the given auth token
   * - If userId exists, merges Mixpanel profiles (spatialUid with user.uid). This must be done manually in SAPI,
   * calling `Mixpanel.identify` is not equivalent. This is due to the fact that once you call `Mixpanel.identify` with
   * a given ID, you cannot call it again without first calling `Mixpanel.reset`. However, we want to merge `spatialUid`
   * with `user.uid` without resetting Mixpanel.
   */
  return async function postLogin(): Promise<PostLoginResponse> {
    const response = await client.post<PostLoginResponse>(`/post-login`)
    return response.data
  }
}

export type PostLoginEndpoint = ReturnType<typeof createPostLoginEndpoints>
