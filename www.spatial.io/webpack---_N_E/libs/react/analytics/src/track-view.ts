import { GenericTrack } from "./generic-track"
import { InteractionType } from "./interactions"
import { Properties } from "./properties"
import { TrackedComponents } from "./tracked-components"

export const trackView = (track: GenericTrack, component: TrackedComponents, properties?: Properties) => {
  track(`${InteractionType.View}: ${component}`, {
    Interaction: InteractionType.View,
    Component: component,
    ...properties,
  })
}
