import { useCallback, useMemo } from "react"

import { ReactComponent as VolumeOffIcon } from "@spatialsys/assets/icons/material-filled/volume-off.svg"
import { ReactComponent as VolumeUpIcon } from "@spatialsys/assets/icons/material-filled/volume-up.svg"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import { ReactComponent as PushPinOutlinedIcon } from "@spatialsys/web/core/img/icons/material-outlined-push-pin.svg"
import { ReactComponent as PushPinFilledIcon } from "@spatialsys/web/core/img/icons/material-push-pin.svg"
import AvatarButton from "@spatialsys/web/core/js/components/avatar-button/avatar-button"
import { ModerationAction } from "@spatialsys/web/core/js/components/moderation/constants"
import { ModerationDropdownMenu } from "@spatialsys/web/core/js/components/moderation/moderation-dropdown-menu"
import { Button, cn } from "@spatialsys/web/ui"

import { UserInfoGroup } from "./user-info-group"

export type ParticipantRowModerationProps = {
  participant: ParticipantWithRTC
  action: ModerationAction
}

export type ParticipantRowProps = {
  participant: ParticipantWithRTC
  onPin: (participant: ParticipantWithRTC) => void
  onToggleMute: (participant: ParticipantWithRTC) => void
  onModerate: (props: ParticipantRowModerationProps) => void
  /** The id of the currently pinned RTC stream */
  pinnedRtcId?: string
  isBlocked: boolean
  scrollOffset: number
}

/** A single participant row in the list of participants */
const ParticipantRow = (props: ParticipantRowProps) => {
  const { isBlocked, participant, onPin, onToggleMute, onModerate, pinnedRtcId, scrollOffset } = props
  const canMute = useAppContext((context) =>
    AppStateSelectors.canMuteParticipant(context.state.unity.appState, participant.id)
  )

  const localUserIsAdmin = useAppContext((context) =>
    AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState)
  )
  const hasMedia = !!participant.media
  const isPinned = pinnedRtcId && pinnedRtcId === participant.media?.raw.ID
  const isAuthless = useAppContext((context) =>
    AppStateSelectors.isAuthlessUser(context.state.unity.appState, participant.id)
  )

  const renderAvatarButton = useCallback(() => {
    return <AvatarButton participant={participant} isFaded={isBlocked} isPinned={isPinned} />
  }, [isBlocked, isPinned, participant])

  const handlePin = useCallback(() => {
    onPin(participant)
  }, [onPin, participant])

  const unblockUser = useCallback(() => {
    UnityMessages.unblockUser(participant.id)
  }, [participant.id])

  const onModerateUser = useCallback(
    (action: ModerationAction) => onModerate({ participant, action }),
    [onModerate, participant]
  )

  const unmuteDisabledReason = useMemo(() => {
    if (isAuthless) return "User is not signed in"
    if (!canMute) return "Disabled by host"
    return undefined
  }, [isAuthless, canMute])

  return (
    <div className="group flex w-full items-center py-2">
      <UserInfoGroup
        participant={participant}
        userID={participant.id}
        handlePin={handlePin}
        scrollOffset={scrollOffset}
        profileImageComponent={renderAvatarButton()}
      />

      {hasMedia && (
        <button
          className={cn("invisible mr-5 h-6 hover:opacity-60 group-hover:visible", isPinned && "visible")}
          onClick={handlePin}
        >
          {isPinned ? <PushPinFilledIcon /> : <PushPinOutlinedIcon />}
        </button>
      )}

      {isBlocked ? (
        <span className="text-base font-demibold text-black/50">Blocked</span>
      ) : (
        <Button
          className="tooltip-host text-sm"
          color="outline"
          disabled={Boolean(unmuteDisabledReason)}
          leftIcon={
            isBlocked ? undefined : participant.isMuted ? (
              <VolumeOffIcon className="icon icon-sm" />
            ) : (
              <VolumeUpIcon className="icon icon-sm" />
            )
          }
          size="sm"
          onClick={(e) => {
            e.stopPropagation() // prevent pinning the user
            onToggleMute(participant)
          }}
        >
          {participant.isMuted ? "Unmute" : "Mute"}
          {unmuteDisabledReason && <div className="tooltip-text tooltip-text--top">{unmuteDisabledReason}</div>}
        </Button>
      )}

      {!participant.isLocalUser && (
        <div className="ml-4">
          <ModerationDropdownMenu
            isBlocked={isBlocked}
            onBlock={() => onModerateUser(ModerationAction.Block)}
            onUnblock={unblockUser}
            onReport={() => onModerateUser(ModerationAction.Report)}
            onRemove={() => onModerateUser(ModerationAction.Remove)}
            showRemoveButton={localUserIsAdmin}
          />
        </div>
      )}
    </div>
  )
}

export default ParticipantRow
