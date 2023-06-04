import { once } from "lodash"

export const enum WebGLAvailability {
  NotAvailable = 0,
  WebGL1 = 1,
  WebGL2 = 2,
}

/**
 * Checks what type of support for WebGL the browser has.
 * The return value will never change, so memoized to save on some perf.
 */
export const getWebGLAvailability = once((): WebGLAvailability => {
  // On server and service worker, just return WebGL2. Try to SSR as much as possible,
  // When the page is hydrated, this will be checked again.
  if (typeof window === "undefined" || typeof document === "undefined") {
    return WebGLAvailability.WebGL2
  }

  const has2 = hasWebGL2()
  if (has2) {
    return WebGLAvailability.WebGL2
  }

  const has1 = hasWebGL1()
  if (has1) {
    return WebGLAvailability.WebGL1
  }

  return WebGLAvailability.NotAvailable
})

const hasWebGL1 = () => {
  const canvas = document.createElement("canvas")
  return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
}

const hasWebGL2 = () => {
  const canvas = document.createElement("canvas")
  return Boolean(canvas.getContext("webgl2"))
}
