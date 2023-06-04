import { memo, useCallback, useState } from "react"

import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { TrackedComponents, withTrackedComponentByMount } from "@spatialsys/react/analytics"
import { useGetSocialProfileQueryInRoom } from "@spatialsys/react/query-hooks/users/use-get-social-profile-query-in-room"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"
import { BlockConfirmationModal } from "@spatialsys/web/core/js/components/chat/block-confirmation-modal/block-ban-confirmation-modal"
import { ModerationAction } from "@spatialsys/web/core/js/components/moderation/constants"
import { ModerationDropdownMenu } from "@spatialsys/web/core/js/components/moderation/moderation-dropdown-menu"
import { SpaceBanConfirmModal } from "@spatialsys/web/core/js/components/space-ban-confirm-modal/space-ban-confirm-modal"
import { FollowButtonInRoom } from "@spatialsys/web/core/js/components/user-profile/follow-button-in-room"
import { UserProfileReportModal } from "@spatialsys/web/core/js/components/user-profile/user-profile-report-modal"
import { sapiUsersClient } from "@spatialsys/web/sapi"
import { Button, CenteredLoader, Heading } from "@spatialsys/web/ui"

import classes from "./user-profile-card-in-room.module.scss"

export interface UserProfileCardInRoomProps {
  userID: string
  showViewProfileButton?: boolean
  showModerationDropdown?: boolean
}

export const UserProfileCardInRoom = withTrackedComponentByMount(
  memo(function UserProfileCardInRoom(props: UserProfileCardInRoomProps) {
    const { showViewProfileButton, showModerationDropdown, userID } = props

    const localUserID = useAppContext((context) => context.state.unity.appState.userProfile.userID)
    const isLocalUser = localUserID === userID
    const localUserIsAdmin = useAppContext((context) =>
      AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState)
    )
    const isBlocked = useAppContext((context) => AppStateSelectors.isUserBlocked(context.state.unity.appState, userID))
    const room = useAppContext((context) => AppStateSelectors.getCurrentRoom(context.state.unity.appState))

    const [moderationAction, setModerationAction] = useState(ModerationAction.None)
    const resetModerationAction = useCallback(() => setModerationAction(ModerationAction.None), [])
    const unblockUser = useCallback(() => {
      UnityMessages.unblockUser(userID)
      resetModerationAction()
    }, [userID, resetModerationAction])

    const participantMetadata = useAppContext((context) =>
      AppStateSelectors.getParticipantMetadata(context.state.unity.appState, userID)
    )

    const {
      isAuthless,
      isInitialLoading,
      data: socialProfile,
    } = useGetSocialProfileQueryInRoom(sapiUsersClient, { userID }, participantMetadata)

    if (isInitialLoading) {
      return (
        <div className={classes.loadingContainer}>
          <CenteredLoader color="black" useRelativePosition variant="fancy" />
        </div>
      )
    }

    if (socialProfile) {
      const {
        about,
        appearanceCustomization: { profileColor },
        avatarImageURL,
        displayName,
        numSpaces,
        numFollowers,
        numFollowing,
        username,
      } = socialProfile

      const userProfileUrl = `/@${username}`
      const playerColor = getPlayerColor(profileColor)

      const ProfileImage = (
        <AvatarIcon
          profilePicUrl={avatarImageURL}
          loadingPlaceholder={<NamePlaceholder displayName={displayName} className={classes.avatarIconPlaceholder} />}
          placeholder={<NamePlaceholder displayName={displayName} className={classes.avatarIconPlaceholder} />}
          applyPlayerColorToPlaceholder
          playerColor={playerColor}
          altText={`${displayName}'s avatar`}
        />
      )

      return (
        <div className={classes.container}>
          <div className={classes.profileBody}>
            <div className={classes.profilePicContainer}>
              {isAuthless ? (
                ProfileImage
              ) : (
                <a className={classes.profileLink} href={userProfileUrl} target="_blank" rel="noreferrer">
                  {ProfileImage}
                </a>
              )}
              {showModerationDropdown && !isLocalUser && (
                <div className={classes.overflowButton}>
                  <ModerationDropdownMenu
                    isBlocked={isBlocked}
                    onBlock={() => setModerationAction(ModerationAction.Block)}
                    onUnblock={unblockUser}
                    onReport={() => setModerationAction(ModerationAction.Report)}
                    onRemove={() => setModerationAction(ModerationAction.Remove)}
                    showRemoveButton={localUserIsAdmin}
                  />
                </div>
              )}
            </div>

            {isAuthless ? (
              <>
                <Heading as="h1" size="h1" textAlign="center">
                  {displayName}
                </Heading>
                <span>Guest User</span>
              </>
            ) : (
              <>
                <a className={classes.profileLink} href={userProfileUrl} target="_blank" rel="noreferrer">
                  <Heading as="h1" size="h1" textAlign="center">
                    {displayName}
                  </Heading>
                </a>

                <div className={classes.profileInfoRow}>
                  <Heading as="h4" size="h5">
                    <b>{numSpaces}</b> spaces
                  </Heading>
                  <Heading as="h4" size="h5">
                    <b>{numFollowers}</b> followers
                  </Heading>
                  <Heading as="h4" size="h5">
                    <b>{numFollowing}</b> following
                  </Heading>
                </div>
                <p className={classes.description}>{about}</p>
                <div className={classes.profileInfoRow}>
                  {!isLocalUser && <FollowButtonInRoom className="min-w-[132px]" userID={userID} />}
                  {showViewProfileButton && (
                    <Button
                      color="outline"
                      size="xl"
                      as="a"
                      className="min-w-[132px]"
                      href={userProfileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Profile
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <BlockConfirmationModal
            blockTarget={moderationAction === ModerationAction.Block ? { userId: userID, displayName } : undefined}
            handleClose={resetModerationAction}
          />
          <UserProfileReportModal
            isOpen={moderationAction === ModerationAction.Report}
            userId={userID}
            displayName={displayName}
            roomId={room.id}
            onClose={resetModerationAction}
          />
          <SpaceBanConfirmModal
            isOpen={moderationAction === ModerationAction.Remove}
            user={{ userID }}
            onClose={resetModerationAction}
          />
        </div>
      )
    }

    return (
      <div className={classes.errorContainer}>
        Sorry, something went wrong while fetching this profile. Please try again later.
      </div>
    )
  }),
  { id: TrackedComponents.UserProfilePanel }
)
