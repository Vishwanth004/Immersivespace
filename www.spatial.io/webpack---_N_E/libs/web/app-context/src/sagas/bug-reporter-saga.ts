import { call } from "typed-redux-saga/macro"

import { ENABLED_TREATMENT_VALUE } from "@spatialsys/js/sapi/types"
import { waitUntilExists } from "@spatialsys/use-saga"
import { AppState } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import { logger } from "@spatialsys/web/logger"

export function* bugReporterSaga() {
  const user = yield* waitUntilExists((state: AppState) => state.user)
  if (user.treatments.isBugReporter !== ENABLED_TREATMENT_VALUE) {
    return
  }

  const unityVersion = yield* waitUntilExists((state: AppState) => state.unity.version)
  try {
    const markerSDK = yield* call(() => import("@marker.io/browser"))
    yield* call([markerSDK, markerSDK.loadWidget], {
      destination: Config.MARKERIO_DESTINATION,
      ssr: {
        renderDelay: 3000, // 0 - 15000 (ms)
      },
      reporter: {
        email: user.email,
        fullName: user.displayName,
      },
      customData: {
        version: Config.SPATIAL_UNITY_VERSION,
        deploymentEnv: Config.DEPLOYMENT_ENV,
        userEmail: user.email,
        unityVersion: unityVersion.versionData.versionString,
      },
    })
  } catch (err) {
    logger.error("Unexpected error while loading Marker.io widget.", err as Error)
  }
}
