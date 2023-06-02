import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import {
  GetAvatarAnimationsResponse,
  GetAvatarsResponse,
  GetSpaceTemplatesResponse,
  SapiContentClient,
} from "@spatialsys/js/sapi/clients/content"

const cachingOptions = {
  retry: 1,
  cacheTime: Infinity,
  staleTime: 300 * 1000, // 5 minutes; content rarely changes, and user can hard refresh if they need the updated list quicker.
}

const GET_SPACE_TEMPLATES_KEY = "getSpaceTemplates"
export const useGetSpaceTemplatesQuery = (
  sapiContentClient: SapiContentClient,
  options?: UseQueryOptions<GetSpaceTemplatesResponse, unknown, GetSpaceTemplatesResponse, string[]>
) => {
  return useQuery({
    queryKey: [GET_SPACE_TEMPLATES_KEY],
    queryFn: () => sapiContentClient.content.getSpaceTemplates(),
    ...cachingOptions,
    ...options,
  })
}

const GET_AVATARS_KEY = "getAvatars"
export const useGetAvatarsQuery = (
  sapiContentClient: SapiContentClient,
  options?: UseQueryOptions<GetAvatarsResponse, unknown, GetAvatarsResponse, string[]>
) => {
  return useQuery({
    queryKey: [GET_AVATARS_KEY],
    queryFn: () => sapiContentClient.content.getAvatars(),
    ...cachingOptions,
    ...options,
  })
}

const GET_AVATAR_ANIMATIONS_KEY = "getAvatarAnimations"
export const useGetAvatarAnimationsQuery = (
  sapiContentClient: SapiContentClient,
  options?: UseQueryOptions<GetAvatarAnimationsResponse, unknown, GetAvatarAnimationsResponse, string[]>
) => {
  return useQuery({
    queryKey: [GET_AVATAR_ANIMATIONS_KEY],
    queryFn: () => sapiContentClient.content.getAvatarAnimations(),
    ...cachingOptions,
    ...options,
  })
}
