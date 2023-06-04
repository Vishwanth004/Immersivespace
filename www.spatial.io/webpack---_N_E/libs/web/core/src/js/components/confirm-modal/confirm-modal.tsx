import { memo } from "react"

import {
  ConfirmModalBase,
  ConfirmModalBaseProps,
} from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal-base"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"

type ConfirmModalProps = ModalProps &
  ConfirmModalBaseProps & {
    onDismiss: () => void
    withInstanceCount?: boolean
  }

export const ConfirmModal = memo(function ConfirmModal(props: ConfirmModalProps) {
  const { onDismiss, withInstanceCount, ...rest } = props

  return (
    <Modal darkOverlay onRequestClose={onDismiss} {...rest}>
      {withInstanceCount ? (
        <InstanceCount>
          <ConfirmModalBase {...rest} />
        </InstanceCount>
      ) : (
        <ConfirmModalBase {...rest} />
      )}
    </Modal>
  )
})
