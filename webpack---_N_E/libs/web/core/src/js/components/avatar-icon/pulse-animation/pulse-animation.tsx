import clsx from "clsx"
import { memo, useEffect, useState } from "react"

import { PlayerColors } from "@spatialsys/js/util/player-colors"

import classes from "./pulse-animation.module.scss"

interface PulseAnimationProps {
  shouldPulse: boolean
  playerColors: PlayerColors
}

/**
 * Audio pulse animation that loops as long as `shouldPulse` is true.
 * Gently fades out when the `shouldPulse` becomes false.
 */
export const PulseAnimation = memo(function PulseAnimation(props: PulseAnimationProps) {
  const { shouldPulse, playerColors } = props

  const [showFirstPulse, setShowFirstPulse] = useState(shouldPulse)
  const [showSecondPulse, setShowSecondPulse] = useState(shouldPulse)

  useEffect(() => {
    // When user starts speaking, show the rings
    // However, the rings are not hidden by this effect, but rather by listening to `onAnimationIteration` to guarantee a smooth fade out
    if (shouldPulse) {
      setShowFirstPulse(true)
      setShowSecondPulse(true)
    }
  }, [shouldPulse])

  return (
    /* 
      Audio pulse, 2 rings (one is delayed by 500ms). expandFade is an infinitely looping animation
      At the end of every iteration, check if the user is still speaking. If not, stop the animation
      This guarantees a gentle "fade out" rather than an abrupt cancellation of the animation

      TODO(DEV-5539): Not a gentle fade out when the user has webcam
      */
    <>
      {showFirstPulse && (
        <div
          style={{ borderColor: playerColors.mainColor }}
          className={clsx(classes.pulse, "expandFade")}
          onAnimationIteration={() => {
            if (!shouldPulse) setShowFirstPulse(false)
          }}
        />
      )}
      {showSecondPulse && (
        <div
          style={{ borderColor: playerColors.mainColor, animationDelay: "500ms" }}
          className={clsx(classes.pulse, "expandFade")}
          onAnimationIteration={() => {
            if (!shouldPulse) setShowSecondPulse(false)
          }}
        />
      )}
    </>
  )
})
