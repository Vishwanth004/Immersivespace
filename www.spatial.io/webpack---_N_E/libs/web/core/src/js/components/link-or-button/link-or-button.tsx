import Link from "next/link"
import { ComponentProps, ComponentPropsWithRef, MouseEvent, memo } from "react"

type LinkOrButtonProps = {
  /**
   * If true, renders a button instead of a Link.
   */
  asButton: boolean
  /**
   * If `asButton` is true, this is the `href` attribute of the Link.
   */
  linkHref: string
  /**
   * This is the `onClick` handler of the button or anchor element.
   */
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Renders a Link or a button depending on the value of `asButton`.
 */
export const LinkOrButton = memo(function LinkOrButton(
  props: LinkOrButtonProps & ComponentPropsWithRef<"a"> & ComponentProps<"button">
) {
  const { asButton, linkHref, onClick, children, ...restOfProps } = props
  if (asButton) {
    return (
      <button onClick={onClick} {...restOfProps}>
        {children}
      </button>
    )
  }
  return (
    <Link href={linkHref} onClick={onClick} {...restOfProps}>
      {children}
    </Link>
  )
})
