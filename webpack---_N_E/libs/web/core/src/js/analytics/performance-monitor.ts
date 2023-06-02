/**
 * Compute various metrics using Performance API for performance monitoring
 * - https://developer.mozilla.org/en-US/docs/Web/API/Performance
 */
import { once } from "lodash"

import { RoomJoinMethod, SpaceJoinContextState } from "@spatialsys/unity/app-state"
import { Mixpanel } from "@spatialsys/web/analytics"
import { LogChannel, logger } from "@spatialsys/web/logger"

const BRIDGE_TIMING_EVENT_NAME = "Unity to JS Bridge Timing"

export const PerformanceMonitorLogChannel = new LogChannel("PerformanceMonitor")

let unityRoomJoinTime: number | null = null
let unityBootStartTime: number | null = null
let joinContext: SpaceJoinContextState | null = null

export const computeTotalEncodedBodySize = (): number => {
  const resourceEntries: any[] = Array.from(window.performance.getEntriesByType("resource"))
  const totalSize = resourceEntries.map((entry) => entry.encodedBodySize).reduce((a, b) => a + b, 0)
  return totalSize
}

export const computeTotalDecodedBodySize = (): number => {
  const resourceEntries: any[] = Array.from(window.performance.getEntriesByType("resource"))
  const totalSize = resourceEntries.map((entry) => entry.decodedBodySize).reduce((a, b) => a + b, 0)
  return totalSize
}

export const computeTotalTransferSize = (): number => {
  const resourceEntries: any[] = Array.from(window.performance.getEntriesByType("resource"))
  const totalSize = resourceEntries.map((entry) => entry.transferSize).reduce((a, b) => a + b, 0)
  return totalSize
}

export const computePageUptime = (): number | null => {
  // evaluate pageLoadTime with window.performance API - https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
  const timings = window.performance.getEntriesByType("navigation")
  // Safari returns an empty array
  if (timings.length < 1) {
    return null
  }
  const [performanceEntry] = timings
  const pageUptime = window.performance.now() - performanceEntry.startTime
  return pageUptime
}

export const computeMemoryInfo = (): MemoryInfo | undefined => {
  return performance.memory
}

export const reportSpaceListContentLoaded = () => {
  // If Unity already started booting before the room list loaded, it's likely that the user
  // joined a space directly, then went back to /rooms, in which case this uptime value
  // will start well above 0; don't report space list load time in this case
  if (!unityBootStartTime) {
    reportSpaceListContentLoadedOnce()
  }
}

const reportSpaceListContentLoadedOnce = once(() => {
  const uptime = computePageUptime()

  if (uptime) {
    logger.info(PerformanceMonitorLogChannel, "Space List Content Loaded", {
      milliseconds: uptime,
    })
    Mixpanel.track("Space List Load Finished", { milliseconds: uptime })
  }
})

export const reportUnityDownloaded = once(() => {
  const uptime = computePageUptime()

  if (uptime) {
    const encodedBodySize = computeTotalEncodedBodySize()
    const decodedBodySize = computeTotalDecodedBodySize()
    const transferSize = computeTotalTransferSize()
    logger.info(PerformanceMonitorLogChannel, "Unity Downloaded", {
      uptimeMilliseconds: uptime,
      encodedBodySize: encodedBodySize,
      decodedBodySize: decodedBodySize,
      transferSize: transferSize,
    })
    Mixpanel.track("Unity Download Finished", {
      milliseconds: uptime,
      encodedBodySize: encodedBodySize,
      decodedBodySize: decodedBodySize,
      transferSize: transferSize,
    })
  }
})

export const reportUnityStartedBoot = () => {
  unityBootStartTime = computePageUptime()
  logger.info(PerformanceMonitorLogChannel, "Unity Boot Begin", {
    uptimeMilliseconds: unityBootStartTime,
  })
  Mixpanel.track("Unity Boot Begin", { uptimeMilliseconds: unityBootStartTime })
}

export const reportUnityFinishedBootAndLogin = once(() => {
  const uptime = computePageUptime()

  if (uptime && unityBootStartTime) {
    const time = uptime - unityBootStartTime
    logger.info(PerformanceMonitorLogChannel, "Unity Booted + Logged In", {
      milliseconds: time,
      uptimeMilliseconds: uptime,
    })
    Mixpanel.track("Unity Startup Finished", { milliseconds: time, uptimeMilliseconds: uptime })
  }
})

export const setJoinContext = (context: SpaceJoinContextState) => {
  joinContext = context
}

export const reportUnityStartedRoomJoin = () => {
  unityRoomJoinTime = computePageUptime()
}

export const reportUnityFinishedRoomJoin = once(() => {
  const uptime = computePageUptime()
  if (uptime && unityRoomJoinTime) {
    const memoryInfo = computeMemoryInfo()
    const time = uptime - unityRoomJoinTime
    logger.info(PerformanceMonitorLogChannel, "Unity Room Joined", {
      uptimeMilliseconds: uptime,
      milliseconds: time,
      memoryInfo: memoryInfo,
    })
    Mixpanel.track("Unity Room Join Finished", {
      milliseconds: time,
      uptimeMilliseconds: uptime,
      RoomJoinMethod: RoomJoinMethod[joinContext.method],
    })
  }
})

export const reportUnityFinishedTimeToRoomVisible = once(() => {
  const uptime = computePageUptime()
  if (uptime && unityRoomJoinTime) {
    const memoryInfo = computeMemoryInfo()
    const time = uptime - unityRoomJoinTime
    logger.info(PerformanceMonitorLogChannel, "Unity Time to Room Visible", {
      milliseconds: time,
      uptimeMilliseconds: uptime,
      RoomJoinMethod: RoomJoinMethod[joinContext.method],
      memoryInfo: memoryInfo,
    })
    Mixpanel.track("Unity Time to Room Visible", { milliseconds: time, uptimeMilliseconds: uptime })
  }
})

export const reportBridgeMessageTiming = ({
  msgName,
  serialize,
  parse,
  transit,
}: {
  msgName: string
  serialize: number
  parse: number
  transit: number
}) => {
  const payload = {
    msgName,
    serialize,
    parse,
    transit,
    total: serialize + transit + parse,
  }
  logger.debug(PerformanceMonitorLogChannel, BRIDGE_TIMING_EVENT_NAME, payload)
}
