import { useEffect, useState } from "react"

import { getIsMobileUa } from "@spatialsys/web/user-agent"

/**
 * Returns true if the user agent is a mobile device.
 * This is safe to use on the server and prevents hydration mismatches. It only checks the user agent in a useEffect,
 * meaning that it will always return `defaultValue` in the first frame.
 */
export const useIsMobile = (initialValue = true) => {
  const [isMobile, setIsMobile] = useState(initialValue)

  useEffect(() => {
    if (typeof window !== "undefined") setIsMobile(getIsMobileUa())
  }, [initialValue])

  return isMobile
}
