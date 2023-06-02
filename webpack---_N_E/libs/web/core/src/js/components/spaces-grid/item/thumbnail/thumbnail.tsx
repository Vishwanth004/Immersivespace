import clsx from "clsx"
import { memo } from "react"

import { SpaceMetadata } from "@spatialsys/js/sapi/types"

import classes from "./thumbnail.module.scss"

type ThumbnailProps = {
  thumbnailUrl: string
  unprotected?: boolean
  sharpCorners?: boolean
} & Pick<SpaceMetadata, "name">

export const Thumbnail = memo(function Thumbnail(props: ThumbnailProps) {
  const { thumbnailUrl, name, unprotected = false, sharpCorners = false } = props

  return (
    <div className={clsx(classes.container, sharpCorners && classes.sharpCorners, "h-full w-full")}>
      <img loading="lazy" src={thumbnailUrl} alt={name} className={clsx(classes.image, "h-full w-full object-cover")} />
      {!unprotected && <div className={clsx(classes.imageProtection, "absolute inset-0")} />}
    </div>
  )
})
