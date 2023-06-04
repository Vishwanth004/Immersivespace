// Should match `animations.scss` in `web/core` (legacy file location)

type Transition = [number, number, number, number]

export const EMO: Transition = [0.4, 0, 0.2, 1]
export const EMO_IN_OUT: Transition = [0.4, 0, 0.2, 1]
export const EMO_OUT: Transition = [0, 0.2, 0.2, 1]
export const OUT_CUBIC: Transition = [0.33, 1, 0.68, 1]

// https://tailwindcss.com/docs/transition-timing-function#customizing-your-theme
export const toTailwindTransition = (transition: Transition) => {
  return `cubic-bezier(${transition.join(", ")})`
}
