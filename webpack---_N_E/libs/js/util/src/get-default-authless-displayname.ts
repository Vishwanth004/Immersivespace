import { sample } from "lodash"

import { AUTHLESS_DISPLAY_NAME_ADJECTIVES, AUTHLESS_DISPLAY_NAME_VARIANT } from "./data/authless-display-names"

/** helper function to randomly generate an authless user displayname */
export const getDefaultAuthlessDisplayName = () => {
  const defaultAuthlessDisplayName = `${sample(AUTHLESS_DISPLAY_NAME_ADJECTIVES)} ${sample(
    AUTHLESS_DISPLAY_NAME_VARIANT
  )}`

  return defaultAuthlessDisplayName
}
