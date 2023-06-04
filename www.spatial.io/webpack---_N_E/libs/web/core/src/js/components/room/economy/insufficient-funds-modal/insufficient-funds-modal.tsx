import clsx from "clsx"
import { Suspense, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { Button, Heading } from "@spatialsys/web/ui"

import { InstanceCount } from "../../../instance-count/instance-count"
import { Modal, ModalProps, modalClassesBase } from "../../../modal/modal"

type InsufficientFundsModalProps = Pick<ModalProps, "isOpen" | "onRequestClose"> & { worldCurrencyName: string }

export const InsufficientFundsModal = memo(function InsufficientFundsModal(props: InsufficientFundsModalProps) {
  const { isOpen, onRequestClose, worldCurrencyName } = props

  return (
    <Modal
      isOpen={isOpen}
      darkOverlay
      className={{
        ...modalClassesBase,
        base: clsx(modalClassesBase.base, "max-w-sm rounded-2xl bg-white p-8 text-center"),
      }}
      overlayAdditionalBaseClass="!z-[1100]"
      onRequestClose={onRequestClose}
    >
      <InstanceCount />
      <Suspense fallback={null}>
        <TrackedComponent id={TrackedComponents.InsufficientFundsModal} as="div" className="grid">
          <Heading className="text-2xl font-black">Insufficient {worldCurrencyName ?? "Funds"}</Heading>
          <div className="mb-6 mt-2 text-xs">
            You do not have enough {worldCurrencyName ?? "funds"} to purchase this item. Get on out there and explore!
          </div>
          <Button size="lg" onClick={onRequestClose}>
            Okay
          </Button>
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
})
