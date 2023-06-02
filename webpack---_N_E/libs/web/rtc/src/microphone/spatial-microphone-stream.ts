import { MicStatus } from "@spatialsys/unity/app-state"

export type MicStatusCallback = (micStatus: MicStatus, errorMessage: string) => void
export type MicDataCallback = (buffer: Float32Array) => void

export class SpatialMicrophoneStream {
  private _deviceID: string
  private _groupID: string
  private _mediaStream: MediaStream
  private _isCreatingStream = false
  private _isCanceled = false
  private _shouldBeRecording = false
  private _status: MicStatus
  private _statusCallback: MicStatusCallback

  get deviceID(): string {
    return this._deviceID
  }

  get groupID(): string {
    return this._groupID
  }

  get mediaStream(): MediaStream {
    return this._mediaStream
  }

  get isCreatingStream(): boolean {
    return this._isCreatingStream
  }

  get status(): MicStatus {
    return this._status
  }

  public constructor(deviceID: string, statusCallback: MicStatusCallback) {
    this._deviceID = deviceID
    this._statusCallback = (micStatus: MicStatus, errorMessage: string) => {
      this._status = micStatus
      statusCallback(micStatus, errorMessage)
    }
  }

  private createStream(): Promise<MediaStream> {
    const audioConfig = {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      googEchoCancellation: true,
      googNoiseSuppression: true,
      googAutoGainControl: true,
      deviceId: this._deviceID ? this._deviceID : undefined,
    }

    return navigator.mediaDevices.getUserMedia({ audio: audioConfig, video: false })
  }

  private handleStartSuccess() {
    this._statusCallback(MicStatus.On, null)

    this._mediaStream.onremovetrack = () => {
      // this theoretically should never happen as we do not remove the track
      // if this error shows up in logs, needs more investigation
      this._statusCallback(MicStatus.Off, "microphone track has been removed unexpectedly")
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack#events
    this._mediaStream.getTracks().forEach((t) => {
      t.onended = () => {
        // this can happen if permission has been revoked after already opened
        this._statusCallback(MicStatus.Off, null)
      }

      t.onmute = () => {
        if (this._shouldBeRecording) {
          // this shouldn't happen for a local recording track without explicitly muting it
          // if this error shows up in logs, needs more investigation
          this._statusCallback(MicStatus.Muted, "microphone has been muted unexpectedly")
        } else {
          this._statusCallback(MicStatus.Off, null)
        }
      }

      t.onunmute = () => {
        this._statusCallback(MicStatus.On, null)
      }

      this._groupID = t.getSettings()?.groupId
    })

    // if shouldBeRecording was set to false before successfully opening the stream, pause it
    if (!this._shouldBeRecording) {
      this.pause()
    }
  }

  private handleStartFailed(error) {
    let status = MicStatus.Unknown

    // map error name to MicStatus, if exists
    if (error.name in MicStatus) {
      const statusKey = error.name as keyof typeof MicStatus
      status = MicStatus[statusKey]
    }

    this._statusCallback(status, error.message)
  }

  public async start(): Promise<boolean> {
    this._isCreatingStream = true
    this._shouldBeRecording = true

    this._statusCallback(MicStatus.RequestingPermissions, null)

    try {
      const mediaStream = await this.createStream()
      this._mediaStream = mediaStream
      if (this._isCanceled) return
      this.handleStartSuccess()
      return true
    } catch (error) {
      if (this._isCanceled) return
      this.handleStartFailed(error)
      return false
    } finally {
      this._isCreatingStream = false
      if (this._isCanceled) this.stop()
    }
  }

  public stop() {
    this._shouldBeRecording = false

    if (this._isCreatingStream) {
      this._isCanceled = true
      return
    }

    if (this._mediaStream) {
      this._mediaStream.getTracks().forEach((track) => {
        track.stop()
      })
      this._mediaStream = null
    }

    this._statusCallback(MicStatus.Off, null)
  }

  public pause() {
    this._shouldBeRecording = false

    let succeeded = false
    if (this._mediaStream) {
      this._mediaStream.getTracks().forEach((t) => {
        t.enabled = false
        succeeded = true
      })
    }

    if (succeeded) {
      this._statusCallback(MicStatus.Off, null)
    }
  }

  public resume() {
    this._shouldBeRecording = true

    let succeeded = false
    if (this._mediaStream) {
      this._mediaStream.getTracks().forEach((t) => {
        if (t.readyState === "live") {
          t.enabled = true
          succeeded = true // succeeded if there are any tracks to resume
        }
      })
    }

    if (succeeded) {
      this._statusCallback(MicStatus.On, null)
      return true
    }

    return false
  }

  public debugInfo() {
    return {
      deviceID: this._deviceID,
      groupID: this._groupID,
      status: this._status,
      isCreatingStream: this._isCreatingStream,
      isCanceled: this._isCanceled,
      shouldBeRecording: this._shouldBeRecording,
      mediaStream: this._mediaStream
        ? {
            active: this._mediaStream.active,
            id: this._mediaStream.id,
          }
        : null,
    }
  }
}
