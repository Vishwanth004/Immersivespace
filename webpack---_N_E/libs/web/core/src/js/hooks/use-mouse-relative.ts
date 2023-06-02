import { RefObject, useCallback, useEffect, useRef } from "react"

/**
 * Returns ref of the mouse position relative to the center of the element.
 * (0, 0) is the top left corner, (1, 1) is the bottom right corner.
 * @param ref The element to measure the mouse position relative to
 * @param enabled Whether to enable the event listener
 */
export function useMouseRelative({ ref, enabled = true }: { ref: RefObject<HTMLElement>; enabled?: boolean }) {
  const mousePosGlobal = useRef({ x: 0, y: 0 })
  const mousePosRelative = useRef({ x: 0, y: 0 })

  const updateMouse = useCallback(() => {
    if (ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      mousePosRelative.current = {
        x: (mousePosGlobal.current.x - left) / width,
        y: (mousePosGlobal.current.y - top) / height,
      }
    }
  }, [ref])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      mousePosGlobal.current = { x: event.clientX, y: event.clientY }
      updateMouse()
    },
    [updateMouse]
  )

  useEffect(() => {
    if (!enabled) {
      return
    }

    // We also listen to scroll events because the element's position changes when the page is scrolled.
    // There are some other edge cases such as window resize and CSS transition, but this is good enough for our use cases.
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("scroll", updateMouse)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("scroll", updateMouse)
    }
  }, [enabled, handleMouseMove, updateMouse])

  return mousePosRelative
}
