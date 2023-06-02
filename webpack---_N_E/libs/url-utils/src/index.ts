import { SAPILobbyType, SAPIRoom } from "@spatialsys/js/sapi/types"
import { LobbyType, RoomData } from "@spatialsys/unity/app-state"

export * from "./lib/facebook-share"
export * from "./lib/feature-flag-space"
export * from "./lib/linkedin-share"
export * from "./lib/twitter-share"

export const SPATIAL_PARK_PATH = "park"

export function formatSpacePath(id: string, slug: string, shareID?: string) {
  return `/s/${slug}-${id}${shareID ? `?share=${shareID}` : ""}`
}

export function getRoomIdFromUrl(path: string) {
  return path.split("/").pop()?.split("-").pop()?.split("?").shift()
}

/** Subset type of SAPIRoom for overflow menu */
export type SAPIRoomSubsetSpaceShare = Pick<SAPIRoom, "id" | "slug" | "lobbyType" | "shareID">

export function formatShareUrl(baseUrl: string, room: SAPIRoomSubsetSpaceShare | RoomData) {
  if (room.lobbyType === LobbyType.PublicLobby || room.lobbyType === SAPILobbyType.Public) {
    return `${baseUrl}/${SPATIAL_PARK_PATH}`
  }
  const pathname = formatSpacePath(room.id, room.slug, room.shareID)

  return `${baseUrl}${pathname}`
}
