import { Draft } from "immer"

import { MicStatus } from "@spatialsys/unity/app-state"

import type * as _RTCLocalClient from "./rtc/rtc-local-client"
import type RTCLocalMedia from "./rtc/rtc-local-media"
import type RTCMedia from "./rtc/rtc-media"
import type * as _RTCMediaCapture from "./rtc/rtc-media-capture"
import type RTCRemoteMedia from "./rtc/rtc-remote-media"

export const DEVICE_ID = "00000000-0000-0000-000000000000"

export enum WebcamStatus {
  Initializing = 0,
  Off = 1,
  On = 2,
  RequestingPermissions = 3,
  PermissionsDenied = 4,
  Unavailable = 5,
}

export interface ScreenShareSetting {
  maxWidth: number
  maxHeight: number
  maxFrameRate: number
}

export type RTCLocalClient = typeof _RTCLocalClient
export type RTCMediaCapture = typeof _RTCMediaCapture

// The Unity sends multiple spectator streams which could be these
export type RoomRTCSpectatorStreamType = "Wallcam" | "Autocam"
export type RoomRTCMediaStatus = "connected" | "connecting" | "connecting-hidden"

interface RoomRTCMediaStateInternal {
  userID: string
  status: RoomRTCMediaStatus
  audioRemoteIP?: string
  videoRemoteIP?: string
  raw: RTCMedia | null
  location: "local" | "remote"
}

export interface RoomRTCLocalMediaState extends RoomRTCMediaStateInternal {
  location: "local"
  raw: RTCLocalMedia
}

export interface RoomRTCRemoteMediaState extends RoomRTCMediaStateInternal {
  location: "remote"
  raw: RTCRemoteMedia
  clientId: string
  mcuRegion: RTCMediaRegionState
  useMCU: boolean
}

export interface RTCMediaRegionState {
  x: number
  y: number
  width: number
  height: number
  widthRatio: number
  heightRatio: number
}

export type RoomRTCMediaState = RoomRTCLocalMediaState | RoomRTCRemoteMediaState

export type RtcState = {
  webcamStatus: WebcamStatus
  micStatus: MicStatus
  screenSharing: boolean
  localWebcamMediaID: string | null
  localScreenshareMediaID: string | null
  localVoiceMediaID: string | null
  localMedias: { [mediaID: string]: RoomRTCLocalMediaState }
  remoteMedias: { [mediaID: string]: RoomRTCRemoteMediaState }
  /**
   * If local just the mediaId, if remote the full id (clientId:mediaId)
   */
  currentStreamId: string | null
  readyForCapture: boolean
  selectedSpectatorCamera: RoomRTCSpectatorStreamType
}

export const getInitialRoomRtcState = (): RtcState => ({
  webcamStatus: WebcamStatus.Off,
  micStatus: MicStatus.Off,
  screenSharing: false,
  localWebcamMediaID: null,
  localScreenshareMediaID: null,
  localVoiceMediaID: null,
  localMedias: {},
  remoteMedias: {},
  currentStreamId: null,
  readyForCapture: false,
  selectedSpectatorCamera: "Wallcam",
})

export type RtcStateUpdate = (draft: Draft<RtcState>) => void
export type RtcStateUpdater = (setter: RtcStateUpdate) => void
