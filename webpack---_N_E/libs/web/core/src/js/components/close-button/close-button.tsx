import clsx from "clsx"
import { MouseEventHandler } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"

import classes from "./close-button.module.scss"

type CloseButtonProps = {
  classNameButton?: string
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export function CloseButton(props: CloseButtonProps) {
  const { classNameButton, onClick, disabled } = props

  return (
    <button className={clsx(classes.button, classNameButton)} onClick={onClick} disabled={disabled}>
      <CloseIcon />
    </button>
  )
}

export function CloseButtonToast({ closeToast }: { closeToast: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button className={classes.button} onClick={closeToast}>
      <CloseIcon />
    </button>
  )
}
