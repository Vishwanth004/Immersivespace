import * as React from "react"

import { ReactComponent as ScreenShareIcon } from "@spatialsys/assets/icons/screen-share.svg"

import Button from "./button"

interface ScreenShareButtonProps {
  onClick: () => void
  disabled: boolean
  screenSharing: boolean
}

export default function ScreenShareButton(props: ScreenShareButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      ligature={<ScreenShareIcon />}
      color={props.screenSharing ? "white" : "outline"}
      tooltipText={props.screenSharing ? "Stop sharing" : "Share screen"}
      label="Share screen"
    />
  )
}
