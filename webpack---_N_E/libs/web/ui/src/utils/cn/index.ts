import { clsx, type ClassValue } from "clsx"

import { customTwMerge } from "@spatialsys/theme/tailwind-merge"

/**
 * Wrapper around `clsx` that merges Tailwind classes.
 * Should be used for any component that accepts a `className` prop and merges them with Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
