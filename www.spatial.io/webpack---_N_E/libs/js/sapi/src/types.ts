import { ChannelResponse, MessageResponse } from "stream-chat"

import {
  AdministratorPermission,
  AppearanceCustomizationState,
  BackpackItemState,
  InvitedGuestUserData,
  ShopItemState,
} from "@spatialsys/unity/app-state"

export const enum PlatformHeaderString {
  Android = "ANDROID_MOBILE",
  Web = "WEB",
  iOS = "IOS",
}

export type CreatorMetadata = {
  appearanceCustomization: AppearanceCustomizationState
  avatarData: AvatarData
  avatarImageURL: string
  displayName: string
  id: string
  username: string
}

type VideoThumbnail = {
  poster: string
  video: string
}

export type SpaceMetadata = {
  active?: boolean
  activeUserCount: number
  customVideo?: VideoThumbnail
  description?: string
  id: string
  joinCount: number
  likeCount: number
  liked: boolean
  live?: boolean
  lobbyType: SAPILobbyType
  name: string
  ownerID: string
  published: boolean
  roomAdmins: string[]
  /** All thumbnails available for a space **/
  roomThumbnails: SAPIRoomThumbnail
  /** True if the space is the Creator Toolkit sandbox **/
  sandbox?: boolean
  shareID?: string
  slug: string
  tags?: string[]
  /** The thumbnail to use when previewing a space (i.e. in the spaces list) **/
  thumbnail: string
  /** Present on Creator Toolkit spaces */
  worldID?: string
}

export type SpaceAndCreator = {
  creator: CreatorMetadata
  space: SpaceMetadata
}

export interface SAPIFieldError {
  error: string
  field: string
}

export interface SAPIError {
  /** on SAPI, an enum */
  code?: string
  display: boolean
  fields?: SAPIFieldError[]
  message: string
  statusCode: number
}

export interface JoinFailMessage {
  bannedUntil: number
  hasWallet: boolean
  message: string
  roomName: string
  // Unix milliseconds
  tokenGateConfig: TokenGateConfig
}

export interface SAPIRequestError<T> {
  code: string
  errors: SAPIError[]
  message: T
}

export interface SAPIRoomThumbnail {
  cubemapGetUrl: string
  customGetUrl: string
  expiresAt: number
  persistentGetUrl: string
  transientGetUrl: string
}

export interface SAPIAppearanceCustomization {
  profileColor: string
}

type UserAvatarStyle = "CREATOR_TOOLKIT" | "READY_PLAYER_ME" | "REALISTIC_RPM_HYBRID" | "REALISTIC"

export interface ReadyPlayerMeThumbnails {
  lowerBody?: string
  upperBody?: string
}

export interface AvatarData {
  activeAvatarStyle?: UserAvatarStyle
  avatarBody?: string
  avatarID?: string
  avatarUserID?: string
  filename?: string
  readyPlayerMeThumbnails?: ReadyPlayerMeThumbnails
  readyPlayerMeUrl?: string
  shirtColorOverride?: string
  skinColor?: string
  skinColorOverride?: string
}

export type AvatarSdkDataOnboarding = Pick<AvatarData, "avatarID" | "avatarUserID"> | null

export interface SAPIParticipantProfile {
  appearanceCustomization: SAPIAppearanceCustomization
  clientPlatform: string
  displayName: string
  id: string
  playerColor: string
  profilePicURL: string
}

export const CONTROL_TREATMENT_VALUE = "control"
export const ENABLED_TREATMENT_VALUE = "enabled"

/**
 * The keys match the name of the treatment in Retool
 *
 * When new treatments are added in Retool, this type should be updated, as well as `ITreatments` and `convertTreatmentsFromSapi` function
 */
export type TreatmentKeysRetool =
  | "authlessRpmAvatars"
  | "collectibleEnvironmentsUpdateKey"
  | "coreLoopQuestsV1"
  | "cubemapPreviewEnabled"
  | "disableUnblockAudioWeb"
  | "emailPwLoginFirebase"
  | "emailPwSignUpWithFirebase"
  | "furnitureKey"
  | "hyperlinksV2"
  | "integrationsSketchfab"
  | "integrationsSolana"
  | "isBugReporter"
  | "isModifiedCameraControllerEnabled"
  | "maxWebcamFPS"
  | "mediaViewDebug"
  | "nftContentBlockchains"
  | "recordReactBridgeTraces"
  | "reportWebNetworkErrorsToSentry"
  | "sendMobileJsLogsToUnity"
  | "spaceInstancing"
  | "stuffKey"
  | "unlimitedFileSize"
  | "userCameraControls"
  | "voiceProvider"
  | "watermarkHidden"
  | "webglVersion"
  | "webShowDebugMenu"

/**
 * The treatments object from SAPI (defined in Retool). All treatment values are passed as a string
 */
export type TreatmentsRetool = Record<TreatmentKeysRetool, string>

/**
 * The treatments object from SAPI (defined in Retool) that are included in the bootstrap endpoint.
 * All treatment values are passed as a string
 */
export type TreatmentsInBootstrapRetool = Record<
  Extract<
    TreatmentKeysRetool,
    "authlessMobileLiveExplore" | "authlessRpmAvatars" | "emailPwLoginFirebase" | "emailPwSignUpWithFirebase"
  >,
  string
>

export type SAPIBootstrapResponse = {
  treatments: TreatmentsInBootstrapRetool
  upgradeMessage: string
}

export type TreatmentsInBootstrapRetoolFormatted = TreatmentsInBootstrapRetool

export type BootstrapTreatments = Omit<SAPIBootstrapResponse, "treatments"> & {
  treatments: TreatmentsInBootstrapRetoolFormatted
}

/**
 * All possible values of user permissions defined in SAPI `common_types.go:L159`
 */
export enum UserPermissions {
  ACCESS_BILLING_PAGE = "ACCESS_BILLING_PAGE",
  ASSOCIATE_DOMAIN_TO_ORG = "ASSOCIATE_DOMAIN_TO_ORG",
  CAN_ACCESS_ADMIN_PAGE = "CAN_ACCESS_ADMIN_PAGE",
  CAN_CHANGE_PASSWORD = "CAN_CHANGE_PASSWORD",
  SPEECH_CAPTIONING = "SPEECH_CAPTIONING",
  UNLIMITED_MEETING_DURATIONS = "UNLIMITED_MEETING_DURATIONS",
  UPGRADE_PRO = "UPGRADE_PRO",
}

/**
 * This is slightly different from what's in Unity app state (namely, some fields aren't flattened like `roomThumbnails`)
 * We need to move SAPI models to a shared package and ideally auto-generate the interfaces from the SAPI code
 * But for now, throwing this here
 */
export interface SAPIRoom {
  active: boolean
  activeParticipants?: SAPIParticipantProfile[]
  description: string
  directlyInvitedGuests: { [key: string]: InvitedGuestUserData }
  id: string
  isInstanceable: boolean
  isPublishedToExplore: boolean
  likedSpace: boolean
  likes: number
  lobbyType: SAPILobbyType
  name: string
  organizationOwnerID?: string
  organizationOwnerName?: string
  organizations: string[]
  owner: { displayName: string; userID: string }
  ownerID?: string
  participants: any
  polymerVersion: number
  publicLink?: boolean
  restrictedPermissions: AdministratorPermission[]
  roomAdmins: string[]
  /** All thumbnails available for a space **/
  roomThumbnails: SAPIRoomThumbnail
  shareID?: string
  shareSetting: SAPIShareSetting
  slug: string
  starred: boolean
  /** The thumbnail to use when previewing a space (i.e. in the spaces list) **/
  thumbnail: string
  thumbnails: string[]
  tileSize?: SAPITileSize
  timeLastJoined?: string
  version: number
  views: number
  /** Present on Creator Toolkit spaces */
  worldID?: string
}

export enum SAPITileSize {
  Large = "large",
  None = "",
}

export enum SAPILobbyType {
  None = "",
  Org = "ORG_LOBBY",
  Private = "PRIVATE_LOBBY",
  Public = "PUBLIC_LOBBY",
}

export type SAPIShareSetting = "ORG" | "PRIVATE" | "PUBLIC_LINK" // Public Link being phased out in DEV-5172

/** The value of the enum is the value of the actual query parameter */
export enum SAPISpaceType {
  Community = "community",
  Lobby = "lobby",
  Org = "org",
  Personal = "personal",
  PublicPark = "publicPark",
  Search = "search",
}

export interface LiveswitchMediaSettings {
  maxFrameRate: number
  maxHeight: number
  maxWidth: number
  mediaType: string
}

export interface LiveswitchConfig {
  appID: string
  mediaSettings: LiveswitchMediaSettings[]
  url: string
}

/** GET /rooms/${roomId} */
export interface GetRoomArgs {
  roomId: string
}

/** Response from GET /rooms/${roomID} */
export interface GetRoomResponse {
  roomData: SAPIRoom
}

/** Response from GET /files/{fileId} */
export interface GetFileResponse {
  file: SAPIFile
  fileUrls: SAPIFileUrls
  nftMetadata?: NftMetadata
}

/**
 * If the user has decided to hide it in the CMS menu or not.
 * If hidden, it doesn't count as part of the user's storage quota.
 */
export type CMSVisibility = "HIDDEN" | "VISIBLE"

/**
 * ExternalModel contains information necessary for an external model processor
 */
export interface ExternalModel {
  id: string
  provider: string
}

/**
 * Metadata for the converted files
 */
export interface ProcessedFile {
  contentType: string
  createdAt: string
  externalModel: ExternalModel
  location: string
  size: number
  target: string
  textureMaxDimension: number
}

export interface SAPIFile {
  //
  /** Array of fileIds */
  Children: string[] | null
  /** Date of file creation */
  CreatedAt: string
  /** Used for files that will never be shown in Content Menu */
  HideFromContentMenu: boolean
  /**
   * Used for file collections to remember which room to upload to
   */
  OrigRoomID: string
  /** A file may be nested under another file */
  ParentID: string
  /** Date of when file was uploaded */
  UploadedAt: string
  contentSource: {
    /** Currently not used for anything */
    LastDownloadedAt: string
    Link: string
    Thumbnail: string
    Type: string
  }
  /** todo: implement all the content types e.g. image/png, image/jpeg etc */
  contentType: string
  /**  Deprecated in favor of Raw/Processed */
  fileLocation: string
  /** If image, how high it is */
  height: number
  id: string
  name: string
  numPages: number
  orgOwnerID: string
  rawLocation: string
  /** Deprecated in favor of putting this on the room model */
  roomOwnerID: string
  size: number
  uploadState: "AWAITING" | "FAILED" | "PENDING" | "UPLOADED"
  uploaderID: string
  /**
   * Used for any file that the User decides to hide via the CMS tab
   */
  visibility: CMSVisibility
  /** If image, how wide it is in pixels */
  width: number
}

/**
 * Cloudfront URLs for accessing SAPI files
 */
export interface SAPIFileUrls {
  expiresAt: number
  getUrl: string
  getUrlFileType: string
  modelCompressedUrl?: string
  modelLowResUrl?: string
  putUrl: string
  rawUrl: string
  /** Only exists for images */
  thumbnailUrl?: string
}

export enum SaleType {
  BUY_NOW,
  AUCTION,
  NOT_LISTED_FOR_SALE,
}

export type Currency = "ETH" | "SOL" | "WETH"

export enum NftMarketPlace {
  MagicEden = "MagicEden",
  OpenSea = "OpenSea",
}

export interface NftMetadata {
  collection: string
  creator: string
  description: string
  externalLink: string
  marketplace: NftMarketPlace
  nftPrice: NftPrice
  owner: string
}

export interface NftPrice {
  currency?: Currency
  price?: number
  priceLabel?: string
  saleType?: SaleType
}

/** Response from POST /nft/verify */
export interface VerifyNFTResponse {
  buttonText?: string
  /** The following 2 properties are present if `ownershipVerfied` is false */
  linkToBuy?: string
  ownershipVerified: boolean
}

/**
 * Response from POST /auth/v1/register/ethereum
 */
export interface AuthenticateWithEthereumResponse {
  /** nonce to sign */
  message: string
  /**  if true, we need to collect email (i.e. it's a new MM account with no email associated with it yet) */
  requireEmail: boolean
}

/**
 * Arguments to PUT /auth/v1/register/ethereum
 */
export interface CompleteRegistrationArgs {
  email: string
  publicAddress: string
  signature: string
}

/**
 * Response from PUT /auth/v1/register/ethereum
 */
export interface CompleteRegistrationResponse {
  /** Firebase custom token */
  token: string
}

/**
 * Response from POST /auth/v1/verify/signature
 */
export interface VerifySignatureResponse {
  /** Firebase custom token */
  token: string
}

/**
 * Args for POST /auth/v1/verify/email
 */
export interface RequestEmailVerificationArgs {
  email: string
  publicAddress?: string
}

/**
 * Args for PUT /auth/v1/verify/email
 */
export interface VerifyEmailArgs {
  ticket: string
}

/** Response from POST /auth/v1/verify/email */
export interface VerifyEmailResponse {
  /** Whether the email was successfully verified or not */
  verified: boolean
}

/** Response from GET /space/v1/rooms/:roomID/meeting */
export interface GetMeetingResponse {
  isHostInstance: boolean
  liveswitchToken: string
  meetingFeatures: string
  meetingID: string
  photonConnections: any[]
  photonVoiceConnections: any[]
}

/** Response from GET /space/v1/rooms/:roomID/chat */
export interface JoinChatResponse {
  active: boolean
  /** Explicitly typing channelType and channelName as strings
   * Since there is no need to accommodate custom return types for these properties
   * Stream Chat provides some presets for a channel as channelType
   * For our purposes, it will likely be "SpatialSpacesV1"
   * Which is the same as the "meeting" channel type but with file uploads */
  channel: ChannelResponse & { channelName: string; channelType: string }

  /** The ~20 most recent messages in the chat */
  messages: MessageResponse[]

  /** Token to connect to Stream chat with */
  token: string

  userID: string
}

export interface CustomNftEnvironment {
  chain: BlockchainIdentifier
  contractAddress: string
  creatorName: string
  marketplaceButtonText: string
  marketplaceUrl: string
  modelUrl: string
  name: string
  presetUrl: string
  thumbnailUrl: string
  tokenID: string
}

/** Args for GET /stripe/checkout */
export interface GetStripeCheckoutArgs {
  term: string
  tier: string
}

/** Response from GET /stripe/checkout */
export interface GetStripeCheckoutResponse {
  sessionId: string
}

/** Response from GET /stripe/portal */
export interface GetStripePortalResponse {
  sessionUrl: string
}

export enum ContractType {
  ERC1155 = "erc1155",
  ERC721 = "erc721",
}

export enum BlockchainIdentifier {
  Ethereum = "ethereum",
  Matic = "matic",
  Solana = "solana",
}

export interface TokenGateConfig {
  /** If `true`, allow any token within the contract.
   * ex: token gate to owners of any cryptopunk, instead of just the owner of a specific punk
   * should only be used if the contractType is erc721
   */
  anyToken: boolean
  blockchainIdentifier: BlockchainIdentifier
  contractAddress: string
  contractType: ContractType
  disabled: boolean
  purchaseLink: string
  quantity: number
  tokenID: string
  tokenName: string
}

export type GetSocialProfileRequest =
  | {
      userID: string
      username?: never
    }
  | {
      userID?: never
      username: string
    }

export interface SocialProfile extends SocialProfileEditableData {
  bannerSpaceID: string
  bannerURL: string
  linkDiscord: string
  linkInstagram: string
  linkLinkedin: string
  linkOpensea: string
  linkTiktok: string
  linkTwitter: string
  numFollowers: number
  numFollowing: number
  numSpaces: number
  userID: string
}

export interface PatchSocialProfileDataRequest {
  profileData: SocialProfileEditableData
  userID: string
}

export interface SocialProfileEditableData {
  about?: string
  appearanceCustomization?: SAPIAppearanceCustomization
  avatarImageURL?: string
  displayName?: string
  isPrivate?: boolean
  linkWebsite?: string
  profileBackgroundSpaceID?: string
  pronoun?: string
  username?: string
  usernameDiscord?: string
  usernameFacebook?: string
  usernameInstagram?: string
  usernameLinkedin?: string
  usernameOpensea?: string
  usernameTiktok?: string
  usernameTwitter?: string
}

export interface FollowerInfo {
  avatarImageURL: string
  displayName: string
  userID: string
  username: string
}

export interface GetFollowersRequest {
  limit?: number
  skip?: number
  userID: string
}

export interface GetFollowersResponse {
  followers: FollowerInfo[]
}

export interface GetFollowingRequest {
  limit?: number
  skip?: number
  userID: string
}

export interface GetFollowingResponse {
  followings: FollowerInfo[]
}

export interface FollowUserRequest {
  userID: string
}

export interface UnfollowUserRequest {
  userID: string
}

export interface RemoveFollowerRequest {
  userID: string
}

export interface SetProfileBackgroundSpaceIDRequest {
  profileBackgroundSpaceID: string
}

export const enum EmoteType {
  Animation = "Animation",
  Emoji = "Emoji",
}

/**
 * EmotePayload is the minimal payload required to identify an emote.
 * To render a emote, it should be parsed into an Emote object.
 * */
export interface EmotePayload {
  emoteType: EmoteType
  identifier: string
}

export interface SetRecentEmotesRequest {
  recentEmotes: EmotePayload[]
  userId: string
}

export const enum AssetSourceType {
  BuiltIn = "BuiltIn",
  NFT = "NFT",
  UnityPackage = "UnityPackage",
}

export const enum SpaceTemplateCategory {
  Collectibles = "Collectibles",
  Free = "Free",
  /** Creator Toolkit (Unity Package) environments */
  Packages = "Packages",
}

export const enum SpaceTemplateType {
  Event = "Event",
  Gallery = "Gallery",
}

export const enum AssetBuildStatus {
  /** One or more platform bundles failed */
  Failed = "Failed",
  /** Package metadata (name, thumbnail, etc) received and platform bundles are being built */
  InProgress = "InProgress",
  /** Not applicable */
  None = "",
  /** Package was successfully uploaded to S3 and queued on CI */
  Submitted = "Submitted",
  /** All platform bundles are ready to load */
  Success = "Successful",
}

export interface SpaceTemplate {
  /** Optional, number of hotspot seats */
  capacity?: number
  /** Different asset types can appear in other categories (e.g. 'UnityPackage' environments like Agora can appear under the 'Free' category). */
  category: SpaceTemplateCategory
  /** Collectibles only */
  contractAddress?: string
  creatorID: string
  creatorName: string
  currentVersion: number
  description: string
  environmentAssetType: AssetSourceType
  environmentType: SpaceTemplateType
  galleryFrameCount?: number
  id: string
  latestSuccessfulVersion: number
  marketplaceButtonText?: string
  marketplaceUrl?: string
  name: string
  nftChain?: BlockchainIdentifier
  /** Points to a JSON/room template that contains the environment information. Used mainly for custom NFT environments. */
  presetUrl: string
  progress: AssetBuildStatus
  tokenID?: string
  variants: SpaceTemplateVariant[]
}

export interface SpaceTemplateVariant {
  id: string
  miniThumbnail: string
  /** hex */
  miniThumbnailColor: string
  thumbnail: string
}

export const enum AvatarScope {
  Universal = "Global",
  World = "World",
}

export const enum AvatarCategory {
  Abstract = "Abstract",
  Animal = "Animal",
  Fantasy = "Fantasy",
  Human = "Human",
  Robotic = "Robotic",
  Unspecified = "Unspecified",
}

export interface AvatarStats {
  hasEffects: boolean
}

export interface Avatar {
  assetType: AssetSourceType
  category: AvatarCategory
  creatorID: string
  creatorName: string
  description: string
  id: string
  name: string
  /** AKA usage context: determines where this avatar can be loaded and used */
  scope: AvatarScope
  stats: AvatarStats
  thumbnail: string
}

export const enum AvatarAnimationType {
  Emote = "Emote",
  Idle = "Idle",
  LocomotionSet = "LocomotionSet",
  Sit = "Sit",
}

export interface AvatarAnimationStats {
  hasEffects: boolean
  lengthSeconds: number
}

export interface AvatarAnimation {
  animationType: AvatarAnimationType
  assetType: AssetSourceType
  creatorID: string
  creatorName: string
  description: string
  id: string
  name: string
  /**
   * Determines whether the animation should be shown in UI components like the emotes picker
   * If false, the animation can still be played via hotkeys/the recents bar.
   */
  shownInMenu: boolean
  /** Published packages only */
  stats?: AvatarAnimationStats
  /** Used when there's no video thumbnail provided */
  thumbnail?: string
  videoThumbnail?: string
}

export interface PrefabObjectStats {
  hasEffects: boolean
  isInteractable: boolean
}

export interface PrefabObject {
  assetType: AssetSourceType
  creatorID: string
  creatorName: string
  description: string
  id: string
  name: string
  stats: PrefabObjectStats
  thumbnail: string
}

export const enum UnlockableType {
  Streak = "Streak",
}

export type ProfileUnlockable = {
  current: number
  id: string
  /** Date */
  resetsAt: number
  type: UnlockableType
  unlocks: ProfileUnlockableItem[]
}

export type ProfileUnlockableItem = {
  cost: number
  /** A given cost may have more than one unlockable item */
  ids: string[]
  /** If false, this item has just been newly unlocked */
  read: boolean
  unlocked: boolean
}

/** Feature flags from ConfigCat */
export type FeatureFlags = {
  backpack: boolean
  categoryCurator: boolean
  cubemap3dPreview: boolean
  feedCurator: boolean
  firstQuestSpacePath: string
  globalMarketplace: string
  jumpCut: boolean
  liveExploreV2660: boolean
  mobileBackpack: boolean
  mobileBadges: boolean
  mobileConfigMenu: boolean
  mobileInSpaceShop: boolean
  mobileLandscapeRoomButtons: boolean
  mobileQuests: boolean
  pointerLock: boolean
  sendMobileJsLogsToUnity: boolean
  shop: boolean
  showBadgesOnUserProfile: boolean
  spaceItemHoverPreview: boolean
  spaceItemHoverPreviewDeets: boolean
  spaceItemHoverPreviewSpaceInfo: boolean
  studioCreateBasicItem: boolean
  studioCreateCurrency: boolean
  studioSetWorldPrice: boolean
}

// Badges

type BadgeBase = {
  badgeIconURL: string
  createdAt: string
  description: string
  id: string
  name: string
  /** ex: 2023-03-04T00:04:57.704328Z */
  rewardedAt?: string
  updatedAt: string
  worldID: string
  worldName: string
}

export type Badge =
  | BadgeBase
  | (BadgeBase & {
      shareID: string
      spaceID: string
      spaceName: string
    })

export type GetBadgeRequest = {
  badgeId: string
}

export type GetBadgeResponse = Badge

export type ClaimBadgeRequest = {
  badgeId: string
  spaceID: string
}

export type UserBadge =
  | BadgeBase
  | (BadgeBase & {
      shareID: string
      spaceID: string
      spaceName: string
    })

export enum FeedComponentType {
  SpacesGrid = "spaces-grid",
  SpacesRow = "spaces-row",
  SpacesVideoHighlights = "spaces-video-highlights",
}

/**
 * All possible data types for a feed component.
 */
export type FeedComponentData = SpacesGridFeedComponentData &
  SpacesRowFeedComponentData &
  SpacesVideoHighlightsFeedComponentData

export type FeedComponent = {
  data: FeedComponentData
  type: FeedComponentType
}

type FeedTitleSegment = {
  label: string
  link?: string
}

export type FeedTitle = FeedTitleSegment[]

export type FeedVideo = {
  creator: CreatorMetadata
  ctaTitle: string
  ctaUrl?: string
  description: string
  id: string
  imageURL: string
  position: number
  space: SpaceMetadata
  title: string
  videoURL: string
}

/**
 * Generic data that the back-end can use to add additional properties to the
 * space join context analytics payload.
 */
type AnalyticsContext = Record<string, boolean | number | string>

export type SpacesGridFeedComponentData = {
  analyticsContext: AnalyticsContext
  id: string
  /** Used for "See More" link */
  link: string
  numRows?: 1 | 2 | 3
  spaces: SpaceAndCreator[]
  title: FeedTitle
}

export type SpacesRowFeedComponentData = {
  analyticsContext: AnalyticsContext
  id: string
  link: string
  spaces: SpaceAndCreator[]
  title: FeedTitle
}

export type SpacesVideoHighlightsFeedComponentData = {
  analyticsContext: AnalyticsContext
  id: string
  spaces: FeedVideo[]
  title: FeedTitle
}

export type FeedSection = {
  id: string
  numRows?: number
  overrideId?: string
  title: FeedTitle
}

type FeedConfigAuthor = {
  id: string
  playerColor: string
  profilePicUrl: string
  username: string
}

export type FeedConfig = {
  config: FeedSection[]
  createdAt: string
  createdBy?: FeedConfigAuthor
  description: string
}

export type FeedCategory = {
  createdAt?: string
  isPrivate: boolean
  name: string
  slug: string
  spaces: string[]
  tags: string[]
  updatedAt?: string
}

export type ItemScope = "global" | "world"
export type ItemType = "avatar" | "avatarAttachment" | "currency" | "emote" | "generic" | "prefabObject"
export type WorldCurrencyPrice = {
  currencyID: string
  currencyName: string
  /** Amount of currency required to purchase the item */
  price: number
  /** Quantity of the item to purchase */
  quantity: number
}
/** Used to update/create the price of an item. `currencyID` and `currencyName` are not required */
export type WorldCurrencyPriceUpdate = Pick<WorldCurrencyPrice, "price" | "quantity"> | null

export type Item = {
  /** The Unity asset ID, exists only for items that have a Unity asset */
  assetSKU?: string
  consumable: boolean
  consumableCoolDownInSeconds?: number
  consumableDurationInSeconds?: number
  createdAt: string
  creatorID: string
  /** If defined, use custom thumbnail over defaultThumbnailUrl */
  customThumbnailUrl?: string
  defaultThumbnailUrl: string
  description: string
  externalID?: string
  id: string
  name: string
  published: boolean
  scope: ItemScope
  shopListed: boolean
  stackable: boolean
  type: ItemType
  updatedAt: string
  worldCurrencyPrice: WorldCurrencyPrice | null
  worldID: string
  worldName: string
}

export type WorldMemberRole = "admin" | "member" | "owner"

export type World = {
  createdAt: string
  description: string
  displayName: string
  id: string
  members: (CreatorMetadata & { role: WorldMemberRole })[]
  name: string
  spaces: SpaceAndCreator[]
  updatedAt: string
}

export type UnityPackageType =
  | "Avatar"
  | "AvatarAnimation"
  | "AvatarAttachment"
  | "Environment"
  | "PrefabObject"
  | "Space"
  | "SpaceTemplate"

export type UnityPackage = {
  creatorID: string
  creatorName: string
  currentVersion: number
  description: string
  latestSuccessfulVersion: number
  name: string
  packageSource: "Unity"
  packageType: UnityPackageType
  sku: string
  thumbnail: string
}

export type BackpackItem = BackpackItemState & {
  id: string
}

export type ShopItem = ShopItemState & {
  id: string
}

export type CheckoutRequest = {
  idempotencyKey: string
  itemID: string
  quantity: number
  spaceID: string
}
