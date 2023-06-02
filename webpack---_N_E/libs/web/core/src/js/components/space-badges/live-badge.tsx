import { memo } from "react"

import { ParticipantCount } from "@spatialsys/web/core/js/components/space-badges/participant-count"
import { SpaceBadge } from "@spatialsys/web/core/js/components/space-badges/space-badge"

type LiveBadgeProps = {
  activeUserCount: number
  /** If true, the badge is always shown even if the active user count is 0. */
  alwaysRender?: boolean
  isLive?: boolean
}

export const LiveBadge = memo(function LiveBadge(props: LiveBadgeProps) {
  const { activeUserCount, alwaysRender, isLive } = props

  if (activeUserCount === 0 && !alwaysRender) {
    return null
  }

  return (
    <SpaceBadge red={isLive}>
      {isLive && "LIVE"} <ParticipantCount {...props} />
    </SpaceBadge>
  )
})
