import { VariantProps, cva } from "class-variance-authority"
import clsx from "clsx"
import { forwardRef } from "react"

import { Box } from "../box"
import { Loader } from "../loader"
import { createPolymorphicComponent } from "../polymorphic-component"
import { cn } from "../utils/cn"

const BASE_STYLES =
  "relative inline-flex items-center justify-center font-heading text-sm font-demibold normal-case no-underline transition"
const FOCUS_STYLES = "focus-visible:outline-none"
const DISABLED_STYLES =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-20 disabled:shadow-none"
const LOADING_STYLES =
  "data-[loading=true]:pointer-events-none data-[loading=true]:cursor-not-allowed data-[loading=true]:opacity-20 data-[loading=true]:shadow-none"

export const buttonVariants = cva(
  // clsx is used just to make this more readable, breaking line by state
  clsx(BASE_STYLES, FOCUS_STYLES, DISABLED_STYLES, LOADING_STYLES),
  {
    variants: {
      variant: {
        pill: "rounded-[6.25rem] hover:scale-110 ",
        text: "hover:underline",
      },
      size: { sm: "h-8 text-xs", md: "h-10", lg: "h-12 text-base", xl: "h-14 text-base" },
      color: { black: "", outline: "", blue: "", white: "", red: "", translucent: "" },
    },
    compoundVariants: [
      // Pill + color: define bg, color, and shadow
      { variant: "pill", color: "black", class: "bg-black text-white shadow-light-gray" },
      { variant: "pill", color: "outline", class: "border-2 border-solid border-light-gray bg-transparent text-black" },
      { variant: "pill", color: "blue", class: "bg-blue text-white shadow-blue/20" },
      { variant: "pill", color: "white", class: "bg-white text-black shadow-light-gray" },
      { variant: "pill", color: "red", class: "bg-red text-white shadow-red/20" },
      { variant: "pill", color: "translucent", class: "bg-black/30 text-white shadow-black/20" },

      // Pill + size: define x-padding
      { variant: "pill", size: "sm", class: "px-4" },
      { variant: "pill", size: "md", class: "px-6" },
      { variant: "pill", size: "lg", class: "px-7" },
      { variant: "pill", size: "xl", class: "px-8" },

      // Pill + size + color
      // All variants except outline have a shadow
      {
        variant: "pill",
        color: ["black", "blue", "white", "red", "translucent"],
        size: ["sm", "md", "lg"],
        class: "shadow-sm",
      },
      { variant: "pill", color: ["black", "blue", "white", "red", "translucent"], size: "xl", class: "shadow-md" },

      // Outline + color: define color
      { variant: "text", color: "black", class: "text-black" },
      { variant: "text", color: "outline", class: "text-black" },
      { variant: "text", color: "blue", class: "text-blue" },
      { variant: "text", color: "white", class: "text-white" },
      { variant: "text", color: "red", class: "text-red" },
      { variant: "text", color: "translucent", class: "text-black" },

      // Outline + size: define x-padding
      { variant: "text", size: "sm", class: "px-2" },
      { variant: "text", size: "md", class: "px-2.5" },
      { variant: "text", size: "lg", class: "px-4" },
      { variant: "text", size: "xl", class: "px-5" },
    ],
    defaultVariants: { variant: "pill", size: "md", color: "black" },
  }
)

const buttonIconVariants = cva("inline-flex flex-shrink-0", {
  variants: {
    size: { sm: "mr-1", md: "mr-1.5", lg: "mr-1.5", xl: "mr-2" },
  },
})

const buttonLoaderVariants = cva("text-inherit", {
  variants: {
    size: { sm: "text-2xl", md: "text-3xl", lg: "text-3xl", xl: "text-4xl" },
  },
})

export type ButtonProps = React.PropsWithChildren<
  VariantProps<typeof buttonVariants> & {
    /** Set the width of the button to 100%. Convenience prop for applying `className="w-full"` */
    fullWidth?: boolean
    /**
     * If true, a loading spinner is rendered. The button's width will be left unchanged.
     * The `data-loading` attribute is set to `true` when `isLoading` is true.
     * The `disabled` attribute is set to `true` when `isLoading` is true by default. This can be overridden by passing
     * the `disabled` prop.
     */
    isLoading?: boolean
    /** If defined, an icon will be displayed before the button's label */
    leftIcon?: React.ReactElement
    /** Disable box-shadow. Convenience prop for applying `className="shadow-none"` */
    noShadow?: boolean
  }
>

type ButtonContentProps = Pick<ButtonProps, "size" | "leftIcon" | "children">

function ButtonContent(props: ButtonContentProps) {
  const { size, leftIcon, children } = props

  return (
    <>
      {leftIcon && <span className={cn(buttonIconVariants({ size }))}>{leftIcon}</span>}
      {children}
    </>
  )
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps & { className?: string; disabled?: boolean }>(function Button(
  props,
  ref
) {
  const { className, color, size, variant, children, fullWidth, leftIcon, disabled, isLoading, noShadow, ...rest } =
    props
  const contentProps = { size, leftIcon, children }
  const classes = cn(fullWidth && "w-full", noShadow && "shadow-none", className)
  // @ts-expect-error `as` is a valid prop, ignore the error.
  const as = props.as ?? "button"
  // Default `type` to "button" if `as` is "button"
  const type = as === "button" ? "button" : undefined

  // The `as` prop may be overridden by the passed props in `...rest`
  return (
    <Box
      ref={ref}
      as={as}
      className={cn(buttonVariants({ color, size, variant, className: classes }))}
      disabled={disabled ?? isLoading}
      data-loading={isLoading}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="absolute absolute-center">
            <Loader size="icon" className={buttonLoaderVariants({ size })} />
          </span>
          <span className="opacity-0">
            <ButtonContent {...contentProps} />
          </span>
        </>
      ) : (
        <ButtonContent {...contentProps} />
      )}
    </Box>
  )
})

_Button.displayName = "Button"

/**
 * Button component.
 * This component is polymorphic, it can render any HTML element using the `as` prop.
 *
 * @param {string} color - Defaults to `black`.
 * @param {string} size - Defaults to `md`.
 * @param {string} variant - Defaults to `pill`.
 * @param {boolean} isLoading - If true, a loading spinner is rendered. The button's width will be left unchanged, and `disabled` will be set to true.
 * @param {React.ReactElement} leftIcon - If defined, an icon will be displayed before the button's label.
 *
 * @example
 * <Button color="blue" size="xl">Click Me!</Button>
 *
 * @example
 * // Buttons can be set as `Link` from next/link!
 * <Button as={Link} href="/">
 *  Home
 * </Button>
 *
 * @see https://www.figma.com/file/x105MEPt0PftFzb3rRVa6V/Spatial-Platform-2023?node-id=1772-15501&t=e7CrUqONjl4AG9eU-4
 */
export const Button = createPolymorphicComponent<"button", ButtonProps>(_Button)
