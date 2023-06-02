import clsx from "clsx"
import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent, ReactNode } from "react"

import classes from "./tooltip-button.module.scss"

type TooltipButtonProps = {
  buttonText: ReactNode
  icon?: JSX.Element
  className?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  position?: "top" | "bottom"
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function TooltipButton(props: TooltipButtonProps) {
  const { buttonText, icon, className, onClick, position = "top", ...button } = props

  return (
    <button
      className={clsx("tooltip-text", `tooltip-text--${position}`, classes.container, className)}
      onClick={onClick}
      {...button}
    >
      {buttonText}
      {icon}
    </button>
  )
}
