import { memo, useCallback } from "react"

import { ReactComponent as PrevIcon } from "@spatialsys/assets/icons/material-filled/arrow-back-ios.svg"
import { ReactComponent as NextIcon } from "@spatialsys/assets/icons/material-filled/arrow-forward-ios.svg"
import { ReactComponent as PauseIcon } from "@spatialsys/assets/icons/material-filled/pause.svg"
import { ReactComponent as PlayIcon } from "@spatialsys/assets/icons/material-filled/play-arrow.svg"
import { CameraMode } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"

import classes from "./play-controls.module.scss"

interface ProgressIndicatorProps {
  percent: number
  color: string
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const dash0 = props.percent * 100
  const dash1 = 100 - props.percent * 100

  return (
    // This path is hard-coded for an aspect ratio of 2.5:1
    // If you want to make it more dynamic, please be my guest!
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" className={classes.progressIndicator}>
      <path
        pointerEvents="none"
        strokeDasharray={`${dash0} ${dash1}`}
        d="
          M 125 2 l 75 0
          a 48 48 0 0 1 0 96
          l -150 0
          a 48 48 0 0 1 0 -96
          l 75 0
        "
        pathLength="100"
        stroke-width="4"
        stroke={props.color}
        fill="transparent"
      />
    </svg>
  )
}

export const PlayControls = memo(() => {
  const focusUnity = useAppContext((context) => context.actions.focusUnity)
  const cameraMode = useAppContext((context) => context.state.unity.appState.roomSession.camera.mode)
  const progress = useAppContext((context) => context.state.unity.appState.roomSession.camera.autoplayProgress)
  const index = useAppContext((context) => context.state.unity.appState.roomSession.camera.autoplayIndex)
  const availableCount = useAppContext(
    (context) => context.state.unity.appState.roomSession.camera.autoplayAvailableCount
  )

  const playing = cameraMode === CameraMode.AutoPlay
  const grayPercent = (index + 1) / availableCount
  const whitePercent = index / availableCount + progress / availableCount

  const goToPrevious = useCallback(() => {
    UnityMessages.autoplayNavigate(-1)
    focusUnity()
  }, [focusUnity])

  const goToNext = useCallback(() => {
    UnityMessages.autoplayNavigate(1)
    focusUnity()
  }, [focusUnity])

  const togglePlay = useCallback(() => {
    UnityMessages.setCameraMode(playing ? CameraMode.Room : CameraMode.AutoPlay)
    focusUnity()
  }, [playing, focusUnity])

  return (
    <div className={classes.container}>
      {availableCount ? <ProgressIndicator percent={grayPercent} color="rgba(255, 255, 255, 0.3)" /> : null}
      {availableCount ? <ProgressIndicator percent={whitePercent} color="white" /> : null}

      <div className={classes.innerContainer}>
        <button className={classes.button} onClick={goToPrevious}>
          <PrevIcon />
        </button>
        <button className={classes.button} onClick={togglePlay}>
          {playing ? <PauseIcon className="icon icon-lg" /> : <PlayIcon className="icon icon-lg" />}
        </button>
        <button className={classes.button} onClick={goToNext} style={{ left: "4px" }}>
          <NextIcon />
        </button>
      </div>
    </div>
  )
})
