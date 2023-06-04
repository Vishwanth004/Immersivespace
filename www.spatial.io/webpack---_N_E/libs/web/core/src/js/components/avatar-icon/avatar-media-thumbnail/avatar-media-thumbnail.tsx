import clsx from "clsx"

import { AvatarIcon, AvatarIconProps } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import AvatarVideoThumbnail from "@spatialsys/web/core/js/components/avatar-icon/avatar-video-thumbnail/avatar-video-thumbnail"
import { RoomRTCMediaState } from "@spatialsys/web/rtc/rtc-state"

import classes from "./avatar-media-thumbnail.module.scss"

interface VideoAvatarIconProps extends AvatarIconProps {
  media?: RoomRTCMediaState | null
  mirrored?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Displays the participant's RTC feed if available, otherwise displays the participant's avatar icon
 * If no avatar is available, displays the first letter of the participant's display name
 */
const AvatarMediaThumbnail = (props: VideoAvatarIconProps) => {
  const { media, mirrored, className, style, ...rest } = props
  const rtcMedia = media?.raw

  const renderContents = () => {
    if (rtcMedia) {
      return <AvatarVideoThumbnail media={media} mirrored={mirrored} />
    } else {
      return <AvatarIcon {...rest} />
    }
  }

  return (
    <div className={clsx(classes.container, className)} style={style}>
      {renderContents()}
    </div>
  )
}

export default AvatarMediaThumbnail
