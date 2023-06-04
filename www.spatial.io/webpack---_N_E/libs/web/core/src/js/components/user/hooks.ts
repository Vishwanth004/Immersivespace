import { useRouter } from "next/router"
import { useEffect } from "react"

import { useMeQuery } from "@spatialsys/react/query-hooks/sapi/user"
import { useAuthState } from "@spatialsys/web/app-context"
import { sapiClient } from "@spatialsys/web/sapi"

/**
 * Redirects to the onboarding flow if the current user has not completed onboarding yet.
 * Only runs if the `enabled` argument is true
 *
 * @param enabled If true, enable the redirect
 */
export function useRedirectToOnboarding(enabled = false) {
  const { isAuthenticated } = useAuthState()
  const user = useMeQuery(sapiClient, isAuthenticated)
  const { replace } = useRouter()

  useEffect(() => {
    if (!enabled || !user.data) {
      return
    }

    if (user.data?.accountCompletionStatus !== "COMPLETE") {
      void replace("/welcome")
    }
  }, [replace, enabled, user.data])
}
