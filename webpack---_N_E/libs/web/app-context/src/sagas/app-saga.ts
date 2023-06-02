import { all, call, fork, join, put, take } from "typed-redux-saga/macro"

import { SpatialLogger } from "@spatialsys/js/logger"
import { waitUntilTrue } from "@spatialsys/use-saga"
import { registerVersionInfo } from "@spatialsys/web/analytics"
import { ActionType, Actions, AppState, CreateUnityInstance, Selectors } from "@spatialsys/web/app-state"
import Config, { createUnityManifest } from "@spatialsys/web/config"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { authSaga } from "@spatialsys/web/core/js/auth/sagas/auth-saga"
import { Storage } from "@spatialsys/web/storage"

import { bugReporterSaga } from "./bug-reporter-saga"
import { createSpaceSaga } from "./create-space-saga"
import { downloadUnityLoader } from "./download-unity-loader"
import { globalHotkeysSaga } from "./global-hotkeys-saga"
import { networkErrorsSaga } from "./network-errors-saga"
import { permissionSaga } from "./permission-saga"
import { serviceWorkerMessages } from "./service-worker-messages-saga"
import { register as registerServiceWorker } from "./service-worker-registration"
import { versionSaga } from "./version-saga"

/**
 * The root saga for Spatial Web. Any application startup logic or side effects that should run
 * on every page of the application should go here.
 *
 * For logic that's specific to certain pages, components, or just doesn't need to be part of the
 * initial bundle, either use the `runSaga` function from `useAppContext` to start the saga from
 * the component, or dispatch an action when the component mounts with a listener in this saga
 * to asynchronously import and run the relevant saga.
 */
export function* appSaga() {
  if (typeof navigator !== "undefined") {
    SpatialLogger.properties["userAgent"] = navigator.userAgent
  }
  yield* fork(authSaga)

  yield* fork(networkErrorsSaga)

  // Register the service worker immediately to start caching asset requests
  const registrationTask = yield* fork(registerServiceWorker)
  yield* put(Actions.setServiceWorkerRegistrationTask(registrationTask))

  yield* fork(bugReporterSaga)
  yield* fork(function* startPermissionSaga() {
    const registration: ServiceWorkerRegistration | null = yield* join(registrationTask)
    if (!registration) {
      console.warn("Service worker failed to register, not setting up push notifications")
      return
    }
    yield* fork(permissionSaga, registration)

    if (navigator.serviceWorker) {
      yield* call(serviceWorkerMessages, navigator.serviceWorker)
    }
  })
  yield* fork(globalHotkeysSaga)
  yield* fork(createSpaceSaga)

  // Start off waiting for signals in the background we'll need later on
  const initializeUnityTask = yield* fork(function* () {
    return yield* take<CreateUnityInstance>(ActionType.CreateUnityInstance)
  })
  const shouldStartTask = yield* fork(function* () {
    yield* waitUntilTrue((state: AppState) => Selectors.shouldStartUnity(state))
  })

  const versionState = yield* call(versionSaga, Config, Storage)
  yield* call(registerVersionInfo, versionState.versionData)
  const manifest = createUnityManifest(
    versionState.versionData.versionString,
    versionState.urlBase,
    versionState.isCompressed
  )

  const { payload: canvas } = yield* join(initializeUnityTask)

  const [{ unityClientSaga }, unityLoaderTask] = yield* all([
    call(
      () =>
        // TODO: Refactor unity client saga into this library
        // eslint-disable-next-line @nx/enforce-module-boundaries
        import(
          /* webpackChunkName: "unity-client-saga" */ "@spatialsys/web/core/js/components/spatial-unity-web-gl/unity-client-saga/unity-client-saga"
        )
    ),
    fork(downloadUnityLoader, manifest),
  ] as const)
  yield* call(unityClientSaga, manifest, canvas, shouldStartTask, unityLoaderTask)
}
