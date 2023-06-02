import { call, takeLatest } from "typed-redux-saga/macro"

import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilTrue } from "@spatialsys/use-saga"
import { ActionType, AppState, SetSpaceToCreate } from "@spatialsys/web/app-state"

/**
 * Listens for `SetSpaceToCreate` actions and dispatches a message to Unity to create and
 * join a new space.
 *
 * This saga does not change the URL route after dispatching the `createAndJoinRoom` message.
 * Instead, application-logic is responsible for observing `roomIdInUnity && roomSlugInUnity && isCreatingSpace`:
 * If this boolean condition is true, the client should push to `/s/slugAndId`.
 */
export function* createSpaceSaga() {
  yield* takeLatest(ActionType.SetSpaceToCreate, createAndJoinSpace)
}

function* createAndJoinSpace({ payload: createAndJoinRoomMessage }: SetSpaceToCreate) {
  // Wait for Unity app to be started, then dispatch createAndJoinRoom message
  // The Unity app will start if `state.spaceToCreate` is defined (see shouldStartUnity in app-state/selectors)
  yield* waitUntilTrue((state: AppState) => state.isStarted)
  yield* call(UnityMessages.createAndJoinRoom, createAndJoinRoomMessage)
}
