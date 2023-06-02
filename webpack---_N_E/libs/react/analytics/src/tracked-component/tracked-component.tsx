import { ComponentType, ReactNode, useEffect, useState } from "react"
import { InView, useInView } from "react-intersection-observer"
import { useContextSelector } from "use-context-selector"

import { getDisplayName } from "@spatialsys/react/util/get-display-name"

import { Properties } from "../properties"
import { TrackedComponents } from "../tracked-components"
import { TrackingContext, TrackingScopeContext, TrackingScopeProvider } from "./tracking-context"

type InViewOptions = Parameters<typeof useInView>[0]

export interface TrackedComponentProps {
  id: TrackedComponents
  properties?: Properties
  viewOptions?: InViewOptions
}

type HtmlProps = Omit<React.HTMLProps<HTMLElement>, "onChange">

/**
 * Sends a view event when the component is visible using an IntersectionObserver,
 * and sets the given `TrackedComponents` as the parentTrackedComponent in context, as consumed by {@link useTrackInteraction}.
 * Wraps the component in a span by default, can be overriddein with the `as` prop.
 * To avoid the extra element, use the {@link useTrackView} hook.
 *
 * In the absence of the IntersectionObserver, fallsback to being in view and sending the view event.
 * @param props
 * @returns
 */
export function TrackedComponent({
  id,
  properties,
  children,
  viewOptions,
  ...props
}: TrackedComponentProps & { children: ReactNode } & HtmlProps) {
  const [inView, setInView] = useState(false)
  const trackView = useContextSelector(TrackingContext, (context) => context.trackView)

  const viewEventDeps: any[] = [id, inView, trackView]
  if (properties) {
    // Spreading the object into the deps array so using `properties` doesn't require using `useMemo`
    viewEventDeps.push(...Object.keys(properties), ...Object.values(properties))
  }
  useEffect(() => {
    if (inView) {
      trackView(id, properties)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, viewEventDeps)

  return (
    <TrackingScopeProvider parentTrackedComponent={id} properties={properties}>
      {/* Not sure why this causes a type incompat for passing html props through,
          it's the same pattern from the underlying library */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <InView as="span" onChange={setInView} triggerOnce fallbackInView {...viewOptions} {...props}>
        {children}
      </InView>
    </TrackingScopeProvider>
  )
}

/**
 * A higher-order component for {@link TrackedComponent}. Helpful for setting the a component's tracking
 * scope correctly for using {@link useTrackInteraction} without having to move `TrackedComponent` to
 * a parent or wrapper component.
 * @param Component the component to wrap
 * @param trackedComponentProps props passed to the `TrackedComponent`
 * @returns a version of the given `Component` wrapped with a `TrackedComponent` parent component.
 */
export function withTrackedComponent<P>(
  Component: ComponentType<P>,
  trackedComponentProps: (TrackedComponentProps & HtmlProps) | ((props: P) => TrackedComponentProps & HtmlProps)
) {
  const doMapProps = typeof trackedComponentProps === "function"
  function TrackedComponentWrapper(props: P & JSX.IntrinsicAttributes) {
    const trackedProps = doMapProps ? trackedComponentProps(props) : trackedComponentProps
    return (
      <TrackedComponent {...trackedProps}>
        <Component {...props} />
      </TrackedComponent>
    )
  }
  if (process.env.NODE_ENV !== "production") {
    TrackedComponentWrapper.displayName = `WithTrackedComponent(${getDisplayName(Component)})`
  }
  return TrackedComponentWrapper
}

/**
 * Sends a view event when the component is mounted. Less preferable to {@link TrackedComponent}, but useful
 * for basic tracking in React Native.
 * @param props
 * @returns
 */
export function TrackedComponentByMount(props: TrackedComponentProps & { children: ReactNode }) {
  const trackView = useContextSelector(TrackingContext, (context) => context.trackView)

  const viewEventDeps: any[] = [props.id, trackView]
  if (props.properties) {
    // Spreading the object into the deps array so using `properties` doesn't require using `useMemo`
    viewEventDeps.push(...Object.keys(props.properties), ...Object.values(props.properties))
  }
  useEffect(() => {
    trackView(props.id, props.properties)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, viewEventDeps)

  return (
    <TrackingScopeProvider parentTrackedComponent={props.id} properties={props.properties}>
      {props.children}
    </TrackingScopeProvider>
  )
}

/**
 * A higher-order component for {@link TrackedComponentByMount}. Helpful for setting the a component's tracking
 * scope correctly for using {@link useTrackInteraction} without having to move `TrackedComponentByMount` to
 * a parent or wrapper component.
 * @param Component the component to wrap
 * @param trackedComponentProps props passed to the `TrackedComponentByMount`, or a function that receives the props
 * passed into the component and returns the props to be passed to the `TrackedComponentByMount`.
 * @returns a version of the given `Component` wrapped with a `TrackedComponentByMount` parent component.
 */
export function withTrackedComponentByMount<P>(
  Component: ComponentType<P>,
  trackedComponentProps: (TrackedComponentProps & HtmlProps) | ((props: P) => TrackedComponentProps & HtmlProps)
) {
  const doMapProps = typeof trackedComponentProps === "function"
  function TrackedComponentByMountWrapper(props: P & JSX.IntrinsicAttributes) {
    const trackedProps = doMapProps ? trackedComponentProps(props) : trackedComponentProps
    return (
      <TrackedComponentByMount {...trackedProps}>
        <Component {...props} />
      </TrackedComponentByMount>
    )
  }
  if (process.env.NODE_ENV !== "production") {
    TrackedComponentByMountWrapper.displayName = `WithTrackedComponentByMount(${getDisplayName(Component)})`
  }
  return TrackedComponentByMountWrapper
}

/**
 * Returns a function that can be used to track interactions, scoped to a given visual element.
 */
export const useTrackInteraction = () => {
  return useContextSelector(TrackingScopeContext, (context) => context.trackInteraction)
}

export const useTrackView = () => {
  return useContextSelector(TrackingContext, (context) => context.trackView)
}
