import { Suspense, lazy, memo, useCallback } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { Heading } from "@spatialsys/web/ui"

import classes from "./debug-settings.module.scss"

const DebugSettings = lazy(() =>
  import(/* webpackChunkName: "debug-settings" */ "./debug-settings").then((mod) => ({ default: mod.DebugSettings }))
)

export const DebugSettingsModal = memo(function DebugSettingsModal() {
  const isOpen = useAppContext((context) => Selectors.getOpenModal(context.state))?.type === Modals.Debug
  const close = useAppContext((context) => () => context.actions.closeModal(Modals.Debug))
  const [refreshNeeded, setRefreshNeeded] = useBoolean(false)
  const onAfterClose = useCallback(() => {
    if (refreshNeeded) {
      window.location.reload()
    }
  }, [refreshNeeded])

  return (
    <Modal
      darkOverlay
      onAfterClose={onAfterClose}
      isOpen={isOpen}
      onRequestClose={close}
      overlayAdditionalBaseClass={classes.zIndex}
    >
      <Suspense fallback={null}>
        <div className={classes.modalBody}>
          <button type="button" onClick={close} className={classes.closeButton}>
            <CloseIcon />
          </button>
          <Heading size="h2" weight="black" textAlign="center" className="py-4">
            {refreshNeeded ? "Page will refresh on close" : "Debug Settings"}
          </Heading>
          <DebugSettings setRefreshNeeded={setRefreshNeeded.setTrue} />
        </div>
      </Suspense>
    </Modal>
  )
})
