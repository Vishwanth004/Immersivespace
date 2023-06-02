import { getAuth, inMemoryPersistence } from "firebase/auth"
import { call, fork, join, put, select, takeLatest, takeLeading } from "typed-redux-saga/macro"

import { InteractionName, trackEvent } from "@spatialsys/react/analytics"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilChanged, waitUntilTrue } from "@spatialsys/use-saga"
import { track } from "@spatialsys/web/analytics"
import { initializeNotifications } from "@spatialsys/web/app-context"
import { firebaseApp } from "@spatialsys/web/app-context/firebase-app"
import {
  ActionType,
  Actions,
  AppState,
  AuthStatus,
  AuthenticateAuthless,
  NoAuthError,
  SetAuthSuccess,
  UserUnauthenticatedError,
} from "@spatialsys/web/app-state"
import { PerformanceMonitorLogChannel } from "@spatialsys/web/core/js/analytics/performance-monitor"
import { checkWalletAddress, startAuthlessSession } from "@spatialsys/web/core/js/auth/auth"
import { parseEmailVerificationParams } from "@spatialsys/web/core/js/auth/email-verification"
import { initialAuth } from "@spatialsys/web/core/js/auth/sagas/auth-startup"
import { loginWithEmailPw } from "@spatialsys/web/core/js/auth/sagas/connections/email-pw"
import { loginWithConnection } from "@spatialsys/web/core/js/auth/sagas/connections/login-with-connection"
import { watchMetamaskAccountsChanged } from "@spatialsys/web/core/js/auth/sagas/connections/metamask"
import { scheduleRefreshSession } from "@spatialsys/web/core/js/auth/sagas/refresh-session"
import { VERIFY_EMAIL } from "@spatialsys/web/core/js/util/error-type"
import { logger } from "@spatialsys/web/logger"
import { sapiAuthClient } from "@spatialsys/web/sapi"

import { AuthLogChannel } from "../log-channel"
import { authChangeSaga } from "./handle-auth-change-saga"
import { userSaga } from "./user-saga"

export function* authSaga() {
  // Check for navigator to prevent accessing browser storage on the server
  // We only need to set the persistence for the browser
  if (typeof navigator !== "undefined") {
    void getAuth(firebaseApp).setPersistence(inMemoryPersistence)
  }
  yield* fork(userSaga)
  yield* fork(observeAccessTokenChanged)
  yield* fork(authChangeSaga)
  // Important to use `takeLeading. We don't want to cancel `authenticate` while it's being executed
  yield* takeLeading(ActionType.Authenticate, authenticate)
  yield* takeLeading(ActionType.AuthenticateAuthless, authenticateAuthless)
  yield* takeLatest(ActionType.SetAuthSuccess, scheduleRefreshSession)
  yield* takeLatest(ActionType.SetAuthSuccess, handleSetAuthSuccess)
  yield* takeLatest(ActionType.SetAuthSuccess, callPostLogin)
  yield* takeLatest(ActionType.LoginWithConnection, loginWithConnection)
  yield* takeLatest(ActionType.LoginWithEmailPw, loginWithEmailPw)
  yield* takeLatest(ActionType.VerifyEmail, verifyEmail)

  // Select the initial auth state. If authenticated, we manually call `scheduleRefreshSession`
  // to start the refresh loop since `SetAuthSuccess` is not dispatched when the initial auth state is autehnticated.
  // Otherwise, dispatching `SetAuthSuccess` will call `scheduleRefreshSession`.
  const authState = yield* select((state: AppState) => state.auth)
  if (authState.status === AuthStatus.Authenticated) {
    yield* call(scheduleRefreshSession, { payload: authState })
  }
}

/**
 * Attempt to authenticate
 */
export function* authenticate() {
  const startTime = performance.now()
  logger.info(PerformanceMonitorLogChannel, "Web app Begin Auth", {
    startTime,
  })

  try {
    const authState = yield* call(initialAuth)
    const endTime = performance.now()
    logger.info(PerformanceMonitorLogChannel, "Web app authenticated successfully", {
      authProvider: authState.provider,
      milliseconds: endTime - startTime,
    })

    // Check that their wallet address matches their currently selected wallet.
    if (authState.publicAddress) {
      try {
        yield* fork(watchMetamaskAccountsChanged)
        yield* call(checkWalletAddress, authState.publicAddress)
      } catch (err) {
        logger.error(AuthLogChannel, "Wallet address mismatch")
        yield* put(
          Actions.setAuthState({
            ...authState,
            authenticationError: err,
            status: AuthStatus.AuthenticationError,
          })
        )
        return
      }
    }

    // We've authenticated successfully!
    yield* put(Actions.setAuthSuccess(authState))
  } catch (error) {
    const endTime = performance.now()
    logger.info(PerformanceMonitorLogChannel, "Web app auth error", {
      milliseconds: endTime - startTime,
    })
    logger.error(AuthLogChannel, "Received error while authenticating", error)

    if (error?.errorDescription === VERIFY_EMAIL) {
      yield* put(Actions.setAuthenticationError(error))
      return
    }

    yield* put(Actions.setAuthenticationError(new UserUnauthenticatedError()))
    return
  }
}

export function* handleSetAuthSuccess({ payload: authState }: SetAuthSuccess) {
  if (!authState.accessToken) {
    return
  }

  UnityMessages.updateAccessToken(authState.accessToken)

  const { provider, loginMethod, useAuthlessToken, emailVerificationStatus } = authState
  trackEvent(
    track,
    { name: InteractionName.AuthSuccess },
    { provider, loginMethod, useAuthlessToken, emailVerificationStatus }
  )

  yield* waitUntilTrue((state: AppState) => state.unity.appState.isLoggedIn)
  UnityMessages.updateAccessToken(authState.accessToken)

  // We don't `waitUntil` because if we haven't already started the task by this point
  // then there's a reason (e.g. unit testing).
  const swRegTask = yield* select((state: AppState) => state.serviceWorkerRegistrationTask)
  if (!swRegTask) {
    return
  }
  const serviceWorkerRegistration = yield* join(swRegTask)
  // If the registration failed, there's nothing to do.
  if (!serviceWorkerRegistration) {
    return
  }
  yield* call(initializeNotifications, serviceWorkerRegistration)
}

/**
 * Attempts to verify the user's email by parsing the URL for a valid "ticket"
 */
export function* verifyEmail() {
  const initState = yield* call(parseEmailVerificationParams)
  if (initState.ticket) {
    try {
      const res = yield* call(sapiAuthClient.verify.verifyEmailTicket, { ticket: initState.ticket })
      yield* put(
        Actions.setEmailVerification({
          email: initState.email,
          publicAddress: initState.publicAddress,
          hasVerifiedSuccessfully: res?.verified,
        })
      )
      return
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  yield* put(
    Actions.setEmailVerification({
      email: initState.email,
      publicAddress: initState.publicAddress,
      hasVerifiedSuccessfully: false,
    })
  )
}

/**
 * Attempts to start an "authless" session (get noauth token to join a public space)
 */
function* authenticateAuthless({ payload: { roomId, shareId } }: AuthenticateAuthless) {
  try {
    const authState = yield* call(startAuthlessSession, roomId, shareId)
    yield* put(Actions.setAuthSuccess(authState))
  } catch (err) {
    yield* put(Actions.setAuthenticationError(new NoAuthError(roomId, shareId)))
  }
}

/**
 * Tracks changes to the access token, and syncs it with Unity.
 * Proactive fix for DEV-16973, where it appears that the token is being refreshed but not propagated to Unity.
 */
function* observeAccessTokenChanged() {
  while (true) {
    const [newAccessToken] = yield* waitUntilChanged((state: AppState) => state.auth?.accessToken)
    if (newAccessToken) {
      yield* waitUntilTrue((state: AppState) => state.unity.appState.isLoggedIn)
      yield* call(UnityMessages.updateAccessToken, newAccessToken)
    }
  }
}

/**
 * Call SAPI to merge Mixpanel profiles. Intended to be called after a successful login.
 */
function* callPostLogin() {
  try {
    yield* call(sapiAuthClient.postLogin)
  } catch (err) {
    // Swallow error
    logger.error(AuthLogChannel, "Error calling post-login", err)
  }
}
