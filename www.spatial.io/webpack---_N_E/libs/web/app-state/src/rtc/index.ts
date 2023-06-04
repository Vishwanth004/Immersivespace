import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { RTCConnectionStatus } from "@spatialsys/unity/app-state"
import { RTCLocalClient, RTCMediaCapture } from "@spatialsys/web/rtc/rtc-state"

export type AppRtcState = {
  connectionStatus: RTCConnectionStatus
  localClient: RTCLocalClient | null
  mediaCapture: RTCMediaCapture | null
}

export const initialRtcState: AppRtcState = {
  localClient: null,
  mediaCapture: null,
  connectionStatus: RTCConnectionStatus.Disconnected,
}

export enum RtcActionType {
  ResetRtcState = "ResetRtcState",
  SetRtcConnectionStatus = "SetRtcConnectionStatus",
  SetRtcLocalClient = "SetRtcLocalClient",
  SetRtcMediaCapture = "SetRtcMediaCapture",
}

export type ResetRtcState = ActionT<RtcActionType.ResetRtcState>
export type SetRtcLocalClient = ActionT<RtcActionType.SetRtcLocalClient, RTCLocalClient | null>
export type SetRtcMediaCapture = ActionT<RtcActionType.SetRtcMediaCapture, RTCMediaCapture | null>
export type SetRtcConnectionStatus = ActionT<RtcActionType.SetRtcConnectionStatus, RTCConnectionStatus>

export const RtcActions = {
  resetRtcState: makeActionCreator<ResetRtcState>(RtcActionType.ResetRtcState),
  setRtcLocalClient: makeActionCreator<SetRtcLocalClient>(RtcActionType.SetRtcLocalClient),
  setRtcMediaCapture: makeActionCreator<SetRtcMediaCapture>(RtcActionType.SetRtcMediaCapture),
  setRtcConnectionStatus: makeActionCreator<SetRtcConnectionStatus>(RtcActionType.SetRtcConnectionStatus),
}

export type RtcAction = GetActionType<typeof RtcActions>

export function rtcReducer(state: AppRtcState, action: RtcAction): AppRtcState {
  switch (action.type) {
    case RtcActionType.SetRtcLocalClient:
      return { ...state, localClient: action.payload }
    case RtcActionType.SetRtcMediaCapture:
      return { ...state, mediaCapture: action.payload }
    case RtcActionType.SetRtcConnectionStatus:
      return { ...state, connectionStatus: action.payload }
    case RtcActionType.ResetRtcState:
      return initialRtcState
    default:
      return state
  }
}
