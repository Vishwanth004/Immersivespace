/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios"

interface LogProps {
  [k: string]: any
}

// API.POST throws exceptions as strings so need to handle string
// types until that behavior is refactored out
type LoggableError = Error | ErrorEvent | string

interface LoggerMethod {
  (message: string, additionalProperties?: LogProps): void
  (error: LoggableError, additionalProperties?: LogProps): void
  (message: string, error: LoggableError, additionalProperties?: LogProps): void
  (channel: LogChannel, message: string, additionalProperties?: LogProps): void
  (channel: LogChannel, error: LoggableError, additionalProperties?: LogProps): void
  (channel: LogChannel, message: string, error: LoggableError, additionalProperties?: LogProps): void
}

type LogLevelName = "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE"
interface LogLevel {
  value: number
  name: string
  consoleMethod: (...data: any[]) => void
}

export class LogChannel {
  constructor(public readonly name: string) {}
}

export const LogLevels: Record<LogLevelName, LogLevel> = {
  ERROR: { value: 1, name: "error", consoleMethod: (...data: any[]) => console.error(...data) },
  WARN: { value: 2, name: "warning", consoleMethod: (...data: any[]) => console.warn(...data) },
  INFO: { value: 3, name: "info", consoleMethod: (...data: any[]) => console.info(...data) },
  DEBUG: { value: 4, name: "debug", consoleMethod: (...data: any[]) => console.debug(...data) },
  TRACE: { value: 5, name: "trace", consoleMethod: (...data: any[]) => console.trace(...data) },
} as const

const DefaultLogChannel = new LogChannel("Default")

export class SpatialLogger {
  public readonly error: LoggerMethod = (messageOrErrorOrChannel, messageOrErrorOrProps?, errorOrProps?, props?) => {
    // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
    this.log(LogLevels.ERROR, messageOrErrorOrChannel, messageOrErrorOrProps, errorOrProps, props)
  }

  public readonly warn: LoggerMethod = (messageOrErrorOrChannel, messageOrErrorOrProps?, errorOrProps?, props?) => {
    // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
    this.log(LogLevels.WARN, messageOrErrorOrChannel, messageOrErrorOrProps, errorOrProps, props)
  }

  public readonly info: LoggerMethod = (messageOrErrorOrChannel, messageOrErrorOrProps?, errorOrProps?, props?) => {
    // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
    this.log(LogLevels.INFO, messageOrErrorOrChannel, messageOrErrorOrProps, errorOrProps, props)
  }

  public readonly debug: LoggerMethod = (messageOrErrorOrChannel, messageOrErrorOrProps?, errorOrProps?, props?) => {
    // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
    this.log(LogLevels.DEBUG, messageOrErrorOrChannel, messageOrErrorOrProps, errorOrProps, props)
  }

  public readonly trace: LoggerMethod = (messageOrErrorOrChannel, messageOrErrorOrProps?, errorOrProps?, props?) => {
    // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
    this.log(LogLevels.TRACE, messageOrErrorOrChannel, messageOrErrorOrProps, errorOrProps, props)
  }

  private static isInitialized = false
  private static maxLevelConsole: number = LogLevels.INFO.value
  private static maxLevelRemote: number = LogLevels.INFO.value
  private static tags: string[] = []
  static properties: Record<string, any> = {}

  private static get remoteUrl() {
    const tagString = SpatialLogger.tags.join(",")
    return `https://spatiallogger.spatial.io/inputs/b0e3528c-683f-462a-8594-db29997fe2be/tag/${tagString}/`
  }

  static initialize({
    tags,
    maxLevelConsole,
    maxLevelRemote,
  }: {
    tags: string[]
    maxLevelConsole: number
    maxLevelRemote: number
  }) {
    SpatialLogger.maxLevelConsole = maxLevelConsole
    SpatialLogger.maxLevelRemote = maxLevelRemote
    SpatialLogger.tags = Array.from(new Set([...SpatialLogger.tags, ...tags]))
    SpatialLogger.isInitialized = true
  }

  constructor(private readonly defaultChannel: LogChannel = DefaultLogChannel) {
    if (!SpatialLogger.isInitialized) {
      throw new Error("SpatialLogger isn't initialized, forgot to call SpatialLogger.initialize")
    }
  }

  // This might seem excessive, especially coming from C# where overloads are a first-class language feature
  // but, runtime checking is necessary for overloads in JS. And having overloads makes the public api
  // of this logger much more pleasant to work with.
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, message: string, props?: LogProps)
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, error: LoggableError, props?: LogProps)
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, message: string, error: LoggableError, props?: LogProps)
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, channel: LogChannel, message: string, props?: LogProps)
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, channel: LogChannel, error: LoggableError, props?: LogProps)
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, channel: LogChannel, message: string, error: LoggableError, props?: LogProps)
  // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
  private log(level: LogLevel, message: string, error: LoggableError, props?: LogProps, channel?: LogChannel)
  private log(
    level: LogLevel,
    _messageOrErrorOrChannel: string | LoggableError | LogChannel,
    _messageOrErrorOrProps?: string | LoggableError | LogProps,
    _errorOrProps?: LoggableError | LogProps,
    _props?: LogProps
  ) {
    // Resolve overloads
    let channel: LogChannel = this.defaultChannel
    if (_messageOrErrorOrChannel instanceof LogChannel) {
      channel = _messageOrErrorOrChannel
    }

    let message = ""
    if (typeof _messageOrErrorOrChannel === "string") {
      message = _messageOrErrorOrChannel
    } else if (typeof _messageOrErrorOrProps === "string") {
      message = _messageOrErrorOrProps
    } else if (typeof _errorOrProps === "string") {
      message = _errorOrProps
    }

    // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library: refactor this file. This error is introduced from TS strict mode
    // when abstracting the logger as its own library
    let error: LoggableError = null
    if (_messageOrErrorOrChannel instanceof Error || _messageOrErrorOrChannel instanceof ErrorEvent) {
      error = _messageOrErrorOrChannel
    } else if (_messageOrErrorOrProps instanceof Error || _messageOrErrorOrProps instanceof ErrorEvent) {
      error = _messageOrErrorOrProps
    } else if (_errorOrProps instanceof Error || _errorOrProps instanceof ErrorEvent) {
      error = _errorOrProps
    }

    let additionalProperties: LogProps = {}
    if (
      typeof _messageOrErrorOrProps !== "string" &&
      !(_messageOrErrorOrProps instanceof Error || _messageOrErrorOrProps instanceof ErrorEvent)
    ) {
      // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
      additionalProperties = _messageOrErrorOrProps
    } else if (
      typeof _errorOrProps !== "string" &&
      !(_errorOrProps instanceof Error || _errorOrProps instanceof ErrorEvent)
    ) {
      // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
      additionalProperties = _errorOrProps
    } else {
      // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
      additionalProperties = _props
    }

    // Prepare log
    const { formattedMessage, formattedError, formattedMessageWithError } = SpatialLogger.getFormattedMessage(
      channel,
      message,
      error
    )
    let stackTrace: string
    if (error instanceof Error) {
      // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library
      stackTrace = error.stack
    }

    // Console
    if (level.value <= SpatialLogger.maxLevelConsole) {
      const params = []
      const channelString = channel === DefaultLogChannel ? "" : `[${channel.name}] `
      // Don't duplicate error description
      if (formattedMessageWithError && !error) params.push(formattedMessageWithError)
      // And still show message if there is one
      else if (message && error) params.push(`${channelString}${message}`)
      // But show a non-default channel even if no message at all
      else if (channelString !== "") params.push(channelString.trim())
      if (error) params.push(error)
      if (additionalProperties) params.push(additionalProperties)
      level.consoleMethod(...params)
    }

    // Remote
    if (level.value > SpatialLogger.maxLevelRemote) {
      return
    }
    axios
      .post(
        SpatialLogger.remoteUrl,
        {
          level: level.name,
          channel: channel.name,
          ...(formattedMessage ? { message: formattedMessage } : {}),
          ...(formattedError ? { error: formattedError } : {}),
          // @ts-ignore TODO(DEV-10565): This error is introduced from TS strict mode when moving this file to a library: refactor this file. This error is introduced from TS strict mode
          // when abstracting the logger as its own library
          ...(stackTrace ? { stackTrace } : {}),
          ...additionalProperties,
          ...SpatialLogger.properties,
          location: {
            /* eslint-disable-next-line */
            href: location.href,
            /* eslint-disable-next-line */
            pathname: location.pathname,
          },
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      // Never throw an error; send logs as best effort.
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {})
  }

  private static getFormattedMessage(channel: LogChannel, message: string, error: LoggableError) {
    let formattedMessage = ""
    let formattedError = ""
    let formattedMessageWithError = ""

    // Message
    if (message) {
      if (channel !== DefaultLogChannel) {
        formattedMessage += `[${channel.name}] `
      }
      formattedMessage += `${message}`
    }
    formattedMessage = formattedMessage.trim()

    // Error
    if (error instanceof Error) {
      if (error.name && error.message) {
        formattedError += `${error.message} [${error.name}]`
      } else {
        formattedError += `${error.toString()}`
      }
    } else if (error instanceof ErrorEvent) {
      if (error.type || error.message || error.error) {
        formattedError += `[ErrorEvent] -- ${error.type} -- ${error.message} -- ${error.error}`
      } else {
        formattedError += `${error.toString()}`
      }
    }
    formattedError = formattedError.trim()

    // Combined
    formattedMessageWithError = `${formattedMessage}\n    ${formattedError}`
    formattedMessageWithError = formattedMessageWithError.trim()

    return {
      formattedMessage: formattedMessage || null,
      formattedError: formattedError || null,
      formattedMessageWithError,
    }
  }
}
