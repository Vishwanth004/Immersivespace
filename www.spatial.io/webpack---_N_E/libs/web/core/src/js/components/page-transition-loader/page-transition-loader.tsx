import { NextRouter, useRouter } from "next/router"
import NProgress from "nprogress"
import { useEffect } from "react"

type UsePageTransitionLoaderOptions = {
  showOnShallowTransitions?: boolean
}

/**
 * Shows a loading bar when transition between pages.
 * Adapted from https://github.com/vercel/next.js/blob/canary/examples/with-loading/pages/_app.tsx
 */
function usePageTransitionLoader(router: NextRouter, opts?: UsePageTransitionLoaderOptions) {
  useEffect(() => {
    const handleStart = (_: string, { shallow }: { shallow: boolean }) => {
      if (!shallow || opts?.showOnShallowTransitions) {
        NProgress.start()
      }
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [opts?.showOnShallowTransitions, router])
}

export function PageTransitionLoader() {
  const router = useRouter()
  usePageTransitionLoader(router)
  return null
}
