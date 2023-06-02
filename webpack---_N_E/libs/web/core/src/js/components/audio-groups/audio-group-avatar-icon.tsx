import { memo } from "react"

import { Platform } from "@spatialsys/unity/app-state"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"

import classes from "./audio-group-avatar-icon.module.scss"

export interface AudioGroupParticipant extends ParticipantWithRTC {
  actorNumber: number
  platform: Platform
  isActorTalking: boolean
  isActorMuted: boolean
}

interface AudioGroupAvatarIconProps {
  user: AudioGroupParticipant
}

export const AudioGroupAvatarIcon = memo(function AudioGroupAvatarIcon(props: AudioGroupAvatarIconProps) {
  const { user } = props

  return (
    <AvatarIcon
      className={classes.icon}
      altText={user.displayName}
      playerColor={user.playerColors}
      profilePicUrl={user.profilePicURL}
      showPulseAnimation={user.isActorTalking && !user.isActorMuted}
      placeholder={<NamePlaceholder displayName={user.displayName} isLocalUser={user.isLocalUser} />}
      loadingPlaceholder={<NamePlaceholder displayName={user.displayName} isLocalUser={user.isLocalUser} />}
      applyPlayerColorToPlaceholder
    />
  )
})
