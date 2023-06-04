import clsx from "clsx"
import { memo, useMemo } from "react"

import { ReactComponent as ErrorIcon } from "@spatialsys/assets/icons/material-filled/error.svg"
import { ReactComponent as OutlinedHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite-border.svg"
import { ReactComponent as FilledHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite.svg"
import { abbreviateNumber } from "@spatialsys/js/util/format-numbers"
import { useAppContext } from "@spatialsys/web/app-context"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"

import { DockPillButton } from "../dock-pill-button/dock-pill-button"

import classes from "./room-stats.module.scss"

interface RoomStatsProps {
  roomIsSandbox: boolean
  isAuthless: boolean
  loveCount: number
  loved: boolean
  onLoveButtonClicked: () => void
}

export const RoomStats = memo(function RoomStats(props: RoomStatsProps) {
  const { roomIsSandbox, isAuthless, loveCount, loved, onLoveButtonClicked } = props
  const showCreatorErrors = useAppContext(
    (context) => context.state.unity.appState.roomSession.debug.localLogOverrideEnabled
  )
  const errorLogCount = useAppContext(
    (context) => context.state.unity.appState.roomSession.debug.toolkitExternalErrorLogCount
  )

  const loveCountText = useMemo(() => {
    return abbreviateNumber(loveCount, 1)
  }, [loveCount])

  const lovedIcon = useMemo(() => {
    return loved ? <FilledHeartIcon className="mr-1 text-red" /> : <OutlinedHeartIcon className="mr-1 text-white" />
  }, [loved])

  const likeButtonTooltipText = useMemo(() => {
    if (isAuthless) {
      return undefined
    } else {
      return `${loved ? "Unlove" : "Love"} this space`
    }
  }, [isAuthless, loved])

  return (
    <div className="grid grid-flow-col gap-4">
      {!roomIsSandbox &&
        (loveCount > 0 ? (
          <DockPillButton className="px-4" leftIcon={lovedIcon} onClick={onLoveButtonClicked}>
            {loveCountText}
            {likeButtonTooltipText && (
              <span className="tooltip-text tooltip-text--bottom">{likeButtonTooltipText}</span>
            )}
          </DockPillButton>
        ) : (
          <CircleButton
            className={clsx(classes.button, classes.loveButtonRound, classes.roomStatsItem)}
            ligature={lovedIcon}
            color="outline"
            onClick={onLoveButtonClicked}
            tooltipPosition="bottom"
            tooltipText={likeButtonTooltipText}
          />
        ))}

      {showCreatorErrors && errorLogCount > 0 && (
        <DockPillButton className="px-4" leftIcon={<ErrorIcon className="text-red" />} onClick={onLoveButtonClicked}>
          {errorLogCount.toString()}
          {likeButtonTooltipText && (
            <span className="tooltip-text tooltip-text--bottom">
              Number of errors from creator logic.
              <br />
              Open your browser console to see details.
            </span>
          )}
        </DockPillButton>
      )}
    </div>
  )
})
