import { GenericTrack } from "./generic-track"
import { InteractionName } from "./interactions"
import { Properties } from "./properties"

export interface TrackedEvent {
  name: InteractionName
}

export const trackEvent = (track: GenericTrack, action: TrackedEvent, properties?: Properties) => {
  track(`${action.name}`, {
    Name: action.name,
    ...properties,
  })
}
