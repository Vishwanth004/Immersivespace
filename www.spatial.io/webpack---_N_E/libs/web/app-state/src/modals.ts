import { last } from "lodash"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { Message } from "@spatialsys/js/types"

export const enum Modals {
  CameraControls,
  CreateSpace,
  Debug,
  HostTools,
  Login,
  QuestComplete,
  UnlockableDanceStreak,
  ReportSpace,
}

type ModalOptionT<T extends Modals, P = undefined> = Message<T, P>

type CameraControlsModal = ModalOptionT<Modals.CameraControls>
type CreateSpaceModal = ModalOptionT<Modals.CreateSpace>
type DebugModal = ModalOptionT<Modals.Debug>
type HostToolsModal = ModalOptionT<Modals.HostTools>
type LoginModal = ModalOptionT<Modals.Login, { forceRedirect?: boolean; titleCta?: string }>
type QuestCompleteModal = ModalOptionT<Modals.QuestComplete, { badgeId?: string }>
type UnlockableDanceStreakModal = ModalOptionT<Modals.UnlockableDanceStreak>
type ReportSpaceModal = ModalOptionT<Modals.ReportSpace, { spaceID: string; spaceName: string }>

export type ModalOption =
  | CameraControlsModal
  | CreateSpaceModal
  | DebugModal
  | HostToolsModal
  | LoginModal
  | QuestCompleteModal
  | ReportSpaceModal
  | UnlockableDanceStreakModal

export type ModalsState = ModalOption[]

export const initialModalState: ModalsState = []

export enum ModalsActionType {
  CloseModal = "CloseModal",
  OpenModal = "OpenModal",
}

export type CloseModal = ActionT<ModalsActionType.CloseModal, Modals>
export type OpenModal = ActionT<ModalsActionType.OpenModal, ModalOption>

export const ModalActions = {
  closeModal: makeActionCreator<CloseModal>(ModalsActionType.CloseModal),
  openModal: makeActionCreator<OpenModal>(ModalsActionType.OpenModal),
}

export type ModalAction = GetActionType<typeof ModalActions>

export function modalsReducer(state: ModalsState, action: ModalAction): ModalsState {
  switch (action.type) {
    case ModalsActionType.CloseModal:
      return state.filter((modal) => modal.type !== action.payload)
    case ModalsActionType.OpenModal:
      // Don't allow opening the same modal multiple times
      if (last(state)?.type === action.payload.type) {
        return state
      }
      return state.concat(action.payload)
    default:
      return state
  }
}
