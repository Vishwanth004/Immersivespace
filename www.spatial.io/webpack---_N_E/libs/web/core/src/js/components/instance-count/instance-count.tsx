import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"

import { createContextStub } from "@spatialsys/react/util/create-context-stub"

interface Registerable {
  register: () => () => void
}

const stub = createContextStub("InstanceCountManager")

const InstanceManagerContext = createContext<Registerable>({
  register: stub,
})

/**
 * Registers the component with the ancestor InstanceCountManager, incrementing
 * its count.
 */
export function useInstanceCount() {
  const { register } = useContext(InstanceManagerContext)
  useEffect(() => {
    return register()
  }, [register])
}

/**
 * Increments the count of the nearest InstanceCountManager.
 */
export function InstanceCount(props: { children?: ReactNode }) {
  useInstanceCount()
  return (props.children as ReactElement) || null
}

interface InstanceCountManagerProps {
  /**
   * Called when the count changes
   */
  onChange: (count: number) => void
}

/**
 * Tracks the count of registered components in the tree and signals when
 * it changes. Useful for performing some action when a series
 * of nested modals have been closed.
 */
export function InstanceCountManager(props: PropsWithChildren<InstanceCountManagerProps>) {
  const count = useRef(0)
  const onChange = useRef(props.onChange)
  useEffect(() => {
    onChange.current = props.onChange
  }, [props.onChange])
  const register = useCallback(() => {
    count.current += 1
    onChange.current(count.current)
    return () => {
      count.current -= 1
      onChange.current(count.current)
    }
  }, [count, onChange])
  return <InstanceManagerContext.Provider value={{ register }}>{props.children}</InstanceManagerContext.Provider>
}
