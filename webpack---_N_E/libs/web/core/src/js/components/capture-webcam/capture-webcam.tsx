import clsx from "clsx"
import { forwardRef, memo } from "react"
import Webcam, { WebcamProps } from "react-webcam"

import { ReactComponent as CameraIcon } from "@spatialsys/assets/icons/material-filled/camera.svg"

import classes from "./capture-webcam.module.scss"

export type CapturedImage = {
  base64Str: string
  file: File
}

type CaptureWebcamProps = {
  containerClassName?: string
  image?: CapturedImage
  size?: number
  webcamProps?: Partial<WebcamProps>
}

/**
 * Streams the user's webcam to the screen by rendering it via HTML canvas.
 * If `image` is defined, will render the image instead of the webcam feed.
 *
 * Uses [react-webcam](https://github.com/mozmorris/react-webcam). To capture a screenshot,
 * call `ref.current.getScreenshot()`.
 *
 * If no webcam is available, a placeholder camera icon is displayed
 */
export const CaptureWebcam = memo(
  forwardRef<Webcam, CaptureWebcamProps>(function CaptureWebcam(props, webcamRef) {
    const { containerClassName, image, size = 400, webcamProps } = props

    return (
      <div className={clsx(classes.container, containerClassName)}>
        <div className={clsx(classes.webcamContainer, image && classes.hidden)}>
          <CameraIcon className={classes.cameraIcon} style={{ width: "100%", height: "100%" }} />
          <Webcam
            className={classes.webcam}
            ref={webcamRef}
            forceScreenshotSourceSize
            mirrored
            screenshotFormat="image/png"
            screenshotQuality={1}
            videoConstraints={{ width: size, height: size, facingMode: "user", frameRate: 30 }}
            {...webcamProps}
          />
        </div>

        {image && <img className={classes.imagePreview} src={image.base64Str} alt="captured from webcam" />}
      </div>
    )
  })
)
