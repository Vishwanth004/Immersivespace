/**
 * Do not change these after they're in production; add a new one.
 */
export const enum InteractionType {
  Click = "Click",
  View = "View",
  Submission = "Submission",
  Error = "Error",
  Keypress = "Keypress",
}

/**
 * Do not change these after they're in production; add a new one.
 *
 * Please sort a-z as this list will get very large over time!
 */
export const enum InteractionName {
  AddSpawnPoint = "AddSpawnPoint",
  AuthSuccess = "AuthSuccess",
  AuthErrorCta = "AuthErrorCta",
  AuthErrorStartOver = "AuthErrorStartOver",
  AuthlessNameSignIn = "AuthlessNameSignIn",
  AuthlessSignInBackpackToast = "AuthlessSignInBackpackToast",
  AuthlessSignInShopToast = "AuthlessSignInShopToast",
  AuthlessSignInBannerCta = "AuthlessSignInBannerCta",
  AuthlessSignInBannerDismiss = "AuthlessSignInBannerDismiss",
  AuthlessUserSendChatMessage = "AuthlessUserSendChatMessage",
  AuthlessUserSetNameAndAvatar = "AuthlessUserSetNameAndAvatar",
  AuthlessUserSignUpForAvatarCustomization = "AuthlessUserSignUpForAvatarCustomization",
  AvatarCustomizationConfirmAsdkImage = "AvatarCustomizationConfirmAsdkImage",
  AvatarCustomizationRpmAvatarExported = "AvatarCustomizationRpmAvatarExported",
  CameraRotationMode = "CameraRotationMode",
  /** User cancelled avatar customization without saving */
  CancelAvatarCustomization = "CancelAvatarCustomization",
  ChatChannelJoin = "ChatChannelJoin",
  ChatMessageSent = "ChatMessageSent",
  ChatChannelJoinAndSawFirstMessage = "ChatChannelJoinAndSawFirstMessage",
  ClearAllFrames = "ClearAllFrames",
  ClearContentInRoom = "ClearContentInRoom",
  ClearCustomSkybox = "ClearCustomSkybox",
  CreateNewSpace = "CreateNewSpace",
  CreateTeam = "CreateTeam",
  CreatorToolkitNewsletterSignUp = "CreatorToolkitNewsletterSignUp",
  ConfirmCustomEnv = "ConfirmCustomEnv",
  ConfirmVerifyEmail = "ConfirmVerifyEmail",
  ControlsAndTipsFirstQuest = "ControlsAndTipsFirstQuest",
  CopyShareUrl = "CopyShareUrl",
  CustomEnvFromObject = "CustomEnvFromObject",
  CycleAuthlessAvatar = "CycleAuthlessAvatar",
  DeleteSpace = "DeleteSpace",
  EditEnvironmentPosition = "EditEnvironmentPosition",
  EditGenericBody = "EditGenericBody",
  EditShirtColor = "EditShirtColor",
  EditSkinColor = "EditSkinColor",
  // Space name, description, tags, and thumbnail
  EditSpaceInfoCancelConfirm = "EditSpaceInfoCancelConfirm",
  EditSpaceInfoSave = "EditSpaceInfoSave",
  EmailSupport = "EmailSupport",
  // This isn't used anywhere, just a placeholder. Only for Unity side
  Emote = "Emote",
  EmoteKeybindSignInBannerCta = "EmoteKeybindSignInBannerCta",
  EmoteKeybindSignInBannerDismissed = "EmoteKeybindSignInBannerDismissed",
  EndGoLive = "EndGoLive",
  EndGoLiveModalConfirm = "EndGoLiveModalConfirm",
  EndGoLiveModalDismiss = "EndGoLiveModalDismiss",
  Exit = "Exit",
  FirstTutorialBack = "FirstTutorialBack",
  FirstTutorialDone = "FirstTutorialDone",
  FirstTutorialNext = "FirstTutorialNext",
  FirstTutorialSkip = "FirstTutorialSkip",
  FollowUser = "FollowUser",
  GoLive = "GoLive",
  GoLiveModalConfirm = "GoLiveModalConfirm",
  GoLiveModalDismiss = "GoLiveModalDismiss",
  HideEmptyFrames = "HideEmptyFrames",
  HomepageHeroCreator = "HomepageHeroCreator",
  HomepageHeroCta = "HomepageHeroCta",
  HyperlinkCreated = "HyperlinkCreated",
  HyperlinkClicked = "HyperlinkClicked",
  HyperlinkEditCancelled = "HyperlinkEditCancelled",
  HyperlinkLeaveSpatialConfirm = "HyperlinkLeaveSpatialConfirm",
  HyperlinkLeaveSpatialCancel = "HyperlinkLeaveSpatialCancel",
  InvalidProfileUrl = "InvalidProfileUrl",
  InvalidTokenGateAccessSettings = "InvalidTokenGateAccessSettings",
  JoinRecommendedSpaceOnLeave = "JoinRecommendedSpaceOnLeave",
  LeaveSpace = "LeaveSpace",
  LeaveSpaceCancel = "LeaveSpaceCancel",
  LeaveSpaceConfirm = "LeaveSpaceConfirm",
  LoginAttempt = "LoginAttempt",
  LoveSpace = "LikeSpace",
  /** User dismissed the initial permission modal. They will be prompted again in the near future. */
  PushNotificationPermissionModalDismissed = "PushNotificationPermissionModalDismissed",
  /** User accepted the initial permission modal, transitioning into the browser permission prompt. */
  PushNotificationPermissionModalAccepted = "PushNotificationPermissionModalAccepted",
  /** User denied/blocked browser permission for notifications, or browser failed to grant permission. */
  PushNotificationPermissionFailed = "PushNotificationPermissionFailed",
  /** User granted browser permission for notifications, and device token was sent to SAPI. */
  PushNotificationPermissionGranted = "PushNotificationPermissionGranted",
  ManageOculusProSubscription = "ManageOculusProSubscription",
  ManageAppleProSubscription = "ManageAppleProSubscription",
  ManageStripeProSubscription = "ManageStripeProSubscription",
  MuteSelf = "MuteSelf",
  MuteOther = "MuteOther",
  NftLinkClicked = "NftLinkClicked",
  OpenAvatarCustomizationPanel = "OpenAvatarCustomizationPanel",
  OpenEnvSettingsPanel = "OpenEnvSettingsPanel",
  OpenNewSpacePicker = "OpenNewSpacePicker",
  OpenEditProfile = "OpenEditProfile",
  OpenShopItemDetailsModal = "OpenShopItemDetailsModal",
  OpenSpaceInApp = "OpenSpaceInApp",
  OpenCreateSpaceInApp = "OpenCreateSpaceInApp",
  OpenCreatorProfile = "OpenCreatorProfile",
  ProfilePageCancel = "ProfilePageCancel",
  ProfilePageEditAvatar = "ProfilePageEditAvatar",
  ProfilePageSave = "ProfilePageSave",
  PublishSpace = "PublishSpace",
  PushNotificationClicked = "PushNotificationClicked",
  PushNotificationReceived = "PushNotificationReceived",
  RecordVideoStart = "RecordVideoStart",
  RecordVideoStop = "RecordVideoStop",
  RecordedVideo = "RecordedVideo",
  ReadyPlayerMeAnnouncementBannerCta = "ReadyPlayerMeAnnouncementBannerCta",
  ReadyPlayerMeAnnouncementBannerDismiss = "ReadyPlayerMeAnnouncementBannerDismiss",
  RejectSystemPermission = "RejectSystemPermission",
  /**
   * Even though this is the same endpoint as `EditSpaceInfo`, it's a different event because there are some views
   * where we only show the option to rename, i.e. the overflow menu of the spaces list.
   */
  RenameSpace = "RenameSpace",
  RenameSpaceCancel = "RenameSpaceCancel",
  RequestResetPasswordEmail = "RequestResetPasswordEmail",
  ResendVerificationEmail = "SentVerificationEmail",
  ResetPasswordAttempt = "ResetPasswordAttempt",
  ReturnedFromSsoLogin = "ReturnedFromSsoLogin",
  QuestsCompleteModalClose = "QuestsCompleteModalClose",
  QuestsCompleteModalKeepExploring = "QuestsCompleteModalKeepExploring",
  QuestsCompleteModalSelectSpace = "QuestsCompleteModalSelectSpace",
  SaveAvatarCustomization = "SaveAvatarCustomization",
  SaveAvatarData = "SaveAvatarData",
  SaveProfile = "SaveProfile",
  SaveTokenGateAccessSettings = "SaveTokenGateAccessSettings",
  SelectCreatorToolkitAvatar = "SelectCreatorToolkitAvatar",
  SelectRpmAvatar = "SelectRpmAvatar",
  SetProfileBackgroundBanner = "SetProfileBackgroundBanner",
  ShareSpace = "ShareSpace",
  ShareProfile = "ShareProfile",
  ShareToFacebook = "ShareToFacebook",
  ShareToLinkedIn = "ShareToLinkedIn",
  ShareToTwitter = "ShareToTwitter",
  SignUp = "SignUp",
  SpacePreviewJoinLive = "SpacePreviewJoinLive",
  SpacesSearch = "SpacesSearch",
  SplashScreenFinishedLoading = "SplashScreenFinishedLoading",
  StartDanceStreak = "StartDanceStreak",
  SupportForCustomEnv = "SupportForCustomEnv",
  SwitchParticipantGroup = "SwitchParticipantGroup",
  SwitchSpacesTab = "SwitchSpacesTab",
  TakeScreenshot = "TakeScreenshot",
  UnfollowUser = "UnfollowUser",
  UnloveSpace = "UnlikeSpace",
  UnmuteSelf = "UnmuteSelf",
  UnmuteOther = "UnmuteOther",
  UnpublishSpace = "UnpublishSpace",
  UpsellSignUpCta = "UpsellSignUpCta",
  UseBackpackItem = "UseBackpackItem",
  PurchaseShopItem = "PurchaseShopItem",
}
