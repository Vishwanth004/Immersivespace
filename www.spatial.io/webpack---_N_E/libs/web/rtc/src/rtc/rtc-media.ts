import LiveSwitch from "fm.liveswitch"
import { Event, Signal } from "ts-typed-events"

import { RTCConnectionStatus } from "@spatialsys/unity/app-state"
import { logger } from "@spatialsys/web/logger"

import DelayCommand from "./delay-command"
import { RTCLogChannel } from "./rtc-log-channel"
import { RTCMediaStats } from "./rtc-stats"

export default abstract class RTCMedia {
  private readonly SFU_RECONNECT_INTERVAL_BASE_SECONDS = 1

  private readonly SFU_RECONNECT_INTERVAL_BACKOFF_SECONDS = 1

  private readonly SFU_RECONNECT_INTERVAL_MAX_SECONDS = 10

  private _disposed = false

  protected _sfuConnection: LiveSwitch.ManagedConnection = null

  protected _sfuConnectionClaimed = false

  private _sfuReconnectCommand: DelayCommand = null

  private _sfuReconnectIntervalSeconds: number = this.SFU_RECONNECT_INTERVAL_BASE_SECONDS

  protected _stats: RTCMediaStats

  public refreshedStats = new Signal()

  public ID: string

  public mediaType: "Webcam" | "Voice" | "Cast" | "Screen" | "Spectator" | "Spectator-B" | "Other"

  public frameRate: number

  private _sfuAvailable = false

  public sfuAvalailabilityChanged = new Event<boolean>()

  private _sfuConnectionStatus: RTCConnectionStatus = RTCConnectionStatus.Disconnected

  public sfuConnectionStatusChanged = new Event<RTCConnectionStatus>()

  public GetConnectionID(): string {
    return this._sfuConnectionInfo?.getId()
  }

  public abstract GetNativeMedia(): MediaStream

  // Abstract function implemented by LocalMedia and RemoteMedia in order to improve logging
  // messages in Media functions
  protected abstract ObjectDebugString(): string

  // Abstract function implemented by LocalMedia and RemoteMedia in order to consolidate
  // connection logic into just this Media class
  protected abstract CreateConnection(connectionInfo: LiveSwitch.ConnectionInfo): LiveSwitch.ManagedConnection

  public Dispose() {
    if (this._disposed) {
      throw new Error("Can't dispose Media that is already disposed")
    }

    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.Dispose())`)

    this.sfuAvalailabilityChanged.offAll()
    this.sfuConnectionStatusChanged.offAll()

    if (this._sfuConnectionClaimed) {
      this.ReleaseSfuConnection()
    }

    this._disposed = true
  }

  public ClaimSfuConnectionIfUnclaimed() {
    if (!this._sfuConnectionClaimed) {
      this.ClaimSfuConnection()
    }
  }

  public ClaimSfuConnection() {
    if (this._sfuConnectionClaimed) {
      throw new Error("Can't claim sfu connection when sfu connection already claimed")
    }

    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.ClaimSfuConnection())`)

    this._sfuConnectionClaimed = true

    if (this._sfuConnectionStatus === RTCConnectionStatus.Disconnected && this._sfuAvailable) {
      this.ConnectToSfu()
    }
  }

  public ReleaseSfuConnectionIfClaimed() {
    if (this._sfuConnectionClaimed) {
      this.ReleaseSfuConnection()
    }
  }

  public ReleaseSfuConnection() {
    if (!this._sfuConnectionClaimed) {
      throw new Error("Can't release sfu connection when sfu conenction is not claimed")
    }

    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.ReleaseSfuConnection())`)

    this._sfuConnectionClaimed = false

    if (this._sfuReconnectCommand != null) {
      this.CancelSfuReconnect()
    } else if (this._sfuConnectionStatus === RTCConnectionStatus.Connected) {
      this.DisconnectFromSfu()
    }
  }

  public RefreshStats() {
    // Spammy
    // logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.RefreshStats())`);

    if (this._sfuConnectionStatus !== RTCConnectionStatus.Connected) {
      logger.error(RTCLogChannel, `${this.ObjectDebugString()}.RefreshStats() failed: Not connected to sfu`)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._sfuConnection.getStats().then((connectionStats) => {
        this._stats.Refresh(connectionStats)
        this.refreshedStats.emit()
      })
    }
  }

  // HACK because I can't get proactive connections to work
  // This is only for downstream connections
  private _sfuConnectionInfo: LiveSwitch.ConnectionInfo

  public HandleSfuAvailable(connectionInfo: LiveSwitch.ConnectionInfo) {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.HandleSfuAvailable()`)

    this._sfuConnectionInfo = connectionInfo
    this._sfuAvailable = true
    this.sfuAvalailabilityChanged.emit(this._sfuAvailable)

    if (this._sfuConnectionClaimed && this._sfuConnectionStatus === RTCConnectionStatus.Disconnected) {
      this.ConnectToSfu()
    }
  }

  public HandleSfuUnavailable() {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleSfuUnavailable()`)

    // If an sfu is not available, there is no point in completing any in-progress reconnect
    if (this._sfuReconnectCommand != null) {
      this.CancelSfuReconnect()
    }

    this._sfuAvailable = false
    this.sfuAvalailabilityChanged.emit(this._sfuAvailable)
  }

  private ConnectToSfu() {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.ConnectToSfu())`)

    if (!this._sfuAvailable) {
      const errorString = `Impossible! - ${this.ObjectDebugString()}.ConnectToSfu: !SfuAvailable`
      logger.error(RTCLogChannel, errorString)
      throw new Error(errorString)
    }

    // We can become unexpectedly disconnected from the channel at any time, which causes
    // CreateSfuConnection() to throw an internal LiveSwitch exception, hence this try/catch
    try {
      // In accordance with the WebRTC spec, all LiveSwitch stream connections (including sfu connections)
      // cannot be reused once they close or fail, so we must always create a brand new connection object
      // whenever we want to connect to an sfu
      this._sfuConnection = this.CreateConnection(this._sfuConnectionInfo)
      this._sfuConnection.addOnStateChange(this.HandleSfuStateChanged.bind(this))

      // Use LiveSwitch ICE framework for NAT traversal
      this._sfuConnection.setDisableAutomaticIceServers(false)

      // Begin connecting
      this._sfuConnectionStatus = RTCConnectionStatus.Connecting
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._sfuConnection.open()
    } catch (exception) {
      logger.warn(RTCLogChannel, exception)
      this.HandleFailedConnectionToSfu()
    }
  }

  private DisconnectFromSfu() {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.DisconnectFromSfu())`)

    // Begin disconnecting
    this._sfuConnectionStatus = RTCConnectionStatus.Disconnecting
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._sfuConnection.close()
  }

  private HandleSfuStateChanged(connection: LiveSwitch.ManagedConnection) {
    // Sanity check
    if (this._sfuConnection !== connection) {
      const errorString = `Impossible! - ${this.ObjectDebugString()}.HandleSfuStateChanged: _sfuConnection != connection`
      logger.error(RTCLogChannel, errorString)
      throw new Error(errorString)
    }

    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.HandleSfuStateChanged())`, {
      state: connection.getState().toString(),
    })

    const connectionState = this._sfuConnection.getState()

    if (
      connectionState === LiveSwitch.ConnectionState.Closed ||
      connectionState === LiveSwitch.ConnectionState.Failed
    ) {
      this._sfuConnection.removeOnStateChange(this.HandleSfuStateChanged.bind(this))
      this._sfuConnection = null
    }

    switch (connectionState) {
      case LiveSwitch.ConnectionState.Connected:
        this.HandleConnectedToSfu()
        break
      case LiveSwitch.ConnectionState.Closed:
        this.HandleDisconnectedFromSfu()
        break
      case LiveSwitch.ConnectionState.Failed:
        this.HandleFailedConnectionToSfu()
        break
      default:
        break
    }
  }

  private HandleConnectedToSfu() {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.HandleConnectedToSfu())`)

    this._sfuReconnectIntervalSeconds = this.SFU_RECONNECT_INTERVAL_BASE_SECONDS
    this._sfuConnectionStatus = RTCConnectionStatus.Connected
    this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus)

    if (!this._sfuConnectionClaimed) {
      this.DisconnectFromSfu()
    }
  }

  private HandleDisconnectedFromSfu() {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleDisconnectedFromSfu())`)

    this._sfuConnectionStatus = RTCConnectionStatus.Disconnected
    this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus)

    if (this._sfuConnectionClaimed && this._sfuAvailable) {
      this.ConnectToSfu()
    }
  }

  private HandleFailedConnectionToSfu() {
    logger.info(RTCLogChannel, `${this.ObjectDebugString()}.HandleFailedConnectionToSfu())`)

    if (!this._sfuConnectionClaimed || !this._sfuAvailable) {
      // If we don't want to be connected, or we know we can't connect, then just
      // enter the 'Disconnected' state
      this._sfuConnectionStatus = RTCConnectionStatus.Disconnected
      this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus)
    } else {
      // Otherwise enter the 'Failed' state and begin reconnect
      this._sfuConnectionStatus = RTCConnectionStatus.Failed
      this.sfuConnectionStatusChanged.emit(this._sfuConnectionStatus)

      this._sfuReconnectCommand = new DelayCommand(this._sfuReconnectIntervalSeconds, () => {
        logger.info(RTCLogChannel, `{ObjectDebugString()} sfu reconnecting`)

        this._sfuReconnectCommand = null
        this.HandleDisconnectedFromSfu()
      })

      // Update the reconnect interval
      // TODO #3219
      // Maybe switch to exponential backoff
      this._sfuReconnectIntervalSeconds += this.SFU_RECONNECT_INTERVAL_BACKOFF_SECONDS
      if (this._sfuReconnectIntervalSeconds > this.SFU_RECONNECT_INTERVAL_MAX_SECONDS) {
        this._sfuReconnectIntervalSeconds = this.SFU_RECONNECT_INTERVAL_MAX_SECONDS
      }
    }
  }

  private CancelSfuReconnect() {
    logger.warn(RTCLogChannel, `${this.ObjectDebugString()}.CancelSfuReconnect()`)

    // Sanity check
    if (this._sfuConnectionStatus !== RTCConnectionStatus.Failed) {
      const errorString = `Impossible! - ${this.ObjectDebugString()}.CancelSfuReconnect: _sfuConnectionStatus != RTCConnectionStatus.Failed`
      logger.error(RTCLogChannel, errorString)
      throw new Error(errorString)
    }

    this._sfuConnectionStatus = RTCConnectionStatus.Disconnected
    this._sfuReconnectIntervalSeconds = this.SFU_RECONNECT_INTERVAL_BASE_SECONDS
    this._sfuReconnectCommand.Cancel()
    this._sfuReconnectCommand = null
  }
}
