import { buffers, eventChannel } from "redux-saga"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { UnityMessages } from "@spatialsys/unity/bridge"

export function* windowFocusSaga() {
  handleWindowFocus(document.hasFocus())
  const focusChangeChannel = createFocusEventChannel()
  yield* takeEveryAndClose(focusChangeChannel, handleWindowFocus)
}

function handleWindowFocus(hasFocus: boolean) {
  UnityMessages.setWindowFocused(hasFocus)
}

function createFocusEventChannel() {
  return eventChannel<boolean>((emitter) => {
    const callback = () => emitter(document.hasFocus())
    window.addEventListener("focus", callback)
    window.addEventListener("blur", callback)
    return () => {
      window.removeEventListener("focus", callback)
      window.removeEventListener("blur", callback)
    }
  }, buffers.expanding())
}
