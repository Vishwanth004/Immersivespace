import { QueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { nanoid } from "nanoid"
import Router from "next/router"
import { FixedTask, SagaGenerator, call, cancel, fork, join, put, select } from "typed-redux-saga/macro"

import { SAPILogChannel } from "@spatialsys/js/sapi/clients/sapi"
import { GetMeetingResponseParsed } from "@spatialsys/js/sapi/clients/spaces"
import { JoinFailMessage, SAPIError, SAPIRequestError } from "@spatialsys/js/sapi/types"
import { makeSpaceQueryConfig } from "@spatialsys/react/query-hooks/sapi/spaces"
import { makeMeetingQueryConfig } from "@spatialsys/react/query-hooks/spaces/meetings"
import { AppStateSelectors, LoginStatus, RTCConnectionStatus } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { formatSpacePath } from "@spatialsys/url-utils"
import { waitUntilChanged, waitUntilExists, waitUntilTrue } from "@spatialsys/use-saga"
import { trackSpaceJoinFailure } from "@spatialsys/web/analytics"
import { Actions, AppState, AuthProvider, Selectors } from "@spatialsys/web/app-state"
import * as PerformanceMonitor from "@spatialsys/web/core/js/analytics/performance-monitor"
import { createAndFormatAuthState } from "@spatialsys/web/core/js/auth/auth"
import { AuthLogChannel } from "@spatialsys/web/core/js/auth/log-channel"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { parseJwt } from "@spatialsys/web/core/js/util/jwt"
import { logger } from "@spatialsys/web/logger"
import { sapiClient, sapiSpaceClient } from "@spatialsys/web/sapi"

/**
 * Sends the message to Unity to join the space after fetching all the requisite data and waiting
 * on various connection states to be correct. If the spaceId changes, the old join sequence will
 * be cancelled and a new one started.
 */
export function* joinSpaceWatcher() {
  while (true) {
    const spaceId = yield* waitUntilExists((state: AppState) => state.space.id)
    const task = yield* fork(joinSpaceSaga, spaceId)
    yield* waitUntilChanged((state: AppState) => state.space.id)
    yield* cancel(task)
  }
}

function* joinSpaceSaga(spaceId: string) {
  const queryClient = yield* select((state: AppState) => state.reactQueryClient)

  const getSpaceTask = yield* fork(getSpace, queryClient, spaceId)
  const getMeetingTask = yield* fork(getMeeting, queryClient, spaceId)
  const authlessUpdateTask = yield* fork(maybeUpdateAuthState, getMeetingTask)

  yield* waitUntilTrue((state: AppState) => state.unity.appState.loginStatus === LoginStatus.LoggedIn)
  PerformanceMonitor.reportUnityFinishedBootAndLogin()

  // When switching rooms, we want the "<Room>" component to fully unmount. This is because of
  // technical debt inside the RTCManager web implementation. RTC will disconnect when the Room
  // component unmounts.
  yield* waitUntilTrue((state: AppState) => {
    return (
      spaceId !== AppStateSelectors.getCurrentRoomId(state.unity.appState) &&
      state.rtc.connectionStatus === RTCConnectionStatus.Disconnected
    )
  })

  const spaceData = yield* join(getSpaceTask)
  const meeting = yield* join(getMeetingTask)
  const authlessUpdateHasError = yield* join(authlessUpdateTask)

  if (!spaceData || !meeting || authlessUpdateHasError) {
    logger.error("Failed to get space data or meeting data, cancelling space join")
    // TODO: Consolidate errors between here and the getMeeting saga.
    Toast.error("Something went wrong while joining the space")
    void Router.push("/")
    return
  }

  // Generate a new photon session ID on every join.
  // SAPI requires it when calling `/getMeetingId`
  const photonSessionId = nanoid()

  const context = yield* select((state: AppState) => state.space.joinContext)
  UnityMessages.joinRoom({
    roomId: spaceId,
    photonSessionId,
    spaceData,
    meeting,
    context,
  })

  PerformanceMonitor.reportUnityStartedRoomJoin()

  // After sending the `joinRoom` message, reset the SpaceJoinContext
  yield* put(Actions.resetSpaceJoinContext())
}

function* getSpace(queryClient: QueryClient, spaceId: string) {
  try {
    const data = yield* call(() => queryClient.fetchQuery(makeSpaceQueryConfig(sapiClient, { roomId: spaceId })))
    const pathname = formatSpacePath(data.roomData.id, data.roomData.slug)
    if (data.roomData.id !== spaceId || Router.asPath.split("?")[0] !== pathname) {
      const { slugAndId: _, ...queryParamsWithoutSlugAndId } = Router.query
      void Router.replace({ pathname, query: queryParamsWithoutSlugAndId })
    }
    return data
  } catch (error) {
    logger.error(SAPILogChannel, "Received error from SAPI getting room data to join", error)
    return
  }
}

function* getMeeting(queryClient: QueryClient, spaceId: string) {
  // The getMeetingId endpoint does version compat checking. There's a possible race condition between this query
  // and `version` being set; wait for that before executing this query!
  yield* waitUntilExists((state: AppState) => state.unity.version)
  try {
    const data = yield* call(() =>
      queryClient.fetchQuery(makeMeetingQueryConfig(sapiSpaceClient, spaceId, { retry: false }))
    )
    return data
  } catch (err) {
    // TODO (DEV-19862) Clean up error formatting
    const error = err as AxiosError<SAPIRequestError<JoinFailMessage>>
    if (error.response?.data?.code === "BANNED") {
      yield* put(
        Actions.setBanned({
          isBanned: true,
          bannedUntilUnixMs: error.response.data?.message?.bannedUntil,
        })
      )
      trackSpaceJoinFailure(spaceId, "Banned From Space")
    } else if (error.response?.data?.code === "TOKEN_GATED") {
      yield* put(
        Actions.setTokenGate({
          isTokenGatedFromRoom: true,
          tokenGatedRoomConfig: error.response.data?.message?.tokenGateConfig,
          tokenGatedRoomName: error.response.data?.message?.roomName,
          tokenGatedUserHasWallet: error.response.data?.message?.hasWallet,
        })
      )
      trackSpaceJoinFailure(spaceId, "Token Gated")
    } else {
      const sapiErrors: SAPIError[] = error.response?.data?.errors ?? []

      for (const sapiError of sapiErrors) {
        // Weirdly, the message is a nested SAPIError encoded as a string
        const message: SAPIError = JSON.parse(sapiError.message)

        if (sapiError.display) {
          Toast.error(sapiError.message)
        } else if (message.code === "SPACE_AT_CAPACITY") {
          Toast.error("This space is full! Please try again later", 4000)
        } else if (message.code === "INVALID_ACCESS") {
          Toast.error("Oops, you don't have access to this space.", 4000)
        } else if (message.message) {
          Toast.error(message.message)
        } else {
          Toast.error("Oops! Something went wrong while trying to join the space. Please try again later!")
        }
      }

      trackSpaceJoinFailure(spaceId, `${error.response?.status} Network Error`)
    }

    logger.error(SAPILogChannel, "Received getMeetingId error from SAPI", error)
  }
}

/**
 * Updates the app state when the user is authless & the meeting response includes a new authless token.
 * @returns an error if there is one, or nothing if nothing was updated or there is no error.
 */
function* maybeUpdateAuthState(task: FixedTask<GetMeetingResponseParsed>): SagaGenerator<any | void> {
  const data = yield* join(task)
  const { isAuthless } = yield* select((state: AppState) => Selectors.getAuthState(state.auth))

  if (!data?.newAuthlessToken || !isAuthless) {
    return
  }
  // When joining a new space in authless mode, we need to update the access token
  // used by the application, since each authless token gives access to only a single space.

  try {
    const parsedJwt = parseJwt(data.newAuthlessToken)
    const newAuthState = createAndFormatAuthState(data.newAuthlessToken, parsedJwt.exp * 1000, true, AuthProvider.SAPI)
    // Set the authstate in our app, as well as in Unity
    yield* put(Actions.setAuthSuccess(newAuthState))
  } catch (err) {
    logger.error(AuthLogChannel, "Unable to parse new authless token", err)
    return err
  }
}
