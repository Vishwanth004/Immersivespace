import { Suspense, lazy, useEffect, useRef, useState } from "react"

import { useGetAvatarAnimationsQuery } from "@spatialsys/react/query-hooks/content"
import { useGetUnlockablesConfigQuery } from "@spatialsys/react/query-hooks/unlockables"
import Config from "@spatialsys/web/config"
import type { EmotesTrayContainerProps } from "@spatialsys/web/core/js/components/emotes/emotes-tray-contents"
import { sapiContentClient } from "@spatialsys/web/sapi"
import { useClickedOutsideOf } from "@spatialsys/web/ui/hooks"

const EmotesTrayContainer = lazy(() =>
  import(/* webpackPrefetch: true */ "./emotes-tray-contents").then((module) => ({
    default: module.EmotesTrayContainer,
  }))
)

type EmotesTrayProps = EmotesTrayContainerProps & {
  isOpen: boolean
  onRequestClose?: () => void
  refsToIgnore?: React.RefObject<HTMLElement>[]
}

export const EmotesTray = (props: EmotesTrayProps) => {
  const { isOpen, onRequestClose, refsToIgnore = [], ...rest } = props
  // Prefetch the list of animations and unlockables.
  useGetAvatarAnimationsQuery(sapiContentClient)
  useGetUnlockablesConfigQuery(Config.PUBLIC_ASSETS_BASE_URL)

  const trayRef = useRef<HTMLDivElement>(null)

  useClickedOutsideOf([trayRef, ...refsToIgnore], onRequestClose)

  // Use this state to determine whether to mount the container or not so that the first appearance
  // is animated correctly and closing gets animated correctly — both handled from inside the
  // container. Having the AnimatePresence outside of the lazy-loaded component has a bug where
  // React will create the element and hide it while the tree is suspended, but framer-motion still
  // performs the mount animation, so when lazy loaded component is mounted the container is
  // already in its final position, aka it just appears with no animation.
  const [hasOpenedBefore, setHasOpened] = useState(isOpen)
  useEffect(() => {
    if (isOpen && !hasOpenedBefore) {
      setHasOpened(true)
    }
  }, [hasOpenedBefore, isOpen])

  return (
    <Suspense fallback={null}>
      {hasOpenedBefore && <EmotesTrayContainer ref={trayRef} isOpen={isOpen} {...rest} />}
    </Suspense>
  )
}
