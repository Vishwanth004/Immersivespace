import { AxiosInstance } from "axios"

import {
  FollowUserRequest,
  GetFollowersRequest,
  GetFollowersResponse,
  GetFollowingRequest,
  GetFollowingResponse,
  GetSocialProfileRequest,
  RemoveFollowerRequest,
  SocialProfile,
  SpaceAndCreator,
  UnfollowUserRequest,
} from "../../../types"

export function createUsersServiceEndpoints(client: AxiosInstance) {
  return {
    getSocialProfile: async function (req: GetSocialProfileRequest): Promise<SocialProfile> {
      const response = await client.post<SocialProfile>(`/profile`, req)
      return response.data
    },
    getFollowers: async function (req: GetFollowersRequest): Promise<GetFollowersResponse> {
      const response = await client.post<GetFollowersResponse>(`/followers`, req)
      return response.data
    },
    getFollowing: async function (req: GetFollowingRequest): Promise<GetFollowingResponse> {
      const response = await client.post<GetFollowingResponse>(`/followings`, req)
      return response.data
    },
    followUser: async function (req: FollowUserRequest): Promise<void> {
      const response = await client.post(`/follow`, req)
      return response.data
    },
    unfollowUser: async function (req: UnfollowUserRequest): Promise<void> {
      const response = await client.post(`/unfollow`, req)
      return response.data
    },
    removeFollower: async function (req: RemoveFollowerRequest): Promise<void> {
      const response = await client.post(`/followers/remove`, req)
      return response.data
    },
    getPublishedSpaces: async function (userId: string): Promise<SpaceAndCreator[]> {
      const response = await client.get<SpaceAndCreator[]>(`/spaces/${userId}`)
      return response.data
    },
  }
}

export type UsersServiceEndpoint = ReturnType<typeof createUsersServiceEndpoints>
