/**
 * Converts the given avatar path from the SAPI treatment into a full RPM avatar model URL and thumbnail URL for use in the client
 * @returns formatted avatar model url and thumbnail url
 */
export function formatAvatarModelAndThumbnailUrl(avatarBaseUrl: string, avatarPath: string) {
  const avatarId = avatarPath.split("-").pop()
  const avatarModelUrl = `${avatarBaseUrl}/${avatarPath}/${avatarId}.glb`
  const avatarThumbnailUrl = `${avatarBaseUrl}/${avatarPath}/thumbnail-192.png`

  return { avatarModelUrl, avatarThumbnailUrl }
}
