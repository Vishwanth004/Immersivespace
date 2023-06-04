import CircleButton, { CircleButtonProps } from "../../../circle-button/circle-button"

import classes from "./button.module.scss"

export default function Button(buttonProps: { label: string; displayed?: boolean } & CircleButtonProps) {
  if (buttonProps.displayed === false) {
    return null
  }

  return (
    <CircleButton
      className={classes.container}
      onClick={(e) => {
        buttonProps.onClick(e)
        e.stopPropagation()
      }}
      disabled={buttonProps.disabled}
      fakeDisabled={buttonProps.fakeDisabled}
      ligature={buttonProps.ligature}
      color={buttonProps.color}
      tooltipText={buttonProps.tooltipText}
    />
  )
}
