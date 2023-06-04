import { logger } from "@spatialsys/web/logger"

// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = () =>
  typeof window !== "undefined" &&
  Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  )

// Keep in sync with the rewrite source value in next.config.js
const SW_URL = `/service-worker.js`

export async function register(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === "undefined") {
    return null
  }

  if ("serviceWorker" in navigator) {
    if (isLocalhost()) {
      // On localhost, first check if the service worker file exists.
      const isValid = await checkValidServiceWorker(SW_URL)
      if (!isValid) return null
    }
    try {
      await navigator.serviceWorker.register(SW_URL)
    } catch (err: any) {
      logger.error(err)
      return null
    }
    return navigator.serviceWorker.ready
  } else {
    return null
  }
}

/**
 * Checks that the given URL does have a service worker script. If it does not
 * exist, unregisters any service workers that may have been installed before
 * and reloads the page to start fresh.
 */
async function checkValidServiceWorker(swUrl: string): Promise<boolean> {
  let response: Response
  try {
    response = await fetch(swUrl, {
      headers: { "Service-Worker": "script" },
    })
  } catch {
    console.log("No internet connection found. App is running in offline mode.")
    return false
  }
  // Ensure service worker exists, and that we really are getting a JS file.
  const contentType = response.headers.get("content-type")
  if (response.status === 404 || contentType?.indexOf("javascript") === -1) {
    // The given service worker script doesn't exist.
    // Unregister any service worker that may have been installed before for
    // this origin (like from developing another app) and reload the page.
    const registration = await navigator.serviceWorker.ready
    await registration.unregister()
    window.location.reload()
    return false
  }
  return true
}
