import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { RoomJoinMethod } from "@spatialsys/unity/app-state"
import { JoinContext } from "@spatialsys/unity/bridge"

export type SpaceJoinContextState = JoinContext

export enum SpaceJoinContextActionType {
  ResetSpaceJoinContext = "ResetSpaceJoinContext",
  SetSpaceJoinContext = "SetSpaceJoinContext",
}

export type SetSpaceJoinContext = ActionT<SpaceJoinContextActionType.SetSpaceJoinContext, SpaceJoinContextState>
/** Resets `method` to `BrowserNavigation`, and clears all other properties */
export type ResetSpaceJoinContext = ActionT<SpaceJoinContextActionType.ResetSpaceJoinContext>

export const SpaceJoinContextActions = {
  setSpaceJoinContext: makeActionCreator<SetSpaceJoinContext>(SpaceJoinContextActionType.SetSpaceJoinContext),
  resetSpaceJoinContext: makeActionCreator<ResetSpaceJoinContext>(SpaceJoinContextActionType.ResetSpaceJoinContext),
}

export type SpaceJoinContextAction = GetActionType<typeof SpaceJoinContextActions>

export const spaceJoinContextReducer = (
  state: SpaceJoinContextState,
  action: SpaceJoinContextAction
): SpaceJoinContextState => {
  switch (action.type) {
    case SpaceJoinContextActionType.SetSpaceJoinContext:
      return action.payload
    case SpaceJoinContextActionType.ResetSpaceJoinContext:
      return { method: RoomJoinMethod.BrowserNavigation }
    default:
      return state
  }
}
