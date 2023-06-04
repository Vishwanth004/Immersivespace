import { AxiosInstance } from "axios"

import { Avatar, AvatarAnimation, PrefabObject, SpaceTemplate } from "../../../types"

export interface GetSpaceTemplatesResponse {
  spaceTemplates: SpaceTemplate[]
}

export interface GetAvatarsResponse {
  avatars: Avatar[]
}

export interface GetAvatarAnimationsResponse {
  avatarAnimations: AvatarAnimation[]
}

export interface GetPrefabObjectsResponse {
  prefabObjects: PrefabObject[]
}

export function createContentEndpoints(client: AxiosInstance) {
  return {
    /**
     * @returns All space templates that the current user can select, including Creator Toolkit space templates published by the current user.
     */
    async getSpaceTemplates(): Promise<GetSpaceTemplatesResponse> {
      const resp = await client.get<GetSpaceTemplatesResponse>("/space-templates")
      return resp.data
    },
    /**
     * @returns All avatar packages that the current user published using the Creator Toolkit.
     */
    async getAvatars(): Promise<GetAvatarsResponse> {
      const resp = await client.get<GetAvatarsResponse>("/avatars")
      return resp.data
    },
    /**
     * @returns All avatar animations available to the current user, including those published using the Creator Toolkit.
     */
    async getAvatarAnimations(): Promise<GetAvatarAnimationsResponse> {
      const resp = await client.get<GetAvatarAnimationsResponse>("/avatar-animations")
      return resp.data
    },
    /**
     * @returns All prefab object packages that the current user published using the Creator Toolkit.
     */
    async getPrefabObjects(): Promise<GetPrefabObjectsResponse> {
      const resp = await client.get<GetPrefabObjectsResponse>("/prefab-objects")
      return resp.data
    },
  }
}

export type ContentEndpoints = ReturnType<typeof createContentEndpoints>
