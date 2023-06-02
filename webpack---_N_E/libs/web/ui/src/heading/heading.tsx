import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"

import { Box } from "../box"
import { createPolymorphicComponent } from "../polymorphic-component"
import { cn } from "../utils/cn"

const DEFAULT_ELEMENT = "h2"

export const headingVariants = cva("font-heading", {
  variants: {
    size: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
    },
    weight: {
      black: "font-black",
      bold: "font-bold",
      demibold: "font-demibold",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
    },
  },
  defaultVariants: { size: DEFAULT_ELEMENT, weight: "demibold" },
})

export type HeadingProps = VariantProps<typeof headingVariants>

const _Heading = forwardRef<HTMLHeadingElement, HeadingProps & { className?: string }>(function Heading(props, ref) {
  const { className, size, weight, textAlign, ...rest } = props
  // The `as` prop may be overridden by the passed props in `...rest`
  return (
    <Box
      ref={ref}
      as={DEFAULT_ELEMENT}
      className={cn(headingVariants({ size, weight, textAlign, className }))}
      {...rest}
    />
  )
})

_Heading.displayName = "Heading"

/**
 * Render an HTML heading element.
 * By default, renders an `h2` HTML element, with size `h2` and font-weight `demibold` (600).
 * Note that setting the `size` prop will NOT change the underlying element type. Use the `as` prop for that!
 *
 * This component is polymorphic, it can render any HTML element using the `as` prop.
 *
 * Props:
 * - `size` - The size of the heading. This will change the font size, but not the underlying HTML element. Defaults to `h2`.
 * - `weight` - The font weight of the heading. Defaults to `demibold`.
 * - `textAlign` - The text alignment of the heading. Defaults to `undefined`.
 *
 * @example
 * // Render <h1> HTML element with the default (h2) style.
 * <Heading as="h1">Heading</Heading>
 *
 * // Change the style using the `size` and `weight` props
 * <Heading size="h1" weight="black">Heading</Heading>
 *
 * // Pass classnames, Tailwind classes will be merged in the correct order automatically
 * <Heading size="h1" weight="black" className="text-center px-2">Heading</Heading>
 *
 * @see https://www.figma.com/file/x105MEPt0PftFzb3rRVa6V/Spatial-Platform-2022?node-id=3920-67708&t=7gib63pJcBfWobd0-4
 */
export const Heading = createPolymorphicComponent<"h2", HeadingProps>(_Heading)
