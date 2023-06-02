import { memoize } from "lodash"

const MOBILE_UA_REGEX = /Android|webOS6|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i

export const isMobileUA = memoize((userAgent: string): boolean => {
  return MOBILE_UA_REGEX.test(userAgent)
})

export const getIsMobileUa = memoize(
  () => typeof navigator !== "undefined" && (isMobileUA(navigator.userAgent) || getIsMobileSafari())
)

export const getIsMobileSafari = memoize((): boolean => {
  // https://stackoverflow.com/questions/56578799/tell-ipados-from-macos-on-the-web
  // iPad Pro safari fakes its user agent to be a desktop browser, so we need to check for touch support.
  // This might break if Apple adds touch screen to macOS devices. ¯\_(ツ)_/¯
  return typeof navigator !== "undefined" && isSafari(navigator.userAgent) && navigator.maxTouchPoints > 2
})

export function isSafari(userAgent: string): boolean {
  return userAgent.includes("Safari/") && !userAgent.includes("Chrome")
}

export function isMobileSafariUa(userAgent: string): boolean {
  return userAgent.includes("Safari/") && /iphone|ipod|ipad/.test(userAgent.toLowerCase())
}

function isChrome(userAgent: string): boolean {
  return userAgent.includes("Chrome/")
}

export function isFirefox(userAgent: string) {
  return userAgent.includes("Firefox/")
}

const safari15_4Or15_5 = /Version\/15\.[4|5]\D/

/**
 * We do not support Safari version 15.4 and 15.5. See DEV-12053
 */
export function isUnsupportedSafariVersion(userAgent: string): boolean {
  return isSafari(userAgent) && safari15_4Or15_5.test(userAgent)
}

export const isiOS = memoize((userAgent: string): boolean => {
  return (
    ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (userAgent.includes("Mac") && "ontouchend" in document)
  )
})

export const isApple = memoize((userAgent: string): boolean => {
  return userAgent.toUpperCase().indexOf("MAC") >= 0
})

export const isAndroid = memoize((userAgent: string): boolean => {
  return userAgent.includes("Android")
})

/**
 * Gets a simplified version of the user agent in the format `{vendor} {version} {platform}`.
 * If browser type is unknown, returns the unmodified user agent.
 */
export const getShortUA = memoize((userAgent: string): string => {
  if (isChrome(userAgent)) {
    const match = /\(([^)]*).*Chrome\/([\d.]+)/.exec(userAgent)
    if (match && match.length >= 3) {
      return `Chrome ${match[2]} (${match[1]})`
    }
  }

  if (isFirefox(userAgent)) {
    const match = /\((.*)(?:; rv:.*\)).*Firefox\/([\d.]+)/.exec(userAgent)
    if (match && match.length >= 3) {
      return `Firefox ${match[2]} (${match[1]})`
    }
  }

  if (isSafari(userAgent)) {
    const match = /\(([^)]*)\).*Version\/([\d.]+).*Safari\/[\d.]+/.exec(userAgent)
    if (match && match.length >= 3) {
      return `Safari ${match[2]} (${match[1]})`
    }
  }

  return userAgent
})
