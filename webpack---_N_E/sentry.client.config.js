var _sentryCollisionFreeGlobalObject = typeof window === "undefined" ? global : window;
_sentryCollisionFreeGlobalObject["__sentryRewritesTunnelPath__"] = undefined;
_sentryCollisionFreeGlobalObject["SENTRY_RELEASE"] = {
    "id": "6.68.1_2e05a596aea86323d27696bf56302ea363442b4f"
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