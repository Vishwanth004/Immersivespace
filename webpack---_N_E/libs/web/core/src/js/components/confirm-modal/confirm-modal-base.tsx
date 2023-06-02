import clsx from "clsx"
import { ReactNode } from "react"

import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"
import { Button, ButtonProps, Heading } from "@spatialsys/web/ui"

export type ConfirmModalBaseProps = {
  autoFocusConfirm?: boolean
  title: string
  subtitle?: ReactNode
  message?: ReactNode
  denyText?: string
  confirmText: string
  onDeny?: () => void
  onConfirm: () => void
  linkHref?: string
  confirmButtonColor?: ButtonProps["color"]
  denyButtonColor?: ButtonProps["color"]
}

export function ConfirmModalBase(props: ConfirmModalBaseProps) {
  const {
    autoFocusConfirm,
    title,
    subtitle,
    message,
    denyText,
    confirmText,
    onConfirm,
    onDeny,
    linkHref,
    confirmButtonColor,
    denyButtonColor,
  } = props

  const confirmButtonProps = {
    autoFocus: autoFocusConfirm,
    className: "min-w-[180px]",
    color: confirmButtonColor ?? "black",
    onClick: onConfirm,
  }

  return (
    <div className={clsx(modalClasses.body, "min-w-[380px] max-w-[600px]")}>
      <Heading size="h2" textAlign="center" className="pb-4">
        {title}
      </Heading>
      {subtitle}
      {message}
      <div className="flex flex-row justify-evenly gap-5 pt-4">
        {denyText && onDeny && (
          <Button className={"min-w-[180px]"} color={denyButtonColor ?? "outline"} size="xl" onClick={onDeny}>
            {denyText}
          </Button>
        )}
        {linkHref ? (
          <Button {...confirmButtonProps} size="xl" as="a" href={linkHref} target="_blank" rel="noreferrer">
            {confirmText}
          </Button>
        ) : (
          <Button {...confirmButtonProps} size="xl">
            {confirmText}
          </Button>
        )}
      </div>
    </div>
  )
}
