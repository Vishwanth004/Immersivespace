import { select, takeLatest } from "typed-redux-saga/macro"

import { CameraRotationMode } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { ActionType, AppState, SetCameraRotationMode } from "@spatialsys/web/app-state"

/**
 * Sets the camera rotation mode.
 *
 * The previous camera rotation mode is required so it can be set when the user exits pointer lock via the escape key
 *
 */
function* cameraRotationModeWorker({ payload }: SetCameraRotationMode) {
  const { newState } = payload

  const canvas = yield* select((state: AppState) => state.canvas)

  if (newState === CameraRotationMode.PointerLock) {
    // This can succeed or fail asynchronously.  We subscribe to the pointerlockchange event to determine if it succeeded or failed in pointerLockChannel
    canvas.requestPointerLock()
  } else {
    UnityMessages.setCameraRotationMode(newState)
  }
}

export function* cameraRotationModeWatcher() {
  yield* takeLatest(ActionType.SetCameraRotationMode, cameraRotationModeWorker)
}
