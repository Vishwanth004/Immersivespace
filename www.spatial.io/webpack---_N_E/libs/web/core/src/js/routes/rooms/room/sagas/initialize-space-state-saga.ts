import { put, select } from "typed-redux-saga/macro"

import { Actions, AppState } from "@spatialsys/web/app-state"
import { Storage } from "@spatialsys/web/storage"

/**
 * Re-initializes the space state when the user joins a room.
 */
export function* initializeSpaceStateSaga() {
  const user = yield* select((state: AppState) => state.user)
  const authState = yield* select((state: AppState) => state.auth)
  if (!authState.useAuthlessToken) {
    yield* put(Actions.setSpaceState({ showFirstTutorial: !user.disableWebControlsTutorial }))
  } else {
    yield* put(
      Actions.setSpaceState({ showFirstTutorial: !Storage.fetch(Storage.STORAGE_FINISHED_TUTORIAL_KEY, false) })
    )
  }
}
