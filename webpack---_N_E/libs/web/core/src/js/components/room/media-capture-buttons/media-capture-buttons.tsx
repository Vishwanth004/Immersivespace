import { memo } from "react"

import { ReactComponent as VolumeUpIcon } from "@spatialsys/assets/icons/material-filled/volume-up.svg"
import { MicStatus } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { DockPillButton } from "@spatialsys/web/core/js/components/room/dock-pill-button/dock-pill-button"
import { WebcamStatus } from "@spatialsys/web/rtc/rtc-state"

import MicButton from "../../mic-button/mic-button"
import WebcamButton from "../../webcam-button/webcam-button"

export type MediaCaptureButtonsProps = {
  webcamStatus: WebcamStatus
  hideWebCam: boolean
  onJoinAudio: () => void
  onToggleMic: (disabled: boolean) => void
  onToggleWebcam: (disabled: boolean) => void
  onOpenMediaSettingsMenu: () => void
}

const MediaCaptureButtons = memo(function MediaCaptureButtons(props: MediaCaptureButtonsProps) {
  const micStatus = useAppContext((context) => context.state.unity.appState.microphone.status)
  const voiceState = useAppContext((context) => context.state.unity.appState.roomSession.voice)
  const webcamEnabled = useAppContext((context) => context.state.unity.appState.roomSession.webcamEnabled)

  return (
    <>
      {!voiceState.userEnabledVoiceConnection ? (
        <DockPillButton onClick={props.onJoinAudio} leftIcon={<VolumeUpIcon />}>
          Join Audio
        </DockPillButton>
      ) : (
        <MicButton
          voiceConnected={voiceState.isConnected && micStatus !== MicStatus.RequestingPermissions}
          voiceShouldBeConnected={voiceState.shouldBeConnected}
          micEnabled={!voiceState.isMuted}
          micStatus={micStatus}
          onClick={props.onToggleMic}
          onTooltipSettingsClick={props.onOpenMediaSettingsMenu}
        />
      )}
      {!props.hideWebCam && props.webcamStatus !== WebcamStatus.Off && (
        <WebcamButton
          webcamEnabled={webcamEnabled}
          webcamStatus={props.webcamStatus}
          onClick={props.onToggleWebcam}
          onTooltipSettingsClick={props.onOpenMediaSettingsMenu}
        />
      )}
    </>
  )
})

export default MediaCaptureButtons
