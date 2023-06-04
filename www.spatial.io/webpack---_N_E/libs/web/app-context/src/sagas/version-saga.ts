import { call, put } from "typed-redux-saga/macro"

import { UserData } from "@spatialsys/js/sapi/clients/sapi"
import { waitUntilExists } from "@spatialsys/use-saga"
import { Actions, AppState, VersionState } from "@spatialsys/web/app-state"
import { ConfigT, createDefaultUnityVersion, createUnityManifest, parseVersionString } from "@spatialsys/web/config"
import { sapiClient, sapiNotificationClient, sapiSpaceClient } from "@spatialsys/web/sapi"
import { StorageT } from "@spatialsys/web/storage"

/**
 * Check if a Unity WebGL bundle exists for a given version by making a HEAD call.
 */
export async function checkIfBuildExists(version: string, urlBase: string, useCompression: boolean) {
  const manifest = createUnityManifest(version, urlBase, useCompression)
  // Check if anything exists for the given version and extension type using a HEAD call
  const response = await fetch(manifest.dataUrl, { method: "HEAD" })
  return response.ok
}

/**
 * Gets the version from the appropriate source and updates the user agent header on the network
 * client and the store. Throws an error if there is no valid version.
 */
export function* versionSaga(config: ConfigT, storage: StorageT) {
  const versionState = yield* call(getVersion, config, storage)
  if (!versionState) {
    throw new Error("Fatal: Unable to find any Spatial WebGL bundle, app cannot start.")
  }
  // The header only needs the Unity commit SHA, not the full string
  // The expected format is Spatial_{version}_{sha}_{channel}
  const commitSha = versionState.versionData.versionString.split("_")[2]
  yield* call([sapiClient, sapiClient.setSpatialUserAgentHeader], commitSha)
  yield* call([sapiSpaceClient, sapiSpaceClient.setSpatialUserAgentHeader], commitSha)
  yield* call([sapiNotificationClient, sapiNotificationClient.setSpatialUserAgentHeader], commitSha)
  yield* put(Actions.setVersion(versionState))
  return versionState
}

/**
 * Sets the Unity WebGL version number to use
 * The priority order is:
 * - Local storage (i.e. set from the debug menu)
 * - Commit SHA (not set in local development)
 * - Treatment
 *
 * It's a security loophole to allow setting the version through local storage
 * on prod, since any user could change their local storage.
 * On prod, we only allow the version through SHORT_SHA_LAST_UNITY_CHANGE,
 * never the manual override, unless the user has a specific
 * treatment (webShowDebugMenu) enabled.
 */
function* getVersion(config: ConfigT, storage: StorageT): Generator<any, VersionState | null, any> {
  const versionFromLocalStorage = storage.fetch(storage.STORAGE_UNITY_WEBGL_VERSION_KEY)
  const urlBase = config.USE_LOCAL_UNITY_BUILD ? "" : config.PUBLIC_ASSETS_BASE_URL

  if (config.DEPLOYMENT_ENV === "production") {
    if (versionFromLocalStorage) {
      console.debug(`Attempting to use version "${versionFromLocalStorage}" from local storage...`)
      const user = yield* waitUntilExists((state: AppState) => state.user)
      // user must have `webShowDebugMenu` treatment enabled
      if (user.treatments.webShowDebugMenu) {
        const exists = yield* call(checkIfBuildExists, versionFromLocalStorage, config.PUBLIC_ASSETS_BASE_URL, true)
        if (exists) {
          const versionData = yield* call(parseVersionString, versionFromLocalStorage)
          return {
            source: "localStorage",
            versionData: versionData,
            urlBase: config.PUBLIC_ASSETS_BASE_URL,
            isCompressed: true,
          }
        }
        console.warn(`Unable to find Spatial WebGL bundle "${versionFromLocalStorage}" from local storage.`)
      } else {
        console.warn("You do not have permission to use a different webGL version.")
      }
    }

    const version = createDefaultUnityVersion(config)
    // Never fallback to a treatment on prod, always use the config-specified build
    return { versionData: version, source: "config", urlBase, isCompressed: true }
  }

  if (versionFromLocalStorage) {
    console.debug(`Attempting to use version "${versionFromLocalStorage}" from local storage...`)
    const exists = yield* call(checkIfBuildExists, versionFromLocalStorage, config.PUBLIC_ASSETS_BASE_URL, true)
    if (exists) {
      const versionData = yield* call(parseVersionString, versionFromLocalStorage)
      return {
        versionData: versionData,
        source: "localStorage",
        urlBase: config.PUBLIC_ASSETS_BASE_URL,
        isCompressed: true,
      }
    }
    console.warn(`Unable to find Spatial WebGL bundle "${versionFromLocalStorage}" from local storage.`)
  }

  // Local storage didn't have a version or it didn't exist, try the config-specified build
  const commitSha = config.SHORT_SHA_LAST_UNITY_CHANGE
  if (commitSha) {
    const version = createDefaultUnityVersion(config)
    console.debug(`Attempting to use version "${version.versionString}" from commit SHA...`)
    const isCompressed = config.ASSUME_UNITY_BUILD_COMPRESSED
    const exists = yield* call(checkIfBuildExists, version.versionString, urlBase, isCompressed)
    if (exists) {
      const source = config.COPY_LOCAL_UNITY_BUILD ? "localUnityBuild" : "config"
      return { versionData: version, source, urlBase, isCompressed }
    }
    console.warn(`Unable to find Spatial WebGL bundle "${version.versionString}" from commit SHA.`)
  }

  // There's no commit SHA or it didn't exist, try the treatment value
  const user: UserData = yield* waitUntilExists((state: AppState) => state.user)
  const version = user.treatments.webglVersion
  console.debug(`Attempting to use version "${version}" from treatments...`)
  const versionData = yield* call(parseVersionString, version)
  const exists = yield* call(checkIfBuildExists, versionData.versionString, config.PUBLIC_ASSETS_BASE_URL, true)
  if (exists) {
    return { versionData: versionData, source: "treatment", urlBase: config.PUBLIC_ASSETS_BASE_URL, isCompressed: true }
  }
  console.warn(`Unable to find Spatial WebGL bundle "${version}" from treatments.`)
  return null
}
