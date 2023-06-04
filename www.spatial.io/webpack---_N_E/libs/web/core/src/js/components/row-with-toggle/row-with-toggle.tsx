import clsx from "clsx"
import Toggle, { ToggleProps } from "react-toggle"

import classes from "./row-with-toggle.module.scss"

type RowWithToggleProps = {
  label: string | JSX.Element
  classNameContainer?: string
  tooltip?: string
  icons?: boolean
  showBorder?: boolean
  classNameLabel?: string
} & ToggleProps

/**
 * UI element to render a label with a toggle button in a row, with an optional tooltip.  It can be used with or without borders
 *
 * @param label If you use a JSX element, don't use a `div` because it has accessibility conflicts.  You should not sure block elements inside `label` as per [Mozilla's docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
 *
 */
export function RowWithToggle(props: RowWithToggleProps) {
  const {
    classNameContainer = classes.container,
    classNameLabel,
    disabled,
    icons = false,
    id,
    showBorder,
    tooltip,
    label,
    ...toggleProps
  } = props

  return (
    <div className={clsx(classNameContainer, showBorder && classes.containerBorder, "tooltip-host")}>
      <label
        htmlFor={id}
        className={clsx(classes.title, disabled ? classes.disabled : classes.notDisabled, classNameLabel)}
      >
        {label}
      </label>
      {tooltip && <div className={clsx("tooltip-text", "tooltip-text--top")}>{tooltip}</div>}
      <Toggle {...toggleProps} icons={icons} id={id} disabled={disabled} />
    </div>
  )
}
