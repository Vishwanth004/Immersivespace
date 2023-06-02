import clsx from "clsx"
import { memo } from "react"

import classes from "./room-name.module.scss"

interface RoomNameProps {
  className?: string
  classNameInnerWrapper?: string
  classNameText?: string
  classNameInput?: string
  name: string
  onClick?: () => void
}

const RoomName = memo(function RoomName(props: RoomNameProps) {
  const { className, classNameInnerWrapper, classNameText, classNameInput, name, onClick } = props

  const InnerContents = (
    <div className={clsx(classes.innerWrapper, classNameInnerWrapper, classNameText)}>
      <div
        className={clsx(classes.title, classNameText, classNameInput)}
        style={{ width: `${Math.round(name.length * 1.33)}ch` }}
      >
        {name}
      </div>
    </div>
  )

  return onClick ? (
    <button className={clsx(classes.container, className, classes.button)} onClick={onClick}>
      {InnerContents}
    </button>
  ) : (
    <div className={clsx(classes.container, className)}>{InnerContents}</div>
  )
})

export default RoomName
