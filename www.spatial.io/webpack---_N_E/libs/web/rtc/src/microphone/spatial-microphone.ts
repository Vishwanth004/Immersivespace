import { Event } from "ts-typed-events"

import { MicStatus } from "@spatialsys/unity/app-state"
import { LogChannel, logger } from "@spatialsys/web/logger"

import recorderWorkletURL from "./microphone-recorder.worklet"
import { MicDataCallback, MicStatusCallback, SpatialMicrophoneStream } from "./spatial-microphone-stream"

const MicrophoneLogChannel = new LogChannel("Microphone")

export class SpatialMicrophone {
  private _audioContext: AudioContext
  private _statusCallback: MicStatusCallback
  private _deviceID: string = null
  private _currentStream: SpatialMicrophoneStream = null
  private _shouldBeRecording: boolean
  private _sourceNode: MediaStreamAudioSourceNode
  private _gainNode: GainNode
  private _workletNode: AudioWorkletNode
  private _processorNode: ScriptProcessorNode
  private _isReading = false

  public static onMicrophoneInitialized = new Event<void>()

  private static _instance: SpatialMicrophone

  static get instance(): SpatialMicrophone {
    return SpatialMicrophone._instance
  }

  get audioContext(): AudioContext {
    return this._audioContext
  }

  get outputNode(): AudioNode {
    return this._gainNode
  }

  public constructor(
    audioContext: AudioContext,
    statusCallback: MicStatusCallback,
    dataReadback: MicDataCallback,
    frameSize: number
  ) {
    SpatialMicrophone._instance = this

    this._audioContext = audioContext
    this._statusCallback = statusCallback
    this._gainNode = this._audioContext.createGain()

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    navigator.mediaDevices.addEventListener("devicechange", this.handleMediaDevicesChanged)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.setupPermissionsHandler()

    // the data readback will always run
    // whatever the current stream is will create a new source node that will push data into chain that will use the callback
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.startDataReadback(frameSize, dataReadback)

    SpatialMicrophone.onMicrophoneInitialized.emit()
  }

  public dispose() {
    if (SpatialMicrophone._instance === this) {
      SpatialMicrophone._instance = null
    }

    this.stop()
    this.stopDataReadback()

    if (this._gainNode) {
      this._gainNode.disconnect()
      this._gainNode = null
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    navigator.mediaDevices.removeEventListener("devicechange", this.handleMediaDevicesChanged)
  }

  public start() {
    this.startWithDevice(this._deviceID)
  }

  public stop() {
    this._shouldBeRecording = false
    this._currentStream?.stop()

    if (this._sourceNode) {
      this._sourceNode.disconnect()
      this._sourceNode = null
    }
  }

  public pause() {
    this._currentStream?.pause()
  }

  public resume() {
    this._currentStream?.resume()
  }

  public setDeviceID(deviceID: string) {
    logger.debug(MicrophoneLogChannel, "setting microphone deviceID", { LogData: { deviceID } })

    if (deviceID !== this._deviceID) {
      this._deviceID = deviceID
      if (this._shouldBeRecording) {
        this.start()
      }
    }
  }

  public setGain(gain: number) {
    this._gainNode.gain.setValueAtTime(gain, this._audioContext.currentTime)
  }

  private startWithDevice(deviceID: string) {
    this.stop()
    this._shouldBeRecording = true

    logger.debug(MicrophoneLogChannel, "starting microphone stream", { LogData: { deviceID } })

    const stream = new SpatialMicrophoneStream(deviceID, (micStatus: MicStatus, errorMessage: string) => {
      this.handleMicStatusChanged(stream, micStatus, errorMessage)
    })

    this._currentStream = stream
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._currentStream.start().then((success) => {
      this.handleMicrophoneStreamStarted(stream, success)
    })
  }

  private handleMicStatusChanged(micStream: SpatialMicrophoneStream, micStatus: MicStatus, errorMessage: string) {
    if (micStream !== this._currentStream) {
      return
    }

    this._statusCallback(micStatus, errorMessage)

    // if the microphone ended unexpectedly (for example permissions were reset or blocked)
    // if permissions were reset, will re-prompt for them. if blocked, it will come back here with error
    // only check if === Off so it's not stuck in feedback loop if it's an error
    if (micStatus === MicStatus.Off && this._shouldBeRecording) {
      logger.info(MicrophoneLogChannel, "microphone has stopped when it should be recording", {
        LogData: this.debugInfo(),
      })
      this.start()
    }
  }

  private handleMicrophoneStreamStarted(micStream: SpatialMicrophoneStream, success: boolean) {
    const isCurrentStream = micStream === this._currentStream
    logger.debug(MicrophoneLogChannel, "handle microphone stream started", { LogData: { success, isCurrentStream } })

    if (success && isCurrentStream) {
      this._sourceNode?.disconnect()
      this._sourceNode = this._audioContext.createMediaStreamSource(micStream.mediaStream)
      this._sourceNode.connect(this._gainNode)
    }
  }

  private handleMediaDevicesChanged = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      if (!devices) return

      let hasCurrentDevice = false
      let fallbackDeviceID = null
      let currentGroupID = null
      for (let i = 0; i < devices.length; ++i) {
        if (devices[i].kind === "audioinput") {
          // check if have current device, or assign a fallback device that we can switch to
          if (devices[i].deviceId === this._deviceID) {
            hasCurrentDevice = true
            currentGroupID = devices[i].groupId
          } else if (!hasCurrentDevice && (fallbackDeviceID === null || devices[i].deviceId === "default")) {
            fallbackDeviceID = devices[i].deviceId
          }
        }
      }

      if (hasCurrentDevice) {
        // the deviceID is the same, but groupID has changed
        // we should restart the microphone
        // this can happen if default device is chosen and the system input device has changed
        // also, if we are temporarily on a fallback device and can now switch back to the original device
        if (
          this._currentStream?.groupID !== currentGroupID ||
          this._currentStream?.deviceID !== this._deviceID ||
          this._currentStream?.status !== MicStatus.On
        ) {
          if (this._shouldBeRecording) {
            const logData = this.debugInfo()
            logData["currentGroupID"] = currentGroupID
            logger.info(MicrophoneLogChannel, "restarting microphone stream after device list has changed", {
              LogData: logData,
            })
            this.start()
          }
        }
      } else {
        // if the current selected deviceID no longer exists
        // fallback to another
        // if the selected device is reconnected, this callback will happen again and it should switch back with above logic
        if (fallbackDeviceID && this._shouldBeRecording) {
          const logData = this.debugInfo()
          logData["fallbackDeviceID"] = fallbackDeviceID
          logger.info(MicrophoneLogChannel, "starting microphone stream with a fallback device", {
            LogData: logData,
          })
          this.startWithDevice(fallbackDeviceID)
        }
      }
    } catch (error) {
      logger.error(MicrophoneLogChannel, "failed with handling devices changed", error)
    }
  }

  private async setupPermissionsHandler() {
    if (navigator.permissions) {
      try {
        // https://github.com/microsoft/TypeScript/issues/33923#issuecomment-743062954
        const permissionName = "microphone" as PermissionName
        const permissionStatus = await navigator.permissions.query({ name: permissionName })
        permissionStatus.onchange = () => {
          logger.debug(MicrophoneLogChannel, "microphone permission status has changed", {
            LogData: { status: permissionStatus.state },
          })
          // if the permission has been granted
          // and should be currently recording
          // and not in the middle of opening a stream (which could be the reason the permission was prompted and now granted)
          if (
            permissionStatus.state === "granted" &&
            this._shouldBeRecording &&
            !this._currentStream?.isCreatingStream
          ) {
            logger.info(MicrophoneLogChannel, "restarting microphone stream due to permission being granted")
            this.start()
          }
        }
      } catch (_) {
        // this exception is expected to happen if the browser doesn't support using "microphone" in the permission api
      }
    }
  }

  private setupAudioWorklet(frameSize: number, dataCallback: MicDataCallback) {
    this._workletNode = new AudioWorkletNode(this._audioContext, "recorder-worklet")
    this._workletNode.port.postMessage({
      bufferLength: frameSize,
    })

    this._workletNode.port.onmessage = function (event) {
      dataCallback(event.data)
    }

    this._gainNode.connect(this._workletNode)
    this._workletNode.connect(this._audioContext.destination)
  }

  private setupScriptProcessor(frameSize: number, dataCallback: MicDataCallback) {
    this._processorNode = this._audioContext.createScriptProcessor(frameSize, 1, 1)

    this._processorNode.onaudioprocess = function (event) {
      dataCallback(event.inputBuffer.getChannelData(0))
    }

    this._gainNode.connect(this._processorNode)
    this._processorNode.connect(this._audioContext.destination)
  }

  private async startDataReadback(frameSize: number, dataCallback: MicDataCallback) {
    if (this._isReading) {
      logger.error(MicrophoneLogChannel, "tried starting data readback when it was already reading")
      return
    }

    this._isReading = true

    // check if AudioWorklet is supported by browser
    if (typeof this._audioContext.audioWorklet?.addModule === "function") {
      try {
        this.setupAudioWorklet(frameSize, dataCallback)
      } catch (error) {
        // creating audio worklet node will fail if the module hasn't been added yet
        // add it, then try again
        try {
          await this._audioContext.audioWorklet.addModule(recorderWorkletURL)
          this.setupAudioWorklet(frameSize, dataCallback)
        } catch (error) {
          logger.warn(MicrophoneLogChannel, "creating audio worklet for readback has failed", error)
          // if creating the audio worklet still fails, fall back to script processor
          this.setupScriptProcessor(frameSize, dataCallback)
        }
      }
    } else {
      this.setupScriptProcessor(frameSize, dataCallback)
    }
  }

  private stopDataReadback() {
    if (this._workletNode) {
      this._gainNode.disconnect(this._workletNode)
      this._workletNode.disconnect()
      this._workletNode = null
    }

    if (this._processorNode) {
      this._gainNode.disconnect(this._processorNode)
      this._processorNode.disconnect()
      this._processorNode = null
    }

    this._isReading = false
  }

  public debugInfo() {
    return {
      deviceID: this._deviceID,
      shouldBeRecording: this._shouldBeRecording,
      isReading: this._isReading,
      sourceNode: this._sourceNode
        ? {
            channelCount: this._sourceNode.channelCount,
            channelCountMode: this._sourceNode.channelCountMode,
            channelCountInterpretation: this._sourceNode.channelInterpretation,
            numberOfInputs: this._sourceNode.numberOfInputs,
            numberOfOutputs: this._sourceNode.numberOfOutputs,
          }
        : null,
      workletNode: this._workletNode
        ? {
            parameters: this._workletNode.parameters,
            channelCount: this._workletNode.channelCount,
            channelCountMode: this._workletNode.channelCountMode,
            channelCountInterpretation: this._workletNode.channelInterpretation,
            numberOfInputs: this._workletNode.numberOfInputs,
            numberOfOutputs: this._workletNode.numberOfOutputs,
          }
        : null,
      processorNode: this._processorNode
        ? {
            bufferSize: this._processorNode.bufferSize,
            channelCount: this._processorNode.channelCount,
            channelCountMode: this._processorNode.channelCountMode,
            channelCountInterpretation: this._processorNode.channelInterpretation,
            numberOfInputs: this._processorNode.numberOfInputs,
            numberOfOutputs: this._processorNode.numberOfOutputs,
          }
        : null,
      micStream: this._currentStream?.debugInfo(),
    }
  }
}
