import { memo, useCallback, useMemo } from "react"

import { ReactComponent as FacebookIcon } from "@spatialsys/assets/icons/material-filled/facebook.svg"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { getFbShareLink } from "@spatialsys/url-utils"

import classes from "./facebook.module.scss"

interface FacebookShareLinkProps {
  spaceUrl: string
  showLabel?: boolean
}

const useTrackShareToFacebook = () => {
  const trackInteraction = useTrackInteraction()
  const trackShareToFacebook = useCallback(() => {
    trackInteraction({ name: InteractionName.ShareToFacebook, type: InteractionType.Click })
  }, [trackInteraction])
  return trackShareToFacebook
}

export const FacebookShareLink = memo(function FacebookShareLink(props: FacebookShareLinkProps) {
  const { spaceUrl, showLabel } = props

  const trackShareToFacebook = useTrackShareToFacebook()
  const href = useMemo(() => getFbShareLink(spaceUrl), [spaceUrl])

  return (
    <a className={classes.icon} href={href} target="_blank " rel="noreferrer" onClick={trackShareToFacebook}>
      <FacebookIcon className="icon icon-lg" />
      {showLabel && <span className={classes.label}>Share</span>}
    </a>
  )
})
