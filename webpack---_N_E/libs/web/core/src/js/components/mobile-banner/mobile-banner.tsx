import dynamic from "next/dynamic"
import { memo, useEffect } from "react"

import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useAppContext } from "@spatialsys/web/app-context"
import type { MobileBannerViewProps } from "@spatialsys/web/core/js/components/mobile-banner/mobile-banner-view"
import { getIsMobileUa } from "@spatialsys/web/user-agent"

/**
 * Load this with next/dynamic, so that we completely avoid loading it on
 * non-mobile clients
 */
const MobileBannerView = dynamic<MobileBannerViewProps>(() =>
  import(/* webpackChunkName: "mobile-banner-view" */ "./mobile-banner-view").then((module) => module.MobileBannerView)
)

const useShouldShowMobileBanner = () => {
  const hideMobileBannerCount = useAppContext((context) => context.state.mobileBannerHiderCount)
  return getIsMobileUa() && hideMobileBannerCount === 0
}

/** A banner prompting the user to download/open the app, shown on mobile devices */
export const MobileBanner = memo(function MobileBanner() {
  const shouldShowBanner = useShouldShowMobileBanner()
  const [hasUserClosed, setHasUserClosed] = useBoolean(false)

  return shouldShowBanner && !hasUserClosed && <MobileBannerView handleClose={setHasUserClosed.setTrue} />
})

/**
 * Hides the mobile banner while one or more instances of this hook is mounted
 */
export const useHideMobileBanner = () => {
  const actions = useAppContext((context) => context.actions)

  useEffect(() => {
    actions.incrementMobileBannerHiderCount()
    return actions.decrementMobileBannerHiderCount
  }, [actions])
}

/**
 * Hide the mobile banner whenever one or more instances of this component is mounted
 */
export const HideMobileBanner = memo(function HideMobileBanner(props: { children?: React.ReactNode }) {
  useHideMobileBanner()
  return (props.children as React.ReactElement) || null
})
