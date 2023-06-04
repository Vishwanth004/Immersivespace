import { memo, useCallback, useMemo } from "react"

import { ReactComponent as LinkedInIcon } from "@spatialsys/assets/icons/material-filled/linked-in.svg"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { getLinkedInShareLink } from "@spatialsys/url-utils"

import classes from "./linkedin.module.scss"

const useTrackShareToLinkedIn = () => {
  const trackInteraction = useTrackInteraction()
  const trackShareToLinkedIn = useCallback(() => {
    trackInteraction({ name: InteractionName.ShareToLinkedIn, type: InteractionType.Click })
  }, [trackInteraction])
  return trackShareToLinkedIn
}

interface Props {
  spaceUrl: string
  showLabel?: boolean
}

export const LinkedInShareLink = memo(function LinkedInShareLink(props: Props) {
  const { spaceUrl, showLabel } = props

  const trackShareToLinkedIn = useTrackShareToLinkedIn()
  const href = useMemo(() => getLinkedInShareLink(spaceUrl), [spaceUrl])

  return (
    <a className={classes.icon} href={href} target="_blank " rel="noreferrer" onClick={trackShareToLinkedIn}>
      <LinkedInIcon className="icon icon-lg" />
      {showLabel && <span className={classes.label}>Share</span>}
    </a>
  )
})
