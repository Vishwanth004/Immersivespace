import LiveSwitch from "fm.liveswitch"

import { logger } from "@spatialsys/web/logger"

import * as RTCLocalClient from "./rtc-local-client"
import { RTCLogChannel } from "./rtc-log-channel"
import RTCRemoteMedia from "./rtc-remote-media"

export default class RTCRemoteMCUMedia extends RTCRemoteMedia {
  public get useMCUMedia() {
    return !this._sfuConnectionClaimed
  }

  public override GetNativeMedia(): MediaStream {
    // return the mcu source media if there is not currently a direct sfu connection
    if (this.useMCUMedia) {
      return RTCLocalClient.GetMCUMedia().GetNativeMedia()
    }
    return super.GetNativeMedia()
  }

  // creates an direct sfu connection to this media, even though it's also a region of the mcu
  protected override CreateConnection(connectionInfo: LiveSwitch.ConnectionInfo) {
    logger.debug(RTCLogChannel, `${this.ObjectDebugString()}.CreateSfuConnection()`)

    const audioStream = new LiveSwitch.AudioStream(this._media)
    const videoStream = new LiveSwitch.VideoStream(this._media)
    videoStream.setSimulcastMode(LiveSwitch.SimulcastMode.RtpStreamId)

    return RTCLocalClient.GetMcuChannel().createSfuDownstreamConnection(connectionInfo, audioStream, videoStream)
  }
}
