import clsx from "clsx"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { SocialProfileState } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import { UserProfileCardPopup } from "@spatialsys/web/core/js/components/user-profile/user-profile-card-popup"
import { Heading } from "@spatialsys/web/ui"

import classes from "./user-info-group.module.scss"

export interface UserInfoGroupProps {
  participant?: ParticipantWithRTC
  socialProfile?: SocialProfileState
  userID: string
  handlePin?: () => void
  scrollOffset: number
  profileImageComponent: ReactNode
  openProfileCardDownwards?: boolean
}

export const UserInfoGroup = (props: UserInfoGroupProps) => {
  const {
    participant,
    socialProfile,
    userID,
    handlePin,
    scrollOffset,
    profileImageComponent,
    openProfileCardDownwards,
  } = props

  const profile = socialProfile ?? participant?.socialProfile
  const displayName = profile?.displayName ?? participant?.displayName

  const isSelectedUserAuthless = participant?.isAuthless ?? false

  const hasMedia = Boolean(participant?.media)
  const localUserID = useAppContext((context) => context.state.unity.appState.userProfile.userID)
  const isLocalUser = userID === localUserID

  const [isHovered, setIsHovered] = useBoolean()
  const [showProfileCard, setShowProfileCard] = useState(false)

  const [isProfileCardFullSize, setIsProfileCardFullSize] = useState(false)

  const profileUrl = !isSelectedUserAuthless ? profile?.url : null

  const name = useMemo(() => {
    if (isLocalUser) {
      return `${displayName} (You)`
    } else {
      return displayName ?? "Anonymous"
    }
  }, [displayName, isLocalUser])

  const popupPivotY = openProfileCardDownwards ? -32 - scrollOffset : 32 - scrollOffset

  // POPUP_ANIMATION_HEADROOM is a headroom for the component to mount and have styles set to start of transition
  const POPUP_ANIMATION_HEADROOM = 20
  const POPUP_ANIMATION_DURATION = 150

  useEffect(() => {
    let timeoutMS = 0
    if (isHovered) {
      timeoutMS = 750
    } else {
      timeoutMS = 500 - POPUP_ANIMATION_HEADROOM
    }
    const showEvent = setTimeout(() => {
      setShowProfileCard(isHovered)
    }, timeoutMS)

    const fullSizeEvent = setTimeout(() => {
      setIsProfileCardFullSize(isHovered)
    }, timeoutMS + (isHovered ? POPUP_ANIMATION_HEADROOM : -POPUP_ANIMATION_DURATION - POPUP_ANIMATION_HEADROOM))

    return () => {
      clearTimeout(showEvent)
      clearTimeout(fullSizeEvent)
    }
  }, [isHovered, setIsProfileCardFullSize, setShowProfileCard])

  /**
   *  The goal of the 3 functions below is to open the users media if they're sharing and the profile depending on where you click
   *
   *  - Case 1: not sharing media
   *    - Clicking anywhere in the row opens the profile page
   *  - Case 2: sharing media
   *    - Clicking the media or the pin will open the lightbox
   *    - Clicking the display name will open the profile
   */

  /**
   * The div is only clickable when media (webcam or screenshare) is being shared and not currently showing profile card
   *
   * If media is not being shared, we don't want the div to handle any click.
   *
   * This way user can click the media or the pin to open the video lightbox (handleClickOnAvatar) and the display name (handleClickParticipantName) to open the profile
   */
  const handleClickOnDiv = useCallback(() => {
    if (handlePin && hasMedia) {
      handlePin()
    }
  }, [handlePin, hasMedia])

  const handleClickOnAvatar = useCallback(() => {
    if (hasMedia) {
      if (handlePin) {
        handlePin()
      }
    }
  }, [hasMedia, handlePin])

  const profileImage = (
    <>
      {!hasMedia && <div className={classes.avatarOverlay}></div>}
      {profileImageComponent}
    </>
  )

  return (
    <div
      className={clsx(classes.userInfoWrapper, {
        [classes.clickable]: hasMedia,
      })}
      onMouseEnter={setIsHovered.setTrue}
      onMouseLeave={setIsHovered.setFalse}
      onClick={handleClickOnDiv}
    >
      {profileUrl && !hasMedia ? (
        <a href={profileUrl} className={classes.avatarContainer} target="_blank" rel="noreferrer">
          {profileImage}
        </a>
      ) : (
        <div className={classes.avatarContainer} onClick={handleClickOnAvatar}>
          {profileImage}
        </div>
      )}

      {profileUrl ? (
        <a href={profileUrl} className={classes.participantNameLink} target="_blank" rel="noreferrer">
          <Heading as="h3" size="h4" className="ml-4 mr-2 line-clamp-1 flex-1">
            {name}
          </Heading>
        </a>
      ) : (
        <Heading as="h3" size="h4" className="ml-4 mr-2 line-clamp-1 flex-1">
          {name}
        </Heading>
      )}

      {profile && showProfileCard && (
        <div
          className={classes.profileCardPopupPivot}
          style={{
            transform: `translate(72px, ${popupPivotY}px)`,
          }}
          onClick={(e) => {
            e.stopPropagation() // prevents opening of profile because of `handleClickOnDiv`
          }}
        >
          <UserProfileCardPopup
            animationDuration={POPUP_ANIMATION_DURATION}
            isFullSize={isProfileCardFullSize}
            userID={userID}
            isLocalUser={isLocalUser}
            openDownwards={openProfileCardDownwards}
            showViewProfileButton
            showModerationDropdown
          />
        </div>
      )}
    </div>
  )
}
