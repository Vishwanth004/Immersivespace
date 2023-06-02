import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import AutoplayingVideo from "@spatialsys/web/core/js/components/autoplaying-video/autoplaying-video"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { RoomRTCMediaState, RoomRTCMediaStatus } from "@spatialsys/web/rtc/rtc-state"
import { Loader } from "@spatialsys/web/ui"
import { useWindowSize } from "@spatialsys/web/ui/hooks"

import classes from "./room-video-lightbox.module.scss"

const MAX_SIZE_RATIO = 0.95

interface RoomVideoLightboxProps {
  media: RoomRTCMediaState | null
  handleClose?: () => void
}

const statusClassMap: Readonly<Record<RoomRTCMediaStatus, string>> = {
  connected: classes.connected,
  connecting: classes.connecting,
  "connecting-hidden": "",
} as const

export default function RoomVideoLightbox(props: RoomVideoLightboxProps) {
  // Video size must be calculated in JS because there is no way to apply a border-radius
  // in css to a video with object-fit: contain
  const windowSize = useWindowSize()
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 })

  const lightboxRef = useRef<HTMLDivElement>(null)
  const innerWrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const statusClassName = statusClassMap[props.media?.status]
  const mirrored = props.media?.raw?.mediaType === "Webcam" && props.media?.location === "local"

  useEffect(() => {
    if (!videoRef.current) {
      return
    }

    const handleResize = () => {
      setVideoSize({ width: videoRef.current.videoWidth, height: videoRef.current.videoHeight })
    }

    const currentVideoRef = videoRef.current
    currentVideoRef.addEventListener("resize", handleResize)
    return () => {
      currentVideoRef.removeEventListener("resize", handleResize)
    }
  }, [videoRef])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.media?.raw.GetNativeMedia()
    }
  }, [props.media, videoRef])

  useEffect(() => {
    if (innerWrapperRef.current && lightboxRef.current) {
      const maxHeight = windowSize.height * MAX_SIZE_RATIO
      const maxWidth = windowSize.width * MAX_SIZE_RATIO
      const ratio = Math.min(maxWidth / videoSize.width, maxHeight / videoSize.height)
      innerWrapperRef.current.style.width = `${videoSize.width * ratio}px`
      innerWrapperRef.current.style.height = `${videoSize.height * ratio}px`
    }
  }, [windowSize, videoSize, innerWrapperRef, lightboxRef])

  return (
    <TrackedComponent id={TrackedComponents.RtcModal} properties={{ "Media Type": "Video" }}>
      <div className={clsx(classes.roomVideoLightbox, statusClassName, mirrored && classes.mirror)} ref={lightboxRef}>
        {/* TODO: Fix autoplay problem that would occur if an unmuted video tries to play w/o any user interaction first */}
        <div className={classes.videoWrapper} ref={innerWrapperRef}>
          <AutoplayingVideo ref={videoRef} muted />
          <CloseButton classNameButton={classes.closeButton} onClick={props.handleClose} />
        </div>
        {props.media?.status === "connecting" && (
          <div className={classes.reconnectingLoader}>
            <Loader color="black" variant="plain" />
            {`Attempting to reconnect${props.media?.raw.mediaType ? ` to ${props.media?.raw.mediaType}` : ""}...`}
          </div>
        )}
      </div>
    </TrackedComponent>
  )
}
