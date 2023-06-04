import { call } from "typed-redux-saga/macro"

import { SIGN_IN_WITH_REDIRECT_COOKIE_NAME } from "@spatialsys/js/util/constants"
import { getCookieValue } from "@spatialsys/js/util/cookies"
import { AuthProvider } from "@spatialsys/web/app-state"
import { createAndFormatAuthState } from "@spatialsys/web/core/js/auth/auth"
import { AuthLogChannel } from "@spatialsys/web/core/js/auth/log-channel"
import { handleFirebaseRedirectResult } from "@spatialsys/web/core/js/auth/session"
import { logger } from "@spatialsys/web/logger"
import { nextApiClient } from "@spatialsys/web/sapi"

/**
 * Initial auth attempt with server-side auth. Calls Next.js API route to verify the auth session from auth cookie.
 * Also handles the case where user tried to sign in with redirect.
 * Does not support Auth0 authentication whatsoever.
 */
export function* initialAuth() {
  const isInRedirectFlow = yield* call(getCookieValue, document.cookie, SIGN_IN_WITH_REDIRECT_COOKIE_NAME)
  if (isInRedirectFlow) {
    try {
      return yield* call(handleFirebaseRedirectResult)
    } catch (error) {
      logger.error(AuthLogChannel, "Failed to handle Firebase redirect result", error)
      // Swallow error, try to verify with Next.js API route.
    }
  }

  const { idToken, expiresAt } = yield* call(nextApiClient.auth.verifyAuthSession)
  return createAndFormatAuthState(idToken, expiresAt, false, AuthProvider.Firebase)
}
