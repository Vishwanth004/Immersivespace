import Config, { ConfigT } from "./lib/config"

export type { ConfigT }
export default Config
export { isDevelopment, isProductionHost } from "./lib/config"
export * from "./lib/unity-version-utils"
