import { eventChannel } from "redux-saga"
import { call } from "typed-redux-saga/macro"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { Properties } from "@spatialsys/react/analytics"
import { Mixpanel } from "@spatialsys/web/analytics"
import { logger } from "@spatialsys/web/logger"

const handlerMap: Record<string, (msg: any) => void> = {
  "track-event": trackMixpanelEvent,
}

function trackMixpanelEvent({ event_name, properties }: { event_name: string; properties: Properties }) {
  Mixpanel.track(event_name, properties)
}

/**
 * Listens for messages coming from the service worker and handles them.
 * @param serviceWorker
 */
export function* serviceWorkerMessages(serviceWorker: ServiceWorkerContainer) {
  const msgChannel = eventChannel<MessageEvent>((emit) => {
    serviceWorker.addEventListener("message", emit)
    return () => serviceWorker.removeEventListener("message", emit)
  })

  // Signal to the service worker that it can start sending messages to window clients
  serviceWorker.controller?.postMessage({ type: "ready" })

  yield* takeEveryAndClose(msgChannel, function* handleMessage(evt) {
    if (evt.data && evt.data.type) {
      const handler = handlerMap[evt.data.type]
      if (!handler) {
        logger.warn("Unknown service worker message type", evt.data.type)
        return
      }
      yield* call(handler, evt.data.payload)
    }
  })
}
