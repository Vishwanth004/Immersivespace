import { SpaceTemplateVariant } from "@spatialsys/js/sapi/types"

/**
 * Converts a space template variant index based on the space template variant order in the UI to the variant index defined in Unity.
 * Variants may appear in a different order, so we will need to use the variant's ID as the "actual" index to load.
 * If the variant ID is not a numerical index and is actually a unique ID, then the converted variant index will fallback to the original index.
 */
export function convertSpaceTemplateVariantIndex(index: number, variant: SpaceTemplateVariant) {
  let result: number = index

  // Empty string is not be parsed as NaN
  if (variant.id) {
    const parsedIdAsIndex = Number(variant.id)

    if (!isNaN(parsedIdAsIndex)) {
      result = parsedIdAsIndex
    }
  }

  return result
}
