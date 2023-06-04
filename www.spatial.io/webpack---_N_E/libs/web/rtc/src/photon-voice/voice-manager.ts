import { SpatialLogger, logger } from "@spatialsys/web/logger"

import { RtcWindow } from "../rtc-window"
import libopusWasmUrl from "./libopus.wasm.br"
import makeSpatialPromise, { SpatialPromise } from "./spatial-promise"
import { VoiceLogChannel } from "./voice-log-channel"

declare const window: RtcWindow & typeof globalThis

class VoiceManager {
  public usePhoton = false

  private _audioUnblockingPromise: SpatialPromise<void>
  get audioUnblockingPromise() {
    return this._audioUnblockingPromise
  }

  private audioUnblocker: HTMLAudioElement

  public setup(audioUnblocker: HTMLAudioElement) {
    this.audioUnblocker = audioUnblocker || this.audioUnblocker
  }

  // All dynamic imports are sideeffect-only
  private static importPhotonLibraries() {
    /**
     * Bind a logger to the window object. This logger is used by `libopus.js` and `rtc-audio-playback.js`
     */
    window.spatialWebGLLogger = new SpatialLogger(VoiceLogChannel)
    window.LIBOPUS_WASM_URL = libopusWasmUrl
    return Promise.all([import(/* webpackPrefetch: true */ "./libopus") as unknown as void])
  }

  public preparePhotonVoiceClientIfNeeded(onInitialized: () => void): void {
    void VoiceManager.importPhotonLibraries().then(() => {
      if (window.libopus.loaded) {
        onInitialized()
      } else {
        window.libopus.onload = () => {
          onInitialized()
        }
      }
    })
  }

  // AudioContext must be resumed in response to a touch event for iOS to work
  // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html#//apple_ref/doc/uid/TP40009523-CH6-SW6
  lazyUnblockAudioContext(): Promise<boolean> {
    if (window.globalAudioContext?.state === "running") {
      return Promise.resolve(true)
    }

    if (!window.globalAudioContext) {
      window.globalAudioContext = new (window.AudioContext || window.webkitAudioContext)()
    }

    return new Promise((resolve, reject) => {
      if (window.globalAudioContext.state === "suspended") {
        const unlock = () => {
          window.globalAudioContext
            .resume()
            .then(() => {
              document.body.removeEventListener("touchstart", unlock)
              document.body.removeEventListener("touchend", unlock)
              document.body.removeEventListener("click", unlock)
              resolve(true)
            })
            .catch((error) => {
              reject(error)
            })
        }
        document.body.addEventListener("touchstart", unlock, false)
        document.body.addEventListener("touchend", unlock, false)
        document.body.addEventListener("click", unlock, false)
      } else if (window.globalAudioContext.state === "running") {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  // Chrome will only autoplay audio if the user has interacted with the page (don't need to start playback as a result of this interaction though)
  // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
  isAudioUnblockingNeeded(): Promise<boolean> {
    this._audioUnblockingPromise = makeSpatialPromise(this.audioUnblocker.play())

    // may be undefined on older browsers
    if (this.audioUnblockingPromise !== undefined) {
      return new Promise((resolve, reject) => {
        logger.info(VoiceLogChannel, "Unblock audio: Trying to autoplay")
        this.audioUnblockingPromise
          .then(() => {
            logger.info(VoiceLogChannel, "Unblock audio: Audio autoplay allowed")
            resolve(false)
          })
          .catch((error) => {
            logger.error(VoiceLogChannel, "Unblock audio: Failed to autoplay", error)
            if (error.name === "NotAllowedError") {
              resolve(true)
            } else {
              reject(error)
            }
          })
      })
    }

    return Promise.resolve(true)
  }

  public attemptUnblockingAudio() {
    return this.isAudioUnblockingNeeded().then((unblockingNeeded) => {
      if (unblockingNeeded) {
        throw new AudioUnblockingNeededError()
      }
    })
  }
}

const voiceManager = new VoiceManager()
export { voiceManager }

export class AudioUnblockingNeededError extends Error {}
