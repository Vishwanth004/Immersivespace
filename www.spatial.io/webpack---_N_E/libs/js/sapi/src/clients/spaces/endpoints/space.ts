import { AxiosInstance } from "axios"

import { FeedCategory, GetMeetingResponse, JoinChatResponse, SpaceAndCreator } from "../../../types"

/** Note: must use lower case string, as axios lower cases all headers (see https://axios-http.com/docs/res_schema) */
const AUTHLESS_TOKEN_HEADER = "room-access-token"

export interface SetSpaceLovedRequest {
  isLoved: boolean
  spaceId: string
}

export interface SetCustomThumbnailRequest {
  roomId: string
  thumbnail: Blob
}

export interface SetCustomThumbnailResponse {
  customGetUrl: string
}

export interface DeleteCustomThumbnailRequest {
  roomId: string
}

export type GetTagAutocompleteRequest = {
  query: string
}

type GetTagAutocompleteResponseTag = {
  name: string
}

export type GetTagAutocompleteResponse = {
  query: string
  tags: GetTagAutocompleteResponseTag[]
}

export type ReportSpaceRequest = {
  category: string
  includeImage?: boolean
  reason?: string
  spaceId: string
  stopPromoting?: boolean
}

export type ReportSpaceResponse = {
  reportID: string
}

export type UploadReportImageRequest = {
  image: Blob
  reportId: string
  spaceId: string
}

export type GetMeetingResponseParsed = GetMeetingResponse & { newAuthlessToken?: string }

export function createSpaceEndpoints(client: AxiosInstance) {
  return {
    getMeeting: async function (spaceId: string): Promise<GetMeetingResponseParsed> {
      const response = await client.get<GetMeetingResponse>(`/rooms/${spaceId}/meeting`)
      return {
        ...response.data,
        newAuthlessToken: response.headers[AUTHLESS_TOKEN_HEADER],
      }
    },
    /**
     * Returns information about a space. Can be called without authentication.
     */
    getSpacePreview: async function (spaceId: string) {
      const response = await client.get<SpaceAndCreator>(`/${spaceId}/preview`)
      return response.data
    },
    setSpaceLoved: async function ({ spaceId, isLoved }: SetSpaceLovedRequest): Promise<void> {
      await client.post<void>(`/rooms/${spaceId}/${isLoved ? "like" : "unlike"}`)
    },
    // TODO: Update joinChat to use POST instead of GET when the backend is updated(SAPI PR #1911)
    joinChat: async function (meetingId: string): Promise<JoinChatResponse> {
      const response = await client.get<JoinChatResponse>(`/meetings/${meetingId}/joinChat`)
      return response.data
    },
    setCustomThumbnail: async function ({
      roomId,
      thumbnail,
    }: SetCustomThumbnailRequest): Promise<SetCustomThumbnailResponse> {
      const response = await client.post<SetCustomThumbnailResponse>(`/rooms/${roomId}/thumbnail`, thumbnail)
      return response.data
    },
    deleteCustomThumbnail: async function ({ roomId }: DeleteCustomThumbnailRequest): Promise<void> {
      await client.delete<void>(`/rooms/${roomId}/thumbnail`)
      return
    },
    getTagAutocomplete: async function ({ query }: GetTagAutocompleteRequest) {
      const response = await client.get<GetTagAutocompleteResponse>(`/tags?query=${encodeURIComponent(query)}`)
      return response.data
    },
    getSpaceCategories: async function (spaceId: string): Promise<FeedCategory[]> {
      const response = await client.get<FeedCategory[]>(`/rooms/${spaceId}/categories`)
      return response.data
    },
    async reportSpace({ spaceId, ...bodyRequest }: ReportSpaceRequest): Promise<ReportSpaceResponse> {
      const response = await client.post<ReportSpaceResponse>(`/rooms/${spaceId}/report`, bodyRequest)
      return response.data
    },
    async uploadReportImage({ spaceId, reportId, image }: UploadReportImageRequest): Promise<void> {
      await client.post<void>(`/rooms/${spaceId}/report/image?reportID=${reportId}`, image)
    },
  }
}

export type SpaceEndpoint = ReturnType<typeof createSpaceEndpoints>
