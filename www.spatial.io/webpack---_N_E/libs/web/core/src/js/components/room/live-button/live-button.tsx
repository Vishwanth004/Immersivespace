import { memo } from "react"

import { Button } from "@spatialsys/web/ui"

export interface LiveButtonProps {
  isSpaceOwner: boolean
  onStopLive: () => void
}

export const LiveButton = memo(function LiveButton(props: LiveButtonProps) {
  const { isSpaceOwner, onStopLive } = props

  return (
    <Button className="tooltip-host uppercase" size="lg" color="red" disabled={!isSpaceOwner} onClick={onStopLive}>
      Live
      {isSpaceOwner && <div className="tooltip-text tooltip-text--bottom">Stop going live</div>}
    </Button>
  )
})
