import * as Sentry from "@sentry/nextjs"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useReducer } from "reinspect"
import { createContext, useContextSelector } from "use-context-selector"

import { BoundActions, useBindActions } from "@spatialsys/js/redux"
import { useMeQuery } from "@spatialsys/react/query-hooks/sapi/user"
import { createContextStub } from "@spatialsys/react/util/create-context-stub"
import { RoomJoinMethod } from "@spatialsys/unity/app-state"
import { RunSaga, useSaga } from "@spatialsys/use-saga"
import {
  Actions,
  AppState,
  AuthContextAppProps,
  AuthStatus,
  Selectors,
  createInitialState,
  rootReducer,
} from "@spatialsys/web/app-state"
import { logger } from "@spatialsys/web/logger"
import { sapiClient } from "@spatialsys/web/sapi"

import { appSaga } from "./sagas/app-saga"

const stub = createContextStub("AppProvider")

export interface AppContext {
  state: AppState
  actions: BoundActions<typeof Actions>
  runSaga: RunSaga
}

const devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1

const initialAppContext: AppContext = {
  state: createInitialState({
    reactQueryClient: {} as any,
    devicePixelRatio,
    hasTriedAuth: false,
    authSession: undefined,
    spatialUid: "",
    spaceId: null,
    joinContext: {
      method: RoomJoinMethod.UserJoinedThroughDirectLink,
    },
  }),
  actions: {} as any,
  runSaga: stub,
}

export const AppContext = createContext(initialAppContext)

type AppProviderProps = React.PropsWithChildren<
  AuthContextAppProps & {
    spaceId: string | null
    spatialUid: string
    renderFatalException: (reloadUnity: () => void) => ReactNode
  }
>

export const AppProvider = (props: AppProviderProps) => {
  const { authSession, hasTriedAuth, children, spaceId, spatialUid, renderFatalException } = props

  const reactQueryClient = useQueryClient()
  // TODO (DEV-19800): Initialize the state in a `useState` hook so that it `createInitialSate` is only run once,
  // as a workaround for a bug in `reinspect`. `createInitialAuthState` has a side effect, so it should only be run once.
  const [initialState] = useState(() =>
    createInitialState({
      reactQueryClient,
      devicePixelRatio,
      authSession,
      hasTriedAuth,
      spatialUid,
      spaceId,
      joinContext: {
        method: RoomJoinMethod.UserJoinedThroughDirectLink,
      },
    })
  )

  const [state, reducerDispatch] = useReducer(rootReducer, initialState, "App")
  const onAppSagaError = useCallback((err: Error) => {
    logger.error("App saga error", err)
    Sentry.captureException(err)
  }, [])
  const { dispatch, runSaga } = useSaga({ state, dispatch: reducerDispatch, onError: onAppSagaError }, appSaga)

  const actions = useBindActions(Actions, dispatch)

  useEffect(() => {
    global_setHasFatalException = () => actions.setHasFatalException(true)
  }, [actions])

  const appContextValue = useMemo(
    () => ({
      state,
      actions,
      runSaga,
    }),
    [state, actions, runSaga]
  )

  const reloadUnity = useCallback(() => {
    // Eventually, it would be great to just reboot Unity, but for now let's simply reload
    window.location.reload()
  }, [])

  const isAuthenticated = state.auth.status === AuthStatus.Authenticated
  const { data: user } = useMeQuery(
    sapiClient,
    isAuthenticated,
    // Only listens for changes to `data`, we don't care about loading state or anything else
    { notifyOnChangeProps: ["data"] }
  )
  useEffect(() => {
    actions.setUser(user)
  }, [actions, user])

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
      {state.hasFatalException && renderFatalException(reloadUnity)}
    </AppContext.Provider>
  )
}

export const useAppContext = <T,>(selector: (context: AppContext) => T) => useContextSelector(AppContext, selector)

// This machinery helps us plumb through from the Sentry client config
// into this SpatialUnityWebGL component instance
export let global_setHasFatalException: (() => void) | null = null

export const useAuthState = () => {
  const authState = useAppContext((context) => context.state.auth)
  return useMemo(() => Selectors.getAuthState(authState), [authState])
}
