import { GetMeetingResponse, GetRoomResponse, SpaceMetadata } from "@spatialsys/js/sapi/types"
import { TrackedComponents } from "@spatialsys/react/analytics"
import {
  AppUpdateAvailability,
  InputManager_InputMethod,
  RequestAlertToReactType,
  SpaceJoinContextState,
  StartupMessage,
} from "@spatialsys/unity/app-state"

/**
 * The body of a message from Unity to React that is displayed as a modal/toast
 * The callback can be executed by invoking `UnityMessages.requestAlertFeedback(callbackID, eniedText)`
 */
export type ReactAlertMessage = {
  /** A unique identifier of what the message is */
  alertType: RequestAlertToReactType
  title: string
  message: string
  permitText: string
  deniedText: string
  callbackID: number
  roomId?: string
  roomSlug?: string
  linkHref?: string
}

export enum ReportCategory {
  Harassment = "Trolling or harassing users",
  Rooms = "Creating portals to offensive rooms",
  Child = "Is a child on an adult account",
  Other = "Other",
  Abuse = "Abuse or harassment",
  HarmfulOrViolent = "Harmful misinformation or glorifying violence",
  Copyright = "Copyright violation",
  Spam = "Spam",
}

/** The message that is passed in `spawnContent` and `replaceObjectContent` */
export interface ContentObject {
  contentId: string
  contentName: string
  contentType: string
  contentSourceType: string
  mimeType?: string
}

export interface EmotesAnalyticsData {
  method: InputManager_InputMethod
  source?: TrackedComponents
}

/**
 * The "source" — surface/screen/page — the user joined the space from.
 */
export const enum SpaceJoinContextSource {
  HeroCarousel = "HeroCarousel",
  Trending = "Trending",
  Popular = "Popular",
  Live = "Live",
  Newest = "Newest",
  Recent = "Recent",
  YourSpaces = "Your Spaces",
  Shared = "Shared",
  Team = "Team",
  ControlsAndTips = "ControlsAndTips",
  Loved = "Loved",
  UserProfile = "User Profile",
  LeaveRecs = "Leave Recs",
  Search = "Search",
  SearchRecs = "Search Recs",
  NoRecentsPlaceholderRecs = "No Recents Placeholder Recs",
  HomeFeed = "Home Feed",
  CategoryPage = "Category Page",
  BadgeModal = "Badge Modal",
}

/**
 * Properties associated with the space that the user is joining.
 */
export type SpaceJoinContextSpaceMetadata = {
  "Title Length"?: number
  "Description Length"?: number
  "Has Custom Thumbnail"?: boolean
  "Num Tags"?: number
}

/**
 * Analytics that apply when the user selects a space from within our app,
 * as opposed to other sources such as a direct link or browser navigation.
 */
export type SpaceItemClickMetadata = {
  "Category ID"?: string
  /** The index of the element within the source, or a section within the source */
  "Space Index"?: number
  /** The index of the section within the overall source, if applicable. */
  "Section Index"?: number
  "On Cubemap Preview"?: boolean
  "On Hover Card"?: boolean
  "On Space Name"?: boolean
  "On Space Thumbnail"?: boolean
  "On Space Trailer"?: boolean
}

export type SourcedSpaceItemClickMetadata = SpaceItemClickMetadata & {
  /** The general page, screen, or component that contained the element that the user clicked on. */
  Source?: SpaceJoinContextSource
}

export type JoinContext = SpaceJoinContextState & {
  spaceProperties?: SpaceJoinContextSpaceMetadata
  discoveryMetadata?: SourcedSpaceItemClickMetadata
}

export const createSpaceMetadataProperties = (space: SpaceMetadata): SpaceJoinContextSpaceMetadata => {
  return {
    "Description Length": space.description?.length,
    "Has Custom Thumbnail": Boolean(space.roomThumbnails.customGetUrl),
    "Num Tags": space.tags?.length,
    "Title Length": space.name?.length,
  }
}

export interface JoinRoomArgs {
  roomId: string
  shareId?: string
  photonSessionId?: string
  spaceData?: GetRoomResponse
  meeting?: GetMeetingResponse
  context?: JoinContext & {
    spaceProperties?: Record<string, string | number | boolean>
    discoveryMetadata?: Record<string, string | number | boolean>
  }
}

/**
 * Message from Unity to React when a quest is completed
 */
export type QuestCompleteMessage = {
  questId: number
}

/**
 * Message from Unity to React when a quest task is completed
 */
export type QuestTaskCompleteMessage = {
  questId: number
  taskId: number
}

/**
 * Message from Unity to react when a badge has been rewarded
 */
export type BadgeRewardedMessage = {
  badgeId: string
}

export type BootstrapResult = {
  startupMessage: StartupMessage
  updateAvailabilityStatus: AppUpdateAvailability
}
