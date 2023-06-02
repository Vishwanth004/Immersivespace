import { memo, useCallback, useMemo } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import {
  AudioGroupAvatarIcon,
  AudioGroupParticipant,
} from "@spatialsys/web/core/js/components/audio-groups/audio-group-avatar-icon"
import { AudioGroupRow } from "@spatialsys/web/core/js/components/audio-groups/audio-group-row"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import { Heading } from "@spatialsys/web/ui"

import { platformToString } from "./utils"

import classes from "./audio-groups-modal.module.scss"

interface UngroupedAvatarIconProps {
  isDisabled: boolean
  locationId: number
  user: AudioGroupParticipant
}

const UngroupedAvatarIcon = memo(function UngroupedAvatarIcon(props: UngroupedAvatarIconProps) {
  const { user, locationId, isDisabled } = props

  const handleClick = useCallback(() => {
    UnityMessages.joinGroup(locationId)
  }, [locationId])

  return (
    <button className={"tooltip-host"} disabled={isDisabled} onClick={handleClick}>
      {!isDisabled && (
        <span className="tooltip-text tooltip-text--top">
          <b>{`${user.displayName} (${platformToString(user.platform)})`}</b>
          <br />
          Click to form an audio group
        </span>
      )}
      {isDisabled && (
        <span className="tooltip-text tooltip-text--top">
          <b>Me</b>
        </span>
      )}
      <AudioGroupAvatarIcon user={user} />
    </button>
  )
})

interface AudioGroupingToolsModalProps extends ModalProps {
  participants: ParticipantWithRTC[]
}

const AudioGroupingToolsContents = memo(function AudioGroupingToolsContents(
  props: Pick<AudioGroupingToolsModalProps, "participants">
) {
  const { participants } = props
  const locations = useAppContext((context) => context.state.unity.appState.roomSession.sharedState.locations)
  const actorMetaData = useAppContext((context) => context.state.unity.appState.roomSession.sharedState.actorMetaData)
  const localActorNumber = useAppContext((context) => context.state.unity.appState.roomSession.localActorNumber)
  const actorLocationLookup = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.actorLocationLookup
  )

  const actorParticipantLookup = useMemo<{ [actorId: number]: AudioGroupParticipant }>(() => {
    //clear entire cached table
    const newActorParticipantLookup = {}
    participants.forEach((participant) => {
      participant.roomActorNumbers.forEach((actorNumber) => {
        newActorParticipantLookup[actorNumber] = {
          ...participant,
          actorNumber,
          isActorTalking: actorMetaData[actorNumber]?.isTalking,
          isActorMuted: actorMetaData[actorNumber]?.isMutedAtSource,
          platform: actorMetaData[actorNumber]?.platform,
        }
      })
    })
    return newActorParticipantLookup
  }, [actorMetaData, participants])

  const audioGroups = useMemo<{ [groupId: number]: number[] }>(() => {
    const newAudioGroups: { [groupId: number]: number[] } = {}

    // get locations which has two or more than two different users that's having different user ID
    Object.keys(locations).forEach((locationId) => {
      newAudioGroups[locationId] = Array.from(
        Object.keys(actorParticipantLookup).filter((actorNumber) =>
          locations[Number(locationId)].actors.includes(Number(actorNumber))
        ),
        Number
      )
      // if it's not multiple users, just delete current group
      newAudioGroups[locationId].length <= 1 && delete newAudioGroups[locationId]
    })
    return newAudioGroups
  }, [actorParticipantLookup, locations])

  const actorNumbersWithoutGroups = useMemo<number[]>(
    () =>
      Array.from(
        Object.keys(actorMetaData).filter((actorNumber) =>
          Object.keys(audioGroups).every((groupId) => !audioGroups[Number(groupId)].includes(Number(actorNumber)))
        ),
        Number
      ),
    [actorMetaData, audioGroups]
  )

  return (
    <>
      <InstanceCount />
      <div className={classes.body}>
        <Heading size="h3" className="mb-3">
          Audio Groups
        </Heading>
        <div className={classes.subtitle}>
          Filter out voice audio from people in the same physical location as you. People in the same group as you will
          not be audible, nor will you be audible to them.
        </div>

        <div className={classes.audioGroupsGrid}>
          {Object.keys(audioGroups).map((groupId) => (
            <AudioGroupRow
              key={groupId}
              groupId={Number(groupId)}
              members={Array.from(audioGroups[groupId], (actorNumber: number) => actorParticipantLookup[actorNumber])}
              currentActorNumber={localActorNumber}
            />
          ))}
        </div>

        {Object.keys(audioGroups).length > 0 && <hr className="mx-3" />}

        <div className={classes.ungroupedGrid}>
          {actorNumbersWithoutGroups.map((actorNumber) => (
            <UngroupedAvatarIcon
              key={actorNumber}
              user={actorParticipantLookup[actorNumber]}
              locationId={actorLocationLookup[actorNumber]}
              isDisabled={actorNumber === localActorNumber}
            />
          ))}
        </div>
      </div>
    </>
  )
})

export const AudioGroupingToolsModal = memo(function AudioGroupingToolsModal(props: AudioGroupingToolsModalProps) {
  const { participants, ...modalProps } = props

  return (
    <Modal darkOverlay {...modalProps}>
      <button type="button" className={classes.closeButton} onClick={modalProps.onRequestClose}>
        <CloseIcon />
      </button>
      <AudioGroupingToolsContents participants={participants} />
    </Modal>
  )
})
