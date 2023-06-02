import axios, { AxiosInstance, AxiosResponse } from "axios"

import { LogChannel } from "@spatialsys/js/logger"

import { AvatarData } from "../../../types"

export interface AvatarSdkToken {
  accessToken: string
  tokenType: string
}

export const AvatarSDKLogChannel = new LogChannel("AvatarSDK")

export const enum AvatarSdkStatus {
  Completed = "Completed",
  Computing = "Computing",
  Failed = "Failed",
  Queued = "Queued",
  TimedOut = "Timed Out",
  Uploading = "Uploading",
}

/**
 * From https://api.avatarsdk.com/#avatar-dto
 */
export type AvatarSdkDto = {
  /** Absolute URL to retrieve zip archive of available blendshapes
   * for this avatar model
   */
  blendshapes: string
  /** Avatar identifier */
  code: string
  /** ISO 8601 datetime */
  created_on: string
  /** ISO 8601 last change datetime. May be `null` if haven't changed yet since creation */
  ctime: string
  /** Avatar description */
  description: string
  /** Absolute URL to retrieve list of available avatar exports for this avatar model */
  exports: string
  /** Absolute URL to retrieve list of available haircuts for this avatar model */
  haircuts: string
  /** Absolute URL to retrieve zip with mesh of avatar */
  mesh: string
  /** Absolute URL to retrieve JSON object with this avatar meta-information */
  model_info: string
  /** Avatar name */
  name: string
  /** Pipeline used to calculate avatar */
  pipeline: string
  /** Current progress of avatar status. Integer in the range [0:100] */
  progress: number
  /** Avatar models computing status. One of [Uploading, Queued, Computing, Completed, Failed, Timed Out] */
  status: AvatarSdkStatus
  /** Absolute URL to retrieve jpeg texture of avatar */
  texture: string
  /** Absolute URL to retrieve Avatar source image thumbnail */
  thumbnail: string
  /** Absolute URL to this DTO */
  url: string
}

/** From https://api.avatarsdk.com/#player-dto */
export type AvatarSdkPlayer = {
  /** Player unique identifier (PlayerUID) */
  code: string
  /** May be used to contain arbitrary information for your taste */
  comment: string
  /** ISO 8601 datetime */
  created_on: string
  /** Absolute URL to this DTO */
  url: string
}

export type CreateAvatarArgs = {
  file: File
  playerUid: string
  token: AvatarSdkToken
  userId: string
}

/**
 * Example:
 * {
 * 	"url": "https://api.avatarsdk.com/avatars/eb97b994-448e-4fc0-9644-cb2bcc808f66/",
 * 	"code": "eb97b994-448e-4fc0-9644-cb2bcc808f66",
 * 	"status": "Uploading",
 * 	"progress": 0,
 * 	"created_on": "2022-03-30T16:29:00.853846Z",
 * 	"name": "6244728312db460001a7f4fd",
 * 	"description": ""
 * }
 *
 */
export type CreateAvatarResponse = {
  code: string
  created_on: string
  description: string
  name: string
  progress: number
  status: string
  url: string
}

export interface AvatarPreviewResponse {
  blob: Blob
  imgUrl: string
}

/**
 * The naming of these fields from RPM is confusing.
 * "fullbody" should be used with "full body avatars" to get the upper body
 * "halfbody" should be used with "half body avatars" to get the upper body
 * I've renamed them in the enum for more clarity
 */
export const enum RpmRenderApiScene {
  FullBodyPostureV1Transparent = "fullbody-posture-v1-transparent",
  LowerBodyPortraitTransparentV1 = "halfbody-portrait-v1-transparent",
  LowerBodyPortraitV1 = "halfbody-portrait-v1",
  /**
   * A special field made for us. Similar to `UpperBodyV1`, but with a more natural pose
   * and centered head.
   * See https://spatialsys.slack.com/archives/C02M20P6883/p1651168676936979?thread_ts=1651098734.143559&cid=C02M20P6883
   */
  UpperBodyTransparentSpatial = "fullbody-portrait-spatial-transparent",
  UpperBodyTransparentV1 = "fullbody-portrait-v1-transparent",
  UpperBodyV1 = "fullbody-portrait-v1",
}

export type RpmRenderApiRequest = {
  /**
   * Special options to be used only when the scene is `fullbody-portrait-spatial-transparent`
   * Results in a more relaxed pose compared to the default avatar pose
   */
  armature?: "ArmatureTargetFemale" | "ArmatureTargetMale"
  /** Map of 3D meshes to their blend shapes */
  blendShapes?: Record<string, any>
  /** The glb of the Avatar 3D Model */
  model: string
  scene: RpmRenderApiScene
}

export type RpmRenderApiResponse = {
  /** List of output renders URLs (at least one). */
  renders: string[]
}

/**
 * The response when you replace the `.glb` of an RPM avatar model URL with `.json`
 * See https://spatialsys.slack.com/archives/C02M20P6883/p1651171330592429?thread_ts=1651098734.143559&cid=C02M20P6883
 * This is subject to change, but necessary to determine the gender of an avatar, used
 * to generate a thumbnail
 */
export type RpmAvatarJsonMetadata = {
  bodyType: "fullbody" | "halfbody"
  outfitGender: "feminine" | "masculine"
  outfitVersion: number // latest is `2`
}

const RPM_RENDER_API_URL = "https://render.readyplayer.me/render"

export function createAvatarEndpoints(client: AxiosInstance) {
  return {
    getAvatarSdkToken: async function (): Promise<AvatarSdkToken> {
      const response = await client.get<AvatarSdkToken>(`/avatars/token`)
      return response.data
    },
    createAvatarSDKUser: async function (user: string, token: AvatarSdkToken): Promise<AxiosResponse<any>> {
      const fd = new FormData()
      fd.append("comment", user)
      const response = await axios.post(`https://api.avatarsdk.com/players/`, fd, {
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      return response
    },
    /** https://api.avatarsdk.com/#id43 */
    uploadAvatar: async function (args: CreateAvatarArgs): Promise<AxiosResponse<CreateAvatarResponse>> {
      const { userId, file, token, playerUid } = args
      const parameters = {
        model_info: {
          plus: ["gender", "facial_landmarks_68", "hair_color", "skin_color", "eye_sclera_color", "eye_iris_color"],
        },
        avatar_modifications: {
          plus: {
            remove_smile: true,
            enhance_lighting: true,
            repack_texture: true,
          },
          spatial: {
            repack_texture: true,
          },
        },
        blendshapes: {
          base: ["legacy_45"],
        },
      }
      const fd = new FormData()
      fd.append("name", userId)
      fd.append("pipeline", "head_1.2")
      fd.append("pipeline_subtype", "base/legacy")
      fd.append("parameters", JSON.stringify(parameters))
      fd.append("photo", file)
      return await axios.post<CreateAvatarResponse>(`https://api.avatarsdk.com/avatars/`, fd, {
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
          "X-PlayerUID": playerUid,
          "Content-Type": "multipart/form-data",
        },
      })
    },
    getAvatarInfo: async function (
      code: string,
      token: AvatarSdkToken,
      playerUid: string
    ): Promise<AxiosResponse<AvatarSdkDto>> {
      const response = await axios.get<AvatarSdkDto>(`https://api.avatarsdk.com/avatars/${code}/`, {
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
          "X-PlayerUID": playerUid,
          "Content-Type": "multipart/form-data",
        },
      })
      if (response.data.status === "Failed") {
        throw new Error("Avatar SDK generation failed")
      }
      return response
    },
    /**
     * Gets the avatar preview thumbnail proxied through SAPI.
     * example preview URL: "https://api.avatarsdk.com/avatars/19d378f5-c4a7-45e1-8148-eabaa962cfde/preview/"
     **/
    getAvatarPreview: async function (previewUrl: string) {
      const response = await client.post<Blob>(`/avatars/preview`, { previewUrl }, { responseType: "blob" })
      const url = URL.createObjectURL(response.data)
      return { blob: response.data, imgUrl: url }
    },
    saveAvatarData: async function (avatarData: AvatarData): Promise<void> {
      const response = await client.post<void>(`/users/avatardata`, avatarData)
      return response.data
    },
    uploadToS3: async function (file: File): Promise<AxiosResponse<any>> {
      const response = await client.get(`/users/avatarUrl/${file.name}`)
      return await axios.put(response.data.putUrl, file)
    },
    /** See https://docs.readyplayer.me/render-api/render-api for full docs */
    createRpmThumbnail: async function (data: RpmRenderApiRequest): Promise<RpmRenderApiResponse> {
      const response = await axios.post<RpmRenderApiResponse>(
        RPM_RENDER_API_URL,
        data,
        // Set a very high timeout, since this request is very slow — easily takes > 20s.
        { timeout: 60000 }
      )
      return response.data
    },
    /** Gets JSON metadata for an RPM avatar. */
    getRpmAvatarMetadata: async function (glbUrl: string): Promise<RpmAvatarJsonMetadata> {
      const response = await axios.get<RpmAvatarJsonMetadata>(glbUrl.replace(".glb", ".json"))
      return response.data
    },
  }
}

export type AvatarEndpoint = ReturnType<typeof createAvatarEndpoints>
