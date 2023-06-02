import { call } from "typed-redux-saga/macro"

import { CameraMode } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilChanged } from "@spatialsys/use-saga"
import { Mixpanel } from "@spatialsys/web/analytics"
import { AppState, UiModes } from "@spatialsys/web/app-state"

export function* cameraModeSaga() {
  while (true) {
    const [uiMode] = yield* waitUntilChanged((state: AppState) => state.space.uiMode)
    const cameraMode = uiMode === UiModes.Camera ? CameraMode.Filming : CameraMode.Room
    yield* call(UnityMessages.setCameraMode, cameraMode)

    // Register the UI Mode super property only when in camera mode. Otherwise unregister it.
    if (uiMode === UiModes.Camera) {
      Mixpanel.register({ "UI Mode": uiMode })
    } else {
      Mixpanel.unregister("UI Mode")
    }
  }
}
