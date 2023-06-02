import {
  AdministratorPermission,
  AppStateKeyPaths,
  AvatarOverrideType,
  CameraMode,
  CameraRotationMode,
  LeaveRoomReason,
  LogLevel,
  RoomJoinMethod,
  RoomModalType,
  RoomsMenuCategory,
  RoomsMenuMode,
  RoomData_ShareSetting as ShareSetting,
  SocialProfileMenuState_FollowPanelVisibility,
  SocialProfileState,
  UserAvatarStyle,
  VREnvironment,
} from "@spatialsys/unity/app-state"

import { ObservedUnityKeyPaths } from "./observed-key-paths"
import { ContentObject, EmotesAnalyticsData, JoinRoomArgs, ReportCategory } from "./types"

export interface UnityMessage<T = any> {
  name: string
  data: T
  timing?: {
    preSerialize: number
    postSerialize: number
    preParse: number
    postParse: number
  }
}

let messageHandler: (message: UnityMessage) => void
let messageQueue: UnityMessage[] = []
let hasBooted = false

export const isInitialized = () => messageHandler != null && hasBooted

/**
 * Flushes messages in the queue, if Unity is ready to receive them and the messageHandler is defined.
 * Only the `setAppConfig` message is sent before Unity is
 */
function flushMessagesIfReady() {
  if (isInitialized()) {
    messageQueue.forEach(sendMessageToUnity)
    messageQueue = []
  }
}

/**
 * Sends a message to Unity, and will be received in the ReactBridgeManager
 * ReactBridgeManager expects the message to be prefixed with @UnityMessage@
 */
export const sendMessageToUnity = (message: UnityMessage) => {
  if (isInitialized()) {
    messageHandler(message)
  } else {
    messageQueue.push(message)
  }
}

/**
 * Sets the message handler, and attempts to flush the message queue.
 */
export const setMessageSender = (handler: (message: UnityMessage) => void) => {
  messageHandler = handler
  flushMessagesIfReady()
}

type AppConfig = {
  spatialUid: string
  swagOrigin: string
  sapiOrigin: string
}

/**
 * {@link setMessageSender} must be called before calling this function.
 */
export const setAppConfig = (config: AppConfig) => {
  const msg = { name: "set_app_config", data: config }
  // We use the handler directly and don't check if it's null because this message
  // should only ever be sent in response to a `get_app_config` message from Unity.
  // This message should not be queued, and the messageHandler must be set up before
  // using this.
  messageHandler(msg)
}

/**
 * Call this when Unity sends the message `app_finished_booting`. Sets `hasBooted` to true,
 * and attempts to flush the message queue.
 */
export const finishBooting = () => {
  hasBooted = true
  flushMessagesIfReady()
}

export const selectUserForModeration = (userId: string) => {
  sendMessageToUnity({
    name: "select_user_for_moderation",
    data: {
      userId,
    },
  })
}

export const initializeAppStateObservers = (extraKeyPaths: AppStateKeyPaths[] = []) => {
  sendMessageToUnity({
    name: "initialize_app_state_observers",
    data: { keyPaths: ObservedUnityKeyPaths.concat(extraKeyPaths) },
  })
}

/**
 * If changing observers for a specific dictionary key, you'll have to force cast the desired key paths
 * to AppStateKeyPaths, since union types don't support wildcard values
 */
export const changeAppStateObservers = (addKeyPaths: AppStateKeyPaths[], removeKeyPaths: AppStateKeyPaths[]) => {
  sendMessageToUnity({
    name: "change_app_state_observers",
    data: { addKeyPaths, removeKeyPaths },
  })
}

export const blockUser = (userId: string) => {
  sendMessageToUnity({
    name: "block_user",
    data: {
      userId,
    },
  })
}

export const unblockUser = (userId: string) => {
  sendMessageToUnity({
    name: "unblock_user",
    data: {
      userId,
    },
  })
}

export const reportUser = (userId: string, category: ReportCategory, reason: string, roomId: string) => {
  sendMessageToUnity({
    name: "report_user",
    data: {
      userId,
      category,
      reason,
      roomId,
    },
  })
}

export const logIn = (accessToken: string | null, isAuthless = false, userProfileJson?: string) => {
  sendMessageToUnity({
    name: "login",
    data: { accessToken, isAuthless, userProfileJson },
  })
}

export const updateAccessToken = (accessToken: string) => {
  // Don't queue this message, we make sure to set the initial value when we do initialize.
  if (!isInitialized()) {
    return
  }
  sendMessageToUnity({
    name: "update_access_token",
    data: { accessToken },
  })
}

export const logOut = () => {
  sendMessageToUnity({
    name: "logout",
    data: {},
  })
}

export interface PatchUserMessage {
  displayName?: string
  acceptTerms?: boolean
  acceptUpdatedTerms?: boolean
  acceptPrivacyPolicy?: boolean
  acceptUpdatedPrivacyPolicy?: boolean
  accountCompletionStatus?: string
  termsType?: string
  optInToMarketing?: boolean
}

export const patchUser = (message: PatchUserMessage) => {
  sendMessageToUnity({
    name: "patch_user",
    data: message,
  })
}

export const setAuthlessDisplayName = (displayName: string) => {
  sendMessageToUnity({
    name: "set_authless_display_name",
    data: {
      displayName,
    },
  })
}

export const setIsAuthlessInfoConfirmed = (isConfirmed: boolean) => {
  sendMessageToUnity({
    name: "set_is_authless_info_confirmed",
    data: {
      isConfirmed,
    },
  })
}

export const refreshUserProfile = () => {
  sendMessageToUnity({
    name: "refresh_user_profile",
    data: {},
  })
}

export const setUserAvatarStyle = (style: UserAvatarStyle) => {
  sendMessageToUnity({
    name: "set_user_avatar_style",
    data: { style },
  })
}

export const setAvatarSdkAvatar = (sdkUserId: string, avatarId: string) => {
  sendMessageToUnity({
    name: "set_avatarsdk_avatar",
    data: { sdkUserId, avatarId },
  })
}

export const setAvatarBody = (url: string) => {
  sendMessageToUnity({
    name: "set_avatar_body",
    data: { url },
  })
}

export const setAvatarSkinColorOverride = (color: { r: number; g: number; b: number; a: number }) => {
  sendMessageToUnity({
    name: "set_avatar_skin_color_override",
    data: color,
  })
}

export const setAvatarShirtColorOverride = (color: { r: number; g: number; b: number; a: number }) => {
  sendMessageToUnity({
    name: "set_avatar_shirt_color_override",
    data: color,
  })
}

export const setAvatarReadyPlayerMeUrl = (url: string, profilePictureOverride?: string) => {
  sendMessageToUnity({
    name: "set_avatar_rpm_url",
    data: { url, profilePictureOverride },
  })
}

/**
 * Overrides the user's saved avatar with the specified avatar URL and style for the current room session.
 */
export const setSessionAvatarOverride = (overrideType: AvatarOverrideType, url: string, style: UserAvatarStyle) => {
  sendMessageToUnity({
    name: "set_session_avatar_override",
    data: { overrideType, url, style },
  })
}

/**
 * Manually clear the override and reload the user's saved avatar. Leaving the space will automatically clear the override.
 */
export const clearSessionAvatarOverride = () => {
  sendMessageToUnity({
    name: "clear_session_avatar_override",
    data: {},
  })
}

export const setFramerateSettings = (targetFrameRate: number, vSyncCount: number) => {
  sendMessageToUnity({
    name: "set_framerate_settings",
    data: { targetFrameRate, vSyncCount },
  })
}

export const setEnvironmentMeshingEnabled = (enabled: boolean) => {
  sendMessageToUnity({
    name: "set_environment_meshing_enabled",
    data: { enabled },
  })
}

export const setCameraPixelRatio = (cameraPixelRatio: number) => {
  sendMessageToUnity({
    name: "set_camera_pixel_ratio",
    data: { pixelRatio: cameraPixelRatio },
  })
}

export const enableAutoCameraPixelRatio = () => {
  sendMessageToUnity({
    name: "enable_auto_camera_pixel_ratio",
    data: { minPixelRatio: 0.25, maxPixelRatio: 1 },
  })
}

export const disableAutoCameraPixelRatio = () => {
  sendMessageToUnity({
    name: "disable_auto_camera_pixel_ratio",
    data: {},
  })
}

export const setAntiAliasing = (antiAliasing: number) => {
  sendMessageToUnity({
    name: "set_anti_aliasing",
    data: { antiAliasing },
  })
}

export const setWindowVisible = (visible: boolean) => {
  sendMessageToUnity({
    name: "set_window_visible",
    data: { visible },
  })
}

export const showToast = (message: string) => {
  sendMessageToUnity({
    name: "toast",
    data: { message },
  })
}

export const dismissStartupMessage = () => {
  sendMessageToUnity({
    name: "dismissed_startup_message",
    data: {},
  })
}

export const requestAlertFeedback = (callbackId: number, feedback: string) => {
  sendMessageToUnity({
    name: "app_request_alert_feedback",
    data: {
      callbackId,
      feedback,
    },
  })
}

export const setLocalLogLevel = (level: LogLevel) => {
  sendMessageToUnity({
    name: "set_local_log_level",
    data: { level },
  })
}

export const setRemoteLogLevel = (level: LogLevel) => {
  sendMessageToUnity({
    name: "set_remote_log_level",
    data: { level },
  })
}

export const sendLog = (level: LogLevel, message: string, stackTrace?: string) => {
  sendMessageToUnity({
    name: "log",
    data: {
      logLevel: level,
      message,
      stackTrace,
    },
  })
}

/**
 * Spawns multiple items in the space. If `autoLayout` is set to true, and the environment is compatible,
 * the items will be laid out automatically. Otherwise, spawns all the items in front of the user's avatar.
 *
 * @param hideEmptyFrames whether or not to hide empty frames. ignored if `autoLayout` is false
 * @param autoLayout whether or not to layout the items automatically.
 * @param content the list of objects to spawn.
 */
export const spawnContent = (hideEmptyFrames: boolean | null, autoLayout: boolean, content: ContentObject[]) => {
  sendMessageToUnity({
    name: "spawn_content",
    data: {
      hideEmptyFrames,
      autoLayout,
      content,
    },
  })
}

/**
 * Replaces the content of a given object
 */
export const replaceObjectContent = (objectId: number, content: ContentObject) => {
  sendMessageToUnity({
    name: "replace_object_content",
    data: {
      objectId,
      ...content,
    },
  })
}

/** Set the object that is currently being selected to upload content to. */
export const setUploadTargetEmptyFrameID = (objectId: number) => {
  sendMessageToUnity({
    name: "set_upload_target_frame_object_id",
    data: { objectId },
  })
}

export const addNote = (note: string) => {
  sendMessageToUnity({
    name: "add_note",
    data: { note },
  })
}

export const addSearchOrUrl = (searchOrUrl: string) => {
  sendMessageToUnity({
    name: "add_search",
    data: { searchOrUrl },
  })
}

export const addWhiteboard = () => {
  sendMessageToUnity({
    name: "add_whiteboard",
    data: {},
  })
}

export const finishWhiteboard = () => {
  sendMessageToUnity({
    name: "finish_whiteboard",
    data: {},
  })
}

export const cancelWhiteboard = () => {
  sendMessageToUnity({
    name: "cancel_whiteboard",
    data: {},
  })
}

export const setObjectPositionLocal = (objectId: number, x: number, y: number, z: number) => {
  sendMessageToUnity({
    name: "set_object_position_local",
    data: {
      objectId,
      x,
      y,
      z,
    },
  })
}

export const moveObjectOnCameraXZAxis = (objectId: number, deltaX: number, deltaZ: number) => {
  sendMessageToUnity({
    name: "move_object_on_camera_xz_axis",
    data: {
      objectId,
      deltaX,
      deltaZ,
    },
  })
}

export const setObjectScaleLocal = (objectId: number, scale: number) => {
  sendMessageToUnity({
    name: "set_object_scale_local",
    data: {
      objectId,
      scale,
    },
  })
}

export const rotateObjectLocal = (objectId: number, deltaY: number) => {
  sendMessageToUnity({
    name: "rotate_object_local",
    data: {
      objectId,
      deltaY,
    },
  })
}

export const setVoiceMuted = (muted: boolean) => {
  sendMessageToUnity({
    name: "set_voice_muted",
    data: { muted },
  })
}

export const setWebcamEnabled = (enabled: boolean) => {
  sendMessageToUnity({
    name: "set_webcam_enabled",
    data: { enabled },
  })
}

export const setScreenshareEnabled = (enabled: boolean) => {
  sendMessageToUnity({
    name: "set_screenshare_enabled",
    data: { enabled },
  })
}

export const setLightBoxObject = (objectId: number) => {
  sendMessageToUnity({
    name: "set_light_box_object",
    data: { objectId },
  })
}

export const setUserEnabledVoiceConnection = (enabled: boolean) => {
  sendMessageToUnity({
    name: "set_user_enabled_voice_connection",
    data: { enabled },
  })
}

export const setCameraMode = (cameraMode: CameraMode) => {
  sendMessageToUnity({
    name: "set_camera_mode",
    data: { cameraMode },
  })
}
export const setCameraRotationMode = (cameraRotationMode: CameraRotationMode) => {
  sendMessageToUnity({
    name: "set_camera_rotation_mode",
    data: { cameraRotationMode },
  })
}

/**
 * Set the camera viewport rect in normalized space
 * @param rect Rect in normalized space [0-1]. [0, 0, 1, 1] will render the full canvas
 */
export const setCameraViewportRect = (rect: { x: number; y: number; width: number; height: number }) => {
  sendMessageToUnity({
    name: "set_camera_viewport_rect",
    data: rect,
  })
}

/**
 * Needs to be matched with EasingFunctions.cs in Unity
 * Refer easings.net
 */
export enum UnityViewPortAnimation {
  EaseInQuad = 0,
  EaseOutQuad = 1,
  EaseInOutQuad = 2,
  EaseInCubic = 3,
  EaseOutCubic = 4,
  EaseInOutCubic = 5,
  EaseInQuart = 6,
  EaseOutQuart = 7,
  EaseInOutQuart = 8,
  EaseInQuint = 9,
  EaseOutQuint = 10,
  EaseInOutQuint = 11,
  EaseInSine = 12,
  EaseOutSine = 13,
  EaseInOutSine = 14,
  EaseInExpo = 15,
  EaseOutExpo = 16,
  EaseInOutExpo = 17,
  EaseInCirc = 18,
  EaseOutCirc = 19,
  EaseInOutCirc = 20,
  Linear = 21,
  Spring = 22,
  EaseInBounce = 23,
  EaseOutBounce = 24,
  EaseInOutBounce = 25,
  EaseInBack = 26,
  EaseOutBack = 27,
  EaseInOutBack = 28,
  EaseInElastic = 29,
  EaseOutElastic = 30,
  EaseInOutElastic = 31,
}

/**
 * Set the camera viewport rect in normalized space with an animation
 * @param rect Rect in normalized space [0-1]. [0, 0, 1, 1] will render the full canvas
 */
export const setCameraViewportRectWithAnimation = (rect: {
  x: number
  y: number
  width: number
  height: number
  duration: number
  easingCurve: UnityViewPortAnimation
}) => {
  sendMessageToUnity({
    name: "set_camera_viewport_rect_with_animation",
    data: rect,
  })
}

/**
 * Sets autoplay to focus App.state.roomSession.selectedObject.objectID in unity
 */
export const setAutoplayTargetObjectId = () => {
  sendMessageToUnity({ name: "set_autoplay_target_object_Id", data: {} })
}

export const autoplayNavigate = (direction: number) => {
  sendMessageToUnity({
    name: "autoplay_navigate",
    data: { direction },
  })
}

export const setSettingsMenuVisible = (visible: boolean) => {
  sendMessageToUnity({
    name: "set_settings_menu_visible",
    data: { visible },
  })
}

export const leaveRoom = (reason: LeaveRoomReason) => {
  sendMessageToUnity({
    name: "leave_room",
    data: { reason },
  })
}

export const saveRoom = () => {
  sendMessageToUnity({
    name: "save_room",
    data: {},
  })
}

export const setWindowFocused = (value: boolean) => {
  sendMessageToUnity({
    name: "set_window_focused",
    data: { value },
  })
}

export const setMouseInWindow = (isMouseInsideWindow: boolean) => {
  if (!isInitialized()) {
    return
  }

  sendMessageToUnity({
    name: "set_mouse_in_window",
    data: { inside: isMouseInsideWindow },
  })
}

export const setMouseInUnity = (isMouseInUnity: boolean) => {
  sendMessageToUnity({
    name: "set_mouse_in_unity",
    data: { inside: isMouseInUnity },
  })
}

export const toggleAutosave = () => {
  sendMessageToUnity({
    name: "toggle_autosave",
    data: {},
  })
}

export const toggleTransformGizmos = () => {
  sendMessageToUnity({
    name: "toggle_transform_gizmos",
    data: {},
  })
}

export const clap = () => {
  sendMessageToUnity({
    name: "clap",
    data: {},
  })
}

export const toggleSpatialAudio = () => {
  sendMessageToUnity({
    name: "toggle_spatial_audio",
    data: {},
  })
}

export const clearRoom = () => {
  sendMessageToUnity({
    name: "clear_room",
    data: {},
  })
}

export const deleteRoom = (roomId: string) => {
  sendMessageToUnity({
    name: "delete_room",
    data: { roomId },
  })
}

export const setEnvironment = (environment: VREnvironment, variant: number) => {
  sendMessageToUnity({
    name: "set_environment",
    data: { environment, variant },
  })
}

/**
 * Sets the environment to a Spatial SDK package environment (asset bundle).
 * The internal content ID that's loaded in Unity uses the following URI format: spatialcontent://<environmentId>:<variantId>
 *
 * @param environmentId The environment's unique ID. Generally for package environments, it's formatted like unityPackage:<SKU>, where SKU is the package's unique ID
 * @param variantId The variant ID for the environment. When concatenated with environment ID, it's used to locate the bundle to load.
 */
export const setPackageEnvironment = (environmentId: string, variantId: string) => {
  sendMessageToUnity({
    name: "set_package_environment",
    data: { environmentId, variantId },
  })
}

export const clearCustomSkybox = () => {
  sendMessageToUnity({
    name: "clear_custom_skybox",
    data: {},
  })
}

export const saveRoomAsTemplate = (name: string, fileIdToOverwrite?: string) => {
  sendMessageToUnity({
    name: "save_room_as_template",
    data: { name, overwriteFileId: fileIdToOverwrite },
  })
}

export const fetchTemplates = () => {
  sendMessageToUnity({
    name: "fetch_templates",
    data: {},
  })
}

/**
 * Controls what spaces tab the user is viewing and to search for a space
 *
 * @param mode Sets the mode the spaces list is in; Closed, SelectRoom or CreateNewRoom
 * @param category which category of spaces the user is currently viewing.  Includes search
 * @param searchText Defined when the user is searching
 */
export const setRoomListParameters = (mode: RoomsMenuMode, category: RoomsMenuCategory, searchText: string) => {
  sendMessageToUnity({
    name: "set_room_list_parameters",
    data: { mode, category, searchText },
  })
}

export const SetSpacesListMode = (mode: RoomsMenuMode) => {
  sendMessageToUnity({
    name: "set_spaces_list_mode",
    data: { mode },
  })
}

export const joinRoom = (args: JoinRoomArgs) => {
  sendMessageToUnity({
    name: "join_room",
    data: args,
  })
}

export const switchInstances = (meetingId: string) => {
  sendMessageToUnity({
    name: "switch_space_instance",
    data: { meetingId },
  })
}

export const joinPrivateHome = (joinContext: RoomJoinMethod) => {
  sendMessageToUnity({
    name: "join_private_home",
    data: { joinContext },
  })
}

export const joinSandbox = () => {
  sendMessageToUnity({
    name: "join_sandbox",
    data: {},
  })
}

export interface CreateAndJoinRoomMessage {
  shareSetting: ShareSetting
  isPublicLink: boolean
  environment: VREnvironment
  environmentVariant?: number

  /** Environment IDs that are retrieved from SAPI */
  packageSku?: string
  packageVariantId?: string

  /** If a template ID is provided, the environment argument is ignored. */
  templateId?: string

  /** Loads the environment & scene from a url that contains state to load
      If a presetUrl is provided, the environment argument is ignored. */
  presetUrl?: string
}

export const createAndJoinRoom = (message: CreateAndJoinRoomMessage) => {
  const {
    shareSetting,
    isPublicLink,
    environment,
    environmentVariant,
    presetUrl,
    templateId,
    packageSku,
    packageVariantId,
  } = message

  sendMessageToUnity({
    name: "create_and_join_room",
    data: {
      shareSetting,
      publicLink: isPublicLink,
      environment,
      environmentVariant,
      presetUrl,
      templateId,
      packageSku,
      packageVariantId,
    },
  })
}

interface CreatePortalMessage {
  roomId?: string
  linkHref?: string
  linkLabel?: string
}

export const createPortal = (args: CreatePortalMessage) => {
  sendMessageToUnity({
    name: "add_portal",
    data: args,
  })
}

export const addHyperlink = (objectId: number, linkHref: string, linkLabel: string) => {
  sendMessageToUnity({
    name: "add_hyperlink",
    data: { objectId, linkHref, linkLabel },
  })
}

export const editRoomName = (roomId: string, newName: string) => {
  sendMessageToUnity({
    name: "edit_room_name",
    data: { roomId, roomName: newName },
  })
}

export const editRoomInfo = ({
  roomId,
  skipSapiCall = false,
  name,
  description,
  tags,
}: {
  roomId: string
  skipSapiCall?: boolean
  name?: string
  description?: string
  tags?: string[]
}) => {
  sendMessageToUnity({
    name: "edit_room_info",
    data: { roomId, roomName: name, description, tags, skipSapiCall },
  })
}

export const requestMute = (muted: boolean, actorNumber: number) => {
  sendMessageToUnity({
    name: "request_mute",
    data: { muted, actorNumber },
  })
}
export const joinGroup = (groupId: number) => {
  sendMessageToUnity({
    name: "join_group",
    data: { groupId },
  })
}

export const createGroup = () => {
  sendMessageToUnity({
    name: "create_group",
    data: {},
  })
}

export const setObjectLocked = (objectId: number, locked: boolean) => {
  sendMessageToUnity({
    name: "set_object_locked",
    data: {
      objectId,
      locked,
    },
  })
}

export const deleteObject = (objectId: number) => {
  sendMessageToUnity({
    name: "delete_object",
    data: {
      objectId,
    },
  })
}

export const duplicateObject = (objectId: number) => {
  sendMessageToUnity({
    name: "duplicate_object",
    data: {
      objectId,
    },
  })
}

export const setObjectScaleOneToOne = (objectId: number) => {
  sendMessageToUnity({
    name: "set_object_scale_one_to_one",
    data: {
      objectId,
    },
  })
}

export const setGalleryInfoVisibility = (objectId: number, visible: boolean) => {
  sendMessageToUnity({
    name: "set_gallery_info_visibility",
    data: {
      objectId,
      visible,
    },
  })
}

export const setGalleryInfoLightboxVisibility = (objectId: number, visible: boolean) => {
  sendMessageToUnity({
    name: "set_gallery_info_lightbox_visibility",
    data: {
      objectId,
      visible,
    },
  })
}

export const setGalleryInfoContent = (objectId: number, creator: string, title: string, description: string) => {
  sendMessageToUnity({
    name: "set_gallery_info_content",
    data: {
      objectId,
      title,
      creator,
      description,
    },
  })
}

export const setGalleryFrameVisibility = (objectId: number, visible: boolean) => {
  sendMessageToUnity({
    name: "set_gallery_frame_visibility",
    data: {
      objectId,
      visible,
    },
  })
}

export const setGalleryPedestalVisibility = (objectId: number, visible: boolean) => {
  sendMessageToUnity({
    name: "set_gallery_pedestal_visibility",
    data: {
      objectId,
      visible,
    },
  })
}

export const setRoomShareSetting = (shareSetting: ShareSetting, isPublicLink: boolean, roomId?: string) => {
  sendMessageToUnity({
    name: "set_room_share_setting",
    data: {
      roomShareSetting: shareSetting,
      roomPublicLink: isPublicLink,
      roomId,
    },
  })
}

export const inviteUsers = (emails: string[], roomID?: string, isPublicLink?: boolean, shareSetting?: ShareSetting) => {
  sendMessageToUnity({
    name: "invite_users",
    data: {
      emails,
      roomID,
      roomShareSetting: shareSetting,
      roomPublicLink: isPublicLink,
    },
  })
}

export const removeInvitedUsers = (userIds: string[]) => {
  sendMessageToUnity({
    name: "remove_invited_users",
    data: {
      userIds,
    },
  })
}

export const emailMyselfRoomLink = () => {
  sendMessageToUnity({
    name: "email_myself_room_link",
    data: {},
  })
}

export const reloadRoomData = (roomId: string) => {
  sendMessageToUnity({
    name: "reload_room_data",
    data: {
      roomId,
    },
  })
}

export const setAdminPermissionRestricted = (
  permission: AdministratorPermission,
  restricted: boolean,
  roomId?: string
) => {
  sendMessageToUnity({
    name: "set_admin_permission_restricted",
    data: {
      permission,
      restricted,
      roomId,
    },
  })
}

export const setInstancingEnabled = (roomId: string, enabled: boolean) => {
  sendMessageToUnity({
    name: "set_instancing_enabled",
    data: { roomId, enabled },
  })
}

export const setPublishedToExplore = (roomId: string, enabled: boolean) => {
  sendMessageToUnity({
    name: "set_published_to_explore",
    data: { roomId, enabled },
  })
}

export const refreshMeetings = () => {
  sendMessageToUnity({
    name: "refresh_meetings",
    data: {},
  })
}

export const muteAllParticipants = () => {
  sendMessageToUnity({
    name: "mute_all_participants",
    data: {},
  })
}

export const setUserIsAdmin = (userId: string, isAdmin: boolean) => {
  sendMessageToUnity({
    name: "set_user_is_admin",
    data: { userId, isAdmin },
  })
}

export const removeUser = (userId: string) => {
  sendMessageToUnity({
    name: "remove_user",
    data: { userId },
  })
}

export const revertRoom = () => {
  sendMessageToUnity({
    name: "revert_room",
    data: {},
  })
}

export const congregateAroundActor = () => {
  sendMessageToUnity({
    name: "congregate_around_actor",
    data: {},
  })
}

export const respawnOthersInHotspots = () => {
  sendMessageToUnity({
    name: "respawn_others_in_hotspots",
    data: {},
  })
}

export const setSpeechCaptioningEnabled = (enabled: boolean) => {
  sendMessageToUnity({
    name: "set_speech_captions_enabled",
    data: { enabled },
  })
}

export const setSpeechCaptionsLanguage = (languageCode: string) => {
  sendMessageToUnity({
    name: "set_speech_captions_language",
    data: { languageCode },
  })
}

export const setWebUserAgent = (userAgent: string) => {
  sendMessageToUnity({
    name: "set_browser_user_agent",
    data: {
      userAgent,
    },
  })
}

export const setMicrophoneInputSource = (inputSource: string) => {
  sendMessageToUnity({
    name: "set_microphone_input_source",
    data: {
      inputSource,
    },
  })
}

export const setRtcClientId = (clientId: string) => {
  sendMessageToUnity({
    name: "rtc_set_client_id",
    data: { clientId },
  })
}

export const channelConnectionStatusChanged = (connectionStatus: number) => {
  sendMessageToUnity({
    name: "rtc_channel_connection_status_changed",
    data: {
      connectionStatus,
    },
  })
}

export const remoteClientClaimedChannel = (clientId: string, userId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_client_claimed_channel",
    data: {
      clientId,
      userId,
    },
  })
}

export const remoteClientReleasedChannel = (clientId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_client_released_channel",
    data: {
      clientId,
    },
  })
}

export const setMCULayoutFrame = (clientId: string, x: number, y: number, width: number, height: number) => {
  sendMessageToUnity({
    name: "rtc_set_mcu_layout_frame",
    data: {
      clientId,
      x,
      y,
      width,
      height,
    },
  })
}

export const clearMCULayoutFrame = () => {
  sendMessageToUnity({
    name: "rtc_clear_mcu_layout_frames",
    data: {},
  })
}

export const remoteClientConnectedToChannel = (clientId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_client_connected_to_channel",
    data: {
      clientId,
    },
  })
}

export const remoteClientDisconnectedFromChannel = (clientId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_client_disconnected_from_channel",
    data: {
      clientId,
    },
  })
}

export const remoteMediaCaptured = (
  clientId: string,
  mediaId: string,
  mediaType: string,
  connectionMode: string,
  frameRate: number
) => {
  sendMessageToUnity({
    name: "rtc_remote_media_captured",
    data: {
      clientId,
      mediaId,
      mediaType,
      connectionMode,
      frameRate,
    },
  })
}

export const remoteMediaReleased = (clientId: string, mediaId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_media_released",
    data: {
      clientId,
      mediaId,
    },
  })
}

export const remoteMediaLayoutChanged = (
  clientId: string,
  mediaId: string,
  mediaWidth: number,
  mediaHeight: number
) => {
  sendMessageToUnity({
    name: "rtc_remote_media_layout_changed",
    data: {
      clientId,
      mediaId,
      width: mediaWidth,
      height: mediaHeight,
    },
  })
}

export const remoteVoiceStreamCaptured = (clientId: string, streamId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_voice_stream_captured",
    data: {
      clientId,
      streamId,
    },
  })
}

export const remoteVoiceStreamReleased = (clientId: string) => {
  sendMessageToUnity({
    name: "rtc_remote_voice_stream_released",
    data: {
      clientId,
    },
  })
}

export const remoteMediaStatusChanged = (clientId: string, mediaId: string, connectionStatus: number) => {
  sendMessageToUnity({
    name: "rtc_remote_media_status_changed",
    data: {
      clientId,
      mediaId,
      connectionStatus,
    },
  })
}

export const localMediaCaptured = (mediaId: string, mediaType: string) => {
  sendMessageToUnity({
    name: "rtc_local_media_captured",
    data: {
      mediaId,
      mediaType,
    },
  })
}

export const localMediaReleased = (mediaId: string) => {
  sendMessageToUnity({
    name: "rtc_local_media_released",
    data: {
      mediaId,
    },
  })
}

export const localMediaClaimedConnection = (mediaId: string) => {
  sendMessageToUnity({
    name: "rtc_local_media_claimed_connection",
    data: {
      mediaId,
    },
  })
}

export const localMediaReleasedConnection = (mediaId: string) => {
  sendMessageToUnity({
    name: "rtc_local_media_released_connection",
    data: {
      mediaId,
    },
  })
}

export const localMediaConnectionStatusChanged = (mediaId: string, connectionStatus: number) => {
  sendMessageToUnity({
    name: "rtc_local_media_connection_status_changed",
    data: {
      mediaId,
      connectionStatus,
    },
  })
}

export const setCustomEnvironmentSetupStep = (objectId: number, customEnvironmentSetupStep: number) => {
  sendMessageToUnity({
    name: "set_custom_environment_setup_step",
    data: {
      objectId,
      customEnvironmentSetupStep,
    },
  })
}

export const setCustomEnvironmentFromObject = (objectId: number, replace: boolean) => {
  sendMessageToUnity({
    name: "set_custom_environment_from_object",
    data: {
      objectId,
      replace,
    },
  })
}

export const setCustomEnvironmentFromFile = (content: ContentObject[], replace: boolean) => {
  sendMessageToUnity({
    name: "set_custom_environment_with_file",
    data: {
      content,
      replace,
    },
  })
}

export const setCustomSkyboxFromObject = (objectId: number) => {
  sendMessageToUnity({
    name: "set_custom_skybox_from_object",
    data: {
      objectId,
    },
  })
}

export const startTweakCustomEnvironment = () => {
  sendMessageToUnity({
    name: "start_tweak_custom_environment",
    data: {},
  })
}

export const replaceCustomEnvironmentModelURL = () => {
  sendMessageToUnity({
    name: "replace_custom_environment_url",
    data: {},
  })
}

export const toggleCustomEnvironmentMeshTeleport = () => {
  sendMessageToUnity({
    name: "toggle_custom_environment_mesh_teleport",
    data: {},
  })
}

export const setCustomNftEnvironment = (id: string) => {
  sendMessageToUnity({
    name: "set_custom_nft_environment",
    data: {
      id,
    },
  })
}

export const tryRequestMute = (roomActorNumbers: number[], mute: boolean) => {
  roomActorNumbers.forEach((actorNumber: number) => {
    requestMute(mute, actorNumber)
  })
}

export const clearSelectedObject = () => {
  sendMessageToUnity({
    name: "set_selected_object",
    data: {
      objectId: 0,
    },
  })
}

export const setEmptyGalleryFrameVisibility = (visible: boolean) => {
  sendMessageToUnity({
    name: "set_empty_gallery_frame_visibility",
    data: {
      visible,
    },
  })
}

export const clearAllFrames = () => {
  sendMessageToUnity({
    name: "clear_all_gallery_frames",
    data: {},
  })
}

export const playEmoteAnimation = (animationAssetName: string, analytics: EmotesAnalyticsData, isHolding = false) => {
  sendMessageToUnity({
    name: "play_emote_animation",
    data: {
      animationAssetName,
      method: analytics.method,
      source: analytics.source,
      isHolding,
    },
  })
}

/**
 * Play an emoji reaction.
 *
 * @param codepoint The unicode identifier for the emoji.
 * For example, the smiley face emoji has codepoint 1F600.
 * An emoji may be identified by multiple codepoints concatenated by hyphens.
 * For example, the astronaut emoji has codepoint 1F468-200D-1F680.
 */

export const playEmoteEmoji = (codepoint: string, analytics: EmotesAnalyticsData, isHolding = false) => {
  sendMessageToUnity({
    name: "play_emote_emoji",
    data: {
      codepoint,
      method: analytics.method,
      source: analytics.source,
      isHolding,
    },
  })
}

export const processChatMessage = (senderId: string, message: string) => {
  sendMessageToUnity({
    name: "process_chat_message",
    data: {
      senderId,
      message,
    },
  })
}

/**
 * Sets whether chat window is open or not
 *
 */
export const setIsChatOpen = (isOpen: boolean) => {
  sendMessageToUnity({
    name: "set_is_chat_open",
    data: {
      isOpen,
    },
  })
}

export const addSpawnPoint = () => {
  sendMessageToUnity({
    name: "add_spawn_point",
    data: {},
  })
}

/**
 * Refetches the moderation room state from SAPI and stores it into Unity app state
 */
export const refreshRoomModerationState = () => {
  sendMessageToUnity({
    name: "refresh_room_moderation_state",
    data: {},
  })
}

/**
 * Bans a user from a room
 * @durationMinutes If durationMinutes is set to 0, the user will be banned indefinitely
 */
export const banUserFromRoom = (userId: string, durationMinutes: number, reason?: string) => {
  sendMessageToUnity({
    name: "ban_user_from_room",
    data: {
      userId,
      durationMinutes,
      reason,
    },
  })
}

export const unbanUserFromRoom = (userId: string) => {
  sendMessageToUnity({
    name: "unban_user_from_room",
    data: {
      userId,
    },
  })
}

export const setRoomModalType = (type: RoomModalType) => {
  sendMessageToUnity({
    name: "set_room_modal_type",
    data: {
      type,
    },
  })
}

export const setRoomVariant = (environmentVariant: number) => {
  sendMessageToUnity({
    name: "set_environment_variant",
    data: {
      environmentVariant,
    },
  })
}

export const setMediaViewParameters = (
  unbiasedScreenSpace: number,
  biasedScreenSpace: number,
  horizontalSigmoidCutoff: number,
  horizontalSigmoidSlope: number,
  verticalSigmoidCutoff: number,
  verticalSigmoidSlope: number
) => {
  sendMessageToUnity({
    name: "set_media_view_parameters",
    data: {
      unbiasedScreenSpace,
      biasedScreenSpace,
      horizontalSigmoidCutoff,
      horizontalSigmoidSlope,
      verticalSigmoidCutoff,
      verticalSigmoidSlope,
    },
  })
}

export const setMouseOrKeyboardUsed = () => {
  sendMessageToUnity({ name: "set_mouse_or_keyboard_used", data: {} })
}

export const setEnvCompressTexture = (isCompressed: boolean) => {
  sendMessageToUnity({
    name: "set_env_compress_texture",
    data: {
      isCompressed,
    },
  })
}

export const setObjCompressTexture = (isCompressed: boolean) => {
  sendMessageToUnity({
    name: "set_obj_compress_texture",
    data: {
      isCompressed,
    },
  })
}

export const flushSpaceAnalytics = () => {
  sendMessageToUnity({
    name: "flush_space_analytics",
    data: {},
  })
}

export const setSpaceLoved = (spaceId: string, loved: boolean, skipSapiCall = false) => {
  sendMessageToUnity({
    name: "set_space_loved",
    data: { spaceId, loved, skipSapiCall },
  })
}

export const notifyOnFrameEnd = () => {
  sendMessageToUnity({ name: "notify_on_frame_end", data: {} })
}

/**
 * Calls SAPI within unity to fetch updated profile information for the specified userId
 *
 * @param forceUpdateProfile set to true when you want to ignore the profile cached in actorMetaData and pull straight from sapi
 */
export const updateSelectedSocialProfileStateWithId = (userId: string, forceUpdateProfile: boolean) => {
  sendMessageToUnity({
    name: "update_selected_social_profile_state_from_id",
    data: { userId, forceUpdateProfile },
  })
}

/**
 * Calls SAPI within unity to fetch updated profile information for the specified username
 *
 * Set roomSession.socialProfile so we can display a profile
 *
 * Use instead of {@link updateSelectedSocialProfileStateWithId} when you only have the username
 */
export const updateSelectedSocialProfileStateWithUsername = (username: string) => {
  sendMessageToUnity({
    name: "update_selected_social_profile_state_from_username",
    data: { username },
  })
}

/**
 * Clear roomSession.socialProfile when a profile is closed
 */
export const clearSelectedSocialProfile = () => {
  sendMessageToUnity({
    name: "clear_selected_social_profile",
    data: {},
  })
}

/**
 * Determines if the profile card is visible and updates the data used on the profile
 *
 * @param visible determines if the profile card is visible
 * @param forceUpdateProfile set to true when you want to ignore the profile cached in actorMetaData and pull straight from sapi
 */
export const setSocialProfileMenuVisible = (visible: boolean, userId?: string, forceUpdateProfile?: boolean) => {
  sendMessageToUnity({
    name: "set_social_profile_menu_visible",
    data: {
      userId,
      visible,
      forceUpdateProfile,
    },
  })
}

export const setInRoomSocialProfilePageVisible = (visible: boolean) => {
  sendMessageToUnity({
    name: "set_in_room_social_profile_page_visible",
    data: {
      visible,
    },
  })
}

export const setInRoomSocialProfileFollowsVisibility = (
  visibility: SocialProfileMenuState_FollowPanelVisibility,
  count?: number
) => {
  sendMessageToUnity({
    name: "set_in_room_social_profile_follows_visibility",
    data: {
      visibility,
      count,
    },
  })
}

export const followUser = (userId: string) => {
  sendMessageToUnity({
    name: "follow_user",
    data: { userId },
  })
}

export const unfollowUser = (userId: string) => {
  sendMessageToUnity({
    name: "unfollow_user",
    data: { userId },
  })
}

type EditUserProfileBridgeCommand = Pick<
  SocialProfileState,
  | "displayName"
  | "username"
  | "about"
  | "usernameTwitter"
  | "usernameInstagram"
  | "usernameOpensea"
  | "usernameDiscord"
  | "usernameLinkedin"
  | "usernameTiktok"
  | "linkWebsite"
> & { bannerSpaceID?: string; bannerURL?: string }

/**
 * Unity will call SAPI to update the user's profile and modify AppState
 *
 * SAPI needs the key profileBackgroundSpaceID instead of bannerSpaceID and unity expects profileBackgroundSpaceID as a result
 *
 */
export const editUserProfile = (profileInfo: EditUserProfileBridgeCommand) => {
  sendMessageToUnity({
    name: "edit_user_profile",
    data: { profileBackgroundSpaceID: profileInfo.bannerSpaceID, bannerURL: profileInfo.bannerURL, ...profileInfo },
  })
}

/**
 * Resets userProfile/editProfileResponseStatus to UserProfile_EditProfileStatus.IDLE
 *
 * Use this when you want to reset UserProfile_EditProfileStatus.FAILED after an API call has failed
 */
export const resetEditUserProfileError = () => {
  sendMessageToUnity({ name: "reset_edit_user_profile_error", data: {} })
}

export const mixpanelTrack = (eventName: string, properties?: Record<string, any>) => {
  sendMessageToUnity({
    name: "mixpanel_track",
    data: {
      eventName: eventName,
      properties: properties,
    },
  })
}

export const mixpanelPeopleSet = (properties: Record<string, any>) => {
  sendMessageToUnity({
    name: "mixpanel_people_set",
    data: properties,
  })
}

export const mixpanelPeopleSetOnce = (properties: Record<string, any>) => {
  sendMessageToUnity({
    name: "mixpanel_people_set_once",
    data: properties,
  })
}

export const mixpanelRegister = (key: string, value: string | number | boolean) => {
  sendMessageToUnity({
    name: "mixpanel_register",
    data: {
      key,
      value,
    },
  })
}

export const mixpanelRegisterOnce = (key: string, value: string | number | boolean) => {
  sendMessageToUnity({
    name: "mixpanel_register_once",
    data: {
      key,
      value,
    },
  })
}

export const goLive = () => {
  sendMessageToUnity({ name: "go_live", data: {} })
}

export const endLive = () => {
  sendMessageToUnity({ name: "end_live", data: {} })
}

export const fetchMoreFollowers = (count: number) => {
  sendMessageToUnity({ name: "fetch_more_followers", data: { count } })
}
export const fetchMoreFollowings = (count: number) => {
  sendMessageToUnity({ name: "fetch_more_followings", data: { count } })
}

export const refreshCreatorProfile = () => {
  sendMessageToUnity({ name: "refresh_creator_profile", data: {} })
}

export const editInspectorPanelField = (path: string, newValue: any) => {
  sendMessageToUnity({ name: "inspector_panel_edit_field", data: { path, newValue } })
}

export const setPhotonVoiceReadyForConnection = () => {
  sendMessageToUnity({ name: "set_photon_voice_ready", data: {} })
}

/**
 * position is normalized in relation to the window height (0..1)
 */
export const setDockViewTopPosition = (position: number) => {
  sendMessageToUnity({ name: "set_dock_view_top_position", data: { position } })
}

/**
 * Show/Hide the joystick and jump button UI on mobile
 *
 * When hidden, they are still be usable
 */
export const setMobileJoystickVisible = (enabled: boolean) => {
  sendMessageToUnity({ name: "set_mobile_joystick_visible", data: { enabled } })
}

/**
 * Plays a simple avatar emote animation from the user's sandbox asset bundle.
 */
export const playSandboxEmoteAnimation = () => {
  sendMessageToUnity({ name: "play_sandbox_emote_animation", data: {} })
}

/**
 * Show/Hide the backpack drawer
 */
export const setBackpackOpen = (isOpen: boolean) => {
  sendMessageToUnity({
    name: "set_backpack_open",
    data: {
      isOpen,
    },
  })
}

/**
 * Preview a backpack item
 */
export const previewBackpackItem = (itemId: string) => {
  sendMessageToUnity({
    name: "preview_backpack_item",
    data: {
      itemId,
    },
  })
}

/**
 * Use a backpack item
 * We prefix the messag with `_` so that React linter does not think it's a hook
 */
export const _useBackpackItem = (itemId: string) => {
  sendMessageToUnity({
    name: "use_backpack_item",
    data: {
      itemId,
    },
  })
}

/**
 * Show/Hide the shop drawer
 */
export const setShopOpen = (isOpen: boolean) => {
  sendMessageToUnity({
    name: "set_shop_open",
    data: {
      isOpen,
    },
  })
}

/**
 * Preview a shop item
 */
export const previewShopItem = (itemId: string) => {
  sendMessageToUnity({
    name: "preview_shop_item",
    data: {
      itemId,
    },
  })
}

/**
 * Purchase a shop item
 */
export const purchaseShopItem = (itemId: string) => {
  sendMessageToUnity({
    name: "purchase_shop_item",
    data: {
      itemId,
    },
  })
}
