import { buffers, eventChannel } from "redux-saga"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { UnityMessages } from "@spatialsys/unity/bridge"

export function* visibilitySaga() {
  handleVisibility(document.visibilityState)
  const changeChannel = createVisibilityEventChannel()
  yield* takeEveryAndClose(changeChannel, handleVisibility)
}

function handleVisibility(state: DocumentVisibilityState) {
  UnityMessages.setWindowVisible(state === "visible")
}

function createVisibilityEventChannel() {
  return eventChannel<DocumentVisibilityState>((emitter) => {
    const callback = () => emitter(document.visibilityState)
    document.addEventListener("visibilitychange", callback)
    return () => window.removeEventListener("visibilitychange", callback)
  }, buffers.expanding())
}
