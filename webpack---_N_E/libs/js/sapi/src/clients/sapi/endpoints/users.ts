import { AxiosInstance } from "axios"

import { SpatialLogger } from "@spatialsys/js/logger"
import { UserAvatarStyle, VREnvironment } from "@spatialsys/unity/app-state"

import { ITreatments, convertTreatmentsFromSapi } from "../../../helpers"
import {
  AvatarData,
  BlockchainIdentifier,
  ContractType,
  EmotePayload,
  FeatureFlags,
  LiveswitchConfig,
  PatchSocialProfileDataRequest,
  ProfileUnlockable,
  SetRecentEmotesRequest,
  SocialProfile,
  TreatmentsRetool,
  UserPermissions,
  VerifyNFTResponse,
} from "../../../types"
import { AccountCompletionStatus } from "./rooms"

/**
 * The user data model that is used within the React state globally (i.e. the return type of `getMe`)
 * This is not a completely accurate or complete type (it's missing some fields)
 *
 * This is a modification of the `response.userData` when calling /me from SAPI, adding in some properties from `userConfig` like `treatments` and `mediaSettings`
 */
export interface UserData {
  acceptedEarlyAccessTerms?: string
  acceptedPrivacyPolicy?: string
  acceptedSept2022PrivacyPolicy?: string
  acceptedSept2022StandardTerms?: string
  acceptedStandardTerms?: string
  accountCompletionStatus: AccountCompletionStatus
  acknowledgedInAppNotificationKeys?: string[]
  appearanceCustomization: AppearanceCustomizationState
  avatarData?: AvatarData
  disableWebControlsTutorial: boolean
  displayName: string
  email: string
  featureFlags: FeatureFlags
  id: string
  keybinds: Record<string, Keybind>
  liveswitchConfig: LiveswitchConfig
  loginType: LoginType
  mediaSettings?: any
  myOrganization: OrganizationState & { subscription?: SAPIUserSubscription }
  notificationsEnabled: boolean
  organizations: string[]
  permissions: UserPermissions[]
  pictureURL?: string
  profilePicURL: string
  publicAddress?: string
  raw: UserProfileSAPIResponse
  recentEmotes: EmotePayload[]
  showEarlyAccessTerms: boolean
  subscription?: SAPIUserSubscription
  treatments: TreatmentsRetool
  treatmentsParsed: ITreatments
  unlockables?: Record<string, ProfileUnlockable>
  userSocialProfile: SocialProfile
}

export type LoginType = "EthereumAuth" | "OAuth"

export interface OrganizationState {
  id: string
  name: string
}

export interface AppearanceCustomizationState {
  profileColor: string
}

export interface SAPIUserSubscription {
  isActive: boolean
  subscriptionSource: SAPISubscriptionSource
  subscriptionType: SAPISubscriptionType
}

export enum SAPISubscriptionType {
  Enterprise = "ENTERPRISE",
  PersonalPro = "PERSONAL_PRO",
  /** For when Biz team wants to temporarily give a user pro features */
  ProOverride = "PRO_OVERRIDE",
  /** Rebranded to TEAM but keep backwards compatibility */
  TeamPro = "PRO",
}

export enum SAPISubscriptionSource {
  APPLE = "APPLE",
  OCULUS = "OCULUS",
  STRIPE = "STRIPE",
}

interface UserConfigResponse {
  [key: string]: any
}

interface UserDataResponse {
  [key: string]: any
  keybinds: Record<string, Keybind>
  subscription?: SAPIUserSubscription
  treatments: any
}

/**
 * The user profile that is returned from SAPI
 */
export interface UserProfileSAPIResponse {
  unlockables?: Record<string, ProfileUnlockable>
  userConfig: UserConfigResponse
  userData: UserDataResponse
  userSocialProfile: {
    username: SocialProfile
  }
}

export interface SAPISubscriptionData {
  isActive: boolean
  subscriptionSource: "APPLE" | "OCULUS" | "STRIPE"
  subscriptionType: "ENTERPRISE" | "PERSONAL_PRO" | "PRO_OVERRIDE" | "TEAM_PRO"
}

/**
 * From SAPI: user_controller.go:L547. Note that the name of these fields does not match 1:1 with the properties returned from /me
 */
export interface PatchUserRequest {
  acceptPrivacyPolicy?: boolean
  acceptTerms?: boolean
  acceptUpdatedPrivacyPolicy?: boolean
  acceptUpdatedTerms?: boolean
  accountCompletionStatus?: AccountCompletionStatus
  activeAvatarStyle?: UserAvatarStyle
  avatarBody?: string
  avatarID?: string
  avatarReadyPlayerMeUrl?: string
  avatarShirtColorOverride?: string
  avatarSkinColorOverride?: string
  avatarUserID?: string
  disableWebControlsTutorial?: boolean
  displayName?: string
  featureSet?: string
  oculusID?: string
  optInToMarketing?: boolean
  password?: string
  termsType?: string
}

export interface VerifyNFTOwnedByUserRequest {
  chain?: BlockchainIdentifier
  contractAddress?: string
  contractType?: ContractType
  environment: VREnvironment
  tokenID?: string
  userID?: string
}

export interface AcknowledgeNotificationRequest {
  notification: string
  userId: string
}

export const enum NotificationKeys {
  finishedMetamaskTutorial = "finishedMetamaskTutorial",
  finishedSettingsTutorial = "finishedSettingsTutorial",
  hasDismissedCallToCreateSpace = "hasDismissedCallToCreateSpace",
  hasDismissedCustomizeAvatarButtonTooltip = "hasDismissedCustomizeAvatarButtonTooltip",
  hasDismissedHide2dUiToast = "hasDismissedHide2dUiToast",
  hasDismissedRpmAvatarsAnnouncement = "hasDismissedRpmAvatarsAnnouncement",
  hasUsedCameraMode = "hasUsedCameraMode",
  needsMetamaskTutorial = "webNeedsMetamaskTutorial",
}

export const getShouldShowMetamaskTutorial = (notifs: string[]): boolean => {
  return (
    notifs.includes(NotificationKeys.needsMetamaskTutorial) &&
    !notifs.includes(NotificationKeys.finishedMetamaskTutorial)
  )
}

export const getShouldShowSettingsTutorial = (notifs: string[]): boolean => {
  return (
    notifs.includes(NotificationKeys.finishedMetamaskTutorial) &&
    !notifs.includes(NotificationKeys.finishedSettingsTutorial)
  )
}

export const getShouldShowHide2dUiToast = (notifs: string[]): boolean => {
  return !notifs.includes(NotificationKeys.hasDismissedHide2dUiToast)
}

/**
 * This function best belongs in `SpatialPackages`, however `UserData` is defined in the webapp code.
 */
export const getSubscriptionFromUser = (user: UserData): SAPIUserSubscription | undefined => {
  return user.subscription?.isActive ||
    (!user.myOrganization?.subscription?.isActive && user.myOrganization?.subscription?.subscriptionType)
    ? user.subscription
    : user.myOrganization?.subscription
}

export function createUsersEndpoints(client: AxiosInstance) {
  return {
    /**
     * Fetch the user's profile
     * Parses out the `userData` field of the SAPI response object, adding some additional fields
     * like `treatments,` `mediaSettings`, and `photonConfigs`
     */
    getMe: async function (): Promise<UserData> {
      // We add a query parameter to skip fetching the avatar token from SAPI. Splitting up the requests
      // results in better performance
      // TODO(DEV-10801): When SAPI is updated to never return the token, we can remove this query param entirely
      const response = await client.get<UserProfileSAPIResponse>("/users/me", {
        params: { skipAvatarToken: true },
      })
      const user: UserDataResponse = { ...response.data.userData, raw: response.data }
      user.userSocialProfile = response.data.userSocialProfile
      const userConfig: UserConfigResponse = response.data.userConfig
      SpatialLogger.properties["uid"] = user.id
      SpatialLogger.properties["email"] = user.email
      user.featureFlags = userConfig.featureFlags
      user.treatments = userConfig.treatments
      user.keybinds = userConfig.keybinds
      for (const hotkey of Object.keys(user.keybinds)) {
        if (hotkey.startsWith("Digit")) {
          // These are the 1-5 keybindings that are used for emotes.
          // They should work for with shift+1-5 as well.
          // FIXME: Set this on the back-end and migrate existing data
          user.keybinds[`shift+${hotkey}`] = user.keybinds[hotkey]
        }
      }
      user.treatmentsParsed = convertTreatmentsFromSapi(user.treatments)
      user.mediaSettings = userConfig.liveswitch.mediaSettings || []
      user.liveswitchConfig = userConfig.liveswitch
      user.photonConfigs = userConfig.photonConnections || []
      user.userSocialProfile = response.data.userSocialProfile
      user.unlockables = response.data.unlockables
      return user as UserData
    },
    /**
     * Patch the user profile
     */
    patchMe: async function (user: PatchUserRequest): Promise<any> {
      const response = await client.patch<any>(`/users/me/`, user)
      return response.data
    },
    /**
     * Delete account
     */
    deleteMe: async function (): Promise<void> {
      const response = await client.delete<void>(`/users/me/`)
      return response.data
    },
    verifyNFTOwnedByUser: async function (req: VerifyNFTOwnedByUserRequest): Promise<VerifyNFTResponse> {
      const response = await client.post<VerifyNFTResponse>(`/nft/verify`, req)
      return response.data
    },
    acknowledgeNotification: async function (req: AcknowledgeNotificationRequest): Promise<any> {
      const response = await client.post<any>(`/users/${req.userId}/acknowledgeNotification`, {
        notificationKey: req.notification,
      })
      return response.data
    },
    updateCode: async function (code: string): Promise<any> {
      const response = await client.patch<any>(`/users/code/${code}`, {})
      return response.data
    },
    patchSocialProfile: async function ({ userID, profileData }: PatchSocialProfileDataRequest) {
      const response = await client.patch<void>(`/users/${userID}`, profileData)
      return response.data
    },
    updateRecentEmotes: async function ({ userId, recentEmotes }: SetRecentEmotesRequest): Promise<void> {
      const response = await client.post<void>(`/users/${userId}/recentEmotes`, recentEmotes)
      return response.data
    },
    updateKeybindings: async function ({ userId, keybinds }: SetKeybindsRequest): Promise<void> {
      const response = await client.post<void>(`/users/${userId}/keybinds`, { keybinds })
      return response.data
    },
  }
}

export type UserEndpoint = ReturnType<typeof createUsersEndpoints>

/**
 * We currently only use custom keybinds for emotes, but this is a generic type that can be used for other actions
 * To add additional types of keybind actions and their associated payloads, add them to the KeybindActionsType enum
 * and add a new type to the KeybindAction as a union type
 */
export enum KeybindActionsType {
  Emote = "Emote",
}

type KeybindAction = { payload: EmotePayload; type: KeybindActionsType.Emote }

export type Keybind = {
  action: KeybindAction
}

export interface SetKeybindsRequest {
  keybinds: Record<string, Keybind>
  userId: string
}
