import LiveSwitch from "fm.liveswitch"

import { LiveswitchConfig } from "@spatialsys/js/sapi/types"
import { RTCConnectionStatus } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { registerRTCQuality, trackRTCRemoteVideoJoin, trackRTCRemoteVideoLeave } from "@spatialsys/web/analytics"

import { SpatialMicrophone } from "./microphone/spatial-microphone"
import {
  RTCLocalClient,
  RTCMediaCapture,
  RtcState,
  RtcStateUpdater,
  ScreenShareSetting,
  WebcamStatus,
} from "./rtc-state"
import { RtcWindow } from "./rtc-window"
import { prepareRTCClientIfNeeded } from "./rtc/rtc-loader"
import RTCMedia from "./rtc/rtc-media"
import RTCMediaFunctions from "./rtc/rtc-media-functions"
import RTCRemoteMCUMedia from "./rtc/rtc-remote-mcu-media"

declare let window: RtcWindow

export class RoomRTCManager {
  RTCLocalClient: RTCLocalClient
  RTCMediaCapture: RTCMediaCapture
  isLoading = true
  private _shouldConnectToVoice = false
  private _shouldTransmitVoice = false
  private _voiceClientsListeningTo: string[]
  private _webcamCaptureId: string
  private _screenshareCaptureId: string
  private onLocalCapture: () => void
  private onLocalRejected: () => void
  private onLocalReleased: () => void
  private onRemoteClaimed: () => void
  private onRemoteReleased: () => void
  private onClientInitialized: () => void
  private onMCULayoutChanged: () => void
  private onChannelConnectionStatusChanged: () => void

  private constructor(
    private state: RtcState,
    private readonly updateState: RtcStateUpdater,
    private readonly userId: string,
    private readonly maxWebcamFps: number | null
  ) {
    this.maxWebcamFps = maxWebcamFps
    this.onLocalCapture = this.localMediaCaptured.bind(this)
    this.onLocalRejected = this.localMediaRejected.bind(this)
    this.onLocalReleased = this.localMediaReleased.bind(this)
    this.onRemoteClaimed = this.remoteClientClaimedChannel.bind(this)
    this.onRemoteReleased = RoomRTCManager.remoteClientReleasedChannel.bind(this)
    this.onClientInitialized = this.clientInitialized.bind(this)
    this.onMCULayoutChanged = this.mcuLayoutChanged.bind(this)
    this.onChannelConnectionStatusChanged = RoomRTCManager.channelConnectionStatusChanged.bind(this)
  }

  static async load(
    state: RtcState,
    updateState: RtcStateUpdater,
    maxWebcamFps: number | null,
    userId: string,
    liveswitchConfig: LiveswitchConfig
  ) {
    const rtcManager = new RoomRTCManager(state, updateState, userId, maxWebcamFps)
    const { rtcLocalClient, rtcMediaCapture } = await prepareRTCClientIfNeeded(
      userId,
      liveswitchConfig.url,
      liveswitchConfig.appID
    )
    rtcManager.RTCLocalClient = rtcLocalClient
    rtcManager.RTCMediaCapture = rtcMediaCapture
    rtcManager.isLoading = false
    window.spatialWebGLGetMediaStream = (clientID, mediaID) => {
      if (rtcLocalClient.GetID() === clientID) {
        const localMedia = rtcLocalClient.GetLocalMedia(mediaID)
        if (!localMedia) {
          return null
        }

        return localMedia.GetNativeMedia()
      }

      const remoteClient = rtcManager.RTCLocalClient.GetRemoteClient(clientID)
      if (!remoteClient) {
        return null
      }

      const remoteMedia = remoteClient.GetRemoteMedia(mediaID)
      if (!remoteMedia) {
        return null
      }

      return remoteMedia.GetNativeMedia()
    }
    window.spatialWebGLSetMediaVolume = (clientID, mediaID, volume) => {
      const remoteClient = rtcManager.RTCLocalClient.GetRemoteClient(clientID)
      if (!remoteClient) {
        return null
      }

      const remoteMedia = remoteClient.GetRemoteMedia(mediaID)
      if (!remoteMedia) {
        return null
      }

      remoteMedia.SetVolume(volume)
    }
    return rtcManager
  }

  setState(newState: RtcState) {
    this.state = newState
  }

  registerRemoteRTC() {
    this.RTCLocalClient.channelConnectionStatusChanged.on(this.onChannelConnectionStatusChanged)
    this.RTCLocalClient.remoteClientClaimedChannel.on(this.onRemoteClaimed)
    this.RTCLocalClient.remoteClientReleasedChannel.on(this.onRemoteReleased)
    this.RTCLocalClient.clientInitialized.on(this.onClientInitialized)
    this.RTCLocalClient.mcuLayoutChanged.on(this.onMCULayoutChanged)
  }

  registerLocalRTC() {
    this.RTCMediaCapture.localMediaCaptured.on(this.onLocalCapture)
    this.RTCMediaCapture.localMediaCaptureRejected.on(this.onLocalRejected)
    this.RTCMediaCapture.localMediaReleased.on(this.onLocalReleased)

    SpatialMicrophone.onMicrophoneInitialized.on(this.handleMicrophoneInitialized)

    this.updateState((draft) => {
      draft.readyForCapture = true
    })
  }

  unregisterRTC() {
    Object.keys(this.RTCLocalClient.GetAllLocalMedia()).forEach((mediaId) => this.RTCMediaCapture.Release(mediaId))

    this.RTCMediaCapture.localMediaCaptured.off(this.onLocalCapture)
    this.RTCMediaCapture.localMediaCaptureRejected.off(this.onLocalRejected)
    this.RTCMediaCapture.localMediaReleased.off(this.onLocalReleased)
    this.RTCLocalClient.remoteClientClaimedChannel.off(this.onRemoteClaimed)
    this.RTCLocalClient.remoteClientReleasedChannel.off(this.onRemoteReleased)
    this.RTCLocalClient.clientInitialized.off(this.onClientInitialized)
    this.RTCLocalClient.mcuLayoutChanged.off(this.onMCULayoutChanged)
    this.RTCMediaCapture.CancelCapturesInProgress()

    SpatialMicrophone.onMicrophoneInitialized.off(this.handleMicrophoneInitialized)

    this.updateState((draft) => {
      draft.readyForCapture = false
    })
  }

  releaseChannel() {
    this.RTCLocalClient.ReleaseChannel()
  }

  claimChannel(channelId: string, liveSwitchToken?: string) {
    UnityMessages.setRtcClientId(this.RTCLocalClient.GetID())
    this.RTCLocalClient.ClaimChannel(channelId, liveSwitchToken)
  }

  setShouldConnectToVoice(shouldConnect: boolean, voiceClients: string[]) {
    if (shouldConnect !== this._shouldConnectToVoice) {
      this._shouldConnectToVoice = shouldConnect

      if (shouldConnect) {
        if (SpatialMicrophone.instance) {
          this.createMicrophoneLocalMedia()
        }
      } else {
        if (this.state.localVoiceMediaID) {
          this.RTCMediaCapture.Release(this.state.localVoiceMediaID)
        }
      }
    }

    this._voiceClientsListeningTo = voiceClients
    Object.values(this.RTCLocalClient.GetAllRemoteClients()).forEach((remoteClient) => {
      Object.values(remoteClient.GetAllRemoteMedias()).forEach((media) => {
        const isVoice = media.mediaType === "Voice"
        if (isVoice) {
          if (this._shouldConnectToVoice && voiceClients.includes(remoteClient.GetID())) {
            media.ClaimSfuConnectionIfUnclaimed()
          } else {
            media.ReleaseSfuConnectionIfClaimed()
          }
        }
      })
    })
  }

  createMicrophoneLocalMedia() {
    const microphone = SpatialMicrophone.instance
    const destinationNode = microphone.audioContext.createMediaStreamDestination()

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.RTCMediaCapture.CaptureMicrophone(destinationNode.stream).then<LiveSwitch.LocalMedia>((liveswitchMedia) => {
      const mediaID = liveswitchMedia.getId()
      if (this._shouldConnectToVoice) {
        const localMedia = this.RTCLocalClient.GetLocalMedia(mediaID)
        localMedia.SetupTransmissionNodes(microphone.audioContext, microphone.outputNode, destinationNode)
      } else {
        this.RTCMediaCapture.Release(mediaID)
      }
    })
  }

  handleMicrophoneInitialized = () => {
    if (this._shouldConnectToVoice) {
      this.createMicrophoneLocalMedia()
    }
  }

  setShouldTransmitVoice(shouldTransmit: boolean) {
    if (shouldTransmit !== this._shouldTransmitVoice) {
      this._shouldTransmitVoice = shouldTransmit

      Object.values(this.RTCLocalClient.GetAllLocalMedia()).forEach((media) => {
        const isVoice = media.mediaType === "Voice"
        if (isVoice) {
          media.SetShouldTransmit(shouldTransmit)
        }
      })
    }
  }

  localMediaCaptured(resp: { mediaType: RTCMedia["mediaType"]; mediaID: string }) {
    const localMedia = this.RTCLocalClient.GetLocalMedia(resp.mediaID)

    UnityMessages.localMediaCaptured(resp.mediaID, resp.mediaType)

    this.updateState((draft) => {
      draft.localMedias[resp.mediaID] = {
        userID: this.userId,
        location: "local",
        status: "connecting",
        audioRemoteIP: null,
        videoRemoteIP: null,
        raw: localMedia,
      }
      switch (localMedia.mediaType) {
        case "Voice":
          draft.localVoiceMediaID = resp.mediaID
          break

        case "Webcam":
          draft.localWebcamMediaID = resp.mediaID
          draft.webcamStatus = WebcamStatus.On
          break

        case "Screen":
          draft.localScreenshareMediaID = resp.mediaID
          draft.screenSharing = true
          break

        default:
          break
      }
    })

    localMedia.sfuConnectionStatusChanged.on((connectionStatus) => {
      UnityMessages.localMediaConnectionStatusChanged(resp.mediaID, connectionStatus)
      switch (connectionStatus) {
        case RTCConnectionStatus.Connected: {
          localMedia.RefreshStats()
          this.updateState((draft) => {
            draft.localMedias[resp.mediaID].status = "connected"
          })
          break
        }

        case RTCConnectionStatus.Disconnected: {
          this.updateState((draft) => {
            draft.localMedias[resp.mediaID].status = "connecting"
          })
          break
        }

        default:
          break
      }
    })

    localMedia.refreshedStats.on(() => {
      this.updateState((draft) => {
        draft.localMedias[resp.mediaID].audioRemoteIP = localMedia.GetStats().GetAudioStats().remoteIP
        draft.localMedias[resp.mediaID].videoRemoteIP = localMedia.GetStats().GetVideoStats().remoteIP
      })
    })

    if (resp.mediaType === "Voice") {
      if (this._shouldConnectToVoice) {
        localMedia.ClaimSfuConnection()
        localMedia.SetShouldTransmit(this._shouldTransmitVoice)
      }
    } else {
      localMedia.ClaimSfuConnection()
    }

    UnityMessages.localMediaClaimedConnection(resp.mediaID)
  }

  localMediaRejected(resp: { mediaType: RTCMedia["mediaType"]; error: LiveSwitch.Exception }) {
    if (resp.mediaType === "Webcam") {
      this.updateState((draft) => {
        if (resp.error.name === "NotAllowedError") {
          draft.webcamStatus = WebcamStatus.PermissionsDenied
        } else {
          draft.webcamStatus = WebcamStatus.Unavailable
        }
      })
    } else if (resp.mediaType === "Screen") {
      this.updateState((draft) => {
        draft.screenSharing = false
      })
    }
  }

  localMediaReleased(mediaId: string) {
    UnityMessages.localMediaReleased(mediaId)

    if (mediaId === this.state.localWebcamMediaID) {
      this.updateState((draft) => {
        draft.webcamStatus = WebcamStatus.Off
        draft.localWebcamMediaID = null
      })
    } else if (mediaId === this.state.localScreenshareMediaID) {
      this.updateState((draft) => {
        draft.screenSharing = false
        draft.localScreenshareMediaID = null
      })
    } else if (mediaId === this.state.localVoiceMediaID) {
      this.updateState((draft) => {
        draft.localVoiceMediaID = null
      })
    }

    this.updateState((draft) => {
      draft.localMedias[mediaId] = null
    })
  }

  static channelConnectionStatusChanged(connectionStatus) {
    UnityMessages.channelConnectionStatusChanged(connectionStatus)
  }

  clientInitialized() {
    UnityMessages.setRtcClientId(this.RTCLocalClient.GetID())
  }

  remoteClientClaimedChannel(clientID) {
    const remoteClient = this.RTCLocalClient.GetRemoteClient(clientID)

    UnityMessages.remoteClientClaimedChannel(clientID, remoteClient.GetUserID())

    remoteClient.connectedToChannel.on(() => {
      UnityMessages.remoteClientConnectedToChannel(clientID)
    })

    remoteClient.disconnectedFromChannel.on(() => {
      UnityMessages.remoteClientDisconnectedFromChannel(clientID)
    })

    remoteClient.capturedMedia.on((mediaID) => {
      return this.remoteMediaCaptured(clientID, mediaID)
    })
    remoteClient.releasedMedia.on((mediaID) => this.remoteMediaReleased(clientID, mediaID))
  }

  static remoteClientReleasedChannel(clientID) {
    UnityMessages.remoteClientReleasedChannel(clientID)
    // if we release the mcu, make sure to let unity know to clear out set mcu layout
    if (clientID === "mcu") {
      UnityMessages.clearMCULayoutFrame()
    }
  }

  /**
   * Called for mcu layout has changed
   * happens when webcam feeds are added or removed from the MCU
   * gets the layout so can determine where individual video feeds are located inside the mcu feed
   */
  mcuLayoutChanged(videoLayout: LiveSwitch.VideoLayout) {
    const mcuWidth = videoLayout.getWidth()
    const mcuHeight = videoLayout.getHeight()
    UnityMessages.remoteMediaLayoutChanged("mcu", "mcu", mcuWidth, mcuHeight)
    UnityMessages.clearMCULayoutFrame()

    Object.values(videoLayout.getRegions()).forEach((region) => {
      const connectionID = region.getConnectionId()
      const clientID = region.getClientId()
      const frame = region.getFrame()
      const bounds = region.getBounds()

      // pixel x & coordinates and pixel width & height of the webcam in the mcu
      const x = frame.getX() + bounds.getX()
      const y = frame.getY() + bounds.getY()
      const width = bounds.getWidth()
      const height = bounds.getHeight()

      // send message to unity for rendering video bubbles
      UnityMessages.setMCULayoutFrame(clientID, x, y, width, height)

      const widthRatio = width / mcuWidth
      const heightRatio = height / mcuHeight

      const connectionInfo = this.RTCLocalClient.GetMcuChannel().getRemoteConnectionInfo(connectionID)
      const mediaID = connectionInfo?.getMediaId()
      if (mediaID) {
        const fullMediaID = `${clientID}:${mediaID}`
        // updates state for rendering in participant bar
        this.updateState((draft) => {
          const remoteMedia = draft.remoteMedias[fullMediaID]
          if (remoteMedia) {
            remoteMedia.mcuRegion = {
              x,
              y,
              width,
              height,
              widthRatio,
              heightRatio,
            }
          }
        })
      }
    })
  }

  remoteMediaCaptured(clientId: string, { mediaID, mediaType }) {
    const fullMediaID = `${clientId}:${mediaID}`
    const remoteClient = this.RTCLocalClient.GetRemoteClient(clientId)
    const userID = remoteClient.GetUserID()

    const remoteMedia = remoteClient.GetRemoteMedia(mediaID)

    if (remoteMedia.mediaType === "Voice") {
      UnityMessages.remoteVoiceStreamCaptured(clientId, mediaID)
    } else {
      UnityMessages.remoteMediaCaptured(
        clientId,
        mediaID,
        remoteMedia.mediaType,
        mediaID === "mcu" ? "MCU" : "SFU",
        remoteMedia.frameRate
      )
    }

    this.updateState((draft) => {
      draft.remoteMedias[fullMediaID] = {
        userID,
        location: "remote",
        clientId,
        status: "connecting",
        videoRemoteIP: null,
        audioRemoteIP: null,
        raw: remoteMedia,
        mcuRegion: null,
        useMCU: false,
      }
    })

    remoteMedia.sfuConnectionStatusChanged.on((connectionStatus) => {
      UnityMessages.remoteMediaStatusChanged(clientId, mediaID, connectionStatus)
      switch (connectionStatus) {
        case RTCConnectionStatus.Connected: {
          remoteMedia.RefreshStats()

          this.updateState((draft) => {
            draft.remoteMedias[fullMediaID].status = "connected"
          })

          // if this media is part of the mcu, set it to not use mcu, as we currently directly connected to sfu
          if (remoteMedia instanceof RTCRemoteMCUMedia) {
            this.updateState((draft) => {
              draft.remoteMedias[fullMediaID].useMCU = false
            })
          }

          break
        }

        case RTCConnectionStatus.Disconnected: {
          this.updateState((draft) => {
            const remoteMediaState = draft.remoteMedias[fullMediaID]

            // Keep connecting-hidden status if present to allow hiding connecting UI if disconnect happens because of remote
            if (remoteMediaState.status === "connecting-hidden") {
              return
            }
            remoteMediaState.status = "connecting"
          })

          //  if this media is part of the mcu, set it back to using mcu media as it's direct sfu connection has disconnected
          if (remoteMedia instanceof RTCRemoteMCUMedia) {
            this.updateState((draft) => {
              draft.remoteMedias[fullMediaID].useMCU = true
            })
          }
          break
        }

        default:
          break
      }
    })

    remoteMedia.sfuAvalailabilityChanged.on((sfuAvailable) => {
      // Hide spectator reconnecting UI, because Spectator currently does not disconnect gracefully.
      if (!sfuAvailable && RTCMediaFunctions.mediaIsSpectator(remoteMedia.mediaType)) {
        this.updateState((draft) => {
          draft.remoteMedias[fullMediaID].status = "connecting-hidden"
        })
      }
    })

    remoteMedia.refreshedStats.on(() => {
      this.updateState((draft) => {
        draft.remoteMedias[fullMediaID].audioRemoteIP = remoteMedia.GetStats().GetAudioStats().remoteIP
        draft.remoteMedias[fullMediaID].videoRemoteIP = remoteMedia.GetStats().GetVideoStats().remoteIP
      })
    })

    if (mediaType === "Voice") {
      if (this._shouldConnectToVoice && this._voiceClientsListeningTo.includes(remoteClient.GetID())) {
        remoteMedia.ClaimSfuConnection()
      }
    } else if (remoteMedia instanceof RTCRemoteMCUMedia) {
      this.updateState((draft) => {
        draft.remoteMedias[fullMediaID].useMCU = true
      })

      // if currently focused and this media is part of the mcu, connect directly with sfu connection
      // otherwise it will continue to use mcu media
      if (this.state.currentStreamId === fullMediaID) {
        remoteMedia.ClaimSfuConnection()
      }
    } else {
      remoteMedia.ClaimSfuConnection()
    }

    trackRTCRemoteVideoJoin(mediaType)
  }

  remoteMediaReleased(clientId, mediaId) {
    const fullMediaID = `${clientId}:${mediaId}`
    if (this.state.remoteMedias[fullMediaID]) {
      const { mediaType } = this.state.remoteMedias[fullMediaID].raw
      trackRTCRemoteVideoLeave(mediaType)

      if (mediaType === "Voice") {
        UnityMessages.remoteVoiceStreamReleased(clientId)
      } else {
        UnityMessages.remoteMediaReleased(clientId, mediaId)
      }
    }

    this.updateState((draft) => {
      delete draft.remoteMedias[fullMediaID]
    })

    if (this.state.currentStreamId === fullMediaID) {
      this.resetMediaPlayerStream()
    }
  }

  resetMediaPlayerStream() {
    this.disconnectFromSfuIfMcuConnection(this.state.currentStreamId)
    this.updateState((draft) => {
      draft.currentStreamId = null
    })
  }

  releaseWebcamMedia() {
    const mediaID = this.state.localWebcamMediaID
    if (mediaID) {
      this.RTCMediaCapture.Release(mediaID)
    }

    if (this._webcamCaptureId) {
      this.RTCMediaCapture.CancelCapture(this._webcamCaptureId)
    }

    if (this.state.currentStreamId === mediaID) {
      this.resetMediaPlayerStream()
    }
  }

  releaseScreenshareMedia() {
    const mediaID = this.state.localScreenshareMediaID
    if (mediaID) {
      this.RTCMediaCapture.Release(mediaID)
    }

    if (this._screenshareCaptureId) {
      this.RTCMediaCapture.CancelCapture(this._screenshareCaptureId)
    }

    if (this.state.currentStreamId === mediaID) {
      this.resetMediaPlayerStream()
    }
  }

  disconnectFromSfuIfMcuConnection(fullMediaID: string) {
    if (!fullMediaID) return

    const clientMediaID = fullMediaID.split(":")
    if (clientMediaID.length <= 1) return

    const remoteMedia = this.RTCLocalClient.GetRemoteClient(clientMediaID[0])?.GetRemoteMedia(clientMediaID[1])
    if (remoteMedia instanceof RTCRemoteMCUMedia) {
      remoteMedia.ReleaseSfuConnectionIfClaimed()
    }
  }

  // this is for handling your own webcam or screenshare rtc
  switchToLocal() {
    if (this.state.localScreenshareMediaID !== null) {
      if (this.state.currentStreamId === this.state.localScreenshareMediaID) {
        this.resetMediaPlayerStream()
        return
      }
      this.updateState((draft) => {
        draft.currentStreamId = draft.localScreenshareMediaID
      })
    } else if (this.state.localWebcamMediaID !== null) {
      if (this.state.currentStreamId === this.state.localWebcamMediaID) {
        this.resetMediaPlayerStream()
        return
      }

      this.disconnectFromSfuIfMcuConnection(this.state.currentStreamId)

      this.updateState((draft) => {
        draft.currentStreamId = draft.localWebcamMediaID
      })
    }
  }

  // this is for handling remote webcam or screenshare rtc
  switchToRemote(clientID: string, mediaId: string) {
    const fullMediaID = `${clientID}:${mediaId}`
    if (this.state.currentStreamId === fullMediaID) {
      this.resetMediaPlayerStream()
      return
    }

    this.disconnectFromSfuIfMcuConnection(this.state.currentStreamId)

    const remoteMedia = this.RTCLocalClient.GetRemoteClient(clientID).GetRemoteMedia(mediaId)
    if (remoteMedia) {
      // makes sure to connect to sfu, if not already (which should be the case for media that is part of the mcu)
      remoteMedia.ClaimSfuConnectionIfUnclaimed()
    }

    this.updateState((draft) => {
      draft.currentStreamId = fullMediaID
    })
  }

  remoteUserStreamExists() {
    return Object.values(this.state.remoteMedias).some((media) => {
      return !media.raw.mediaType.includes("Spectator")
    })
  }

  startScreenSharing(settings: ScreenShareSetting) {
    if (this.state.localScreenshareMediaID) {
      this.releaseScreenshareMedia()
    }

    registerRTCQuality(settings)
    this._screenshareCaptureId = this.RTCMediaCapture.CaptureScreen(
      settings.maxWidth,
      settings.maxHeight,
      settings.maxFrameRate
    )
  }

  startWebcamCapture(deviceId?: string) {
    this.updateState((draft) => {
      draft.webcamStatus = WebcamStatus.RequestingPermissions
    })
    if (this.state.localWebcamMediaID) {
      this.releaseWebcamMedia()
    }
    this._webcamCaptureId = this.RTCMediaCapture.CaptureWebcam(640, 480, this.maxWebcamFps, deviceId)
  }
}
