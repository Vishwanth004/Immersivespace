import { GenericTrack } from "./generic-track"
import { InteractionName, InteractionType } from "./interactions"
import { Properties } from "./properties"
import { TrackedComponents } from "./tracked-components"

export interface TrackedInteraction {
  type: InteractionType
  name: InteractionName
  component?: TrackedComponents | null
}

export const trackInteraction = (track: GenericTrack, action: TrackedInteraction, properties?: Properties) => {
  track(`${action.type}: ${action.name}${action.component ? ` in ${action.component}` : ""}`, {
    Interaction: action.type,
    Name: action.name,
    Component: action.component,
    ...properties,
  })
}
