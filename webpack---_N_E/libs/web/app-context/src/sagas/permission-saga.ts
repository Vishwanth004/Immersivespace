import { isSupported } from "firebase/messaging"
import { call, fork, put, take, takeLeading } from "typed-redux-saga/macro"

import { waitUntilExists } from "@spatialsys/use-saga"
import { ActionType, Actions, RequestPushNotificationPermission } from "@spatialsys/web/app-state"
import { AppState } from "@spatialsys/web/app-state"
import { Storage } from "@spatialsys/web/storage"

import { pushNotificationsSaga } from "./push-notification-saga"

const MIN_NOTIFICATION_PROMPT_INTERVAL_MS = 24 * 60 * 60 * 1000 // Minimum wait of 24h between permission requests

/**
 * Handles logic regarding requesting permissions for client functionality
 */
export function* permissionSaga(swRegistration: ServiceWorkerRegistration) {
  const hasSupport = yield* call(isSupported)
  if (!hasSupport) {
    return
  }

  yield* takeLeading(ActionType.RequestPushNotificationPermission, handleRequestPushNotificationPermission)

  // Only run the accept notification permissions handler once, to avoid running multiple push notification sagas.
  yield* fork(function* handleInitPushNotifications() {
    yield* take(ActionType.AcceptPushNotificationPermission)
    yield* fork(pushNotificationsSaga, swRegistration)
  })

  const user = yield* waitUntilExists((state: AppState) => state.user)
  if (Notification.permission === "granted" || (Notification.permission === "default" && user?.notificationsEnabled)) {
    yield* put(Actions.acceptPushNotificationPermission())
  }
}

function* handleRequestPushNotificationPermission({ payload: modalType }: RequestPushNotificationPermission) {
  // TODO: if they rejected permission, maybe we show a different graphic of how to unblock?
  if (Notification.permission !== "default") return

  // Don't request permission if it has not been long enough since the last time we asked.
  const lastRequestEpochMs = Storage.fetch<number>(Storage.LAST_PUSH_NOTIF_PERMISSION_REQUEST_DATE_KEY) ?? 0
  const currRequestEpochMs = Date.now()

  if (lastRequestEpochMs === 0 || currRequestEpochMs - lastRequestEpochMs > MIN_NOTIFICATION_PROMPT_INTERVAL_MS) {
    Storage.setItem(Storage.LAST_PUSH_NOTIF_PERMISSION_REQUEST_DATE_KEY, currRequestEpochMs)
    yield* put(Actions.setPushNotificationPermissionModalType(modalType))
  }
}
