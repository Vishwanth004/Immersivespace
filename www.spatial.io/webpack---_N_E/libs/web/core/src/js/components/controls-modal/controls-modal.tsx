import { Suspense, lazy, memo } from "react"

import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"

import classes from "./controls-modal.module.scss"

type ControlsModalProps = Pick<ModalProps, "isOpen" | "onRequestClose">

const ControlsModalContents = lazy(() =>
  import("./controls-modal-contents").then((mod) => ({ default: mod.ControlsModalContents }))
)

export const ControlsModal = memo(function ControlsModal(props: ControlsModalProps) {
  return (
    <Modal darkOverlay isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className={classes.container}>
        <InstanceCount />
        <CloseButton onClick={props.onRequestClose} />

        <Suspense fallback={null}>
          <ControlsModalContents />
        </Suspense>
      </div>
    </Modal>
  )
})
