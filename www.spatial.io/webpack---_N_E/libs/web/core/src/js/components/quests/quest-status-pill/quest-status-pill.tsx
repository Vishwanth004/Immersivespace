import { Suspense, lazy, memo } from "react"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"

const QuestStatusPillContents = lazy(() =>
  import(/* webpackChunkName: "quest-status-pill-contents" */ "./quest-status-pill-contents").then((module) => ({
    default: module.QuestStatusPillContents,
  }))
)

/**
 * Displays information about the active quest, such as its name, description, and progress.
 * Only visible when a quest is active. Its contents are code-split.
 */
export const QuestStatusPill = memo(function QuestStatusPill() {
  const questState = useAppContext((context) => AppStateSelectors.getActiveQuest(context.state.unity.appState))

  if (!questState) return null

  return (
    <Suspense fallback={null}>
      <QuestStatusPillContents questState={questState} />
    </Suspense>
  )
})
