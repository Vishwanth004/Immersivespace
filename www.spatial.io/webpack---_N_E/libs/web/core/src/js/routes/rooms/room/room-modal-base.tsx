import clsx from "clsx"
import { ReactNode, Suspense, memo } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"

import classes from "./room.module.scss"

interface RoomModalBaseProps {
  isOpen: boolean
  close: () => void
  children: ReactNode
  darkOverlay?: boolean
  modalBodyClassName?: string
  preventCloseOnEsc?: boolean
  preventCloseOnOverlayClick?: boolean
  showCloseButton?: boolean
}

/**
 * Simple wrapper component that handles setting up base styles and the InstanceCount
 */
export const RoomModalBase = memo(function RoomModal(props: RoomModalBaseProps) {
  const {
    isOpen,
    close,
    children,
    darkOverlay,
    modalBodyClassName,
    preventCloseOnEsc,
    preventCloseOnOverlayClick,
    showCloseButton,
  } = props

  return (
    <Modal
      isOpen={isOpen}
      modalBaseClass={clsx(modalClassesBase.base, "room__modal")}
      darkOverlay={darkOverlay ?? true}
      onRequestClose={close}
      shouldCloseOnEsc={!preventCloseOnEsc}
      shouldCloseOnOverlayClick={!preventCloseOnOverlayClick}
    >
      <InstanceCount />
      <Suspense fallback={null}>
        {showCloseButton && (
          <button onClick={close} className={classes.roomModalBaseCloseBtn}>
            <CloseIcon />
          </button>
        )}
        <div className={clsx("modal-body", modalBodyClassName)}>{children}</div>
      </Suspense>
    </Modal>
  )
})
