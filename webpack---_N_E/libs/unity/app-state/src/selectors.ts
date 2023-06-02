import { isYouTubeUrl } from "@spatialsys/js/util/is-youtube-url"

import { ActorMetaData, Participant, ParticipantGroup } from "."
import {
  AdministratorPermission,
  AppState,
  AvatarOverrideType,
  CameraMode,
  CustomEnvironmentSetupStep,
  GalleryInformationState,
  HyperlinkState,
  IntegrationType,
  LobbyType,
  LoginStatus,
  MicStatus,
  Platform,
  RTCConnectionStatus,
  SpatialAPI_Room_RoomCategories as RoomCategories,
  RoomData,
  RoomFeature,
  RoomPersistenceStatus,
  RoomSessionActor,
  RoomSessionState,
  RoomSessionStatus,
  RoomsMenuCategory,
  SAPIStatus,
  RoomData_ShareSetting as ShareSetting,
  SpatialDeviceModel,
  SpatialManipulationHandler_TwoHandedManipulation,
  UserProfile,
  UserSubscription_SubscriptionType,
  VREnvironment,
  VoiceLocationGroupState,
} from "./autogen/models"

const enum AppVersionChannel {
  Store = "store",
  EarlyAccess = "early-access",
}

export const isStoreBuild = (unityAppState: AppState): boolean =>
  unityAppState?.clientVersionChannel === AppVersionChannel.Store

export const isEarlyAccessClient = (unityAppState: AppState): boolean =>
  unityAppState.clientVersionChannel === AppVersionChannel.EarlyAccess

export const isLoggingIn = (unityAppState: AppState | null) => unityAppState?.loginStatus === LoginStatus.LoggingIn

export const isLoggedInOrLoggingIn = (unityAppState: AppState | null) =>
  unityAppState?.loginStatus === LoginStatus.LoggedIn || unityAppState?.loginStatus === LoginStatus.LoggingIn

export const getLobbyType = (unityAppState: AppState, roomId?: string): LobbyType => {
  const room = roomId ? unityAppState.rooms[roomId] : getCurrentRoom(unityAppState)
  return room?.lobbyType ?? LobbyType.None
}

export const isCurrentRoomMyLobby = (unityAppState: AppState): boolean => {
  const room = getCurrentRoom(unityAppState)
  switch (getLobbyType(unityAppState)) {
    case LobbyType.PrivateLobby:
      return room.ownerID == unityAppState.userProfile.userID
    case LobbyType.PublicLobby:
      return true
    case LobbyType.None:
      return false
    default:
      return false
  }
}

/**
 * Uses roomSession.roomID to get the current room from unityAppState.rooms
 */
export const getCurrentRoom = (unityAppState: AppState): RoomData => {
  return unityAppState.rooms[unityAppState.roomSession.roomID]
}

export const getCurrentRoomId = (unityAppState: AppState): string | undefined => {
  return unityAppState.roomSession?.roomID
}

export const getSpatialPark = (unityAppState: AppState): RoomData | undefined => {
  return Object.values(unityAppState.rooms).find((room) => room.lobbyType === LobbyType.PublicLobby)
}

export const getCurrentRoomName = (
  unityAppState: AppState,
  roomID: string | undefined = undefined
): string | undefined => {
  const _roomID = roomID ?? unityAppState.roomSession.roomID
  const room = unityAppState.rooms[_roomID]
  return room?.name
}

export const areOtherUsersInRoom = (
  unityAppState: AppState,
  userID: string,
  roomID: string | undefined = undefined
): boolean => {
  const room = unityAppState.rooms[roomID ?? unityAppState.roomSession.roomID]
  return Object.keys(room.participants).filter((participantID) => participantID !== userID).length > 0
}

const toRoomCategories = (value: RoomsMenuCategory) => {
  switch (value) {
    case RoomsMenuCategory.Explore:
      return RoomCategories.Explore
    case RoomsMenuCategory.Spaces:
      return RoomCategories.Personal
    case RoomsMenuCategory.Search:
      return RoomCategories.Search
    case RoomsMenuCategory.Team:
      return RoomCategories.Org
    default:
      return RoomCategories.None
  }
}

export const isInRoomCategory = (room: RoomData, category: RoomsMenuCategory): boolean => {
  const bitmask = toRoomCategories(category)
  return Boolean(room.roomCategories && room.roomCategories & bitmask)
}

export const isMicStatusError = (micStatus: MicStatus) =>
  micStatus !== MicStatus.On &&
  micStatus !== MicStatus.Off &&
  micStatus !== MicStatus.RequestingPermissions &&
  micStatus !== MicStatus.Muted &&
  micStatus !== MicStatus.Unknown

/*
  Possible Administrator Tools Configurations
  ===========================================

  isCurrentUserAdministrator: false
    Hide host settings in settings menu, but any restrictions made by other room hosts apply

  areAdministratorToolsEnabled: false, isCurrentUserAdministrator: true
    Show disabled host settings + upsell UI

  areAdministratorToolsEnabled: true, isCurrentUserAdministrator: true
    Show host settings + pro badge
  */

/// "Has the user bought the pro version?"
/// True if the room's owning organization has permission to use admin tools, as well as
/// potential cases where it might be overridden to true by the biz team
export const areAdministratorToolsEnabled = (roomSession: RoomSessionState): boolean =>
  roomSession.features.includes(RoomFeature.RoomAdminTools)

export const isCurrentUserAdministrator = (unityAppState: AppState, roomID?: string): boolean =>
  isUserAdministrator(unityAppState, unityAppState.userProfile.userID, roomID)

export const isCurrentUserRoomOwner = (unityAppState: AppState, roomID?: string): boolean =>
  isUserRoomOwner(unityAppState, unityAppState.userProfile.userID, roomID)

export const isUserRoomOwner = (unityAppState: AppState, userID: string, roomID?: string): boolean => {
  const room = unityAppState.rooms[roomID ?? unityAppState.roomSession.roomID]
  return userID === room?.ownerID
}

export const isUserAdministrator = (unityAppState: AppState, userID: string, roomID?: string): boolean => {
  const isRoomOwner = isUserRoomOwner(unityAppState, userID, roomID)
  const room = unityAppState.rooms[roomID ?? unityAppState.roomSession.roomID]
  const administrators = room ? room.administrators : unityAppState.roomSession.room.administrators
  const isRoomAdministrator = administrators.includes(userID)
  return isRoomOwner || isRoomAdministrator
}

export const isUserInRoom = (unityAppState: AppState, userID: string, roomID?: string): boolean => {
  const room = unityAppState.rooms[roomID ?? unityAppState.roomSession.roomID]
  const participants = room ? room.participants : unityAppState.roomSession.room.participants
  // Actors are the users connected to photon server, it is the source of truth of who is in the space
  // sometimes participants and actors are out of sync, therefore we additionally do a lookup in actors
  // TODO: DEV-22552
  return userID in participants || userID in unityAppState.roomSession.actorsLookup
}

export const getUserRoleCopy = (unityAppState: AppState, userID: string, roomID?: string): string | null => {
  if (isCurrentUser(unityAppState, userID)) return "(You)"
  if (isUserRoomOwner(unityAppState, userID, roomID)) return "(Creator)"
  if (isUserAdministrator(unityAppState, userID, roomID)) return "(Host)"
  return null
}

export const getBanErrorCopy = (
  unityAppState: AppState,
  userID: string | undefined,
  displayName: string | undefined
) => {
  if (!userID) return "User not found"
  if (isUserBannedFromSpace(unityAppState, userID)) return `${displayName} is already banned`
  if (isCurrentUser(unityAppState, userID)) return "Cannot ban yourself"
  if (isUserRoomOwner(unityAppState, userID))
    return `Cannot ban ${displayName} because they are the creator of this space`
  return null
}

export const getAddHostErrorCopy = (
  unityAppState: AppState,
  userID: string | undefined,
  displayName: string | undefined
) => {
  if (!userID) return "User not found"
  if (isUserAdministrator(unityAppState, userID)) return `${displayName} is already a host`
  return null
}

export const areHostToolsEnabled = (unityAppState: AppState): boolean => {
  return areAdministratorToolsEnabled(unityAppState.roomSession) && isCurrentUserAdministrator(unityAppState)
}

export const getSelectedSocialProfileId = (unityAppState: AppState): string | undefined =>
  unityAppState.roomSession.socialProfileMenu.menuVisible
    ? unityAppState.roomSession.socialProfileMenu.selectedUserID
    : undefined

export const isSelectedSocialProfileBlocked = (unityAppState: AppState): boolean =>
  isUserBlocked(unityAppState, unityAppState.roomSession.socialProfileMenu.selectedUserID)

export const isFollowingSelectedSocialProfile = (unityAppState: AppState): boolean =>
  unityAppState.userProfile.followings.includes(unityAppState.roomSession.socialProfileMenu.selectedUserID)

export const isSelectingOwnSocialProfile = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.socialProfileMenu.selectedUserID === unityAppState.userProfile.userID

// User-to-user block
export const isUserBlocked = (unityAppState: AppState, userID: string): boolean =>
  unityAppState.userProfile.blockedUsers.includes(userID)

// Space ban (user banned from a space by a host)
export const isUserBannedFromSpace = (unityAppState: AppState, userID: string): boolean =>
  userID in unityAppState.roomSession.moderation.bannedUsers

export const doesUserHaveTeam = (userProfile: UserProfile | undefined): boolean => {
  return Boolean(userProfile?.myOrganization?.id)
}

export const isCurrentUser = (unityAppState: AppState, userID: string): boolean =>
  unityAppState.userProfile.userID === userID

export const isUserPro = (userProfile: UserProfile | undefined): boolean => userProfile?.subscription.isActive ?? false

export const isPermissionRestricted = (roomSession: RoomSessionState, permission: AdministratorPermission): boolean =>
  roomSession.room.restrictedPermissions.includes(permission)

export const userTeleportHostToolAvailable = (userProfile: UserProfile): boolean =>
  Boolean(userProfile.config.treatments.userTeleportHostTool)

export const getUserCurrentAvatarBody = (unityAppState: AppState): string => {
  return unityAppState.roomSession.inSession &&
    unityAppState.roomSession.avatarOverride.type !== AvatarOverrideType.Disabled
    ? unityAppState.roomSession.avatarOverride.bodyURL
    : unityAppState.userProfile.avatar.body
}

export const isAddContentEnabled = (unityAppState: AppState): boolean => unityAppState.roomSession.addContentEnabled

export const isDownloadContentEnabled = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.downloadContentEnabled

export const isClearRoomEnabled = (unityAppState: AppState): boolean => unityAppState.roomSession.clearRoomEnabled

export const shouldShowAutoplayControls = (unityAppState: AppState): boolean => {
  const autoplayDisabled = isPermissionRestricted(unityAppState.roomSession, AdministratorPermission.NoAutoplay)
  const cameraMode = unityAppState.roomSession.camera.mode
  const isReadOnlyActor = unityAppState.roomSession.isReadOnlyActor
  const selectedObjectId = unityAppState.roomSession.selectedObject.objectID
  const addContentEnabled = unityAppState.roomSession.addContentEnabled

  return (
    !autoplayDisabled &&
    (isReadOnlyActor ||
      (selectedObjectId === 0 && !addContentEnabled) ||
      cameraMode === CameraMode.ArtNavigation ||
      cameraMode === CameraMode.AutoPlay)
  )
}

export const canMuteParticipant = (unityAppState: AppState, userId: string): boolean => {
  const session = unityAppState.roomSession
  if (userId === session.actors[session.localActorNumber]?.userID) {
    return true
  }
  return session.muteAnyoneEnabled
}

export const isEditAdminContentEnabled = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.editAdminContentEnabled

export const isChangeEnvironmentEnabled = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.changeEnvironmentEnabled

export const isDeleteRoomEnabled = (unityAppState: AppState, roomId?: string): boolean =>
  isUserRoomOwner(unityAppState, unityAppState.userProfile.userID, roomId) &&
  !areOtherUsersInRoom(unityAppState, unityAppState.userProfile.userID, roomId) &&
  getLobbyType(unityAppState, roomId) === LobbyType.None

export const isSaveRoomEnabled = (unityAppState: AppState): boolean => unityAppState.roomSession.saveRoomEnabled

export const hasIntegration = (userProfile: UserProfile, integration: IntegrationType): boolean =>
  userProfile.integrations[integration]?.isActive

export const isImageOrVideoObject = (unityAppState: AppState, objectID: number): boolean => {
  const { images, videoPlayers } = unityAppState.roomSession.sharedState.scene
  return Boolean(images?.[objectID] || videoPlayers?.[objectID])
}

export const isImage = (unityAppState: AppState, objectID: number): boolean => {
  const { images } = unityAppState.roomSession.sharedState.scene
  return Boolean(images?.[objectID])
}

export const isVideo = (unityAppState: AppState, objectID: number): boolean => {
  const { videoPlayers } = unityAppState.roomSession.sharedState.scene
  return Boolean(videoPlayers?.[objectID])
}

export const getObjectURL = (unityAppState: AppState, objectID: number): string => {
  return unityAppState.roomSession.objectIDToDirectURLLookup[objectID]
}

export const getObjectHyperlink = (unityAppState: AppState, objectId: number): HyperlinkState => {
  return unityAppState.roomSession.sharedState.scene.hyperlinks?.[objectId]
}

export const canManipulateSelectedObject = (unityAppState: AppState): boolean => {
  return (
    canMoveSelectedObject(unityAppState) ||
    canRotateSelectedObject(unityAppState) ||
    canScaleSelectedObject(unityAppState)
  )
}

export const canMoveSelectedObject = (unityAppState: AppState): boolean => {
  return (
    (unityAppState.roomSession.selectedObject.transformManipulationMode &
      SpatialManipulationHandler_TwoHandedManipulation.Move) !==
    0
  )
}

export const canRotateSelectedObject = (unityAppState: AppState): boolean => {
  return (
    (unityAppState.roomSession.selectedObject.transformManipulationMode &
      SpatialManipulationHandler_TwoHandedManipulation.Rotate) !==
    0
  )
}

export const canScaleSelectedObject = (unityAppState: AppState): boolean => {
  return (
    (unityAppState.roomSession.selectedObject.transformManipulationMode &
      SpatialManipulationHandler_TwoHandedManipulation.Scale) !==
    0
  )
}

export const isModelObject = (unityAppState: AppState, objectID: number): boolean => {
  return Boolean(unityAppState.roomSession.sharedState.scene.models?.[objectID])
}

export const objectHasRTCFeeds = (unityAppState: AppState, objectID: number): boolean => {
  return Boolean(unityAppState.roomSession.sharedState.scene.rtcFeeds?.[objectID])
}

export const objectDuplicatedRTCFeedsCount = (unityAppState: AppState, objectID: number): number => {
  const { rtcFeeds } = unityAppState.roomSession.sharedState.scene
  const { feedID } = rtcFeeds[objectID]
  return (
    Object.keys(rtcFeeds).find((key) => {
      const otherObjectID = Number.parseInt(key)
      return otherObjectID != objectID && rtcFeeds?.[otherObjectID].feedID === feedID
    })?.length ?? 0
  )
}

// Checks if there are any duplicated RTC feed scene objects (with same feedID as the given object)
export const objectHasDuplicateFeedsInScene = (unityAppState: AppState, objectID: number): boolean => {
  return objectDuplicatedRTCFeedsCount(unityAppState, objectID) >= 2
}

export const isDocumentObject = (unityAppState: AppState, objectID: number): boolean => {
  return Boolean(unityAppState.roomSession.sharedState.scene.documents?.[objectID])
}

export const isObjectOwnedByAdmin = (unityAppState: AppState, objectID: number): boolean => {
  const modelObject = unityAppState.roomSession.sharedState.scene.objects?.[objectID]
  return modelObject ? isUserAdministrator(unityAppState, modelObject.creatorUserID) : false
}

const NFT_PREFIXES = ["spatialcontent://opensea", "spatialcontent://magicEden"]

/** Returns `true` if the currently selected object is an empty frame */
export const isSelectedObjectEmptyFrame = (unityAppState: AppState) => {
  return unityAppState.roomSession.sharedState.scene.galleryFrames[unityAppState.roomSession.selectedObject.objectID]
    ?.isEmpty
}

export const isNftObject = (unityAppState: AppState, objectID: number): boolean => {
  const { images, videoPlayers, models } = unityAppState.roomSession.sharedState.scene

  return NFT_PREFIXES.some(
    (prefix) =>
      images?.[objectID]?.url.startsWith(prefix) ||
      videoPlayers?.[objectID]?.url.startsWith(prefix) ||
      models?.[objectID]?.url.startsWith(prefix)
  )
}

export const canAttachHyperlink = (unityAppState: AppState, objectId: number): boolean => {
  const { images, videoPlayers, models } = unityAppState.roomSession.sharedState.scene
  return Boolean(images?.[objectId] || videoPlayers?.[objectId] || models?.[objectId])
}

export const hasHyperlink = (unityAppState: AppState, objectID: number): boolean => {
  return Boolean(unityAppState.roomSession.sharedState.scene.hyperlinks?.[objectID])
}

export const isGalleryInfoDisplayed = (unityAppState: AppState, objectID: number): boolean => {
  return Boolean(unityAppState.roomSession.sharedState.scene.galleryInfos?.[objectID]?.isVisible)
}

export const getGalleryInfo = (unityAppState: AppState, objectID: number): GalleryInformationState => {
  return unityAppState.roomSession.sharedState.scene.galleryInfos?.[objectID]
}

export const isCustomEnvironmentSet = (unityAppState: AppState): boolean =>
  Boolean(unityAppState.roomSession.sharedState.customEnvironment.modelURL)

export const isInCustomEnvironment = (unityAppState: AppState): boolean =>
  Boolean(unityAppState.roomSession.sharedState.settings.environment === VREnvironment.Custom)

export const isCustomSkyboxSet = (unityAppState: AppState): boolean =>
  Boolean(unityAppState.roomSession.sharedState.customEnvironment.skyboxURL)

export const isSettingCustomEnvironment = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.userTools.customEnvironmentTool.currentStep !== CustomEnvironmentSetupStep.None

export const isSettingCustomEnvironmentStepConfirmModel = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.userTools.customEnvironmentTool.currentStep === CustomEnvironmentSetupStep.ConfirmModel

export const isPortal = (unityAppState: AppState, objectID: number): boolean =>
  Boolean(unityAppState.roomSession.sharedState.scene.portals?.[objectID])

export const shouldHideContentButtons = (unityAppState: AppState): boolean => isSettingCustomEnvironment(unityAppState)

export const isRoomViewOnly = (unityAppState: AppState) => {
  return unityAppState.roomSession.room.restrictedPermissions.includes(AdministratorPermission.RestrictOthersViewOnly)
}

export const isAuthlessUser = (unityAppState: AppState, userId: string) => {
  if (!(userId in unityAppState.roomSession.actorsLookup)) return true // if we can't find the user, assume they are authless

  const userActorNumber = unityAppState.roomSession.actorsLookup[userId][0]
  return unityAppState.roomSession.sharedState.actorMetaData[userActorNumber]?.isAuthless ?? true
}

export interface SelectedObjectButtonState {
  downloadButtonDisplayed: boolean
  lockButtonDisplayed: boolean
  replaceContentButtonDisplayed: boolean
  transformButtonDisplayed: boolean
  oneToOneButtonDisplayed: boolean
  duplicateButtonDisplayed: boolean
  deleteButtonDisplayed: boolean
  customEnvironmentButtonDisplayed: boolean
  infoButtonDisplayed: boolean
  frameButtonDisplayed: boolean
  pedestalButtonDisplayed: boolean
  objectURL: string | null
  isLocked: boolean
  infoDisplayed: boolean
  frameDisplayed: boolean
  pedestalDisplayed: boolean
  disableDelete: boolean
  isNft: boolean
  canAddHyperlink: boolean
}

export const getSelectedObjectButtonState = (unityAppState: AppState): SelectedObjectButtonState => {
  const isAdmin = areHostToolsEnabled(unityAppState) // checks that host tools are enabled AND that the user is a host
  const isOwner = isUserRoomOwner(unityAppState, unityAppState.userProfile.userID)
  const objectID = unityAppState.roomSession.selectedObject.objectID
  const objectURL: string = getObjectURL(unityAppState, objectID)

  const isNft = isNftObject(unityAppState, objectID)
  const isYouTube = objectURL && isYouTubeUrl(objectURL)
  const isPinned = unityAppState.roomSession.sharedState.scene.pinnedObjects.includes(objectID)
  const pedestalDisplayed = Boolean(unityAppState.roomSession.sharedState.scene.galleryPedestals?.[objectID])
  const infoDisplayed = isNft && isGalleryInfoDisplayed(unityAppState, objectID)
  const frameDisplayed = Boolean(unityAppState.roomSession.sharedState.scene.galleryFrames?.[objectID]?.hasFrame)

  const isAdminContent = isObjectOwnedByAdmin(unityAppState, objectID)
  const canEditAdminContent = unityAppState.roomSession.editAdminContentEnabled
  const isViewOnly = isRoomViewOnly(unityAppState)
  const canEditContent = isOwner || isAdmin || (!isViewOnly && (canEditAdminContent || !isAdminContent))
  const addContentEnabled = unityAppState.roomSession.addContentEnabled
  const isLocked = !objectID || isPinned || !canEditContent
  const customEnvironmentButtonDisplayed =
    isModelObject(unityAppState, objectID) &&
    unityAppState.roomSession.changeEnvironmentEnabled &&
    canEditContent &&
    !isLocked
  const disableDelete = unityAppState.roomSession.features.includes(RoomFeature.DisableDeleteContent)
  const isImageOrVideo = isImageOrVideoObject(unityAppState, objectID)
  const isEmptyFrame = isSelectedObjectEmptyFrame(unityAppState)

  // Button display states
  const downloadButtonDisplayed =
    Boolean(objectURL) && unityAppState.roomSession.downloadContentEnabled && !isNft && !isYouTube

  const lockButtonDisplayed =
    canEditContent &&
    unityAppState.roomSession.selectedObject.transformManipulationMode !==
      SpatialManipulationHandler_TwoHandedManipulation.None
  const replaceContentButtonDisplayed =
    (isEmptyFrame ||
      isImageOrVideo ||
      isModelObject(unityAppState, objectID) ||
      isDocumentObject(unityAppState, objectID)) &&
    canEditContent
  const transformButtonDisplayed = canEditContent && !isLocked
  const oneToOneButtonDisplayed = isModelObject(unityAppState, objectID) && canEditContent
  const duplicateButtonDisplayed =
    (!objectHasRTCFeeds(unityAppState, objectID) || objectDuplicatedRTCFeedsCount(unityAppState, objectID) < 2) &&
    addContentEnabled &&
    !isLocked
  const deleteButtonDisplayed =
    (!objectHasRTCFeeds(unityAppState, objectID) || objectHasDuplicateFeedsInScene(unityAppState, objectID)) &&
    canEditContent &&
    !isLocked &&
    !disableDelete
  const infoButtonDisplayed = isNft && canEditContent && !isLocked && !isYouTube
  const frameButtonDisplayed = isImageOrVideoObject(unityAppState, objectID) && canEditContent && !isLocked
  const pedestalButtonDisplayed = isModelObject(unityAppState, objectID) && canEditContent && !isLocked
  const canAddHyperlink = canEditContent && canAttachHyperlink(unityAppState, objectID) && !isYouTube

  return {
    downloadButtonDisplayed,
    lockButtonDisplayed,
    replaceContentButtonDisplayed,
    transformButtonDisplayed,
    oneToOneButtonDisplayed,
    duplicateButtonDisplayed,
    deleteButtonDisplayed,
    disableDelete,
    customEnvironmentButtonDisplayed,
    infoButtonDisplayed,
    frameButtonDisplayed,
    pedestalButtonDisplayed,
    objectURL,
    isLocked,
    infoDisplayed,
    frameDisplayed,
    pedestalDisplayed,
    isNft,
    canAddHyperlink,
  }
}

export const getParticipantLocation = (unityAppState: AppState, participantId: string): VoiceLocationGroupState => {
  const actorNumber = unityAppState.roomSession?.actorsLookup[participantId]
  const groupID = unityAppState.roomSession?.sharedState?.actorLocationLookup[actorNumber?.[0]]
  return unityAppState.roomSession?.sharedState?.locations[groupID]
}

export const getParticipantMetadata = (unityAppState: AppState, participantId: string): ActorMetaData | undefined => {
  const actorNumber = unityAppState.roomSession?.actorsLookup[participantId]
  return unityAppState.roomSession?.sharedState.actorMetaData[actorNumber?.[0]]
}

export const getBlockedUsers = (appState: AppState) => appState.userProfile.blockedUsers

export const getRoomActorNumbers = (appState: AppState, participantId: string): number[] => {
  return appState.roomSession.actorsLookup[participantId] ?? []
}

export const isSavingRoom = (unityAppState: AppState) => {
  const persistenceStatus = unityAppState.roomSession.persistenceStatus
  return persistenceStatus === RoomPersistenceStatus.SaveRequested || persistenceStatus === RoomPersistenceStatus.Saving
}

export const getCustomEnvironment = (appState: AppState) => appState.roomSession.sharedState.settings.environment

export const getSelectedObjectId = (unityAppState: AppState) => unityAppState.roomSession.selectedObject.objectID

export const getCustomEnvironmentToolCurrentStep = (unityAppState: AppState) =>
  unityAppState.roomSession.userTools.customEnvironmentTool.currentStep ?? CustomEnvironmentSetupStep.None

export const getToasts = (unityAppState: AppState) => unityAppState.toastSystem?.toasts

export const getIsAudioAttenuationEnabled = (unityAppState: AppState) =>
  unityAppState.roomSession.sharedState.settings.enableAudioAttenuation

export const getIsAutoSaveEnabled = (unityAppState: AppState) =>
  unityAppState.roomSession.sharedState.settings.enableAutosave

export const getIsMeshTeleportEnabled = (unityAppState: AppState) =>
  unityAppState.roomSession.sharedState.customEnvironment.meshTeleportEnabled

export const getRoomFullySynced = (unityAppState: AppState) => unityAppState?.roomSession?.inRoomAndFullySynced

export const getIsParticipantChatDisabled = (unityAppState: AppState): boolean =>
  unityAppState.roomSession.participantChatDisabled

/** Environments that support auto layout (gallery environments) */
const AUTO_LAYOUT_ENVIRONMENTS = [
  VREnvironment.IsleGallery,
  VREnvironment.ObsidianGallery,
  VREnvironment.AeriesGallery,
  VREnvironment.NFT0001_Museo,
  VREnvironment.NFT0002_BozoIsland,
]

export const isAutoLayoutEnvironment = (environment: VREnvironment, isCustomNftEnvironment?: boolean) =>
  AUTO_LAYOUT_ENVIRONMENTS.includes(environment) || isCustomNftEnvironment

export const getAvailableShareSettings = (unityAppState: AppState, room: RoomData): ShareSetting[] => {
  const isOrgMember = unityAppState.userProfile.organizations.includes((room.organizations ?? [""])[0])
  const isOwner = unityAppState.userProfile.userID === room.ownerID
  const isAdmin = isCurrentUserAdministrator(unityAppState)

  const result = []

  if (isOwner || isAdmin || (isOrgMember && room.shareSetting !== ShareSetting.Private)) {
    result.push(ShareSetting.PublicLink)
    result.push(ShareSetting.Organization)
  }
  if (isOwner || isAdmin) {
    result.push(ShareSetting.Private)
  }

  return result
}

// The enum -> string generators below are done using a neat little TypeScript trick
// https://stackoverflow.com/a/55578603/10601393
export const stringForSAPIStatus = (status: SAPIStatus) => SAPIStatus[status]

export const stringForLoginStatus = (status: LoginStatus) => LoginStatus[status]

export const stringForMicrophoneStatus = (status: MicStatus): string => MicStatus[status]

export const stringForRoomSessionStatus = (status: RoomSessionStatus) => RoomSessionStatus[status]

export const stringForChannelConnectionStatus = (status: RTCConnectionStatus) => RTCConnectionStatus[status]

export const stringForSpatialDeviceModel = (model: SpatialDeviceModel) => SpatialDeviceModel[model]

export const stringForUserSubscriptionType = (type: UserSubscription_SubscriptionType) =>
  UserSubscription_SubscriptionType[type]?.replace("_", " ")

export const platformToString = (platform: Platform) => {
  switch (platform) {
    case Platform.WebGL:
      return "Web"
    case Platform.AndroidMobile:
    case Platform.iOSMobile:
      return "Mobile"
    case Platform.Oculus:
      return "VR"
    default:
      return "Unknown"
  }
}

export const getLocalVoiceLocationGroupId = (unityAppState: AppState) => {
  const localActorNumber = unityAppState.roomSession.localActorNumber
  return unityAppState.roomSession.sharedState.actorLocationLookup[localActorNumber]
}

const getParticipantsForVoiceLocationGroup = (
  unityAppState: AppState,
  group: VoiceLocationGroupState,
  includeMe: boolean
): Participant[] => {
  const result = new Map<string, Participant>()

  const room = getCurrentRoom(unityAppState)

  group.actors.forEach((actorNumber: number) => {
    const roomSessionActor = unityAppState.roomSession.actors[actorNumber]

    if (roomSessionActor) {
      if (!includeMe && roomSessionActor.roomActorNumber === unityAppState.roomSession.localActorNumber) {
        return
      }

      const userData = room.participants[roomSessionActor.userID]
      if (userData) {
        result.set(roomSessionActor.userID, {
          id: roomSessionActor.userID,
          name: userData.displayName,
          profilePicUrl: userData.profilePicURL,
          avatarColor: `rgba(${userData.color.join(",")})`,
        })
      }
    } else {
      result.set(`unknown-${actorNumber}`, {
        id: String(actorNumber),
        name: `Actor ${actorNumber}`, // This is only likely to arise when a user is leaving--updating their name later is unnecessary in this case
      })
    }
  })

  return Array.from(result.values())
}

export const getParticipantGroups = (unityAppState: AppState, includeMe: boolean): ParticipantGroup[] => {
  const CLOUD_SPECTATOR_LOCATION_OVERRIDE_ID = 8165486

  const groups: VoiceLocationGroupState[] = Object.values(unityAppState.roomSession.sharedState.locations)
  const nonEmptyGroups = groups.filter(
    (group) => group.actors.length > 0 && group.locationID !== CLOUD_SPECTATOR_LOCATION_OVERRIDE_ID
  )

  const myActorID = unityAppState.roomSession.localActorNumber
  const myGroup = unityAppState.roomSession.sharedState.locations[getLocalVoiceLocationGroupId(unityAppState)]

  if (!myActorID || !myGroup) {
    // NOTE: non-early return
    return []
  }

  const participantGroups: ParticipantGroup[] = nonEmptyGroups
    .map((group: VoiceLocationGroupState) => {
      const participantsInGroup: Participant[] = getParticipantsForVoiceLocationGroup(unityAppState, group, includeMe)
      const isMine = group.actors.includes(myActorID)
      const title = group.city && group.regionCode ? `${group.city}, ${group.regionCode}` : "Unknown"

      return {
        id: String(group.locationID),
        isMine,
        title,
        data: participantsInGroup,
      } as ParticipantGroup
    })
    .filter((group) => group.data.length > 0)

  return participantGroups
}

const assignAdditionalParticipantData = (
  unityAppState: AppState,
  userID: string,
  participant: Participant
): Participant => {
  const roomActors = unityAppState.roomSession.actors

  const getRoomActorNumber = (): number => {
    for (const [key, actor] of Object.entries(roomActors)) {
      if (actor.userID === userID) {
        return Number(key)
      }
    }
    return -1
  }

  const roomActorNumber = getRoomActorNumber()
  const roomActorMetaData = unityAppState.roomSession.sharedState.actorMetaData[roomActorNumber]
  const roomActorNumbers = unityAppState.roomSession.actorsLookup[userID] ?? []

  return {
    ...participant,
    isMuted: roomActorMetaData?.isMutedAtSource ?? false,
    isTalking: roomActorMetaData?.isTalking ?? false,
    roomActorNumbers: new Set<number>(roomActorNumbers),
  }
}

export const getParticipants = (unityAppState: AppState, includeMe = true): Participant[] => {
  const roomActors = unityAppState.roomSession.actors
  const room = getCurrentRoom(unityAppState)
  const currentUserId = unityAppState.userProfile.userID

  const seenParticipantUserIDs = new Set<string>()

  const participants: Participant[] = []
  Object.values(roomActors).forEach((actor: RoomSessionActor) => {
    const userId = actor.userID

    if (seenParticipantUserIDs.has(userId)) {
      return
    }
    seenParticipantUserIDs.add(userId)

    const userData = room.participants[userId]
    if (includeMe || currentUserId !== userId) {
      const newParticipant: Participant = userData
        ? {
            id: userId,
            name: userData.displayName,
            profilePicUrl: userData.profilePicURL,
            avatarColor: `rgba(${userData.color.join(",")})`,
          }
        : {
            // This is only likely to arise when a user is leaving
            id: userId,
            name: `User ${userId}`,
          }

      participants.push(assignAdditionalParticipantData(unityAppState, userId, newParticipant))
    }
  })

  return participants.sort(unmutedComparator)
}

interface SortableParticipant {
  isMuted?: boolean
  roomActorNumbers?: Set<number>
}

export const sortParticipants = (unityAppState: AppState, participants: Participant[]) =>
  participants.sort((a: Participant, b: Participant): number => {
    if (!isUserBlocked(unityAppState, a.id) && isUserBlocked(unityAppState, b.id)) {
      return -1
    }
    if (isUserBlocked(unityAppState, a.id) && !isUserBlocked(unityAppState, b.id)) {
      return 1
    }
    return 0
  })

/** Sorts participants that are unmuted first. */
export const unmutedComparator = (a: SortableParticipant, b: SortableParticipant) => {
  const isAUnmuted = !a.isMuted
  const isBUnmuted = !b.isMuted

  if (isAUnmuted !== isBUnmuted) {
    return isBUnmuted ? 1 : -1
  }

  return lastJoinedComparator(a, b)
}

/**
 * Sorts participants in order of when they joined the room. Users who joined the room latest come earlier
 * A higher number denotes a "later" joined time.
 * `roomActorNumbers` is a set, it includes all the actor numbers of a single user (i.e. you can join on multiple devices)
 * so we take the minimum value (the "oldest" value).
 */
const lastJoinedComparator = (a: SortableParticipant, b: SortableParticipant) => {
  // If for some reason there is no value in the set, sort the user at the end (assign a value of -1)
  const valueA = a.roomActorNumbers && a.roomActorNumbers.size > 0 ? Math.min(...a.roomActorNumbers) : -1
  const valueB = b.roomActorNumbers && b.roomActorNumbers.size > 0 ? Math.min(...b.roomActorNumbers) : -1
  return valueB - valueA
}

export const getShareSettingsCopy = (room: RoomData, setting: ShareSetting = room.shareSetting) => {
  switch (setting) {
    case ShareSetting.PublicLink:
      return "Anyone with the link"
    case ShareSetting.Private:
      return "Visible to only you and invited users"
    case ShareSetting.Organization:
    default:
      return room.organizationOwnerName
        ? `Restricted to ${room.organizationOwnerName} members`
        : "Restricted to your team"
  }
}

/**
 * Returns the active quest, if a quest is active. Otherwise, returns null.
 */
export const getActiveQuest = (unityAppState: AppState) => {
  const currentQuestId = unityAppState.roomSession.questSystem.currentQuestID
  if (currentQuestId === 0) {
    return null
  }

  return unityAppState.roomSession.questSystem.quests[currentQuestId]
}
