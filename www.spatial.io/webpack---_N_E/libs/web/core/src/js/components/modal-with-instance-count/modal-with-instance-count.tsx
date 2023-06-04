import clsx from "clsx"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as KeyboardBackspace } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"

import classes from "./modal-with-instance-count.module.scss"

export type ModalWithInstanceCountProps = {
  headingText?: string
  classNameContainer?: string
  onClickBack?: () => void
} & Omit<ModalProps, "darkOverlay">

export function ModalWithInstanceCount(props: ModalWithInstanceCountProps) {
  const { children, classNameContainer, onRequestClose, onClickBack, headingText, ...restOfProps } = props

  return (
    <Modal darkOverlay onRequestClose={onRequestClose} {...restOfProps}>
      <InstanceCount>
        <div className={clsx(classes.container, classNameContainer)}>
          {onClickBack && (
            <button className={classes.backButton} onClick={onClickBack}>
              <KeyboardBackspace />
            </button>
          )}
          <button className={classes.closeButton} onClick={onRequestClose}>
            <CloseIcon />
          </button>
          {headingText && <h1 className={classes.heading}>{headingText}</h1>}
          {children}
        </div>
      </InstanceCount>
    </Modal>
  )
}
