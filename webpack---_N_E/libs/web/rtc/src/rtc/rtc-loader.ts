import { once } from "lodash"

import { logger } from "@spatialsys/web/logger"

import { RTCLocalClient, RTCMediaCapture } from "../rtc-state"
import { RTCLogChannel } from "./rtc-log-channel"

export const prepareRTCClientIfNeeded = once(
  async (
    userId: string,
    liveswitchURL: string,
    liveswitchAppID: string
  ): Promise<{
    rtcLocalClient: RTCLocalClient
    rtcMediaCapture: RTCMediaCapture
  }> => {
    const [rtcLocalClient, rtcMediaCapture] = await Promise.all([
      import(/* webpackChunkName: "rtc-local-client" */ "./rtc-local-client"),
      import(/* webpackChunkName: "rtc-media-capture" */ "./rtc-media-capture"),
    ])
    try {
      rtcLocalClient.Initialize(userId, liveswitchURL, liveswitchAppID)
      rtcLocalClient.InitializeLogger()
    } catch (err) {
      logger.error(RTCLogChannel, "Error initializing Liveswitch", err)
    }

    return { rtcLocalClient, rtcMediaCapture }
  }
)
