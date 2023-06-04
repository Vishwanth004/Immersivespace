import { Suspense, lazy, useCallback } from "react"

import { useAppContext } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { RequiresUser } from "@spatialsys/web/core/js/components/user/requires-user"

import classes from "./create-space-modal.module.scss"

const CreateSpace = lazy(() =>
  import(/* webpackChunkName: "create-space" */ "@spatialsys/web/core/js/components/create-space/create-space").then(
    (module) => ({
      default: module.CreateSpace,
    })
  )
)

export const CreateSpaceModal = () => {
  const actions = useAppContext((context) => context.actions)
  const isCreatingSpace = useAppContext((context) => Boolean(context.state.spaceToCreate))
  const isOpen = useAppContext((context) => Selectors.getOpenModal(context.state)?.type === Modals.CreateSpace)
  const close = useCallback(() => {
    actions.closeModal(Modals.CreateSpace)
  }, [actions])

  return (
    <Modal
      darkOverlay
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnEsc={!isCreatingSpace}
      shouldCloseOnOverlayClick={!isCreatingSpace}
    >
      <div className={classes.container}>
        <Suspense fallback={null}>
          <RequiresUser>
            <CreateSpace />
          </RequiresUser>
        </Suspense>
        <CloseButton disabled={isCreatingSpace} onClick={close} />
      </div>
    </Modal>
  )
}
