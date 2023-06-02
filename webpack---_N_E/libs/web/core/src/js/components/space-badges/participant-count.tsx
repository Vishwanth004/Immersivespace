import { ReactComponent as PersonIcon } from "@spatialsys/assets/icons/material-filled/person.svg"

import classes from "./space-badges.module.scss"

type ParticipantCountProps = {
  activeUserCount: number
}

export const ParticipantCount = (props: ParticipantCountProps) => {
  const { activeUserCount } = props
  return (
    <div>
      <PersonIcon className={classes.icon} />
      <span className={classes.activeUserText}>{activeUserCount}</span>
    </div>
  )
}
