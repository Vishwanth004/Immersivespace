import { GetActionType } from "@spatialsys/js/redux"

import { AppAction, AppActionType, AppActions, AppState, appStateReducer } from "./app-state"
import { AuthAction, AuthActionType, AuthActions, authReducer } from "./auth/auth-state"
import * as AuthSelectors from "./auth/selectors"
import { ModalAction, ModalActions, ModalsActionType, modalsReducer } from "./modals"
import { RtcAction, RtcActionType, RtcActions, rtcReducer } from "./rtc"
import * as AppSelectors from "./selectors"
import { SpaceAction, SpaceActionType, SpaceActions, spaceReducer } from "./space"
import { TokenGateAction, TokenGateActionType, TokenGateActions, tokenGateReducer } from "./token-gate-state"
import { UnityClientAction, UnityClientActionType, UnityClientActions, unityClientReducer } from "./unity-client"

export * from "./app-state"
export * from "./auth/auth-state"
export * from "./auth/errors"
export * from "./modals"
export * from "./rtc"
export * from "./space"
export * from "./space/chat"
export * from "./space/join-context"
export * from "./space/quests"
export * from "./space/rewards"
export * from "./token-gate-state"
export * from "./unity-client"

// Composing action domains together

export type ActionType =
  | AppActionType
  | AuthActionType
  | ModalsActionType
  | RtcActionType
  | SpaceActionType
  | TokenGateActionType
  | UnityClientActionType

export const ActionType = {
  ...AppActionType,
  ...AuthActionType,
  ...ModalsActionType,
  ...RtcActionType,
  ...SpaceActionType,
  ...TokenGateActionType,
  ...UnityClientActionType,
}

export const Actions = {
  ...AppActions,
  ...AuthActions,
  ...ModalActions,
  ...RtcActions,
  ...SpaceActions,
  ...TokenGateActions,
  ...UnityClientActions,
}

export type Action = GetActionType<typeof Actions>

// Composing root state from sub-reducers

export function rootReducer(state: AppState, action: Action): AppState {
  const auth = authReducer(state.auth, action as AuthAction, state.reactQueryClient)
  const modals = modalsReducer(state.modals, action as ModalAction)
  const rtc = rtcReducer(state.rtc, action as RtcAction)
  const space = spaceReducer(state.space, action as SpaceAction)
  const tokenGate = tokenGateReducer(state.tokenGate, action as TokenGateAction)
  const unity = unityClientReducer(state.unity, action as UnityClientAction)
  return {
    ...appStateReducer(state, action as AppAction),
    auth,
    modals,
    rtc,
    space,
    tokenGate,
    unity,
  }
}

// Composing selector functions together

export const Selectors = {
  ...AppSelectors,
  ...AuthSelectors,
}
