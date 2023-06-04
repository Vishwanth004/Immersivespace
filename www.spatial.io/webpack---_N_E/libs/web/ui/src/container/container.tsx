import { forwardRef } from "react"

import { Box } from "../box"
import { createPolymorphicComponent } from "../polymorphic-component"
import { cn } from "../utils"

export type ContainerProps = {
  className?: string
}

const _Container = forwardRef<HTMLDivElement, ContainerProps>(function Container({ className, ...rest }, ref) {
  return (
    <Box
      className={cn(
        "mx-auto w-full",
        "max-w-[100vw] 4xl:max-w-screen-4xl",
        "px-3 sm:px-6 md:px-12 lg:px-[5.75rem]",
        className
      )}
      ref={ref}
      as="div"
      {...rest}
    />
  )
})

_Container.displayName = "Container"

/**
 * Centered container that limits max width and applies padding depending on screen size
 */
export const Container = createPolymorphicComponent<"div", ContainerProps>(_Container)
