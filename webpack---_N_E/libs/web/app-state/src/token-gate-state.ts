import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { TokenGateConfig } from "@spatialsys/js/sapi/types"

export type TokenGateState = {
  isTokenGatedFromRoom: boolean
  tokenGatedRoomConfig: TokenGateConfig | null
  tokenGatedRoomName: string
  tokenGatedUserHasWallet: boolean
}

export const initialTokenGateState: TokenGateState = {
  isTokenGatedFromRoom: false,
  tokenGatedRoomConfig: null,
  tokenGatedRoomName: "",
  tokenGatedUserHasWallet: false,
}

export enum TokenGateActionType {
  SetTokenGate = "SetTokenGate",
}

export type SetTokenGate = ActionT<TokenGateActionType.SetTokenGate, Partial<TokenGateState>>

export const TokenGateActions = {
  setTokenGate: makeActionCreator<SetTokenGate>(TokenGateActionType.SetTokenGate),
}

export type TokenGateAction = GetActionType<typeof TokenGateActions>

export const tokenGateReducer = (state: TokenGateState, action: TokenGateAction): TokenGateState => {
  switch (action.type) {
    case TokenGateActionType.SetTokenGate:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
