import { call } from "typed-redux-saga/macro"

import { UnityInstanceFactory } from "@spatialsys/js/types"
import { loadScript } from "@spatialsys/js/util/load-script"
import { UnityManifest } from "@spatialsys/web/config"

declare let window: {
  createUnityInstance: UnityInstanceFactory
}

/**
 * The first step of running the Unity client. Downloads and runs the loader `<script>` that's
 * generated as part of the Unity build. That script initializes the global `createUnityInstance`
 * variable; this saga returns that variable to avoid having to reference `window` elsewhere.
 * @param manifest
 * @returns
 */
export function* downloadUnityLoader(manifest: UnityManifest) {
  yield* call(loadScript, manifest.loaderUrl)
  // The loader script sets up this global variable.
  return window.createUnityInstance
}
