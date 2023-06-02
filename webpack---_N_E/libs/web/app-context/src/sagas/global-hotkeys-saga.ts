import { Saga } from "redux-saga"
import { call, put, select } from "typed-redux-saga/macro"

import { createKeyDownChannel, takeEveryAndClose } from "@spatialsys/js/redux"
import { isInputFocused } from "@spatialsys/js/util/is-input-focused"
import { isModifierKeyPressed } from "@spatialsys/js/util/is-modifier-key-pressed"
import { Actions, AppState, Modals, Selectors } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"

export function* globalHotkeysSaga() {
  const channel = createKeyDownChannel()
  yield* takeEveryAndClose(channel, handleKeyDown)
}

const hotkeyMap: Record<string, Saga> = {
  *KeyB() {
    const canView = yield* select((state: AppState) => Selectors.canViewDebugSettings(state, Config))
    if (!canView) {
      return
    }
    yield* put(Actions.openModal({ type: Modals.Debug }))
  },
}

function* handleKeyDown(evt: KeyboardEvent) {
  if (yield* call(isModifierKeyPressed, evt)) {
    return
  }

  const openModalCount = yield* select((state: AppState) => state.openModalCount)
  if (openModalCount > 0) {
    return
  }

  if (isInputFocused()) {
    return
  }

  const handler = hotkeyMap[evt.code]
  if (handler) {
    yield* call(handler)
  }
}
