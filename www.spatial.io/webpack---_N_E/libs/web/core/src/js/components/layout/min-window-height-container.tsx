import clsx from "clsx"
import { forwardRef } from "react"

import classes from "./min-window-height-container.module.scss"

/** A container with a `min-height` of `100vh`  */
export const MinWindowHeightContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { centerContents?: boolean; flex?: boolean }
>((props, ref) => {
  const { className, flex, centerContents, ...rest } = props
  return (
    <div
      ref={ref}
      className={clsx(classes.minHeight, flex && classes.flex, centerContents && classes.centerContents, className)}
      {...rest}
    />
  )
})
