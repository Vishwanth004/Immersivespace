import * as Sentry from "@sentry/nextjs"
import { fork, select, takeLatest } from "typed-redux-saga/macro"

import { Mixpanel, formatAvatarMixpanelProperties } from "@spatialsys/web/analytics"
import { AppActionType, AppState, SetUser } from "@spatialsys/web/app-state"
import { LOCAL_STORAGE_KEY_AUTHLESS_ID } from "@spatialsys/web/core/js/auth/auth"
import { authlessBadgesSaga } from "@spatialsys/web/core/js/components/rewards/saga/authless-badges-saga"
import { authlessUserDataSaga } from "@spatialsys/web/core/js/components/spatial-unity-web-gl/unity-client-saga/authless-user-data-saga"
import { Storage } from "@spatialsys/web/storage"

export function* userSaga() {
  yield* fork(authlessBadgesSaga)
  yield* takeLatest(AppActionType.SetUser, setUserInfo)
}

/**
 * Updates all the places with the user, such as Mixpanel and Sentry
 */
export function* setUserInfo({ payload: user }: SetUser) {
  if (!user) {
    return
  }

  const isAuthless = yield* select((state: AppState) => state.auth.useAuthlessToken)
  // Identify the user in Mixpanel and Sentry
  Mixpanel.identify(user.id)
  if (isAuthless) {
    // Don't include $user_id as a property on authless users. This is set automatically
    // by the mixpanel library when calling identify. The first $identify event will have it
    // but none of the subsequent ones will.
    Mixpanel.unregister("$user_id")
  }
  Sentry.setUser({ id: user.id, email: user.email, username: user.displayName })

  const avatarProperties = formatAvatarMixpanelProperties(user.avatarData)
  Mixpanel.people.set(avatarProperties)

  if (isAuthless) {
    // Persist authless user ID in local storage
    Storage.setItem(LOCAL_STORAGE_KEY_AUTHLESS_ID, user.id)

    yield* fork(authlessUserDataSaga)
  }
}
