import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { LazyMotion } from "framer-motion"
import { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useEffect, useMemo } from "react"
import Modal from "react-modal"
import { ToastContainer, toast } from "react-toastify"

import "setimmediate"
import "@spatialsys/web/core/css/nprogress.scss"
import "@spatialsys/web/core/js/components/app/app.scss"
import "./styles.css"
// Global CSS from third-party libraries
import "@solana/wallet-adapter-react-ui/styles.css"
import "react-popper-tooltip/dist/styles.css"

import { TrackingContextProvider } from "@spatialsys/react/analytics"
import { track } from "@spatialsys/web/analytics"
import { AppProvider, ReactQueryProvider } from "@spatialsys/web/app-context"
import { AuthContextAppProps } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import { MobileBanner } from "@spatialsys/web/core/js/components/mobile-banner/mobile-banner"
import { ReduxStateInspector } from "@spatialsys/web/core/js/components/redux-state-inspector"
import { DescriptionTags, OgImageTag, TitleTags } from "@spatialsys/web/core/js/components/seo/seo"
import { SpatialUnityCanvas } from "@spatialsys/web/core/js/components/spatial-unity-web-gl/spatial-unity-canvas"
import { GoogleTagManagerScript } from "@spatialsys/web/core/js/components/third-party-scripts/google-tag-manager"
import { useScrollRestoration } from "@spatialsys/web/core/js/hooks/use-scroll-restoration"
import { useTrackRoute } from "@spatialsys/web/core/js/hooks/use-track-route"
import FatalExceptionModal from "@spatialsys/web/core/js/routes/rooms/room/fatal-exception-modal"
import { getSpatialUid, setSpatialUid } from "@spatialsys/web/core/js/spatial-uid"
import { getNextAppRootNode } from "@spatialsys/web/core/js/util/dom"
import { replacer } from "@spatialsys/web/core/js/util/redux-serialize"

import type { SpacePageProps } from "./s/[slugAndId]"

type CustomAppProps = AppProps<AuthContextAppProps & Partial<SpacePageProps>>

const GlobalModals = dynamic(
  () =>
    import(
      /* webpackChunkName: "global-modals" */ "@spatialsys/web/core/js/components/global-modals/global-modals"
    ).then((mod) => mod.GlobalModals),
  { ssr: false }
)
const PageTransitionLoader = dynamic(
  () =>
    import(
      /* webpackChunkName: "page-transition-loader" */ "@spatialsys/web/core/js/components/page-transition-loader/page-transition-loader"
    ).then((mod) => mod.PageTransitionLoader),
  { ssr: false, loading: () => null }
)

toast.configure({
  style: { bottom: "6rem", maxWidth: "95%" },
})

// Sets Spatial UID header on all API requests
setSpatialUid()

const serialize = {
  replacer,
}

// https://www.framer.com/motion/guide-reduce-bundle-size/
const loadMotionFeatures = () =>
  import(/* webpackChunkName: "framer-motion-features" */ "framer-motion").then((mod) => mod.domMax)

const AppSkeleton = ({ Component, pageProps }: CustomAppProps) => {
  /*
   * Determine the width of the scrollbar and set it as a CSS variable.
   * When a modal is opened which hides scrollbar on the `body`, the CSS variable is used to apply a corresponding `margin-right` to prevent UI layout shift.
   * Note: Ideally, we should actually run this _every_ time a modal is opened, since we don't have a scrollbar present
   * on every page. However, since most routes have scrollbars, this isn't a problem in practice.
   */
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`)
  }, [])

  useEffect(() => {
    Modal.setAppElement(getNextAppRootNode())
  }, [])

  const spatialUid = useMemo(getSpatialUid, [])

  useTrackRoute()
  useScrollRestoration()

  return (
    <TrackingContextProvider track={track}>
      <ReactQueryProvider pageProps={pageProps}>
        <ReactQueryDevtools position="top-right" />
        <ReduxStateInspector name="Spatial Web" serialize={serialize}>
          <ToastContainer enableMultiContainer />
          <AppProvider
            authSession={pageProps?.authSession}
            hasTriedAuth={pageProps?.hasTriedAuth}
            spaceId={pageProps?.spaceId}
            spatialUid={spatialUid}
            renderFatalException={(reloadUnity) => <FatalExceptionModal onRequestClose={reloadUnity} />}
          >
            <LazyMotion strict features={loadMotionFeatures}>
              <Component {...pageProps} />
              <MobileBanner />
              <GlobalModals />
              <PageTransitionLoader />
              <SpatialUnityCanvas />
            </LazyMotion>
          </AppProvider>
        </ReduxStateInspector>
      </ReactQueryProvider>
    </TrackingContextProvider>
  )
}

function CustomApp(props: CustomAppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
        {TitleTags("Spatial - Your World Awaits", { suffix: false })}
        {DescriptionTags(
          "Unleash your creativity with Spatial! Explore worlds, create characters, play games and connect with millions around the world on web, mobile, and VR."
        )}
        {OgImageTag(`${Config.PUBLIC_ASSETS_BASE_URL}/spatial.io/og-image.jpg`)}
      </Head>

      {/* Third party scripts */}
      {Config.DEPLOYMENT_ENV === "production" && <GoogleTagManagerScript />}

      <AppSkeleton {...props} />
    </>
  )
}

export default CustomApp
