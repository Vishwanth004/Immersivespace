import clsx from "clsx"
import { memo, useCallback } from "react"

import { ReactComponent as CancelIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as StopIcon } from "@spatialsys/assets/icons/material-filled/stop.svg"
import { ReactComponent as HelpIcon } from "@spatialsys/assets/icons/material-outlined/help-outline.svg"
import { ReactComponent as PhotoCameraOutlinedIcon } from "@spatialsys/assets/icons/material-outlined/photo-camera.svg"
import { NotificationKeys } from "@spatialsys/js/sapi/clients/sapi"
import { InteractionName, InteractionType, TrackedComponents, useTrackInteraction } from "@spatialsys/react/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals, UiModes } from "@spatialsys/web/app-state"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { Button } from "@spatialsys/web/ui"

import classes from "./recording-buttons.module.scss"

export const CameraButton = memo(function CameraButton() {
  const trackInteraction = useTrackInteraction()
  const actions = useAppContext((context) => context.actions)
  const isRecording = useAppContext((context) => context.state.space.isScreenRecording)
  const { user } = useUser()

  const takeScreenshot = () => {
    actions.takeScreenshot()
    trackInteraction({ type: InteractionType.Click, name: InteractionName.TakeScreenshot })
    actions.focusUnity()
  }

  const recordVideo = () => {
    actions.startRecording()
    trackInteraction({ type: InteractionType.Click, name: InteractionName.RecordVideoStart })
    actions.focusUnity()
  }

  const stopRecording = () => {
    actions.stopRecording()
    trackInteraction({ type: InteractionType.Click, name: InteractionName.RecordVideoStop })
    actions.focusUnity()
  }

  const handleCameraModeClick = () => {
    if (user.acknowledgedInAppNotificationKeys?.includes(NotificationKeys.hasUsedCameraMode)) {
      actions.setUiMode(UiModes.Camera)
      actions.focusUnity()
    } else {
      actions.openModal({ type: Modals.CameraControls })
    }
  }

  return (
    <CircleButton
      className={clsx("flex items-center justify-center", isRecording && "!bg-red")}
      onClick={isRecording ? stopRecording : actions.focusUnity}
      ligature={isRecording ? <StopIcon className={classes.stopIcon} /> : <PhotoCameraOutlinedIcon />}
      color="outline"
      tooltipButtonPosition="bottom"
      tooltipClassName={classes.tooltip}
      usePopperStyling
      tooltipButton={
        <>
          <button className="w-full px-1.5 py-2 normal-case hover:bg-gray-100" onClick={takeScreenshot}>
            Take a photo (T)
          </button>
          <hr />
          <button
            className="w-full px-1.5 py-2 normal-case hover:bg-gray-100"
            onClick={isRecording ? stopRecording : recordVideo}
          >
            {isRecording ? "Stop recording (R)" : "Record a video (R)"}
          </button>
          <hr />
          <button className="w-full px-1.5 py-2 normal-case hover:bg-gray-100" onClick={handleCameraModeClick}>
            Filming mode
          </button>
        </>
      }
    />
  )
})

export const CameraModeButtons = memo(function RecordingButtons() {
  const actions = useAppContext((context) => context.actions)
  const isScreenRecording = useAppContext((context) => context.state.space.isScreenRecording)
  const trackInteraction = useTrackInteraction()
  const recordBtnText = isScreenRecording ? "Stop" : "Record"

  const recordVideo = useCallback(() => {
    actions.startRecording()
    trackInteraction({
      type: InteractionType.Click,
      name: InteractionName.RecordVideoStart,
      component: TrackedComponents.CameraModeButtons,
    })
    actions.focusUnity()
  }, [actions, trackInteraction])

  const stopRecording = useCallback(() => {
    actions.stopRecording()
    trackInteraction({
      type: InteractionType.Click,
      name: InteractionName.RecordVideoStop,
      component: TrackedComponents.CameraModeButtons,
    })
    actions.focusUnity()
  }, [actions, trackInteraction])

  const exit = useCallback(() => {
    actions.setUiMode(UiModes.Default)
    actions.focusUnity()
  }, [actions])

  const openHelp = useCallback(() => {
    actions.openModal({ type: Modals.CameraControls })
  }, [actions])

  let stopLigature: JSX.Element
  if (isScreenRecording) {
    stopLigature = <StopIcon className="h-6 w-6" />
  }

  return (
    <div className="grid grid-flow-col gap-4">
      <CircleButton
        onClick={exit}
        color="outline"
        tooltipText="Cancel"
        tooltipPosition="top"
        className={classes.btn}
        ligature={<CancelIcon />}
      />
      <Button
        className="px-6"
        color={isScreenRecording ? "red" : "translucent"}
        leftIcon={stopLigature}
        noShadow
        size="lg"
        onClick={isScreenRecording ? stopRecording : recordVideo}
      >
        {recordBtnText}
      </Button>

      <CircleButton
        onClick={openHelp}
        color="outline"
        tooltipText="Controls"
        tooltipPosition="top"
        className="flex items-center justify-center"
        ligature={<HelpIcon />}
      />
    </div>
  )
})
