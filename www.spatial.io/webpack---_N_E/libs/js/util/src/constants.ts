/**
 * For now, put constants here that are shared between web frontend and backend.
 * A better place may be `libs/js/constants` or `libs/web/constants`
 */

export const EPOCH_DATE_STRING = "Thu, 01 Jan 1970 00:00:00 GMT"
export const AUTH_SESSION_COOKIE_NAME = "auth_session"

export const SIGN_IN_WITH_REDIRECT_COOKIE_NAME = "sign_in_with_redirect"
const SIGN_IN_WITH_REDIRECT_COOKIE_MAX_AGE = 5 * 60 // 5 minutes

// See https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export const SIGN_IN_WITH_REDIRECT_COOKIE_VALUE = `${SIGN_IN_WITH_REDIRECT_COOKIE_NAME}=true; path=/; max-age=${SIGN_IN_WITH_REDIRECT_COOKIE_MAX_AGE}; samesite=lax`

export const SPATIAL_UID_COOKIE_NAME = "spatial_uid"
export const SPATIAL_UID_HEADER_NAME = "spatial-uid"
export const SPATIAL_UID_COOKIE_AGE = 365 * 24 * 60 * 60 // 1 year
