import { Suspense, lazy, memo, useCallback } from "react"

import { useAppContext } from "@spatialsys/web/app-context"
import { DefaultBannedState } from "@spatialsys/web/app-state"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"

const BannedModalContents = lazy(() =>
  import(/* webpackChunkName: "banned-modal-content" */ "./banned-modal-content").then((module) => ({
    default: module.BannedModalContents,
  }))
)

export const BannedModal = memo(function BannedModal() {
  const { isBanned, bannedUntilUnixMs } = useAppContext((context) => context.state.banned)
  const { setBanned } = useAppContext((context) => context.actions)

  const handleClose = useCallback(() => setBanned(DefaultBannedState), [setBanned])

  return (
    <Modal isOpen={isBanned} darkOverlay onRequestClose={handleClose}>
      <Suspense fallback={null}>
        <BannedModalContents bannedUntilUnixMs={bannedUntilUnixMs} onRequestClose={handleClose} />
      </Suspense>
    </Modal>
  )
})
