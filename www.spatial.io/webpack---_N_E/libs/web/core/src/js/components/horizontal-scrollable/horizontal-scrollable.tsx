import clsx from "clsx"
import { memo, useCallback, useRef } from "react"

import { ReactComponent as NavigateBeforeIcon } from "@spatialsys/assets/icons/material-filled/navigate-before.svg"
import { ReactComponent as NavigateNextIcon } from "@spatialsys/assets/icons/material-filled/navigate-next.svg"
import { useHorizontalScrollable } from "@spatialsys/web/core/js/hooks/use-horizontal-scrollable"

import classes from "./horizontal-scrollable.module.scss"

type HorizontalScrollableProps = React.PropsWithChildren<{}>

/**
 * Wraps its children in a container that can be scrolled horizontally with buttons.
 */
export const HorizontalScrollable = memo(function HorizontalScrollable({ children }: HorizontalScrollableProps) {
  const innerContainerRef = useRef<HTMLDivElement>(null)

  const { canScrollLeft, canScrollRight, scrollToLeft, scrollToRight, updateCanScroll } =
    useHorizontalScrollable(innerContainerRef)

  const setInnerContainer = useCallback(
    (el: HTMLDivElement) => {
      innerContainerRef.current = el
      updateCanScroll()
    },
    [updateCanScroll]
  )

  return (
    <div className={classes.container}>
      <button
        className={clsx(classes.scrollButton, classes.left, canScrollLeft && classes.visible)}
        onClick={() => scrollToLeft()}
      >
        <NavigateBeforeIcon className="font-size-inherit" />
      </button>
      <button
        className={clsx(classes.scrollButton, classes.right, canScrollRight && classes.visible)}
        onClick={() => scrollToRight()}
      >
        <NavigateNextIcon className="font-size-inherit" />
      </button>
      <div className={classes.innerContainer} ref={setInnerContainer} onScroll={updateCanScroll}>
        {children}
      </div>
    </div>
  )
})
