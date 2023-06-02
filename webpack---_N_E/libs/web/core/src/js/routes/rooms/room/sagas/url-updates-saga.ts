import Router from "next/router"
import { fork, select } from "typed-redux-saga/macro"

import { AppStateSelectors, RoomData_ShareSetting } from "@spatialsys/unity/app-state"
import { formatSpacePath } from "@spatialsys/url-utils"
import { waitUntil, waitUntilChanged } from "@spatialsys/use-saga"
import { AppState } from "@spatialsys/web/app-state"

/**
 * Updates the URL whenever space state that goes into the URL change.
 */
export function* urlUpdatesSaga() {
  yield* fork(updateUrlOnNameChange)
  yield* fork(updateUrlForShareSettings)
}

/**
 * Updates the URL to reflect changes made to the space's name.
 */
function* updateUrlOnNameChange() {
  while (true) {
    const [pathFromUnitySpaceId] = yield* waitUntilChanged((state: AppState) => {
      const room = AppStateSelectors.getCurrentRoom(state.unity.appState)
      return formatSpacePath(room.id, room.slug)
    })
    const pathFromRouter = Router.asPath.split("?")[0]
    if (pathFromRouter !== pathFromUnitySpaceId) {
      const { slugAndId: _, ...queryParamsWithoutSlugAndId } = Router.query
      void Router.replace({ pathname: pathFromUnitySpaceId, query: queryParamsWithoutSlugAndId }, undefined, {
        // Have to specify `shallow` because this changes the path, but we don't want new page data to be fetched
        shallow: true,
      })
    }
  }
}

/**
 * Updates the URL to add or remove the `share` query parameter given the space's share settings.
 */
function* updateUrlForShareSettings() {
  const getIsPublic = (state: AppState) => {
    const room = AppStateSelectors.getCurrentRoom(state.unity.appState)
    return room.shareSetting === RoomData_ShareSetting.PublicLink || room.publicLink
  }
  const getRoom = (state: AppState) => AppStateSelectors.getCurrentRoom(state.unity.appState)

  let isPublic = yield* select(getIsPublic)
  while (true) {
    // If the space is public, and the URL doesn't have the `share` query parameter, add it.
    if (isPublic && !Router.query.share) {
      const room = yield* select(getRoom)
      let shareId = room.shareID
      if (!shareId) {
        // This may not be immediately set when changing between share settings; wait until it is
        shareId = yield* waitUntil(
          (id) => id !== null && id !== "",
          (state: AppState) => AppStateSelectors.getCurrentRoom(state.unity.appState).shareID
        )
      }
      const { slugAndId: _, ...queryParamsWithoutSlugAndId } = Router.query
      const pathname = formatSpacePath(room.id, room.slug)
      void Router.replace({ pathname, query: { ...queryParamsWithoutSlugAndId, share: shareId } }, undefined, {
        shallow: true,
      })
      // If the space is not public and there is a `share` URL parameter, remove it
    } else if (!isPublic && Router.query.share) {
      const { slugAndId: _, share: __, ...queryWithoutIdAndShare } = Router.query
      const room = yield* select(getRoom)
      const pathname = formatSpacePath(room.id, room.slug)
      void Router.replace({ pathname, query: queryWithoutIdAndShare }, undefined, { shallow: true })
    }

    ;[isPublic] = yield* waitUntilChanged(getIsPublic)
  }
}
