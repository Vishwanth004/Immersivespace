import { FirebaseError } from "firebase/app"
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth"
import { call, put } from "typed-redux-saga/macro"

import { SIGN_IN_WITH_REDIRECT_COOKIE_VALUE } from "@spatialsys/js/util/constants"
import { firebaseApp } from "@spatialsys/web/app-context/firebase-app"
import { Actions, AuthConnection } from "@spatialsys/web/app-state"
import { getTokenForFirebaseUser } from "@spatialsys/web/core/js/auth/auth"
import { AuthLogChannel } from "@spatialsys/web/core/js/auth/log-channel"
import { logger } from "@spatialsys/web/logger"

type FirebaseConnection = Exclude<AuthConnection, AuthConnection.MetaMask>

const appleProvider = new OAuthProvider("apple.com")
appleProvider.addScope("email")

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope("profile")
googleProvider.addScope("email")

const microsoftProvider = new OAuthProvider("microsoft.com")
microsoftProvider.addScope("profile")
microsoftProvider.addScope("email")

const connectionProviderMap: Record<FirebaseConnection, OAuthProvider | GoogleAuthProvider> = {
  [AuthConnection.Google]: googleProvider,
  [AuthConnection.Apple]: appleProvider,
  [AuthConnection.Microsoft]: microsoftProvider,
}

/**
 * Attempts to sign in with Firebase connection. Signs in with popup on desktop and redirect on mobile
 *
 * @param forceRedirect If true, uses a full-page redirect flow for logging in instead of the popup flow.
 */
export function* loginWithFirebaseConnection(connection: FirebaseConnection, forceRedirect?: boolean) {
  if (forceRedirect) {
    yield* call(loginWithRedirect, connection)
  } else {
    yield* call(loginWithPopup, connection)
  }
}

export function* loginWithPopup(connection: FirebaseConnection) {
  const firebaseAuth = getAuth(firebaseApp)
  const provider = connectionProviderMap[connection]

  try {
    const credentials = yield* call(signInWithPopup, firebaseAuth, provider)
    const authState = yield* call(getTokenForFirebaseUser, credentials.user)
    yield* put(Actions.setAuthSuccess(authState))
  } catch (error) {
    logger.error(
      AuthLogChannel,
      `Received error while authenticating with Firebase (popup) with connection ${connection}`,
      error
    )

    if (error instanceof FirebaseError) {
      // If the popup is blocked for some reason... try with redirect.
      if (error.code === AuthErrorCodes.POPUP_BLOCKED) {
        yield* call(loginWithRedirect, connection)
        return
      }
    }

    yield* put(Actions.setLoginError(error))
  }
}

export function* loginWithRedirect(connection: FirebaseConnection) {
  const firebaseAuth = getAuth(firebaseApp)
  const provider = connectionProviderMap[connection]

  try {
    // When we try to sign in with redirect, we set a cookie so that we can detect if the user just attempted to sign in
    document.cookie = SIGN_IN_WITH_REDIRECT_COOKIE_VALUE
    yield* call(signInWithRedirect, firebaseAuth, provider)
  } catch (error) {
    logger.error(
      AuthLogChannel,
      `Received error while authenticating with Firebase (redirect) with connection ${connection}`,
      error
    )

    yield* put(Actions.setLoginError(error))
  }
}

export const TEST_ONLY = {
  googleProvider,
}
