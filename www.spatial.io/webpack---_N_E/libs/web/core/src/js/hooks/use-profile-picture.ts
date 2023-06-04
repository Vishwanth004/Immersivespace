import { useMemo } from "react"

import { useGetAvatarPreviewQuery } from "@spatialsys/react/query-hooks/sapi/avatar-sdk"
import { useGenerateRpmThumbnailIfNeeded } from "@spatialsys/react/query-hooks/sapi/ready-player-me"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { logger } from "@spatialsys/web/logger"
import { sapiClient } from "@spatialsys/web/sapi"

export const getGenericBodyFullsizeThumbnailPath = (glbPath: string) => glbPath.replace("model.glb", "thumbnail.png")
export const getGenericBodyThumbnailPath = (glbPath: string) => glbPath.replace("model.glb", "thumbnail-192.png")

type UseProfilePictureResponse = {
  imgUrl?: string
  /** Whether we are currently generating a thumbnail. OÇnly applies to RPM avatars */
  isGenerating: boolean
  /** Whether we are currently fetching the thumbnail. Only applies to ASDK avatars */
  isLoading: boolean
}

export const AVATAR_SDK_URL = "api.avatarsdk.com"

/**
 * Gets the avatar thumbnail preview to use depending on the user's current avatar selection.
 * If the user's avatar is an ASDK head, we need to make an API call to ASDK to fetch the image.
 *
 * @param generateRpmThumbnailIfNeeded If true, generates an RPM thumbnail for the current user in the background if needed
 * @returns The `imgUrl` if a thumbnail exists, as well as corresponding loading states.
 */
export function useProfilePicture(
  profilePictureUrl: string,
  generateRpmThumbnailIfNeeded?: boolean
): UseProfilePictureResponse {
  const { user } = useUser()
  const isAvatarSdkImage = useMemo(() => profilePictureUrl?.includes(AVATAR_SDK_URL), [profilePictureUrl])
  const { data: avatarSdkPreviewData, isInitialLoading } = useGetAvatarPreviewQuery(sapiClient, profilePictureUrl, {
    enabled: isAvatarSdkImage,
  })
  const { isGenerating } = useGenerateRpmThumbnailIfNeeded(sapiClient, logger, user, generateRpmThumbnailIfNeeded)

  return {
    isGenerating,
    isLoading: isAvatarSdkImage && isInitialLoading,
    imgUrl: isAvatarSdkImage ? avatarSdkPreviewData?.imgUrl : profilePictureUrl,
  }
}
