import { eventChannel } from "redux-saga"
import { call, take } from "typed-redux-saga/macro"

import { UnityMessages } from "@spatialsys/unity/bridge"

/**
 * Sends a message to the Unity client when the window [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)
 * event is emitted to flush the view analytics. This ensures that the Media View Object analytics get sent when the user
 * kills the web app without leaving first, e.g. refreshing the page or closing the tab.
 *
 * This will not work properly on mobile web.
 */
export function* flushOnUnload() {
  const unloadChannel = createUnloadEventChannel()
  try {
    yield* take(unloadChannel)
    yield* call(UnityMessages.flushSpaceAnalytics)
  } finally {
    unloadChannel.close()
  }
}

function createUnloadEventChannel() {
  return eventChannel<boolean>((emitter) => {
    const callback = () => emitter(true)
    window.addEventListener("beforeunload", callback)
    return () => {
      window.removeEventListener("beforeunload", callback)
    }
  })
}
