import { channel } from "redux-saga"
import { call, fork, join, put, select } from "typed-redux-saga/macro"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { waitUntilChanged, waitUntilTrue } from "@spatialsys/use-saga"
import { Actions, AppState } from "@spatialsys/web/app-state"
import type { RoomRTCManager } from "@spatialsys/web/rtc/room-rtc-manager"
import { RtcStateUpdate } from "@spatialsys/web/rtc/rtc-state"

import { voiceSaga } from "./voice-saga"

export function* rtcSaga() {
  const { RoomRTCManager } = yield* call(
    () => import(/* webpackChunkName: "room-rtc-manager" */ "@spatialsys/web/rtc/room-rtc-manager")
  )
  const rtcState = yield* select((state: AppState) => state.space.rtcState)
  const user = yield* select((state: AppState) => state.user)

  const rtcStateUpdateChannel = channel<RtcStateUpdate>()
  // Pipe RTC state updates from the RTC Manager into AppState.
  yield* fork(takeEveryAndClose, rtcStateUpdateChannel, function* updateRtcState(setter: RtcStateUpdate) {
    yield* put(Actions.setRtcState(setter))
  })

  const rtcManager = yield* call(
    RoomRTCManager.load,
    rtcState,
    rtcStateUpdateChannel.put,
    user.treatmentsParsed.maxWebcamFPS,
    user.id,
    user.liveswitchConfig
  )
  yield* put(
    Actions.setSpaceState((draft) => {
      draft.rtcManager = rtcManager
    })
  )

  yield* fork(voiceSaga, rtcManager)

  // Start listenining to remote RTC ASAP.
  rtcManager.registerRemoteRTC()
  yield* fork(function* () {
    // Only publish RTC once the user is a full participant.
    yield* waitUntilTrue((state: AppState) => state.unity.appState.roomSession.inRoomAndFullyParticipating)
    rtcManager.registerLocalRTC()
  })

  const updatesTask = yield* fork(rtcManagerUpdates, rtcManager)

  try {
    yield* join(updatesTask)
  } finally {
    rtcManager.unregisterRTC()
  }
}

/**
 * Pipe RTC state updates from AppState into the RTC Manager.
 * @param rtcManager
 */
function* rtcManagerUpdates(rtcManager: RoomRTCManager) {
  while (true) {
    const [rtcState] = yield* waitUntilChanged((state: AppState) => state.space.rtcState)
    rtcManager.setState(rtcState)
  }
}
