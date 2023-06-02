import axios, { AxiosInstance } from "axios"

import { SPATIAL_UID_HEADER_NAME } from "@spatialsys/js/util/constants"

import { PlatformHeaderString } from "../types"
import { SPATIAL_USER_AGENT_HEADER, createSpatialUserAgentHeader } from "../utils/spatial-user-agent-header"

/**
 * Vercel allows a maximum execution limit of 60s on their "Pro" plan.
 * However, 30s is a more reasonable timeout, requests should not be taking anywhere
 * near this long!
 */
const DEFAULT_TIMEOUT = 30000

// Set a global timeout for axios, since `axios.get` and `axios.post` is used sparsely
// throughout various parts of the codebase still.
axios.defaults.timeout = DEFAULT_TIMEOUT

export interface SapiBaseClientParams {
  apiUrl: string
  authToken?: string
  channelName: string
  platform: PlatformHeaderString
  spatialUid?: string
  spatialUnityVersion: string
  /** Maximum request length for a request in ms */
  timeoutMs?: number
}

export abstract class SapiBaseClient {
  /**
   * Axios client for making API requests to SAPI.
   *
   * The auth token must be set using `setAuthHeader`. If the client is used without the auth token being set,
   * all requests that require authentication will fail (401 unauthorized).
   *
   * The `Spatial-User-Agent` header should also be updated with the appropriate webGL version
   * using `setSpatialUserAgentHeader`, once the version data is available.
   */
  public readonly client: AxiosInstance

  readonly platform: PlatformHeaderString
  readonly spatialUnityVersion: string
  readonly channelName: string
  readonly timeoutMs: number

  constructor(params: SapiBaseClientParams, basePath: string) {
    this.platform = params.platform
    this.spatialUnityVersion = params.spatialUnityVersion
    this.channelName = params.channelName
    this.timeoutMs = params.timeoutMs || DEFAULT_TIMEOUT

    this.client = axios.create({
      withCredentials: true,
      xsrfCookieName: "sapi_token",
      xsrfHeaderName: "sapi_token",
      baseURL: `${params.apiUrl}${basePath}`,
      headers: {
        [SPATIAL_USER_AGENT_HEADER]: createSpatialUserAgentHeader(
          this.platform,
          this.spatialUnityVersion,
          this.channelName
        ),
      },
      timeout: this.timeoutMs,
    })

    if (params.authToken) {
      this.setAuthHeader(params.authToken)
    }
    if (params.spatialUid) {
      this.setSpatialUidHeader(params.spatialUid)
    }
  }

  /**
   * Sets the Spatial-User-Agent header, used for version compatibility checks.
   *
   * @example
   * // Config.SPATIAL_UNITY_VERSION === "6.0.0"
   * // Config.CHANNEL_NAME === "dev"
   * setSpatialUserAgentHeader("b5b67450")
   * // header set to "WebGL 6.0.0 dev b5b67450"
   *
   */
  public setSpatialUserAgentHeader(webGlVersion: string) {
    this.client.defaults.headers[SPATIAL_USER_AGENT_HEADER] = createSpatialUserAgentHeader(
      this.platform,
      this.spatialUnityVersion,
      this.channelName,
      webGlVersion
    )
  }

  /** Sets the auth header, used in all SAPI requests */
  public setAuthHeader(accessToken: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }

  /** Sets the Spatial UID header */
  public setSpatialUidHeader(spatialUid: string) {
    this.client.defaults.headers.common[SPATIAL_UID_HEADER_NAME] = spatialUid
  }

  /** Removes the Authorization header from the default common set */
  public unsetAuthHeader() {
    delete this.client.defaults.headers.common["Authorization"]
  }
}
