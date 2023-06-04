import { memo, useCallback, useMemo } from "react"

import { ReactComponent as TwitterIcon } from "@spatialsys/assets/icons/material-filled/twitter.svg"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { getTwitterShareLink } from "@spatialsys/url-utils"

import classes from "./twitter.module.scss"

const useTrackShareToTwitter = () => {
  const trackInteraction = useTrackInteraction()
  const trackShareToTwitter = useCallback(() => {
    trackInteraction({ name: InteractionName.ShareToTwitter, type: InteractionType.Click })
  }, [trackInteraction])
  return trackShareToTwitter
}

interface Props {
  bodyText: string
  spaceUrl: string
  showLabel?: boolean
  includeVia?: boolean
}

export const TwitterShareLink = memo(function TwitterShareLink(props: Props) {
  const { bodyText, spaceUrl, showLabel, includeVia } = props

  const trackShareToTwitter = useTrackShareToTwitter()
  const href = useMemo(() => getTwitterShareLink(bodyText, spaceUrl, includeVia), [bodyText, spaceUrl, includeVia])

  return (
    <a className={classes.icon} href={href} target="_blank " rel="noreferrer" onClick={trackShareToTwitter}>
      <TwitterIcon className="icon icon-lg" />
      {showLabel && <span className={classes.label}>Tweet</span>}
    </a>
  )
})
