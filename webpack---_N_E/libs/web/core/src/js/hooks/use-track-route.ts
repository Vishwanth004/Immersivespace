import Router from "next/router"
import { useEffect } from "react"

import { Mixpanel, trackRouteChange } from "@spatialsys/web/analytics"

/**
 * Tracks initial route and route changes as analytics events, as well as the initial path
 * as a super property.
 */
export function useTrackRoute() {
  useEffect(() => {
    // Track the initial path as a super property to be able to
    // incorporate entry point into data analysis.
    Mixpanel.register({ "Initial Path Pattern": Router.pathname, "Initial Path": Router.asPath })

    // Track the initial route as an event
    trackRouteChange(Router)

    // Track non-shallow/actual changes to the route
    // See https://nextjs.org/docs/api-reference/next/router#routerevents
    const handleRouteChange = (_: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        trackRouteChange(Router)
      }
    }
    Router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])
}
