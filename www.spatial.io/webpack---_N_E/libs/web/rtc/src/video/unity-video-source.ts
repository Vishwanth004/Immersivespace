import { RtcWindow } from "../rtc-window"
import { createVideoElementSource } from "./video-element-source"
import { tryCreateVideoProcessorSource } from "./video-processor-source"

export enum VideoStreamSourceType {
  Liveswitch = "liveswitch",
  HLS = "hls",
}
export interface LiveswitchSourceInfo {
  clientID: string
  mediaID: string
}

export interface HLSSourceInfo {
  url: string
  id: string
}

export interface CreateUnityVideoSourceProps {
  sourceType: VideoStreamSourceType
  sourceInfo: LiveswitchSourceInfo | HLSSourceInfo
}

declare const window: RtcWindow

export const createUnityVideoSource = (props: CreateUnityVideoSourceProps) => {
  const { sourceType, sourceInfo } = props

  if (sourceType === VideoStreamSourceType.Liveswitch) {
    return createLiveswitchVideoSource(sourceInfo as LiveswitchSourceInfo)
  } else if (sourceType === VideoStreamSourceType.HLS) {
    // todo: create hls video element here
    // return createVideoElementSource(video)
  }

  return null
}

const createLiveswitchVideoSource = (info: LiveswitchSourceInfo) => {
  if (typeof window.spatialWebGLGetMediaStream === "function") {
    const mediaStream = window.spatialWebGLGetMediaStream(info.clientID, info.mediaID)

    if (mediaStream) {
      let videoSource = tryCreateVideoProcessorSource(mediaStream)
      if (!videoSource) {
        const video = createVideoElement()
        video.srcObject = mediaStream
        videoSource = createVideoElementSource(video)
      }

      return videoSource
    }
  }

  return null
}

const createVideoElement = () => {
  const video = document.createElement("video")
  video.className = "unity-webgl-video-source"
  video.style.display = "none"
  video.playsInline = true
  video.muted = true
  video.loop = true
  video.disablePictureInPicture = true
  document.body.append(video)

  video.play().catch(() => {
    video.addEventListener("canplay", () => {
      void video.play()
    })
  })

  return video
}
