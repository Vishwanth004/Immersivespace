import clsx from "clsx"

import type { ParticipantWithRTC } from "@spatialsys/web/app-state"
import AvatarMediaThumbnail from "@spatialsys/web/core/js/components/avatar-icon/avatar-media-thumbnail/avatar-media-thumbnail"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"
import { PulseAnimation } from "@spatialsys/web/core/js/components/avatar-icon/pulse-animation/pulse-animation"

import classes from "./avatar-button.module.scss"

const enum Shape {
  Circle = "circle",
  Rectangle = "rectangle",
}

interface AvatarButtonProps {
  participant: ParticipantWithRTC
  handleClick?: () => void
  isPinned?: boolean
  className?: string
  isFaded?: boolean
}

/**
 * Clickable avatar in each participant row
 * If the avatar has RTC, clicking the avatar will pin the RTC feed
 * The avatar will have a blue pulse if the participant is currently speaking
 * The avatar will have a `playerColor` border if the avatar is currently pinned
 */
const AvatarButton = (props: AvatarButtonProps) => {
  const { participant, handleClick, isFaded, isPinned, className } = props
  const { profilePicURL, displayName, isLocalUser, isTalking, isMuted, media, playerColors } = participant

  const rtcMedia = media?.raw
  const status = media?.status ?? "no-video" // Required to update the useEffect and set the `srcObject` once the media stream is available
  const shape = rtcMedia?.mediaType === "Screen" ? Shape.Rectangle : Shape.Circle
  const isSpeaking = isTalking && !isMuted

  const VideoAvatar = (
    <>
      <PulseAnimation shouldPulse={isSpeaking} playerColors={playerColors} />
      <AvatarMediaThumbnail
        media={media}
        mirrored={isLocalUser}
        altText={`${displayName}'s Avatar`}
        profilePicUrl={profilePicURL}
        placeholder={
          <NamePlaceholder
            displayName={displayName}
            isLocalUser={isLocalUser}
            className={classes.avatarIconPlaceholder}
          />
        }
        loadingPlaceholder={
          <NamePlaceholder
            displayName={displayName}
            isLocalUser={isLocalUser}
            className={classes.avatarIconPlaceholder}
          />
        }
        playerColor={playerColors}
        applyPlayerColorToPlaceholder
        isFaded={isFaded}
      />
    </>
  )

  if (status === "no-video") {
    return <div className={clsx(classes.container, classes[shape], className)}>{VideoAvatar}</div>
  }

  return (
    <button
      className={clsx(
        classes.container,
        classes[shape],
        {
          [classes.disabled]: !rtcMedia,
          [classes.buttonWithRtc]: !!rtcMedia,
          [classes.pinned]: isPinned,
        },
        className
      )}
      disabled={!rtcMedia}
      onClick={handleClick}
      style={{ borderColor: playerColors.mainColor }}
    >
      {VideoAvatar}
    </button>
  )
}

export default AvatarButton
