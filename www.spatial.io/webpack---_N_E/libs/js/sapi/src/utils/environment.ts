import { AssetBuildStatus, SpaceTemplate } from "../types"

/**
 * Determines the status of an space template, which decides whether the user can select it.
 */
export const enum SpaceTemplateProcessingStatus {
  /** Space template is ready to load. UI element IS clickable. */
  Ready = 0,
  /** A brand new package is still processing with no prior successful version. UI element IS NOT clickable. */
  FreshPackage = 1,
  /** An existing package is being updated. The last successful package build will load while the new version is processing. UI element IS clickable. */
  NewVersion = 2,
}

/**
 * Gets the CI processing status of the environment based on the environment metadata SAPI response
 */
export const getSpaceTemplateProcessingStatus = (spaceTemplateMetadata: SpaceTemplate) => {
  if (
    spaceTemplateMetadata?.progress === AssetBuildStatus.Submitted ||
    spaceTemplateMetadata?.progress === AssetBuildStatus.InProgress
  ) {
    return spaceTemplateMetadata?.latestSuccessfulVersion > 0
      ? SpaceTemplateProcessingStatus.NewVersion
      : SpaceTemplateProcessingStatus.FreshPackage
  }

  return SpaceTemplateProcessingStatus.Ready
}
