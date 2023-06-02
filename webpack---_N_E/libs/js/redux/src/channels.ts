import { buffers, eventChannel } from "redux-saga"

export function createKeyDownChannel() {
  return eventChannel<KeyboardEvent>((emitter) => {
    const callback = (e: KeyboardEvent) => emitter(e)
    document.addEventListener("keydown", callback)
    return () => document.removeEventListener("keydown", callback)
  }, buffers.expanding())
}
