var _sentryCollisionFreeGlobalObject = typeof window === "undefined" ? global : window;
_sentryCollisionFreeGlobalObject["__sentryRewritesTunnelPath__"] = undefined;
_sentryCollisionFreeGlobalObject["SENTRY_RELEASE"] = {
    "id": "6.69.0_2d30fe944a5904f6746e983d795f7f27e60cd46e"
};
_sentryCollisionFreeGlobalObject["__rewriteFramesAssetPrefixPath__"] = "";

// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs"

import Config from "@spatialsys/web/config"

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: Config.DEPLOYMENT_ENV === "production" ? 0.04 : 1.0,
    environment: Config.SENTRY_ENVIRONMENT,
})