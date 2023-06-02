import { m } from "framer-motion"
import { memo } from "react"

import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { CameraRotationMode } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { sapiFeatureFlagsClient } from "@spatialsys/web/sapi"

import { CameraModeSingleButton } from "./camera-mode-single-button/camera-mode-single-button"

const cameraModes = [CameraRotationMode.AutoRotate, CameraRotationMode.DragToRotate, CameraRotationMode.PointerLock]

export const CameraModeButtons = memo(function CameraModeButtons() {
  const rotationMode = useAppContext((context) => context.state.unity.appState.roomSession.camera.rotationMode)
  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)

  const isPointerLockEnabled = featureFlagsQuery.data?.featureFlags.pointerLock
  const [isHovering, setIsHovering] = useBoolean()
  const [isAnimating, setIsAnimating] = useBoolean()

  return (
    // The div is necessary to provide enough space for the button to expand on hover on screens with small widths.
    // If the width is applied to m.div, a change will be required to turn the pointer lock treatment on
    <div className="flex w-36 justify-end">
      <m.div
        className="h-12 bg-transparent"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 48 }}
        initial={{ borderRadius: 24 }}
        onHoverStart={setIsHovering.setTrue}
        onHoverEnd={setIsHovering.setFalse}
        onAnimationStart={setIsAnimating.setTrue}
        onAnimationComplete={setIsAnimating.setFalse}
        layout
      >
        {cameraModes.map((cameraMode) => {
          const isSelected = rotationMode === cameraMode
          const isEnabled = cameraMode === CameraRotationMode.PointerLock ? isPointerLockEnabled : true
          return (
            isEnabled &&
            (isSelected || isHovering) && (
              <CameraModeSingleButton
                currentRotationMode={rotationMode}
                rotationVariant={cameraMode}
                isHovering={isHovering}
                isAnimating={isAnimating}
                key={cameraMode}
              />
            )
          )
        })}
      </m.div>
    </div>
  )
})
