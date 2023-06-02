import { AxiosInstance } from "axios"

import { PlayerColors } from "@spatialsys/js/util/player-colors"
import {
  AppearanceCustomizationState,
  CustomEnvironmentState,
  RoomData_ShareSetting,
  SceneState,
  TransformWithValue,
} from "@spatialsys/unity/app-state"

import {
  AvatarData,
  GetRoomArgs,
  GetRoomResponse,
  SAPIRoom,
  SAPIShareSetting,
  SAPISpaceType,
  TokenGateConfig,
} from "../../../types"

export type ShareSettingResponse = {
  directlyInvitedGuests: { [userID: string]: InvitedGuestUserProfile }
  publicLink: boolean
  shareID?: string
  shareSetting: SAPIShareSetting
}

export type AccountCompletionStatus =
  | "COMPLETE" // Done onboarding
  | "INVITED" // User invited by email through orgs or through room share
  | "NOT_VERIFIED" // User has created an account, but hasn't verified their email yet
  | "ONBOARDING" // needs to go through onboarding flow
  | "REGISTERING" // User has created an account, but still need to provide vital information (e.g. email)

export interface BasicUserProfile {
  avatarData: AvatarData
  displayName: string
  email: string
  id: string
}

export interface InvitedGuestUserProfile extends BasicUserProfile {
  accountCompletionStatus: AccountCompletionStatus
  playerColor: string
}

/** Temporary Map Rooms for Public Link Migration. Will be removed in DEV-5173 */
function publicLinkRoomMapper(room: SAPIRoom): SAPIRoom {
  if (room.shareSetting === "PUBLIC_LINK") {
    room.publicLink = true
    room.shareSetting = room.organizationOwnerID ? "ORG" : "PRIVATE"
  }
  return room
}

export function SAPIShareSettingFromUnity(unity: RoomData_ShareSetting): SAPIShareSetting {
  switch (unity) {
    case RoomData_ShareSetting.Organization:
      return "ORG"
    case RoomData_ShareSetting.Private:
      return "PRIVATE"
    case RoomData_ShareSetting.PublicLink:
    case RoomData_ShareSetting.None:
    default:
      return "PUBLIC_LINK"
  }
}

export function UnityFromSAPIShareSetting(sapi: SAPIShareSetting): RoomData_ShareSetting {
  switch (sapi) {
    case "ORG":
      return RoomData_ShareSetting.Organization
    case "PRIVATE":
      return RoomData_ShareSetting.Private
    case "PUBLIC_LINK":
    default:
      return RoomData_ShareSetting.PublicLink
  }
}

export interface GetRoomsArgs {
  count: number
  queryType: SAPISpaceType
  start?: number
}

export interface GetNoAuthTokenArgs {
  noAuthUserID: string
  roomId: string
  roomShareID: string
}

export type GetLiveswitchTokenResponse = {
  liveswitchToken: string
}

export interface GetNoAuthTokenResponse {
  expiresIn: number
  tempToken: string
}

export interface EditRoomRequest {
  description?: string
  name: string
  roomId: string
  tags?: string[]
}

export interface EditShareSettingRequest {
  emails: string[]
  publicLink: boolean
  roomId: string
  shareSetting: SAPIShareSetting
}

export interface RemoveInvitedUsersRequest {
  roomId: string
  userIDs: string[]
}

export interface InviteUsersRequest {
  emails: string[]
  roomId: string
}

export interface DeleteRoomRequest {
  roomId: string
}

export interface SetTokenGateAccessRequest {
  config: TokenGateConfig
  roomId: string
}

export type GetTokenGateAccessResponse = TokenGateConfig

export type ParticipantProfile = {
  appearanceCustomization: AppearanceCustomizationState
  clientPlatform: string
  displayName: string
  id: string
  playerColors: PlayerColors
  profilePicURL: string

  // Also has Permissions[], but we don't have that type yet. It's not used, so just ignore it for now
  // permissions: Permissions[];
}

interface GetRoomContentsResponseInternal {
  data: string
  polymerData: string
}

export interface GetRoomContentsResponse {
  polymerData: {
    data: {
      customEnvironment: CustomEnvironmentState
      // Fix the transforms type
      // Unity defines it as just `localPosition`, but we actually accessing it using
      // `localPosition.value`
      scene: SceneState & { transforms: { [key: number]: TransformWithValue } }
    }
    version: number
  }
}

export type GetRoomsResponse = { paging: { total: number }; rooms: SAPIRoom[] }

export function createRoomsEndpoints(client: AxiosInstance) {
  return {
    // DEPRECATED
    // This is only kept around as a comment since it maybe used
    // in mobile authless (https://www.notion.so/spatialxr/View-Join-Spaces-Authless-on-mobile-7cb623b2abf24fcb8c01512e5fc20dc8)
    //
    /* getRooms: async function (args: GetRoomsArgs): Promise<GetRoomsResponse> {
      const response = await client.get<{ rooms: SAPIRoom[]; paging: { total: number } }>(`/rooms/`, { params: args })
      return { ...response.data, rooms: response.data.rooms.map(publicLinkRoomMapper) }
    }, */
    /* searchRooms: async function (query: string): Promise<{ rooms: SAPIRoom[] }> {
      const response = await client.get<{ rooms: SAPIRoom[] }>(`/rooms/`, {
        params: { query, queryType: SAPISpaceType.Search, count: 50 },
      })
      response.data.rooms = response.data.rooms.map(publicLinkRoomMapper)
      return response.data
    }, */
    /*     editRoomShareSetting: async function ({
      roomId,
      shareSetting,
      publicLink,
      emails,
    }: EditShareSettingRequest): Promise<any> {
      const response = await client.post<any>(`/rooms/${roomId}/share`, { shareSetting, publicLink, emails })
      return response.data
    }, */
    /* inviteRoomUsers: async function ({ roomId, emails }: InviteUsersRequest): Promise<any> {
      const response = await client.post<any>(`/rooms/${roomId}/share/invite`, { emails })
      return response.data
    }, */

    /**
     * Gets the latest Spatial Park instance for users to join
     */
    getSpatialPark: async function (): Promise<SAPIRoom> {
      const response = await client.get<{ rooms: SAPIRoom[] }>(`/rooms/`, {
        params: { queryType: SAPISpaceType.PublicPark },
      })
      return publicLinkRoomMapper(response.data.rooms[0])
    },
    getRoom: async function (args: GetRoomArgs): Promise<GetRoomResponse> {
      const response = await client.get<GetRoomResponse>(`/rooms/get/${args.roomId}`)
      response.data.roomData = publicLinkRoomMapper(response.data.roomData)
      return response.data
    },
    editRoomDetails: async function ({ roomId, name, description, tags }: EditRoomRequest): Promise<any> {
      const response = await client.patch(`/rooms/${roomId}/edit`, {
        name,
        description,
        tags,
      })
      return response.data
    },
    getRoomContents: async function ({ roomId }: GetRoomArgs): Promise<GetRoomContentsResponse> {
      const { data } = await client.get<GetRoomContentsResponseInternal>(`/rooms/${roomId}/contents/`)
      const polymerData = JSON.parse(data.polymerData)
      return { polymerData } as GetRoomContentsResponse
    },
    deleteRoom: async function ({ roomId }: DeleteRoomRequest): Promise<any> {
      const response = await client.post<any>(`/rooms/delete/${roomId}`, {})
      return response.data
    },
    generateLiveswitchToken: async function (
      deviceId: string,
      channelIds: string[]
    ): Promise<GetLiveswitchTokenResponse> {
      const response = await client.post<GetLiveswitchTokenResponse>(`/liveswitch/token`, {
        deviceId,
        channelIds,
      })
      return response.data
    },
    getNoAuthToken: async function ({
      roomId,
      roomShareID,
      noAuthUserID,
    }: GetNoAuthTokenArgs): Promise<GetNoAuthTokenResponse> {
      const response = await client.post<GetNoAuthTokenResponse>(`/rooms/noauth/${roomId}`, {
        roomShareID,
        noAuthUserID,
      })
      return response.data
    },

    setTokenGateAccess: async function ({ roomId, config }: SetTokenGateAccessRequest): Promise<void> {
      const response = await client.put<void>(`/rooms/${roomId}/nft/gate`, {
        config,
      })

      return response.data
    },

    getTokenGateAccess: async function (roomId: string): Promise<GetTokenGateAccessResponse> {
      const response = await client.get<GetTokenGateAccessResponse>(`/rooms/${roomId}/nft/gate`)
      return response.data
    },

    removeInvitedUsers: async function ({ roomId, userIDs }: RemoveInvitedUsersRequest): Promise<any> {
      const response = await client.delete<any>(`/rooms/${roomId}/share/invite`, { data: { userIDs } })
      return response.data
    },
  }
}

export type RoomsEndpoint = ReturnType<typeof createRoomsEndpoints>
