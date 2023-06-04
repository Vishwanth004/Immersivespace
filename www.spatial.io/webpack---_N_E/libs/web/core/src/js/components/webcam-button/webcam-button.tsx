import clsx from "clsx"
import { FormEvent, memo, useCallback, useEffect, useState } from "react"

import { ReactComponent as TuneIcon } from "@spatialsys/assets/icons/material-filled/tune.svg"
import { ReactComponent as VideocamOffIcon } from "@spatialsys/assets/icons/material-outlined/videocam-off.svg"
import { ReactComponent as VideocamIcon } from "@spatialsys/assets/icons/material-outlined/videocam.svg"
import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"
import PermissionThumbnail from "@spatialsys/web/core/img/concept-thumbnails/allow-camera-permission-thumbnail.jpg"
import VideocamErrorIcon from "@spatialsys/web/core/img/icons/cam-error.svg"
import PermissionPointerIcon from "@spatialsys/web/core/img/icons/permission-dialog-pointer.png"
import CircleButton from "@spatialsys/web/core/js/components/circle-button/circle-button"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { TooltipButton } from "@spatialsys/web/core/js/components/tooltip-button/tooltip-button"
import { WebcamStatus } from "@spatialsys/web/rtc/rtc-state"
import { Storage } from "@spatialsys/web/storage"
import { Button, Heading } from "@spatialsys/web/ui"

import classes from "./webcam-button.module.scss"

interface WebcamButtonProps {
  webcamEnabled: boolean
  webcamStatus?: WebcamStatus
  disabled?: boolean
  onClick: (disabled: boolean) => void
  onTooltipSettingsClick: () => void
}

const WebcamButton = memo(function WebcamButton(props: WebcamButtonProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)
  const { webcamEnabled, webcamStatus, disabled, onClick, onTooltipSettingsClick } = props

  const webcamStatusIsError =
    webcamStatus === WebcamStatus.PermissionsDenied || webcamStatus === WebcamStatus.Unavailable
  const buttonDisabled = disabled || webcamStatusIsError
  const tooltipText = webcamEnabled ? "Turn off camera" : "Turn on camera"

  const handleToggleCameraClick = useCallback(
    (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault()
      onClick(buttonDisabled)
    },
    [buttonDisabled, onClick]
  )

  useEffect(() => {
    if (webcamStatusIsError) {
      if (!window.sessionStorage.getItem(Storage.HAS_DISPLAYED_VIDEO_PERMISSIONS_MODAL)) {
        setIsNotificationOpen(true)
      }
    }
  }, [webcamStatusIsError])

  const handleCloseNotification = useCallback(() => {
    setIsNotificationOpen(false)
    window.sessionStorage.setItem(Storage.HAS_DISPLAYED_VIDEO_PERMISSIONS_MODAL, "true")
  }, [])

  return (
    <>
      <CircleButton
        className={classes.container}
        onClick={handleToggleCameraClick}
        fakeDisabled={buttonDisabled}
        color={webcamEnabled ? "white" : "outline"}
        tooltipButton={
          !buttonDisabled && (
            <TooltipButton
              buttonText={tooltipText}
              className={classes.tooltipButton}
              icon={<TuneIcon />}
              onClick={onTooltipSettingsClick}
            />
          )
        }
      >
        {!buttonDisabled && (webcamEnabled ? <VideocamIcon /> : <VideocamOffIcon />)}
        {buttonDisabled && <img src={VideocamErrorIcon} className={classes.webcamIconError} alt="WebcamError" />}
      </CircleButton>
      <Modal darkOverlay isOpen={isNotificationOpen}>
        <div className={clsx(modalClasses.body, classes.modalContainer)}>
          <img className={classes.modalThumbnail} src={PermissionThumbnail.src} alt="permission thumbnail" />
          <p>
            <img
              className={classes.modalPermissionPointerIcon}
              src={PermissionPointerIcon.src}
              alt="permission pointer"
            />
            <Heading as="h4" size="h3" className="mb-2 mt-5">
              Allow camera permissions
            </Heading>
          </p>
          <p className={classes.modalMessage}>
            If you're having issues, check out{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://support.spatial.io/hc/en-us/articles/360049635111-Troubleshooting-Webcam-and-Microphone-on-the-Web-App"
            >
              this guide
            </a>
          </p>
          <div>
            <Button className="px-12" onClick={handleCloseNotification} size="xl">
              Okay
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
})

export default WebcamButton
