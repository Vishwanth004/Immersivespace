import clsx from "clsx"
import { memo, useEffect, useMemo, useRef } from "react"

import AutoplayingVideo from "@spatialsys/web/core/js/components/autoplaying-video/autoplaying-video"
import { RoomRTCMediaState } from "@spatialsys/web/rtc/rtc-state"
import { calculateRTCRegionStyle } from "@spatialsys/web/rtc/rtc/rtc-helpers"

import classes from "./avatar-video-thumbnail.module.scss"

interface VideoAvatarThumbnailProps {
  media?: RoomRTCMediaState | null
  mirrored?: boolean
}

/**
 * Displays the participant's RTC feed
 * Will determine and style to show only the region of the video feed if it's using the MCU
 */
const AvatarVideoThumbnail = memo(function VideoAvatarThumbnail(props: VideoAvatarThumbnailProps) {
  const { media, mirrored } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const region = media?.location === "remote" && media.useMCU ? media.mcuRegion : null
  const videoStyle = useMemo(() => calculateRTCRegionStyle(region), [region])

  useEffect(() => {
    videoRef.current.srcObject = props.media.raw.GetNativeMedia()
  }, [props.media])

  return (
    <div className={classes.videoWrapper}>
      <div className={clsx(classes.video, classes.absolutePosition)} style={videoStyle}>
        <AutoplayingVideo ref={videoRef} className={classes.video} mirrored={mirrored} />
      </div>
    </div>
  )
})

export default AvatarVideoThumbnail
