import { memo, useCallback, useEffect, useMemo, useState } from "react"

import { AppStateSelectors, CustomEnvironmentSetupStep } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { TransformPanelState } from "@spatialsys/web/app-state"
import { SliderWithInput } from "@spatialsys/web/core/js/components/room/transform/slider-with-input/slider-with-input"
import { getYawFromQuaternion } from "@spatialsys/web/core/js/util/math"
import { Button } from "@spatialsys/web/ui"

interface TransformProps {
  closePanel: () => void
  selectedObjectId: number
  setTransformPanelActive: () => void
  transformPanelState: TransformPanelState
}

// For the position sliders
const POSITION_SLIDER_RANGE = 10
const POSITION_STEP_SIZE = 0.01

// For the rotation slider
const ROTATION_SLIDER_RANGE = 180
const ROTATION_STEP_SIZE = 1

/**
 * Slider scales and unity scales are converted as follows: slider_scale == log10(unity_scale)
 * Ex. A slider scale of 1 is a unity scale of 10**1 = 1
 *     A slider scale of -2 is a unity scale of 10**(-2) = 0.01
 */
export const SLIDER_SCALE_RANGE = 2
const SLIDER_SCALE_STEP_SIZE = 0.01

export const sliderToUnityScale = (sliderScale: number) => {
  return 10 ** sliderScale
}

export const unityToSliderScale = (unityScale: number) => {
  return Math.log10(unityScale)
}

const Transform = memo(function Transform(props: TransformProps) {
  const { closePanel, selectedObjectId } = props

  const transforms = useAppContext((context) => context.state.unity.appState.roomSession.sharedState.scene.transforms)
  const currentCustomEnvironmentStep = useAppContext(
    (context) => context.state.unity.appState.roomSession.userTools.customEnvironmentTool.currentStep
  )

  const oneToOneButtonActive = useAppContext((context) =>
    AppStateSelectors.isModelObject(context.state.unity.appState, selectedObjectId)
  )
  const includeTranslate = useAppContext((context) =>
    AppStateSelectors.canMoveSelectedObject(context.state.unity.appState)
  )
  const includeRotation = useAppContext((context) =>
    AppStateSelectors.canRotateSelectedObject(context.state.unity.appState)
  )
  const includeScale = useAppContext((context) =>
    AppStateSelectors.canScaleSelectedObject(context.state.unity.appState)
  )

  const [initUnityX, setInitUnityX] = useState<number | null>(null)
  const [initUnityY, setInitUnityY] = useState<number | null>(null)
  const [initUnityZ, setInitUnityZ] = useState<number | null>(null)
  const [initUnityRotation, setInitUnityRotation] = useState<number | null>(null)

  // Other constants
  const transformsLoaded = Boolean(
    transforms &&
      transforms[selectedObjectId] &&
      transforms[selectedObjectId].localScale &&
      transforms[selectedObjectId].localPosition &&
      transforms[selectedObjectId].localRotation
  )
  const unityTransforms = transformsLoaded ? transforms : null
  const selectedTransform = transformsLoaded ? unityTransforms[selectedObjectId] : null
  const unityRotationYaw = transformsLoaded ? getYawFromQuaternion(selectedTransform.localRotation) : null
  const unityScale = transformsLoaded ? selectedTransform.localScale[0] : null
  const unityX = transformsLoaded ? selectedTransform.localPosition[0] : null
  const unityY = transformsLoaded ? selectedTransform.localPosition[1] : null
  const unityZ = transformsLoaded ? selectedTransform.localPosition[2] : null

  const resetPosition = useCallback(() => {
    UnityMessages.setObjectPositionLocal(selectedObjectId, initUnityX, initUnityY, initUnityZ)
  }, [initUnityX, initUnityY, initUnityZ, selectedObjectId])

  const resetRotation = useCallback(() => {
    const delta = initUnityRotation - unityRotationYaw
    UnityMessages.rotateObjectLocal(selectedObjectId, delta)
  }, [initUnityRotation, selectedObjectId, unityRotationYaw])

  const handleChangeX = useCallback(
    (value: number) => {
      UnityMessages.setObjectPositionLocal(selectedObjectId, value, unityY, unityZ)
    },
    [selectedObjectId, unityY, unityZ]
  )

  const handleChangeY = useCallback(
    (value: number) => {
      UnityMessages.setObjectPositionLocal(selectedObjectId, unityX, value, unityZ)
    },
    [selectedObjectId, unityX, unityZ]
  )

  const handleChangeZ = useCallback(
    (value: number) => {
      UnityMessages.setObjectPositionLocal(selectedObjectId, unityX, unityY, value)
    },
    [selectedObjectId, unityX, unityY]
  )

  const handleChangeRotation = useCallback(
    (value: number, prevValue: number) => {
      UnityMessages.rotateObjectLocal(selectedObjectId, value - prevValue)
    },
    [selectedObjectId]
  )

  const handleChangeScale = useCallback(
    (value: number) => {
      if (value !== 0) {
        UnityMessages.setObjectScaleLocal(selectedObjectId, value)
      }
    },
    [selectedObjectId]
  )

  const scaleOneToOne = useCallback(() => UnityMessages.setObjectScaleOneToOne(selectedObjectId), [selectedObjectId])

  const advanceEnvironmentSetupStep = useCallback(() => {
    if (
      currentCustomEnvironmentStep === CustomEnvironmentSetupStep.FullScaleSetup ||
      currentCustomEnvironmentStep === CustomEnvironmentSetupStep.WebFullScaleSetup
    ) {
      UnityMessages.setCustomEnvironmentSetupStep(selectedObjectId, CustomEnvironmentSetupStep.SetCustomEnvironment)
    } else {
      closePanel()
    }
  }, [currentCustomEnvironmentStep, selectedObjectId, closePanel])

  const cancelButtonOnClick = useCallback(() => {
    if (currentCustomEnvironmentStep === CustomEnvironmentSetupStep.WebFullScaleSetup) {
      UnityMessages.setCustomEnvironmentSetupStep(selectedObjectId, CustomEnvironmentSetupStep.None)
    }
    closePanel()
  }, [currentCustomEnvironmentStep, selectedObjectId, closePanel])

  const titleText = useMemo(
    () =>
      currentCustomEnvironmentStep === CustomEnvironmentSetupStep.WebFullScaleSetup
        ? "Adjust Environment Scale and Position"
        : "",
    [currentCustomEnvironmentStep]
  )

  const showCancelButton = useMemo(
    () => currentCustomEnvironmentStep === CustomEnvironmentSetupStep.WebFullScaleSetup,
    [currentCustomEnvironmentStep]
  )

  useEffect(() => {
    if (transformsLoaded && props.transformPanelState === TransformPanelState.Active) {
      setInitUnityRotation(unityRotationYaw)
      setInitUnityX(unityX)
      setInitUnityY(unityY)
      setInitUnityZ(unityZ)
      props.setTransformPanelActive()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.transformPanelState, transformsLoaded])

  return (
    <>
      {titleText && <div className="transform-title">{titleText}</div>}

      {includeTranslate && transformsLoaded && (
        <div className="transform-subsection">
          <div className="transform-subtitle-container">
            <span className="transform-subtitle">Position</span>

            <button type="button" className="transform-panel-subtitle-button" onClick={resetPosition}>
              Reset
            </button>
          </div>

          <div className="transform-subtitle-2">
            <span>x</span>
          </div>
          <SliderWithInput
            onChange={handleChangeX}
            value={unityX}
            visibleRange={POSITION_SLIDER_RANGE}
            step={POSITION_STEP_SIZE}
          />

          <div className="transform-subtitle-2">
            <span>y</span>
          </div>
          <SliderWithInput
            onChange={handleChangeY}
            value={unityY}
            visibleRange={POSITION_SLIDER_RANGE}
            step={POSITION_STEP_SIZE}
          />

          <div className="transform-subtitle-2">
            <span>z</span>
          </div>
          <SliderWithInput
            onChange={handleChangeZ}
            value={unityZ}
            visibleRange={POSITION_SLIDER_RANGE}
            step={POSITION_STEP_SIZE}
          />
        </div>
      )}

      {includeRotation && transformsLoaded && (
        <div className="transform-subsection">
          <div className="transform-subtitle-container">
            <span className="transform-subtitle">Rotation</span>
            <button type="button" className="transform-panel-subtitle-button" onClick={resetRotation}>
              Reset
            </button>
          </div>
          <SliderWithInput
            onChange={handleChangeRotation}
            value={unityRotationYaw}
            visibleRange={ROTATION_SLIDER_RANGE}
            step={ROTATION_STEP_SIZE}
          />
        </div>
      )}

      {includeScale && transformsLoaded && (
        <div className="transform-subsection">
          <div className="transform-subtitle-container">
            <span className="transform-subtitle">Scale</span>
            {oneToOneButtonActive && (
              <button type="button" className="transform-panel-subtitle-button" onClick={scaleOneToOne}>
                1:1 Scale
              </button>
            )}
          </div>
          <SliderWithInput
            onChange={handleChangeScale}
            value={unityScale}
            visibleRange={SLIDER_SCALE_RANGE}
            step={SLIDER_SCALE_STEP_SIZE}
            scale="logarithmic"
            base={10}
          />
        </div>
      )}

      <div className="transform-panel-buttons">
        <Button className="px-12" size="lg" onClick={advanceEnvironmentSetupStep}>
          Done
        </Button>

        {showCancelButton && (
          <Button variant="text" onClick={cancelButtonOnClick}>
            Cancel
          </Button>
        )}
      </div>
    </>
  )
})

export default Transform
