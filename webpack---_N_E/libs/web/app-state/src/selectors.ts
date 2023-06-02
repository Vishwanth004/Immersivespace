import { last } from "lodash"
import { createCachedSelector } from "re-reselect"

import {
  IntegrationConnection,
  IntegrationsResponse,
  checkIntegrationAccountStatus,
} from "@spatialsys/js/sapi/clients/sapi"
import { formatAvatarModelAndThumbnailUrl } from "@spatialsys/js/util/format-avatar-model-and-thumbnail-url"
import Config, { ConfigT } from "@spatialsys/web/config"

import { AppState } from "./app-state"
import { Modals } from "./modals"

const getIntegrations = (state: AppState) => state.integrations
const takeIntegrationName = (_: AppState, integration: IntegrationConnection) => integration
const findIntegrationStatus = (integrations: IntegrationsResponse | null, integration: IntegrationConnection) => {
  if (!integrations) {
    return false
  }
  return checkIntegrationAccountStatus(integration, integrations) === "CONNECTED"
}

export const getMediaSettings = (state: AppState) => state.mediaSettings

export const isIntegrationConnected = createCachedSelector(
  getIntegrations,
  takeIntegrationName,
  findIntegrationStatus
)((_, integration) => integration)

export const getSelectedPixelRatio = (state: AppState) => state.mediaSettings?.selectedPixelRatio
export const getOpenModal = (state: AppState) => last(state.modals)
export const getLoginModal = (state: AppState) => {
  const openModal = last(state.modals)
  return openModal?.type === Modals.Login ? openModal : undefined
}

export const getReportSpaceModal = (state: AppState) => {
  const openModal = last(state.modals)
  return openModal?.type === Modals.ReportSpace ? openModal : undefined
}

export const canViewDebugSettings = (state: AppState, config: ConfigT) => {
  return (
    config.DEPLOYMENT_ENV === "development" ||
    config.DEPLOYMENT_ENV === "staging" ||
    state.user?.treatmentsParsed.showDebugMenu
  )
}

export const shouldStartUnity = (state: AppState) => {
  return state.isInMainlineSpatial || Boolean(state.spaceToCreate) || Boolean(state.space.isCreateAvatarFlow)
}

export const getAuthlessUserData = (state: AppState) =>
  state.authlessUserData && {
    ...state.authlessUserData,
    avatarUrls: formatAvatarModelAndThumbnailUrl(Config.AUTHLESS_AVATAR_BASE_URL, state.authlessUserData.avatar),
  }
