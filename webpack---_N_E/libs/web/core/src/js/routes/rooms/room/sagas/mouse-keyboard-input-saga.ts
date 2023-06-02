import { buffers, eventChannel } from "redux-saga"
import { select } from "typed-redux-saga/macro"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilTrue } from "@spatialsys/use-saga"
import { AppState } from "@spatialsys/web/app-state"

export function* mouseKeyboardInputSaga() {
  yield* waitUntilTrue((state: AppState) => state.unity.appState.roomSession.inRoomAndFullyParticipating)
  // This enables keyboard and mouse control
  UnityMessages.setMouseInWindow(true)

  const inputChannel = createInputEventChannel()
  yield* takeEveryAndClose(inputChannel, handleInput)
}

function* handleInput() {
  const hasUsed = yield* select((state: AppState) => state.unity.appState.hasUsedMouseOrKeyboard)
  if (!hasUsed) {
    UnityMessages.setMouseOrKeyboardUsed()
  }
}

function createInputEventChannel() {
  const events: Array<keyof WindowEventMap> = ["keypress", "mousemove", "click"]
  return eventChannel<boolean>((emitter) => {
    const callback = () => emitter(true)
    for (const name of events) {
      window.addEventListener(name, callback)
    }
    return () => {
      for (const name of events) {
        window.removeEventListener(name, callback)
      }
    }
  }, buffers.dropping(1))
}
