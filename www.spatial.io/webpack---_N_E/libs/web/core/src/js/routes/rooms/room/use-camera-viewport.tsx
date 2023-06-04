import { useEffect, useMemo } from "react"
import { useWindowSize } from "react-use"

import { CameraMode } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import roomCssVariables from "@spatialsys/web/core/js/routes/rooms/variables.module.scss"

const avatarCustomizationPanelWidth = parseInt(roomCssVariables.avatarCustomizationPanelWidth)

/**
 * Controls the Unity camera viewport based on the current camera mode and window width
 */
export function useCameraViewport() {
  const { width: windowWidth } = useWindowSize()

  const cameraMode = useAppContext((context) => context.state.unity.appState.roomSession.camera.mode)
  const isCustomizingAvatar = useMemo(() => cameraMode === CameraMode.AvatarCustomization, [cameraMode])

  useEffect(() => {
    if (isCustomizingAvatar)
      UnityMessages.setCameraViewportRect({
        x: 0,
        y: 0,
        width: Math.min(1, 1 - avatarCustomizationPanelWidth / windowWidth),
        height: 1,
      })
    else {
      UnityMessages.setCameraViewportRect({ x: 0, y: 0, width: 1, height: 1 })
    }
  }, [isCustomizingAvatar, windowWidth])
}
