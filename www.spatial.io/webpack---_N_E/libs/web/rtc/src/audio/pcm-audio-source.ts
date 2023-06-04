import { logger } from "@spatialsys/web/logger"

import { autoPlayMedia } from "../auto-play-media"
import { VoiceLogChannel } from "../photon-voice/voice-log-channel"
import { RtcWindow } from "../rtc-window"
import { RTCAudioLoopback } from "./rtc-audio-loopback"

declare const window: RtcWindow

/**
 * audio source for playing audio with pcm samples
 */
export class PCMAudioSource {
  private _audioContext: AudioContext
  private _channels: number
  private _sampleRate: number
  private _minDelay = 0.2
  private _maxDelay = 1.2
  private _volume = 1
  private _playbackTailTime = 0

  private _audioElement: HTMLAudioElement
  private _destinationNode: MediaStreamAudioDestinationNode
  private _gainNode: GainNode

  private _rtcAudioPipe: RTCAudioLoopback

  constructor(audioContext: AudioContext, channels: number, sampleRate: number) {
    this._audioContext = audioContext
    this._channels = channels
    this._sampleRate = sampleRate

    this.setup()
  }

  private setup() {
    this._gainNode = this._audioContext.createGain()
    this._gainNode.gain.value = this._volume

    this._rtcAudioPipe = window.globalRTCAudioLoopback

    // used as a workaround to https://bugs.chromium.org/p/chromium/issues/detail?id=687574#c56
    // until the fix is rolled out, need this hack on chrome for echo cancellation to work
    if (window.chrome && this._rtcAudioPipe) {
      this._audioElement = document.createElement("audio")
      this._audioElement.autoplay = false
      this._audioElement.className = "photonVoiceRTCPlaybackHackOutput"
      this._audioElement.loop = true

      this._destinationNode = this._audioContext.createMediaStreamDestination()
      this._gainNode.connect(this._destinationNode)

      document.body.appendChild(this._audioElement)

      this._rtcAudioPipe.addStream(
        this._destinationNode.stream,
        (outputStream: MediaStream) => {
          this._audioElement.srcObject = outputStream

          // only start playing the audio element after we setup the srcObject
          autoPlayMedia(this._audioElement)
        },
        (err: Error) => {
          logger.error(VoiceLogChannel, err)
          // if something went wrong, just connect directly to the audio context output
          // echo cancellation may fail, but better than nothing
          this._gainNode.disconnect()
          this._gainNode.connect(this._audioContext.destination)
        }
      )
    } else {
      this._gainNode.connect(this._audioContext.destination)
    }

    this._playbackTailTime = this._audioContext.currentTime
  }

  public dispose() {
    if (this._audioElement) {
      this._audioElement.srcObject = null
      this._audioElement.remove()
    }

    if (this._destinationNode) {
      this._rtcAudioPipe?.removeStream(this._destinationNode.stream)
    }
  }

  public setVolume(volume: number) {
    this._volume = volume
    if (this._gainNode) {
      this._gainNode.gain.value = this._volume
    }
  }

  public feed(samples: Float32Array) {
    if (!samples.length) {
      return
    }

    const bufferSource = this._audioContext.createBufferSource()
    const length = samples.length / this._channels
    const audioBuffer = this._audioContext.createBuffer(this._channels, length, this._sampleRate)

    for (let channel = 0; channel < this._channels; channel++) {
      const audioData = audioBuffer.getChannelData(channel)
      let offset = channel

      for (let i = 0; i < length; i++) {
        audioData[i] = samples[offset]
        offset += this._channels
      }
    }

    // if there is a 'gap' wait the minimum delay to help maintain continuous playback
    if (this._playbackTailTime < this._audioContext.currentTime) {
      this._playbackTailTime = this._audioContext.currentTime + this._minDelay
    }

    // delay from current buffering time to current playback time
    const delay = this._playbackTailTime - this._audioContext.currentTime

    // if it's over the max value, force it to the max delay value
    // this might cause some overlapping of sound
    if (delay > this._maxDelay) {
      this._playbackTailTime = this._audioContext.currentTime + this._maxDelay
    }

    bufferSource.buffer = audioBuffer
    bufferSource.connect(this._gainNode)
    bufferSource.start(this._playbackTailTime)
    this._playbackTailTime += audioBuffer.duration
  }
}

export default PCMAudioSource
