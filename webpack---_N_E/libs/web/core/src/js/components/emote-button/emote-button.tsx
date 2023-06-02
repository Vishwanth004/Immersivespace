import { forwardRef, useCallback } from "react"

import { ReactComponent as ReactionIcon } from "@spatialsys/assets/icons/reactions.svg"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"

import classes from "./emote-button.module.scss"

export interface EmoteButtonProps {
  onClick: () => void
  showTooltip: boolean
}

export const EmoteButton = forwardRef<HTMLDivElement, EmoteButtonProps>(function EmoteButton(
  props: EmoteButtonProps,
  ref
) {
  const { onClick, showTooltip } = props

  const openTray = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <div className={classes.container}>
      <CircleButton
        ref={ref}
        onClick={openTray}
        ligature={<ReactionIcon className={classes.emoteIcon} />}
        color="outline"
        tooltipText={showTooltip ? "Reactions" : undefined}
      />
    </div>
  )
})
