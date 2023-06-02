import * as Sentry from "@sentry/nextjs"
import { AxiosError } from "axios"

import { AllApiClients } from "@spatialsys/js/sapi/clients"
import { SapiAuthClient } from "@spatialsys/js/sapi/clients/auth"
import { SapiBadgesClient } from "@spatialsys/js/sapi/clients/badges"
import { SapiBaseClient, SapiBaseClientParams } from "@spatialsys/js/sapi/clients/base-client"
import { SapiContentClient } from "@spatialsys/js/sapi/clients/content"
import { SapiFeatureFlagsClient } from "@spatialsys/js/sapi/clients/feature-flags"
import { SapiItemsClient } from "@spatialsys/js/sapi/clients/items"
import { NextApiClient } from "@spatialsys/js/sapi/clients/next-api"
import { SapiNotificationClient } from "@spatialsys/js/sapi/clients/notifications"
import { SAPILogChannel, SapiClient } from "@spatialsys/js/sapi/clients/sapi"
import { SapiSpaceClient } from "@spatialsys/js/sapi/clients/spaces"
import { SapiSpatialSdkClient } from "@spatialsys/js/sapi/clients/spatial-sdk"
import { SapiUsersClient } from "@spatialsys/js/sapi/clients/users"
import { SapiUsersV2Client } from "@spatialsys/js/sapi/clients/users-v2"
import { SapiWorldsClient } from "@spatialsys/js/sapi/clients/worlds"
import { PlatformHeaderString } from "@spatialsys/js/sapi/types"
import Config from "@spatialsys/web/config"
import { logger } from "@spatialsys/web/logger"

/**
 * Sends a network error to Sentry with the HTTP method, status code, and request URL
 */
const sendErrorToSentry = (error: AxiosError) => {
  Sentry.configureScope((scope) => {
    const tags = {
      http_method: error.config.method?.toUpperCase(),
      status_code: error.code ?? error.request?.status,
      url: error.config.url,
    }
    scope.setTags(tags)
    error.message = `Network Error - ${tags.status_code} on ${tags.http_method} ${tags.url}`
    Sentry.captureException(error)
  })
  return Promise.reject(error)
}

// Please use this when logging responses, otherwise tokens will be accidentally logged
function logErrorResponse(error: any) {
  const strippedResponse = {
    data: error?.response?.data,
    status: error?.response?.status,
    statusText: error?.response?.statusText,
    responseURL: error?.response?.request?.responseURL,
    headers: error?.response?.headers,
    config: {},
  }
  logger.error(SAPILogChannel, "Received error from SAPI", strippedResponse)
  return Promise.reject(error)
}

function setupClientAxiosInterceptors(sapiClient: SapiBaseClient) {
  sapiClient.client.interceptors.response.use(undefined, logErrorResponse)
}

function setupSentryLogging(sapiClient: SapiBaseClient) {
  sapiClient.client.interceptors.response.use(undefined, sendErrorToSentry)
}

const sapiClientParams: SapiBaseClientParams = {
  apiUrl: Config.API_URL,
  platform: PlatformHeaderString.Web,
  spatialUnityVersion: Config.SPATIAL_UNITY_VERSION,
  channelName: Config.CHANNEL_NAME,
}

export const sapiClient = new SapiClient(sapiClientParams)
export const sapiAuthClient = new SapiAuthClient(sapiClientParams)
export const sapiBadgesClient = new SapiBadgesClient(sapiClientParams)
export const sapiContentClient = new SapiContentClient(sapiClientParams)
export const sapiFeatureFlagsClient = new SapiFeatureFlagsClient(sapiClientParams)
export const sapiItemsClient = new SapiItemsClient(sapiClientParams)
export const sapiSpaceClient = new SapiSpaceClient(sapiClientParams)
export const sapiNotificationClient = new SapiNotificationClient(sapiClientParams)
export const sapiUsersClient = new SapiUsersClient(sapiClientParams)
export const sapiUsersV2Client = new SapiUsersV2Client(sapiClientParams)
export const sapiSpatialSdkClient = new SapiSpatialSdkClient(sapiClientParams)
export const sapiWorldsClient = new SapiWorldsClient(sapiClientParams)
// The API URL is empty to send the requests to the same origin that the page is served from.
export const nextApiClient = new NextApiClient({ ...sapiClientParams, apiUrl: "" })

const allClients: Omit<AllApiClients, "sapiSubscriptionsClient"> = {
  sapiClient,
  sapiAuthClient,
  sapiBadgesClient,
  sapiContentClient,
  sapiFeatureFlagsClient,
  sapiItemsClient,
  sapiSpaceClient,
  sapiNotificationClient,
  sapiUsersClient,
  sapiUsersV2Client,
  sapiSpatialSdkClient,
  sapiWorldsClient,
  nextApiClient,
}

export const attachErrorLoggers = () => {
  for (const client of Object.values(allClients)) {
    setupClientAxiosInterceptors(client)
  }
}

export const attachSentryLogging = () => {
  for (const client of Object.values(allClients)) {
    setupSentryLogging(client)
  }
}

export const setAuthHeaders = (accessToken: string) => {
  for (const client of Object.values(allClients)) {
    client.setAuthHeader(accessToken)
  }
}

export const clearAuthHeaders = () => {
  for (const client of Object.values(allClients)) {
    client.unsetAuthHeader()
  }
}

/**
 * Sets the Spatial UID header on all axios API clients, as well as the default axios instance.
 */
export const setSpatialUidHeaders = (spatialUid: string) => {
  for (const client of Object.values(allClients)) {
    client.setSpatialUidHeader(spatialUid)
  }
}
