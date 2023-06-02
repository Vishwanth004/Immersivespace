import LiveSwitch from "fm.liveswitch"

import { logger } from "@spatialsys/web/logger"

import * as RTCLocalClient from "./rtc-local-client"
import { RTCLogChannel } from "./rtc-log-channel"
import RTCRemoteMedia from "./rtc-remote-media"

export default class RTCRemoteMCUSourceMedia extends RTCRemoteMedia {
  protected override CreateConnection() {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.CreateConnection()`)

    const videoStream = new LiveSwitch.VideoStream(this._media)
    videoStream.setSimulcastMode(LiveSwitch.SimulcastMode.RtpStreamId)

    return RTCLocalClient.GetMcuChannel().createMcuConnection(videoStream)
  }
}
