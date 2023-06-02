import { Channel } from "redux-saga"
import { all, call, put, take } from "typed-redux-saga/macro"

import { Actions, DownloadState } from "@spatialsys/web/app-state"
import { UNITY_DOWNLOADED_PROGRESS_THRESHOLD, UnityManifest } from "@spatialsys/web/config"
import * as PerformanceMonitor from "@spatialsys/web/core/js/analytics/performance-monitor"

/**
 * Fetches the Unity build's data, wasm, and framework JS in parallel; used for pre-downloading the build.
 */
export function* predownloadUnityBuild(manifest: UnityManifest) {
  yield* all([call(fetch, manifest.dataUrl), call(fetch, manifest.codeUrl), call(fetch, manifest.frameworkUrl)])
}

/**
 * Updates the generic unity progress state given the channel of progress events, and marks when
 * the client download is done.
 * @param isAlreadyDownloaded if true, will not update the download state as that's been
 * taken care of elsewhere.
 */
export function* updateUnityProgress(progressChannel: Channel<number>, isAlreadyDownloaded: boolean) {
  while (true) {
    const progress = yield* take(progressChannel)
    yield* put(Actions.setUnityInitializationProgress(progress))
    if (progress > UNITY_DOWNLOADED_PROGRESS_THRESHOLD) {
      // Weird quirk where Unity never progresses past this, never reaches 100%.
      // So report it as done downloading and close the progress event channel.
      // Only report the download if it hasn't already been reported.
      if (!isAlreadyDownloaded) {
        performance.measure("DownloadUnity", "DownloadUnity-start")
        yield* put(Actions.setUnityDownloadState(DownloadState.Done))
        PerformanceMonitor.reportUnityDownloaded()
        performance.mark("BootUnity-start")
      }
      progressChannel.close()
      return
    }
  }
}
