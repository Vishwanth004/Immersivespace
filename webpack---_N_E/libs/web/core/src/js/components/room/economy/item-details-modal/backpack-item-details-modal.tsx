import clsx from "clsx"
import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"

import { CloseButton } from "../../../close-button/close-button"
import { InstanceCount } from "../../../instance-count/instance-count"
import { Modal, ModalProps, modalClassesBase } from "../../../modal/modal"
import { BackpackItemDetailsProps } from "./backpack-item-details"

type BackpackItemDetailsModalProps = Pick<ModalProps, "isOpen" | "onRequestClose"> & BackpackItemDetailsProps

const BackpackItemDetails = lazy(() =>
  import(/* webpackChunkName: "backpack-item-details" */ "./backpack-item-details").then((module) => ({
    default: module.BackpackItemDetails,
  }))
)

export const BackpackItemDetailsModal = memo(function BackpackItemDetailsModal(props: BackpackItemDetailsModalProps) {
  const { item, isOpen, onRequestClose, onItemUseClick } = props

  return (
    <Modal
      isOpen={isOpen}
      className={{
        ...modalClassesBase,
        base: clsx(modalClassesBase.base, "!left-[30%] !top-[68%]"),
      }}
      overlayAdditionalBaseClass="!z-[900]"
      onRequestClose={onRequestClose}
    >
      <InstanceCount />
      <Suspense fallback={null}>
        <TrackedComponent id={TrackedComponents.BackpackItemDetails}>
          <BackpackItemDetails item={item} onItemUseClick={onItemUseClick} />
          <CloseButton onClick={onRequestClose} />
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
})
