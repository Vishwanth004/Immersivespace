import LiveSwitch from "fm.liveswitch"
import { Event } from "ts-typed-events"
import { v4 as uuid } from "uuid"

import { isFirefox } from "@spatialsys/web/user-agent"

import * as RTCLocalClient from "./rtc-local-client"
import RTCLocalMedia from "./rtc-local-media"
import RTCMedia from "./rtc-media"

let capturesInProgress: { [uuid: string]: null } = {}

export const localMediaCaptured = new Event<{
  mediaType: RTCMedia["mediaType"]
  mediaID: string
}>()
export const localMediaCaptureRejected = new Event<{
  mediaType: RTCMedia["mediaType"]
  error: LiveSwitch.Exception
}>()
export const localMediaReleased = new Event<string>()

export function Release(mediaID: string) {
  const media = RTCLocalClient.GetLocalMedia(mediaID)
  if (media) {
    media.Stop()
    media.Dispose()
    RTCLocalClient.RemoveLocalMedia(mediaID)
    localMediaReleased.emit(mediaID)
  }
}

function Initialize(captureId: string, liveswitchMedia: LiveSwitch.LocalMedia, tag: string) {
  if (captureId in capturesInProgress) {
    const mediaID = liveswitchMedia.getId()
    const media = new RTCLocalMedia(mediaID, liveswitchMedia, tag)

    if (tag !== "Voice") {
      media.GetNativeMedia().getVideoTracks()[0].onended = () => Release(mediaID)
    }

    RTCLocalClient.AddLocalMedia(mediaID, media)
    localMediaCaptured.emit({ mediaType: media.mediaType, mediaID })
  } else {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    liveswitchMedia.stop()
  }
}

export function CaptureWebcam(maxWidth: number, maxHeight: number, maxFrameRate: number | null, deviceId?: string) {
  const captureId = uuid()
  capturesInProgress[captureId] = null

  // https://stackoverflow.com/questions/35516416/firefox-frame-rate-max-constraint
  const defaultFrameRate = isFirefox(navigator.userAgent) ? 30 : 8
  const frameRate = { max: maxFrameRate === null ? defaultFrameRate : maxFrameRate }

  // https://help.frozenmountain.com/docs/liveswitch/clients/javascript#HandlingLocalMedia
  const videoConfig: MediaTrackConstraints = {
    width: maxWidth,
    height: maxHeight,
    ...(frameRate && { frameRate }),
    ...(deviceId && { deviceId: { exact: deviceId } }),
  }

  const localMedia = new LiveSwitch.LocalMedia(false, videoConfig)
  void localMedia
    .start()
    .then(() => Initialize(captureId, localMedia, "Webcam"))
    .fail((e) => localMediaCaptureRejected.emit({ mediaType: "Webcam", error: e }))

  return captureId
}

export function CaptureScreen(maxWidth: number, maxHeight: number, maxFrameRate: number) {
  const captureId = uuid()
  capturesInProgress[captureId] = null

  const constraints = {
    audio: true,
    video: {
      width: {
        max: maxWidth,
      },
      height: {
        max: maxHeight,
      },
      frameRate: {
        max: maxFrameRate,
      },
    },
  }

  // only called on desktop
  ;(navigator.mediaDevices as any)
    .getDisplayMedia(constraints as any)
    .then((stream: any) => {
      const localMedia = new LiveSwitch.LocalMedia(stream, stream)
      void localMedia
        .start()
        .then(() => Initialize(captureId, localMedia, "Screen"))
        .fail((e) => localMediaCaptureRejected.emit({ mediaType: "Screen", error: e }))
    })
    .catch((e) => {
      localMediaCaptureRejected.emit({ mediaType: "Screen", error: e })
    })

  return captureId
}

export function CaptureMicrophone(mediaStream: MediaStream) {
  const captureId = uuid()
  capturesInProgress[captureId] = null

  const voiceMedia = new LiveSwitch.LocalMedia(mediaStream, false)

  return voiceMedia
    .start()
    .then<LiveSwitch.LocalMedia>((media) => {
      Initialize(captureId, voiceMedia, "Voice")
      return media
    })
    .fail((e) => {
      localMediaCaptureRejected.emit({ mediaType: "Voice", error: e })
    })
}

export function CancelCapture(captureId: string) {
  delete capturesInProgress[captureId]
}

export function CancelCapturesInProgress() {
  capturesInProgress = {}
}
