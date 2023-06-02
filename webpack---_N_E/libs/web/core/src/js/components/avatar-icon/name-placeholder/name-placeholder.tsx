import clsx from "clsx"

import classes from "./name-placeholder.module.scss"

const getAdjustedName = (name?: string, isLocalUser = false) => {
  const adjusted = name ?? "Anonymous"
  return isLocalUser ? `${adjusted} (You)` : adjusted
}

interface NamePlaceholderProps {
  displayName: string
  isLocalUser?: boolean
  className?: string
}

/** Placeholder element that renders the first letter of the participant's display name if they don't have an avatar. */
const NamePlaceholder = (props: NamePlaceholderProps) => {
  const { displayName, isLocalUser, className } = props
  const adjustedName = getAdjustedName(displayName, isLocalUser)

  return <div className={clsx(classes.container, className)}>{adjustedName.charAt(0)}</div>
}

export default NamePlaceholder
