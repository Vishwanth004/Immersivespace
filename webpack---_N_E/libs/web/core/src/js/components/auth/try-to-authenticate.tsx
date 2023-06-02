import { PropsWithChildren, ReactElement } from "react"

import { useTryToAuthenticate } from "@spatialsys/web/core/js/components/auth/hooks"

/**
 * When this component is mounted, attempts to authenticate
 * if the user is not already authenticated
 */
export const TryToAuthenticate = ({ children }: PropsWithChildren<{}>) => {
  useTryToAuthenticate()

  return (children as ReactElement) || null
}
