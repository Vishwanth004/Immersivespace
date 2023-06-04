import * as Sentry from "@sentry/nextjs"
import { buffers, channel, eventChannel } from "redux-saga"
import { FixedTask, call, fork, join, put } from "typed-redux-saga/macro"

import { takeEveryAndClose } from "@spatialsys/js/redux"
import { UnityInstanceFactory, UnityInstanceParameters } from "@spatialsys/js/types"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilChanged } from "@spatialsys/use-saga"
import { global_setHasFatalException } from "@spatialsys/web/app-context"
import { Actions, DownloadState, Selectors } from "@spatialsys/web/app-state"
import Config, { UnityManifest } from "@spatialsys/web/config"
import * as PerformanceMonitor from "@spatialsys/web/core/js/analytics/performance-monitor"
import { LogChannel, logger } from "@spatialsys/web/logger"
import PCMAudioSource from "@spatialsys/web/rtc/audio/pcm-audio-source"
import { RTCAudioLoopback } from "@spatialsys/web/rtc/audio/rtc-audio-loopback"
import { SpatialMicrophone } from "@spatialsys/web/rtc/microphone/spatial-microphone"
import { MicDataCallback, MicStatusCallback } from "@spatialsys/web/rtc/microphone/spatial-microphone-stream"
import { CreateUnityVideoSourceProps, createUnityVideoSource } from "@spatialsys/web/rtc/video/unity-video-source"
import { Storage } from "@spatialsys/web/storage"

import { contentSaga } from "./content-saga"
import { predownloadUnityBuild, updateUnityProgress } from "./download-utils"
import { handleUnityMessage } from "./handle-unity-message"
import { SpatialUnityWindow } from "./spatial-unity-window"

declare const window: SpatialUnityWindow

const UnityDownload = new LogChannel("UnityDownload")

/**
 * The download and initialization sequence for the Spatial Web Unity client. Handles getting
 * various pieces of info about the build, e.g. code sizes, setting up global variables that
 * are read from our Unity JS plugins, such as microphone-related classes and the bridge message
 * handler, setting up conditional pre-downloading for the build, and calling the
 * `createUnityInstance` method that's exposed from the Unity-generated JS.
 */
export function* unityClientSaga(
  manifest: UnityManifest,
  canvas: HTMLCanvasElement,
  shouldStartTask: FixedTask<void>,
  loaderTask: FixedTask<UnityInstanceFactory>
) {
  if (Config.DEPLOYMENT_ENV !== "production") {
    window.UnityMessages = UnityMessages
  }

  //#region Set up the global variables needed by the Unity app code.

  // Unity calls this function through WebMicrophonePlugin.jslib.
  // Needs to be defined before we start unity
  window.spatialWebGLCreateMicrophone = (
    audioContext: AudioContext,
    statusCallback: MicStatusCallback,
    dataCallback: MicDataCallback,
    frameSize: number
  ) => {
    return new SpatialMicrophone(audioContext, statusCallback, dataCallback, frameSize)
  }

  // globalRTCAudioLoopback is used as a workaround for the chrome bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=687574#c56
  // so we only need to create it if on chrome (and only can work if are capable of creating webrtc connections with RTCPeerConnection)
  if (window.chrome && typeof RTCPeerConnection !== "undefined") {
    window.globalRTCAudioLoopback = new RTCAudioLoopback()
  } else {
    window.globalRTCAudioLoopback = null
  }

  window.spatialWebGLCreateAudioSource = (audioContext: AudioContext, channels: number, sampleRate: number) => {
    return new PCMAudioSource(audioContext, channels, sampleRate)
  }

  window.spatialWebGLCreateVideoSource = (props: CreateUnityVideoSourceProps) => {
    return createUnityVideoSource(props)
  }

  window.spatialWebGLStartSentryTransaction = (name: string) => {
    return Sentry.startTransaction({ name })
  }

  // Setup the receiving end of communication from Spatial Unity code.
  const messageChannel = createUnityMessageChannel()

  // #endregion
  const createUnityInstance = yield* join(loaderTask)

  const params: UnityInstanceParameters = {
    ...manifest,
    companyName: "Spatial Systems, Inc.",
    productName: "Spatial",
    devicePixelRatio: window.devicePixelRatio,
    print: (message: string) => {
      logger.debug(`Unity message: ${message}`)
    },
    printErr: (errOrMessage: string | Error) => {
      if (errOrMessage instanceof Error) {
        logger.error("Unity error:", errOrMessage)
      } else {
        logger.error(`Unity error: ${errOrMessage}`)
      }

      if (errOrMessage === "out of memory") {
        // This doesn't even make it into `errorHandler`, so just throw it here
        const err = new Error("SPATIAL_UNITY_OUT_OF_MEMORY")
        Sentry.captureException(err, {
          level: "fatal",
        })
        global_setHasFatalException()
      }
    },
    // TODO (DEV-9554): change this to false and remove workaround canvas resizing logic after upgraded to unity 2021.2+
    // https://issuetracker.unity3d.com/issues/uncommenting-config-dot-matchwebgltocanvassize-equals-false-in-index-dot-html-makes-ui-elements-ignore-mouse-input
    matchWebGLToCanvasSize: true,
    startupErrorHandler: createUnityExceptionReporter("SPATIAL_UNITY_FATAL_STARTUP_EXCEPTION"),
    errorHandler: createUnityExceptionReporter("SPATIAL_UNITY_FATAL_EXCEPTION"),
  }
  logger.debug(UnityDownload, "Unity instance parameters", params)

  // mark begin download
  const mark = "unity-download-and-boot"
  const startMark = `${mark}-start`
  performance.mark(startMark)
  performance.mark("DownloadUnity-start")

  yield* put(Actions.setUnityDownloadState(DownloadState.InProgress))

  // If we haven't received the signal to start yet, i.e. we're not going straight into
  // a space, then pre-download the unity build files
  const shouldPredownload = shouldStartTask.isRunning()
  if (shouldPredownload) {
    const mark = "pre-download-unity"
    const startMark = `${mark}-start`
    performance.mark(startMark)
    yield* call(predownloadUnityBuild, manifest)
    performance.measure(mark, startMark)
    yield* call(PerformanceMonitor.reportUnityDownloaded)
    performance.measure("DownloadUnity", "DownloadUnity-start")
    yield* put(Actions.setUnityDownloadState(DownloadState.Done))
    performance.mark("BootUnity-start")
  }

  // Set up a channel to receive progress events from the call to createUnityInstance.
  const unityProgressChannel = channel<number>()
  yield* fork(updateUnityProgress, unityProgressChannel, shouldPredownload)

  // Wait for the signal to start
  yield* join(shouldStartTask)

  // Call the unity loader, downloading and initializing the unity framework JS, C# wasm, and data.
  const unityInstance = yield* call(createUnityInstance, canvas, params, unityProgressChannel.put)
  performance.measure("BootUnity", "BootUnity-start")
  performance.measure(mark, startMark)

  yield* call(PerformanceMonitor.reportUnityStartedBoot)

  // Set up message sending to Spatial Unity code.
  const sendToUnity = (message: any) => {
    const payload = JSON.stringify(message)
    // The name of the Game Object and the method that will be called with the payload.
    unityInstance.SendMessage("UnityMessageManager", "onRNMessage", payload)
  }
  yield* call(UnityMessages.setMessageSender, sendToUnity)
  // Start processing messages
  yield* fork(takeEveryAndClose, messageChannel, handleUnityMessage)
  yield* fork(cacheMediaSettingsOnChange)
  yield* fork(contentSaga)
}

/**
 * Sets up the global function that the Spatial Unity app uses for sending messages,
 * sending them into an [`EventChannel`](https://redux-saga.js.org/docs/advanced/Channels/#using-the-eventchannel-factory-to-connect-to-external-events).
 */
function createUnityMessageChannel() {
  return eventChannel<string>((emitter) => {
    window.ReactUnityWebGL = {
      // This is the specific global variable that our Unity code invokes to send messages to JS.
      MessageToReact: (payload: string) => emitter(payload),
    }
    return () => {
      // If this channel is ever closed for some reason, set up the global listener to warn us.
      window.ReactUnityWebGL.MessageToReact = (payload: string) => {
        let msg: any
        try {
          msg = JSON.parse(payload)
        } catch {
          // Swallow any parsing errors
        }
        logger.error("Message sent from Unity after the channel was closed.", msg)
      }
    }
  }, buffers.expanding())
}

function* cacheMediaSettingsOnChange() {
  while (true) {
    const [mediaSettings] = yield* waitUntilChanged(Selectors.getMediaSettings)
    Storage.setItem(Storage.SPATIAL_MEDIA_SETTINGS, JSON.stringify(mediaSettings))
  }
}

/**
 * Factory for making an error handler function.
 * @param errMessage the message for the `Error` that will be created
 * @returns a function to be used to handle error strings coming out of the Unity client.
 */
function createUnityExceptionReporter(errMessage: string) {
  return function unityExceptionReporter(stacktrace: string) {
    // If Sentry already recorded the exception/event already, don't make another.
    if (!Sentry.lastEventId()) {
      const error = new Error(errMessage)
      error.stack = stacktrace
      Sentry.captureException(error, {
        level: "fatal",
      })
    }
    global_setHasFatalException()
    return true
  }
}
