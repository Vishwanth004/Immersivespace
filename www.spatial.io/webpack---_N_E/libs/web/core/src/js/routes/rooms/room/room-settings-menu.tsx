import { memo, useCallback } from "react"

import { ReactComponent as MoreVertIcon } from "@spatialsys/assets/icons/material-filled/more-vert.svg"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import Menu from "@spatialsys/web/core/js/components/menu/menu"
import DeleteRoomButton from "@spatialsys/web/core/js/components/room/delete-room-button/delete-room-button"
import SaveAsTemplateButton from "@spatialsys/web/core/js/components/room/save-as-template-button/save-as-template-button"
import SaveRoomButton from "@spatialsys/web/core/js/components/room/save-room-button/save-room-button"

import classes from "./room-settings-menu.module.scss"
import roomClasses from "./room.module.scss"

interface RoomSettingsMenuProps {
  roomID: string
  roomName: string
  roomOwnerID: string
  userID: string
  shouldConnectToVoice: boolean
  isAuthless: boolean
  isReadOnlyActor: boolean
  enableAutoSave: boolean
  onShowAudioGroupingToolsModal: () => void
  onShowMediaSettingsModal: () => void
  onShowHostToolsModal: () => void
  onShowEnvironmentSettingsModal: () => void
  onShowControls: () => void
  onShowPairPanel: () => void
  onLeaveVoice: () => void
  onShowPerfStatistics: () => void
}

const ENABLE_PERF_STATISTICS = Config.DEPLOYMENT_ENV !== "production"

const RoomSettingsMenu = memo(function RoomSettingsMenu(props: RoomSettingsMenuProps) {
  const isEarlyAccessClient = useAppContext((context) =>
    AppStateSelectors.isEarlyAccessClient(context.state.unity.appState)
  )

  const isSaveAsTemplateEnabled = useAppContext(
    (context) => context.state.unity.appState.roomSession.saveAsTemplateEnabled
  )
  const areHostToolsEnabled = useAppContext((context) =>
    AppStateSelectors.areHostToolsEnabled(context.state.unity.appState)
  )
  const isRoomOwner = useAppContext((context) => AppStateSelectors.isCurrentUserRoomOwner(context.state.unity.appState))
  const actions = useAppContext((context) => context.actions)
  const openDebugModal = useCallback(() => {
    actions.openModal({ type: Modals.Debug })
  }, [actions])
  const canViewDebug = useAppContext((context) => Selectors.canViewDebugSettings(context.state, Config))
  const shouldShowHostToolsButton = areHostToolsEnabled || isRoomOwner

  const renderMenuButton = useCallback(
    ({ setIsOpen, isOpen }) => (
      <CircleButton
        className={classes.button}
        color="outline"
        onMouseEnter={() => setIsOpen(true)}
        onTouchEnd={() => setIsOpen(true)}
      >
        {isOpen && <InstanceCount />}
        <MoreVertIcon />
      </CircleButton>
    ),
    []
  )

  const openReportSpaceModal = useCallback(() => {
    actions.openModal({ type: Modals.ReportSpace, payload: { spaceID: props.roomID, spaceName: props.roomName } })
  }, [actions, props])

  return (
    <Menu
      dropPosition="dropdown"
      menuBuffer={12}
      menuPosition="right"
      className={roomClasses.settingsMenu}
      classNameContent={roomClasses.settingsMenuContent}
      render={renderMenuButton}
      toggleButtonHitSlop={24}
    >
      <ul>
        <li key="settings">
          <button type="button" onClick={props.onShowMediaSettingsModal}>
            <div>Settings</div>
          </button>
        </li>

        <li key="audioGroupingTools">
          <button type="button" onClick={props.onShowAudioGroupingToolsModal}>
            <div>Audio Grouping Tools</div>
          </button>
        </li>

        {!props.isReadOnlyActor && (
          <li key="environmentSettings">
            <button type="button" onClick={props.onShowEnvironmentSettingsModal}>
              <div>Environment</div>
            </button>
          </li>
        )}

        {shouldShowHostToolsButton && (
          <li key="hostTools">
            <button type="button" onClick={props.onShowHostToolsModal}>
              <div>Host Tools</div>
            </button>
          </li>
        )}

        {!props.isReadOnlyActor && !props.enableAutoSave && !isEarlyAccessClient && (
          <li key="saveRoom">
            <SaveRoomButton />
          </li>
        )}

        {props.shouldConnectToVoice && (
          <li key="leaveAudio">
            <button type="button" onClick={props.onLeaveVoice}>
              Leave Audio
            </button>
          </li>
        )}

        {isSaveAsTemplateEnabled && (
          <li key="saveAsTemplate">
            <SaveAsTemplateButton />
          </li>
        )}

        {!isRoomOwner && !props.isAuthless && (
          <li key="reportSpace">
            <button type="button" onClick={openReportSpaceModal}>
              Report Space
            </button>
          </li>
        )}

        {!props.isReadOnlyActor && (
          <li>
            <DeleteRoomButton roomId={props.roomID} roomOwnerId={props.roomOwnerID} userId={props.userID} />
          </li>
        )}
        <li>
          <hr className="mb-5" />
          <a href="https://support.spatial.io/" target="_blank" rel="noopener noreferrer">
            Help
          </a>
        </li>

        <li key="controls">
          <button type="button" onClick={props.onShowControls}>
            <div>Controls</div>
          </button>
        </li>

        {!props.isAuthless && (
          <li key="pair">
            <button type="button" onClick={props.onShowPairPanel}>
              <div>Pair Headset</div>
            </button>
          </li>
        )}

        {ENABLE_PERF_STATISTICS && (
          <li key="perfstats">
            <button type="button" onClick={props.onShowPerfStatistics}>
              <div>Performance Stats</div>
            </button>
          </li>
        )}

        {canViewDebug && (
          <li key="showDebug">
            <button type="button" onClick={openDebugModal}>
              <div>Debug</div>
            </button>
          </li>
        )}
      </ul>
    </Menu>
  )
})

export default RoomSettingsMenu
