import { RefObject, forwardRef, memo, useEffect } from "react"

import VideoGarbageCollected from "@spatialsys/web/core/js/components/video-garbage-collected/video-garbage-collected"
import { useDefaultProps } from "@spatialsys/web/core/js/util/hooks"
import { autoPlayMedia } from "@spatialsys/web/rtc/auto-play-media"

interface AutoplayingVideoProps {
  className?: string
  muted?: boolean
  mirrored?: boolean
}

const AutoplayingVideo = forwardRef(function AutoplayingVideo(
  _props: AutoplayingVideoProps,
  ref: RefObject<HTMLVideoElement>
) {
  const props = useDefaultProps(_props, {
    muted: true,
  })

  useEffect(() => {
    const videoElement = ref.current
    if (!videoElement) return

    autoPlayMedia(videoElement)
  }, [ref])

  return (
    <VideoGarbageCollected
      ref={ref}
      autoPlay
      playsInline
      disablePictureInPicture
      muted={props.muted}
      className={props.className}
      style={_props.mirrored ? { transform: "scaleX(-1)" } : undefined}
      disableRemotePlayback
    />
  )
})

export default memo(AutoplayingVideo)
