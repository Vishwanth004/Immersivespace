import Link from "next/link"
import { ReactElement, memo } from "react"

import { PropsWithChildrenRequired } from "@spatialsys/js/types"
import { useMeQuery } from "@spatialsys/react/query-hooks/sapi/user"
import { useAuthState } from "@spatialsys/web/app-context"
import { DefaultAuthFallback } from "@spatialsys/web/core/js/components/auth/fallbacks/fallbacks"
import { RequiresAuth } from "@spatialsys/web/core/js/components/auth/requires-auth"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { FallbackComponentType } from "@spatialsys/web/core/js/components/requires-with-fallback"
import { useRedirectToOnboarding } from "@spatialsys/web/core/js/components/user/hooks"
import { isUserAdmin } from "@spatialsys/web/core/js/components/user/utils"
import { sapiClient } from "@spatialsys/web/sapi"
import { CenteredLoader } from "@spatialsys/web/ui"

import classes from "./requires-user.module.scss"

type RequiresUserProps<E> = PropsWithChildrenRequired & {
  AuthFallbackComponent?: FallbackComponentType<E>
  /**
   * If true, the user must be an admin to view the child component.
   * If the user is not an admin, display a modal with a link to the home page.
   */
  requiresAdmin?: boolean
  /**
   * If true, the user must be fully onboarded to view the child component.
   * If the user is not fully onboarded, redirect to the onboarding flow.
   */
  requiresOnboarded?: boolean
}

const RequiresUserInternal = memo(function RequiresUserInternal<E>(props: RequiresUserProps<E>) {
  const { children, requiresAdmin, requiresOnboarded } = props
  const { isAuthenticated } = useAuthState()
  const user = useMeQuery(sapiClient, isAuthenticated)

  useRedirectToOnboarding(requiresOnboarded)

  // Return on `data` first, so that if a background refetch fails, we use the previously cached data.
  // See: https://tkdodo.eu/blog/status-checks-in-react-query
  if (user.data) {
    if (requiresAdmin && !isUserAdmin(user.data)) {
      return (
        <Modal isOpen darkOverlay>
          <div className="modal-body text-center">
            <div>You must be an admin view this content.</div>
            <div className="modal-cta">
              <Link href="/">Home</Link>
            </div>
          </div>
        </Modal>
      )
    }

    if (requiresOnboarded && user.data.accountCompletionStatus !== "COMPLETE") {
      return null
    }
    return children as ReactElement
  }

  if (user.error) {
    return (
      <div className={classes.error}>
        Sorry, something went wrong while fetching your profile. Try refreshing the page, or logging in again.
        <Link href="/logout" className={classes.logout}>
          Logout
        </Link>
      </div>
    )
  }

  return <CenteredLoader variant="fancy" color="black" />
})

/**
 * A wrapper component that guarantees `user` will always be defined from the `useUser` hook
 *
 * Any child of this component can access the `user` object without having to check if it's defined or not.
 * This component also guarantees that an auth token is available.
 */
export const RequiresUser = memo(function RequiresUser<E>(props: RequiresUserProps<E>) {
  const { AuthFallbackComponent = DefaultAuthFallback } = props
  return (
    <RequiresAuth FallbackComponent={AuthFallbackComponent}>
      <RequiresUserInternal {...props} />
    </RequiresAuth>
  )
})
