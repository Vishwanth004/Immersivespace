import { StaticImageData } from "next/legacy/image"

import backupThumbnailGreen from "@spatialsys/assets/img/environment-thumbnails/backup-thumbnail-green.jpg"
import backupThumbnailOrange from "@spatialsys/assets/img/environment-thumbnails/backup-thumbnail-orange.jpg"
import backupThumbnailPink from "@spatialsys/assets/img/environment-thumbnails/backup-thumbnail-pink.jpg"

export const backupThumbnails: readonly StaticImageData[] = [
  backupThumbnailPink,
  backupThumbnailOrange,
  backupThumbnailGreen,
]

/**
 * Deterministically selects a backup thumbnail using spaceId
 * Converts the first character of the space id into an UTF-16 charcode (int), then x % (# of backup thumbnails)
 */
export const getBackupThumbnailForSpace = (spaceId: string) => {
  const charCode = spaceId.charCodeAt(spaceId.length - 1)
  return backupThumbnails[charCode % backupThumbnails.length].src
}
