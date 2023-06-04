import { ReactNode, useCallback, useMemo } from "react"
import { createContext, useContextSelector } from "use-context-selector"

import { createContextStub } from "@spatialsys/react/util/create-context-stub"

import { GenericTrack } from "../generic-track"
import { Properties } from "../properties"
import { TrackedInteraction, trackInteraction } from "../track-interaction"
import { trackView } from "../track-view"
import { TrackedComponents } from "../tracked-components"

const stub = createContextStub("TrackingContextProvider")
interface ITrackingContext {
  track: GenericTrack
  trackView: (component: TrackedComponents, properties?: Properties) => void
}

export const TrackingContext = createContext<ITrackingContext>({
  track: stub,
  trackView: stub,
})

interface TrackingContextProviderProps {
  track: GenericTrack
  children: ReactNode
}

export function TrackingContextProvider({ track, children }: TrackingContextProviderProps) {
  const _trackView = useCallback(
    (component: TrackedComponents, properties?: Properties) => {
      trackView(track, component, properties)
    },
    [track]
  )

  const value = useMemo(
    () => ({
      track,
      trackView: _trackView,
    }),
    [track, _trackView]
  )

  return (
    <TrackingContext.Provider value={value}>
      <TrackingScopeProvider parentTrackedComponent={"root" as any}>{children}</TrackingScopeProvider>
    </TrackingContext.Provider>
  )
}

export const TrackingScopeContext = createContext<ITrackingScopeContext>({
  trackInteraction: stub,
})

interface ITrackingScopeContext {
  trackInteraction: (action: TrackedInteraction, properties?: Properties) => void
}

interface TrackingScopeProviderProps {
  parentTrackedComponent: TrackedComponents
  children: ReactNode
  properties?: Properties
}

export function TrackingScopeProvider({
  parentTrackedComponent,
  children,
  properties: parentProperties,
}: TrackingScopeProviderProps) {
  const track = useContextSelector(TrackingContext, (context) => context.track)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const propertiesOnMount = useMemo(() => parentProperties, [])
  const scopedTrackInteraction = useCallback(
    ({ type, name, component = parentTrackedComponent }: TrackedInteraction, properties?: Properties) => {
      trackInteraction(track, { type, name, component }, { ...propertiesOnMount, ...properties })
    },
    [track, parentTrackedComponent, propertiesOnMount]
  )

  const value = useMemo(
    () => ({
      trackInteraction: scopedTrackInteraction,
    }),
    [scopedTrackInteraction]
  )

  return <TrackingScopeContext.Provider value={value}>{children}</TrackingScopeContext.Provider>
}
