import { useEffect } from "react"

import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { AuthStatus } from "@spatialsys/web/app-state"

/**
 * Effect that attempts to authenticate, if we haven't already tried to.
 */
export function useTryToAuthenticate() {
  const authActions = useAppContext((context) => context.actions)
  const { accessToken, isError, isAuthenticatingOrLoggingIn, status } = useAuthState()

  useEffect(() => {
    if (!accessToken && !isError && (!isAuthenticatingOrLoggingIn || status === AuthStatus.Uninitialized)) {
      authActions.authenticate()
    }
  }, [accessToken, authActions, isError, isAuthenticatingOrLoggingIn, status])
}
