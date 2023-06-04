import clsx from "clsx"
import { memo } from "react"

import classes from "./space-badges.module.scss"

type SpaceBadgeProps = {
  red?: boolean
  children: React.ReactNode
}

export const SpaceBadge = memo(function SpaceBadge(props: SpaceBadgeProps) {
  const { children, red } = props

  return <div className={clsx(classes.spaceBadge, red && classes.badgeRed)}>{children}</div>
})
