import { getRoomIdFromUrl } from "../index"

type FeatureFlagSpace = {
  path: string
  id: string
}

/**
 * Get the space path and id from feature flag value
 * @param featureFlagSpacePath `disabled` or a space path in form of `/s/[slugId]?share=[shareId]`
 */
export function getFeatureFlagSpace(featureFlagSpacePath: string | undefined): FeatureFlagSpace | undefined {
  if (!featureFlagSpacePath || featureFlagSpacePath === "disabled") {
    return undefined
  }
  const id = getRoomIdFromUrl(featureFlagSpacePath)
  if (!id) {
    return undefined
  }
  return {
    path: featureFlagSpacePath,
    id: id,
  }
}
