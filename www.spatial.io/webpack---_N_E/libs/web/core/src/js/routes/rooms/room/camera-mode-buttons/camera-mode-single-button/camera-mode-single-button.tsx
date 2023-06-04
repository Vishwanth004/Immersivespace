import clsx from "clsx"
import { m } from "framer-motion"
import { memo, useCallback, useMemo } from "react"
import { usePopperTooltip } from "react-popper-tooltip"

import { ReactComponent as AutoRotateCameraIcon } from "@spatialsys/assets/icons/auto-rotate-camera.svg"
import { ReactComponent as DragToRotateCameraIcon } from "@spatialsys/assets/icons/drag-to-rotate-camera.svg"
import { ReactComponent as PointerLockCameraIcon } from "@spatialsys/assets/icons/pointer-lock-camera.svg"
import { CameraRotationMode } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"

type CameraModeSingleButtonProps = {
  currentRotationMode: CameraRotationMode
  rotationVariant: CameraRotationMode
  isAnimating: boolean
  isHovering: boolean
}

export const CameraModeSingleButton = memo(function CameraModeSingleButton(props: CameraModeSingleButtonProps) {
  const { currentRotationMode, rotationVariant, isAnimating } = props

  const actions = useAppContext((context) => context.actions)
  const isSelected = useMemo(() => rotationVariant === currentRotationMode, [currentRotationMode, rotationVariant])

  const Icon = useMemo(() => {
    switch (rotationVariant) {
      case CameraRotationMode.PointerLock:
        return <PointerLockCameraIcon color="white" />
      case CameraRotationMode.AutoRotate:
        return <AutoRotateCameraIcon color="white" />
      case CameraRotationMode.DragToRotate:
        return <DragToRotateCameraIcon color="white" />
    }
  }, [rotationVariant])

  const toolTipText = useMemo(() => {
    switch (rotationVariant) {
      case CameraRotationMode.PointerLock:
        return "Pointer Lock"
      case CameraRotationMode.AutoRotate:
        return "Auto rotate"
      case CameraRotationMode.DragToRotate:
        return "Drag to rotate"
    }
  }, [rotationVariant])

  const setCameraMode = useCallback(() => {
    actions.focusUnity()

    if (isSelected) return

    actions.setCameraRotationMode({ previousState: currentRotationMode, newState: rotationVariant })
  }, [actions, currentRotationMode, isSelected, rotationVariant])

  const { setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    placement: "top",
    interactive: true,
    delayHide: 100,
    delayShow: 200,
    offset: [0, 1],
  })

  return (
    <m.button
      ref={setTriggerRef}
      className={clsx("scaleIn tooltip-host p-3 hover:opacity-100", !isSelected && "opacity-50")}
      onClick={setCameraMode}
      layout="preserve-aspect"
    >
      {Icon}
      {visible && !isAnimating && (
        <span ref={setTooltipRef} className="tooltip-text tooltip-text--top">
          {toolTipText}
        </span>
      )}
    </m.button>
  )
})
