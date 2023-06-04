import clsx from "clsx"
import { memo } from "react"

import { SAPIRoom, SpaceMetadata } from "@spatialsys/js/sapi/types"

import classes from "./thumbnail-image-with-mask.module.scss"

type ThumbnailImageWithMaskProps = {
  classNameContainer?: string
  classNameImage?: string
  spaceName: string
  thumbnailUrl: string
}

/**
 * Renders the space thumbnail with a mask overlay.
 * Positioned absolute with 100% width and height
 */
export const ThumbnailImageWithMask = memo(function ThumbnailImageWithMask(props: ThumbnailImageWithMaskProps) {
  const { classNameContainer, classNameImage, spaceName, thumbnailUrl } = props

  return (
    <div className={clsx(classes.container, classNameContainer)}>
      <img className={clsx(classes.image, classNameImage)} src={thumbnailUrl} alt={`${spaceName} preview`} />
    </div>
  )
})

type ThumbnailImageWithMaskWithDataProps = Pick<ThumbnailImageWithMaskProps, "classNameContainer" | "classNameImage"> &
  Pick<SpaceMetadata, "thumbnail"> &
  Pick<SAPIRoom, "name">

export const ThumbnailImageWithMaskWithData = memo(function ThumbnailImageWithMaskWithData(
  props: ThumbnailImageWithMaskWithDataProps
) {
  const { thumbnail, name, ...rest } = props

  return <ThumbnailImageWithMask spaceName={name} thumbnailUrl={thumbnail} {...rest} />
})
