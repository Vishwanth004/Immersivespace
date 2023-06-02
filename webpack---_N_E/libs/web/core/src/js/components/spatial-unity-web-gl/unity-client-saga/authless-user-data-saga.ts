import { sample } from "lodash"
import { call, fork, put, select } from "typed-redux-saga/macro"

import { getDefaultAuthlessDisplayName } from "@spatialsys/js/util/get-default-authless-displayname"
import { InteractionName, InteractionType, trackInteraction } from "@spatialsys/react/analytics"
import { UserAvatarStyle } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilChanged, waitUntilTrue } from "@spatialsys/use-saga"
import { track } from "@spatialsys/web/analytics"
import { Actions, AppState, Selectors } from "@spatialsys/web/app-state"
import { Storage } from "@spatialsys/web/storage"

export function* authlessUserDataSaga() {
  yield* call(initializeAuthlessUserDataSaga)

  yield* fork(analyticsSaga)

  // Set once after Unity is booted
  yield* waitUntilTrue((state: AppState) => state.isStarted)
  yield* call(setAuthlessUserInfoInUnity)

  while (true) {
    // Set after the user data is updated and is confirmed
    yield* waitUntilChanged((state: AppState) => state.authlessUserData)
    yield* waitUntilTrue((state: AppState) => Boolean(state.authlessUserData.confirmationStatus))
    yield* call(setAuthlessUserInfoInUnity)
  }
}

function* initializeAuthlessUserDataSaga() {
  const hasAuthlessUserData = yield* select((state: AppState) => Boolean(state.authlessUserData))
  if (hasAuthlessUserData) {
    return
  }

  const avatars = yield* select((state: AppState) => state.user.treatmentsParsed.authlessRpmAvatars)

  const savedName = Storage.fetch(Storage.AUTHLESS_DISPLAY_NAME_LOCAL_STORAGE_KEY)
  const savedAvatar = Storage.fetch(Storage.AUTHLESS_AVATAR_LOCAL_STORAGE_KEY)

  yield* put(
    Actions.setAuthlessUserData({
      name: savedName || getDefaultAuthlessDisplayName(),
      avatar: savedAvatar || sample(avatars),
      confirmationStatus: savedName && savedAvatar ? "Loaded from storage" : null,
    })
  )
}

function* setAuthlessUserInfoInUnity() {
  const { name, avatar, avatarUrls, confirmationStatus } = yield* select(Selectors.getAuthlessUserData)

  const displayName = name.trim()
  UnityMessages.setAuthlessDisplayName(displayName)
  UnityMessages.setUserAvatarStyle(UserAvatarStyle.ReadyPlayerMe)
  UnityMessages.setAvatarReadyPlayerMeUrl(avatarUrls.avatarModelUrl, avatarUrls.avatarThumbnailUrl)

  if (confirmationStatus) {
    Storage.setItem(Storage.AUTHLESS_DISPLAY_NAME_LOCAL_STORAGE_KEY, displayName)
    Storage.setItem(Storage.AUTHLESS_AVATAR_LOCAL_STORAGE_KEY, avatar)

    // Wait until the user profile is updated with the new display name before confirming the authless info in Unity
    // We do this to avoid sending "XXX joined the space" messages with the wrong name
    yield* waitUntilTrue((state: AppState) => state.unity.appState.userProfile.displayName === displayName)
    UnityMessages.setIsAuthlessInfoConfirmed(true)
  }
}

/**
 * Tracks every time the user confirms the authless name and avatar.
 */
function* analyticsSaga() {
  while (true) {
    // Wait until confirmation status is unset (i.e. authless modal becomes visible)
    yield* waitUntilTrue((state: AppState) => !state.authlessUserData.confirmationStatus)
    const oldData = yield* select(Selectors.getAuthlessUserData)

    // Wait until confirmation status is set (i.e. user confirms the choice and the modal closes)
    yield* waitUntilTrue((state: AppState) => Boolean(state.authlessUserData.confirmationStatus))
    const newData = yield* select(Selectors.getAuthlessUserData)

    yield* call(
      trackInteraction,
      track,
      {
        name: InteractionName.AuthlessUserSetNameAndAvatar,
        type: InteractionType.Submission,
      },
      {
        "Confirmation Method": newData.confirmationStatus,
        "Changed Name": oldData.name !== newData.name,
        "Changed Avatar": oldData.avatar !== newData.avatar,
      }
    )
  }
}
