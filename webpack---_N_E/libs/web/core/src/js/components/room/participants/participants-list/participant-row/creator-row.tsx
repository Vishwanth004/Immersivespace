import { useCallback } from "react"

import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { SocialProfileState } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"
import { FollowButtonInRoom } from "@spatialsys/web/core/js/components/user-profile/follow-button-in-room"

import { UserInfoGroup } from "./user-info-group"

import classes from "./creator-row.module.scss"

interface CreatorRowProps {
  profile: SocialProfileState
  userID: string
  scrollOffset: number
}
export const CreatorRow = (props: CreatorRowProps) => {
  const { profile, userID, scrollOffset } = props
  const {
    displayName,
    profilePictureURL,
    appearanceCustomization: { profileColor },
  } = profile

  const playerColor = getPlayerColor(profileColor)

  const localUserID = useAppContext((context) => context.state.unity.appState.userProfile.userID)
  const isLocalUser = userID === localUserID

  const renderProfileImage = useCallback(() => {
    return (
      <div className={classes.profilePicContainer}>
        <AvatarIcon
          profilePicUrl={profilePictureURL}
          loadingPlaceholder={<NamePlaceholder displayName={displayName} className={classes.avatarIconPlaceholder} />}
          placeholder={<NamePlaceholder displayName={displayName} className={classes.avatarIconPlaceholder} />}
          applyPlayerColorToPlaceholder
          playerColor={playerColor}
          altText={`${displayName}'s avatar`}
        />
      </div>
    )
  }, [displayName, playerColor, profilePictureURL])

  const renderFollowButtonIfAble = useCallback(() => {
    if (isLocalUser) {
      return
    }

    return <FollowButtonInRoom userID={userID} className="h-10 min-w-[136px] border border-gray-300" />
  }, [isLocalUser, userID])

  return (
    <div className={classes.container}>
      <UserInfoGroup
        socialProfile={profile}
        userID={userID}
        scrollOffset={scrollOffset}
        profileImageComponent={renderProfileImage()}
        openProfileCardDownwards
      />
      {renderFollowButtonIfAble()}
    </div>
  )
}
