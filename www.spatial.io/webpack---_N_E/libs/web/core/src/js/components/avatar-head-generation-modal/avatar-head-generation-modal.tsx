import clsx from "clsx"
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"

import { ReactComponent as CameraAltIcon } from "@spatialsys/assets/icons/material-filled/camera-alt.svg"
import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { dataUriToBlob } from "@spatialsys/js/util/convert-data-uri"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { CaptureWebcam, CapturedImage } from "@spatialsys/web/core/js/components/capture-webcam/capture-webcam"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { RequiresAvatarSdkToken } from "@spatialsys/web/core/js/components/user/requires-avatar-sdk-token"
import { Button, Heading, Loader } from "@spatialsys/web/ui"

import classes from "./avatar-head-generation-modal.module.scss"

type WebcamState = "initializing" | "ready" | "error"

interface ImageCaptureModalContentProps {
  onImageConfirm: (image: CapturedImage) => void
}

const CaptureImage = memo(function ImageCaptureModalContent(props: ImageCaptureModalContentProps) {
  const { onImageConfirm } = props
  const [image, setImage] = useState<CapturedImage | null>(null)
  const [webcamState, setWebcamState] = useState<WebcamState>("initializing")
  const webcamRef = useRef<Webcam>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    const imageBlob = dataUriToBlob(imageSrc)
    const imageFile = new File([imageBlob], "untitled.png", {
      type: imageBlob.type,
    })
    setImage({ base64Str: imageSrc, file: imageFile })
  }, [])

  const handleClear = useCallback(() => {
    setImage(null)
    fileRef.current.value = null
  }, [])

  const handleContinue = useCallback(() => {
    onImageConfirm(image)
  }, [image, onImageConfirm])

  const handleUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.onload = () => {
        setImage({ base64Str: fileReader.result as string, file })
      }

      fileReader.readAsDataURL(file)
    }
  }, [])

  useEffect(() => {
    if (webcamState === "error") {
      Toast.error("No webcam found. You have denied access or there is no webcam present.")
    }
  }, [webcamState])

  return (
    <div className={clsx(classes.body, classes.captureContainer)}>
      <CaptureWebcam
        ref={webcamRef}
        containerClassName={classes.webcamContainer}
        image={image}
        webcamProps={{
          onUserMedia() {
            setWebcamState("ready")
          },
          onUserMediaError: () => {
            setWebcamState("error")
          },
        }}
      />

      <input
        id="uploadPhoto"
        ref={fileRef}
        hidden
        type="file"
        accept=".png,.jpeg,.jpg"
        multiple={false}
        onChange={handleUpload}
      />

      <div className="mt-8 grid justify-items-center gap-4">
        {image ? (
          <Button size="xl" onClick={handleContinue}>
            Looks Good
          </Button>
        ) : (
          <CircleButton
            disabled={webcamState !== "ready"}
            ligature={webcamState === "initializing" ? <Loader color="white" size="small" /> : <CameraAltIcon />}
            color="black"
            onClick={handleCapture}
          />
        )}
        {image ? (
          <Button noShadow color="outline" size="xl" onClick={handleClear}>
            Retry
          </Button>
        ) : (
          <label htmlFor="uploadPhoto">
            <Button noShadow color="outline" size="xl" onClick={() => fileRef.current.click()}>
              Upload Photo
            </Button>
          </label>
        )}
      </div>
    </div>
  )
})

interface AvatarHeadGenerationModalProps extends ModalProps {
  /** Called when we begin creating the avatar */
  onConfirmPhoto?: (image: CapturedImage) => void
  showInitialPrompt?: boolean
}

export const AvatarHeadGenerationModal = memo(function AvatarHeadGenerationModal(
  props: AvatarHeadGenerationModalProps
) {
  const { onConfirmPhoto, showInitialPrompt = false } = props
  const [initialPromptDismissed, setInitialPromptDismissed] = useState(!showInitialPrompt)

  const handleImageConfirmed = useCallback(
    (image: CapturedImage) => {
      onConfirmPhoto?.(image)
    },
    [onConfirmPhoto]
  )

  return (
    <RequiresAvatarSdkToken>
      <Modal darkOverlay {...props}>
        <button type="button" className={classes.closeButton} onClick={props.onRequestClose}>
          <CloseIcon />
        </button>

        <TrackedComponent id={TrackedComponents.AvatarHeadGenerationModal}>
          {initialPromptDismissed ? (
            <CaptureImage onImageConfirm={handleImageConfirmed} />
          ) : (
            <div className={classes.body}>
              <Heading size="h3" className="mb-3">
                Want to create an avatar?
              </Heading>
              <Button size="xl" onClick={() => setInitialPromptDismissed(true)}>
                Let's Go!
              </Button>
              <button onClick={props.onRequestClose}>Skip</button>
            </div>
          )}
        </TrackedComponent>
      </Modal>
    </RequiresAvatarSdkToken>
  )
})
