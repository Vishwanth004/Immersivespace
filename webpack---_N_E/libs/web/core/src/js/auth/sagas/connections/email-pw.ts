import { getAuth, signInWithCustomToken } from "firebase/auth"
import { call, put } from "typed-redux-saga/macro"

import { Actions, LoginWithEmailPw } from "@spatialsys/web/app-state"
import { getTokenForFirebaseUser } from "@spatialsys/web/core/js/auth/auth"
import { sapiAuthClient } from "@spatialsys/web/sapi"

/** Attempts to log in with email password by calling SAPI (Firebase) */
export function* loginWithEmailPw({ payload }: LoginWithEmailPw) {
  try {
    const resp = yield* call(sapiAuthClient.emailPw.login, payload)
    const firebaseAuth = yield* call(getAuth)
    const credentials = yield* call(signInWithCustomToken, firebaseAuth, resp.accessToken)
    const authState = yield* call(getTokenForFirebaseUser, credentials.user)

    if (payload.forceRedirect) {
      window.location.reload()
    } else {
      yield* put(Actions.setAuthSuccess(authState))
    }
  } catch (error) {
    yield* put(Actions.setLoginError(error))
  }
}
