import { memo, useCallback, useState } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { AppStateSelectors, LobbyType } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { EnvironmentOption } from "@spatialsys/web/app-state"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import EnvironmentTemplatePicker, {
  EnvironmentTemplateTabOption,
} from "@spatialsys/web/core/js/components/new-space/environment-template-picker/environment-template-picker"
import { CenteredLoader } from "@spatialsys/web/ui"

import classes from "./in-room-environment-picker.module.scss"

interface InRoomEnvironmentPickerProps extends ModalProps {
  isLoading?: boolean
  onSelect: (option: EnvironmentOption, variant: number) => void
  openEnvironmentSettings: () => void
}

export const InRoomEnvironmentPicker = memo(function InRoomEnvironmentPicker(props: InRoomEnvironmentPickerProps) {
  const { onRequestClose, isLoading, onSelect, openEnvironmentSettings, ...restOfModalProps } = props
  const includeCustomEnvironment = useAppContext((context) =>
    AppStateSelectors.isCustomEnvironmentSet(context.state.unity.appState)
  )
  const includePrivateLobbyEnvironment = useAppContext(
    (context) =>
      context.state.unity.appState.rooms[context.state.unity.appState.roomSession.roomID]?.lobbyType ===
      LobbyType.PrivateLobby
  )
  const selectedEnvironment = useAppContext((context) =>
    AppStateSelectors.getCustomEnvironment(context.state.unity.appState)
  )
  const currentCustomNftEnvironmentId = useAppContext(
    (context) => context.state.unity.appState.environment.customNFTEnvironmentID
  )

  const [tab, setTab] = useState(EnvironmentTemplateTabOption.Environments)

  const closeAndReturnToSettings = useCallback(
    (event) => {
      onRequestClose(event)
      openEnvironmentSettings()
    },
    [onRequestClose, openEnvironmentSettings]
  )

  return (
    <Modal darkOverlay {...restOfModalProps} onRequestClose={closeAndReturnToSettings}>
      <InstanceCount />
      {isLoading ? (
        <div className={classes.body}>
          <CenteredLoader variant="fancy" color="black" />
        </div>
      ) : (
        <>
          <div className={classes.buttonTray}>
            <button className={classes.backButton} onClick={closeAndReturnToSettings}>
              <KeyboardBackspaceIcon />
            </button>
            <button className={classes.closeButton} onClick={onRequestClose}>
              <CloseIcon />
            </button>
          </div>
          <div className={classes.body}>
            <EnvironmentTemplatePicker
              tab={tab}
              setTab={setTab}
              onSelectEnvironment={onSelect}
              includeCustomEnvironment={includeCustomEnvironment}
              includePrivateLobbyEnvironment={includePrivateLobbyEnvironment}
              currentEnvironment={selectedEnvironment}
              currentCustomNftEnvironmentId={currentCustomNftEnvironmentId}
              includeTemplates={false}
              sidebarTitle="Choose New Environment"
            />
          </div>
        </>
      )}
    </Modal>
  )
})
