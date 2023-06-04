import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import type { SpacesPickerModalContentsProps } from "@spatialsys/web/core/js/components/spaces-picker-modal/spaces-picker-modal-contents"
import { CenteredLoader } from "@spatialsys/web/ui"

import classes from "./spaces-picker-modal.module.scss"

type SpacesPickerModalProps = SpacesPickerModalContentsProps & { modalProps?: ModalProps }

const SpacesPickerModalContents = lazy(() =>
  import(/* webpackChunkName: "spaces-picker-modal-contents" */ "./spaces-picker-modal-contents").then((module) => ({
    default: module.SpacesPickerModalContents,
  }))
)

export const SpacesPickerModal = memo(function SpacesPickerModal(props: SpacesPickerModalProps) {
  const { modalProps, ...rest } = props

  return (
    <Modal darkOverlay {...modalProps}>
      <TrackedComponent as="div" id={TrackedComponents.SpacePickerModal} className={classes.container}>
        <InstanceCount />
        <Suspense fallback={<CenteredLoader variant="fancy" color="black" />}>
          <SpacesPickerModalContents {...rest} />
        </Suspense>
      </TrackedComponent>
      <CloseButton onClick={modalProps?.onRequestClose} />
    </Modal>
  )
})
