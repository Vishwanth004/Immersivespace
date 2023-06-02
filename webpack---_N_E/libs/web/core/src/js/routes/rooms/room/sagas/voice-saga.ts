import { select } from "typed-redux-saga/macro"

import { VoiceProvider } from "@spatialsys/unity/app-state"
import { waitUntilChanged, waitUntilTrue } from "@spatialsys/use-saga"
import { AppState } from "@spatialsys/web/app-state"
import type { RoomRTCManager } from "@spatialsys/web/rtc/room-rtc-manager"

/**
 * Handles connecting and disconnecting the RTC Manager to LiveSwitch Voice, and starting and
 * stopping transmission.
 * @param rtcManager
 */
export function* voiceSaga(rtcManager: RoomRTCManager) {
  // Make sure rtcManager is ready for capturing local media before connecting
  yield* waitUntilTrue((state: AppState) => state.space.rtcState.readyForCapture)

  // If voice provider changes, or user joined or left voice, tell RTC manager to connect/disconnect
  // Only necessary for LS Voice because PhotonVoice is managed fully in unity
  const getSessionVoiceState = (state: AppState) => state.unity.appState.roomSession.voice
  let sessionVoiceState = yield* select(getSessionVoiceState)
  while (true) {
    const shouldConnectToLSVoice =
      sessionVoiceState.userEnabledVoiceConnection && sessionVoiceState.activeProvider === VoiceProvider.LiveSwitch
    const shouldTransmitLSVoice = shouldConnectToLSVoice && sessionVoiceState.transmissionActive

    rtcManager.setShouldConnectToVoice(shouldConnectToLSVoice, sessionVoiceState.liveSwitch.listeningToClients)
    rtcManager.setShouldTransmitVoice(shouldTransmitLSVoice)
    ;[sessionVoiceState] = yield* waitUntilChanged(getSessionVoiceState)
  }
}
