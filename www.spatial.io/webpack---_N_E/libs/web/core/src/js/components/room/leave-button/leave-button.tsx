import { memo, useCallback } from "react"

import { ReactComponent as ExploreOutlinedIcon } from "@spatialsys/assets/icons/material-outlined/explore.svg"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { DockPillButton } from "@spatialsys/web/core/js/components/room/dock-pill-button/dock-pill-button"

type LeaveButtonProps = {
  onClick: () => void
}

export const LeaveButton = memo(function LeaveButton(props: LeaveButtonProps) {
  const { onClick } = props

  const trackInteraction = useTrackInteraction()

  const handleClick = useCallback(() => {
    trackInteraction({ name: InteractionName.LeaveSpace, type: InteractionType.Click })
    onClick()
  }, [onClick, trackInteraction])

  return (
    <DockPillButton leftIcon={<ExploreOutlinedIcon />} onClick={handleClick}>
      Explore
    </DockPillButton>
  )
})
