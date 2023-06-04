import clsx from "clsx"
import { useRouter } from "next/router"
import { memo, useCallback, useEffect, useRef } from "react"

import { SpatialCursorMode } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { Selectors } from "@spatialsys/web/app-state"
import { useIsMobile } from "@spatialsys/web/core/js/hooks/use-is-mobile"

import classes from "./spatial-unity-canvas.module.scss"

const IN_SPACE_PATHNAME = "/s/[slugAndId]"

/**
 * Screens loading the Spatial Unity client from mobile clients.
 */
export const SpatialUnityCanvas = memo(function SpatialUnityCanvas() {
  // Short-circuit if user is on mobile as we don't support the Unity client on mobile web.
  const isMobile = useIsMobile()
  if (isMobile) return null

  return <SpatialUnityCanvasInner />
})

const cursorClassMap: Readonly<Record<SpatialCursorMode, string>> = {
  [SpatialCursorMode.HoverOnNothing]: classes.grabCursor,
  [SpatialCursorMode.HoverOnObject]: classes.moveCursor,
  [SpatialCursorMode.PanClickDown]: classes.grabbingCursor,
  [SpatialCursorMode.HoverOnLink]: classes.pointerCursor,
  [SpatialCursorMode.HoverOnArt]: classes.zoomCursor,
}

/**
 * The canvas to which the Spatial Unity client renders, and the effects that trigger the start
 * of download and initialization.
 */
const SpatialUnityCanvasInner = () => {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const actions = useAppContext((context) => context.actions)

  const cursorMode = useAppContext((context) => context.state.unity.appState?.roomSession?.webglCursorMode)
  const shouldStartDownload = useAppContext(
    (context) => context.state.unity.shouldDownload || Selectors.shouldStartUnity(context.state)
  )
  const isMouseInUnity = useAppContext((context) => context.state.unity.appState.isMouseInUnity)

  const isFullySynced = useAppContext((context) => context.state.unity.appState?.roomSession?.inRoomAndFullySynced)
  const initialDataLoadComplete = useAppContext(
    (context) => context.state.unity.appState?.roomSession?.initialDataLoadComplete
  )
  const isOpacityZero = useAppContext((context) => !context.state.unity.appState?.windowIsVisible)

  // Hides canvas if you are not on the room page so that the canvas doesn't cover other elements
  // Also hide canvas if space is not joined, to avoid canvas rendering above other elements
  const isDisplayNone = router.pathname !== IN_SPACE_PATHNAME || !(isFullySynced || initialDataLoadComplete)

  const cursorClass = cursorClassMap[cursorMode]

  useEffect(() => {
    if (shouldStartDownload) {
      actions.createUnityInstance(canvasRef.current)
    }
  }, [actions, shouldStartDownload])

  const setMouseInUnity = useCallback(
    (enabled: boolean) => {
      if (isMouseInUnity !== enabled) {
        UnityMessages.setMouseInUnity(enabled)
      }
    },
    [isMouseInUnity]
  )

  return (
    <canvas
      // Standardizing the id of the canvas with Unity's generic HTML boilerplate.
      // An id is needed to prevent unity wasm to throw errors about selecting an element with "#"
      id="unity-canvas"
      ref={canvasRef}
      className={clsx(
        classes.unityContainer,
        cursorClass,
        isOpacityZero && classes.opacityZero,
        isDisplayNone && classes.displayNone
      )}
      tabIndex={1}
      onMouseLeave={() => setMouseInUnity(false)}
      onMouseEnter={() => setMouseInUnity(true)}
      onMouseMove={() => setMouseInUnity(true)}
    />
  )
}
