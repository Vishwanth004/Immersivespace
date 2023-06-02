import { useRouter } from "next/router"
import { useMemo } from "react"

import Config from "@spatialsys/web/config"

const {
  DYNAMIC_LINK_URL,
  DYNAMIC_LINK_REDIRECT_URL,
  ANDROID_PACKAGE_NAME,
  IOS_BUNDLE_ID,
  IOS_APP_STORE_ID,
  DEPLOYMENT_ENV,
} = Config

/**
 * Creates a Firebase dynamic link for the current route according to
 * https://firebase.google.com/docs/dynamic-links/create-manually
 *
 * Firebase will detect if the user has the app installed, and if so,
 * open the app directly and pass in the route that the user is currently on.
 * Otherwise, Firebase will open the corresponding app store based on their mobile device
 * On desktop, the webpage will be opened like any other URL on the web app.
 */
export const useDynamicLink = (path?: string) => {
  const { asPath } = useRouter()

  return useMemo(() => {
    const url = new URL(DYNAMIC_LINK_URL)
    url.searchParams.set("link", DYNAMIC_LINK_REDIRECT_URL + (path ?? asPath))
    url.searchParams.set("apn", ANDROID_PACKAGE_NAME)
    url.searchParams.set("ibi", IOS_BUNDLE_ID)
    url.searchParams.set("isi", IOS_APP_STORE_ID)

    if (DEPLOYMENT_ENV !== "production") {
      // Fallback links for non-prod environments, use staging apps instead of app store redirect
      url.searchParams.set("ifl", "https://testflight.apple.com/join/YAjvlHe9")
      url.searchParams.set(
        "afl",
        "https://docs.google.com/document/d/1qCtIwYwkf0Xw6HR4x1uCCHEctdYB1JxbyRDhJN7HuZE/edit"
      )
    }

    return url
  }, [asPath, path])
}
