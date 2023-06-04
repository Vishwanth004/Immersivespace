import LiveSwitch from "fm.liveswitch"

import { logger } from "@spatialsys/web/logger"

import { autoPlayMedia } from "../auto-play-media"
import * as RTCLocalClient from "./rtc-local-client"
import { RTCLogChannel } from "./rtc-log-channel"
import RTCMedia from "./rtc-media"
import RTCRemoteClient from "./rtc-remote-client"
import { RTCMediaReceiverStats } from "./rtc-stats"

export default class RTCRemoteMedia extends RTCMedia {
  private _client: RTCRemoteClient
  protected _media: LiveSwitch.RemoteMedia

  public GetClient() {
    return this._client
  }

  public GetStats() {
    return this._stats as RTCMediaReceiverStats
  }

  public GetNativeMedia(): MediaStream {
    return (this._media as any)._getInternal()._videoMediaStream
  }

  public GetVolume(): number {
    return this._media.getAudioVolume()
  }

  public SetVolume(volume: number) {
    this._media.setAudioVolume(volume)
  }

  protected ObjectDebugString(): string {
    return `RemoteMedia{userID=${this._client.GetUserID()}:clientID=${this._client.GetID()}:mediaID=${this.ID}:tag=${
      this.mediaType
    }}`
  }

  public constructor(id: string, mediaType: string, frameRate: number, client: RTCRemoteClient) {
    super()

    this.ID = id
    this.mediaType = mediaType as any
    this.frameRate = frameRate
    this._client = client
    this._stats = new RTCMediaReceiverStats()
    this.Initialize()
  }

  protected Initialize() {
    this._media = new LiveSwitch.RemoteMedia()

    const videoSink = (this._media as any)._getInternal()._audioSink
    const mediaElement = videoSink.getAudio()

    autoPlayMedia(mediaElement)
  }

  protected CreateConnection(connectionInfo: LiveSwitch.ConnectionInfo): LiveSwitch.ServerConnection {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.CreateConnection()`)

    const audioStream = new LiveSwitch.AudioStream(this._media)
    const videoStream = new LiveSwitch.VideoStream(this._media)
    videoStream.setSimulcastMode(LiveSwitch.SimulcastMode.RtpStreamId)

    return RTCLocalClient.GetChannel().createSfuDownstreamConnection(connectionInfo, audioStream, videoStream)
  }
}
