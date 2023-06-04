import { objectId } from "@spatialsys/js/util/bson"
import { SPATIAL_UID_COOKIE_AGE, SPATIAL_UID_COOKIE_NAME } from "@spatialsys/js/util/constants"
import { getCookieValue } from "@spatialsys/js/util/cookies"
import { logger } from "@spatialsys/web/logger"
import { setSpatialUidHeaders } from "@spatialsys/web/sapi"

let spatialUid = ""

export function getSpatialUid() {
  return spatialUid
}

/**
 * Generates a new Spatial UID. Has the following side-effects:
 * - Sets the request header on all SAPI requests
 * - Updates the browser's cookie to store the new Spatial UID
 * - Updates the private `spatialUid` variable
 */
export function generateSpatialUid() {
  spatialUid = objectId()
  setSpatialUidHeaders(spatialUid)

  if (typeof document !== "undefined") {
    document.cookie = `${SPATIAL_UID_COOKIE_NAME}=${spatialUid}; path=/; samesite=lax, maxAge=${SPATIAL_UID_COOKIE_AGE}; httpOnly=false;`
  }
}

/**
 * Reads Spatial UID from the cookie, or generates a new one if it doesn't exist.
 * - Sets the Spatial UID headers for all SAPI requests.
 * - Identifies the user in Mixpanel.
 */
export function setSpatialUid(): string {
  if (typeof document !== "undefined") {
    const cookieValue = getCookieValue(document.cookie, SPATIAL_UID_COOKIE_NAME)

    // This should never happen, but if cookie doesn't exist, we'll generate a new ID
    if (!cookieValue) {
      generateSpatialUid()
      logger.error("Spatial UID cookie not found. Generating new Spatial UID.")
    } else {
      spatialUid = cookieValue
    }

    /**
     * We must set the session ID in the `useState`, even though it's a side-effect
     * This is because React Query executes requests in an observer initialized in a `useState`, which means the requests are sent
     * prior to useEffects being run.
     *
     * We'll only bother setting headers on the client.
     */
    setSpatialUidHeaders(spatialUid)
  }

  return spatialUid
}
