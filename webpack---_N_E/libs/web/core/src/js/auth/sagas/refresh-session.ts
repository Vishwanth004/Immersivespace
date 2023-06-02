import { call, delay, put } from "typed-redux-saga/macro"

import { Actions, AuthProvider, SetAuth } from "@spatialsys/web/app-state"
import { createAndFormatAuthState, logout } from "@spatialsys/web/core/js/auth/auth"
import { logger } from "@spatialsys/web/logger"
import { nextApiClient } from "@spatialsys/web/sapi"

import { AuthLogChannel } from "../log-channel"

const OFFSET_MS = 3 * 1000 * 60 // 3 minutes
const DEFAULT_REFRESH_MS = 30 * 1000 * 60 // 30 minutes. firebase tokens expire in 1 hour, it's safer to refresh more aggressively.

/**
 * Schedules a timer to refresh our auth token.
 * We store our accessToken in global state, and don't call Firebase on every API call to fetch a token (like most guides would recommend)
 * Instead, schedule a timer to refresh the token {@link OFFSET_MS} minutes prior to expiry.
 */
export function* scheduleRefreshSession({ payload: authState }: SetAuth) {
  const timeout = yield* call(getTimeoutWithOffset, authState.expiresAt)
  yield* delay(timeout)
  try {
    const newAuthState = yield* call(refreshSession, authState.provider)
    yield* put(Actions.setAuthSuccess(newAuthState)) // Dispatching this action will re-schedule a new renewal!
  } catch {
    // Unable to refresh for some reason, log the user out. Errors are logged in `refreshSession`
    yield* call(logout)
  }
}

/**
 * Attempts to renew (refresh) the auth session by refreshing the existing token
 * via our Next.js API.
 */
export function* refreshSession(authProvider: AuthProvider) {
  logger.info("Renewing auth session")
  try {
    const { idToken, expiresAt } = yield* call(nextApiClient.auth.refreshAuthSession)
    return createAndFormatAuthState(idToken, expiresAt, false, AuthProvider.Firebase)
  } catch (error) {
    logger.error(AuthLogChannel, "Error attempting to renew session", error, { authProvider })
    throw error
  }
}

/**
 * Calculates how long to set the timeout for, with an offset
 * so that we refresh before the token before it actually expires
 */
export function getTimeoutWithOffset(expiresAtInMsFromEpoch: number) {
  const now = Date.now()
  const expiresIn = expiresAtInMsFromEpoch - now

  if (expiresIn <= 0) {
    // This should be impossible, log this error so that it's tracked.
    logger.error(AuthLogChannel, `Unable to schedule refresh, got token that expires too soon.`, {
      expiresAt: expiresAtInMsFromEpoch,
    })
  }

  let timeout = 0
  // If timeout is less more than `OFFSET_MS`, refresh in `DEFAULT_REFRESH_MS`
  // Otherwise, refresh immediately
  if (expiresIn > OFFSET_MS) {
    timeout = DEFAULT_REFRESH_MS
  }

  return timeout
}
