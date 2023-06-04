import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import type { CreateCustomEnvModalContentProps } from "@spatialsys/web/core/js/components/create-custom-environments/custom-env-modal/create-custom-env-modal-content"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"

/**
 * A modal component to show the user when creating a custom environment
 */

const CreateCustomEnvModalContent = lazy(() =>
  import(/* webpackChunkName: "create-custom-env-modal-content" */ "./create-custom-env-modal-content").then(
    (module) => ({ default: module.CreateCustomEnvModalContent })
  )
)

export const CreateCustomEnvModal = memo(function CreateCustomEnvModal(props: CreateCustomEnvModalContentProps) {
  const { isOpen, onRequestClose, ...rest } = props

  return (
    <Modal darkOverlay isOpen={isOpen} onRequestClose={onRequestClose}>
      <TrackedComponent id={TrackedComponents.CreateCustomEnvModal}>
        <InstanceCount />
        <Suspense fallback={null}>
          <CreateCustomEnvModalContent isOpen onRequestClose={onRequestClose} {...rest} />
        </Suspense>
      </TrackedComponent>
    </Modal>
  )
})
