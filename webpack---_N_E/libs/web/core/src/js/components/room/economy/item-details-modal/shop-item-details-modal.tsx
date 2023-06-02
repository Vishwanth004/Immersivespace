import clsx from "clsx"
import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"

import { CloseButton } from "../../../close-button/close-button"
import { InstanceCount } from "../../../instance-count/instance-count"
import { Modal, ModalProps, modalClassesBase } from "../../../modal/modal"
import { ShopItemDetailsProps } from "./shop-item-details"

type ShopItemDetailsModalProps = Pick<ModalProps, "isOpen" | "onRequestClose"> & ShopItemDetailsProps

const ShopItemDetails = lazy(() =>
  import(/* webpackChunkName: "shop-item-details" */ "./shop-item-details").then((module) => ({
    default: module.ShopItemDetails,
  }))
)

export const ShopItemDetailsModal = memo(function ShopItemDetailsModal(props: ShopItemDetailsModalProps) {
  const { item, isOpen, onRequestClose, onItemPurchaseClick } = props

  return (
    <Modal
      isOpen={isOpen}
      className={{
        ...modalClassesBase,
        base: clsx(modalClassesBase.base, "!left-[70%] !top-[68%]"),
      }}
      overlayAdditionalBaseClass="!z-[900]"
      onRequestClose={onRequestClose}
    >
      <InstanceCount />
      <Suspense fallback={null}>
        <TrackedComponent id={TrackedComponents.ShopItemDetailsModal}>
          <ShopItemDetails item={item} onItemPurchaseClick={onItemPurchaseClick} />
          <CloseButton onClick={onRequestClose} />
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
})
