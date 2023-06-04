import { AxiosInstance } from "axios"

import { BootstrapTreatments, SAPIBootstrapResponse } from "../../../types"

export function createBootstrapEndpoints(client: AxiosInstance, channelName: string, spatialUnityVersion: string) {
  return {
    /**
     * Returns treatments included in the app bootstrap
     */
    getBootstrap: async function (): Promise<BootstrapTreatments> {
      const response = await client.post<SAPIBootstrapResponse>(`/bootstrap/`, {
        // the channel and version are NOT the unity version downloaded, they are the values injected into webapp at build-time
        channel: channelName,
        platform: "WEB_UNITY",
        version: spatialUnityVersion,
      })
      return response.data
    },
  }
}

export type BootstrapEndpoint = ReturnType<typeof createBootstrapEndpoints>
