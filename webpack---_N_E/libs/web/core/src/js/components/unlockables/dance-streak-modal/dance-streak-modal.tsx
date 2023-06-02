import { Suspense, lazy, memo, useCallback } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useMeQuery } from "@spatialsys/react/query-hooks/sapi/user"
import { useMarkReadMutation } from "@spatialsys/react/query-hooks/unlockables"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { DANCE_STREAK_UNLOCKABLE_KEY } from "@spatialsys/web/core/js/components/unlockables/constants"
import { sapiClient, sapiUsersClient } from "@spatialsys/web/sapi"

import classes from "./dance-streak-modal.module.scss"

const DanceStreakModalContent = lazy(() =>
  import(/* webpackChunkName: "dance-streak-modal-content" */ "./dance-streak-modal-content").then((module) => ({
    default: module.DanceStreakModalContent,
  }))
)

export const DanceStreakModal = memo(function DanceStreakModal() {
  const { isAuthenticated } = useAuthState()
  const { data: user } = useMeQuery(sapiClient, isAuthenticated)
  const { mutate: markRead } = useMarkReadMutation(sapiUsersClient)

  const hasNewUnlock = user?.unlockables?.[DANCE_STREAK_UNLOCKABLE_KEY]?.unlocks.some(
    (unlockable) => unlockable.read === false
  )
  const isOpen = useAppContext(
    (context) => Selectors.getOpenModal(context.state)?.type === Modals.UnlockableDanceStreak
  )
  const actions = useAppContext((context) => context.actions)
  const close = useCallback(() => {
    actions.closeModal(Modals.UnlockableDanceStreak)
    if (hasNewUnlock) {
      markRead({ unlockableId: DANCE_STREAK_UNLOCKABLE_KEY })
    }
  }, [actions, hasNewUnlock, markRead])

  return (
    <Modal
      darkOverlay
      isOpen={isOpen || hasNewUnlock}
      onRequestClose={close}
      overlayAdditionalBaseClass={classes.overlay}
    >
      <Suspense fallback={null}>
        <TrackedComponent id={TrackedComponents.UnlockableDanceStreakModal}>
          <DanceStreakModalContent onRequestClose={close} />
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
})
