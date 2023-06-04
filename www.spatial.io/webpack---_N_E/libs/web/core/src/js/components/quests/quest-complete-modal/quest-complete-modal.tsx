import { Suspense, lazy, memo, useCallback, useEffect } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"

const ID = TrackedComponents.QuestsCompleteModal

const QuestCompleteModalContents = lazy(() =>
  import(
    /* webpackChunkName: "quest-complete-modal-contents" */ "@spatialsys/web/core/js/components/quests/quest-complete-modal/quest-complete-modal-contents"
  ).then((module) => ({
    default: module.QuestCompleteModalContents,
  }))
)

export const QuestCompleteModal = memo(function QuestCompleteModal() {
  const openModal = useAppContext((context) => Selectors.getOpenModal(context.state))
  const roomSession = useAppContext((context) => context.state.unity.appState.roomSession)
  const isOpen = openModal?.type === Modals.QuestComplete && Boolean(roomSession)
  const actions = useAppContext((context) => context.actions)
  const close = useCallback(() => {
    actions.closeModal(Modals.QuestComplete)
  }, [actions])

  /**
   * Close the modal if user is not in a space (i.e. they used browser back button while the modal was open)
   */
  useEffect(() => {
    if (!roomSession) {
      close()
    }
  }, [roomSession, close])

  return (
    <Modal isOpen={isOpen} darkOverlay onRequestClose={close}>
      <InstanceCount />
      <TrackedComponent id={ID}>
        <Suspense fallback={null}>{isOpen && <QuestCompleteModalContents onRequestClose={close} />}</Suspense>
      </TrackedComponent>
    </Modal>
  )
})
