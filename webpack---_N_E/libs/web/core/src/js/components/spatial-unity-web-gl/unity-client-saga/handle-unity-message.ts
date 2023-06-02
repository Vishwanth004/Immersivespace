import Router from "next/router"
import { call, fork, put, select } from "typed-redux-saga/macro"

import { ENABLED_TREATMENT_VALUE } from "@spatialsys/js/sapi/types"
import { AppStateKeyPaths, AppStateSelectors, QuestStatus, RequestAlertToReactType } from "@spatialsys/unity/app-state"
import {
  BadgeRewardedMessage,
  QuestCompleteMessage,
  QuestTaskCompleteMessage,
  ReactAlertMessage,
  UnityMessages,
} from "@spatialsys/unity/bridge"
import { waitUntilChanged, waitUntilExists } from "@spatialsys/use-saga"
import { Mixpanel } from "@spatialsys/web/analytics"
import { Actions, AppState, Modals, Selectors } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import * as PerformanceMonitor from "@spatialsys/web/core/js/analytics/performance-monitor"
import { LogChannel, logger } from "@spatialsys/web/logger"
import { Storage } from "@spatialsys/web/storage"
import { getShortUA } from "@spatialsys/web/user-agent"

import { finishScreenshot } from "../../../routes/rooms/room/sagas/screenshot-saga"
import createAlert from "../create-alert"

const ExtraKeyPathsToObserve: AppStateKeyPaths[] = [
  "hasUsedMouseOrKeyboard",
  "microphone/status",
  "roomSession/meetings",
  "roomSession/sessionDataSynced",
  "rtc/token",
]

const messageToHandlerMap: Record<string, (message: UnityMessages.UnityMessage) => void> = {
  app_finished_booting: finishBooting,
  app_state_changed: setAppState,
  app_state_patches: patchAppState,
  app_request_alert: handleCreateAlert,
  get_app_config: setAppConfig,
  set_canvas_size: setCanvasSize,
  set_microphone_level: setMicLevel,
  leave_room: leaveRoom,
  mixpanel_track: mixpanelTrack,
  mixpanel_register: mixpanelRegister,
  mixpanel_unregister: mixpanelUnregister,
  end_of_frame: finishScreenshot,
  quest_completed: onQuestCompleted,
  quest_task_completed: onQuestTaskCompleted,
  badge_rewarded: onBadgeRewarded,
}

const UnityBridgeChannel = new LogChannel("UnityBridge")

export function* handleUnityMessage(messageString: string) {
  const preParse = performance.now()
  const message = JSON.parse(messageString) as UnityMessages.UnityMessage
  const postParse = performance.now()

  if (!message?.name) {
    logger.error(UnityBridgeChannel, "Received message without `name` property", { message })
    return
  }

  if (Config.DEPLOYMENT_ENV !== "production" && message.timing) {
    message.timing.preParse = preParse
    message.timing.postParse = postParse
    const user = yield* select((state: AppState) => state.user)
    if (user?.treatments.recordReactBridgeTraces === ENABLED_TREATMENT_VALUE) {
      recordBridgeMessageTiming(message)
    }
  }

  const handler = messageToHandlerMap[message.name]
  if (!handler) {
    logger.error(UnityBridgeChannel, "Unhandled message", { message })
    return
  }
  yield* call(handler, message)
}

function* setAppConfig() {
  UnityMessages.setAppConfig({
    spatialUid: yield* select((state: AppState) => state.spatialUid),
    swagOrigin: "", // same origin
    sapiOrigin: Config.API_URL,
  })
}

function* finishBooting() {
  const user = yield* waitUntilExists((state: AppState) => state.user)
  const auth = yield* select((state: AppState) => state.auth)
  UnityMessages.finishBooting()
  UnityMessages.setWebUserAgent(getShortUA(navigator.userAgent)) // For better context on logs from Unity side
  UnityMessages.initializeAppStateObservers(ExtraKeyPathsToObserve)
  UnityMessages.logIn(auth.accessToken, auth.useAuthlessToken, JSON.stringify(user.raw))
  const urlParams = new URLSearchParams(window.location.search)
  initLogLevelSettings()
  yield* fork(initCameraPixelRatioSettings, urlParams)
  initTargetFPSSettings(urlParams)
  initAntiAliasingSettings(urlParams)
  yield* put(Actions.setIsStarted(true))
}

function* setAppState(message: UnityMessages.UnityMessage) {
  yield* put(Actions.setUnityAppState(message.data))
}

function* patchAppState(message: UnityMessages.UnityMessage) {
  yield* put(Actions.patchAppState(message.data))
}

function* handleCreateAlert(message: UnityMessages.UnityMessage) {
  const unityAlert = message.data as ReactAlertMessage
  if (unityAlert.alertType === RequestAlertToReactType.EnterPortal) {
    yield* put(Actions.setAlertFromUnity(unityAlert))
  } else {
    createAlert(unityAlert, (feedback) => {
      UnityMessages.requestAlertFeedback(unityAlert.callbackID, feedback)
    })
  }
}

function* setCanvasSize(message: UnityMessages.UnityMessage) {
  const { width, height } = message.data
  const canvas = yield* select((state: AppState) => state.canvas)
  canvas.width = width
  canvas.height = height
}

interface MixpanelTrackMessage {
  eventName: string
  properties: Record<string, any>
}

function mixpanelTrack(message: UnityMessages.UnityMessage<MixpanelTrackMessage>) {
  Mixpanel.track(message.data.eventName, message.data.properties)
}

function mixpanelRegister(message: UnityMessages.UnityMessage<Record<string, any>>) {
  Mixpanel.register(message.data)
}

function mixpanelUnregister(message: UnityMessages.UnityMessage<string>) {
  Mixpanel.unregister(message.data)
}

function* setMicLevel(message: UnityMessages.UnityMessage) {
  const micPeakAmplitude = yield* select((state: AppState) => state.space.micPeakAmplitude)
  // This is a setter on a MotionValue and not a put effect because it's a special fast path
  // since this state changes at such a high frequency.
  micPeakAmplitude.set(message.data.level)
}

function leaveRoom() {
  void Router.push("/")
}

const initLogLevelSettings = () => {
  const localLogLevel = Storage.fetch(Storage.STORAGE_LOCAL_LOG_LEVEL_KEY, -1 as number)
  const remoteLogLevel = Storage.fetch(Storage.STORAGE_REMOTE_LOG_LEVEL_KEY, -1 as number)
  if (localLogLevel >= 0) {
    UnityMessages.setLocalLogLevel(localLogLevel)
  }
  if (remoteLogLevel >= 0) {
    UnityMessages.setRemoteLogLevel(remoteLogLevel)
  }
}

/**
 * Orchestrates the initial value and subsequent updates to the camera pixel ratio setting within
 * the Spatial Unity app.
 * @param params
 * @returns background task listening for changes to the pixel ratio state and sending updates to
 * Unity.
 */
function* initCameraPixelRatioSettings(params: URLSearchParams) {
  let pixelRatio: number = yield* select(Selectors.getSelectedPixelRatio)
  const pixelRatioOverride = parseFloat(params.get("pixel_ratio"))
  if (pixelRatioOverride) pixelRatio = pixelRatioOverride

  // values above 1.0 are obsolete
  // 1.0 is now the native resolution (takes into account device pixel ratio & browser zoom level)
  if (pixelRatio > 1.0) pixelRatio = 1.0

  yield* put(Actions.setMediaSettings({ selectedPixelRatio: pixelRatio }))

  while (true) {
    if (pixelRatio === -1) {
      UnityMessages.setCameraPixelRatio(1.0)
      UnityMessages.enableAutoCameraPixelRatio()
    } else {
      UnityMessages.setCameraPixelRatio(pixelRatio)
      UnityMessages.disableAutoCameraPixelRatio()
    }
    ;[pixelRatio] = yield* waitUntilChanged(Selectors.getSelectedPixelRatio)
  }
}

const initTargetFPSSettings = (params: URLSearchParams) => {
  const targetFramerateOverride = parseFloat(params.get("framerate"))
  if (targetFramerateOverride) {
    UnityMessages.setFramerateSettings(targetFramerateOverride, 0)
  }
}

const initAntiAliasingSettings = (params: URLSearchParams) => {
  const antiAliasingOverride: number = parseInt(params.get("anti_aliasing"))
  if (antiAliasingOverride) {
    UnityMessages.setAntiAliasing(antiAliasingOverride)
  }
}

const recordBridgeMessageTiming = (msg: UnityMessages.UnityMessage) => {
  const serialize = msg.timing.postSerialize - msg.timing.preSerialize
  const transit = msg.timing.preParse - msg.timing.postSerialize
  const parse = msg.timing.postParse - msg.timing.preParse
  PerformanceMonitor.reportBridgeMessageTiming({ msgName: msg.name, serialize, transit, parse })
}

function* onQuestCompleted(message: UnityMessages.UnityMessage<QuestCompleteMessage>) {
  const { data } = message
  const quests = yield* select((state: AppState) => state.unity.appState.roomSession.questSystem.quests)
  const quest = quests[data.questId]

  // Open the quest complete modal if the completed quest rewards a badge, or the user has completed
  // all quests in the space.
  // In the future, we will have a separate UI banner for badges, so this will only be dispatched when
  // the user has completed all quests in the space.
  if (Object.values(quests).every((q) => q.status === QuestStatus.Completed)) {
    yield* put(Actions.openModal({ type: Modals.QuestComplete, payload: { questId: data.questId } }))
  }

  // If the completed quest somehow doesn't exist, do not trigger updates to the Quest pill UI
  // This should be impossible, but protect against it anyway
  if (!quest) return
  yield* put(Actions.questCompleted(quest))
}

function* onQuestTaskCompleted(message: UnityMessages.UnityMessage<QuestTaskCompleteMessage>) {
  const activeQuest = yield* select((state: AppState) => AppStateSelectors.getActiveQuest(state.unity.appState))
  if (!activeQuest) return
  const taskIndex = activeQuest.taskIDtoIndex[message.data.taskId]
  const task = activeQuest.tasks[taskIndex]
  // Should be impossible, but protect against the task not existing.
  if (!task) return
  yield* put(Actions.questTaskCompleted(task))
}

function* onBadgeRewarded(message: UnityMessages.UnityMessage<BadgeRewardedMessage>) {
  yield* put(Actions.badgeRewarded(message.data.badgeId))
}
