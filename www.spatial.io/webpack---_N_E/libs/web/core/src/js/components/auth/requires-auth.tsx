import { ReactElement, memo } from "react"

import { PropsWithChildrenRequired } from "@spatialsys/js/types"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { RequiresWithFallbackProps } from "@spatialsys/web/core/js/components/requires-with-fallback"
import { CenteredLoader } from "@spatialsys/web/ui"

import { useTryToAuthenticate } from "./hooks"

type RequiresAuthProps<E> = PropsWithChildrenRequired<
  Required<RequiresWithFallbackProps<E>> & { LoadingComponent?: React.ReactNode }
>

/**
 * A wrapper component that does not render its children until we have an access token.
 * Renders `LoadingComponent` while authenticating, which defaults to a centered spinner,
 * and an error message if something went wrong while authenticating (i.e. user needs to verify email)
 */
export const RequiresAuth = memo(function RequiresAuth<E>(props: RequiresAuthProps<E>) {
  const { FallbackComponent, LoadingComponent = <CenteredLoader variant="fancy" color="black" /> } = props
  const accessToken = useAppContext((context) => context.state.auth.accessToken)
  const { authenticationError } = useAuthState()

  useTryToAuthenticate()

  if (authenticationError) {
    // Authentication errors are handled by the FallbackComponent. Login errors should be handled by the login view
    return <FallbackComponent error={authenticationError} />
  }

  if (!accessToken) {
    return LoadingComponent as ReactElement
  }

  return props.children as ReactElement
})
