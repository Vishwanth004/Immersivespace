import { memo } from "react"

import { ReactComponent as HostToolsIcon } from "@spatialsys/assets/icons/host-tools.svg"

import Button from "./button"

interface HostToolsButtonProps {
  onClick: () => void
}

export const HostToolsButton = memo((props: HostToolsButtonProps) => {
  return (
    <Button
      onClick={props.onClick}
      color="outline"
      ligature={<HostToolsIcon />}
      tooltipText="Host Tools"
      label="Host Tools"
    />
  )
})
