import { StateInspector } from "reinspect"

import { Storage } from "@spatialsys/web/storage"

import { Passthrough } from "./passthrough"

/**
 * Conditionally makes connection to Redux DevTools extension.
 */
export const ReduxStateInspector: typeof StateInspector = Storage.fetch(Storage.REDUX_DEBUG, false, { raw: false })
  ? StateInspector
  : (Passthrough as any)
