import { getAuth, signInWithCustomToken } from "firebase/auth"
import { eventChannel } from "redux-saga"
import { call, fork, put, select, take } from "typed-redux-saga/macro"

import { AuthenticateWithEthereumResponse } from "@spatialsys/js/sapi/types"
import {
  Actions,
  AppState,
  AuthState,
  AuthStatus,
  AuthSuccessPayload,
  MetaMaskRegisterAccountRequireEmailError,
} from "@spatialsys/web/app-state"
import {
  clearAuthSessionCookie,
  firebaseLogout,
  getTokenForFirebaseUser,
  unityLogout,
} from "@spatialsys/web/core/js/auth/auth"
import { getPublicAddress, signPersonalMessage } from "@spatialsys/web/core/js/auth/ethereum"
import { AuthLogChannel } from "@spatialsys/web/core/js/auth/log-channel"
import { logger } from "@spatialsys/web/logger"
import { sapiAuthClient } from "@spatialsys/web/sapi"
import { Storage } from "@spatialsys/web/storage"

/**
 * Attempts to sign in with Metamask
 *
 * @param forceRefresh If true, the page will be refreshed after successful authentication.
 */
export function* loginWithMetamask(forceRefresh = false) {
  let publicAddress: string

  // First, get the user's connected account from MetaMask
  try {
    publicAddress = yield* call(getPublicAddress)
  } catch (error) {
    logger.error(
      AuthLogChannel,
      "Received error while authenticating with MetaMask, failed to get their public address",
      error
    )
    yield* put(Actions.setLoginError(error))
    return
  }

  // Login/register with this public address
  let resp: AuthenticateWithEthereumResponse
  try {
    resp = yield* call(sapiAuthClient.ethereum.authenticateWithEthereum, publicAddress)
    if (resp.requireEmail) {
      // Email address required for new account. throw specific error to render a page to collect the email address.
      yield* put(Actions.setLoginError(new MetaMaskRegisterAccountRequireEmailError(publicAddress, resp)))
      return
    }
  } catch (error) {
    logger.error(
      AuthLogChannel,
      "Received error while authenticating with MetaMask, error from authenticateWithEthereum",
      error
    )
    yield* put(Actions.setLoginError(error))
    return
  }

  // User has already created an account before, ask them to sign the nonce, then sign in
  try {
    const signedMessage = yield* call(signPersonalMessage, resp.message, publicAddress)
    const { token } = yield* call(sapiAuthClient.verify.verifySignature, publicAddress, signedMessage)
    const firebaseAuth = yield* call(getAuth)
    const credentials = yield* call(signInWithCustomToken, firebaseAuth, token)
    const authState = yield* call(getTokenForFirebaseUser, credentials.user)

    yield* fork(watchMetamaskAccountsChanged)
    yield* put(Actions.setAuthSuccess(authState))
    // We typically avoid doing side effects in sagas, but this is by far the simplest solution to
    // force refresh the page, rather than implementing it in the consumer, and a window reload is
    // a "safe" side effect.
    if (forceRefresh) {
      yield* call([window.location, window.location.reload])
    }
  } catch (error) {
    logger.error(AuthLogChannel, "Received error while authenticating with MetaMask, error signing the nonce", error)
    yield* put(Actions.setLoginError(error))
  }
}

/**
 * Registers an event listener on the `accountsChanged` event using eventChannel
 */
export function* watchMetamaskAccountsChanged() {
  if (window.ethereum) {
    // Create the channel, listening to accountsChanged event
    const accountChangedChannel = eventChannel<string[]>((emitter) => {
      window.ethereum.on("accountsChanged", emitter)

      return () => {
        window.ethereum.removeListener("accountsChanged", emitter)
      }
    })

    try {
      while (true) {
        const accountChangedEvent = yield* take(accountChangedChannel)
        yield* fork(checkWalletAddressMatch, accountChangedEvent)
      }
    } finally {
      accountChangedChannel.close()
    }
  }
}

function* checkWalletAddressMatch(accountChangedEvent: string[]) {
  const authState = yield* select((state: AppState) => state.auth)
  if (!authState.publicAddress) {
    return
  }
  const address: string | undefined = accountChangedEvent[0]?.toLowerCase()
  if (address === authState.publicAddress) {
    const newState = { ...authState, error: undefined } as AuthSuccessPayload
    yield* put(Actions.setAuthSuccess(newState))
  } else {
    const newState: AuthState = {
      useAuthlessToken: authState.useAuthlessToken,
      authenticationError: undefined,
      status: AuthStatus.AuthenticationError,
    }
    // this function is only mounted if a user logged in with metamask
    yield* call(unityLogout)
    yield* call(firebaseLogout)
    yield* call(clearAuthSessionCookie)
    // if it's a different account, erase any info we knew about their old account
    yield* put(Actions.setAuthState(newState))
    Storage.setItem(Storage.STORAGE_RETURN_URL_KEY, `${window.location.pathname}${window.location.search}`)
    window.location.pathname = "/login/metamask"
  }
}
