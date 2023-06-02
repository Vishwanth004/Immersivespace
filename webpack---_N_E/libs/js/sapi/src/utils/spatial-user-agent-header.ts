export const SPATIAL_USER_AGENT_HEADER = "Spatial-User-Agent"

/**
 * The Spatial-User-Agent header has the format: `WEB ${SEMANTIC_VERSION} ${CHANNEL} ${WEBGL_VERSION}`
 * For example: `WEB 6.0.0 dev b5b67450`
 *
 * - The WEBGL_VERSION defaults to UNSET, it will be set through versionSaga.
 * - CHANNEL can be one either `dev` or `store`. There are other channels used historically like `qa` and `early access`,
 * but these are not supported by webapp.
 */
export const createSpatialUserAgentHeader = (
  platform: string,
  spatialUnityVersion: string,
  channelName: string,
  webGlVersion = "UNSET"
) => {
  return `${platform} ${spatialUnityVersion} ${channelName} ${webGlVersion}`
}
