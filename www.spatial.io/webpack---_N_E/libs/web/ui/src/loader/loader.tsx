import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"

import { ReactComponent as LoaderIcon } from "@spatialsys/assets/icons/loader.svg"

import { Box } from "../box"
import { createPolymorphicComponent } from "../polymorphic-component"
import { cn } from "../utils"

export const loaderVariants = cva("bg-transparent mx-auto rounded-full", {
  variants: {
    color: {
      black: "text-black",
      white: "text-white",
      gray: "text-gray-400",
      blue: "text-blue",
    },
    size: {
      small: "w-8 h-8",
      large: "w-16 h-16",
      // Sets width and height equal to the font size
      icon: "icon",
    },
    variant: {
      plain: "animate-spin",
      fancy: "border border-current border-solid animate-rotate-plane",
    },
  },
  defaultVariants: { color: "black", size: "large", variant: "plain" },
})

export type LoaderProps = VariantProps<typeof loaderVariants> & {
  className?: string
}

const _Loader = forwardRef<HTMLDivElement, LoaderProps>(function Loader(
  { variant = "plain", color, size, className, ...rest },
  ref
) {
  return (
    <Box className={cn(loaderVariants({ variant, color, size, className }))} ref={ref} as="div" {...rest}>
      {variant === "plain" && <LoaderIcon />}
    </Box>
  )
})

_Loader.displayName = "Loader"

export const Loader = createPolymorphicComponent<"div", LoaderProps>(_Loader)
