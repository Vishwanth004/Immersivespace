import { fork, join, put, select, takeLeading } from "typed-redux-saga/macro"

import { RoomJoinMethod, VREnvironment } from "@spatialsys/unity/app-state"
import { waitUntilTrue } from "@spatialsys/use-saga"
import { ActionType, Actions, AppState } from "@spatialsys/web/app-state"
import { questsSaga } from "@spatialsys/web/core/js/components/quests/saga"
import { rewardsSaga } from "@spatialsys/web/core/js/components/rewards/saga"
import { economySaga } from "@spatialsys/web/core/js/components/room/economy/saga"
import { firstQuestSaga } from "@spatialsys/web/core/js/routes/rooms/room/sagas/first-quest-saga"

import { cameraRotationModeWatcher } from "../camera-mode-buttons/saga/camera-rotation-mode"
import { pointerLockWatcher } from "../camera-mode-buttons/saga/pointer-lock"
import { cameraModeSaga } from "./camera-mode-saga"
import { flushOnUnload } from "./flush-on-unload"
import { hotkeysSaga } from "./hotkeys-saga"
import { initializeSpaceStateSaga } from "./initialize-space-state-saga"
import { mouseKeyboardInputSaga } from "./mouse-keyboard-input-saga"
import { recordingSaga } from "./recording-saga"
import { rtcSaga } from "./rtc-saga"
import { screenshotSaga } from "./screenshot-saga"
import { unityFocusSaga } from "./unity-focus-saga"
import { urlUpdatesSaga } from "./url-updates-saga"
import { visibilitySaga } from "./visibility-saga"
import { windowFocusSaga } from "./window-focus-saga"

export function* roomSaga() {
  yield* fork(initializeSpaceStateSaga)
  yield* fork(maybeOpenCreateCustomEnvModal)
  const canvas = yield* select((state: AppState) => state.canvas)
  yield* fork(questsSaga)
  yield* fork(rewardsSaga)
  yield* fork(pointerLockWatcher)
  yield* fork(cameraRotationModeWatcher)
  yield* fork(economySaga)
  yield* fork(unityFocusSaga, canvas)
  yield* fork(flushOnUnload)
  yield* fork(visibilitySaga)
  yield* fork(windowFocusSaga)
  yield* fork(mouseKeyboardInputSaga)
  yield* fork(hotkeysSaga)
  yield* fork(rtcSaga)
  yield* fork(urlUpdatesSaga)
  yield* fork(firstQuestSaga)
  yield* takeLeading(ActionType.TakeScreenshot, screenshotSaga, canvas)
  yield* takeLeading(ActionType.StartRecording, recordingSaga, canvas)
  const task = yield* fork(cameraModeSaga)

  try {
    // Pause execution of this saga indefinitely so that we receive the cancel action.
    yield* join(task)
  } finally {
    yield* put(Actions.resetSpaceState())
  }
}

function* maybeOpenCreateCustomEnvModal() {
  yield* waitUntilTrue((state: AppState) => state.unity.appState.roomSession.inRoomAndFullyParticipating)

  const isCreateCustomEnvModalOpen = yield* select((state: AppState) => {
    const environmentType = state.unity.appState.roomSession.sharedState.settings.environment
    const isCreatingNewRoom = state.space.joinContext.method === RoomJoinMethod.UserCreatedNewRoom
    const isAbstract = environmentType === VREnvironment.Abstract
    return isCreatingNewRoom && isAbstract
  })

  if (isCreateCustomEnvModalOpen) {
    yield* put(
      Actions.setSpaceState({
        isCreateCustomEnvModalOpen: true,
      })
    )
  }
}
