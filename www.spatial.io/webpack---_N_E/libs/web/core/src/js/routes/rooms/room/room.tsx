import clsx from "clsx"
import { isEmpty } from "lodash"
import Head from "next/head"
import { useRouter } from "next/router"
import { Suspense, lazy, memo, useCallback, useEffect, useMemo, useRef } from "react"
import { usePopperTooltip } from "react-popper-tooltip"
import { ToastContainer } from "react-toastify"

import { ReactComponent as SpatialWordMark } from "@spatialsys/assets/icons/logos/spatial-word-mark.svg"
import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as PlayArrowIcon } from "@spatialsys/assets/icons/material-filled/play-arrow.svg"
import { ReactComponent as StoreIcon } from "@spatialsys/assets/icons/material-outlined/store.svg"
import { NotificationKeys } from "@spatialsys/js/sapi/clients/sapi"
import { getCustomNftEnvironmentId } from "@spatialsys/js/sapi/helpers"
import { SpaceTemplateCategory } from "@spatialsys/js/sapi/types"
import { InteractionName, InteractionType, TrackedComponents, useTrackInteraction } from "@spatialsys/react/analytics"
import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { useGetTokenGateAccessQuery } from "@spatialsys/react/query-hooks/sapi/spaces"
import { useAcknowledgeNotificationMutation, useNftVerificationQuery } from "@spatialsys/react/query-hooks/sapi/user"
import {
  AppStateSelectors,
  CameraMode,
  CameraRotationMode,
  CustomEnvironmentSetupStep,
  LobbyType,
  MicStatus,
  PackageType,
  RTCConnectionStatus,
  RoomModalType,
  RoomPersistenceStatus,
  RoomData_ShareSetting as ShareSetting,
  VREnvironment,
} from "@spatialsys/unity/app-state"
import { ContentObject, UnityMessages } from "@spatialsys/unity/bridge"
import {
  registerRTCQuality,
  trackDockButtonClick,
  trackWebcamToggle,
  unregisterRTCQuality,
} from "@spatialsys/web/analytics"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import {
  AddContentHyperlinkState,
  ComposerType,
  Modals,
  ParticipantWithRTC,
  PushNotificationPermissionModalType,
  Selectors,
  TransformPanelState,
  UiModes,
} from "@spatialsys/web/app-state"
import buttonClasses from "@spatialsys/web/core/css/components/button.module.scss"
import tooltipClasses from "@spatialsys/web/core/css/components/tooltip.module.scss"
import { ReactComponent as IosShareIcon } from "@spatialsys/web/core/img/icons/ios-share.svg"
import { AudioGroupingToolsModal } from "@spatialsys/web/core/js/components/audio-groups/audio-groups-modal"
import { AvatarCustomizationPanel } from "@spatialsys/web/core/js/components/avatar-customization/avatar-customization-panel"
import { BackButton } from "@spatialsys/web/core/js/components/back-button/back-button"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"
import { Composer } from "@spatialsys/web/core/js/components/composer/composer"
import { ConfirmAutoLayoutModal } from "@spatialsys/web/core/js/components/confirm-auto-layout-modal/confirm-auto-layout-modal"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import { ContentMenuModal } from "@spatialsys/web/core/js/components/content-menu/content-menu-modal"
import { ControlsModal } from "@spatialsys/web/core/js/components/controls-modal/controls-modal"
import { CreateCustomEnvModal } from "@spatialsys/web/core/js/components/create-custom-environments/custom-env-modal/create-custom-env-modal"
import { EnvironmentSettings } from "@spatialsys/web/core/js/components/create-custom-environments/environment-settings-panel/environment-settings"
import { ReplaceCustomEnvModal } from "@spatialsys/web/core/js/components/create-custom-environments/replace-custom-env-modal/replace-custom-env-modal"
import { SetCustomEnvModal } from "@spatialsys/web/core/js/components/create-custom-environments/set-custom-env-modal/set-custom-env-modal"
import { CreateHyperlinkPortal } from "@spatialsys/web/core/js/components/create-hyperlink-portal/create-hyperlink-portal"
import { CreatePortalModal } from "@spatialsys/web/core/js/components/create-portal-modal/create-portal-modal"
import {
  DragAndDropFilesOverlay,
  getFilesFromDropEvent,
} from "@spatialsys/web/core/js/components/drag-and-drop-files/drag-and-drop-files"
import { EnterPortalModal } from "@spatialsys/web/core/js/components/enter-portal-modal/enter-portal-modal"
import { convertSpaceTemplateVariantIndex } from "@spatialsys/web/core/js/components/environment-template/utils"
import { EditCustomEnvironmentBanner } from "@spatialsys/web/core/js/components/environment/edit-custom-environment-banner"
import { InRoomEnvironmentPicker } from "@spatialsys/web/core/js/components/environment/in-room-environment-picker"
import { InfoEditPanel } from "@spatialsys/web/core/js/components/hyperlinks/info-edit-panel"
import { InstanceCount, InstanceCountManager } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"
import OnDragOver from "@spatialsys/web/core/js/components/on-drag-over/on-drag-over"
import OnDrop from "@spatialsys/web/core/js/components/on-drop/on-drop"
import { Pair } from "@spatialsys/web/core/js/components/pair/pair"
import PerfStatistics from "@spatialsys/web/core/js/components/perf-statistics/perf-statistics"
import { QuestCompleteModal } from "@spatialsys/web/core/js/components/quests/quest-complete-modal/quest-complete-modal"
import { BottomDock } from "@spatialsys/web/core/js/components/room/bottom-dock/bottom-dock"
import { BottomLeftView } from "@spatialsys/web/core/js/components/room/bottom-left-view/bottom-left-view"
import { CommunityGuidelinesModal } from "@spatialsys/web/core/js/components/room/community-guidelines-modal/community-guidelines-modal"
import { ConfirmLeaveRoomModal } from "@spatialsys/web/core/js/components/room/confirm-leave-room-modal/confirm-leave-room-modal"
import { DockPillButton } from "@spatialsys/web/core/js/components/room/dock-pill-button/dock-pill-button"
import { FloatingContainer } from "@spatialsys/web/core/js/components/room/floating-container/floating-container"
import { LeaveButton } from "@spatialsys/web/core/js/components/room/leave-button/leave-button"
import { LiveButton } from "@spatialsys/web/core/js/components/room/live-button/live-button"
import ObjectLightBox from "@spatialsys/web/core/js/components/room/object-lightbox/object-lightbox"
import { makeParticipantsList, makeParticipantsMap } from "@spatialsys/web/core/js/components/room/participants/utils"
import { RoomStats } from "@spatialsys/web/core/js/components/room/room-stats/room-stats"
import RoomVideoLightbox from "@spatialsys/web/core/js/components/room/room-video-lightbox/room-video-lightbox"
import { TopDock } from "@spatialsys/web/core/js/components/room/top-dock/top-dock"
import { TransformObjectWithMouseWheel } from "@spatialsys/web/core/js/components/room/transform-object-with-mouse-wheel/transform-object-with-mouse-wheel"
import Transform from "@spatialsys/web/core/js/components/room/transform/transform"
import { UpdatedTermsModal } from "@spatialsys/web/core/js/components/room/updated-terms-modal/updated-terms-modal"
import { UserProfileModal } from "@spatialsys/web/core/js/components/room/user-profile-modal/user-profile-modal"
import { YourProfileMenu } from "@spatialsys/web/core/js/components/room/your-profile/your-profile-menu"
import { TitleTags } from "@spatialsys/web/core/js/components/seo/seo"
import { DirectlyInvitedUsersModal } from "@spatialsys/web/core/js/components/share/directly-invited-users/directly-invited-users-modal"
import Share, {
  isUserMemberOfRoomOrg,
  remapShareSettingTempWorkaround,
} from "@spatialsys/web/core/js/components/share/share"
import { EditSpaceInfoModal } from "@spatialsys/web/core/js/components/space-deets/edit-space-info-modal"
import { SpacesPickerModal } from "@spatialsys/web/core/js/components/spaces-picker-modal/spaces-picker-modal"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import {
  useShouldShowMetamaskTutorial,
  useShouldShowSettingsTutorial,
  useUser,
} from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { useDragAndDrop } from "@spatialsys/web/core/js/hooks/use-drag-and-drop"
import { useFirstQuestSpace } from "@spatialsys/web/core/js/hooks/use-first-quest-space"
import { useUploadFilesMutation } from "@spatialsys/web/core/js/query-hooks/content"
import { CameraModeButtons } from "@spatialsys/web/core/js/routes/rooms/room/camera-mode-buttons/camera-mode-buttons"
import RoomSettingsMenu from "@spatialsys/web/core/js/routes/rooms/room/room-settings-menu"
import { TransitionComponentHidden } from "@spatialsys/web/core/js/routes/rooms/room/transition-components"
import { useCameraViewport } from "@spatialsys/web/core/js/routes/rooms/room/use-camera-viewport"
import { has2dObjects, has3dObjects } from "@spatialsys/web/core/js/sapi/content-actions"
import { logger } from "@spatialsys/web/logger"
import { voiceManager } from "@spatialsys/web/rtc/photon-voice/voice-manager"
import { WebcamStatus } from "@spatialsys/web/rtc/rtc-state"
import { sapiClient, sapiFeatureFlagsClient } from "@spatialsys/web/sapi"
import { Button, Drawer, Loader, cn } from "@spatialsys/web/ui"
import { useWindowSize } from "@spatialsys/web/ui/hooks"

import { Backpack } from "../../../components/room/economy/backpack/backpack"
import { Shop } from "../../../components/room/economy/shop/shop"
import useUnityToastListener from "../use-unity-toast-listener"
import { useRoomActions } from "./room-actions"
import { RoomModalBase } from "./room-modal-base"
import * as RoomUtil from "./room-util"
import { roomSaga } from "./sagas/room-saga"

import classes from "./room.module.scss"

const GoLiveModal = lazy(() =>
  import(/* webpackChunkName: "go-live-modal" */ "@spatialsys/web/core/js/components/go-live-modal/go-live-modal").then(
    (module) => ({
      default: module.GoLiveModal,
    })
  )
)
const EndGoLiveModal = lazy(() =>
  import(
    /* webpackChunkName: "end-go-live-modal" */ "@spatialsys/web/core/js/components/end-go-live-modal/end-go-live-modal"
  ).then((module) => ({
    default: module.EndGoLiveModal,
  }))
)
const ShareToSocialsModal = lazy(() =>
  import(
    /* webpackChunkName: "share-to-socials-modal" */ "@spatialsys/web/core/js/components/share-to-socials-modal/share-to-socials-modal"
  ).then((module) => ({
    default: module.ShareToSocialsModal,
  }))
)
const FilmingModeModal = lazy(
  () => import(/* webpackChunkName: "filming-mode-modal" */ "./filming-mode-modal/filming-mode-modal")
)
const ObjectInspectorPanel = lazy(() =>
  import(
    /* webpackChunkName: "object-inspector" */ "@spatialsys/web/core/js/components/object-inspector/object-inspector"
  ).then((module) => ({
    default: module.ObjectInspector,
  }))
)

const HostToolsModal = lazy(() =>
  import(
    /* webpackChunkName: "host-tools-modal" */ "@spatialsys/web/core/js/components/room/host-tools-modal/host-tools-modal"
  ).then((module) => ({
    default: module.HostToolsModal,
  }))
)

const TokenGateAccessModal = lazy(() =>
  import(
    /* webpackChunkName: "token-gate-access-modal" */ "@spatialsys/web/core/js/components/room/token-gate-access-modal/token-gate-access-modal"
  ).then((module) => ({
    default: module.TokenGateAccessModal,
  }))
)

const TokenGateWelcomeModal = lazy(() =>
  import(
    /* webpackChunkName: "token-gate-welcome-modal" */ "@spatialsys/web/core/js/components/room/token-gate-welcome-modal/token-gate-welcome-modal"
  ).then((module) => ({
    default: module.TokenGateWelcomeModal,
  }))
)

const MediaAndRoomSettingsModal = lazy(() =>
  import(
    /* webpackChunkName: "media-and-room-settings-modal" */ "@spatialsys/web/core/js/components/room/media-and-room-settings-modal/media-and-room-settings-modal"
  ).then((module) => ({
    default: module.MediaAndRoomSettingsModal,
  }))
)

const UserProfileEditorModal = lazy(() =>
  import(
    /* webpackChunkName: "user-profile-editor-modal" */ "@spatialsys/web/core/js/components/room/user-profile-editor-modal/user-profile-editor-modal"
  ).then((module) => ({
    default: module.UserProfileEditorModal,
  }))
)

const ChatPanel = lazy(() =>
  import(/* webpackChunkName: "chat-panel" */ "@spatialsys/web/core/js/components/chat/chat").then((module) => ({
    default: module.ChatPanel,
  }))
)

const ManageAdmins = lazy(() =>
  import(
    /* webpackChunkName: "manage-admins" */ "@spatialsys/web/core/js/components/room/participants/manage-users/manage-admins"
  ).then((module) => ({
    default: module.ManageAdmins,
  }))
)

export const Room = memo(function Room() {
  const { push } = useRouter()
  const { isAuthless } = useAuthState()
  const { user } = useUser()
  const trackInteraction = useTrackInteraction()
  const uploadFiles = useUploadFilesMutation()
  const { mutate: acknowledgeNotification } = useAcknowledgeNotificationMutation(sapiClient)
  const shouldShowMetamaskTutorial = useShouldShowMetamaskTutorial()
  const shouldShowSettingsTutorial = useShouldShowSettingsTutorial()
  const runSaga = useAppContext((context) => context.runSaga)
  useEffect(() => {
    const onError = (err: Error) => {
      logger.error("Room saga error", err)
    }
    const task = runSaga({ onError }, roomSaga)
    return task.cancel
  }, [runSaga])

  const is2dUiVisible = useAppContext((context) => context.state.space.is2dUiVisible)
  const openModal = useAppContext((context) => Selectors.getOpenModal(context.state))
  const uiMode = useAppContext((context) => context.state.space.uiMode)
  const isObjectInspectorVisible = useAppContext((context) => context.state.space.isObjectInspectorVisible)
  const isChatOpen = useAppContext((context) => context.state.space.chat.isOpen)
  const isPointerLock = useAppContext(
    (context) => context.state.unity.appState.roomSession.camera.rotationMode === CameraRotationMode.PointerLock
  )
  const isEmptyShop = useAppContext((context) => isEmpty(context.state.unity.appState.roomSession.shop.items))
  const hasWorldCurrency = useAppContext((context) => context.state.unity.appState.roomSession.backpack.worldCurrencyID)

  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)
  const showShop = featureFlagsQuery.data?.featureFlags.shop ?? false

  useCameraViewport()

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible: isShowSettingsTooltipVisible,
  } = usePopperTooltip({ visible: shouldShowSettingsTutorial, placement: "top-start", interactive: true })

  const {
    unlimitedFileSize,
    hyperlinksV2,
    watermarkHidden,
    disableUnblockAudioWeb,
    isModifiedCameraControllerEnabled,
  } = user.treatmentsParsed

  const isAutoLayoutEnvironment = useAppContext((context) =>
    AppStateSelectors.isAutoLayoutEnvironment(
      context.state.unity.appState.roomSession.sharedState.settings.environment,
      Boolean(context.state.unity.appState.environment.customNFTEnvironmentID)
    )
  )
  const hasEmptyFrames = useAppContext((context) => context.state.unity.appState.roomSession.sceneHasEmptyGalleryFrames)
  const sharePanelEnabled = useAppContext((context) => context.state.unity.appState.roomSession.sharePanelEnabled)
  const mediaSettings = useAppContext((context) => Selectors.getMediaSettings(context.state))
  const showAddContentMenu = useAppContext((context) => context.state.space.shouldShowContentMenu)
  const cameraMode = useAppContext((context) => context.state.unity.appState.roomSession.camera.mode)
  const isCustomEnvModalVisible = useAppContext((context) => context.state.space.isCustomEnvModalVisible)
  const inRoomAndFullyParticipating = useAppContext(
    (context) => context.state.unity.appState.roomSession.inRoomAndFullyParticipating
  )
  const isBackpackDrawerOpen = useAppContext((context) => context.state.unity.appState.roomSession.backpack.isOpen)
  const isShopDrawerOpen = useAppContext((context) => context.state.unity.appState.roomSession.shop.isOpen)

  const actions = useAppContext((context) => context.actions)
  const roomActions = useRoomActions(actions)
  const {
    isEmoteTrayOpen,
    isSharePanelOpen,
    showEnvironmentSettingsModal,
    showEnvironmentPickerModal,
    showEditCustomEnvironmentBanner,
    showAudioGroupingToolsModal,
    showMediaSettingsModal,
    showManageHostsModal,
    showTokenGateAccessModal,
    showPairPanel,
    transformPanelState,
    hyperlinkPanelState,
    controlsModalOpen,
    supportsUserMedia,
    leaveRoomModalOpen,
    perfStatisticsOpen,
    showCreatePortalModal,
    showDirectlyInvitedUsersModal,
    autoLayoutFiles,
    environmentToChangeTo,
    environmentVariantToChangeTo,
    isReplaceCustomEnvModalOpen,
    isReplaceCustomEnvModalInUploadContext,
    newCustomEnvironmentFile,
    isSpacePickerVisible,
    showCreateHyperlinkPortal,
    showTokenGateWelcomeModal,
    hasShownTokenGateWelcomeModal,
    showUserProfileEditorModal,
    selectedUserProfileId,
    spaceInfoModalCopy,
    spaceInfoModalOnClose,
    composerType,
    hasShownDeetsBeforePublish,
    showGoLiveModal,
    showEndGoLiveModal,
    isSpaceInfoModalOpen,
    isCreateCustomEnvModalOpen,
    rtcManager,
    rtcState,
  } = useAppContext((context) => context.state.space)

  useEffect(() => {
    const screenShareSettings = RoomUtil.sortScreenShareSettings(user.liveswitchConfig.mediaSettings)
    actions.setMediaSettings({ screenShareSettings })
  }, [actions, user.liveswitchConfig.mediaSettings])

  const currentStream = useMemo(() => {
    if (!rtcState.currentStreamId) {
      return null
    }
    return rtcState.localMedias[rtcState.currentStreamId] ?? rtcState.remoteMedias[rtcState.currentStreamId]
  }, [rtcState])

  const openLoginModal = useCallback(
    // Always force redirect when signing in from in-room
    (titleCta?: string) => {
      if (currentStream) {
        rtcManager?.resetMediaPlayerStream()
      }

      actions.openModal({ type: Modals.Login, payload: { forceRedirect: true, titleCta } })
    },
    [actions, currentStream, rtcManager]
  )
  const openEditAvatar = useCallback(() => {
    actions.setSpaceState({ selectedUserProfileId: null })

    if (currentStream) {
      rtcManager?.resetMediaPlayerStream()
    }

    trackInteraction({ name: InteractionName.OpenAvatarCustomizationPanel, type: InteractionType.Click })

    if (isAuthless) {
      actions.patchAuthlessUserData({ confirmationStatus: null })
    } else {
      UnityMessages.setCameraMode(CameraMode.AvatarCustomization)
    }
  }, [actions, currentStream, isAuthless, rtcManager, trackInteraction])

  const enableRTCOptions = Boolean(rtcManager)

  const prevSelectedObjectId = useRef(0)
  const topBarRef = useRef<HTMLDivElement>(null)
  const mainDockRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)
  const contentButtonsRef = useRef<HTMLDivElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const backpackButtonRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)

  // Unity app state from context
  const userProfile = useAppContext((context) => context.state.unity.appState.userProfile)
  const retryingToJoin = useAppContext((context) => context.state.unity.appState.roomSession.retryingToJoin)
  const actorMetaData = useAppContext((context) => context.state.unity.appState.roomSession.sharedState.actorMetaData)
  const meetingId = useAppContext((context) => context.state.unity.appState.roomSession.meetingID)
  const selectedObjectId = useAppContext((context) => context.state.unity.appState.roomSession.selectedObject.objectID)
  const pinnedObjects = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.scene.pinnedObjects
  )
  const administrators = useAppContext((context) => context.state.unity.appState.roomSession.room.administrators)
  const restrictedPermissions = useAppContext(
    (context) => context.state.unity.appState.roomSession.room.restrictedPermissions
  )
  const environment = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.settings.environment
  )
  const selectedSocialProfileIdFromUnity = useAppContext((context) =>
    AppStateSelectors.getSelectedSocialProfileId(context.state.unity.appState)
  )
  const persistenceStatus = useAppContext((context) => context.state.unity.appState.roomSession.persistenceStatus)
  const enableAutosave = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.settings.enableAutosave
  )
  const isParticipantChatDisabled = useAppContext((context) =>
    AppStateSelectors.getIsParticipantChatDisabled(context.state.unity.appState)
  )
  const isReadOnlyActor = useAppContext((context) => context.state.unity.appState.roomSession.isReadOnlyActor)
  const actorsLookup = useAppContext((context) => context.state.unity.appState.roomSession.actorsLookup)
  const voice = useAppContext((context) => context.state.unity.appState.roomSession.voice)
  const micStatus = useAppContext((context) => context.state.unity.appState.microphone.status)
  const voiceIsMuted = useAppContext((context) => context.state.unity.appState.roomSession.voice.isMuted)
  const webcamEnabled = useAppContext((context) => context.state.unity.appState.roomSession.webcamEnabled)
  const screenshareEnabled = useAppContext((context) => context.state.unity.appState.roomSession.screenshareEnabled)
  const lightBoxTargetObjectID = useAppContext(
    (context) => context.state.unity.appState.roomSession.lightBoxTargetObjectID
  )
  const uploadTargetFrameId = useAppContext(
    (context) => context.state.unity.appState.roomSession.uploadTargetFrameObjectID
  )
  const selectedTransform = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.scene.transforms?.[selectedObjectId]
  )
  const addContentEnabled = useAppContext((context) => context.state.unity.appState.roomSession.addContentEnabled)
  const rtcToken = useAppContext((context) => context.state.unity.appState.rtc.token)
  const isLive = useAppContext((context) => context.state.unity.appState.roomSession.room.isLive)

  // Unity app state from selectors
  const room = useAppContext((context) => AppStateSelectors.getCurrentRoom(context.state.unity.appState))
  const hideTopDock = useAppContext((context) =>
    AppStateSelectors.isSettingCustomEnvironment(context.state.unity.appState)
  )
  const isPublicLobby =
    useAppContext((context) => AppStateSelectors.getLobbyType(context.state.unity.appState)) === LobbyType.PublicLobby
  const hideContentButtons = useAppContext((context) =>
    AppStateSelectors.shouldHideContentButtons(context.state.unity.appState)
  )
  const sandboxPackageType = useAppContext((context) => context.state.unity.appState.roomSession.sandbox.type)
  const sandboxBundleUrl = useAppContext((context) => context.state.unity.appState.roomSession.sandbox.bundleURL)
  const { isLocked } = useAppContext((context) =>
    AppStateSelectors.getSelectedObjectButtonState(context.state.unity.appState)
  )
  const isSelectedObjectPortal = useAppContext((context) =>
    AppStateSelectors.isPortal(context.state.unity.appState, selectedObjectId)
  )
  // We use this state from Unity instead of `isAuthless` because we might change this state to be true for more than just authless users
  const isAdmin = useAppContext((context) => AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState))
  const isOwner = useAppContext((context) => AppStateSelectors.isUserRoomOwner(context.state.unity.appState, user.id))
  const canEditRoomName = useAppContext((context) => context.state.unity.appState.roomSession.editRoomNameEnabled)
  const isCustomEnvironmentSet = useAppContext((context) =>
    AppStateSelectors.isCustomEnvironmentSet(context.state.unity.appState)
  )
  const isInCustomEnvironment = useAppContext((context) =>
    AppStateSelectors.isInCustomEnvironment(context.state.unity.appState)
  )
  const roomModalType = useAppContext((context) => context.state.unity.appState.roomSession.roomModalType)
  const addContentDisabled = !addContentEnabled || isAuthless

  const shouldBeConnectedToRTC = useAppContext(
    (context) => context.state.unity.appState.roomSession.shouldBeConnectedToRTC
  )

  const rtcChannelConnectionStatus = useAppContext(
    (context) => context.state.unity.appState.rtc.channelConnectionStatus
  )
  const isGoogleConnected = useAppContext((context) => Selectors.isIntegrationConnected(context.state, "google"))
  const firstQuestSpace = useFirstQuestSpace()
  const showFirstTutorial = useAppContext(
    (context) => context.state.space.showFirstTutorial && !firstQuestSpace?.isCurrent
  )
  // economy state
  const backpack = useAppContext((context) => context.state.unity.appState.roomSession.backpack)
  const backpackItems = useAppContext((context) => context.state.unity.appState.roomSession.backpack.items)
  const shopItems = useAppContext((context) => context.state.unity.appState.roomSession.shop.items)

  const shouldHandleScroll = useMemo(() => {
    return (
      selectedObjectId !== 0 &&
      !pinnedObjects.includes(selectedObjectId) &&
      !uploadTargetFrameId &&
      lightBoxTargetObjectID === 0 &&
      !addContentDisabled
    )
  }, [addContentDisabled, lightBoxTargetObjectID, selectedObjectId, pinnedObjects, uploadTargetFrameId])
  const changingToNftEnvironment = useMemo(
    () => environmentToChangeTo?.metadata.category === SpaceTemplateCategory.Collectibles,
    [environmentToChangeTo]
  )
  const changingToCustomNftEnvironment = useMemo(
    () => changingToNftEnvironment && environmentToChangeTo?.environment === VREnvironment.Custom,
    [changingToNftEnvironment, environmentToChangeTo]
  )

  const isAuthlessModalOpen = useAppContext((context) => {
    return isAuthless && !context.state.authlessUserData?.confirmationStatus
  })

  const { data: nftVerificationData, isInitialLoading: isInitialLoadingNftVerification } = useNftVerificationQuery(
    sapiClient,
    {
      environment: environmentToChangeTo?.environment,
      userID: room.ownerID,
      chain: environmentToChangeTo?.metadata?.nftChain,
      contractAddress: environmentToChangeTo?.metadata?.contractAddress,
      tokenID: environmentToChangeTo?.metadata?.tokenID,
    },
    { enabled: changingToNftEnvironment }
  )

  const { data: tokenGateConfig } = useGetTokenGateAccessQuery(sapiClient, room.id)

  // isParticipantChatDisabled is based on the room settings
  const isChatEnabled = !isParticipantChatDisabled

  const shareSetting = remapShareSettingTempWorkaround(room.shareSetting, room, user)
  const userIsRoomOrgMember = isUserMemberOfRoomOrg(user, room)
  const canRemoveInvitedUsers =
    isOwner || (shareSetting === ShareSetting.Organization && userIsRoomOrgMember) || isAdmin

  const isCustomizingAvatar = useMemo(() => cameraMode === CameraMode.AvatarCustomization, [cameraMode])

  const handleEditCustomEnvBannerPrimaryClick = useCallback(() => {
    actions.setSpaceState({ showEditCustomEnvironmentBanner: false })
    trackInteraction({
      type: InteractionType.Click,
      name: InteractionName.EditEnvironmentPosition,
      component: TrackedComponents.EditCustomEnvironmentBanner,
    })
  }, [trackInteraction, actions])
  const handleEditCustomEnvBannerSecondaryClick = useCallback(() => {
    actions.setSpaceState({ showEditCustomEnvironmentBanner: false })
    UnityMessages.startTweakCustomEnvironment()
    trackInteraction({
      type: InteractionType.Click,
      name: InteractionName.ConfirmCustomEnv,
      component: TrackedComponents.EditCustomEnvironmentBanner,
    })
  }, [trackInteraction, actions])

  // Composer
  const onComposerSubmit = useCallback(
    (value: string) => {
      if (!value) return

      actions.setSpaceState({ composerType: null })
      switch (composerType) {
        case ComposerType.Note:
          UnityMessages.addNote(value)
          break
        case ComposerType.SearchOrURL:
          // This handles Google Drive URLs, and regular web page URLs,
          // and falls back to a Poly search if it doesn't match any of those
          UnityMessages.addSearchOrUrl(value)
          break
        default:
          break
      }
    },
    [composerType, actions]
  )

  const closeSpaceInfoModal = useCallback(() => {
    // Do not reset title to avoid flicker during close animation
    actions.setSpaceState({ isSpaceInfoModalOpen: false, spaceInfoModalOnClose: undefined })
    spaceInfoModalOnClose?.()
  }, [spaceInfoModalOnClose, actions])
  const isReadyToPublish = hasShownDeetsBeforePublish || Boolean(room.description && room.tags?.length)

  const displayGoLiveModal = useCallback(() => {
    trackInteraction({ name: InteractionName.GoLive, type: InteractionType.Click })
    if (isReadyToPublish) {
      actions.setSpaceState({ showGoLiveModal: true })
    } else {
      actions.setSpaceState({ hasShownDeetsBeforePublish: true })
      roomActions.openSpaceInfoModal(
        { title: "Before Going Live, Add Some Info about your Space", dismissCopy: "Maybe Later" },
        () => actions.setSpaceState({ showGoLiveModal: true })
      )
    }
  }, [trackInteraction, isReadyToPublish, roomActions, actions])

  const displayEndGoLiveModal = useCallback(() => {
    trackInteraction({ name: InteractionName.EndGoLive, type: InteractionType.Click })
    actions.setSpaceState({ showEndGoLiveModal: true })
  }, [trackInteraction, actions])

  // -----------------------
  // Lifecycle
  // -----------------------

  const connectToRTCIfDisconnected = useCallback(() => {
    if (rtcChannelConnectionStatus === RTCConnectionStatus.Disconnected) {
      rtcManager.claimChannel(meetingId, rtcToken)
    }
  }, [rtcManager, rtcChannelConnectionStatus, meetingId, rtcToken])

  const disconnectFromRTCIfConnected = useCallback(() => {
    if (rtcChannelConnectionStatus === RTCConnectionStatus.Connected) {
      rtcManager.releaseChannel()
    }
  }, [rtcManager, rtcChannelConnectionStatus])

  useEffect(() => {
    if (rtcToken && rtcManager && shouldBeConnectedToRTC) {
      connectToRTCIfDisconnected()
      return () => {
        disconnectFromRTCIfConnected()
      }
    } else {
      disconnectFromRTCIfConnected()
    }
  }, [rtcManager, meetingId, rtcToken, shouldBeConnectedToRTC, connectToRTCIfDisconnected, disconnectFromRTCIfConnected])

  useEffect(() => {
    registerRTCQuality(mediaSettings.selectedScreenShareSetting)

    const userMediaResult = RoomUtil.supportsUserMedia()
    if (userMediaResult.message) {
      Toast.notify(userMediaResult.message, 6000)
    }
    actions.setSpaceState({ supportsUserMedia: userMediaResult.isSupported })

    return () => {
      unregisterRTCQuality()

      voiceManager.audioUnblockingPromise?.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // listen to toasts from Unity
  useUnityToastListener(inRoomAndFullyParticipating)

  // Save room toasts
  useEffect(() => {
    // Always ensure previous status toasts are dismissed.
    Toast.dismiss("save")

    if (!enableAutosave) {
      if (persistenceStatus === RoomPersistenceStatus.Saving) {
        // Display toast until the persistence status changes from
        Toast.notify("Saving space...", null, "toast-bg", "save")
      } else if (persistenceStatus === RoomPersistenceStatus.SaveComplete) {
        Toast.notify("Space saved!", 2000, "toast-bg", "save")
      } else if (persistenceStatus === RoomPersistenceStatus.SaveFailed) {
        Toast.notify("Couldn't save space.\nPlease email us at support@spatial.io for help.", 5000, "toast-bg", "save")
      }
    }
  }, [enableAutosave, persistenceStatus])

  // Permissions toast

  const showPermissionsErrorToast = useCallback(() => {
    Toast.error(
      <>
        <span>Please accept permissions... </span>
        <a
          href="https://support.spatial.io/hc/en-us/articles/360049635111-Troubleshooting-Webcam-and-Microphone-on-the-Web-App"
          target="_blank"
          rel="noopener noreferrer"
          className="toast-error__permissions_denied"
        >
          Click here for help.
        </a>
      </>,
      2000
    )
  }, [])

  useEffect(() => {
    if (micStatus === MicStatus.NotAllowedError) showPermissionsErrorToast()
  }, [micStatus, roomActions, showPermissionsErrorToast])

  useEffect(() => {
    if (rtcState.webcamStatus === WebcamStatus.PermissionsDenied) showPermissionsErrorToast()
  }, [roomActions, rtcState.webcamStatus, showPermissionsErrorToast])

  // Media settings (audio/video input sources)

  // When the selected camera is changed, we want to restart webcam capture
  // But only when we're a full participant in the room (aka, you're synced and
  // you have clicked past the join modal)
  useEffect(() => {
    // We're not a full participant until this flag is true
    if (!inRoomAndFullyParticipating) return

    // If currently streaming webcam, restart webcam with new video input source
    if (rtcState.localWebcamMediaID && mediaSettings.selectedVideoInput && rtcState.webcamStatus === WebcamStatus.On) {
      const videoSource = rtcState.localMedias[rtcState.localWebcamMediaID].raw.GetVideoSourceInput()
      if (videoSource && videoSource.getId() !== mediaSettings.selectedVideoInput.deviceId) {
        rtcManager.startWebcamCapture(mediaSettings.selectedVideoInput.deviceId)
      }
    }
  }, [mediaSettings.selectedVideoInput, rtcManager, rtcState.localMedias, rtcState.localWebcamMediaID, rtcState.webcamStatus, inRoomAndFullyParticipating])

  // Push settingsMenu visible state into unity (needed for microphone access)
  useEffect(() => {
    UnityMessages.setSettingsMenuVisible(showMediaSettingsModal)
  }, [showMediaSettingsModal])

  // Start/Stop the camera when the camera button is pressed
  // But only start doing it if you're a full participant, and RTC is fully setup
  useEffect(() => {
    // Only allow webcam capture once RTC is initialized and you're a full participant (synced and past the join modal)
    if (!rtcManager) return

    if (inRoomAndFullyParticipating && webcamEnabled) {
      rtcManager.startWebcamCapture(mediaSettings.selectedVideoInput?.deviceId)
    } else {
      rtcManager.releaseWebcamMedia()
    }
  }, [rtcManager, webcamEnabled, inRoomAndFullyParticipating, mediaSettings.selectedVideoInput?.deviceId])

  // Start/Stop the screenshare when the screenshare button is pressed
  // But only start doing it if you're a full participant, and RTC is fully setup
  useEffect(() => {
    // Only allow screenshare once RTC is initialized and you're a full participant
    if (!rtcManager) return

    if (inRoomAndFullyParticipating && screenshareEnabled) {
      rtcManager.startScreenSharing(mediaSettings.selectedScreenShareSetting)
    } else {
      rtcManager.releaseScreenshareMedia()
    }
  }, [rtcManager, screenshareEnabled, inRoomAndFullyParticipating, mediaSettings.selectedScreenShareSetting])

  // Push selected microphone device into unity (which start recording from the correct device)
  useEffect(() => {
    if (mediaSettings.selectedAudioInput) {
      UnityMessages.setMicrophoneInputSource(mediaSettings.selectedAudioInput.deviceId)
    }
  }, [mediaSettings.selectedAudioInput])

  useEffect(() => {
    if (hyperlinksV2) {
      return
    }
    if (selectedObjectId === 0 || isLocked) {
      actions.setSpaceState({
        transformPanelState: TransformPanelState.Closed,
        hyperlinkPanelState: AddContentHyperlinkState.Closed,
      })
    } else if (
      selectedObjectId !== 0 &&
      !isReadOnlyActor &&
      !isLocked &&
      !isSelectedObjectPortal &&
      !isCustomizingAvatar &&
      transformPanelState !== TransformPanelState.Active &&
      prevSelectedObjectId.current !== selectedObjectId
    ) {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Active })
    }
    prevSelectedObjectId.current = selectedObjectId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [administrators, isCustomizingAvatar, restrictedPermissions, pinnedObjects, selectedObjectId, prevSelectedObjectId, isReadOnlyActor, hyperlinksV2])

  /** Change environment */
  useEffect(() => {
    if (environmentToChangeTo) {
      if (environment === VREnvironment.Custom && !changingToCustomNftEnvironment && !isCustomEnvironmentSet) {
        UnityMessages.setCustomEnvironmentSetupStep(0, CustomEnvironmentSetupStep.Instructions)
        roomActions.onSetEnvironmentSuccess()
      } else if (environmentToChangeTo.metadata?.variants) {
        const selectedVariantData = environmentToChangeTo.metadata.variants[environmentVariantToChangeTo]

        if (environmentToChangeTo.environment === VREnvironment.UnityPackage) {
          UnityMessages.setPackageEnvironment(environmentToChangeTo.id, selectedVariantData.id)
          roomActions.onSetEnvironmentSuccess()
        } else if (!changingToNftEnvironment) {
          UnityMessages.setEnvironment(
            environmentToChangeTo.environment,
            convertSpaceTemplateVariantIndex(environmentVariantToChangeTo, selectedVariantData)
          )
          roomActions.onSetEnvironmentSuccess()
        } else {
          if (nftVerificationData?.ownershipVerified) {
            if (environmentToChangeTo.environment === VREnvironment.Custom) {
              UnityMessages.setCustomNftEnvironment(getCustomNftEnvironmentId(environmentToChangeTo.metadata))
            } else {
              UnityMessages.setEnvironment(
                environmentToChangeTo.environment,
                convertSpaceTemplateVariantIndex(environmentVariantToChangeTo, selectedVariantData)
              )
            }
            roomActions.onSetEnvironmentSuccess()
          }
        }
      }
    }
  }, [environment, environmentToChangeTo, environmentVariantToChangeTo, isCustomEnvironmentSet, changingToNftEnvironment, changingToCustomNftEnvironment, nftVerificationData?.ownershipVerified, roomActions])

  /** Ensure global quest complete modal is never open outside of the space page */
  useEffect(() => {
    return () => {
      actions.closeModal(Modals.QuestComplete)
    }
  }, [actions])

  useEffect(() => {
    if (tokenGateConfig && !tokenGateConfig.disabled && !hasShownTokenGateWelcomeModal && !isAdmin) {
      actions.setSpaceState({
        showTokenGateWelcomeModal: true,
        hasShownTokenGateWelcomeModal: true,
      })
    }
  }, [tokenGateConfig, hasShownTokenGateWelcomeModal, isAdmin, actions])

  // -----------------------
  // Functions
  // -----------------------

  const confirmLeaveSpace = useCallback(() => {
    trackInteraction({ name: InteractionName.LeaveSpaceConfirm, type: InteractionType.Click })
    void push("/")
  }, [push, trackInteraction])

  const openHostToolsModal = useCallback(() => {
    actions.openModal({ type: Modals.HostTools })
    actions.setSpaceState({ isSharePanelOpen: false })
  }, [actions])
  const closeHostToolsModal = useCallback(() => actions.closeModal(Modals.HostTools), [actions])
  const showObjectLightbox = useCallback(() => UnityMessages.setLightBoxObject(selectedObjectId), [selectedObjectId])

  const closeVideoLightboxModal = useCallback(() => rtcManager?.resetMediaPlayerStream(), [rtcManager])

  const navigateBackManageHostsModal = useCallback(() => {
    actions.openModal({ type: Modals.HostTools })
    roomActions.closeManageHostsModal()
  }, [actions, roomActions])

  const navigateBackTokenGateAccessActions = useCallback(() => {
    actions.openModal({ type: Modals.HostTools })
    actions.setSpaceState({ showTokenGateAccessModal: false })
  }, [actions])

  const closeMetamaskTutorial = useCallback(() => {
    if (shouldShowSettingsTutorial)
      acknowledgeNotification({
        userId: user.id,
        notification: NotificationKeys.finishedSettingsTutorial,
      })
    else if (shouldShowMetamaskTutorial)
      acknowledgeNotification({
        userId: user.id,
        notification: NotificationKeys.finishedMetamaskTutorial,
      })
  }, [shouldShowMetamaskTutorial, shouldShowSettingsTutorial, user.id, acknowledgeNotification])

  // Participant functions
  const onParticipantClick = useCallback(
    (participant: ParticipantWithRTC) => {
      if (participant.isLocalUser) {
        rtcManager?.switchToLocal()
      } else if (participant.media?.location === "remote") {
        rtcManager?.switchToRemote(participant.media.clientId, participant.media.raw.ID)
      }
    },
    [rtcManager]
  )

  const participantMap = useMemo(() => makeParticipantsMap(actorMetaData, actorsLookup), [actorMetaData, actorsLookup])

  const requestMuteByUserID = useCallback(
    (mute: boolean, uid: string) => {
      const participant = participantMap[uid]
      if (participant && participant.roomActorNumbers) {
        participant.roomActorNumbers.forEach((roomActorNumber: number) => {
          UnityMessages.requestMute(mute, roomActorNumber)
        })
      }
    },
    [participantMap]
  )

  const toggleMuteSelf = useCallback(
    (component: TrackedComponents) => {
      if (isAuthless && voiceIsMuted) {
        openLoginModal("Sign in to unmute")
      } else {
        UnityMessages.setVoiceMuted(!voiceIsMuted)
        trackInteraction({
          name: voiceIsMuted ? InteractionName.UnmuteSelf : InteractionName.MuteSelf,
          type: InteractionType.Click,
          component,
        })
      }
    },
    [isAuthless, openLoginModal, trackInteraction, voiceIsMuted]
  )

  const toggleMuteParticipant = useCallback(
    (participant: ParticipantWithRTC) => {
      if (participant.isLocalUser) {
        toggleMuteSelf(TrackedComponents.ParticipantsModal)
      } else if (participant.isMuted) {
        trackInteraction({
          name: InteractionName.UnmuteOther,
          type: InteractionType.Click,
          component: TrackedComponents.ParticipantsModal,
        })
        Toast.notifyConfirm({
          message: ({ closeToast }) => (
            <div className="p-4">
              <p className="pb-4">Are you sure you want to unmute {participant.displayName}?</p>
              <button type="button" className={clsx(buttonClasses.textButton, "pr-8")} onClick={closeToast}>
                Cancel
              </button>

              <button
                type="button"
                className={clsx(buttonClasses.textButton, "pt-4 text-blue")}
                onClick={() => {
                  requestMuteByUserID(false, participant.id)
                  closeToast()
                }}
              >
                Request unmute
              </button>
            </div>
          ),
          containerId: Toast.InRoomContainerId,
        })
      } else {
        trackInteraction({
          name: InteractionName.MuteOther,
          type: InteractionType.Click,
          component: TrackedComponents.ParticipantsModal,
        })
        Toast.notifyConfirm({
          message: ({ closeToast }) => (
            <div className="p-4">
              <p className="pb-4">Are you sure you want to mute {participant.displayName}?</p>
              <button type="button" className="hover pr-8" onClick={closeToast}>
                Cancel
              </button>

              <button
                type="button"
                className="hover pt-4 text-red"
                onClick={() => {
                  requestMuteByUserID(true, participant.id)
                  closeToast()
                }}
              >
                Mute
              </button>
            </div>
          ),
          containerId: Toast.InRoomContainerId,
        })
      }
    },
    [requestMuteByUserID, toggleMuteSelf, trackInteraction]
  )

  const toggleScreenShare = useCallback(() => {
    UnityMessages.setScreenshareEnabled(!screenshareEnabled)
    actions.focusUnity()
  }, [actions, screenshareEnabled])

  // Webcam and mic controllers
  const toggleWebcam = useCallback(
    (disabled: boolean) => {
      roomActions.closeSocialProfileModal()
      trackDockButtonClick("Webcam")
      if (isAuthless && !webcamEnabled) {
        openLoginModal("Sign in to use webcam")
      } else if (disabled) {
        showPermissionsErrorToast()
      } else {
        trackWebcamToggle(webcamEnabled ? "off" : "on")
        UnityMessages.setWebcamEnabled(!webcamEnabled)
      }
      actions.focusUnity()
    },
    [actions, isAuthless, openLoginModal, roomActions, showPermissionsErrorToast, webcamEnabled]
  )

  const toggleMicrophone = useCallback(
    (disabled: boolean) => {
      trackDockButtonClick("Mic")
      if (disabled) {
        showPermissionsErrorToast()
      } else {
        toggleMuteSelf(TrackedComponents.MicButton)
      }
      actions.focusUnity()
    },
    [actions, showPermissionsErrorToast, toggleMuteSelf]
  )

  const joinVoice = useCallback(async () => {
    if (!disableUnblockAudioWeb) {
      await voiceManager.attemptUnblockingAudio()
    }
    UnityMessages.setUserEnabledVoiceConnection(true)
  }, [disableUnblockAudioWeb])

  const { width: windowWidth } = useWindowSize()
  const unityShiftedCanvasWidth = (windowWidth - 350) / windowWidth

  const open3DLightbox = useCallback(() => {
    actions.setSpaceState({ hyperlinkPanelState: AddContentHyperlinkState.Active })
    UnityMessages.setCameraViewportRectWithAnimation({
      x: 0,
      y: 0,
      width: unityShiftedCanvasWidth,
      height: 1,
      duration: 0.3,
      easingCurve: UnityMessages.UnityViewPortAnimation.EaseOutCubic,
    })
    UnityMessages.setAutoplayTargetObjectId()

    UnityMessages.setCameraMode(CameraMode.ArtNavigation)
  }, [unityShiftedCanvasWidth, actions])

  /**
   * Toggle info panel open and closed
   *
   * When locked, also toggle between 3D Lightbox camera {@link CameraMode.ArtNavigation} and room view {@link CameraMode.Room}
   *
   * This function is only called when the {@link hyperlinksV2} treatment is enabled
   */
  const toggleInfoPanel = useCallback(() => {
    if (!isLocked && hyperlinkPanelState === AddContentHyperlinkState.Closed) {
      actions.setSpaceState({
        transformPanelState: TransformPanelState.Closed,
        hyperlinkPanelState: AddContentHyperlinkState.Active,
      })
      return
    }

    if (!isLocked) {
      actions.setSpaceState({ hyperlinkPanelState: AddContentHyperlinkState.Closed })
      return
    }

    if (isLocked && hyperlinkPanelState === AddContentHyperlinkState.Closed) {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Closed })
      open3DLightbox()
      return
    }

    if (isLocked) {
      roomActions.close3DLightbox()
      return
    }
  }, [roomActions, hyperlinkPanelState, isLocked, open3DLightbox, actions])

  const threeDLightboxOpen =
    hyperlinkPanelState === AddContentHyperlinkState.Active && cameraMode === CameraMode.ArtNavigation

  const handleCloseButton = useCallback(() => {
    if (threeDLightboxOpen) {
      roomActions.close3DLightbox()
    } else if (hyperlinkPanelState === AddContentHyperlinkState.Active) {
      actions.setSpaceState({ hyperlinkPanelState: AddContentHyperlinkState.Closed })
    } else {
      roomActions.closeTransformPanel()
    }

    UnityMessages.clearSelectedObject()
  }, [roomActions, hyperlinkPanelState, threeDLightboxOpen, actions])

  useEffect(() => {
    if (!hyperlinksV2) {
      return
    }

    if (isLocked) {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Closed })
      open3DLightbox()
    } else {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Active })
      roomActions.close3DLightbox()
    }
  }, [roomActions, hyperlinksV2, isLocked, open3DLightbox, actions])

  // Declaritive to have the correct UI state when selecting an object (creators)

  useEffect(() => {
    if (!hyperlinksV2) {
      return
    }

    if (selectedObjectId === 0) {
      actions.setSpaceState({
        transformPanelState: TransformPanelState.Closed,
        hyperlinkPanelState: AddContentHyperlinkState.Closed,
      })
      roomActions.close3DLightbox()
    } else if (isLocked && prevSelectedObjectId.current !== selectedObjectId) {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Closed })
      open3DLightbox()
    } else if (
      selectedObjectId !== 0 &&
      !isReadOnlyActor &&
      !isLocked &&
      !isSelectedObjectPortal &&
      !isCustomizingAvatar &&
      transformPanelState !== TransformPanelState.Active &&
      prevSelectedObjectId.current !== selectedObjectId // this causes infinite re-render but need to change this
    ) {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Active })
      roomActions.close3DLightbox()
    }

    prevSelectedObjectId.current = selectedObjectId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [administrators, isCustomizingAvatar, restrictedPermissions, prevSelectedObjectId, pinnedObjects, selectedObjectId, isReadOnlyActor, isLocked, transformPanelState, hyperlinksV2, roomActions])

  // -----------------------
  // Render
  // -----------------------

  const { participants, localParticipant } = useMemo(
    () => makeParticipantsList(participantMap, rtcState, user),
    [participantMap, rtcState, user]
  )

  const preventDefault = useCallback((e: Event) => {
    e.preventDefault()
  }, [])

  const onSetNewCustomEnv = useCallback(
    (replace: boolean, content: ContentObject[]) => {
      if (content) {
        UnityMessages.setCustomEnvironmentFromFile(content, replace)
      } else {
        UnityMessages.setCustomEnvironmentFromObject(selectedObjectId, replace)
      }
      actions.setSpaceState({ newCustomEnvironmentFile: null, showEditCustomEnvironmentBanner: true })
    },
    [selectedObjectId, actions]
  )

  const onUploadFiles = useCallback(
    (files: File[]) => {
      if (uploadTargetFrameId && files.length > 1) {
        Toast.notify("Can only upload 1 file to selected frame")
        return
      }
      if (!uploadFiles.isLoading) {
        uploadFiles.mutate(
          { files, fileInputRef: null, roomId: room.id, unlimitedFileSize },
          {
            onSettled: (data) => {
              const successes = data
                .filter((res) => res.status === "fulfilled")
                .map((res) => res.status === "fulfilled" && res.value)
              const formatFilesUploadedNotification = (dataLength: number, successLength: number) =>
                `${successLength} files uploaded${
                  dataLength !== successLength ? `, ${dataLength - successLength} failed to upload` : ""
                }`
              Toast.notify(formatFilesUploadedNotification(data.length, successes.length))
              actions.setSpaceState({ shouldShowContentMenu: false })
              if (isCreateCustomEnvModalOpen) {
                if (has3dObjects(successes)) {
                  if (isInCustomEnvironment) {
                    actions.setSpaceState({
                      newCustomEnvironmentFile: successes,
                      isReplaceCustomEnvModalOpen: true,
                      isReplaceCustomEnvModalInUploadContext: true,
                      isCreateCustomEnvModalOpen: false,
                    })
                  } else {
                    actions.setSpaceState({
                      isCreateCustomEnvModalOpen: false,
                    })
                    onSetNewCustomEnv(false, successes)
                  }
                } else if (successes.length > 0) {
                  Toast.error("Content must be a 3D model")
                }
              } else if (uploadTargetFrameId) {
                UnityMessages.replaceObjectContent(uploadTargetFrameId, successes[0])
              } else if (has2dObjects(successes) && hasEmptyFrames && isAutoLayoutEnvironment) {
                actions.setSpaceState({ autoLayoutFiles: successes })
              } else {
                UnityMessages.spawnContent(false, false, successes)
              }
            },
          }
        )
      }
    },
    [
      uploadTargetFrameId,
      uploadFiles,
      room.id,
      unlimitedFileSize,
      isCreateCustomEnvModalOpen,
      hasEmptyFrames,
      isAutoLayoutEnvironment,
      isInCustomEnvironment,
      onSetNewCustomEnv,
      actions,
    ]
  )
  const handleDrop = useCallback((evt: DragEvent) => onUploadFiles(getFilesFromDropEvent(evt)), [onUploadFiles])
  const isDragging = useDragAndDrop(handleDrop, {
    isDisabled:
      !room.id ||
      addContentDisabled ||
      showAddContentMenu ||
      Boolean(uploadTargetFrameId) ||
      isCreateCustomEnvModalOpen,
  })

  useEffect(() => {
    if (isCustomEnvModalVisible) {
      actions.setSpaceState({ transformPanelState: TransformPanelState.Closed })
    }
  }, [isCustomEnvModalVisible, actions])

  //when the user click "environment" on the environment or skybox modal
  //or when the user selects a model from the content browser in the custom env flow
  const onSetCustomEnvironment = useCallback(
    (content: ContentObject[], inUploadContext: boolean) => {
      actions.setSpaceState({ isReplaceCustomEnvModalInUploadContext: inUploadContext })
      actions.setIsCustomEnvModalVisible(false)
      if (isInCustomEnvironment) {
        actions.setSpaceState({
          newCustomEnvironmentFile: content,
          isReplaceCustomEnvModalOpen: true,
        })
      } else {
        onSetNewCustomEnv(false, content)
      }
    },
    [actions, isInCustomEnvironment, onSetNewCustomEnv]
  )

  const handleSetCustomEnvModalOnSet = useCallback(() => {
    onSetCustomEnvironment(null, false)
  }, [onSetCustomEnvironment])

  const onCloseSetCustomEnvModal = useCallback(() => {
    UnityMessages.setCustomEnvironmentSetupStep(selectedObjectId, CustomEnvironmentSetupStep.None)
    actions.setIsCustomEnvModalVisible(false)
  }, [actions, selectedObjectId])

  const onClickBackReplaceCustomEnvModal = useCallback(() => {
    actions.setSpaceState({ isReplaceCustomEnvModalOpen: false })
    if (isReplaceCustomEnvModalInUploadContext) {
      roomActions.openCreateCustomEnvModal()
    } else {
      actions.setIsCustomEnvModalVisible(true)
    }
  }, [isReplaceCustomEnvModalInUploadContext, roomActions, actions])

  const toggleSpaceLoved = useCallback(() => {
    if (isAuthless) {
      openLoginModal("Sign in to show this space some love!")
    } else {
      const newLoveState = !room.isLoved
      trackInteraction({
        name: newLoveState ? InteractionName.LoveSpace : InteractionName.UnloveSpace,
        type: InteractionType.Click,
      })
      UnityMessages.setSpaceLoved(room.id, newLoveState)

      if (newLoveState) {
        actions.requestPushNotificationPermission(PushNotificationPermissionModalType.LoveSpace)
      }
    }
    actions.focusUnity()
  }, [room.id, room.isLoved, trackInteraction, actions, isAuthless, openLoginModal])

  const showSelectedObjectButtons =
    hyperlinksV2 &&
    (hyperlinkPanelState === AddContentHyperlinkState.Active || transformPanelState === TransformPanelState.Active)

  return (
    <InstanceCountManager onChange={actions.setOpenModalCount}>
      {/* Putting this container here ensures any toasts created are anchored
      here in the DOM and a part of our React component tree, i.e. can use 
      context. */}
      <ToastContainer enableMultiContainer containerId={Toast.InRoomContainerId} />
      <div
        className="room"
        onMouseLeave={() => UnityMessages.setMouseInWindow(false)}
        onMouseEnter={() => UnityMessages.setMouseInWindow(true)}
      >
        <Head>{TitleTags(room.name)}</Head>

        <TransformObjectWithMouseWheel
          shouldHandleScroll={shouldHandleScroll}
          selectedObjectId={selectedObjectId}
          selectedTransform={selectedTransform}
        />

        {retryingToJoin && (
          <div className="room__reconnecting-container">
            <Loader variant="fancy" color="black" className="m-auto" />
            <div className="reconnecting_text">Reconnecting...</div>
          </div>
        )}
        {/* Prevent the default browser behavior of opening media files dragged over the window,
          regardless of whether the user can add content to the space. */}
        <OnDragOver handler={preventDefault} />
        <OnDrop handler={preventDefault} />
        <DragAndDropFilesOverlay isVisible={isDragging} />

        <div className={classes.content}>
          <TransitionComponentHidden
            ref={topBarRef}
            in={
              is2dUiVisible &&
              !isAuthlessModalOpen &&
              !isCustomizingAvatar &&
              !showFirstTutorial &&
              uiMode !== UiModes.Camera &&
              !leaveRoomModalOpen &&
              !isBackpackDrawerOpen &&
              !isShopDrawerOpen
            }
            // do not unmount to avoid layout shifts
            unmountOnExit={false}
          >
            <div
              className={clsx(classes.controlBar, classes.topBar)}
              ref={topBarRef}
              style={{ width: showSelectedObjectButtons ? unityShiftedCanvasWidth : "100%" }}
            >
              {showSelectedObjectButtons ? (
                <div className="scaleIn">
                  <CircleButton
                    onClick={handleCloseButton}
                    ligature={<CloseIcon className="icon icon-lg" />}
                    tooltipText="Exit View"
                    tooltipPosition="bottom"
                    color="outline"
                  />
                </div>
              ) : (
                <>
                  {isPointerLock ? (
                    <DockPillButton>Press ESC to regain control</DockPillButton>
                  ) : (
                    <LeaveButton onClick={roomActions.openLeaveRoomModal} />
                  )}

                  <div className={clsx(classes.topDockContainer, "scaleIn")}>
                    {!hideTopDock && (
                      <TopDock
                        openDeetsModal={canEditRoomName ? roomActions.openDefaultSpaceInfoModal : undefined}
                        onPin={onParticipantClick}
                        onToggleMute={toggleMuteParticipant}
                        onToggleSpaceLoved={toggleSpaceLoved}
                        participants={participants}
                        participantMap={participantMap}
                        pinnedRtcId={currentStream?.raw.ID}
                      />
                    )}
                  </div>

                  {/* Top right */}
                  <div className={clsx("scaleIn", classes.topRightContainer)}>
                    {showShop && !isEmptyShop && hasWorldCurrency && (
                      <DockPillButton
                        leftIcon={<StoreIcon className={clsx(backpack.worldCurrencyBalance > 0 && "mr-0.5")} />}
                        onClick={roomActions.openShopDrawer}
                        className={clsx(backpack.worldCurrencyBalance > 0 && "flex-row-reverse [&>span]:mr-0")}
                      >
                        {backpack.worldCurrencyBalance > 0 ? (
                          <div className="mr-2 flex border-r border-gray-400 pr-2.5">
                            {backpack.worldCurrencyThumbnail && (
                              <img
                                src={backpack.worldCurrencyThumbnail}
                                alt={backpack.worldCurrencyName}
                                width={24}
                                height={24}
                                className="mr-1"
                              />
                            )}
                            {backpack.worldCurrencyBalance}
                          </div>
                        ) : (
                          "Shop"
                        )}
                      </DockPillButton>
                    )}
                    {isLive && !room.isSandbox && (
                      <LiveButton isSpaceOwner={isOwner} onStopLive={displayEndGoLiveModal} />
                    )}
                    <RoomStats
                      roomIsSandbox={room.isSandbox}
                      isAuthless={isAuthless}
                      loveCount={room.loveCount}
                      loved={room.isLoved}
                      onLoveButtonClicked={toggleSpaceLoved}
                    />
                    {sharePanelEnabled && (
                      <DockPillButton leftIcon={<IosShareIcon />} onClick={roomActions.openSharePanel}>
                        Share
                      </DockPillButton>
                    )}
                    <div>
                      <div ref={setTriggerRef}>
                        <RoomSettingsMenu
                          roomID={room.id}
                          roomName={room.name}
                          roomOwnerID={room.ownerID}
                          userID={user.id}
                          shouldConnectToVoice={voice.userEnabledVoiceConnection}
                          isAuthless={isAuthless}
                          isReadOnlyActor={isReadOnlyActor}
                          enableAutoSave={enableAutosave}
                          onShowAudioGroupingToolsModal={roomActions.openAudioGroupingToolsModal}
                          onShowMediaSettingsModal={roomActions.openMediaSettingsModal}
                          onShowHostToolsModal={openHostToolsModal}
                          onShowEnvironmentSettingsModal={roomActions.openChangeEnvironmentModal}
                          onShowControls={roomActions.openControlsModal}
                          onShowPairPanel={roomActions.openPairPanel}
                          onShowPerfStatistics={roomActions.openPerfStatistics}
                          onLeaveVoice={roomActions.leaveVoice}
                        />
                      </div>
                      {isShowSettingsTooltipVisible && (
                        <div
                          ref={setTooltipRef}
                          {...getTooltipProps({
                            className: clsx(tooltipClasses.container, classes.galleryTutorialContainer),
                          })}
                        >
                          <div {...getArrowProps({ className: tooltipClasses.arrow })} />
                          <button onClick={closeMetamaskTutorial}>
                            <CloseIcon className="icon icon-sm" />
                          </button>
                          <div>Still need help? Check out our web tutorial in “Controls”</div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TransitionComponentHidden>

          <EditCustomEnvironmentBanner
            isVisible={showEditCustomEnvironmentBanner}
            onPrimaryButtonClick={handleEditCustomEnvBannerPrimaryClick}
            onSecondaryButtonClick={handleEditCustomEnvBannerSecondaryClick}
          />

          {/* Object inspector (dev tool) */}
          {isObjectInspectorVisible && (
            <Suspense fallback={null}>
              <ObjectInspectorPanel />
            </Suspense>
          )}

          {/* Lower Section */}
          <div className={clsx(classes.controlBar, classes.lowerSection)}>
            {/* Bottom Left */}
            <BottomLeftView
              ref={bottomLeftRef}
              is2dUiVisible={is2dUiVisible && !isAuthlessModalOpen}
              isCustomizingAvatar={isCustomizingAvatar}
              isBackpackDrawerOpen={isBackpackDrawerOpen}
              isShopDrawerOpen={isShopDrawerOpen}
              isEmoteTrayOpen={isEmoteTrayOpen}
              showTutorial={showFirstTutorial}
              supportsUserMedia={supportsUserMedia}
              onOpenControls={roomActions.openControlsModal}
              mediaCaptureButtonsProps={{
                webcamStatus: rtcState.webcamStatus,
                hideWebCam: isPublicLobby,
                onJoinAudio: joinVoice,
                onToggleMic: toggleMicrophone,
                onToggleWebcam: toggleWebcam,
                onOpenMediaSettingsMenu: roomActions.openMediaSettingsModal,
              }}
              emoteButtonProps={{
                onClick: actions.toggleEmoteTray,
                showTooltip: !isEmoteTrayOpen,
              }}
            />

            {/* Main dock (bottom dock) */}
            <TransitionComponentHidden
              ref={mainDockRef}
              in={
                is2dUiVisible &&
                !isAuthlessModalOpen &&
                !isCustomizingAvatar &&
                !showFirstTutorial &&
                !isBackpackDrawerOpen &&
                !isShopDrawerOpen
              }
            >
              <div className={clsx(classes.mainDock, "scaleIn")} ref={mainDockRef}>
                {sandboxPackageType === PackageType.AvatarAnimation && sandboxBundleUrl && (
                  /* Play sandbox avatar emote animation */
                  <Button
                    className="w-fit"
                    color="outline"
                    leftIcon={<PlayArrowIcon />}
                    size="lg"
                    onClick={UnityMessages.playSandboxEmoteAnimation}
                  >
                    Play Emote
                  </Button>
                )}

                {!hideContentButtons && (
                  <BottomDock
                    ref={contentButtonsRef}
                    selectedObjectID={selectedObjectId}
                    isReadOnlyActor={isReadOnlyActor}
                    screenSharing={rtcState.screenSharing}
                    screenShareDisabled={rtcManager === null}
                    addContentDisabled={addContentDisabled}
                    backpackButtonRef={backpackButtonRef}
                    openHostTools={openHostToolsModal}
                    openBackpackDrawer={roomActions.openBackpackDrawer}
                    toggleScreenShare={toggleScreenShare}
                    toggleObjectLightbox={showObjectLightbox}
                    toggleAddContentMenu={roomActions.toggleAddContentMenu}
                    onTransformButtonClick={roomActions.onContentTransformButtonClick}
                    onInfoButtonClick={hyperlinksV2 ? toggleInfoPanel : roomActions.onInfoButtonClick}
                    mediaCaptureButtonsProps={{
                      webcamStatus: rtcState.webcamStatus,
                      hideWebCam: isPublicLobby,
                      onJoinAudio: joinVoice,
                      onToggleMic: toggleMicrophone,
                      onToggleWebcam: toggleWebcam,
                      onOpenMediaSettingsMenu: roomActions.openMediaSettingsModal,
                    }}
                  />
                )}
              </div>
            </TransitionComponentHidden>

            {/* Bottom right: chat, settings container + spatial watermark */}
            <TransitionComponentHidden
              ref={bottomRightRef}
              in={
                is2dUiVisible &&
                !isAuthlessModalOpen &&
                !isCustomizingAvatar &&
                !showFirstTutorial &&
                uiMode !== UiModes.Camera &&
                !isBackpackDrawerOpen &&
                !isShopDrawerOpen
              }
              // Do not unmount on exit, otherwise this will disconnect and reconnect chat
              unmountOnExit={false}
            >
              <div
                ref={bottomRightRef}
                className={clsx(classes.bottomRightContainer, "scaleIn", currentStream && classes.displayAboveModals)}
              >
                {isModifiedCameraControllerEnabled && <CameraModeButtons />}
                {isChatEnabled && (
                  <div className={classes.chatContainer}>
                    {/* Chat panel */}
                    <Suspense fallback={null}>
                      <ChatPanel
                        isOpen={is2dUiVisible && !isCustomizingAvatar && isChatOpen}
                        onSelectUser={roomActions.setSelectedUserProfileId}
                      />
                    </Suspense>
                  </div>
                )}
                <YourProfileMenu
                  participant={localParticipant}
                  onEditAvatar={openEditAvatar}
                  onToggleWebcam={() => toggleWebcam(false)}
                  webcamStatus={rtcState.webcamStatus}
                />
              </div>
            </TransitionComponentHidden>

            <TransitionComponentHidden
              ref={watermarkRef}
              in={!watermarkHidden && (!is2dUiVisible || uiMode === UiModes.Camera)}
            >
              <div ref={watermarkRef}>
                <div className="scaleIn pointer-events-none absolute bottom-6 right-6 z-10 opacity-70">
                  <SpatialWordMark className="h-7 w-auto text-white drop-shadow-md" />
                </div>
              </div>
            </TransitionComponentHidden>
          </div>

          {perfStatisticsOpen && <PerfStatistics onClose={roomActions.closePerfStatistics} />}
        </div>

        <AvatarCustomizationPanel />
        {/* Add note and Search or URL inputs */}
        <FloatingContainer
          isOpen={composerType != null}
          refToIgnore={contentButtonsRef}
          onRequestClose={() => actions.setSpaceState({ composerType: null })}
        >
          <div>
            <InstanceCount />
            <Composer type={composerType} isGoogleConnected={isGoogleConnected} onSubmit={onComposerSubmit} />
          </div>
        </FloatingContainer>

        {/* Share panel */}
        <Drawer isOpen={isSharePanelOpen && !hideTopDock} closeHandler={roomActions.closeSharePanel}>
          <InstanceCount />
          <Share
            room={room}
            shareSetting={room.shareSetting}
            user={userProfile as any}
            userId={userProfile.userID}
            userIsAdmin={isAdmin}
            onEditShareSetting={roomActions.editShareSetting}
            onShowHostTools={openHostToolsModal}
            onShowDirectlyInvitedUsers={roomActions.openDirectlyInvitedUsersModal}
            onStartGoLive={displayGoLiveModal}
            onEndGoLive={displayEndGoLiveModal}
            isReadyToPublish={isReadyToPublish}
            onNotReadyPublish={roomActions.onNotReadyPublish}
          />
        </Drawer>

        <Drawer isOpen={showPairPanel} closeHandler={roomActions.closePairPanel} showCloseButton={false} fullHeight>
          <InstanceCount />
          <Pair focusPinInput={false} visible pairCompleteHandler={roomActions.closePairPanel} enableClose />
        </Drawer>

        <Modal
          darkOverlay
          modalBaseClass={modalClassesBase.base}
          isOpen={Boolean(currentStream)}
          onRequestClose={closeVideoLightboxModal}
        >
          <InstanceCount>
            <RoomVideoLightbox media={currentStream} handleClose={closeVideoLightboxModal} />
          </InstanceCount>
        </Modal>

        <Drawer
          isOpen={
            transformPanelState !== TransformPanelState.Closed && lightBoxTargetObjectID === 0 && !uploadTargetFrameId
          }
          showCloseButton={false}
          closeHandler={roomActions.closeTransformPanel}
          className={clsx("!w-[350px]", hyperlinksV2 && "rounded-l-none")}
          closeOnOverlayClick={false}
          overlay="none"
        >
          <InstanceCount />
          <Transform
            closePanel={roomActions.closeTransformPanel}
            selectedObjectId={selectedObjectId}
            setTransformPanelActive={roomActions.openTransformPanel}
            transformPanelState={transformPanelState}
          />
        </Drawer>

        <Drawer
          isOpen={
            hyperlinkPanelState !== AddContentHyperlinkState.Closed &&
            lightBoxTargetObjectID === 0 &&
            !uploadTargetFrameId &&
            Boolean(selectedObjectId)
          }
          showCloseButton={false}
          closeHandler={roomActions.close3DLightbox}
          className={clsx("!w-[350px]", hyperlinksV2 && "rounded-l-none")}
          closeOnOverlayClick={false}
          overlay="none"
        >
          <InstanceCount />
          {/* The key prop is used to mount a new instance of the InfoEditPanel when the selectedObjectId changes */}
          <InfoEditPanel
            key={selectedObjectId}
            selectedObjectId={selectedObjectId}
            close3DLightbox={roomActions.close3DLightbox}
          />
        </Drawer>

        {/* Env settings panel */}
        <Drawer isOpen={showEnvironmentSettingsModal} closeHandler={roomActions.closeChangeEnvironmentModal}>
          <InstanceCount />
          <EnvironmentSettings
            openEnvPicker={roomActions.openEnvironmentPickerModal}
            openUploadEnv={roomActions.openCreateCustomEnvModal}
            closePanel={roomActions.closeChangeEnvironmentModal}
            roomThumbnail={room.persistentThumbnailGetUrl}
          />
        </Drawer>

        {/* Backpack drawer */}
        <Drawer
          overlay="none"
          isOpen={isBackpackDrawerOpen}
          closeHandler={roomActions.closeBackpackDrawer}
          className={cn(
            classes.backpackDrawerBackground,
            classes.customScrollbar,
            "w-[41vw] min-w-[475px] max-w-3xl items-start overflow-y-scroll rounded-l-none shadow-none backdrop-blur"
          )}
          closeButtonClassName="text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)]"
        >
          <InstanceCount />
          <Backpack items={backpackItems} />
        </Drawer>

        {/* Shop drawer */}
        <Drawer
          overlay="none"
          position="left"
          isOpen={isShopDrawerOpen}
          closeHandler={roomActions.closeShopDrawer}
          className={cn(
            classes.shopDrawerBackground,
            classes.customScrollbar,
            "w-[41vw] min-w-[475px] max-w-3xl items-start overflow-y-scroll rounded-l-none shadow-none backdrop-blur"
          )}
          closeButtonClassName="text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)]"
        >
          <InstanceCount />
          <Shop items={shopItems} backpack={backpack} />
        </Drawer>

        <InRoomEnvironmentPicker
          isOpen={showEnvironmentPickerModal}
          isLoading={isInitialLoadingNftVerification}
          onSelect={(environment, variant) => {
            actions.setSpaceState({
              environmentToChangeTo: environment,
              environmentVariantToChangeTo: variant,
              isCreateCustomEnvModalOpen: environment.environment === VREnvironment.Abstract,
            })
          }}
          onRequestClose={roomActions.closeEnvironmentPickerModal}
          openEnvironmentSettings={roomActions.openChangeEnvironmentModal}
        />

        <ConfirmAutoLayoutModal autoLayoutFiles={autoLayoutFiles} onClose={roomActions.closeAutoLayoutModal} />

        <ConfirmModal
          isOpen={
            changingToNftEnvironment &&
            !isInitialLoadingNftVerification &&
            nftVerificationData &&
            !nftVerificationData.ownershipVerified
          }
          title="Collectible Environment"
          message="Sorry, the owner of this space does not own this NFT environment."
          confirmText="Okay"
          onConfirm={roomActions.closeNftEnvironmentNotOwnedModal}
          onDismiss={roomActions.closeNftEnvironmentNotOwnedModal}
        />

        <Modal darkOverlay isOpen={lightBoxTargetObjectID !== 0} onRequestClose={roomActions.closeObjectLightBox}>
          <InstanceCount>
            {/* The closing animation on the modal causes the ObjectLightBox component to render for a couple frames when lightBoxTargetObjectID is 0
             * The ObjectLightBox component expects lightBoxTargetObjectID not to be 0
             */}
            {lightBoxTargetObjectID !== 0 && <ObjectLightBox onClose={roomActions.closeObjectLightBox} />}
          </InstanceCount>
        </Modal>

        <RoomModalBase isOpen={showGoLiveModal} close={roomActions.closeGoLiveModal}>
          <GoLiveModal
            space={room}
            profilePicUrl={user.profilePicURL}
            onDismiss={roomActions.closeGoLiveModal}
            onConfirm={roomActions.confirmGoLiveModal}
          />
        </RoomModalBase>

        <RoomModalBase isOpen={showEndGoLiveModal} close={roomActions.closeEndGoLiveModal}>
          <EndGoLiveModal
            spaceName={room.name}
            onDismiss={roomActions.closeEndGoLiveModal}
            onConfirm={roomActions.confirmEndGoLiveModal}
          />
        </RoomModalBase>

        <EditSpaceInfoModal
          space={room}
          isOpen={isSpaceInfoModalOpen}
          close={closeSpaceInfoModal}
          dismissCopy={spaceInfoModalCopy.dismissCopy}
          title={spaceInfoModalCopy.title}
        />

        <RoomModalBase
          isOpen={roomModalType === RoomModalType.ShareToSocials}
          close={roomActions.closeRoomModal}
          darkOverlay={false}
        >
          <ShareToSocialsModal room={room} onDismiss={roomActions.closeRoomModal} />
        </RoomModalBase>

        <AudioGroupingToolsModal
          participants={participants}
          isOpen={showAudioGroupingToolsModal}
          onRequestClose={roomActions.closeAudioGroupingToolsModal}
        />

        <RoomModalBase isOpen={showMediaSettingsModal} close={roomActions.closeMediaSettingsModal}>
          <MediaAndRoomSettingsModal
            close={roomActions.closeMediaSettingsModal}
            canShowRoomSettings={!isReadOnlyActor}
            enableRTCOptions={enableRTCOptions}
          />
        </RoomModalBase>

        <CommunityGuidelinesModal
          isOpen={roomModalType === RoomModalType.CommunityGuidelines}
          roomName={room.name}
          onRequestClose={roomActions.closeRoomModal}
        />

        <RoomModalBase
          isOpen={openModal?.type === Modals.HostTools}
          close={closeHostToolsModal}
          modalBodyClassName={classes.hostToolsModalBody}
        >
          <HostToolsModal
            requestDismiss={closeHostToolsModal}
            showManageHostsModal={roomActions.openManageHostsModal}
            showTokenGateAccessSettings={roomActions.openTokenGateAccessModal}
          />
        </RoomModalBase>

        <RoomModalBase
          isOpen={openModal?.type === Modals.CameraControls}
          close={() => actions.closeModal(Modals.CameraControls)}
          modalBodyClassName={classes.cameraModeModalBody}
          showCloseButton
        >
          <FilmingModeModal />
        </RoomModalBase>

        <CreateCustomEnvModal
          isOpen={isCreateCustomEnvModalOpen}
          onUploadFiles={onUploadFiles}
          onRequestClose={() => {
            actions.setSpaceState({
              isCreateCustomEnvModalOpen: false,
              showEnvironmentSettingsModal: true,
            })
          }}
          toggleAddContentMenu={roomActions.toggleAddContentMenu}
        />

        <ContentMenuModal
          isOpen={showAddContentMenu || Boolean(uploadTargetFrameId)}
          closeContentMenu={roomActions.closeAddContentModal}
          onCloseTutorial={closeMetamaskTutorial}
          onUploadFiles={onUploadFiles}
          uploadTargetFrameId={uploadTargetFrameId}
          setAutoLayoutFiles={roomActions.setAutoLayoutFiles}
          isCreateCustomEnvModalOpen={isCreateCustomEnvModalOpen}
          closeCustomEnvModal={roomActions.closeCreateCustomEnvModal}
          startSetCustomEnv={onSetCustomEnvironment}
          onAddNote={roomActions.onAddNoteClick}
          onCreatePortal={roomActions.onCreatePortalClick}
          onWebSearch={roomActions.onWebSearchClick}
        />

        <RoomModalBase
          isOpen={showManageHostsModal}
          close={roomActions.closeManageHostsModal}
          modalBodyClassName={classes.manageHostsModalBody}
        >
          <BackButton onClick={navigateBackManageHostsModal} className={classes.backButton} />
          <ManageAdmins participants={participants} participantMap={participantMap} />
        </RoomModalBase>

        <CreatePortalModal
          isOpen={showCreatePortalModal}
          onRequestClose={roomActions.closeCreatePortalModal}
          currentSpaceId={room.id}
          handleOpenSpacePicker={roomActions.openSpacePicker}
          handleOpenCreateHyperlinkPortal={roomActions.handleOpenCreateHyperlinkPortal}
        />

        <CreateHyperlinkPortal
          isOpen={showCreateHyperlinkPortal}
          onRequestClose={roomActions.closeCreateHyperlinkPortal}
          onClickBack={roomActions.onClickBackCreateHyperlinkPortal}
        />

        <RoomModalBase
          isOpen={showTokenGateAccessModal}
          close={roomActions.closeTokenGateAccessModal}
          preventCloseOnEsc
          preventCloseOnOverlayClick
        >
          <TokenGateAccessModal
            isOpen={showTokenGateAccessModal}
            navigateBack={navigateBackTokenGateAccessActions}
            onRequestClose={roomActions.closeTokenGateAccessModal}
            roomId={room.id}
          />
        </RoomModalBase>

        <RoomModalBase
          isOpen={showTokenGateWelcomeModal}
          close={roomActions.closeTokenGateWelcomeModal}
          showCloseButton
        >
          <TokenGateWelcomeModal roomName={room.name} tokenName={tokenGateConfig?.tokenName} />
        </RoomModalBase>

        <SpacesPickerModal
          title="Portal Destination"
          description="Where are you trying to go?"
          onSelect={roomActions.createPortal}
          spacesToFilter={[room.id]}
          modalProps={{ isOpen: isSpacePickerVisible, onRequestClose: roomActions.closeSpacePicker }}
        />

        <DirectlyInvitedUsersModal
          canRemoveInvitedUsers={canRemoveInvitedUsers}
          directlyInvitedGuests={room.directlyInvitedGuests}
          isOpen={showDirectlyInvitedUsersModal}
          onAddInvitedUsers={roomActions.inviteUsers}
          onClose={roomActions.closeDirectlyInvitedUsersModal}
          onRemoveUser={roomActions.removeInvitedUsers}
        />

        {!isAuthless && <UpdatedTermsModal openProfilePageOnAccept useInstanceCount />}

        <SetCustomEnvModal
          isOpen={isCustomEnvModalVisible}
          onRequestClose={onCloseSetCustomEnvModal}
          selectedObjectID={selectedObjectId}
          onSetEnvironment={handleSetCustomEnvModalOnSet}
        />
        <ReplaceCustomEnvModal
          isOpen={isReplaceCustomEnvModalOpen}
          onStartNewCustomEnv={onSetNewCustomEnv}
          onRequestClose={roomActions.onCloseReplaceCustomEnvModal}
          onClickBack={onClickBackReplaceCustomEnvModal}
          uploadContent={newCustomEnvironmentFile}
        />

        <ControlsModal isOpen={controlsModalOpen} onRequestClose={roomActions.closeControlsModal} />

        <ConfirmLeaveRoomModal
          isOpen={leaveRoomModalOpen}
          onClose={roomActions.closeLeaveRoomModal}
          onCancel={roomActions.closeLeaveRoomModal}
          onConfirm={confirmLeaveSpace}
          name={room.name}
        />

        <EnterPortalModal />

        <RoomModalBase
          isOpen={showUserProfileEditorModal}
          close={roomActions.closeUserProfileEditorModal}
          showCloseButton
          preventCloseOnEsc
          preventCloseOnOverlayClick
        >
          <UserProfileEditorModal
            onRequestClose={roomActions.closeUserProfileEditorModal}
            userID={user.id}
            username={user.userSocialProfile.username}
          />
        </RoomModalBase>

        <QuestCompleteModal />
        <UserProfileModal
          userId={selectedSocialProfileIdFromUnity || selectedUserProfileId}
          handleClose={roomActions.closeSocialProfileModal}
        />
      </div>
    </InstanceCountManager>
  )
})
