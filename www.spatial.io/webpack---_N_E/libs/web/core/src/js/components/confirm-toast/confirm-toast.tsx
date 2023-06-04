import clsx from "clsx"

import buttonClasses from "@spatialsys/web/core/css/components/button.module.scss"
import { Heading } from "@spatialsys/web/ui"

import classes from "./confirm-toast.module.scss"

interface ConfirmToastProps {
  title: string
  message: string
  denyText: string
  confirmText: string
  onDeny: () => void
  onConfirm: () => void
}

export const ConfirmToast = (props: ConfirmToastProps) => {
  return (
    <div className={clsx(classes.container, "p-4")}>
      <Heading size="h2">{props.title}</Heading>
      <p className="py-4">{props.message}</p>
      <button type="button" className={clsx(buttonClasses.textButton, "pr-8")} onClick={props.onDeny}>
        {props.denyText}
      </button>
      <button type="button" className={clsx(buttonClasses.textButton, "pt-4 text-blue")} onClick={props.onConfirm}>
        {props.confirmText}
      </button>
    </div>
  )
}
