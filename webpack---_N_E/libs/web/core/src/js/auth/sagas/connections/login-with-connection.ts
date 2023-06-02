import { call, put, select } from "typed-redux-saga/macro"

import { Actions, AppState, AuthConnection, AuthStatus, LoginWithConnection } from "@spatialsys/web/app-state"
import { loginWithFirebaseConnection } from "@spatialsys/web/core/js/auth/sagas/connections/firebase-connections"
import { loginWithMetamask } from "@spatialsys/web/core/js/auth/sagas/connections/metamask"

/** Handle logging in with one of our supported auth connections */
export function* loginWithConnection({ payload }: LoginWithConnection) {
  const authStatus = yield* select((state: AppState) => state.auth.status)
  // We should never call this function in these states, do a no-op.
  if (authStatus === AuthStatus.Authenticating || authStatus === AuthStatus.LoggingIn) {
    return
  }

  yield* put(Actions.setIsLoggingIn(payload.authConnection))

  switch (payload.authConnection) {
    case AuthConnection.MetaMask:
      yield* call(loginWithMetamask, payload.forceRedirect)
      break

    default:
      yield* call(loginWithFirebaseConnection, payload.authConnection, payload.forceRedirect)
      break
  }
}
