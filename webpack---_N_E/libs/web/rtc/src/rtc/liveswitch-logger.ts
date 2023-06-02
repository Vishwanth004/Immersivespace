import LiveSwitch from "fm.liveswitch"

import { logger } from "@spatialsys/web/logger"

import { RTCLogChannel } from "./rtc-log-channel"

export class LiveSwitchLogger extends LiveSwitch.LogProvider {
  // eslint-disable-next-line class-methods-use-this
  protected doLog(logEvent: LiveSwitch.LogEvent) {
    if (logEvent.getException()) {
      logger.error(RTCLogChannel, logEvent.getException())
    } else {
      const logMessage = logEvent.getMessage()
      switch (logEvent.getLevel()) {
        case LiveSwitch.LogLevel.Verbose:
          logger.debug(RTCLogChannel, logMessage)
          break
        case LiveSwitch.LogLevel.Debug:
          logger.debug(RTCLogChannel, logMessage)
          break
        case LiveSwitch.LogLevel.Info:
          logger.info(RTCLogChannel, logMessage)
          break
        case LiveSwitch.LogLevel.Warn:
          logger.warn(RTCLogChannel, logMessage)
          break
        case LiveSwitch.LogLevel.Error:
          logger.error(RTCLogChannel, logMessage)
          break
        default:
          break
      }
    }
  }
}
