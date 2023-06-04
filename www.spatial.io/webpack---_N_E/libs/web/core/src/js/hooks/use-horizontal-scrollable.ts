import { useCallback, useEffect, useMemo, useState } from "react"

const SCROLL_THRESHOLD_PX = 1

// Ratio of the container width to scroll by
const SCROLL_RATIO = 0.5

type UseHorizontalScrollable = {
  canScrollLeft: boolean
  canScrollRight: boolean
  /** Scrolls the container right by a ratio of the total width. Ratio defaults to {@link SCROLL_RATIO} */
  scrollToLeft: (ratio?: number) => void
  /** Scrolls the container right by a ratio of the total width {@link SCROLL_RATIO} */
  scrollToRight: (ratio?: number) => void
  /**
   * Updates the scrollability state. Should be called by the consumer:
   * - in a callback ref when the component to be tracked is mounted
   * - in the `onScroll` of the component being tracked
   * Is also called on window resize.
   */
  updateCanScroll: () => void
}

type UseHorizontalScrollableOpts = {
  thresholdPx?: number
}

/**
 * Tracks horizontal scrollability of a container.
 *
 * This hook can be implemented in a more abstract way, but we will use it for now
 * until migrating to Framer Motion which exposes a nice useScroll hook: https://www.framer.com/motion/use-scroll/
 */
export const useHorizontalScrollable = (
  ref: React.MutableRefObject<HTMLElement>,
  opts: UseHorizontalScrollableOpts = {}
): UseHorizontalScrollable => {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const { thresholdPx = SCROLL_THRESHOLD_PX } = opts

  const [scrollToLeft, scrollToRight] = useMemo(() => {
    const scrollBy = (ratio: number) => {
      if (ref.current) {
        ref.current.scrollBy({
          left: ratio * ref.current.clientWidth,
          behavior: "smooth",
        })
      }
    }
    return [(ratio = -SCROLL_RATIO) => scrollBy(ratio), (ratio = SCROLL_RATIO) => scrollBy(ratio)]
  }, [ref])

  const updateCanScroll = useCallback(() => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current
      setCanScrollLeft(scrollLeft > thresholdPx)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - thresholdPx)
    }
  }, [ref, thresholdPx])

  useEffect(() => {
    window.addEventListener("resize", updateCanScroll)
    return () => {
      window.removeEventListener("resize", updateCanScroll)
    }
  }, [updateCanScroll])

  return {
    canScrollLeft,
    canScrollRight,
    scrollToLeft,
    scrollToRight,
    updateCanScroll,
  }
}
