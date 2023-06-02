import { UnityInstanceParameters } from "@spatialsys/js/types"

import type { ConfigT } from "./config"

export type VersionData = {
  /** i.e. `dev`, `store`, `early-access`. Should probably be an enum */
  channel: string
  /** The short SHA of the most recent change that affected Unity */
  shortSha: string
  /** The semantic version, i.e. `6.28.0` */
  version: string
  /**
   * The full version string shown where the webGL build is stored,
   * i.e. `Spatial_6.28.0_aac2c8ba_dev`
   */
  versionString: string
}

export const createDefaultUnityVersion = (config: ConfigT): VersionData => ({
  channel: config.CHANNEL_NAME,
  shortSha: config.SHORT_SHA_LAST_UNITY_CHANGE,
  version: config.SPATIAL_UNITY_VERSION,
  versionString: `Spatial_${config.SPATIAL_UNITY_VERSION}_${config.SHORT_SHA_LAST_UNITY_CHANGE}_${config.CHANNEL_NAME}`,
})

/**
 * Parses a full version string into version data object
 */
export const parseVersionString = (versionString: string): VersionData => {
  try {
    const [, version, shortSha, channel] = versionString.split("_")
    return {
      channel,
      shortSha,
      version,
      versionString,
    }
  } catch (e) {
    throw new Error("Error parsing version string")
  }
}

// If unity's progress event returns greater than this value, it's fully downloaded.
export const UNITY_DOWNLOADED_PROGRESS_THRESHOLD = 0.85

export function createUnityManifest(version: string, urlBase: string, useCompression: boolean): UnityManifest {
  const suffix = useCompression ? ".br" : ""
  return {
    loaderUrl: `${urlBase}/spatial-webgl/${version}/Build/WebGL.loader.js`,
    dataUrl: `${urlBase}/spatial-webgl/${version}/Build/WebGL.data${suffix}`,
    frameworkUrl: `${urlBase}/spatial-webgl/${version}/Build/WebGL.framework.js${suffix}`,
    codeUrl: `${urlBase}/spatial-webgl/${version}/Build/WebGL.wasm${suffix}`,
    streamingAssetsUrl: `${urlBase}/spatial-webgl/${version}/StreamingAssets`,
    productVersion: version,
  }
}

export type UnityManifest = Pick<
  UnityInstanceParameters,
  "codeUrl" | "dataUrl" | "frameworkUrl" | "productVersion" | "streamingAssetsUrl"
> & {
  loaderUrl: string
}

const coreBuildFilePattern = /spatial-webgl\/Spatial_.*\/Build\/WebGL\.(data|wasm)/
export const isCoreBuildFile = (url: URL) => coreBuildFilePattern.test(url.href)

const streamingAssetPattern = /spatial-webgl\/Spatial_.*\/StreamingAssets/
export const isStreamingAsset = (url: URL) => streamingAssetPattern.test(url.href)

const catalogFilesPattern = /asset-bundles-.*\/WebGL\/catalog_.*\.(json|hash)/
export const isAssetBundleManifest = (url: URL) => catalogFilesPattern.test(url.pathname)

const assetBundlePattern = /asset-bundles-.*\/WebGL\/.*.bundle$/
export const isAssetBundle = (url: URL) => assetBundlePattern.test(url.href)
