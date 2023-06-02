import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import AvatarMediaThumbnail from "@spatialsys/web/core/js/components/avatar-icon/avatar-media-thumbnail/avatar-media-thumbnail"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"

import classes from "./your-profile-button.module.scss"

type YourProfileButtonProps = {
  onClick: () => void
  participant: ParticipantWithRTC
}

export function YourProfileButton(props: YourProfileButtonProps) {
  const { participant, onClick } = props

  const { displayName, profilePicURL, playerColors } = participant

  const Placeholder = <NamePlaceholder displayName={displayName} isLocalUser />

  return (
    <button className={classes.container} onClick={onClick}>
      <AvatarMediaThumbnail
        altText="Your Profile"
        applyPlayerColorToPlaceholder
        media={participant.media}
        mirrored
        playerColor={playerColors}
        profilePicUrl={profilePicURL}
        showShadow
        placeholder={Placeholder}
        loadingPlaceholder={Placeholder}
      />
    </button>
  )
}
