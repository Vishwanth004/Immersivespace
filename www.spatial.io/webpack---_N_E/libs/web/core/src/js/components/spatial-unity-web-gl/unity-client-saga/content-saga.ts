import { call, put } from "typed-redux-saga/macro"

import { IntegrationsResponse } from "@spatialsys/js/sapi/clients/sapi"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { waitUntilExists } from "@spatialsys/use-saga"
import { Actions, AppState } from "@spatialsys/web/app-state"
import { sapiClient } from "@spatialsys/web/sapi"

export function* contentSaga() {
  const isAddContentEnabled = yield* waitUntilExists((state: AppState) =>
    state.unity.appState.roomSession ? AppStateSelectors.isAddContentEnabled(state.unity.appState) : null
  )
  const isAuthless = yield* waitUntilExists((state: AppState) => state.auth?.useAuthlessToken)
  if (isAuthless || !isAddContentEnabled) {
    return
  }
  const integrationsResponse: IntegrationsResponse = yield* call(sapiClient.integrations.getIntegrationResponse)
  yield* put(Actions.setIntegrations(integrationsResponse))
}
