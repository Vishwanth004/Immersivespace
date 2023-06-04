/**
 * Adapted from:
 * - https://github.com/mantinedev/mantine/blob/master/src/mantine-utils/src/create-polymorphic-component/create-polymorphic-component.ts
 * - https://scottbolinger.com/create-a-polymorphic-component-with-typescript-and-react/
 */
import { forwardRef } from "react"

import { createPolymorphicComponent } from "../polymorphic-component"

export interface BoxProps {
  children?: React.ReactNode
}

const _Box = forwardRef<HTMLDivElement, BoxProps & { as: any }>((props, ref) => {
  const { as, ...rest } = props
  const Element = as || "div"
  return <Element ref={ref} {...rest} />
})

/**
 * Polymorphic component that allows you to change what element is rendered.
 * Renders a `div` by default.
 *
 * @example
 * // The following would render `<span>`.
 * <Box as="span">Hello world</Box>
 */
export const Box = createPolymorphicComponent<"div", BoxProps>(_Box)
