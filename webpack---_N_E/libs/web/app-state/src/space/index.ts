import { MotionValue } from "framer-motion"
import { Draft, produce, setAutoFreeze } from "immer"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { ParticipantProfile } from "@spatialsys/js/sapi/clients/sapi"
import { BackpackItem, ShopItem, SpaceTemplate } from "@spatialsys/js/sapi/types"
import { PlayerColors } from "@spatialsys/js/util/player-colors"
import { CameraRotationMode, SocialProfileState, VREnvironment } from "@spatialsys/unity/app-state"
import { ContentObject } from "@spatialsys/unity/bridge"
import type { RoomRTCManager } from "@spatialsys/web/rtc/room-rtc-manager"
import { RoomRTCMediaState, RtcState, RtcStateUpdate, getInitialRoomRtcState } from "@spatialsys/web/rtc/rtc-state"

import { ChatAction, ChatActionType, ChatActions, ChatState, chatReducer, initialChatState } from "./chat"
import {
  SpaceJoinContextAction,
  SpaceJoinContextActionType,
  SpaceJoinContextActions,
  SpaceJoinContextState,
  spaceJoinContextReducer,
} from "./join-context"
import { QuestsAction, QuestsActionType, QuestsActions, QuestsState, initialQuestsState, questsReducer } from "./quests"
import { RewardsActionType, RewardsActions } from "./rewards"

/**
 * Because in the {@link spaceReducer} we combine multiple state slices with mutation after a pass
 * through an initial reducer that uses `produce`, we need to disable auto-freezing, otherwise the
 * mutations thrown an error.
 */
setAutoFreeze(false)

export const enum AddContentHyperlinkState {
  Closed,
  Active,
}

export const enum ComposerType {
  Note = "Note",
  SearchOrURL = "SearchOrURL",
}

export enum TransformPanelState {
  Closed = 0,
  Active = 2,
}

// playerColor will be deprecated: see DEV-5541
// appearanceCustomization.profileColor determines playerColors
export type ParticipantData = Omit<ParticipantProfile, "appearanceCustomization" | "clientPlatform" | "playerColor"> & {
  active: boolean
  clientPlatforms: Set<string>
  isAuthless: boolean
  isMuted: boolean
  isTalking: boolean
  playerColors: PlayerColors
  roomActorNumbers: Set<number>
  socialProfile: SocialProfileState | null
}

/**
 * A participant that's used internally in rendering the participants list
 * It joins `ParticipantData` with the RTC object associated with that participant, if available
 */
export type ParticipantWithRTC = ParticipantData & {
  isLocalUser: boolean
  media: RoomRTCMediaState | null
}

export interface EnvironmentOption {
  artist?: string
  // TODO: (DEV-16902) cleanup/remove this interface to remove redundancy
  environment: VREnvironment
  iconPickCoord?: { x: number; y: number }
  id?: string
  images: string[]
  metadata?: SpaceTemplate
  name: string
  variantOrders?: number[]
}

export type SpaceState = {
  autoLayoutFiles: ContentObject[]
  chat: ChatState
  composerType: ComposerType | null
  controlsModalOpen: boolean
  environmentToChangeTo: EnvironmentOption | undefined
  environmentVariantToChangeTo: number
  /**
   * Show space info modal once if tags or description is empty before publishing or going live.
   */
  hasShownDeetsBeforePublish: boolean
  hasShownTokenGateWelcomeModal: boolean
  hyperlinkPanelState: AddContentHyperlinkState
  id: string | null
  is2dUiVisible: boolean
  isCreateAvatarFlow: { isOnboarding: boolean } | null
  isCreateCustomEnvModalOpen: boolean
  isCustomEnvModalVisible: boolean
  isEmoteTrayOpen: boolean
  isObjectInspectorVisible: boolean
  isReplaceCustomEnvModalInUploadContext: boolean
  isReplaceCustomEnvModalOpen: boolean
  isScreenRecording: boolean
  isSharePanelOpen: boolean
  isSpaceInfoModalOpen: boolean
  isSpacePickerVisible: boolean
  joinContext: SpaceJoinContextState
  leaveRoomModalOpen: boolean
  /**
   * A [MotionValue](https://www.framer.com/motion/motionvalue/) to avoid re-renderes since this
   * state changes at such a high frequency.
   **/
  micPeakAmplitude: MotionValue<number>
  newCustomEnvironmentFile: ContentObject[]
  perfStatisticsOpen: boolean
  previousCameraRotationMode: CameraRotationMode | null
  quests: QuestsState
  rtcManager: RoomRTCManager | null
  rtcState: RtcState
  selectedBackpackItem: BackpackItem | null
  selectedShopItem: ShopItem | null
  selectedUserProfileId: string | null
  shouldShowContentMenu: boolean
  showAudioGroupingToolsModal: boolean
  showCreateHyperlinkPortal: boolean
  showCreatePortalModal: boolean
  showDirectlyInvitedUsersModal: boolean
  showEditCustomEnvironmentBanner: boolean
  showEndGoLiveModal: boolean
  showEnvironmentPickerModal: boolean
  showEnvironmentSettingsModal: boolean
  showFirstTutorial: boolean
  showGoLiveModal: boolean
  showManageHostsModal: boolean
  showMediaSettingsModal: boolean
  showPairPanel: boolean
  showTokenGateAccessModal: boolean
  showTokenGateWelcomeModal: boolean
  showUserProfileEditorModal: boolean
  spaceInfoModalCopy: { dismissCopy?: string; title?: string }
  spaceInfoModalOnClose: (() => void) | undefined
  supportsUserMedia: boolean
  transformPanelState: TransformPanelState
  uiMode: UiModes
}

export const enum UiModes {
  Camera = "Camera",
  Default = "Default",
}

export type SpaceStateSeed = {
  joinContext: SpaceJoinContextState
  spaceId: string | null
}

export const createInitialSpaceState = (seed: SpaceStateSeed): SpaceState => {
  const micPeakAmplitude = new MotionValue<number>()
  micPeakAmplitude.set(0)
  return {
    id: seed.spaceId,
    chat: initialChatState,
    selectedBackpackItem: null,
    selectedShopItem: null,
    is2dUiVisible: true,
    isCreateAvatarFlow: null,
    isCustomEnvModalVisible: false,
    isEmoteTrayOpen: false,
    isObjectInspectorVisible: false,
    isScreenRecording: false,
    joinContext: seed.joinContext,
    quests: initialQuestsState,
    micPeakAmplitude,
    shouldShowContentMenu: false,
    uiMode: UiModes.Default,
    isSharePanelOpen: false,
    showEnvironmentSettingsModal: false,
    showEnvironmentPickerModal: false,
    showEditCustomEnvironmentBanner: false,
    showFirstTutorial: false,
    showAudioGroupingToolsModal: false,
    showManageHostsModal: false,
    showMediaSettingsModal: false,
    showTokenGateAccessModal: false,
    showPairPanel: false,
    transformPanelState: TransformPanelState.Closed,
    hyperlinkPanelState: AddContentHyperlinkState.Closed,
    controlsModalOpen: false,
    supportsUserMedia: false,
    leaveRoomModalOpen: false,
    perfStatisticsOpen: false,
    showCreatePortalModal: false,
    showDirectlyInvitedUsersModal: false,
    autoLayoutFiles: [],
    environmentToChangeTo: undefined,
    environmentVariantToChangeTo: 0,
    isReplaceCustomEnvModalOpen: false,
    isReplaceCustomEnvModalInUploadContext: false,
    newCustomEnvironmentFile: [],
    isSpacePickerVisible: false,
    showCreateHyperlinkPortal: false,
    showTokenGateWelcomeModal: false,
    hasShownTokenGateWelcomeModal: false,
    showUserProfileEditorModal: false,
    selectedUserProfileId: null,
    spaceInfoModalCopy: {},
    spaceInfoModalOnClose: undefined,
    composerType: null,
    hasShownDeetsBeforePublish: false,
    isSpaceInfoModalOpen: false,
    showEndGoLiveModal: false,
    showGoLiveModal: false,
    isCreateCustomEnvModalOpen: false,
    rtcState: getInitialRoomRtcState(),
    rtcManager: null,
    previousCameraRotationMode: null,
  }
}

enum SpaceMiscActionType {
  ResetSpaceState = "ResetSpaceState",
  Set2dUiVisibility = "Set2dUiVisibility",
  SetCameraRotationMode = "SetCameraRotationMode",
  SetIsCreateAvatarFlow = "SetIsCreateAvatarFlow",
  SetIsCustomEnvModalVisible = "SetIsCustomEnvModalVisible",
  SetRtcState = "SetRtcState",
  SetSelectedBackpackItem = "SetSelectedBackpackItem",
  SetSelectedShopItem = "SetSelectedShopItem",
  SetShouldShowContentMenu = "SetShouldShowContentMenu",
  SetSpaceId = "SetSpaceId",
  SetSpaceState = "SetSpaceState",
  SetUiMode = "SetUiMode",
  StartRecording = "StartRecording",
  StopRecording = "StopRecording",
  TakeScreenshot = "TakeScreenshot",
  Toggle2dUiVisibility = "Toggle2dUiVisibility",
  ToggleEmoteTray = "ToggleEmoteTray",
  ToggleObjectInspectorVisibility = "ToggleInspectorVisibility",
}

export type SpaceActionType =
  | ChatActionType
  | QuestsActionType
  | RewardsActionType
  | SpaceJoinContextActionType
  | SpaceMiscActionType

export const SpaceActionType = {
  ...ChatActionType,
  ...RewardsActionType,
  ...SpaceJoinContextActionType,
  ...QuestsActionType,
  ...SpaceMiscActionType,
}

export type SetIsCreateAvatarFlow = ActionT<SpaceMiscActionType.SetIsCreateAvatarFlow, { isOnboarding: boolean } | null>
export type SetShouldShowContentMenu = ActionT<SpaceMiscActionType.SetShouldShowContentMenu, boolean>
export type SetUiMode = ActionT<SpaceMiscActionType.SetUiMode, UiModes>
export type StartRecording = ActionT<SpaceMiscActionType.StartRecording>
export type StopRecording = ActionT<SpaceMiscActionType.StopRecording>
export type SetIsCustomEnvModalVisible = ActionT<SpaceMiscActionType.SetIsCustomEnvModalVisible, boolean>
export type Set2dUiVisibility = ActionT<SpaceMiscActionType.Set2dUiVisibility, boolean>
export type TakeScreenshot = ActionT<SpaceMiscActionType.TakeScreenshot>
export type Toggle2dUiVisibility = ActionT<SpaceMiscActionType.Toggle2dUiVisibility>
export type ToggleObjectInspectorVisibility = ActionT<SpaceMiscActionType.ToggleObjectInspectorVisibility>
export type ResetSpaceState = ActionT<SpaceMiscActionType.ResetSpaceState>
export type SetRtcState = ActionT<SpaceMiscActionType.SetRtcState, RtcStateUpdate>
type SpaceStateUpdate = Partial<SpaceState> | ((draft: Draft<SpaceState>) => void)
export type SetSpaceState = ActionT<SpaceMiscActionType.SetSpaceState, SpaceStateUpdate>
export type SetSelectedBackpackItem = ActionT<SpaceMiscActionType.SetSelectedBackpackItem, BackpackItem | null>
export type SetSelectedShopItem = ActionT<SpaceMiscActionType.SetSelectedShopItem, ShopItem | null>
export type SetSpaceId = ActionT<SpaceMiscActionType.SetSpaceId, string | null>
export type ToggleEmoteTray = ActionT<SpaceMiscActionType.ToggleEmoteTray>

export type SetCameraRotationMode = ActionT<
  SpaceMiscActionType.SetCameraRotationMode,
  { newState: CameraRotationMode; previousState: CameraRotationMode }
>

export const SpaceActions = {
  ...ChatActions,
  ...RewardsActions,
  ...SpaceJoinContextActions,
  ...QuestsActions,
  setIsCreateAvatarFlow: makeActionCreator<SetIsCreateAvatarFlow>(SpaceMiscActionType.SetIsCreateAvatarFlow),
  setShouldShowContentMenu: makeActionCreator<SetShouldShowContentMenu>(SpaceMiscActionType.SetShouldShowContentMenu),
  setUiMode: makeActionCreator<SetUiMode>(SpaceMiscActionType.SetUiMode),
  startRecording: makeActionCreator<StartRecording>(SpaceMiscActionType.StartRecording),
  stopRecording: makeActionCreator<StopRecording>(SpaceMiscActionType.StopRecording),
  setIsCustomEnvModalVisible: makeActionCreator<SetIsCustomEnvModalVisible>(
    SpaceMiscActionType.SetIsCustomEnvModalVisible
  ),
  set2dUiVisibility: makeActionCreator<Set2dUiVisibility>(SpaceMiscActionType.Set2dUiVisibility),
  takeScreenshot: makeActionCreator<TakeScreenshot>(SpaceMiscActionType.TakeScreenshot),
  toggle2dUiVisibility: makeActionCreator<Toggle2dUiVisibility>(SpaceMiscActionType.Toggle2dUiVisibility),
  toggleObjectInspectorVisibility: makeActionCreator<ToggleObjectInspectorVisibility>(
    SpaceMiscActionType.ToggleObjectInspectorVisibility
  ),
  resetSpaceState: makeActionCreator<ResetSpaceState>(SpaceMiscActionType.ResetSpaceState),
  setRtcState: makeActionCreator<SetRtcState>(SpaceMiscActionType.SetRtcState),
  setSelectedBackpackItem: makeActionCreator<SetSelectedBackpackItem>(SpaceMiscActionType.SetSelectedBackpackItem),
  setSelectedShopItem: makeActionCreator<SetSelectedShopItem>(SpaceMiscActionType.SetSelectedShopItem),
  setSpaceState: makeActionCreator<SetSpaceState>(SpaceMiscActionType.SetSpaceState),
  setSpaceId: makeActionCreator<SetSpaceId>(SpaceMiscActionType.SetSpaceId),
  toggleEmoteTray: makeActionCreator<ToggleEmoteTray>(SpaceMiscActionType.ToggleEmoteTray),
  setCameraRotationMode: makeActionCreator<SetCameraRotationMode>(SpaceMiscActionType.SetCameraRotationMode),
}

export type SpaceAction = GetActionType<typeof SpaceActions>

export function spaceReducer(state: SpaceState, action: SpaceAction): SpaceState {
  if (action.type === SpaceActionType.ResetSpaceState) {
    return createInitialSpaceState({ spaceId: state.id, joinContext: state.joinContext })
  }

  // FIXME: After the Room component is broken down into more specific components and state selction,
  // remove this update-by-mutation and the auto-freeze disabling line at the top of the file.
  // This is a temporary fix to avoid over-rendering the Room component on every AppState change.
  /* const chat = chatReducer(state.chat, action as ChatAction)
  const joinContext = spaceJoinContextReducer(state.joinContext, action as SpaceJoinContextAction)
  const quests = questsReducer(state.quests, action as QuestsAction)
  return {
    ...spaceMiscReducer(state, action),
    chat,
    joinContext,
    quests
  } */
  const newState = spaceMiscReducer(state, action)
  newState.chat = chatReducer(newState.chat, action as ChatAction)
  newState.joinContext = spaceJoinContextReducer(newState.joinContext, action as SpaceJoinContextAction)
  newState.quests = questsReducer(newState.quests, action as QuestsAction)
  return newState
}

function spaceMiscReducer(state: SpaceState, action: SpaceAction): SpaceState {
  switch (action.type) {
    case SpaceActionType.SetShouldShowContentMenu:
      return produce(state, (draft) => void (draft.shouldShowContentMenu = action.payload))
    case SpaceActionType.SetIsCreateAvatarFlow:
      return produce(state, (draft) => void (draft.isCreateAvatarFlow = action.payload))
    case SpaceActionType.SetUiMode:
      return produce(state, (draft) => void (draft.uiMode = action.payload))
    case SpaceActionType.SetIsCustomEnvModalVisible:
      return produce(state, (draft) => void (draft.isCustomEnvModalVisible = action.payload))
    case SpaceActionType.Set2dUiVisibility:
      return produce(state, (draft) => void (draft.is2dUiVisible = action.payload))
    case SpaceActionType.Toggle2dUiVisibility:
      return produce(state, (draft) => void (draft.is2dUiVisible = !state.is2dUiVisible))
    case SpaceActionType.ToggleObjectInspectorVisibility:
      return produce(state, (draft) => void (draft.isObjectInspectorVisible = !state.isObjectInspectorVisible))
    case SpaceActionType.SetRtcState:
      return {
        ...state,
        rtcState: produce(state.rtcState, action.payload),
      }
    case SpaceActionType.StartRecording:
      return produce(state, (draft) => void (draft.isScreenRecording = true))
    case SpaceActionType.StopRecording:
      return produce(state, (draft) => void (draft.isScreenRecording = false))
    case SpaceActionType.SetSpaceState:
      if (typeof action.payload === "function") {
        return produce(state, action.payload)
      }
      return { ...state, ...action.payload }
    case SpaceActionType.SetSpaceId:
      return produce(state, (draft) => void (draft.id = action.payload))
    case SpaceActionType.ToggleEmoteTray:
      return produce(state, (draft) => void (draft.isEmoteTrayOpen = !draft.isEmoteTrayOpen))
    case SpaceActionType.SetCameraRotationMode:
      return {
        ...state,
        previousCameraRotationMode: action.payload.previousState,
      }
    case SpaceActionType.SetSelectedBackpackItem:
      return {
        ...state,
        selectedBackpackItem: action.payload,
      }
    case SpaceActionType.SetSelectedShopItem:
      return {
        ...state,
        selectedShopItem: action.payload,
      }
    default:
      return state
  }
}
