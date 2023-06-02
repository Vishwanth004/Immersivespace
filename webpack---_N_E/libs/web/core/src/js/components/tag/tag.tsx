import clsx from "clsx"
import { PropsWithChildren } from "react"

import classes from "./tag.module.scss"

type TagProps = PropsWithChildren<{ className?: string; clickable?: boolean }>

export const Tag = (props: TagProps) => {
  const { children, className, clickable = false } = props
  return <div className={clsx(classes.tag, clickable && classes.clickable, className)}>{children}</div>
}
