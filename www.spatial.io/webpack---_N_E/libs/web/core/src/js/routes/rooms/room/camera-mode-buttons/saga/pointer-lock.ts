import { eventChannel } from "redux-saga"
import { select } from "typed-redux-saga/macro"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { CameraRotationMode } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { AppState } from "@spatialsys/web/app-state"

/**
 * Events are emitted when the user enters or exits pointer lock.
 *
 * The user can enter or exit pointer lock by clicking a button and they can also exit pointer lock by pressing the escape key
 *
 * @returns A channel that emits a boolean indicating whether or not the pointer is locked
 */
function pointerLockChannel() {
  return eventChannel((emit) => {
    const onPointerLockChange = () => {
      return emit(Boolean(document.pointerLockElement) || false)
    }

    document.addEventListener("pointerlockchange", onPointerLockChange)

    return () => {
      document.removeEventListener("pointerlockchange", onPointerLockChange)
    }
  })
}

/**
 * Runs when the user enters or exits pointer lock as it is the callback function that runs when the pointerLockChannel emits an event
 *
 */
function* handlePointerLockChange(isPointerLocked: boolean) {
  if (isPointerLocked) {
    UnityMessages.setCameraRotationMode(CameraRotationMode.PointerLock)
  } else {
    const previousCameraRotationMode = yield* select((state: AppState) => state.space.previousCameraRotationMode)
    UnityMessages.setCameraRotationMode(previousCameraRotationMode)
  }
}

function pointerLockErrorChannel() {
  return eventChannel((emitter) => {
    const onPointerLockError = (error: any) => {
      return emitter(error)
    }

    document.addEventListener("pointerlockerror", onPointerLockError)
    return () => {
      document.removeEventListener("pointerlockerror", onPointerLockError)
    }
  })
}

function* handlePointerLockError() {
  /**
   * TODO: https://linear.app/spatial/issue/DEV-21879/[web]-handle-pointer-lock-api-error
   *
   * 1. determine if user was trying to enter or exit pointer lock
   * 2. Retry once
   * 3. If it fails again, show an error message
   */
}

export function* pointerLockWatcher() {
  yield* takeEveryAndClose(pointerLockChannel(), handlePointerLockChange)
  yield* takeEveryAndClose(pointerLockErrorChannel(), handlePointerLockError)
}
