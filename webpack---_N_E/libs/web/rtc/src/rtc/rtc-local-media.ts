import LiveSwitch from "fm.liveswitch"

import { logger } from "@spatialsys/web/logger"

import * as RTCLocalClient from "./rtc-local-client"
import { RTCLogChannel } from "./rtc-log-channel"
import RTCMedia from "./rtc-media"
import { RTCMediaSenderStats } from "./rtc-stats"

export default class RTCLocalMedia extends RTCMedia {
  private _media: LiveSwitch.LocalMedia
  private _audioContext: AudioContext
  private _sourceNode: AudioNode
  private _gainNode: GainNode
  private _destinationNode: MediaStreamAudioDestinationNode
  private _shouldTransmit: boolean

  public GetStats() {
    return this._stats as RTCMediaSenderStats
  }

  public GetNativeMedia(): MediaStream {
    return (this._media as any)._getInternal()._videoMediaStream
  }

  protected ObjectDebugString(): string {
    return `LocalMedia{mediaID=${this.ID}:tag=${this.mediaType}}`
  }

  public constructor(id: string, media: LiveSwitch.LocalMedia, tag: string) {
    super()

    this._media = media
    this._stats = new RTCMediaSenderStats()

    this.ID = id
    this.mediaType = tag as any

    const videoEncoding = this._media.getVideoEncoding()
    if (videoEncoding) {
      this.frameRate = videoEncoding.getFrameRate()
    } else {
      this.frameRate = 0
    }
  }

  public override Dispose() {
    super.Dispose()

    if (this._gainNode) {
      this._gainNode.disconnect()
      this._gainNode = null
    }

    if (this._destinationNode) {
      this._destinationNode.disconnect()
      this._destinationNode = null
    }
  }

  public Start() {
    void this._media.start()
  }

  public Stop() {
    void this._media.stop()
  }

  public SetMute(mute: boolean) {
    this._media.setAudioMuted(mute)
  }

  public SetShouldTransmit(transmitting: boolean) {
    this._shouldTransmit = transmitting
    this.updateTransmission()
  }

  public SetupTransmissionNodes(
    audioContext: AudioContext,
    sourceNode: AudioNode,
    destinationNode: MediaStreamAudioDestinationNode
  ) {
    this._audioContext = audioContext
    this._sourceNode = sourceNode
    this._gainNode = audioContext.createGain()
    this._destinationNode = destinationNode

    this._sourceNode.connect(this._gainNode)
    this._gainNode.connect(this._destinationNode)

    this.updateTransmission()
  }

  private updateTransmission() {
    if (this._gainNode && this._audioContext) {
      // reduces volume to zero if should not be transmitting
      this._gainNode.gain.setValueAtTime(this._shouldTransmit ? 1 : 0, this._audioContext.currentTime)
    }
  }

  public ChangeAudioInputSource(inputSource: string) {
    if (this._media.getAudioSourceInput().getId() === inputSource) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._media.getAudioSourceInputs().then((inputs) => {
      for (let i = 0; i < inputs.length; ++i) {
        const input = inputs[i]
        if (input.getId() === inputSource) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._media.changeAudioSourceInput(input)
          break
        }
      }
    })
  }

  protected CreateConnection() {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.CreateSfuConnection()`)

    const audioStream = new LiveSwitch.AudioStream(this._media)
    const videoStream = new LiveSwitch.VideoStream(this._media)

    let connection = null as LiveSwitch.SfuUpstreamConnection
    if (this.mediaType === "Webcam") {
      connection = RTCLocalClient.GetMcuChannel().createSfuUpstreamConnection(audioStream, videoStream, this.ID)
    } else {
      connection = RTCLocalClient.GetChannel().createSfuUpstreamConnection(audioStream, videoStream, this.ID)
    }

    connection.setTag(this.mediaType)

    return connection
  }

  public GetAudioSourceInput() {
    return this._media.getAudioSourceInput()
  }

  public GetVideoSourceInput() {
    return this._media.getVideoSourceInput()
  }
}
