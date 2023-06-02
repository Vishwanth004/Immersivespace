import { AxiosInstance, AxiosResponse } from "axios"

import { LogChannel } from "@spatialsys/js/logger"
import { TemplateState } from "@spatialsys/unity/app-state"

import { GetFileResponse, SAPIFile } from "../../../types"
import { Blockchain } from "./integrations"

export type CMSType =
  | "creatorToolkit"
  | "drive" // google drive
  | "environment"
  | "files" // uploaded files
  | "furniture" // new furniture models added in v4 version of demo assets
  | "msft" // microsoft 365/onedrive etc
  | "nft" // nft items
  | "photo" // in-app screenshots (e.g. selfie stick)
  | "recent" // sorted by most recent date
  | "roomTemplates" // saved room templates
  | "sketchfab" // sketchfab models
  | "stuff" // everything

export type CMSContentType =
  | "3D_MODEL"
  | "CREATOR_TOOLKIT_PREFAB"
  | "ENVIRONMENT"
  | "GIF"
  | "IMAGE_COLLECTION"
  | "IMAGE"
  | "REMOTE_ASSET"
  | "ROOM_TEMPLATE"
  | "UNKNOWN"
  | "VIDEO"

export type CMSContentSourceType =
  | "DIRECT_UPLOAD"
  | "GOOGLE"
  | "MICROSOFT_GRAPH"
  | "OPENSEA_ASSET"
  | "REMOTE_ASSET"
  | "SKETCHFAB_ASSET"
  | "UNITY_PACKAGE"
  | "UNKNOWN"

export interface CMSPreviewFile {
  contentSourceType: CMSContentSourceType
  contentType: CMSContentType
  creator?: string
  id: string
  /** ex: 2020-11-11T21:01:44.346Z */
  lastModified: string
  name: string
  ownerID: string
  size: number
  /** ex: https://spatial-demo-assets.s3.amazonaws.com/v1/heart/heart.png */
  thumbnail: string
  url?: string
}

export interface GetContentResponse {
  fileList: CMSPreviewFile[]
  nextCursor: number
}

export interface GetContentArgs {
  chain?: Blockchain
  cmsType: CMSType
  /** The number of items to offset by, given by `nextCursor` in the response. Defaults to 0 */
  offset?: number
  search?: string
  /** Required if `cmsType === "nft"` */
  walletAddress?: string
}
export type ContentItemVisibilityRequest = { idList: { hidden: boolean; id: string }[] }

export interface GetContentMenuRequestArgs {
  address?: string
  chain?: string
  offset?: string
  query?: string
  search?: string
}

export type CreateFileUploadResponse = {
  file: SAPIFile
  fileUrls: { getUrl: string; putUrl: string }
}

const FILE_UPLOAD_TIMEOUT = 5 * 60 * 1000 // 5 minutes

export const ContentManagementLogChannel = new LogChannel("ContentManagement")

export function createContentEndpoints(client: AxiosInstance) {
  return {
    /**
     * Gets the full file object from SAPI
     * @param fileId fileId of the file you are trying to get
     */
    getFile: async function (fileId: string): Promise<GetFileResponse> {
      const response = await client.get<GetFileResponse>(`/files/${fileId}`)
      return response.data
    },
    getContentMenu: async function (args: GetContentArgs): Promise<GetContentResponse> {
      const { chain, cmsType, search, offset = 0, walletAddress } = args
      const params: GetContentMenuRequestArgs = {}
      params["query"] = cmsType
      params["search"] = search
      params["offset"] = offset.toString()
      if (walletAddress) {
        params["address"] = walletAddress
      }
      if (chain) {
        params["chain"] = chain
      }
      const response = await client.get<GetContentResponse>(`/contentMenu/`, { params })
      return response.data
    },
    getTemplates: async function (): Promise<TemplateState[]> {
      const response = await client.get<{ fileList: TemplateState[] }>(`/contentMenu/`, {
        params: { query: "roomTemplates" },
      })
      return response.data.fileList
    },
    findTemplateIDsWithName: async function (name: string): Promise<string[]> {
      const response = await client.get<{ fileIDs: string[] }>(`/files/templates/search`, {
        params: { name },
      })
      return response.data.fileIDs ?? []
    },
    failedFileUpload: async function (fileID: string): Promise<any> {
      const response = await client.post<any>(`/files/${fileID}/complete`, { uploadState: "FAILED" })
      return response.data
    },
    createFileUpload: async function (
      name: string,
      size: number,
      roomID: string,
      contentType: string
    ): Promise<CreateFileUploadResponse> {
      const response = await client.post<CreateFileUploadResponse>(
        `/files/`,
        {
          contentType,
          name,
          size,
          roomID,
        },
        // Uploading a file could take a while... cap it at 5 minutes
        { timeout: FILE_UPLOAD_TIMEOUT }
      )
      return response.data
    },
    toggleContentItemVisibility: async function (body: ContentItemVisibilityRequest): Promise<any> {
      const response = await client.post<any>(`/cms/hide`, body)
      return response.data
    },
    completeFileUpload: async function (fileID: string): Promise<AxiosResponse<any>> {
      return await client.post<any>(
        `/files/${fileID}/complete`,
        { uploadState: "UPLOADED" },
        // Uploading a file could take a while... cap it at 5 minutes
        { timeout: FILE_UPLOAD_TIMEOUT }
      )
    },
  }
}

export type ContentEndpoint = ReturnType<typeof createContentEndpoints>
