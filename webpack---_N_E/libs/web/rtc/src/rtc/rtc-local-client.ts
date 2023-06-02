import LiveSwitch from "fm.liveswitch"
import { Event } from "ts-typed-events"

import { RTCConnectionStatus } from "@spatialsys/unity/app-state"
import { logger } from "@spatialsys/web/logger"
import { sapiClient } from "@spatialsys/web/sapi"

import { DEVICE_ID } from "../rtc-state"
import DelayCommand from "./delay-command"
import { LiveSwitchLogger } from "./liveswitch-logger"
import RTCLocalMedia from "./rtc-local-media"
import { RTCLogChannel } from "./rtc-log-channel"
import RTCRemoteClient from "./rtc-remote-client"
import RTCRemoteMedia from "./rtc-remote-media"

enum RTCDisconnectedMessageSendPolicy {
  Ignore,
  Queue,
}

export interface MediaUpdatedInfo {
  mediaType: string
  frameRate: number
}

const CHANNEL_RECONNECT_INTERVAL_BASE_SECONDS = 1
const CHANNEL_RECONNECT_INTERVAL_BACKOFF_SECONDS = 1
const CHANNEL_RECONNECT_INTERVAL_MAX_SECONDS = 10

let _gatewayURL: string = null
let _appID: string = null
let _userID: string = null
let _localClient: LiveSwitch.Client = null
let _channel: LiveSwitch.Channel = null
let _mcuChannel: LiveSwitch.Channel = null
let _mcuMedia: RTCRemoteMedia = null

let _channelConnectionClaim: LiveSwitch.ChannelClaim = null
let _mcuChannelConnectionClaim: LiveSwitch.ChannelClaim = null
let _releasingChannel = false
let _channelReconnectCommand: DelayCommand = null
let _channelReconnectIntervalSeconds: number = CHANNEL_RECONNECT_INTERVAL_BASE_SECONDS
let _channelConnectionStatus: RTCConnectionStatus = RTCConnectionStatus.Disconnected

const _localMedias: { [mediaID: string]: RTCLocalMedia } = {}
const _remoteClients: { [clientID: string]: RTCRemoteClient } = {}
const _messageHandlers: {
  [type: string]: (clientInfo: LiveSwitch.ClientInfo, payload: string) => void
} = {}

export const channelConnectionStatusChanged = new Event<RTCConnectionStatus>()
export const remoteClientClaimedChannel = new Event<string>()
export const remoteClientReleasedChannel = new Event<string>()
export const mcuLayoutChanged = new Event<LiveSwitch.VideoLayout>()
export const clientInitialized = new Event<void>()

// For internal use only (Media)
export function GetChannel() {
  return _channel
}

export function GetMcuChannel() {
  return _mcuChannel
}

export function GetMCUMedia() {
  return _mcuMedia
}

export function GetID() {
  return _localClient.getId()
}

export function GetLocalMedia(mediaID: string) {
  return _localMedias[mediaID]
}

export function GetAllLocalMedia() {
  return _localMedias
}

export function GetRemoteClient(clientID: string) {
  return _remoteClients[clientID]
}

export function GetAllRemoteClients() {
  return _remoteClients
}

export function InitializeLogger() {
  LiveSwitch.Log.setLogLevel(LiveSwitch.LogLevel.Warn)
  const logProvider = new LiveSwitchLogger()
  logProvider.setLevel(LiveSwitch.LogLevel.Warn)
  LiveSwitch.Log.registerProvider(logProvider)
}

export function AddMessageHandler(type: string, handler: (clientInfo: LiveSwitch.ClientInfo, payload: string) => void) {
  if (type in _messageHandlers) {
    throw new Error("Can't add message handler for message type that already has a handler")
  }

  logger.debug(RTCLogChannel, `LocalClient.AddMessageHandler(${type})`)

  _messageHandlers[type] = handler
}

export function RemoveMessageHandler(type: string) {
  if (!(type in _messageHandlers)) {
    throw new Error("Can't remove message handler for message type that has no handler")
  }

  logger.debug(RTCLogChannel, `LocalClient.RemoveMessageHandler(${type})`)

  delete _messageHandlers[type]
}

// Parameter "disconnectedPolicy" really only exists as a way to document (via the API) what happens if the channel is disconnected when a message is sent
export function SendChannelMessage(
  type: string,
  payload: string,
  disconnectedPolicy = RTCDisconnectedMessageSendPolicy.Ignore
) {
  logger.debug(RTCLogChannel, `LocalClient.SendChannelMessage(${type}, ${payload})`)

  return new Promise<void>((resolve, reject) => {
    if (disconnectedPolicy === RTCDisconnectedMessageSendPolicy.Queue) {
      throw new Error("SendChannelMessage does not support queueing messages when disconnected")
    } else if (_channelConnectionClaim == null) {
      throw new Error("Can't send message when no channel is claimed")
    } else if (_channel == null) {
      throw new Error("Can't send message when channel is null")
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _channel
      .sendMessage(JSON.stringify({ type, payload }))
      .then(() => resolve())
      .fail(() => reject())
  })
}

// For internal use only (by RemoteClient)
export function NotifyLocalMediasUpdated() {
  logger.debug(RTCLogChannel, `LocalClient.NotifyLocalMediasUpdated()`)

  if (!_releasingChannel) {
    const localMediasData: { [mediaID: string]: MediaUpdatedInfo } = {}
    Object.entries(_localMedias).forEach(([mediaID, localMedia]) => {
      localMediasData[mediaID] = {
        mediaType: localMedia.mediaType,
        frameRate: localMedia.frameRate,
      }
    })

    SendChannelMessage("LocalMediasUpdated", JSON.stringify(localMediasData)).catch((e) => {
      logger.error(RTCLogChannel, `LocalClient: sending channel message "LocalMediasUpdated" failed`, e)
    })
  }
}

function HandleMessage(clientInfo: LiveSwitch.ClientInfo, messageString: string) {
  // Ignore messages from self
  if (clientInfo.getId() !== _localClient.getId()) {
    logger.debug(RTCLogChannel, "LocalClient.HandleMessage()", {
      id: clientInfo.getId(),
      userId: clientInfo.getUserId(),
      message: messageString,
    })

    const messageJson = JSON.parse(messageString)
    if (!(messageJson.type in _messageHandlers)) {
      throw new Error(`Unhandled message type`)
    } else {
      _messageHandlers[messageJson.type](clientInfo, messageJson.payload)
    }
  } else {
    logger.debug(RTCLogChannel, `ignoring message from self ${messageString}`)
  }
}

function HandleRemoteClientClaimedChannel(clientID: string, userID: string, deviceID: string) {
  logger.debug(RTCLogChannel, "LocalClient.HandleRemoteClientClaimedChannel", { clientID, userID, deviceID })

  _remoteClients[clientID] = new RTCRemoteClient(clientID, userID, deviceID)
  remoteClientClaimedChannel.emit(clientID)
}

function HandleRemoteClientMediasUpdated(clientInfo: LiveSwitch.ClientInfo, medias: { [mediaID: string]: any }) {
  if (!(clientInfo.getId() in _remoteClients)) {
    HandleRemoteClientClaimedChannel(clientInfo.getId(), clientInfo.getUserId(), clientInfo.getDeviceId())
  }

  _remoteClients[clientInfo.getId()].HandleRemoteMediasUpdated(medias)
}

function HandleRemoteClientJoin(clientInfo: LiveSwitch.ClientInfo) {
  if (!(clientInfo.getId() in _remoteClients)) {
    HandleRemoteClientClaimedChannel(clientInfo.getId(), clientInfo.getUserId(), clientInfo.getDeviceId())
  }

  _remoteClients[clientInfo.getId()].HandleConnectedToChannel()
}

function HandleRemoteClientLeave(clientInfo: LiveSwitch.ClientInfo) {
  // This remote client may already have told us it released the channel, and so
  // we would have already removed it from the RTC system
  if (clientInfo.getId() in _remoteClients) {
    _remoteClients[clientInfo.getId()].HandleDisconnectedFromChannel()
  }
}

export function HandleRemoteUpstreamConnectionOpen(connectionInfo: LiveSwitch.ConnectionInfo) {
  if (!(connectionInfo.getClientId() in _remoteClients)) {
    HandleRemoteClientClaimedChannel(
      connectionInfo.getClientId(),
      connectionInfo.getUserId(),
      connectionInfo.getDeviceId()
    )
  }

  _remoteClients[connectionInfo.getClientId()].HandleRemoteUpstreamConnectionOpen(connectionInfo)
}

export function HandleRemoteUpstreamConnectionClose(connectionInfo: LiveSwitch.ConnectionInfo) {
  // This remote client may already have told us it released the channel, and so
  // we would have already removed it from the RTC system
  if (connectionInfo.getClientId() in _remoteClients) {
    _remoteClients[connectionInfo.getClientId()].HandleRemoteUpstreamConnectionClose(connectionInfo)
  }
}

export function HandleMCULayoutChanged(videoLayout: LiveSwitch.VideoLayout) {
  mcuLayoutChanged.emit(videoLayout)
}

// For internal use only (RemoteClient)
export function HandleRemoteClientReleasedChannel(clientID: string) {
  logger.debug(RTCLogChannel, `LocalClient.HandleRemoteClientReleasedChannel(clientID=${clientID})`)

  if (!(clientID in _remoteClients)) {
    logger.warn(
      RTCLogChannel,
      `LocalClient.HandleRemoteClientReleasedChannel(clientID=${clientID}): remote client does not exist`
    )
    return
  }

  _remoteClients[clientID].Dispose()
  delete _remoteClients[clientID]
  remoteClientReleasedChannel.emit(clientID)
}

async function ConnectToChannel(liveSwitchTokenFromUnity?: string) {
  logger.debug(RTCLogChannel, `LocalClient.ConnectToChannel()`)

  let token = liveSwitchTokenFromUnity
  if (!token) {
    const { liveswitchToken } = await sapiClient.rooms.generateLiveswitchToken(DEVICE_ID, [
      _channelConnectionClaim.getId(),
      _mcuChannelConnectionClaim.getId(),
    ])
    token = liveswitchToken
  }

  _channelConnectionStatus = RTCConnectionStatus.Connecting
  channelConnectionStatusChanged.emit(_channelConnectionStatus)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  _localClient
    .register(token)
    // See NOTE in HandleStateChanged
    .then((channels) => {
      // can happen if ReleaseChannel is called before we get to this point
      if (!_channelConnectionClaim || _releasingChannel) {
        DisconnectFromChannel()
        throw new Error("already released channel before fully connected")
      }
      return HandleConnectedToChannel(channels)
    })
    .fail((err) => {
      logger.error(RTCLogChannel, "Could not register liveswitch token", err)
    })
}

function DisconnectFromChannel() {
  logger.debug(RTCLogChannel, `LocalClient.DisconnectFromChannel()`)

  // Begin disconnecting
  _channelConnectionStatus = RTCConnectionStatus.Disconnecting
  channelConnectionStatusChanged.emit(_channelConnectionStatus)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  _localClient.unregister()
}

function CancelChannelReconnect() {
  logger.warn(RTCLogChannel, `LocalClient.CancelChannelReconnect()`)

  _channelReconnectIntervalSeconds = CHANNEL_RECONNECT_INTERVAL_BASE_SECONDS
  _channelReconnectCommand.Cancel()
  _channelReconnectCommand = null
}

function HandleConnectedToChannel(newChannels: LiveSwitch.Channel[]) {
  logger.debug(RTCLogChannel, `LocalClient.HandleConnectedToChannel(${newChannels[0].getId()})`)

  if (newChannels.length !== 2) {
    logger.error(RTCLogChannel, "Incorrect number of channels")
    throw new Error("Incorrect number of channels")
  }

  if (newChannels[0].getId().endsWith("_mcu")) {
    if (newChannels[1].getId().endsWith("_mcu")) {
      logger.error(RTCLogChannel, "Multiple MCU channels")
    }

    _mcuChannel = newChannels[0]
    _channel = newChannels[1]
  } else {
    if (!newChannels[1].getId().endsWith("_mcu")) {
      logger.error(RTCLogChannel, "No MCU channels")
    }

    _channel = newChannels[0]
    _mcuChannel = newChannels[1]
  }

  // LiveSwitch event handlers
  _channel.addOnMessage(HandleMessage)
  _channel.addOnRemoteClientJoin(HandleRemoteClientJoin)
  _channel.addOnRemoteClientLeave(HandleRemoteClientLeave)
  _channel.addOnRemoteUpstreamConnectionOpen(HandleRemoteUpstreamConnectionOpen)
  _channel.addOnRemoteUpstreamConnectionClose(HandleRemoteUpstreamConnectionClose)

  _mcuChannel.addOnRemoteUpstreamConnectionOpen(HandleRemoteUpstreamConnectionOpen)
  _mcuChannel.addOnRemoteUpstreamConnectionClose(HandleRemoteUpstreamConnectionClose)
  _mcuChannel.addOnMcuVideoLayout(HandleMCULayoutChanged)

  // Custom event handlers
  AddMessageHandler("LocalMediasUpdated", (clientInfo, payload) => {
    HandleRemoteClientMediasUpdated(clientInfo, JSON.parse(payload))
  })
  AddMessageHandler("ChannelReleased", (clientInfo) => HandleRemoteClientReleasedChannel(clientInfo.getId()))

  _channelReconnectIntervalSeconds = CHANNEL_RECONNECT_INTERVAL_BASE_SECONDS
  _channelConnectionStatus = RTCConnectionStatus.Connected
  channelConnectionStatusChanged.emit(_channelConnectionStatus)

  Object.values(_localMedias).forEach((localMedia) => {
    localMedia.HandleSfuAvailable(null)
  })

  const remoteClientInfos = _channel.getRemoteClientInfos()
  remoteClientInfos.forEach((info) => {
    HandleRemoteClientJoin(info)
  })

  // If we are connected to a channel we don't want to be connected to, then disconnect
  if (!_channelConnectionClaim || _channelConnectionClaim.getId() !== _channel.getId()) {
    DisconnectFromChannel()
  } else {
    NotifyLocalMediasUpdated()
  }

  _remoteClients.mcu.HandleRemoteMediasUpdated({ mcu: { mediaType: "mcu", frameRate: 8 } })
  _mcuMedia = _remoteClients.mcu.GetRemoteMedia("mcu")
  _mcuMedia.HandleSfuAvailable(null)
}

function HandleDisconnectedFromChannel() {
  logger.info(RTCLogChannel, `LocalClient.HandleDisconnectedFromChannel()`)

  _channelConnectionStatus = RTCConnectionStatus.Disconnected
  channelConnectionStatusChanged.emit(_channelConnectionStatus)

  // If we want to be connected to a (different) channel, then connect
  if (_channelConnectionClaim != null) {
    void ConnectToChannel()
  }
}

function HandleFailedConnectionToChannel() {
  logger.info(RTCLogChannel, `LocalClient.HandleFailedConnectionToChannel()`)

  // Set channel connection status to Failed and try to reconnect
  _channelConnectionStatus = RTCConnectionStatus.Failed
  channelConnectionStatusChanged.emit(_channelConnectionStatus)

  if (_channelConnectionClaim != null) {
    _channelReconnectCommand = new DelayCommand(_channelReconnectIntervalSeconds, () => {
      logger.info(RTCLogChannel, `Channel reconnecting`)
      _channelReconnectCommand = null

      ResetClient()
      void ConnectToChannel()
    })

    // Update the reconnect interval
    // TODO #3219
    // Maybe switch to exponential backoff
    _channelReconnectIntervalSeconds += CHANNEL_RECONNECT_INTERVAL_BACKOFF_SECONDS
    if (_channelReconnectIntervalSeconds > CHANNEL_RECONNECT_INTERVAL_MAX_SECONDS) {
      _channelReconnectIntervalSeconds = CHANNEL_RECONNECT_INTERVAL_MAX_SECONDS
    }
  }
}

function HandleStateChanged(client: LiveSwitch.Client) {
  // Sanity check
  if (_localClient !== client) {
    const errorString = "Impossible! - LocalClient.HandleStateChanged: _localClient != client"
    logger.error(RTCLogChannel, errorString)
    throw new Error(errorString)
  }

  if (_localClient.getState() === LiveSwitch.ClientState.Registered) {
    // NOTE: This _localClient.OnStateChanged event is raised before _localClient.Channels is populated
    // with the channel that we connected to, so he have to wait to call HandleConnectedToChannel()
    // until _localClient.Register().Then(), above
  } else if (_localClient.getState() === LiveSwitch.ClientState.Unregistered) {
    // If we entered the Unregistered state because we tried to register but failed,
    // then there is no channel to dispose
    if (_channel != null) {
      Object.values(_localMedias).forEach((localMedia) => {
        localMedia.HandleSfuUnavailable()
      })

      // LiveSwitch event handlers
      _channel.removeOnMessage(HandleMessage)
      _channel.removeOnRemoteClientJoin(HandleRemoteClientJoin)
      _channel.removeOnRemoteClientLeave(HandleRemoteClientLeave)
      _channel.removeOnRemoteUpstreamConnectionOpen(HandleRemoteUpstreamConnectionOpen)
      _channel.removeOnRemoteUpstreamConnectionClose(HandleRemoteUpstreamConnectionClose)

      _mcuChannel.removeOnRemoteUpstreamConnectionOpen(HandleRemoteUpstreamConnectionOpen)
      _mcuChannel.removeOnRemoteUpstreamConnectionClose(HandleRemoteUpstreamConnectionClose)
      _mcuChannel.removeOnMcuVideoLayout(HandleMCULayoutChanged)

      // Custom event handlers
      RemoveMessageHandler("LocalMediasUpdated")
      RemoveMessageHandler("ChannelReleased")

      _channel = null
    }

    if (_localClient.getUnregisterException() == null) {
      HandleDisconnectedFromChannel()
    } else {
      HandleFailedConnectionToChannel()
    }
  }
}

export function ClaimChannel(channelID: string, liveSwitchToken?: string) {
  if (_userID == null) {
    throw new Error("Can't claim channel when no userID set")
  } else if (_channelConnectionClaim != null) {
    throw new Error("Can't claim channel when channel is claimed")
  } else if (_channelConnectionStatus !== RTCConnectionStatus.Disconnected) {
    throw new Error("Can't claim channel when channel is not disconnected")
  }

  logger.debug(RTCLogChannel, `LocalClient.ClaimChannel(${channelID})`)

  _channelConnectionClaim = new LiveSwitch.ChannelClaim(channelID)
  _mcuChannelConnectionClaim = new LiveSwitch.ChannelClaim(`${channelID}_mcu`)

  HandleRemoteClientClaimedChannel("mcu", "mcu", "mcu")

  // We want to be connected; if we aren't, then connect
  if (_channelConnectionStatus === RTCConnectionStatus.Disconnected) {
    void ConnectToChannel(liveSwitchToken)
  }
}

export function ReleaseChannel() {
  if (_channelConnectionClaim == null) {
    // if no connection claim, channel is already released. do nothing
    return
  }

  logger.debug(RTCLogChannel, `LocalClient.ReleaseChannel()`)

  HandleRemoteClientReleasedChannel("mcu")

  // Dispose all remote clients
  Object.keys(_remoteClients).forEach((clientID) => {
    HandleRemoteClientReleasedChannel(clientID)
  })

  _releasingChannel = true

  // We want to make sure the ChannelReleased message actually gets sent before releasing the channel
  SendChannelMessage("ChannelReleased", null)
    .catch((e) => {
      logger.error(RTCLogChannel, `LocalClient: sending channel message "ChannelReleased" failed`, e)
    })
    .finally(() => {
      _channelConnectionClaim = null

      if (_channelReconnectCommand != null) {
        CancelChannelReconnect()
      } else if (_channelConnectionStatus === RTCConnectionStatus.Connected) {
        DisconnectFromChannel()
      }

      _releasingChannel = false
    })
}

export function AddLocalMedia(mediaID: string, media: RTCLocalMedia) {
  if (mediaID in _localMedias) {
    throw new Error("Can't add local media that already exists")
  }

  logger.debug(RTCLogChannel, `LocalClient.AddLocalMedia(${mediaID})`)

  _localMedias[mediaID] = media

  if (_channelConnectionClaim != null && _channel) {
    NotifyLocalMediasUpdated()

    if (_channelConnectionStatus === RTCConnectionStatus.Connected) {
      media.HandleSfuAvailable(null)
    }
  }
}

export function RemoveLocalMedia(mediaID: string) {
  if (!(mediaID in _localMedias)) {
    throw new Error("Can't remove local media that does not exist")
  }

  logger.debug(RTCLogChannel, `LocalClient.RemoveLocalMedia(${mediaID})`)

  delete _localMedias[mediaID]

  if (_channelConnectionClaim != null && _channel) {
    NotifyLocalMediasUpdated()
  }
}

export function Initialize(userID: string, gatewayURL: string, appID: string) {
  if (userID === _userID && gatewayURL === _gatewayURL && appID === _appID) {
    return
  }

  if (userID === null || userID === "") {
    throw new Error("Can't set userID to null or empty string")
  } else if (_channelConnectionClaim != null) {
    throw new Error("Can't set userID when channel is claimed")
  } else if (_channelConnectionStatus !== RTCConnectionStatus.Disconnected) {
    throw new Error("Can't set userID when channel is not disconnected")
  }

  logger.info(RTCLogChannel, `LocalClient.Initialize(${userID}, ${gatewayURL}, ${appID})`)

  _gatewayURL = gatewayURL
  _appID = appID
  _userID = userID

  InitializeClient()
}

function InitializeClient() {
  _localClient = new LiveSwitch.Client(_gatewayURL, _appID, _userID, DEVICE_ID)
  _localClient.addOnStateChange(HandleStateChanged)
  clientInitialized.emit()
}

function ResetClient() {
  if (_localClient) {
    void _localClient.closeAll()
    void _localClient.unregister()
  }
  InitializeClient()
}
