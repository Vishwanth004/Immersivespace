import { getAuth, getRedirectResult } from "firebase/auth"

import { SIGN_IN_WITH_REDIRECT_COOKIE_NAME } from "@spatialsys/js/util/constants"
import { getDeleteCookieString } from "@spatialsys/js/util/cookies"
import { firebaseApp } from "@spatialsys/web/app-context/firebase-app"
import { UserUnauthenticatedError } from "@spatialsys/web/app-state"
import { getTokenForFirebaseUser } from "@spatialsys/web/core/js/auth/auth"
import { logger } from "@spatialsys/web/logger"

import { AuthLogChannel } from "../log-channel"

/**
 * Handles redirect result from Firebase's `signInWithRedirect`
 * See: https://firebase.google.com/docs/reference/js/auth.md#getredirectresult
 *
 * Always removes the `SIGN_IN_WITH_REDIRECT_COOKIE_NAME` cookie.
 */
export async function handleFirebaseRedirectResult() {
  const auth = getAuth(firebaseApp)
  try {
    const res = await getRedirectResult(auth)
    // Setting a cookie is done by writing into `document.cookie`.
    // This does not affect other cookies that are present, it only updates a single cookie at a time
    // Docs: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    document.cookie = getDeleteCookieString(SIGN_IN_WITH_REDIRECT_COOKIE_NAME)
    if (res) {
      return await getTokenForFirebaseUser(res.user)
    }

    // This can return `null` if no redirect operation was called.
    // In that case, still throw an error.
    throw new UserUnauthenticatedError()
  } catch (error) {
    logger.error(AuthLogChannel, "Login with redirect was unsuccessful", error)
    document.cookie = getDeleteCookieString(SIGN_IN_WITH_REDIRECT_COOKIE_NAME)
    throw error
  }
}
