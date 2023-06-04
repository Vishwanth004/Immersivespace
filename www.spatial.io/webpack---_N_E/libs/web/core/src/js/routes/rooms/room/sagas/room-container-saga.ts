import { channel } from "redux-saga"
import { call, fork, join, put, select, takeEvery } from "typed-redux-saga/macro"

import { AppStateSelectors, LeaveRoomReason, RTCConnectionStatus, RoomSessionStatus } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilChanged, waitUntilExists, waitUntilTrue } from "@spatialsys/use-saga"
import { Actions, AppState, Modals } from "@spatialsys/web/app-state"
import * as PerformanceMonitor from "@spatialsys/web/core/js/analytics/performance-monitor"
import { prepareRTCClientIfNeeded } from "@spatialsys/web/rtc/rtc/rtc-loader"

import { joinSpaceWatcher } from "./join-space-saga"

/**
 * Prepares the RTC clients and manages their the connection status state changes.
 */
export function* roomContainerSaga() {
  yield* fork(joinSpaceWatcher)

  yield* put(Actions.clearSpaceToCreate())
  yield* put(Actions.closeModal(Modals.CreateSpace))

  const user = yield* waitUntilExists((state: AppState) => state.user)
  // Hook into the singleton RTC object
  const { rtcLocalClient, rtcMediaCapture } = yield* call(
    prepareRTCClientIfNeeded,
    user.id,
    user.liveswitchConfig.url,
    user.liveswitchConfig.appID
  )
  yield* put(Actions.setRtcLocalClient(rtcLocalClient))
  yield* put(Actions.setRtcMediaCapture(rtcMediaCapture))

  // Listen to changes in the channel connection status
  const connectionStatusChannel = channel<RTCConnectionStatus>()
  rtcLocalClient.channelConnectionStatusChanged.on(connectionStatusChannel.put)
  yield* takeEvery(connectionStatusChannel, function* (status) {
    yield* put(Actions.setRtcConnectionStatus(status))
  })

  yield* fork(performanceMonitorMarks)

  const task = yield* fork(watchUnityBannedState)

  try {
    yield* join(task)
  } finally {
    // Always send a leave room message when this saga is cancelled
    // We shouldn't be in a room if this saga isn't running.
    UnityMessages.leaveRoom(LeaveRoomReason.WebRoomContainerUnmount)
    rtcLocalClient.channelConnectionStatusChanged.off(connectionStatusChannel.put)
    yield* put(Actions.resetRtcState())
  }
}

/**
 * Listen for Unity banned modal state changes, then display banned modal accordingly.
 */
function* watchUnityBannedState() {
  const getBannedModalState = (state: AppState) => state.unity.appState.roomSession?.moderation?.bannedModal
  while (true) {
    // This state is triggered from Unity when you first got banned, while in the room.
    const bannedModal = yield* select(getBannedModalState)
    // We only care when Unity requests the modal to be visible.
    // Dismissing the modal will be done via web.
    if (bannedModal?.visible) {
      yield* put(
        Actions.setBanned({
          isBanned: true,
          bannedUntilUnixMs: bannedModal.bannedUntilUnixMillis,
        })
      )
    }
    yield* waitUntilChanged(getBannedModalState)
  }
}

/**
 * Coordinates state updates to the PerformanceMonitor
 */
function* performanceMonitorMarks() {
  yield* fork(function* setRoomJoinMethod() {
    const selector = (state: AppState) => state.unity.appState.roomSession?.joinContext
    while (true) {
      const value = yield* select(selector)
      PerformanceMonitor.setJoinContext(value)
      yield* waitUntilChanged(selector)
    }
  })

  yield* fork(function* markFinishedRoomJoin() {
    yield* waitUntilTrue((state: AppState) => {
      const sessionStatus = state.unity.appState.roomSession?.sessionStatus
      const isFullySynced = AppStateSelectors.getRoomFullySynced(state.unity.appState)
      return sessionStatus === RoomSessionStatus.Joined && isFullySynced
    })
    PerformanceMonitor.reportUnityFinishedRoomJoin()
  })

  yield* fork(function* markTimeToRoomVisible() {
    yield* waitUntilTrue((state: AppState) => {
      const dataLoaded = state.unity.appState.roomSession?.initialDataLoadComplete
      const isFullySynced = AppStateSelectors.getRoomFullySynced(state.unity.appState)
      return isFullySynced || dataLoaded
    })
    PerformanceMonitor.reportUnityFinishedRoomJoin()
  })
}
