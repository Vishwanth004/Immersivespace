import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"

import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { NoAuthError } from "@spatialsys/web/app-state"
import { AuthErrorProps, DefaultAuthFallback } from "@spatialsys/web/core/js/components/auth/fallbacks/fallbacks"
import { convertQueryParamToString } from "@spatialsys/web/core/js/util/query-params"
import { CenteredLoader } from "@spatialsys/web/ui"

/**
 * Fallback when user is not authenticated and tries to join a space
 * Handles attempting to authenticate as an authless user.
 */
export const RoomAuthAuthlessFallback = (props: AuthErrorProps) => {
  const { error } = props
  const spaceId = useAppContext((context) => context.state.space.id)
  const authActions = useAppContext((context) => context.actions)
  const { query } = useRouter()
  const { isAuthenticatingOrLoggingIn } = useAuthState()

  const shareId = useMemo(() => convertQueryParamToString(query.share), [query.share])

  const hasFailedAuthForCurrentSpace = useMemo(() => {
    return error instanceof NoAuthError && error.shareId === shareId && error.roomId === spaceId
  }, [error, spaceId, shareId])

  /**
   * Try no auth if:
   * - share ID exists
   * - not currently authenticating
   * - has not already tried to auth for given space and failed
   */
  useEffect(() => {
    if (!isAuthenticatingOrLoggingIn && shareId && !hasFailedAuthForCurrentSpace) {
      // current auth error is `NoAuthError` matches roomId and shareId, short-circuit.
      // Don't need to try again
      authActions.authenticateAuthless({ roomId: spaceId, shareId })
    }
  }, [authActions, hasFailedAuthForCurrentSpace, isAuthenticatingOrLoggingIn, spaceId, shareId])

  // If noauth failed, or there is no share ID: show default fallback
  if (hasFailedAuthForCurrentSpace || !shareId) {
    return <DefaultAuthFallback error={error} />
  }

  // Else, show loading spinner as we try and authenticate. if we succeed,
  // `RequiresAuth` will pass and we'll render the space!
  return <CenteredLoader variant="fancy" color="black" />
}
