import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"

const ReportSpaceMenu = lazy(() =>
  import(/* webpackChunkName: "report-space-content" */ "./report-space-menu").then((mod) => ({
    default: mod.ReportSpaceMenu,
  }))
)

export const ReportSpaceModal = memo(function ReportSpaceModal() {
  const isOpen = useAppContext((context) => Selectors.getOpenModal(context.state)?.type === Modals.ReportSpace)
  const close = useAppContext((context) => () => context.actions.closeModal(Modals.ReportSpace))
  const reportSpaceModalState = useAppContext((context) => Selectors.getReportSpaceModal(context.state))

  return (
    <Modal darkOverlay isOpen={isOpen} onRequestClose={close}>
      <TrackedComponent id={TrackedComponents.ReportSpaceModal}>
        <Suspense fallback={null}>
          <ReportSpaceMenu
            onExit={close}
            spaceID={reportSpaceModalState?.payload.spaceID}
            spaceName={reportSpaceModalState?.payload.spaceName}
          />
        </Suspense>
      </TrackedComponent>
    </Modal>
  )
})
