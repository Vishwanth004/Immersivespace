import LiveSwitch from "fm.liveswitch"
import { Event, Signal } from "ts-typed-events"

import { logger } from "@spatialsys/web/logger"

import DelayCommand from "./delay-command"
import * as RTCLocalClient from "./rtc-local-client"
import { RTCLogChannel } from "./rtc-log-channel"
import RTCRemoteMCUMedia from "./rtc-remote-mcu-media"
import RTCRemoteMCUSourceMedia from "./rtc-remote-mcu-source-media"
import RTCRemoteMedia from "./rtc-remote-media"

export default class RTCRemoteClient {
  private readonly TIMEOUT_DURATION_SECONDS: number = 10

  private _ID: string

  public GetID() {
    return this._ID
  }

  private _userID: string

  public GetUserID() {
    return this._userID
  }

  private _deviceID: string

  public GetDeviceID() {
    return this._deviceID
  }

  private _medias: { [mediaID: string]: RTCRemoteMedia } = {}

  private _timeoutCommand: DelayCommand = null

  public connectedToChannel = new Signal()

  public disconnectedFromChannel = new Signal()

  public timedOut = new Signal()

  public capturedMedia = new Event<{ mediaID: string; mediaType: string }>()

  public releasedMedia = new Event<string>()

  public GetRemoteMedia(mediaID: string) {
    return this._medias[mediaID]
  }

  public GetAllRemoteMedias() {
    return this._medias
  }

  // For internal use only (DeadClientTimeoutCommand)
  public ObjectDebugString(): string {
    return `RemoteClient{userID=${this.GetID()}:clientID=${this.GetUserID()}}`
  }

  public constructor(ID: string, userID: string, deviceID: string) {
    this._ID = ID
    this._userID = userID
    this._deviceID = deviceID
  }

  public Dispose() {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.Dispose()`)

    // If we were timing out, cancel the timeout (because we no longer care)
    if (this._timeoutCommand != null) {
      this._timeoutCommand.Cancel()
    }

    // Dispose all remote media
    Object.keys(this._medias).forEach((mediaID) => {
      this.HandleRemoteMediaReleased(mediaID)
    })
  }

  public HandleRemoteUpstreamConnectionOpen(connectionInfo: LiveSwitch.ConnectionInfo) {
    if (!(connectionInfo.getMediaId() in this._medias) && connectionInfo.getTag() === "Voice") {
      this.HandleRemoteMediaCaptured(connectionInfo.getMediaId(), "Voice", -1)
    }

    if (connectionInfo.getTag() === "Cast") {
      this.HandleRemoteMediaCaptured(connectionInfo.getMediaId(), connectionInfo.getTag(), -1)
    }
    if (connectionInfo.getMediaId() in this._medias) {
      // Tell the remote media it can now connect to an sfu (if it wants)
      this._medias[connectionInfo.getMediaId()].HandleSfuAvailable(connectionInfo)
    }
  }

  public HandleRemoteUpstreamConnectionClose(connectionInfo: LiveSwitch.ConnectionInfo) {
    // If we still know about this remote media (we may have received this event
    // after a HandleRemoteMediasUpdated event already removed it), tell it that
    // it can no longer connect to an sfu
    if (connectionInfo.getMediaId() in this._medias) {
      this._medias[connectionInfo.getMediaId()].HandleSfuUnavailable()
    }
  }

  public HandleConnectedToChannel() {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleConnectedToChannel()`)

    // TODO: This notifies all remote clients of the local client's medias,
    // when we only need to notify this remote client; currently blocked on
    // fixing this because I can't figure out why LiveSwitch.Client.SendClientMessage()
    // is not working correctly
    RTCLocalClient.NotifyLocalMediasUpdated()

    // If we were timing out, cancel the timeout
    if (this._timeoutCommand != null) {
      this._timeoutCommand.Cancel()
      this._timeoutCommand = null
    }

    this.connectedToChannel.emit()
  }

  public HandleDisconnectedFromChannel() {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleDisconnectedFromChannel()`)

    this._timeoutCommand = new DelayCommand(this.TIMEOUT_DURATION_SECONDS, () => {
      logger.info(RTCLogChannel, `${this.ObjectDebugString()} timed out`)

      this._timeoutCommand = null
      RTCLocalClient.HandleRemoteClientReleasedChannel(this._ID)
      this.timedOut.emit()
    })

    this.disconnectedFromChannel.emit()
  }

  public HandleRemoteMediasUpdated(medias: { [mediaID: string]: RTCLocalClient.MediaUpdatedInfo }) {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.HandleRemoteMediasUpdated()`)

    const updatedMedias = new Set<string>(Object.keys(medias))
    const currentMedias = new Set<string>(Object.keys(this._medias))

    // Create each remote media we didn't previously know about
    const mediasToAdd = [...updatedMedias].filter((x) => !currentMedias.has(x))
    mediasToAdd.forEach((mediaID) => {
      const media = medias[mediaID]
      this.HandleRemoteMediaCaptured(mediaID, media.mediaType, media.frameRate)

      const channelRemoteUpstreamConnectionInfos = RTCLocalClient.GetChannel().getRemoteUpstreamConnectionInfos()
      const mcuChannelRemoteUpstreamConnectionInfos = RTCLocalClient.GetMcuChannel().getRemoteUpstreamConnectionInfos()

      channelRemoteUpstreamConnectionInfos.concat(mcuChannelRemoteUpstreamConnectionInfos).forEach((connectionInfo) => {
        if (connectionInfo.getMediaId() === mediaID) {
          this._medias[connectionInfo.getMediaId()].HandleSfuAvailable(connectionInfo)
        }
      })
    })

    // Dispose each remote media we knew about but are told no longer exists
    const mediasToRemove = [...currentMedias].filter((x) => !updatedMedias.has(x))
    mediasToRemove.forEach((mediaID) => {
      this.HandleRemoteMediaReleased(mediaID)
    })
  }

  private HandleRemoteMediaCaptured(mediaID: string, mediaType: string, frameRate: number) {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleRemoteMediaCaptured()`, { mediaID })

    if (mediaID === "mcu") {
      this._medias[mediaID] = new RTCRemoteMCUSourceMedia(mediaID, mediaType, frameRate, this)
    } else if (mediaType === "Webcam") {
      this._medias[mediaID] = new RTCRemoteMCUMedia(mediaID, mediaType, frameRate, this)
    } else {
      this._medias[mediaID] = new RTCRemoteMedia(mediaID, mediaType, frameRate, this)
    }

    this.capturedMedia.emit({ mediaID, mediaType })
  }

  private HandleRemoteMediaReleased(mediaID: string) {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleRemoteMediaReleased()`, { mediaID })

    this._medias[mediaID].Dispose()
    delete this._medias[mediaID]
    this.releasedMedia.emit(mediaID)
  }
}
