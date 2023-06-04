import { clamp } from "lodash"
import { useCallback, useEffect, useRef } from "react"

import { AppStateKeyPaths, SceneTransformState } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"

import OnMouseWheel from "../on-mouse-wheel/on-mouse-wheel"
import { SLIDER_SCALE_RANGE, sliderToUnityScale } from "../transform/transform"

const OBJECT_XZ_SCROLL_SPEED = 1 / 500
const OBJECT_SCALE_SCROLL_SPEED = 1 / 20

interface TransformObjectWithMouseWheelProps {
  shouldHandleScroll: boolean
  selectedObjectId: number
  selectedTransform: SceneTransformState
}

const useAdditionalUnitySceneObjectState = (selectedObjectId: number) => {
  const prevSelectedObjectId = useRef(0)
  useEffect(() => {
    // Observe selected object's transform values if necessary (used for rotate/scale sliders)
    const newSelectedObjectId = selectedObjectId

    if (newSelectedObjectId !== prevSelectedObjectId.current) {
      let addKeyPaths: AppStateKeyPaths[] = []
      let removeKeyPaths: AppStateKeyPaths[] = []

      // Since AppStateKeyPaths doesn't support wildcard values, but we're registering for a specific
      // dictionary key, we have to force cast these to AppStateKeyPaths
      if (newSelectedObjectId !== 0) {
        addKeyPaths = [
          `roomSession/sharedState/scene/models/${newSelectedObjectId}` as unknown as AppStateKeyPaths,
          `roomSession/sharedState/scene/objects/${newSelectedObjectId}` as unknown as AppStateKeyPaths,
          `roomSession/sharedState/scene/transforms/${newSelectedObjectId}` as unknown as AppStateKeyPaths,
        ]
      }

      if (prevSelectedObjectId.current !== 0) {
        removeKeyPaths = [
          `roomSession/sharedState/scene/models/${prevSelectedObjectId.current}` as unknown as AppStateKeyPaths,
          `roomSession/sharedState/scene/objects/${prevSelectedObjectId.current}` as unknown as AppStateKeyPaths,
          `roomSession/sharedState/scene/transforms/${prevSelectedObjectId.current}` as unknown as AppStateKeyPaths,
        ]
      }

      UnityMessages.changeAppStateObservers(addKeyPaths, removeKeyPaths)
    }

    prevSelectedObjectId.current = newSelectedObjectId
  }, [selectedObjectId])
}

export function TransformObjectWithMouseWheel(props: TransformObjectWithMouseWheelProps) {
  const { shouldHandleScroll, selectedObjectId, selectedTransform } = props
  useAdditionalUnitySceneObjectState(selectedObjectId)

  const handleWheelEvent = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      if (e.ctrlKey) {
        const localScale = selectedTransform?.localScale
        if (localScale !== null) {
          const newScale = localScale[0] - e.deltaY * OBJECT_SCALE_SCROLL_SPEED
          UnityMessages.setObjectScaleLocal(
            selectedObjectId,
            clamp(newScale, sliderToUnityScale(SLIDER_SCALE_RANGE), sliderToUnityScale(SLIDER_SCALE_RANGE))
          )
        }
      } else {
        UnityMessages.moveObjectOnCameraXZAxis(
          selectedObjectId,
          e.deltaX * OBJECT_XZ_SCROLL_SPEED,
          -e.deltaY * OBJECT_XZ_SCROLL_SPEED
        )
      }
    },
    [selectedObjectId, selectedTransform?.localScale]
  )

  return shouldHandleScroll && <OnMouseWheel handler={handleWheelEvent} />
}
