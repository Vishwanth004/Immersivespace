import { QueryClient } from "@tanstack/react-query"
import { produce } from "immer"
import type { FixedTask } from "typed-redux-saga/macro"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { IntegrationsResponse, SapiClient, UserData } from "@spatialsys/js/sapi/clients/sapi"
import { SapiSpaceClient } from "@spatialsys/js/sapi/clients/spaces"
import { AvatarSdkDataOnboarding } from "@spatialsys/js/sapi/types"
import { ReactAlertMessage, UnityMessages } from "@spatialsys/unity/bridge"
import type { ScreenShareSetting } from "@spatialsys/web/rtc/rtc-state"
import { sapiClient, sapiSpaceClient } from "@spatialsys/web/sapi"
import { Storage } from "@spatialsys/web/storage"

import { AuthState, InitialAuthStateArgs, createInitialAuthState } from "./auth/auth-state"
import { ModalsState, initialModalState } from "./modals"
import { AppRtcState, initialRtcState } from "./rtc"
import { SpaceState, SpaceStateSeed, createInitialSpaceState } from "./space"
import { TokenGateState, initialTokenGateState } from "./token-gate-state"
import { UnityClientState, createInitialUnityState } from "./unity-client"

export interface AppState {
  alertFromUnity: ReactAlertMessage | null
  auth: AuthState
  authlessUserData: AuthlessUserData | null
  /** Set when the user uploads a photo during the onboarding flow */
  avatarSdkDataOnboarding: AvatarSdkDataOnboarding
  banned: BannedState
  canvas: HTMLCanvasElement | null
  devicePixelRatio: number
  hasFatalException: boolean
  integrations: IntegrationsResponse | null
  /**
   * If true, will download and start Unity
   * Otherwise, we don't download Unity yet
   */
  isInMainlineSpatial: boolean
  isStarted: boolean
  mediaSettings: MediaSettings
  mobileBannerHiderCount: number
  modals: ModalsState
  openModalCount: number
  pushNotificationPermissionModalType: PushNotificationPermissionModalType
  reactQueryClient: QueryClient
  rtc: AppRtcState
  sapi: {
    client: SapiClient
    spacesClient: SapiSpaceClient
  }
  serviceWorkerRegistrationTask: FixedTask<ServiceWorkerRegistration | null> | null
  space: SpaceState
  spaceToCreate: UnityMessages.CreateAndJoinRoomMessage | null
  spatialUid: string
  tokenGate: TokenGateState
  unity: UnityClientState
  user: UserData | undefined
}

const createInitialMediaSettings = (): MediaSettings => {
  // TODO fix Storage.fetch to not return union with undefined when default provided
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const itemFromStorage = Storage.fetch(Storage.SPATIAL_MEDIA_SETTINGS, DefaultMediaSettingsState)!
  if (typeof itemFromStorage === "string") {
    try {
      const parsed = JSON.parse(itemFromStorage) as MediaSettings
      const keys = [
        "screenShareSettings",
        "selectedScreenShareSetting",
        "selectedVideoInput",
        "selectedAudioInput",
        "selectedPixelRatio",
      ]
      if (keys.every((key) => key in parsed)) {
        return parsed
      }
      return DefaultMediaSettingsState
    } catch (err) {
      return DefaultMediaSettingsState
    }
  }

  return itemFromStorage
}

interface InitialStateArgs {
  devicePixelRatio: number
  reactQueryClient: QueryClient
  spatialUid: string
}

export const createInitialState = (args: InitialAuthStateArgs & InitialStateArgs & SpaceStateSeed): AppState => {
  return {
    alertFromUnity: null,
    auth: createInitialAuthState(args),
    authlessUserData: null,
    avatarSdkDataOnboarding: null,
    banned: DefaultBannedState,
    canvas: null,
    devicePixelRatio: args.devicePixelRatio,
    hasFatalException: false,
    mobileBannerHiderCount: 0,
    integrations: null,
    isInMainlineSpatial: false,
    isStarted: false,
    mediaSettings: createInitialMediaSettings(),
    modals: initialModalState,
    openModalCount: 0,
    reactQueryClient: args.reactQueryClient,
    pushNotificationPermissionModalType: PushNotificationPermissionModalType.None,
    rtc: initialRtcState,
    sapi: {
      client: sapiClient,
      spacesClient: sapiSpaceClient,
    },
    spaceToCreate: null,
    tokenGate: initialTokenGateState,
    space: createInitialSpaceState(args),
    spatialUid: args.spatialUid,
    unity: createInitialUnityState(),
    user: undefined,
    serviceWorkerRegistrationTask: null,
  }
}

export type AuthlessUserData = {
  avatar: string
  /**
   * If is null, the user has not confirmed the authless data.
   * If is a string, it should indicate how the user confirmed the authless data.
   */
  confirmationStatus: string | null
  name: string
}

export interface BannedState {
  bannedUntilUnixMs: number
  isBanned: boolean
}

export const DefaultBannedState: BannedState = {
  isBanned: false,
  bannedUntilUnixMs: 0,
}

export interface MediaSettings {
  screenShareSettings: ScreenShareSetting[]
  selectedAudioInput: Omit<MediaDeviceInfo, "groupId" | "toJSON"> | null
  selectedPixelRatio: number
  selectedScreenShareSetting: ScreenShareSetting
  selectedVideoInput: Omit<MediaDeviceInfo, "groupId" | "toJSON"> | null
}

// Depending on which action that was performed to trigger notification permission, the modal will display a different subheading to the user
export enum PushNotificationPermissionModalType {
  None,
  Default,
  FollowUser,
  HostEvent,
  LoveSpace,
  RevisitSpace,
  ViewProfile,
}

export const DefaultScreenShareSetting: ScreenShareSetting = {
  maxWidth: 1280,
  maxHeight: 720,
  maxFrameRate: 30,
}

export const DefaultMediaSettingsState: MediaSettings = {
  screenShareSettings: [],
  selectedScreenShareSetting: DefaultScreenShareSetting,
  selectedVideoInput: null,
  selectedAudioInput: null,
  selectedPixelRatio: 1, // -1: auto adjust, 1: 1x, 0.5: 0.5x.
}

export enum AppActionType {
  // Push notification permission actions
  AcceptPushNotificationPermission = "AcceptPushNotificationPermission",
  ClearSpaceToCreate = "ClearSpaceToCreate",
  CreateUnityInstance = "CreateUnityInstance",
  DecrementMobileBannerHiderCount = "DecrementMobileBannerHiderCount",
  DismissPushNotificationPermission = "DismissPushNotificationPermission",
  FocusUnity = "FocusUnity",
  // Increment/decrement actions
  IncrementMobileBannerHiderCount = "IncrementMobileBannerHiderCount",
  PatchAuthlessUserData = "PatchAuthlessUserData",
  RequestPushNotificationPermission = "RequestPushNotificationPermission",
  // Set state actions
  SetAlertFromUnity = "SetAlertFromUnity",
  SetAuthlessUserData = "SetAuthlessUserData",
  SetAvatarSdkDataOnboarding = "SetAvatarSdkDataOnboarding",
  SetBanned = "SetBanned",
  SetDevicePixelRatio = "SetDevicePixelRatio",
  SetHasFatalException = "SetHasFatalException",
  SetIntegrations = "SetIntegrations",
  SetIsInMainlineSpatial = "SetIsInMainlineSpatial",
  SetIsStarted = "SetIsStarted",
  SetMediaSettings = "SetMediaSettings",
  SetOpenModalCount = "SetOpenModalCount",
  SetPushNotificationPermissionModalType = "SetPushNotificationPermissionModalType",
  SetServiceWorkerRegistrationTask = "SetServiceWorkerRegistrationTask",
  SetSpaceToCreate = "SetSpaceToCreate",
  SetUser = "SetUser",
}

export type CreateUnityInstance = ActionT<AppActionType.CreateUnityInstance, HTMLCanvasElement>
export type FocusUnity = ActionT<AppActionType.FocusUnity>
export type AcceptPushNotificationPermission = ActionT<AppActionType.AcceptPushNotificationPermission>
export type DismissPushNotificationPermission = ActionT<AppActionType.DismissPushNotificationPermission>
export type RequestPushNotificationPermission = ActionT<
  AppActionType.RequestPushNotificationPermission,
  PushNotificationPermissionModalType
>
export type IncrementMobileBannerHiderCount = ActionT<AppActionType.IncrementMobileBannerHiderCount>
export type DecrementMobileBannerHiderCount = ActionT<AppActionType.DecrementMobileBannerHiderCount>
export type SetAlertFromUnity = ActionT<AppActionType.SetAlertFromUnity, ReactAlertMessage | null>
export type SetAuthlessUserData = ActionT<AppActionType.SetAuthlessUserData, AuthlessUserData>
export type PatchAuthlessUserData = ActionT<AppActionType.PatchAuthlessUserData, Partial<AuthlessUserData>>
export type SetAvatarSdkDataOnboarding = ActionT<AppActionType.SetAvatarSdkDataOnboarding, AvatarSdkDataOnboarding>
export type SetBanned = ActionT<AppActionType.SetBanned, BannedState>
export type SetDevicePixelRatio = ActionT<AppActionType.SetDevicePixelRatio, number>
export type SetIntegrations = ActionT<AppActionType.SetIntegrations, IntegrationsResponse>

export type SetIsInMainlineSpatial = ActionT<AppActionType.SetIsInMainlineSpatial, boolean>
export type SetIsStarted = ActionT<AppActionType.SetIsStarted, boolean>
export type SetHasFatalException = ActionT<AppActionType.SetHasFatalException, boolean>
export type SetMediaSettings = ActionT<AppActionType.SetMediaSettings, Partial<MediaSettings>>
export type SetOpenModalCount = ActionT<AppActionType.SetOpenModalCount, number>
export type SetPushNotificationPermissionModalType = ActionT<
  AppActionType.SetPushNotificationPermissionModalType,
  PushNotificationPermissionModalType
>
export type SetServiceWorkerRegistrationTask = ActionT<
  AppActionType.SetServiceWorkerRegistrationTask,
  FixedTask<ServiceWorkerRegistration | null>
>
export type ClearSpaceToCreate = ActionT<AppActionType.ClearSpaceToCreate>
export type SetSpaceToCreate = ActionT<AppActionType.SetSpaceToCreate, UnityMessages.CreateAndJoinRoomMessage>
export type SetUser = ActionT<AppActionType.SetUser, UserData | undefined>

export const AppActions = {
  createUnityInstance: makeActionCreator<CreateUnityInstance>(AppActionType.CreateUnityInstance),
  focusUnity: makeActionCreator<FocusUnity>(AppActionType.FocusUnity),
  acceptPushNotificationPermission: makeActionCreator<AcceptPushNotificationPermission>(
    AppActionType.AcceptPushNotificationPermission
  ),
  dismissPushNotificationPermission: makeActionCreator<DismissPushNotificationPermission>(
    AppActionType.DismissPushNotificationPermission
  ),
  requestPushNotificationPermission: makeActionCreator<RequestPushNotificationPermission>(
    AppActionType.RequestPushNotificationPermission
  ),
  incrementMobileBannerHiderCount: makeActionCreator<IncrementMobileBannerHiderCount>(
    AppActionType.IncrementMobileBannerHiderCount
  ),
  decrementMobileBannerHiderCount: makeActionCreator<DecrementMobileBannerHiderCount>(
    AppActionType.DecrementMobileBannerHiderCount
  ),
  setAlertFromUnity: makeActionCreator<SetAlertFromUnity>(AppActionType.SetAlertFromUnity),
  setAuthlessUserData: makeActionCreator<SetAuthlessUserData>(AppActionType.SetAuthlessUserData),
  patchAuthlessUserData: makeActionCreator<PatchAuthlessUserData>(AppActionType.PatchAuthlessUserData),
  setAvatarSdkDataOnboarding: makeActionCreator<SetAvatarSdkDataOnboarding>(AppActionType.SetAvatarSdkDataOnboarding),
  setBanned: makeActionCreator<SetBanned>(AppActionType.SetBanned),
  setDevicePixelRatio: makeActionCreator<SetDevicePixelRatio>(AppActionType.SetDevicePixelRatio),
  setIntegrations: makeActionCreator<SetIntegrations>(AppActionType.SetIntegrations),
  setIsInMainlineSpatial: makeActionCreator<SetIsInMainlineSpatial>(AppActionType.SetIsInMainlineSpatial),
  setIsStarted: makeActionCreator<SetIsStarted>(AppActionType.SetIsStarted),
  setHasFatalException: makeActionCreator<SetHasFatalException>(AppActionType.SetHasFatalException),
  setMediaSettings: makeActionCreator<SetMediaSettings>(AppActionType.SetMediaSettings),
  setOpenModalCount: makeActionCreator<SetOpenModalCount>(AppActionType.SetOpenModalCount),
  setPushNotificationPermissionModalType: makeActionCreator<SetPushNotificationPermissionModalType>(
    AppActionType.SetPushNotificationPermissionModalType
  ),
  setServiceWorkerRegistrationTask: makeActionCreator<SetServiceWorkerRegistrationTask>(
    AppActionType.SetServiceWorkerRegistrationTask
  ),
  clearSpaceToCreate: makeActionCreator<ClearSpaceToCreate>(AppActionType.ClearSpaceToCreate),
  setSpaceToCreate: makeActionCreator<SetSpaceToCreate>(AppActionType.SetSpaceToCreate),

  setUser: makeActionCreator<SetUser>(AppActionType.SetUser),
} as const

export type AppAction = GetActionType<typeof AppActions>

export const appStateReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.AcceptPushNotificationPermission:
    case AppActionType.DismissPushNotificationPermission:
      return produce(
        state,
        (draft) => void (draft.pushNotificationPermissionModalType = PushNotificationPermissionModalType.None)
      )
    case AppActionType.IncrementMobileBannerHiderCount:
      return produce(state, (draft) => void (draft.mobileBannerHiderCount = state.mobileBannerHiderCount + 1))
    case AppActionType.DecrementMobileBannerHiderCount:
      return produce(state, (draft) => void (draft.mobileBannerHiderCount = state.mobileBannerHiderCount - 1))
    case AppActionType.SetAlertFromUnity:
      return produce(state, (draft) => void (draft.alertFromUnity = action.payload))
    case AppActionType.SetAuthlessUserData:
      return produce(state, (draft) => void (draft.authlessUserData = action.payload))
    case AppActionType.PatchAuthlessUserData:
      return produce(state, (draft) => {
        if (state.authlessUserData) {
          draft.authlessUserData = {
            ...state.authlessUserData,
            ...action.payload,
          }
        }
      })
    case AppActionType.SetAvatarSdkDataOnboarding:
      return produce(state, (draft) => void (draft.avatarSdkDataOnboarding = action.payload))
    case AppActionType.SetBanned:
      return produce(state, (draft) => void (draft.banned = action.payload))
    case AppActionType.SetOpenModalCount:
      return produce(state, (draft) => void (draft.openModalCount = action.payload))
    case AppActionType.SetPushNotificationPermissionModalType:
      return produce(state, (draft) => void (draft.pushNotificationPermissionModalType = action.payload))
    case AppActionType.SetServiceWorkerRegistrationTask:
      return produce(state, (draft) => void (draft.serviceWorkerRegistrationTask = action.payload))
    case AppActionType.ClearSpaceToCreate:
      return produce(state, (draft) => void (draft.spaceToCreate = null))
    case AppActionType.SetSpaceToCreate:
      return produce(state, (draft) => void (draft.spaceToCreate = action.payload))
    case AppActionType.SetDevicePixelRatio:
      return produce(state, (draft) => void (draft.devicePixelRatio = action.payload))
    case AppActionType.SetIsInMainlineSpatial:
      return produce(state, (draft) => void (draft.isInMainlineSpatial = action.payload))
    case AppActionType.SetIsStarted:
      return produce(state, (draft) => void (draft.isStarted = action.payload))
    case AppActionType.SetHasFatalException:
      return produce(state, (draft) => void (draft.hasFatalException = action.payload))
    case AppActionType.SetUser:
      return produce(state, (draft) => void (draft.user = action.payload))
    case AppActionType.SetMediaSettings:
      return produce(state, (draft) => {
        draft.mediaSettings = {
          ...state.mediaSettings,
          ...action.payload,
        }
      })
    case AppActionType.SetIntegrations:
      return produce(state, (draft) => void (draft.integrations = action.payload))
    case AppActionType.CreateUnityInstance:
      return {
        ...state,
        canvas: action.payload,
      }
    default:
      return state
  }
}
