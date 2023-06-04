import { ReactElement, ReactNode } from "react"

import { useAvatarSdkTokenQuery } from "@spatialsys/react/query-hooks/sapi/avatar-sdk"
import { useAuthState } from "@spatialsys/web/app-context"
import { RequiresWithFallbackProps } from "@spatialsys/web/core/js/components/requires-with-fallback"
import { sapiClient } from "@spatialsys/web/sapi"

export type RequiresAvatarSdkTokenProps = RequiresWithFallbackProps<unknown> & {
  children?: ReactNode
}

/**
 * A wrapper component that guarantees `AvatarSdkToken` will always be defined from the `useAvatarSdkToken` hook
 *
 * Any child of this component can access the `AvatarSdkToken` object without having to check if it's defined or not.
 * This component also guarantees that an auth token is available.
 */
export const RequiresAvatarSdkToken = (props: RequiresAvatarSdkTokenProps) => {
  const { FallbackComponent } = props
  const { isAuthenticated } = useAuthState()
  const query = useAvatarSdkTokenQuery(sapiClient, isAuthenticated)

  if (query.isError && FallbackComponent) {
    return <FallbackComponent error={query.error} />
  }
  if (query.isSuccess) {
    return props.children as ReactElement
  }

  return null
}
