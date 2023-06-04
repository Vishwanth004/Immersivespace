import { LogLevel } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"

export class Logger {
  sendToUnity = false

  private sendLogToUnity(level: LogLevel, message: string, stackTrace?: string) {
    if (this.sendToUnity) {
      UnityMessages.sendLog(level, message, stackTrace)
    }
  }

  error(error: Error) {
    this.sendLogToUnity(LogLevel.Error, `${error.name}: ${error.message}`, error.stack)
    console.error(error)
  }
  warn(message: string) {
    this.sendLogToUnity(LogLevel.Warning, message)
    console.warn(message)
  }
  info(message: string) {
    this.sendLogToUnity(LogLevel.Info, message)
    console.info(message)
  }
  log(message: string) {
    this.sendLogToUnity(LogLevel.Info, message)
    console.log(message)
  }
  debug(message: string) {
    this.sendLogToUnity(LogLevel.Debug, message)
    console.debug(message)
  }
}

export const logger = new Logger()
