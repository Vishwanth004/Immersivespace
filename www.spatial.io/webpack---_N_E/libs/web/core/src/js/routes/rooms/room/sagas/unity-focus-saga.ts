import { fork, put, take } from "typed-redux-saga/macro"

import { waitUntilChanged, waitUntilTrue } from "@spatialsys/use-saga"
import { ActionType, Actions, AppState } from "@spatialsys/web/app-state"

/**
 * Focus the unity canvas when the user has fully joined the space, and every time the FocusUnity
 * action is dispatched.
 */
export function* unityFocusSaga(canvas: HTMLCanvasElement) {
  yield* waitUntilTrue((state: AppState) => state.unity.appState.roomSession.inRoomAndFullyParticipating)

  yield* fork(focusCanvasWhenModalsClosed)
  while (true) {
    canvas.focus()
    yield* take(ActionType.FocusUnity)
  }
}

function* focusCanvasWhenModalsClosed() {
  while (true) {
    const [count] = yield* waitUntilChanged((state: AppState) => state.openModalCount)
    if (count > 0) {
      continue
    }
    // Calling this synchronously/not as a macrotask, the browser
    // switches the focused element back to what is was before.
    // Unclear why.
    yield Promise.resolve()
    yield* put(Actions.focusUnity())
  }
}
