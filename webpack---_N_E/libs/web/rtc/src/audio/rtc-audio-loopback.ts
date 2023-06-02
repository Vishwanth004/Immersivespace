import { logger } from "@spatialsys/web/logger"

import { VoiceLogChannel } from "../photon-voice/voice-log-channel"

interface LoopbackStream {
  inputStream: MediaStream
  outputStream: MediaStream
  sender: RTCRtpSender
  onOutputStreamOpen: (stream: MediaStream) => void
  onError: (err: Error) => void
}

/**
 * Creates a local rtc connection for pipe audio through
 * used to workaround chrome bug where echo cancellation does not work on non-rtc audio sources
 * https://bugs.chromium.org/p/chromium/issues/detail?id=687574#c56
 */
export class RTCAudioLoopback {
  private _streams: Record<string, LoopbackStream> = {}
  private _inputConnection: RTCPeerConnection
  private _outputConnection: RTCPeerConnection
  private _currOfferPromise: Promise<void>

  constructor() {
    this.initConnection()

    const offerOptions: RTCOfferOptions = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
    }

    // initial offer to start connection
    this.createOfferWhenAvailable(offerOptions)
  }

  public dispose() {
    this._inputConnection.close()
    this._outputConnection.close()
    this._inputConnection = null
    this._outputConnection = null
    this._streams = {}
  }

  private initConnection() {
    const servers = null // this is null since both peers are local and do not need to go through an ice server

    // these same peer connections will be used for all audio streams used
    // the input connection will create offers for each stream that needs to be routed
    this._inputConnection = new RTCPeerConnection(servers)
    this._inputConnection.onicecandidate = (e) => this.onIceCandidate(this._outputConnection, e)
    this._outputConnection = new RTCPeerConnection(servers)
    this._outputConnection.onicecandidate = (e) => this.onIceCandidate(this._inputConnection, e)
    this._outputConnection.ontrack = this.onOutputStreamOpened.bind(this)
  }

  public addStream(
    stream: MediaStream,
    onOutputStreamOpen: (stream: MediaStream) => void,
    onError: (err: Error) => void
  ) {
    // if the connection has been closed, restart it before adding new streams
    if (this.isConnectionClosed()) {
      this.initConnection()
    }

    const sender = this._inputConnection.addTrack(stream.getAudioTracks()[0], stream)
    this._streams[stream.id] = {
      inputStream: stream,
      outputStream: null,
      sender,
      onOutputStreamOpen,
      onError,
    }

    const offerOptions: RTCOfferOptions = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
    }

    this.createOfferWhenAvailable(offerOptions)
  }

  // only create one offer at a time
  // if we are currently setting one up, wait until it's done to try again
  private createOfferWhenAvailable(offerOptions: RTCOfferOptions) {
    if (this._currOfferPromise) {
      this._currOfferPromise.finally(() => {
        this.createOfferWhenAvailable(offerOptions)
      })
    } else {
      this._currOfferPromise = new Promise<void>((resolve) => {
        this._inputConnection
          .createOffer(offerOptions)
          .then(this.gotInputDescription.bind(this))
          .catch(this.onError.bind(this))
          .finally(() => {
            this._currOfferPromise = null
            resolve()
          })
      })
    }
  }

  public removeStream(stream: MediaStream) {
    const loopback = this._streams[stream.id]
    if (!this.isConnectionClosed()) {
      this._inputConnection.removeTrack(loopback.sender)
    }
    delete this._streams[stream.id]
  }

  private isConnectionClosed() {
    return this._inputConnection.signalingState === "closed" || this._outputConnection.signalingState === "closed"
  }

  private gotInputDescription(desc: RTCLocalSessionDescriptionInit) {
    return this._inputConnection
      .setLocalDescription(desc)
      .then(() => {
        // assume we don't need to configure the description here
        // since both peer connections are local, we can use the one setup from the local description
        return this._outputConnection
          .setRemoteDescription(desc as RTCSessionDescriptionInit)
          .then(() => {
            return this._outputConnection
              .createAnswer()
              .then(this.gotOutputDescription.bind(this))
              .catch(this.onError.bind(this))
          })
          .catch(this.onError.bind(this))
      })
      .catch(this.onError.bind(this))
  }

  private gotOutputDescription(desc: RTCSessionDescriptionInit) {
    return this._outputConnection
      .setLocalDescription(desc)
      .then(() => {
        return this._inputConnection.setRemoteDescription(desc).catch(this.onError.bind(this))
      })
      .catch(this.onError.bind(this))
  }

  private onOutputStreamOpened(trackEvent: RTCTrackEvent) {
    for (let i = 0; i < trackEvent.streams.length; ++i) {
      const stream = trackEvent.streams[i]
      const loopbackStream = this._streams[stream.id]
      if (loopbackStream) {
        loopbackStream.outputStream = stream
        loopbackStream.onOutputStreamOpen(stream)
      } else {
        logger.error(VoiceLogChannel, "remote stream opened unexpectedly")
      }
    }
  }

  private onIceCandidate(pc: RTCPeerConnection, event: RTCPeerConnectionIceEvent) {
    pc.addIceCandidate(event.candidate).catch(this.onError.bind(this))
  }

  private onError(err: Error) {
    Object.values(this._streams).forEach((loopbackStream) => {
      loopbackStream.onError(err)
    })
  }
}
