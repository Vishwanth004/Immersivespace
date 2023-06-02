import clsx from "clsx"
import { useMemo } from "react"

import { ReactComponent as VisitIcon } from "@spatialsys/assets/icons/material-filled/visibility.svg"
import { SpaceMetadata } from "@spatialsys/js/sapi/types"
import { abbreviateNumber } from "@spatialsys/js/util/format-numbers"
import { useAuthState } from "@spatialsys/web/app-context"

import { LoveSpaceButton } from "../../../love-space-button/love-space-button"
import { LiveBadge } from "../../../space-badges/live-badge"
import { SpaceBadge } from "../../../space-badges/space-badge"

import classes from "./thumbnail-overlay.module.scss"

export function ThumbnailOverlay(props: {
  space: SpaceMetadata
  loadingLoved: boolean
  handleUnauthenticatedClick: () => void
  tooltip?: string
  showTooltip?: boolean
}) {
  const { space, loadingLoved, handleUnauthenticatedClick, tooltip, showTooltip } = props

  const visitCountText = useMemo(() => {
    if (space.joinCount === 0) {
      return "-"
    } else {
      return abbreviateNumber(space.joinCount, 1)
    }
  }, [space.joinCount])

  const { isAuthenticatingOrLoggingIn } = useAuthState()

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-2 top-2">
        <LiveBadge activeUserCount={space.activeUserCount} isLive={space.live} />
      </div>
      <div className={clsx(classes.tooltipBadge, "absolute right-2 top-2", showTooltip ? "opacity-100" : "opacity-0")}>
        {tooltip && <SpaceBadge>{tooltip}</SpaceBadge>}
      </div>
      <div
        className={clsx(
          classes.socialSignals,
          "absolute bottom-3.5 right-4 grid grid-flow-col gap-2.5 font-body text-sm xs:gap-2 xs:text-white",
          loadingLoved ? "opacity-0" : "opacity-100"
        )}
      >
        {!loadingLoved && (
          <>
            <div className="flex items-center gap-1 text-sm text-white">
              <VisitIcon className="w-3.5 xs:w-4" />
              <span>{visitCountText}</span>
            </div>
            <LoveSpaceButton
              handleUnauthenticatedClick={handleUnauthenticatedClick}
              isDisabled={isAuthenticatingOrLoggingIn}
              loveCount={space.likeCount}
              isLoved={space.liked}
              spaceId={space.id}
            />
          </>
        )}
      </div>
    </div>
  )
}
