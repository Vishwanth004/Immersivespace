import clsx from "clsx"
import { forwardRef } from "react"

import { Button, ButtonProps } from "@spatialsys/web/ui"

type DockPillButtonProps = React.PropsWithChildren<React.HTMLProps<HTMLButtonElement> & Pick<ButtonProps, "leftIcon">>

/**
 * Wrapper around a translucent pill button with some specific styles applied
 */
export const DockPillButton = forwardRef<HTMLButtonElement, DockPillButtonProps>(function DockPillButton(props, ref) {
  const { children, className, ...rest } = props
  return (
    <Button
      ref={ref}
      // Apply custom padding, scale in animation, and remove shadow unless hovered
      // @ts-expect-error ignore Typescript complaining, this is a valid prop
      className={clsx("scaleIn tooltip-host w-fit px-[1.125rem] shadow-none hover:shadow-sm", className)}
      {...rest}
      color="translucent"
      size="lg"
    >
      {children}
    </Button>
  )
})
