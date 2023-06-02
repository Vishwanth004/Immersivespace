import { extendTailwindMerge } from "tailwind-merge"

/**
 * Custom tailwind-merge config based on our Tailwind config.
 * Should be updated with `./tailwind.config.ts`
 *
 * @see https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/configuration.md
 * @see https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/recipes.md
 */
export const customTwMerge = extendTailwindMerge({
  // Reference: https://github.com/dcastil/tailwind-merge/blob/v1.12.0/src/lib/default-config.ts
  // Add any styles here that are not tracked by https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/configuration.md#theme
  classGroups: {
    ease: [{ ease: ["emo", "emo-in-out", "emo-out", "emo-cubic"] }],
    "font-family": [{ font: ["body", "heading"] }],
    "font-size": [{ text: ["h1", "h2", "h3", "h4", "h5"] }],
    "font-weight": ["font-demibold"],
    shadow: ["shadow-drawer"],
    "text-shadow": [{ "text-shadow": ["sm", "default", "lg", "xl", "none"] }],
    tracking: ["tracking-heading"],
    z: [{ z: ["above-modal", "drawer", "modal", "overlay"] }],
  },
  // Add any styles here that are tracked by https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/configuration.md#theme
  theme: {
    colors: ["blue", "red", "light-gray"],
  },
})
