import clsx from "clsx"
import Link from "next/link"
import { memo, useCallback, useEffect, useMemo, useState } from "react"

import { ReactComponent as EditCategoriesIcon } from "@spatialsys/assets/icons/edit-categories.svg"
import { ReactComponent as OutlinedHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite-border.svg"
import { ReactComponent as FilledHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite.svg"
import { ReactComponent as VisitIcon } from "@spatialsys/assets/icons/material-filled/visibility.svg"
import { ParticipantProfile } from "@spatialsys/js/sapi/clients/sapi"
import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import { BlockConfirmationModal } from "@spatialsys/web/core/js/components/chat/block-confirmation-modal/block-ban-confirmation-modal"
import { ModerationAction } from "@spatialsys/web/core/js/components/moderation/constants"
import { ManageDropdownMenu } from "@spatialsys/web/core/js/components/room/participants/manage-users/manage-dropdown-menu/manage-dropdown-menu"
import { ParticipantsModalViews } from "@spatialsys/web/core/js/components/room/participants/participants-modal/participants-modal"
import { SpaceBanConfirmModal } from "@spatialsys/web/core/js/components/space-ban-confirm-modal/space-ban-confirm-modal"
import { Tag } from "@spatialsys/web/core/js/components/tag/tag"
import { UserProfileReportModal } from "@spatialsys/web/core/js/components/user-profile/user-profile-report-modal"
import { useFirstQuestSpace } from "@spatialsys/web/core/js/hooks/use-first-quest-space"
import { sapiFeatureFlagsClient } from "@spatialsys/web/sapi"
import { Button } from "@spatialsys/web/ui"

import RoomName from "../../room-name/room-name"
import { CollapsableText } from "./collapsable-text/collapsable-text"
import { CreatorRow } from "./participant-row/creator-row"
import ParticipantRow, { ParticipantRowModerationProps, ParticipantRowProps } from "./participant-row/participant-row"

import classes from "./participants-list.module.scss"

export type ParticipantsListProps = Pick<ParticipantRowProps, "onPin" | "onToggleMute" | "pinnedRtcId"> & {
  participants: ParticipantWithRTC[]
  participantMap: Record<string, ParticipantProfile>
  onToggleSpaceLoved: () => void
  openDeetsModal: () => void
  openView: (view: ParticipantsModalViews) => void
}

export const ParticipantsList = memo(function ParticipantsList(props: ParticipantsListProps) {
  const {
    participants,
    onPin,
    onToggleMute,
    pinnedRtcId,
    onToggleSpaceLoved: handleToggleSpaceLoved,
    openDeetsModal,
    openView,
  } = props

  const firstQuestSpace = useFirstQuestSpace()

  const { isAuthless } = useAuthState()
  const room = useAppContext((context) => AppStateSelectors.getCurrentRoom(context.state.unity.appState))
  const canEditRoomName = useAppContext((context) => context.state.unity.appState.roomSession.editRoomNameEnabled)
  const meetings = useAppContext((context) => context.state.unity.appState.roomSession.meetings)
  const currentMeetingId = useAppContext((context) => context.state.unity.appState.roomSession.meetingID)
  const currentMeetingIndex = meetings.findIndex((meeting) => meeting.meetingID === currentMeetingId) ?? 0
  const shouldShowSwitchMeetings = meetings.length > 1 && !firstQuestSpace?.isCurrent
  const blockedUsers = useAppContext((context) => AppStateSelectors.getBlockedUsers(context.state.unity.appState))
  const blockedUsersSet = useMemo(() => new Set(blockedUsers), [blockedUsers])
  const isAdmin = useAppContext((context) => AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState))
  const isHost = useAppContext((context) => AppStateSelectors.areHostToolsEnabled(context.state.unity.appState))
  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)
  const canEditCategories = featureFlagsQuery.data?.featureFlags.categoryCurator ?? false

  const roomOwnerID = useAppContext((context) => context.state.unity.appState.roomSession.room.ownerID)
  const isSandbox = useAppContext((context) => context.state.unity.appState.roomSession.room.isSandbox)
  const creatorSocialProfile = useAppContext((context) => context.state.unity.appState.roomSession.creatorSocialProfile)

  const [scrolledAmount, setScrolledAmount] = useState(0)

  const handleScrolled = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      setScrolledAmount(ev.currentTarget.scrollTop)
    },
    [setScrolledAmount]
  )

  const [moderationProps, setModerationProps] = useState<ParticipantRowModerationProps | null>(null)
  const { participant: moderationTarget, action: moderationAction = ModerationAction.None } = { ...moderationProps }

  const resetModerationProps = useCallback(() => {
    setModerationProps((prev) => ({ ...prev, action: ModerationAction.None }))
  }, [])

  const visitCount = useMemo(() => {
    return room.visitCount?.toLocaleString() // toLocaleString adds comma separators
  }, [room.visitCount])

  const loveCount = useMemo(() => {
    return room.loveCount?.toLocaleString() // toLocaleString adds comma separators
  }, [room.loveCount])

  const lovedIcon = useMemo(() => {
    return room.isLoved ? <FilledHeartIcon className={classes.icon} /> : <OutlinedHeartIcon className={classes.icon} />
  }, [room.isLoved])

  const likeButtonTooltipText = useMemo(() => {
    if (isAuthless) {
      return "Sign in to love this space"
    } else {
      return `${room.isLoved ? "Unlove" : "Love"} this space`
    }
  }, [isAuthless, room.isLoved])

  useEffect(() => {
    if (room.isInstanceable) {
      UnityMessages.refreshMeetings()
    }
  }, [room.isInstanceable])

  useEffect(() => {
    // fetch creator profile on mount
    UnityMessages.refreshCreatorProfile()
  }, [])

  return (
    <>
      <RoomName
        onClick={canEditRoomName ? openDeetsModal : undefined}
        className={classes.roomName}
        classNameText={classes.roomNameText}
        name={room.name}
      />

      {!isSandbox && (
        <div className={classes.roomStatsContainer}>
          <div className={classes.roomStatsItem}>
            <VisitIcon className={classes.icon} /> {visitCount}
          </div>
          <button
            title={likeButtonTooltipText}
            className={clsx(classes.roomStatsItem, classes.roomStatsButton)}
            onClick={handleToggleSpaceLoved}
          >
            {lovedIcon} {loveCount}
          </button>
        </div>
      )}

      <div className={classes.listContainer} onScroll={handleScrolled}>
        <div className={classes.fadeShadow} />
        {room.description && (
          <div className={classes.description}>
            <CollapsableText text={room.description} />
          </div>
        )}

        {room.tags && room.tags.length > 0 && (
          <div className={classes.tags}>
            {room.tags.map((tag, index) => (
              <Link
                key={index}
                href={{
                  pathname: `/search`,
                  query: {
                    q: `#${tag}`,
                  },
                }}
                target="_blank"
                rel="noopener"
                className={classes.tagAnchor}
              >
                <Tag clickable>{tag}</Tag>
              </Link>
            ))}
          </div>
        )}

        {canEditRoomName && !room.description && !room.tags?.length && (
          <div className={clsx(classes.description, classes.descriptionPlaceholder)}>
            Add a description and tags to help people find your space!
          </div>
        )}

        <div className={classes.editButtonContainer}>
          {canEditRoomName && (
            <Button color="outline" size="sm" className={classes.editButton} onClick={openDeetsModal}>
              Edit
            </Button>
          )}
          {canEditCategories && (
            <Button
              leftIcon={<EditCategoriesIcon className="h-4 w-4" />}
              color="outline"
              size="sm"
              className={classes.editButton}
              onClick={() => openView(ParticipantsModalViews.AddCategories)}
            >
              Edit Categories
            </Button>
          )}
        </div>

        {creatorSocialProfile && !creatorSocialProfile.isPrivate && (
          <>
            <div className={classes.participantListHeader}>
              <div className={classes.column}>
                <div className={classes.participantCount}>Creator</div>
              </div>
            </div>

            <ul className={classes.list}>
              <div className={classes.listItem}>
                <CreatorRow userID={roomOwnerID} profile={creatorSocialProfile} scrollOffset={scrolledAmount} />
              </div>
            </ul>
          </>
        )}
        <div className={classes.participantListHeader}>
          <div className={classes.column}>
            <div className={classes.participantCount}>Participants ({participants.length})</div>
            {shouldShowSwitchMeetings && (
              <div className={classes.meetingIndex}>
                Group {currentMeetingIndex + 1} of {meetings.length}
              </div>
            )}
          </div>
          {shouldShowSwitchMeetings && (
            <Button size="lg" onClick={() => openView(ParticipantsModalViews.SwitchInstance)}>
              View Groups
            </Button>
          )}
          <ManageDropdownMenu>
            {isHost && <button onClick={() => openView(ParticipantsModalViews.ManageAdmins)}>Hosts</button>}
            {isAdmin && <button onClick={() => openView(ParticipantsModalViews.BannedList)}>Banned</button>}
            {isAdmin && <button onClick={UnityMessages.muteAllParticipants}>Mute All</button>}
          </ManageDropdownMenu>
        </div>
        <ul className={classes.list}>
          {participants.map((participant, index) => (
            <li className={classes.listItem} key={participant.id}>
              {index > 0 && <hr className={classes.divider} />}
              <ParticipantRow
                participant={participant}
                onPin={onPin}
                onToggleMute={onToggleMute}
                onModerate={setModerationProps}
                pinnedRtcId={pinnedRtcId}
                isBlocked={blockedUsersSet.has(participant.id)}
                scrollOffset={scrolledAmount}
              />
            </li>
          ))}
        </ul>
      </div>
      <BlockConfirmationModal
        blockTarget={
          moderationAction === ModerationAction.Block
            ? { userId: moderationTarget.id, displayName: moderationTarget.displayName }
            : undefined
        }
        handleClose={resetModerationProps}
      />
      <UserProfileReportModal
        isOpen={moderationAction === ModerationAction.Report}
        userId={moderationTarget?.id}
        displayName={moderationTarget?.displayName}
        roomId={room.id}
        onClose={resetModerationProps}
      />
      <SpaceBanConfirmModal
        isOpen={moderationAction === ModerationAction.Remove}
        user={{ userID: moderationTarget?.id }}
        onClose={resetModerationProps}
      />
    </>
  )
})
