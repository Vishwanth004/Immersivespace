import { all, call, fork, select, takeLatest } from "typed-redux-saga/macro"

import { ClaimBadgeRequest } from "@spatialsys/js/sapi/types"
import { waitUntilTrue } from "@spatialsys/use-saga"
import { ActionType, AppState, AuthStatus, BadgeRewarded } from "@spatialsys/web/app-state"
import { sapiBadgesClient } from "@spatialsys/web/sapi"
import { Storage } from "@spatialsys/web/storage"

export function* authlessBadgesSaga() {
  yield* fork(claimAuthlessBadges)
  yield* takeLatest(ActionType.BadgeRewarded, onBadgeRewarded)
}

function* onBadgeRewarded({ payload: badgeId }: BadgeRewarded) {
  const isAuthless = yield* select((state: AppState) => state.auth.useAuthlessToken)
  if (isAuthless) {
    const spaceId = yield* select((state: AppState) => state.space.id)
    addAuthlessClaimRequest({
      badgeId,
      spaceID: spaceId,
    })
  }
}

function* claimAuthlessBadges() {
  yield* waitUntilTrue(
    (state: AppState) => !state.auth.useAuthlessToken && state.auth.status === AuthStatus.Authenticated
  )
  const claimRequests = readAuthlessClaimRequests()
  Storage.removeItem(Storage.STORAGE_AUTHLESS_BADGES_KEY)
  yield* all(claimRequests.map((request) => call(claimBadge, request)))
}

function* claimBadge(request: ClaimBadgeRequest) {
  try {
    yield* call(() => sapiBadgesClient.badges.claimBadge(request))
  } catch (e) {
    console.log("Failed to claim badge", request, e)
  }
}

const readAuthlessClaimRequests = (): ClaimBadgeRequest[] => {
  try {
    return JSON.parse(Storage.fetch(Storage.STORAGE_AUTHLESS_BADGES_KEY, "[]"))
  } catch (e) {
    return []
  }
}

const addAuthlessClaimRequest = (request: ClaimBadgeRequest) => {
  try {
    const requests = readAuthlessClaimRequests()
    if (!requests.some((r) => r.badgeId === request.badgeId)) {
      Storage.setItem(Storage.STORAGE_AUTHLESS_BADGES_KEY, JSON.stringify([...requests, request]))
    }
  } catch (e) {
    Storage.setItem(Storage.STORAGE_AUTHLESS_BADGES_KEY, JSON.stringify([request]))
  }
}
