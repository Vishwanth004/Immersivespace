import * as React from "react"

export function useDefaultProps<T>(props: T, defaultProps: Partial<T>): T {
  return React.useMemo(() => {
    return {
      ...defaultProps,
      ...props,
    }
  }, [defaultProps, props])
}

/** Returns the previous value of a stateful value, based on https://usehooks.com/usePrevious/ */
export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>()

  React.useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}
