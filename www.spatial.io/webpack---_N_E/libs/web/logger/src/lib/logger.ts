import { LogLevels, SpatialLogger } from "@spatialsys/js/logger"
import Config from "@spatialsys/web/config"

SpatialLogger.initialize({
  tags: ["web", Config.DEPLOYMENT_ENV],
  maxLevelConsole: Config.DEPLOYMENT_ENV === "production" ? LogLevels.INFO.value : LogLevels.TRACE.value,
  maxLevelRemote: Config.DEPLOYMENT_ENV === "production" ? LogLevels.INFO.value : LogLevels.DEBUG.value,
})

export const logger = new SpatialLogger()
