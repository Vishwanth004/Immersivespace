import { call, put, select, take } from "typed-redux-saga/macro"

import { GET_FEATURE_FLAGS_QUERY_KEY } from "@spatialsys/react/query-hooks/feature-flags"
import { GET_ME_QUERY_KEY } from "@spatialsys/react/query-hooks/sapi/user"
import { getFeatureFlagSpace } from "@spatialsys/url-utils"
import { ActionType, Actions, AppState } from "@spatialsys/web/app-state"
import { sapiClient, sapiFeatureFlagsClient } from "@spatialsys/web/sapi"
import { Storage } from "@spatialsys/web/storage"

export function* firstQuestSaga() {
  const queryClient = yield* select((state: AppState) => state.reactQueryClient)
  const featureFlags = yield* call(() =>
    queryClient.fetchQuery({
      queryKey: GET_FEATURE_FLAGS_QUERY_KEY,
      queryFn: () => sapiFeatureFlagsClient.getFeatureFlags(),
      cacheTime: Infinity,
      staleTime: Infinity,
    })
  )
  const firstQuestSpace = getFeatureFlagSpace(featureFlags.featureFlags.firstQuestSpacePath)
  const spaceId = yield* select((state: AppState) => state.space.id)
  if (firstQuestSpace && firstQuestSpace.id === spaceId) {
    yield* take(ActionType.QuestCompleted)
    yield* call(handleFirstQuestCompleted)
  }
}

function* handleFirstQuestCompleted() {
  const showFirstTutorial = yield* select((state: AppState) => state.space.showFirstTutorial)
  if (showFirstTutorial) {
    yield* call(setFirstTutorialCompleted)
  }
}

function* setFirstTutorialCompleted() {
  Storage.setItem(Storage.STORAGE_FINISHED_TUTORIAL_KEY, true)
  yield* put(Actions.setSpaceState({ showFirstTutorial: false }))

  const isAuthless = yield* select((state: AppState) => state.auth.useAuthlessToken)
  if (!isAuthless) {
    yield* call(() =>
      sapiClient.users.patchMe({
        disableWebControlsTutorial: true,
      })
    )
    const queryClient = yield* select((state: AppState) => state.reactQueryClient)
    yield* call(() => queryClient.invalidateQueries(GET_ME_QUERY_KEY))
  }
}
