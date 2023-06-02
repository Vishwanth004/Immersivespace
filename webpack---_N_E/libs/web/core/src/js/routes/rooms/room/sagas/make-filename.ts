import { select } from "typed-redux-saga/macro"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { AppState } from "@spatialsys/web/app-state"

const dateFormat = Intl.DateTimeFormat("default", {
  day: "numeric",
  month: "numeric",
  year: "2-digit",
})

const timeFormat = Intl.DateTimeFormat("default", {
  timeStyle: "short",
})

export function* makeFilename() {
  const spaceName = yield* select((state: AppState) => AppStateSelectors.getCurrentRoomName(state.unity.appState))
  const d = new Date()
  const date = dateFormat.format(d).replaceAll("/", "-")
  const time = timeFormat.format(d).replace(":", ".")
  return `${spaceName} on ${date} at ${time}`
}
