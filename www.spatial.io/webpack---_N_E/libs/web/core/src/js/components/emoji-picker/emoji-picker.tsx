import { once } from "lodash"
import { Suspense, lazy } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"

const EmojiMartPicker = lazy(() =>
  import("@emoji-mart/react").then((module) => ({
    default: module.default,
  }))
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const loadEmojis = once(async () => (await import("@emoji-mart/data")).default)

/**
 * Wrapper around the [Picker component from emoji-mart](https://github.com/missive/emoji-mart#-picker)
 * The Picker component is lazy loaded, as well as the data for the emojis.
 * Emoji-mart does not have complete types yet, but they are actively working on adding types.
 */
export const EmojiPicker = (props: any) => {
  return (
    <Suspense fallback={null}>
      <TrackedComponent as="div" id={TrackedComponents.EmojiPicker}>
        <EmojiMartPicker
          data={async () => {
            const data = await loadEmojis()
            return data
          }}
          {...props}
        />
      </TrackedComponent>
    </Suspense>
  )
}
