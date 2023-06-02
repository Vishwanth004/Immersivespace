import clsx from "clsx"
import { HTMLProps, memo } from "react"

import classes from "./keyboard-key.module.scss"

type KeyboardKeyProps = KeyboardKeyOutlinedProps & {
  barColor?: "light" | "dark"
}

export const KeyboardKey = memo(function KeyboardKey(props: KeyboardKeyProps) {
  const { barColor = "light", keyStr, className, textClassName, ...rest } = props

  return (
    <div className={clsx("h-full w-full bg-white", classes.container, classes.shadow, className)} {...rest}>
      <div className={clsx(classes.key, textClassName)}>{keyStr}</div>
      <div className={clsx(classes.bar, barColor === "light" ? classes.light : classes.dark)} />
    </div>
  )
})

type KeyboardKeyOutlinedProps = HTMLProps<HTMLDivElement> & {
  keyStr: React.ReactNode
  textClassName?: string
}

export const KeyboardKeyOutlined = memo(function KeyboardKeyOutlined(props: KeyboardKeyOutlinedProps) {
  const { keyStr, className, textClassName, ...rest } = props

  return (
    <div className={clsx("border border-solid border-current", classes.container, className)} {...rest}>
      <div className={clsx("text-current", classes.key, textClassName)}>{keyStr}</div>
      <div className={clsx("bg-current", classes.bar)} />
    </div>
  )
})
