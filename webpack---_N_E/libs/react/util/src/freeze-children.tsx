import { useEffect, useRef } from "react"

type FreezeChildrenProps = {
  freeze: boolean
  children: React.ReactNode
}

/**
 * Returns saved children when `freeze` is `true`. Otherwise, returns children as-is.
 * Useful for avoiding content change during exit transitions.
 */
export function FreezeChildren({ freeze, children }: FreezeChildrenProps) {
  const savedChildren = useRef<React.ReactNode>(children)

  useEffect(() => {
    if (!freeze) {
      savedChildren.current = children
    }
  })

  // Wrap in fragment to avoid type errors when children is a string
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{freeze ? savedChildren.current : children}</>
}
