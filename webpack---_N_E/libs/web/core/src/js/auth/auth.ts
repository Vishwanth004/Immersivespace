import { User as FirebaseUser, getAuth, getIdTokenResult } from "firebase/auth"

import { RequireProperties } from "@spatialsys/js/types"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { Mixpanel } from "@spatialsys/web/analytics"
import { deactivateNotifications } from "@spatialsys/web/app-context"
import { firebaseApp } from "@spatialsys/web/app-context/firebase-app"
import {
  AuthProvider,
  AuthState,
  AuthStatus,
  AuthSuccessPayload,
  WalletAddressMismatchError,
} from "@spatialsys/web/app-state"
import { logger } from "@spatialsys/web/logger"
import { nextApiClient, sapiClient } from "@spatialsys/web/sapi"
import { Storage } from "@spatialsys/web/storage"

import { getPublicAddress } from "./ethereum"
import { AuthLogChannel } from "./log-channel"

export const LOCAL_STORAGE_KEY_AUTHLESS_ID = "authlessUserID"

export async function clearAuthSessionCookie() {
  try {
    await nextApiClient.auth.clearAuthSession()
  } catch (err) {
    // Swallow error
    logger.error(AuthLogChannel, "Failed to clear auth session cookie", err)
  }
}

export async function logout({ redirectUri: _redirectUri = null as string } = {}) {
  logger.info(AuthLogChannel, "Logging user out")

  unityLogout()

  // Reset Mixpanel on logout: https://developer.mixpanel.com/docs/javascript#call-reset-at-logout
  Mixpanel.reset()
  // Clear the authless user ID
  // So that if the user logs in with a different account, it doesn't link merge
  Storage.removeItem(LOCAL_STORAGE_KEY_AUTHLESS_ID)

  // This endpoint also regenerates the spatialUid cookie
  await clearAuthSessionCookie()
  await firebaseLogout()

  // After logging out, we navigate to the homepage, forcing a refresh
  window.location.href = _redirectUri || "/"
}

export function unityLogout() {
  UnityMessages.logOut()
}

export async function firebaseLogout() {
  const firebaseAuth = getAuth(firebaseApp)
  // Sign out of Firebase. There can be a firebase state in local storage, even if firebaseAuth.currentUser is undefined
  // So, always try to sign out of Firebase no matter what.
  try {
    // Remove the FCM token so that other users that sign in on
    // this device don't receive notifications for this user.
    await deactivateNotifications()
    await firebaseAuth.signOut()
  } catch (e) {
    // If something goes wrong, swallow the error
    logger.error(AuthLogChannel, "Unable to sign out of Firebase", e)
  }
}

/** Creates AuthState object, formatting fields appropriately */
export function createAndFormatAuthState(
  accessToken: string,
  /** Unix epoch timestamp in milliseconds (ms) */
  expiresAt: number,
  useAuthlessToken: boolean,
  provider: AuthProvider,
  publicAddress?: string
): AuthSuccessPayload {
  return { accessToken, expiresAt, useAuthlessToken, provider, publicAddress: publicAddress?.toLowerCase() }
}

/** Sets AuthState by fetching a token from Firebase */
export async function getTokenForFirebaseUser(
  user: FirebaseUser,
  forceRefresh?: boolean
): Promise<RequireProperties<AuthState, "accessToken">> {
  try {
    const jwt = await getIdTokenResult(user, forceRefresh)

    await nextApiClient.auth.createAuthSession({ idToken: jwt.token, refreshToken: user.refreshToken })

    return {
      ...createAndFormatAuthState(
        jwt.token,
        new Date(jwt.expirationTime).getTime(),
        false,
        AuthProvider.Firebase,
        jwt.claims.publicAddress as string
      ),
      status: AuthStatus.Uninitialized,
    }
  } catch (err) {
    logger.error(AuthLogChannel, "Failed to get Firebase ID token", err)
    throw err
  }
}

export async function startAuthlessSession(roomId: string, shareId: string) {
  logger.info("Starting authless session")
  const payload = {
    roomId,
    roomShareID: shareId,
    noAuthUserID: Storage.fetch(LOCAL_STORAGE_KEY_AUTHLESS_ID, ""),
  }
  const { tempToken, expiresIn } = await sapiClient.rooms.getNoAuthToken(payload)
  const newAuthState = createAndFormatAuthState(tempToken, expiresIn * 1000 + Date.now(), true, AuthProvider.SAPI)

  return { ...newAuthState, authlessRoomId: roomId, authlessShareId: shareId }
}

/**
 * Checks that the connected wallet matches the user's wallet address.
 */
export async function checkWalletAddress(publicAddress: string) {
  const address = await getPublicAddress()

  if (address !== publicAddress.toLowerCase()) {
    throw new WalletAddressMismatchError()
  }

  return address
}
