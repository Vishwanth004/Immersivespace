import clsx from "clsx"
import { memo } from "react"

import {
  UserProfileCardInRoom,
  UserProfileCardInRoomProps,
} from "@spatialsys/web/core/js/components/user-profile/user-profile-card-in-room"

import classes from "./user-profile-card-popup.module.scss"

interface UserProfileCardPopupProps extends UserProfileCardInRoomProps {
  animationDuration: number
  isFullSize: boolean
  isLocalUser: boolean
  openDownwards?: boolean
}

export const UserProfileCardPopup = memo((props: UserProfileCardPopupProps) => {
  const { animationDuration, isFullSize, openDownwards } = props

  return (
    <div
      className={clsx(
        classes.profileCardPopupContainer,
        isFullSize && classes.fullSize,
        openDownwards && classes.openDownwards
      )}
      style={{ transitionDuration: `${animationDuration}ms` }}
    >
      <UserProfileCardInRoom {...props} />
    </div>
  )
})
