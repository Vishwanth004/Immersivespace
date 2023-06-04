import clsx from "clsx"
import { m, useMotionTemplate, useSpring, useTransform } from "framer-motion"
import { clamp } from "lodash"
import { memo } from "react"

import { ReactComponent as TuneIcon } from "@spatialsys/assets/icons/material-filled/tune.svg"
import { ReactComponent as MicOffIcon } from "@spatialsys/assets/icons/material-outlined/mic-off.svg"
import { ReactComponent as MicIcon } from "@spatialsys/assets/icons/material-outlined/mic.svg"
import MicErrorIcon from "@spatialsys/assets/icons/mic-error.svg"
import { stiffSpring } from "@spatialsys/theme"
import { AppStateSelectors, MicStatus } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"
import { TooltipButton } from "@spatialsys/web/core/js/components/tooltip-button/tooltip-button"
import { lerp } from "@spatialsys/web/core/js/util/math"
import { Loader } from "@spatialsys/web/ui"

import classes from "./mic-button.module.scss"

interface MicButtonProps {
  voiceConnected: boolean
  voiceShouldBeConnected: boolean
  micEnabled: boolean
  micStatus: MicStatus
  onClick: (disabled: boolean) => void
  onTooltipSettingsClick: () => void
}

/**
 * Applies a custom curve to the mic level since the "stem" of the microphone icon is hard to see.
 */
const micLevelToClipPercent = (micPeakAmplitude: number) => {
  const micLevel = clamp(Math.pow(micPeakAmplitude * 3.0, 0.6), 0.0, 1.0)
  return 100 - lerp(13, 81, micLevel)
}

/**
 * Renders a microphone button, also animating a blue fill based on the local microphone level.
 */
const MicButton = memo(function MicButton(props: MicButtonProps) {
  const { voiceConnected, voiceShouldBeConnected, micEnabled, micStatus, onClick, onTooltipSettingsClick } = props
  const micPeakAmplitude = useAppContext((context) => context.state.space.micPeakAmplitude)

  const isMicStatusError = AppStateSelectors.isMicStatusError(micStatus)

  const micIconTopClipPercent = useTransform(micPeakAmplitude, (value) => {
    if (isMicStatusError || !micEnabled || !voiceConnected) {
      return 100
    }
    return micLevelToClipPercent(value)
  })
  const sprungMicIconTopClipPercent = useSpring(micIconTopClipPercent, stiffSpring)
  const clipPath = useMotionTemplate`inset(${sprungMicIconTopClipPercent}% 0% 0% 0%)`

  const showLoader = !voiceConnected && voiceShouldBeConnected
  const buttonDisabled = showLoader || micStatus === MicStatus.RequestingPermissions || isMicStatusError
  const tooltipText = micEnabled ? "Mute (M)" : "Unmute (M)"

  return (
    <CircleButton
      onClick={() => onClick(buttonDisabled)}
      fakeDisabled={buttonDisabled}
      color={micEnabled && micStatus !== MicStatus.RequestingPermissions ? "white" : "outline"}
      tooltipButton={
        !buttonDisabled && (
          <TooltipButton
            buttonText={tooltipText}
            className="flex items-center"
            icon={<TuneIcon className="ml-1 h-4 w-4" />}
            onClick={onTooltipSettingsClick}
          />
        )
      }
    >
      {!showLoader && !isMicStatusError && (
        <div className={classes.micIcon}>{micEnabled ? <MicIcon /> : <MicOffIcon />}</div>
      )}

      {/* Voice activity indicator */}
      {!showLoader && !isMicStatusError && (
        <m.div initial={false} className={clsx(classes.micIcon, classes.micIconFill)} style={{ clipPath }}>
          <MicIcon />
        </m.div>
      )}

      {!showLoader && isMicStatusError && (
        <img src={MicErrorIcon} className={`${classes.micIcon} ${classes.micIconError}`} alt="MicError" />
      )}

      {/* Loading indicator while we connect to voice channel */}
      {showLoader && <Loader variant="plain" size="small" color="white" />}
    </CircleButton>
  )
})

export default MicButton
