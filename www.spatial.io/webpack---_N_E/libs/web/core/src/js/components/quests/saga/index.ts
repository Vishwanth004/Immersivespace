import { buffers, channel } from "redux-saga"
import { delay, fork, put, select, takeLatest } from "typed-redux-saga/macro"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { waitUntilChanged } from "@spatialsys/use-saga"
import { ActionType, Actions, AppState, QuestCompleted, QuestTaskCompleted } from "@spatialsys/web/app-state"

/**
 * A saga to manage Quests system, handling logic such as:
 * 1) Expand pill when a quest is started
 * 2) Expand pill when a task or quest is completed
 * 3) Highlight the most recently completed task for a short time period
 *
 * When this saga is cancelled, it will reset the quests state.
 */
export function* questsSaga() {
  yield* fork(observeCurrentQuestChanged)
  yield* takeLatest(ActionType.QuestCompleted, onQuestCompleted)
  yield* takeLatest(ActionType.QuestTaskCompleted, onQuestTaskCompleted)
}

/**
 * Observes the current quest ID, and emits the new ID into a channel whenever it changes.
 */
function* observeCurrentQuestChanged() {
  // Use buffers.sliding(1) to ensure that we only ever have one value in the channel, which is the latest value
  const c = channel<number>(buffers.sliding(1))
  yield* takeLatest(c, onCurrentQuestChanged)

  // Wait for the current quest to change, and emit the new Quest ID into the channel
  const getCurrentQuestId = (state: AppState) => state.unity.appState.roomSession.questSystem.currentQuestID
  while (true) {
    const id = yield* select(getCurrentQuestId)
    c.put(id)
    yield* waitUntilChanged(getCurrentQuestId)
  }
}

/**
 * When the current quest changes, we want to:
 * - show the quest name in the pill
 * - after a delay, expand the quest pill
 * - after a delay, collapse the pill and show default behaviour
 */
function* onCurrentQuestChanged(questId: number) {
  if (!questId) {
    return
  }

  const activeQuest = yield* select((state: AppState) => AppStateSelectors.getActiveQuest(state.unity.appState))
  if (!activeQuest) {
    return
  }

  yield* put(Actions.setQuestsIsStartingAnim())
}

const DELAY_QUEST_TASK_COMPLETE_EXPAND = 2250
const DELAY_QUEST_TASK_COMPLETE_COLLAPSE = 4000

function* onQuestCompleted(_: QuestCompleted) {
  let isHovering = yield* select((state: AppState) => state.space.quests.isHovering)
  if (!isHovering) {
    yield* delay(DELAY_QUEST_TASK_COMPLETE_EXPAND)

    // Only expand it if not already hovering
    isHovering = yield* select((state: AppState) => state.space.quests.isHovering)
    if (!isHovering) {
      yield* put(Actions.questCompletedExpandPill())
      yield* delay(DELAY_QUEST_TASK_COMPLETE_COLLAPSE)
    }

    yield* put(Actions.questCompletedCollapsePill())
  }
}

function* onQuestTaskCompleted(_: QuestTaskCompleted) {
  let isHovering = yield* select((state: AppState) => state.space.quests.isHovering)
  if (!isHovering) {
    yield* delay(DELAY_QUEST_TASK_COMPLETE_EXPAND)

    // Only expand it if not already hovering
    isHovering = yield* select((state: AppState) => state.space.quests.isHovering)
    if (!isHovering) {
      yield* put(Actions.questTaskCompletedExpandPill())
      yield* delay(DELAY_QUEST_TASK_COMPLETE_COLLAPSE)
    }
    yield* put(Actions.questTaskCompletedCollapsePill())
  }
}
