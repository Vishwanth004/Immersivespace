import { forwardRef } from "react"

import { Box } from "../box"
import { createPolymorphicComponent } from "../polymorphic-component"
import { cn } from "../utils/cn"

export type SkeletonProps = {
  /** If true, the Skeleton will be hidden */
  isLoaded?: boolean
  animationOffsetMs?: number
  fadeInDelayMs?: number
} & React.ComponentPropsWithoutRef<"div">

const _Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { className, isLoaded, animationOffsetMs = 0, fadeInDelayMs = 0, children, ...rest } = props

  return (
    <Box ref={ref} className={cn("relative rounded-lg", className)} as="div" {...rest}>
      {children}
      {!isLoaded && (
        <div className="animate-opacity-fade-in opacity-0" style={{ animationDelay: `-${fadeInDelayMs}ms` }}>
          <div
            className={cn(
              "absolute inset-0 rounded-lg",
              "bg-gradient-to-r from-[#fafafa] from-10% via-[#f0f0f0] via-40% to-[#fafafa] to-55% bg-[length:1000px_640px]",
              "animate-placeholder-shimmer"
            )}
            style={{ animationDelay: `-${animationOffsetMs}ms` }}
          />
        </div>
      )}
    </Box>
  )
})

_Skeleton.displayName = "Skeleton"

/**
 * Skeleton, used as a placeholder for loading content. You can use it as
 * a standalone component, i.e.
 *
 * ```
 * <Skeleton className="h-1 w-4" />
 * ```
 *
 * You can also wrap another component to take the same width and height.
 * ```
 * <Skeleton as="span">Lorem ipsum dolor</Skeleton>
 *```
 */
export const Skeleton = createPolymorphicComponent<"div", SkeletonProps>(_Skeleton)
