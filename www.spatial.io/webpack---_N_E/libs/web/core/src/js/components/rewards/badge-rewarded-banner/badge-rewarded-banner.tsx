import Link from "next/link"
import { memo } from "react"

import { Badge } from "@spatialsys/js/sapi/types"

import classes from "./badge-rewarded-banner.module.scss"

type BadgeRewardedBannerProps = { badge: Badge }

export const BadgeRewardedBanner = memo(function BadgeRewardedBanner(props: BadgeRewardedBannerProps) {
  const { badge } = props

  return (
    // TODO (DEV-20279): open modal instead of linking to `/profile`
    <Link href="/profile" className={classes.container} rel="noreferrer" target="_blank">
      <img className={classes.image} alt={badge.name} src={badge.badgeIconURL} />
      <span className={classes.text}>You earned {badge.name}!</span>
    </Link>
  )
})
