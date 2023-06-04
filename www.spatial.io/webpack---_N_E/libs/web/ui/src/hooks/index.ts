import { RefObject, useEffect, useState } from "react"

/**
 * Hook that's called when a user clicks outside of an array of refs
 * An adaptation of https://usehooks.com/useOnClickOutside/, that supports an array of refs instead of only a single ref.
 *
 * @param refs Array of refs that will be ignored if it has been clicked
 * @param callback The function invoked when something not in the array of refs is clicked
 */
export function useClickedOutsideOf(refs: RefObject<HTMLElement>[], callback: (e: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const onClick = (e: MouseEvent | TouchEvent) => {
      let clickedRef = false
      refs.forEach((ref) => {
        if (e.target instanceof Element && ref.current && ref.current.contains(e.target)) {
          clickedRef = true
        }
      })

      if (!clickedRef) {
        callback(e)
      }
    }

    window.addEventListener("touchend", onClick)
    window.addEventListener("mouseup", onClick)

    return () => {
      window.removeEventListener("touchend", onClick)
      window.removeEventListener("mouseup", onClick)
    }
  }, [refs, callback])
}

// From https://usehooks.com/useWindowSize/
export function useWindowSize() {
  const getSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  const [windowSize, setWindowSize] = useState(getSize)
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}
