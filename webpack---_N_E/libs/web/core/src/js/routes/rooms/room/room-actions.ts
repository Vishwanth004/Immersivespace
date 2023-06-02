import { useMemo } from "react"

import { SpaceAndCreator } from "@spatialsys/js/sapi/types"
import { CameraMode, RoomData_ShareSetting, RoomModalType } from "@spatialsys/unity/app-state"
import { ContentObject, UnityMessages } from "@spatialsys/unity/bridge"
import { trackDockButtonClick } from "@spatialsys/web/analytics"
import { AppContext } from "@spatialsys/web/app-context"
import { AddContentHyperlinkState, ComposerType, TransformPanelState } from "@spatialsys/web/app-state"

export type RoomActions = ReturnType<typeof useRoomActions>

export const useRoomActions = (actions: AppContext["actions"]) => {
  return useMemo(() => {
    function openSpaceInfoModal(copy: { title?: string; dismissCopy?: string }, onClose?: () => void) {
      actions.setSpaceState({
        spaceInfoModalCopy: copy,
        isSpaceInfoModalOpen: true,
        spaceInfoModalOnClose: onClose,
      })
    }

    function closeAddContentModal() {
      actions.setSpaceState({ shouldShowContentMenu: false })
      UnityMessages.setUploadTargetEmptyFrameID(0)
    }

    return {
      openBackpackDrawer: () => UnityMessages.setBackpackOpen(true),
      closeBackpackDrawer: () => UnityMessages.setBackpackOpen(false),

      openShopDrawer: () => UnityMessages.setShopOpen(true),
      closeShopDrawer: () => UnityMessages.setShopOpen(false),

      openLeaveRoomModal: () => actions.setSpaceState({ leaveRoomModalOpen: true }),
      closeLeaveRoomModal: () => actions.setSpaceState({ leaveRoomModalOpen: false }),

      openSharePanel: () => actions.setSpaceState({ isSharePanelOpen: true }),
      closeSharePanel: () => actions.setSpaceState({ isSharePanelOpen: false }),

      openControlsModal: () => actions.setSpaceState({ controlsModalOpen: true }),
      closeControlsModal: () => actions.setSpaceState({ controlsModalOpen: false }),

      openGoLiveModal: () => actions.setSpaceState({ showGoLiveModal: true }),
      closeGoLiveModal: () => actions.setSpaceState({ showGoLiveModal: false }),

      openEndGoLiveModal: () => actions.setSpaceState({ showEndGoLiveModal: true }),
      closeEndGoLiveModal: () => actions.setSpaceState({ showEndGoLiveModal: false }),

      openTokenGateAccessModal: () => actions.setSpaceState({ showTokenGateAccessModal: true }),
      closeTokenGateAccessModal: () => actions.setSpaceState({ showTokenGateAccessModal: false }),

      openTokenGateWelcomeModal: () => actions.setSpaceState({ showTokenGateWelcomeModal: true }),
      closeTokenGateWelcomeModal: () => actions.setSpaceState({ showTokenGateWelcomeModal: false }),

      openCreatePortalModal: () => actions.setSpaceState({ showCreatePortalModal: true }),
      closeCreatePortalModal: () => actions.setSpaceState({ showCreatePortalModal: false }),

      openCreateHyperlinkPortal: () => actions.setSpaceState({ showCreateHyperlinkPortal: true }),
      closeCreateHyperlinkPortal: () => actions.setSpaceState({ showCreateHyperlinkPortal: false }),

      openSpacePicker: () => actions.setSpaceState({ isSpacePickerVisible: true }),
      closeSpacePicker: () => actions.setSpaceState({ isSpacePickerVisible: false }),

      openUserProfileEditorModal: () => actions.setSpaceState({ showUserProfileEditorModal: true }),
      closeUserProfileEditorModal: () => actions.setSpaceState({ showUserProfileEditorModal: false }),

      clearSelectedUserProfileId: () => actions.setSpaceState({ selectedUserProfileId: null }),
      setSelectedUserProfileId: (id: string) => actions.setSpaceState({ selectedUserProfileId: id }),

      setAutoLayoutFiles: (files: ContentObject[]) => actions.setSpaceState({ autoLayoutFiles: files }),

      openManageHostsModal: () => actions.setSpaceState({ showManageHostsModal: true }),
      closeManageHostsModal: () => actions.setSpaceState({ showManageHostsModal: false }),

      openPerfStatistics: () => actions.setSpaceState({ perfStatisticsOpen: true }),
      closePerfStatistics: () => actions.setSpaceState({ perfStatisticsOpen: false }),

      openChangeEnvironmentModal: () => actions.setSpaceState({ showEnvironmentSettingsModal: true }),
      closeChangeEnvironmentModal: () => actions.setSpaceState({ showEnvironmentSettingsModal: false }),

      openEnvironmentPickerModal: () => actions.setSpaceState({ showEnvironmentPickerModal: true }),
      closeEnvironmentPickerModal: () => actions.setSpaceState({ showEnvironmentPickerModal: false }),

      openPairPanel: () => actions.setSpaceState({ showPairPanel: true }),
      closePairPanel: () => actions.setSpaceState({ showPairPanel: false }),

      openAudioGroupingToolsModal: () => actions.setSpaceState({ showAudioGroupingToolsModal: true }),
      closeAudioGroupingToolsModal: () => actions.setSpaceState({ showAudioGroupingToolsModal: false }),

      openMediaSettingsModal: () => actions.setSpaceState({ showMediaSettingsModal: true }),
      closeMediaSettingsModal: () => actions.setSpaceState({ showMediaSettingsModal: false }),

      closeCreateCustomEnvModal: () => actions.setSpaceState({ isCreateCustomEnvModalOpen: false }),
      openCreateCustomEnvModal: () => actions.setSpaceState({ isCreateCustomEnvModalOpen: true }),

      openTransformPanel: () => actions.setSpaceState({ transformPanelState: TransformPanelState.Active }),
      closeTransformPanel() {
        actions.setSpaceState({ transformPanelState: TransformPanelState.Closed })
        UnityMessages.clearSelectedObject()
      },

      closeAutoLayoutModal: () => actions.setSpaceState({ autoLayoutFiles: [] }),

      closeAddContentModal,

      toggleAddContentMenu() {
        actions.setSpaceState((draft) => void (draft.shouldShowContentMenu = !draft.shouldShowContentMenu))
      },

      handleOpenSpacePicker() {
        actions.setSpaceState({
          isSpacePickerVisible: true,
          showCreatePortalModal: false,
        })
      },

      createPortal(data: SpaceAndCreator) {
        UnityMessages.createPortal({ roomId: data.space.id })
        actions.setSpaceState({ isSpacePickerVisible: false, showCreatePortalModal: false })
      },

      handleOpenCreateHyperlinkPortal() {
        actions.setSpaceState({
          showCreatePortalModal: false,
          showCreateHyperlinkPortal: true,
        })
      },

      onClickBackCreateHyperlinkPortal() {
        actions.setSpaceState({ showCreateHyperlinkPortal: false, showCreatePortalModal: true })
      },

      closeObjectLightBox() {
        actions.setSpaceState({
          transformPanelState: TransformPanelState.Closed,
          hyperlinkPanelState: AddContentHyperlinkState.Closed,
        })
        UnityMessages.clearSelectedObject()
        UnityMessages.setLightBoxObject(0)
      },

      /**
       * Opens the info panel for editors to add hyperlinks, a title, description, creator name and toggle the info plaque
       */
      onInfoButtonClick() {
        actions.setSpaceState((draft) => {
          if (draft.hyperlinkPanelState === AddContentHyperlinkState.Closed) {
            draft.transformPanelState = TransformPanelState.Closed
            draft.hyperlinkPanelState = AddContentHyperlinkState.Active
          } else {
            draft.hyperlinkPanelState = AddContentHyperlinkState.Closed
          }
        })
      },

      leaveVoice: () => UnityMessages.setUserEnabledVoiceConnection(false),

      closeNftEnvironmentNotOwnedModal: () => actions.setSpaceState({ environmentToChangeTo: undefined }),

      onContentTransformButtonClick() {
        actions.setSpaceState((draft) => {
          if (draft.transformPanelState === TransformPanelState.Closed) {
            draft.hyperlinkPanelState = AddContentHyperlinkState.Closed
            draft.transformPanelState = TransformPanelState.Active
          } else {
            draft.transformPanelState = TransformPanelState.Closed
          }
        })
      },

      /* Called after successfully applying an environment change. */
      onSetEnvironmentSuccess() {
        actions.setSpaceState({
          environmentToChangeTo: undefined,
          environmentVariantToChangeTo: 0,
          showEnvironmentSettingsModal: false,
          showEnvironmentPickerModal: false,
        })
      },

      confirmGoLiveModal() {
        actions.setSpaceState({ showGoLiveModal: false })
        UnityMessages.goLive()
      },

      confirmEndGoLiveModal() {
        actions.setSpaceState({ showEndGoLiveModal: false })
        UnityMessages.endLive()
      },

      openSpaceInfoModal,

      onNotReadyPublish() {
        actions.setSpaceState({
          hasShownDeetsBeforePublish: true,
          isSharePanelOpen: false,
        })
        openSpaceInfoModal(
          { title: "Before Publishing, Add Some Info about your Space", dismissCopy: "Maybe Later" },
          () => actions.setSpaceState({ isSharePanelOpen: true })
        )
      },

      openDefaultSpaceInfoModal() {
        // We explicitly call without arguments to avoid incorrectly passing event as title when used as event handler
        openSpaceInfoModal({})
      },

      closeSocialProfileModal() {
        actions.setSpaceState({ selectedUserProfileId: undefined })
        UnityMessages.selectUserForModeration("")
        UnityMessages.setSocialProfileMenuVisible(false)
      },

      openDirectlyInvitedUsersModal() {
        actions.setSpaceState({
          showDirectlyInvitedUsersModal: true,
          isSharePanelOpen: false,
        })
      },
      closeDirectlyInvitedUsersModal: () => actions.setSpaceState({ showDirectlyInvitedUsersModal: false }),

      closeRoomModal: () => UnityMessages.setRoomModalType(RoomModalType.None),

      editShareSetting: (setting: RoomData_ShareSetting, isPublic: boolean) =>
        UnityMessages.setRoomShareSetting(setting, isPublic),

      inviteUsers: (emails: string[]) => UnityMessages.inviteUsers(emails),
      removeInvitedUsers: (userIds: string[]) => UnityMessages.removeInvitedUsers(userIds),

      close3DLightbox() {
        actions.setSpaceState({ hyperlinkPanelState: AddContentHyperlinkState.Closed })
        UnityMessages.setCameraViewportRectWithAnimation({
          x: 0,
          y: 0,
          width: 1,
          height: 1,
          duration: 0.01,
          easingCurve: UnityMessages.UnityViewPortAnimation.EaseOutCubic,
        })
        UnityMessages.setCameraMode(CameraMode.Room)
      },

      onCloseReplaceCustomEnvModal() {
        actions.setSpaceState({ isReplaceCustomEnvModalOpen: false, newCustomEnvironmentFile: null })
      },

      // Even tho these 3 are not in the main dock anymore, continue tracking the clicks as dock buttons for backwards compatibility
      onWebSearchClick() {
        trackDockButtonClick("Search")
        actions.setSpaceState((draft) => {
          draft.composerType = draft.composerType === ComposerType.SearchOrURL ? null : ComposerType.SearchOrURL
        })
        closeAddContentModal()
      },

      onAddNoteClick() {
        trackDockButtonClick("Note")
        actions.setSpaceState((draft) => {
          draft.composerType = draft.composerType === ComposerType.Note ? null : ComposerType.Note
        })
        closeAddContentModal()
      },

      onCreatePortalClick() {
        trackDockButtonClick("Portal")
        actions.setSpaceState({ showCreatePortalModal: true })
        closeAddContentModal()
      },
    }
  }, [actions])
}
