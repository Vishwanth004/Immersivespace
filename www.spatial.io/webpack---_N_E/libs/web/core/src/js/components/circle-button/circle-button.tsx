import { Placement } from "@popperjs/core"
import clsx from "clsx"
import * as React from "react"
import { usePopperTooltip } from "react-popper-tooltip"

import classes from "./circle-button.module.scss"

type CircleButtonColor = "outline" | "blue" | "black" | "red" | "white"
type CircleButtonSize = "small" | "large"

export type CircleButtonProps = {
  icon?: string
  ligature?: JSX.Element
  color?: CircleButtonColor
  size?: CircleButtonSize
  tooltipPosition?: "top" | "bottom"
  tooltipButtonPosition?: Placement
  tooltipText?: React.ReactNode
  className?: string
  disabled?: boolean
  // Can appear disabled but still fire onClick
  fakeDisabled?: boolean
  style?: React.HTMLAttributes<HTMLButtonElement>["style"]
  tooltipButton?: JSX.Element
  tooltipClassName?: string
  tooltipArrowClassName?: string
  usePopperStyling?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const colorToClassMap: Record<CircleButtonColor, string> = {
  blue: classes.btnBlue,
  black: classes.btnBlack,
  red: classes.btnRed,
  white: classes.btnWhite,
  outline: classes.btnOutline,
}

const sizeToClassMap: Record<CircleButtonSize, string> = {
  small: classes.btnCircleSmall,
  large: classes.btnCircleLarge,
}

const CircleButton = React.forwardRef<HTMLDivElement, CircleButtonProps>(function CircleButton(
  {
    icon,
    ligature,
    children,
    className = "",
    color = "blue",
    size = "small",
    tooltipPosition = "top",
    tooltipButtonPosition = "top",
    disabled = false,
    fakeDisabled = false,
    style = {},
    tooltipText,
    tooltipButton,
    tooltipClassName,
    tooltipArrowClassName,
    usePopperStyling,
    ...passthroughProps
  },
  ref
) {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible, getArrowProps } = usePopperTooltip({
    placement: tooltipButtonPosition,
    interactive: true,
    delayHide: 100,
    delayShow: 200,
    offset: [0, 1],
  })
  return (
    <div ref={ref} className={clsx("tooltip-host", classes.container)}>
      <button
        ref={setTriggerRef}
        className={clsx(
          className,
          classes.btn,
          sizeToClassMap[size],
          colorToClassMap[color],
          disabled && classes.btnDisabled
        )}
        type="button"
        disabled={!fakeDisabled && disabled}
        style={{
          backgroundImage: icon ? `url(${icon})` : "none",
          ...style,
        }}
        {...passthroughProps}
      >
        {ligature ?? null}
        {tooltipText && <span className={`tooltip-text tooltip-text--${tooltipPosition}`}>{tooltipText}</span>}
        {children}
      </button>
      {tooltipButton && visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: clsx(usePopperStyling && "tooltip-container", classes.tooltip, tooltipClassName),
          })}
        >
          {usePopperStyling && <div {...getArrowProps({ className: clsx("tooltip-arrow", tooltipArrowClassName) })} />}
          {tooltipButton}
        </div>
      )}
    </div>
  )
})

export default CircleButton
