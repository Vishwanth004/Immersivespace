import { produce } from "immer"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { QuestState, QuestTaskState } from "@spatialsys/unity/app-state"

export interface QuestsState {
  isHovering: boolean
  /**
   * If true, the user just started a new quest.
   * This field remains `true` until the user hovers over the quests pill.
   */
  isStartingAnim: boolean
  /** The quest that was just completed. Will be cleared after a short delay */
  recentlyCompletedQuest: (QuestState & { isExpanded: boolean }) | null
  /** The task that was just completed. Will be cleared after a short delay */
  recentlyCompletedTask: (QuestTaskState & { isExpanded: boolean }) | null
}

export const initialQuestsState: QuestsState = {
  isHovering: false,
  isStartingAnim: false,
  recentlyCompletedTask: null,
  recentlyCompletedQuest: null,
}

export enum QuestsActionType {
  QuestCompleted = "QuestCompleted",
  QuestCompletedCollapsePill = "QuestCompletedCollapsePill",
  QuestCompletedExpandPill = "QuestCompletedExpandPill",
  QuestTaskCompleted = "QuestTaskCompleted",
  QuestTaskCompletedCollapsePill = "QuestTaskCompletedCollapsePill",
  QuestTaskCompletedExpandPill = "QuestTaskCompletedExpandPill",
  SetIsHoveringQuestsPill = "SetIsHoveringQuestsPill",
  SetQuestsIsStartingAnim = "SetQuestsIsStartingAnim",
  StopQuestsStartingAnim = "StopQuestsStartingAnim",
}

export type QuestCompleted = ActionT<QuestsActionType.QuestCompleted, QuestState>
export type QuestCompletedExpandPill = ActionT<QuestsActionType.QuestCompletedExpandPill>
export type QuestCompletedCollapsePill = ActionT<QuestsActionType.QuestCompletedCollapsePill>
export type QuestTaskCompleted = ActionT<QuestsActionType.QuestTaskCompleted, QuestTaskState>
export type QuestTaskCompletedExpandPill = ActionT<QuestsActionType.QuestTaskCompletedExpandPill>
export type QuestTaskCompletedCollapsePill = ActionT<QuestsActionType.QuestTaskCompletedCollapsePill>
export type SetQuestsIsStartingAnim = ActionT<QuestsActionType.SetQuestsIsStartingAnim>
export type SetIsHoveringQuestsPill = ActionT<QuestsActionType.SetIsHoveringQuestsPill, boolean>
export type StopQuestsStartingAnim = ActionT<QuestsActionType.StopQuestsStartingAnim>

export const QuestsActions = {
  questCompleted: makeActionCreator<QuestCompleted>(QuestsActionType.QuestCompleted),
  questCompletedExpandPill: makeActionCreator<QuestCompletedExpandPill>(QuestsActionType.QuestCompletedExpandPill),
  questCompletedCollapsePill: makeActionCreator<QuestCompletedCollapsePill>(
    QuestsActionType.QuestCompletedCollapsePill
  ),
  questTaskCompleted: makeActionCreator<QuestTaskCompleted>(QuestsActionType.QuestTaskCompleted),
  questTaskCompletedExpandPill: makeActionCreator<QuestTaskCompletedExpandPill>(
    QuestsActionType.QuestTaskCompletedExpandPill
  ),
  questTaskCompletedCollapsePill: makeActionCreator<QuestTaskCompletedCollapsePill>(
    QuestsActionType.QuestTaskCompletedCollapsePill
  ),
  setIsHoveringQuestsPill: makeActionCreator<SetIsHoveringQuestsPill>(QuestsActionType.SetIsHoveringQuestsPill),
  setQuestsIsStartingAnim: makeActionCreator<SetQuestsIsStartingAnim>(QuestsActionType.SetQuestsIsStartingAnim),
  stopQuestsStartingAnim: makeActionCreator<StopQuestsStartingAnim>(QuestsActionType.StopQuestsStartingAnim),
}

export type QuestsAction = GetActionType<typeof QuestsActions>

export const questsReducer = (state: QuestsState, action: QuestsAction): QuestsState => {
  switch (action.type) {
    case QuestsActionType.QuestCompleted:
      return produce(state, (draft) => {
        if (!state.isHovering) {
          draft.recentlyCompletedQuest = {
            ...action.payload,
            isExpanded: false,
          }
        }
      })

    case QuestsActionType.QuestCompletedExpandPill:
      return produce(state, (draft) => {
        if (draft.recentlyCompletedQuest) {
          draft.recentlyCompletedQuest.isExpanded = true
        }
      })

    case QuestsActionType.QuestCompletedCollapsePill:
      return produce(state, (draft) => {
        draft.recentlyCompletedQuest = null
      })

    case QuestsActionType.QuestTaskCompleted:
      return produce(state, (draft) => {
        if (!state.isHovering) {
          draft.recentlyCompletedTask = {
            ...action.payload,
            isExpanded: false,
          }
        }
      })

    case QuestsActionType.QuestTaskCompletedExpandPill:
      return produce(state, (draft) => {
        if (draft.recentlyCompletedTask) {
          draft.recentlyCompletedTask.isExpanded = true
        }
      })

    case QuestsActionType.QuestTaskCompletedCollapsePill:
      return produce(state, (draft) => {
        draft.recentlyCompletedTask = null
      })

    case QuestsActionType.SetIsHoveringQuestsPill:
      return produce(state, (draft) => {
        draft.isHovering = action.payload

        // cancel any explicit expanded states on hovering the pill
        if (action.payload) {
          if (state.recentlyCompletedQuest) {
            draft.recentlyCompletedQuest = null
          }
          if (state.recentlyCompletedTask) {
            draft.recentlyCompletedTask = null
          }
          if (draft.isStartingAnim) {
            draft.isStartingAnim = false
          }
        }
      })

    case QuestsActionType.SetQuestsIsStartingAnim:
      return produce(state, (draft) => {
        draft.isStartingAnim = true
      })

    case QuestsActionType.StopQuestsStartingAnim:
      return produce(state, (draft) => {
        draft.isStartingAnim = false
      })

    default:
      return state
  }
}
