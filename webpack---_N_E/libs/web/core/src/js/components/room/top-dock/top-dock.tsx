import { memo, useCallback } from "react"

import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { ParticipantWithRTC } from "@spatialsys/web/app-state"
import {
  ParticipantsModal,
  ParticipantsModalContentProps,
} from "@spatialsys/web/core/js/components/room/participants/participants-modal/participants-modal"
import { ParticipantsPillButton } from "@spatialsys/web/core/js/components/room/participants/participants-pill-button/participants-pill-button"
import RoomName from "@spatialsys/web/core/js/components/room/room-name/room-name"

import classes from "./top-dock.module.scss"

type TopDockProps = ParticipantsModalContentProps

export const TopDock = memo(function TopDock(props: TopDockProps) {
  const { onPin: onPinProp, ...rest } = props
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useBoolean(false)

  const room = useAppContext((context) => AppStateSelectors.getCurrentRoom(context.state.unity.appState))
  const canEditRoomName = useAppContext((context) => context.state.unity.appState.roomSession.editRoomNameEnabled)

  const onPin = useCallback(
    (participant: ParticipantWithRTC) => {
      setIsParticipantsModalOpen.setFalse()
      onPinProp(participant)
    },
    [onPinProp, setIsParticipantsModalOpen]
  )

  const onClickRoomName = canEditRoomName ? props.openDeetsModal : setIsParticipantsModalOpen.setTrue

  return (
    <div className={classes.container}>
      <ParticipantsPillButton onClick={setIsParticipantsModalOpen.toggle} participants={props.participants} />
      <RoomName
        onClick={onClickRoomName}
        className={classes.roomName}
        classNameText={classes.roomNameText}
        classNameInput={classes.roomNameInput}
        name={room.name}
      />

      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        handleClose={setIsParticipantsModalOpen.setFalse}
        {...rest}
        onPin={onPin}
      />
    </div>
  )
})
