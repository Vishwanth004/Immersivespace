import { MutationObserver } from "@tanstack/react-query"
import { isEmpty } from "lodash"
import { Saga } from "redux-saga"
import { call, fork, put, select } from "typed-redux-saga/macro"

import { createKeyDownChannel, takeEveryAndClose } from "@spatialsys/js/redux"
import {
  AcknowledgeNotificationRequest,
  Keybind,
  KeybindActionsType,
  NotificationKeys,
  UserData,
  getShouldShowHide2dUiToast,
} from "@spatialsys/js/sapi/clients/sapi"
import { EmoteType } from "@spatialsys/js/sapi/types"
import { isInputFocused } from "@spatialsys/js/util/is-input-focused"
import { InteractionName, InteractionType, trackInteraction } from "@spatialsys/react/analytics"
import { getAcknowledgeNotificationsOptions } from "@spatialsys/react/query-hooks/sapi/user"
import { InputManager_InputMethod } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilChanged } from "@spatialsys/use-saga"
import { track } from "@spatialsys/web/analytics"
import { Actions, AppState, Modals, UiModes } from "@spatialsys/web/app-state"
import { playEmotePayload } from "@spatialsys/web/core/js/components/emotes/utils"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { serializeKeyboardEvent } from "@spatialsys/web/core/js/util/keyboard-event"
import { sapiClient } from "@spatialsys/web/sapi"

type HotkeyOptions = {
  /** If true, the hotkey is ignored if any modals are open. */
  ignoreIfModalOpen?: true
}

type HotkeyMap = Record<string, { handler: Saga<[KeyboardEvent]>; options?: HotkeyOptions }>

let acknowledgeNotificationMutationObserver: MutationObserver<
  void,
  unknown,
  AcknowledgeNotificationRequest,
  {
    previousUserProfile: UserData
  }
> = null

const defaultHotkeys: HotkeyMap = {
  KeyH: {
    *handler() {
      yield* put(Actions.toggle2dUiVisibility())
      const isVisible = yield* select((state: AppState) => state.space.is2dUiVisible)
      // show a toast if this is the first time the user hid the UI
      if (!isVisible) {
        const user = yield* select((state: AppState) => state.user)
        const isAuthless = yield* select((state: AppState) => state.auth.useAuthlessToken)

        const shouldShowHide2dUiToast: boolean = user.acknowledgedInAppNotificationKeys
          ? getShouldShowHide2dUiToast(user.acknowledgedInAppNotificationKeys)
          : true

        if (shouldShowHide2dUiToast) {
          Toast.notifyManualClose(
            "Press H or ESC to show controls again.",
            undefined,
            () => {
              if (!isAuthless) {
                void acknowledgeNotificationMutationObserver.mutate({
                  userId: user.id,
                  notification: NotificationKeys.hasDismissedHide2dUiToast,
                })
              }
            },
            Toast.InRoomContainerId
          )
        }
      }
    },
    options: { ignoreIfModalOpen: true },
  },
  Escape: {
    *handler() {
      const isVisible = yield* select((state: AppState) => state.space.is2dUiVisible)
      if (!isVisible) {
        yield* put(Actions.set2dUiVisibility(true))
        return
      }

      const uiMode = yield* select((state: AppState) => state.space.uiMode)
      if (uiMode === UiModes.Camera) {
        yield* put(Actions.setUiMode(UiModes.Default))
      }
    },
    options: { ignoreIfModalOpen: true },
  },
  KeyR: {
    *handler() {
      const isRecording = yield* select((state: AppState) => state.space.isScreenRecording)
      const action = isRecording ? Actions.stopRecording() : Actions.startRecording()
      const name = isRecording ? InteractionName.RecordVideoStop : InteractionName.RecordVideoStart
      yield* put(action)
      yield* call(trackInteraction, track, { name, type: InteractionType.Keypress })
    },
    options: { ignoreIfModalOpen: true },
  },
  KeyT: {
    *handler() {
      yield* put(Actions.takeScreenshot())
      yield* call(trackInteraction, track, { name: InteractionName.TakeScreenshot, type: InteractionType.Keypress })
    },
    options: { ignoreIfModalOpen: true },
  },
  KeyM: {
    *handler() {
      const isAuthless = yield* select((state: AppState) => state.auth.useAuthlessToken)
      const isMuted = yield* select((state: AppState) => state.unity.appState.roomSession.voice.isMuted)
      if (isAuthless && isMuted) {
        yield* put(
          Actions.openModal({ type: Modals.Login, payload: { forceRedirect: true, titleCta: "Sign in to unmute" } })
        )
        return
      }
      UnityMessages.setVoiceMuted(!isMuted)
      yield* call(trackInteraction, track, {
        name: isMuted ? InteractionName.UnmuteSelf : InteractionName.MuteSelf,
        type: InteractionType.Keypress,
      })
    },
  },
  KeyI: {
    *handler() {
      const isEmptyBackpack = yield* select((state: AppState) =>
        isEmpty(state.unity.appState.roomSession.backpack.items)
      )
      const hasWorldCurrency = yield* select(
        (state: AppState) => state.unity.appState.roomSession.backpack.worldCurrencyID
      )
      const isBackpackOpen = yield* select((state: AppState) => state.unity.appState.roomSession.backpack.isOpen)
      if (hasWorldCurrency || !isEmptyBackpack) {
        UnityMessages.setShopOpen(false)
        UnityMessages.setBackpackOpen(!isBackpackOpen)
      }
    },
  },
  KeyP: {
    *handler() {
      const isEmptyShop = yield* select((state: AppState) => isEmpty(state.unity.appState.roomSession.shop.items))
      const hasWorldCurrency = yield* select(
        (state: AppState) => state.unity.appState.roomSession.backpack.worldCurrencyID
      )
      const isShopOpen = yield* select((state: AppState) => state.unity.appState.roomSession.shop.isOpen)
      const showShop = yield* select((state: AppState) => state.user.featureFlags.shop ?? false)
      if (showShop && hasWorldCurrency && !isEmptyShop) {
        UnityMessages.setBackpackOpen(false)
        UnityMessages.setShopOpen(!isShopOpen)
      }
    },
  },
  KeyO: {
    *handler() {
      const hasTreatment = yield* select(
        (state: AppState) => state.unity.appState.userProfile.config.treatments.objectInspectorDebug
      )
      if (hasTreatment) {
        yield* put(Actions.toggleObjectInspectorVisibility())
      }
    },
    options: { ignoreIfModalOpen: true },
  },
  KeyY: {
    *handler(event: KeyboardEvent) {
      yield* call(
        playEmotePayload,
        { emoteType: EmoteType.Animation, identifier: "Agree" },
        { method: InputManager_InputMethod.Keypress },
        event.repeat
      )
    },
  },
  KeyN: {
    *handler(event: KeyboardEvent) {
      yield* call(
        playEmotePayload,
        { emoteType: EmoteType.Animation, identifier: "Disagree" },
        { method: InputManager_InputMethod.Keypress },
        event.repeat
      )
    },
  },
  KeyC: {
    *handler(event: KeyboardEvent) {
      yield* call(
        playEmotePayload,
        { emoteType: EmoteType.Animation, identifier: "Clap" },
        { method: InputManager_InputMethod.Keypress },
        event.repeat
      )
    },
  },
}

defaultHotkeys["shift+KeyR"] = defaultHotkeys.KeyR
defaultHotkeys["shift+KeyT"] = defaultHotkeys.KeyT
defaultHotkeys["shift+KeyM"] = defaultHotkeys.KeyM
defaultHotkeys["shift+KeyI"] = defaultHotkeys.KeyI
defaultHotkeys["shift+KeyP"] = defaultHotkeys.KeyP
defaultHotkeys["shift+KeyY"] = defaultHotkeys.KeyY
defaultHotkeys["shift+KeyN"] = defaultHotkeys.KeyN
defaultHotkeys["shift+KeyC"] = defaultHotkeys.KeyC

function* setupHotkeyListener(customKeybinds: Record<string, Keybind>) {
  // Parse user custom keybindings and combine them with the default keybindings.
  const hotkeyMap: HotkeyMap = { ...defaultHotkeys }
  for (const [key, keybind] of Object.entries(customKeybinds)) {
    hotkeyMap[key] = { handler: createCustomKeybindHandler(keybind) }
  }

  const channel = createKeyDownChannel()
  yield* takeEveryAndClose(channel, (e: KeyboardEvent) => handleKeyDown(e, hotkeyMap))
}

/**
 * Registers an event listener on keydown. Handles default hotkeys as well as custom user keybindings.
 * When `user.keybinds` changes, the keydown listener is re-registered with the new keybindings.
 */
export function* hotkeysSaga() {
  try {
    const reactQueryClient = yield* select((state: AppState) => state.reactQueryClient)

    acknowledgeNotificationMutationObserver = new MutationObserver(
      reactQueryClient,
      getAcknowledgeNotificationsOptions(sapiClient, reactQueryClient)
    )

    let customKeybinds = yield* select((state: AppState) => state.user.keybinds)
    // When `user.keybinds` changes, re-register the keydown listener with the new keybinds.
    while (true) {
      const task = yield* fork(setupHotkeyListener, customKeybinds)
      ;[customKeybinds] = yield* waitUntilChanged((state: AppState) => state.user.keybinds)
      task.cancel()
    }
  } finally {
    yield* put(Actions.set2dUiVisibility(true))
  }
}

function* handleKeyDown(event: KeyboardEvent, hotkeyMap: HotkeyMap) {
  // Short-circuit if an input field is focused.
  if (yield* call(isInputFocused)) {
    return
  }

  // If a handler exists for the given key, call its handler!
  const serializedEvent = serializeKeyboardEvent(event)
  const entry = hotkeyMap[serializedEvent]
  if (!entry) {
    return
  }

  // Short-circuit if modal is open, and the hotkey should be ignored if modal is open.
  if (entry.options?.ignoreIfModalOpen) {
    const openModalCount = yield* select((state: AppState) => state.openModalCount)
    if (openModalCount > 0) {
      return
    }
  }

  yield* call(entry.handler, event, entry.options)
}

/**
 * Creates Saga for handling a custom keybind press
 */
const createCustomKeybindHandler = (keybind: Keybind) =>
  function* customKeybindHandler(event: KeyboardEvent) {
    const { action } = keybind
    switch (action.type) {
      case KeybindActionsType.Emote:
        yield* call(playEmotePayload, action.payload, { method: InputManager_InputMethod.Keypress }, event.repeat)
    }
  }
