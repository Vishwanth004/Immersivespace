import { MessagePayload, Messaging, getMessaging, getToken, onMessage } from "firebase/messaging"
import { eventChannel } from "redux-saga"
import { SagaGenerator, call } from "typed-redux-saga/macro"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { InteractionName, InteractionType, trackInteraction } from "@spatialsys/react/analytics"
import { Mixpanel, recordUtmParameters, track } from "@spatialsys/web/analytics"
import Config from "@spatialsys/web/config"
import { sapiNotificationClient } from "@spatialsys/web/sapi"

import { firebaseApp } from "../firebase-app"

export function* pushNotificationsSaga(swRegistration: ServiceWorkerRegistration) {
  const result = yield* call(initializeNotifications, swRegistration)
  if (!result) {
    return // permission denied or some error
  }

  const { messaging, token } = result

  // Send notification token to SAPI to store this device.
  sapiNotificationClient.notification.addDeviceToken(token).catch((err) => {
    console.error("Failed to register device token on SAPI", err)
  })

  const channel = yield* call(createPushMessageChannel, messaging)
  yield* takeEveryAndClose(channel, handleForegroundPushNotification)
}

function createPushMessageChannel(messaging: Messaging) {
  return eventChannel<MessagePayload>((emitter) => onMessage(messaging, emitter))
}

export async function deactivateNotifications() {
  const messaging = getMessaging(firebaseApp)
  if (Notification.permission === "granted") {
    const token = await getToken(messaging)
    if (token) {
      sapiNotificationClient.notification.removeDeviceToken(token).catch((err) => {
        console.error(`error deleting FCM token: ${err}, ${token}`)
      })
    }
  }
}

function handleForegroundPushNotification(payload: MessagePayload) {
  // Notification field can be undefined in the payload, but it shouldn't ever happen.
  // We should check anyway to gracefully handle the error.
  if (payload.notification) {
    const link = payload.data?.["link"]

    Mixpanel.track(InteractionName.PushNotificationReceived, {
      "In Foreground": true,
      Title: payload.notification.title,
      Body: payload.notification.body,
      Link: link,
    })

    // Spatial can be open in multiple tabs, so only display a foreground notification if the tab is visible.
    if (!document.hidden) {
      // TODO: handle foreground in-app notifications differently, using custom UI component.
      const notification = new Notification(payload.notification.title ?? "Notification from Spatial", {
        body: payload.notification.body,
      })

      if (link) {
        notification.onclick = (_) => {
          const result: Record<string, string> = {}
          for (const [key, value] of new URL(link).searchParams) {
            result[key] = value
          }
          recordUtmParameters(result)

          trackInteraction(
            track,
            { name: InteractionName.PushNotificationClicked, type: InteractionType.Click },
            {
              "In Foreground": true,
              Title: payload.notification?.title,
              Body: payload.notification?.body,
              Link: link,
            }
          )
          window.open(link, "_blank")
        }
      }
    }
  } else {
    console.warn("Received a foreground notification without a `notification` field in the payload.", payload)
  }
}

/** Requests permission for notifications and sets up the notification token to send to SAPI */
export function* initializeNotifications(
  serviceWorkerRegistration: ServiceWorkerRegistration
): SagaGenerator<{ messaging: Messaging; token: string } | void> {
  let prevPermission: NotificationPermission
  let currPermission: NotificationPermission

  try {
    prevPermission = Notification.permission
    currPermission = yield* call([Notification, Notification.requestPermission])
  } catch (err) {
    console.error("Failed to retrieve notification permissions from user", err)
    yield* call(trackPushNotificationPermissionFailed, err)
    return
  }

  // Track when user transitioned into "denied permissions" (i.e. user clicked block).
  if (prevPermission !== "denied" && currPermission === "denied") {
    yield* call(trackPushNotificationPermissionFailed)
  }

  if (currPermission !== "granted") return

  try {
    // Gets or initializes FCM client
    const messaging = getMessaging(firebaseApp)
    const currentToken = yield* call(getToken, messaging, {
      vapidKey: Config.FIREBASE_PUBLIC_VAPID_KEY,
      serviceWorkerRegistration,
    })

    if (!currentToken) {
      // We somehow didn't get a token or caught exception, so keep trying as long as the user doesn't block permission.
      return yield* call(initializeNotifications, serviceWorkerRegistration)
    }

    // Transitioned into "allow permissions" (i.e. user clicked allow).
    // We want to filter out occasions where permissions were granted from a previous session.
    if (prevPermission !== "granted" && currPermission === "granted") {
      yield* call(trackInteraction, track, {
        name: InteractionName.PushNotificationPermissionGranted,
        type: InteractionType.Click,
      })

      const Toast = yield* call(
        // FIXME: resolve circular dependency warning
        // eslint-disable-next-line @nx/enforce-module-boundaries
        () => import(/* webpackChunkName: "toast-component" */ "@spatialsys/web/core/js/components/toast/toast")
      )
      const TOAST_DURATION = 3000
      Toast.notify("Successfully accepted notification permission!", TOAST_DURATION)
    }

    return { messaging, token: currentToken }
  } catch (err) {
    console.error("Failed to retrieve notification token!", err)
    yield* call(trackPushNotificationPermissionFailed, err)
  }
}

function* trackPushNotificationPermissionFailed(error?: any) {
  const errorMsg = error?.message

  yield* call(
    trackInteraction,
    track,
    {
      name: InteractionName.PushNotificationPermissionFailed,
      type: error ? InteractionType.Error : InteractionType.Click,
    },
    errorMsg ? { "Error Message": errorMsg } : undefined
  )
}
