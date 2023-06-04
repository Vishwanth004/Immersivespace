import { memo } from "react"

import { ReactComponent as PeopleOutlineOutlinedIcon } from "@spatialsys/assets/icons/material-outlined/people-outline.svg"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import AvatarMediaThumbnail from "@spatialsys/web/core/js/components/avatar-icon/avatar-media-thumbnail/avatar-media-thumbnail"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"

import classes from "./participants-pill-button.module.scss"

const MAX_ICONS_TO_DISPLAY = 4

const OverflowBadge = ({ numParticipants }: { numParticipants: number }) => {
  if (numParticipants <= MAX_ICONS_TO_DISPLAY) return null

  return <div className={classes.overflowBadge}>+{Math.min(numParticipants - MAX_ICONS_TO_DISPLAY, 99)}</div>
}

type ParticipantsPillButtonProps = {
  onClick: () => void
  participants: ParticipantWithRTC[]
}

export const ParticipantsPillButton = memo(function ParticipantsPillButton(props: ParticipantsPillButtonProps) {
  const { onClick, participants } = props
  const numParticipants = participants.length

  if (numParticipants === 0) {
    return (
      <div className={classes.emptyContainer}>
        <PeopleOutlineOutlinedIcon />
      </div>
    )
  }

  return (
    <button onClick={onClick} className={classes.container}>
      {participants.slice(0, MAX_ICONS_TO_DISPLAY).map((participant, index) => {
        const { media, isLocalUser, displayName, profilePicURL, playerColors } = participant

        const Placeholder = (
          <NamePlaceholder
            displayName={displayName}
            isLocalUser={isLocalUser}
            className={classes.videoAvatarIconPlaceholder}
          />
        )

        return (
          <div key={participant.id} className={classes.videoAvatarIcon} style={{ zIndex: -index }}>
            <AvatarMediaThumbnail
              media={media}
              mirrored={isLocalUser}
              altText={`${displayName}'s Avatar`}
              profilePicUrl={profilePicURL}
              placeholder={Placeholder}
              loadingPlaceholder={Placeholder}
              playerColor={playerColors}
              showShadow
              applyPlayerColorToPlaceholder
            />
          </div>
        )
      })}
      <OverflowBadge numParticipants={numParticipants} />
    </button>
  )
})
