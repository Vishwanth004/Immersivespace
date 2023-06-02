import { call, select } from "typed-redux-saga/macro"

import { GET_FEATURE_FLAGS_QUERY_KEY } from "@spatialsys/react/query-hooks/feature-flags"
import { SpacesQueryKeys } from "@spatialsys/react/query-hooks/spaces"
import { waitUntilChanged } from "@spatialsys/use-saga"
import { Mixpanel } from "@spatialsys/web/analytics"
import { AppState, AuthState, AuthStatus } from "@spatialsys/web/app-state"

import { getSpatialUid } from "../../spatial-uid"

export function* authChangeSaga() {
  const firstState = yield* select((state: AppState) => state.auth)

  // When this saga first runs, the user may already be unauthenticated due to server-side auth.
  // So, we look at the initial value, and not only transitions to the value.
  if (firstState.status === AuthStatus.AuthenticationError || firstState.status === AuthStatus.LoginError) {
    identifyAndUnregisterUserId()
  }

  while (true) {
    const states = yield* waitUntilChanged((state: AppState) => state.auth)
    yield* call(invalidateQueriesOnAuthStatusChanged, ...states)
    updateMixpanelSpatialUidOnAuthStatusChanged(...states)
  }
}
/**
 * Invalidates queries based on auth state changes. Certain queries return different results when authenticated vs unauthenticated.
 * Typically, we need to do invalidation during these auth state transitions:
 * - LoggedIn -> Unauthenticated (log out)
 * - Unauthenticated -> LoggedIn (log in)
 *
 * Note that `LoggedIn` denotes a user that logs in explicitly, and excludes authless (no-auth) users.
 * We do not invalidate the feature flags and feed caches for authless users, as we can simply rely
 * on the result from their `spatial-uid`.
 */
export function* invalidateQueriesOnAuthStatusChanged(newState: AuthState, prevState: AuthState) {
  const { status: prevStatus, useAuthlessToken: prevAuthless } = prevState
  const { status: newStatus, useAuthlessToken: newAuthless } = newState
  const reactQueryClient = yield* select((state: AppState) => state.reactQueryClient)

  // Transitioned to authenticated — invalidate the cache as long as the user is not authless
  if (newStatus === AuthStatus.Authenticated && prevStatus !== AuthStatus.Authenticated) {
    if (!newAuthless) {
      void reactQueryClient.invalidateQueries([SpacesQueryKeys.GetFeed])
      void reactQueryClient.invalidateQueries(GET_FEATURE_FLAGS_QUERY_KEY)
    }
  }

  // Transitioned to unauthenticated — invalidate the cache as long as the user is not authless
  if (newStatus !== AuthStatus.Authenticated && prevStatus === AuthStatus.Authenticated) {
    if (!prevAuthless) {
      void reactQueryClient.invalidateQueries([SpacesQueryKeys.GetFeed])
      void reactQueryClient.invalidateQueries(GET_FEATURE_FLAGS_QUERY_KEY)
    }
  }
}

/**
 * Updates Spatial UID in the following cases when auth status changes:
 * - If auth status becomes `AuthenticationError`, identify the user in Mixpanel using `spatialUid`.
 * - If auth status becomes `LoggedIn`, do nothing. The user will be identified in Mixpanel in `user-saga`,
 * and also merged with `spatialUid` by calling `post-login` endpoint as part of responding to `SetAuthSuccess`.
 * - If auth status transitions from logged in to logged out, do nothing. Logout saga will handle
 * resetting Mixpanel and spatialUid.
 *
 * In other words, authless users are identified with their Spatial UID. Logged in users are identified with their user ID
 * in `user-saga`.
 */
export function updateMixpanelSpatialUidOnAuthStatusChanged(
  { status: newStatus }: AuthState,
  { status: prevStatus }: AuthState
) {
  /**
   * Transitioned to authenticated: do nothing. Mixpanel.identify is called in `user-saga`, profiles
   * are merged by calling `/post-login` via `SetAuthSuccess handling`.
   * Transitioned from authenticated to unauthenticated: do nothing.
   * - If it's a "LoggedIn" user, logging out forces a page refresh. In `logout` saga,  we must first
   * regenerate the Spatial UID before refreshing the page.
   * - If the it's an "authless" user, we don't want to regenerate the Spatial UID. It should remain the same.
   *
   * So the only case where we do anything is when the auth state transitions to `AuthenticationError` or `LoginError`,
   * and the previous state was NOT `Authenticated`. In this case, it's a user that failed to sign in, or did not have an
   * existing session, and the authentication occurred on the client. Alias them in Mixpanel using the spatialUid.
   */
  if (
    prevStatus !== AuthStatus.Authenticated &&
    (newStatus === AuthStatus.AuthenticationError || newStatus === AuthStatus.LoginError)
  ) {
    identifyAndUnregisterUserId()
  }
}

export function identifyAndUnregisterUserId() {
  Mixpanel.identify(getSpatialUid())
  Mixpanel.unregister("$user_id")
}
