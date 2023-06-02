const WEB_URL = typeof self !== "undefined" && typeof self.location !== "undefined" ? self.location.origin : ""
const WEB_HOST = typeof self !== "undefined" && typeof self.location !== "undefined" ? self.location.host : ""

declare const process: CustomProcess

interface CustomProcess extends NodeJS.Process {
  env: NodeJS.ProcessEnv & CustomEnv
}

type DeploymentEnvironment = "production" | "staging" | "development"

interface CustomEnv {
  NEXT_PUBLIC_API_URL: string
  NEXT_PUBLIC_CAN_UPLOAD_GLB: string
  NEXT_PUBLIC_CANONICAL_URL_ORIGIN: string
  NEXT_PUBLIC_CHANNEL_NAME: string
  NEXT_PUBLIC_DEPLOYMENT_ENV: DeploymentEnvironment
  NEXT_PUBLIC_DYNAMIC_LINK_URL: string
  NEXT_PUBLIC_DYNAMIC_LINK_REDIRECT_URL: string
  NEXT_PUBLIC_FAN_URL: string
  NEXT_PUBLIC_FAVICON_SUFFIX: string
  NEXT_PUBLIC_FIREBASE_API_KEY: string
  NEXT_PUBLIC_FIREBASE_APP_ID: string
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
  NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY: string
  NEXT_PUBLIC_IOS_BUNDLE_ID: string
  NEXT_PUBLIC_IOS_APP_STORE_ID: string
  NEXT_PUBLIC_ANDROID_PACKAGE_NAME: string
  NEXT_PUBLIC_MARKERIO_DESTINATION: string
  NEXT_PUBLIC_MIXPANEL_TOKEN: string
  NEXT_PUBLIC_PUBLIC_ASSETS_BASE_URL: string
  NEXT_PUBLIC_SHORT_SHA_LAST_UNITY_CHANGE: string
  NEXT_PUBLIC_SPATIAL_UNITY_DATA_SIZE: string
  NEXT_PUBLIC_SPATIAL_UNITY_WASM_SIZE: string
  NEXT_PUBLIC_STREAM_API_KEY: string
  NEXT_PUBLIC_STRIPE_PK: string
  NEXT_PUBLIC_SPATIAL_UNITY_VERSION: string
  SENTRY_DSN: string
  NEXT_PUBLIC_SENTRY_DSN: string
  NEXT_PUBLIC_SENTRY_ENVIRONMENT: string
  NEXT_PUBLIC_COPY_LOCAL_BUILD: string
  NEXT_PUBLIC_USE_LOCAL_UNITY_BUILD: string
  RENDER_RESET_PASSWORD_PAGE: string
  CUSTOMER_IO_SITE_ID: string
  CUSTOMER_IO_API_KEY: string
}

const Config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  AUTHLESS_AVATAR_BASE_URL: `${process.env.NEXT_PUBLIC_PUBLIC_ASSETS_BASE_URL}/authless-rpm-avatars`,
  CAN_UPLOAD_GLB: process.env.NEXT_PUBLIC_CAN_UPLOAD_GLB,
  CANONICAL_URL_ORIGIN: process.env.NEXT_PUBLIC_CANONICAL_URL_ORIGIN,
  CHANNEL_NAME: process.env.NEXT_PUBLIC_CHANNEL_NAME,
  DEPLOYMENT_ENV: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV || "development",
  DYNAMIC_LINK_URL: process.env.NEXT_PUBLIC_DYNAMIC_LINK_URL,
  // The redirect URL of a dynamic link: mobile apps open only www.spatial.io or staging.spatial.io, they do not support deploy preview links
  DYNAMIC_LINK_REDIRECT_URL: process.env.NEXT_PUBLIC_DYNAMIC_LINK_REDIRECT_URL,
  FAN_URL: process.env.NEXT_PUBLIC_FAN_URL,
  FAVICON_PATH: process.env.NEXT_PUBLIC_FAVICON_SUFFIX,
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  FIREBASE_PUBLIC_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY,
  IOS_BUNDLE_ID: process.env.NEXT_PUBLIC_IOS_BUNDLE_ID,
  IOS_APP_STORE_ID: process.env.NEXT_PUBLIC_IOS_APP_STORE_ID,
  ANDROID_PACKAGE_NAME: process.env.NEXT_PUBLIC_ANDROID_PACKAGE_NAME,
  MARKERIO_DESTINATION: process.env.NEXT_PUBLIC_MARKERIO_DESTINATION,
  MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  PUBLIC_ASSETS_BASE_URL: process.env.NEXT_PUBLIC_PUBLIC_ASSETS_BASE_URL,
  SPATIAL_UNITY_BUILD_PATH: "spatial-webgl",
  SPATIAL_UNITY_ASSET_BUNDLES_PATH: "asset-bundles",
  SPATIAL_UNITY_DATA_SIZE: Number(process.env.NEXT_PUBLIC_SPATIAL_UNITY_DATA_SIZE),
  SPATIAL_UNITY_WASM_SIZE: Number(process.env.NEXT_PUBLIC_SPATIAL_UNITY_WASM_SIZE),
  // Used for finding the webGL version to point to. This is set to the most recent commit where `SpatialUnity` changed
  SHORT_SHA_LAST_UNITY_CHANGE: process.env.NEXT_PUBLIC_SHORT_SHA_LAST_UNITY_CHANGE,
  STREAM_API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY,
  STRIPE_PK: process.env.NEXT_PUBLIC_STRIPE_PK,
  SPATIAL_UNITY_VERSION: process.env.NEXT_PUBLIC_SPATIAL_UNITY_VERSION?.trim(),
  WEB_HOST,
  WEB_URL,
  SENTRY_DSN: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",
  SENTRY_ORG_SLUG: "spatial",
  SENTRY_PROJECT_SLUG: "spatial-web",
  ASSUME_UNITY_BUILD_COMPRESSED: process.env.NEXT_PUBLIC_COPY_LOCAL_BUILD !== "true",
  COPY_LOCAL_UNITY_BUILD: process.env.NEXT_PUBLIC_COPY_LOCAL_BUILD === "true",
  USE_LOCAL_UNITY_BUILD: process.env.NEXT_PUBLIC_USE_LOCAL_UNITY_BUILD === "true",
  RENDER_RESET_PASSWORD_PAGE: process.env.RENDER_RESET_PASSWORD_PAGE === "true",
  CUSTOMER_IO_SITE_ID: process.env.NEXT_PUBLIC_CUSTOMER_IO_SITE_ID,
  CUSTOMER_IO_API_KEY: process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY,
} as const

/**
 * If true, the webapp is running in a local development environment.
 */
export const isDevelopment = Config.DEPLOYMENT_ENV === "development"
/**
 * If true, the webapp is currently running on the production domain. Used to enable features that should only be enabled on production.
 */
export const isProductionHost = WEB_HOST === process.env.NEXT_PUBLIC_PRODUCTION_HOST

export type ConfigT = typeof Config

export default Config
