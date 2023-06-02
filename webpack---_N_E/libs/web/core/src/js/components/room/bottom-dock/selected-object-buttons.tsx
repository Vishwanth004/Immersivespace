import { useTrackInteraction, withTrackedComponent } from "libs/react/analytics/src/tracked-component/tracked-component"
import { memo, useCallback, useEffect, useRef } from "react"

import { ReactComponent as CachedIcon } from "@spatialsys/assets/icons/material-filled/cached.svg"
import { ReactComponent as DeleteOutlineIcon } from "@spatialsys/assets/icons/material-filled/delete-outline.svg"
import { ReactComponent as EditIcon } from "@spatialsys/assets/icons/material-filled/edit.svg"
import { ReactComponent as DownloadIcon } from "@spatialsys/assets/icons/material-filled/get-app.svg"
import { ReactComponent as InfoIcon } from "@spatialsys/assets/icons/material-filled/info.svg"
import { ReactComponent as LockOpenIcon } from "@spatialsys/assets/icons/material-filled/lock-open.svg"
import { ReactComponent as LockIcon } from "@spatialsys/assets/icons/material-filled/lock.svg"
import { ReactComponent as ZoomInIcon } from "@spatialsys/assets/icons/material-filled/zoom-in.svg"
import { ReactComponent as InfoOutlinedIcon } from "@spatialsys/assets/icons/material-outlined/info.svg"
import { InteractionName, InteractionType, TrackedComponents } from "@spatialsys/react/analytics"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import CustomEnvIcon from "@spatialsys/web/core/img/icons/custom-environment@2x.png"
import DuplicateIcon from "@spatialsys/web/core/img/icons/duplicate@2x.png"
import FrameDisabledIcon from "@spatialsys/web/core/img/icons/frame-disabled.png"
import FrameEnabledIcon from "@spatialsys/web/core/img/icons/frame-enabled.png"
import PedestalDisabledIcon from "@spatialsys/web/core/img/icons/pedestal-disabled.png"
import PedestalEnabledIcon from "@spatialsys/web/core/img/icons/pedestal-enabled.png"
import { ReactComponent as UploadIcon } from "@spatialsys/web/core/img/icons/upload.svg"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"

import Button from "./buttons/button"

import classes from "./selected-object-buttons.module.scss"

export type SelectedObjectButtonsProps = {
  onTransformButtonClick: () => void
  onInfoButtonClick: () => void
  toggleObjectLightbox: () => void
  addContentDisabled: boolean
}

const SelectedObjectButtons = memo(function SelectedObjectButtons(props: SelectedObjectButtonsProps) {
  const { hyperlinksV2 } = useUser().user.treatmentsParsed

  const trackInteraction = useTrackInteraction()

  const deleteConfirmToastRef = useRef<Toast.ToastId>(null)

  const selectedObjectId = useAppContext((context) => context.state.unity.appState.roomSession.selectedObject.objectID)
  const isImageOrVideo = useAppContext((context) =>
    AppStateSelectors.isImageOrVideoObject(context.state.unity.appState, selectedObjectId)
  )
  const isEmptyFrame = useAppContext((context) =>
    AppStateSelectors.isSelectedObjectEmptyFrame(context.state.unity.appState)
  )
  const setIsCustomEnvModalVisible = useAppContext((context) => context.actions.setIsCustomEnvModalVisible)

  const {
    downloadButtonDisplayed,
    lockButtonDisplayed,
    replaceContentButtonDisplayed,
    transformButtonDisplayed,
    duplicateButtonDisplayed,
    deleteButtonDisplayed,
    customEnvironmentButtonDisplayed,
    infoButtonDisplayed,
    frameButtonDisplayed,
    pedestalButtonDisplayed,
    objectURL,
    isLocked,
    infoDisplayed,
    frameDisplayed,
    pedestalDisplayed,
    canAddHyperlink,
    isNft,
  } = useAppContext((context) => AppStateSelectors.getSelectedObjectButtonState(context.state.unity.appState))

  useEffect(() => {
    return () => {
      if (deleteConfirmToastRef.current) {
        Toast.dismiss(deleteConfirmToastRef.current)
      }
    }
  }, [])

  const onDeleteButtonClick = useCallback(() => {
    if (isLocked) {
      UnityMessages.showToast("Unlock first to delete")
      return
    }
    if (!Toast.isActive(deleteConfirmToastRef.current)) {
      deleteConfirmToastRef.current = Toast.notifyConfirm({
        message: ({ closeToast }) => (
          <div className="p-4">
            <InstanceCount />
            <p className="pb-4">
              Are you sure you want to delete this object?
              <br />
              You can’t undo this.
            </p>
            <button type="button" className="hover pr-8" onClick={closeToast}>
              Cancel
            </button>

            <button
              type="button"
              className="hover pt-4 text-red"
              onClick={() => {
                UnityMessages.deleteObject(selectedObjectId)
                closeToast()
              }}
            >
              Yes
            </button>
          </div>
        ),
        containerId: Toast.InRoomContainerId,
      })
    }
  }, [isLocked, selectedObjectId])

  const onCustomEnvClick = useCallback(() => {
    if (isLocked) {
      UnityMessages.showToast("Unlock first before setting custom environment")
      return
    }
    trackInteraction({ type: InteractionType.Click, name: InteractionName.CustomEnvFromObject })

    setIsCustomEnvModalVisible(true)
  }, [isLocked, setIsCustomEnvModalVisible, trackInteraction])

  const enterDownload = useCallback(async () => {
    const response = await fetch(objectURL, { method: "GET" })
    if (response.status !== 200) {
      console.warn(`Encountered HTTP ${response.status} when attempting to fetch object URL ${objectURL}`)
      UnityMessages.showToast("Could not load file")
      return
    }

    const newWindow = window.open(response.url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  }, [objectURL])

  const editFrame = useCallback(() => UnityMessages.setUploadTargetEmptyFrameID(selectedObjectId), [selectedObjectId])
  const toggleLocked = useCallback(
    () => UnityMessages.setObjectLocked(selectedObjectId, !isLocked),
    [isLocked, selectedObjectId]
  )
  const duplicateObject = useCallback(() => UnityMessages.duplicateObject(selectedObjectId), [selectedObjectId])
  const toggleFrame = useCallback(
    () => UnityMessages.setGalleryFrameVisibility(selectedObjectId, !frameDisplayed),
    [frameDisplayed, selectedObjectId]
  )
  const toggleNftPlaque = useCallback(
    () => UnityMessages.setGalleryInfoVisibility(selectedObjectId, !infoDisplayed),
    [infoDisplayed, selectedObjectId]
  )
  const togglePedestal = useCallback(
    () => UnityMessages.setGalleryPedestalVisibility(selectedObjectId, !pedestalDisplayed),
    [pedestalDisplayed, selectedObjectId]
  )

  return (
    <>
      <Button
        displayed={downloadButtonDisplayed}
        tooltipText="Download"
        label="Download"
        onClick={enterDownload}
        ligature={<DownloadIcon />}
      />
      {!hyperlinksV2 && (
        <Button
          displayed={isImageOrVideo}
          onClick={props.toggleObjectLightbox}
          ligature={<ZoomInIcon />}
          tooltipText="Zoom"
          label="Zoom"
        />
      )}
      <Button
        displayed={lockButtonDisplayed}
        tooltipText={isLocked ? "Unlock" : "Lock"}
        label="Lock"
        onClick={toggleLocked}
        ligature={isLocked ? <LockIcon /> : <LockOpenIcon />}
      />
      <Button
        displayed={replaceContentButtonDisplayed}
        tooltipText={isEmptyFrame ? "Upload" : "Replace"}
        label={isEmptyFrame ? "Upload" : "Replace"}
        onClick={editFrame}
        ligature={isEmptyFrame ? <UploadIcon style={{ marginTop: "4px" }} /> : <CachedIcon />}
      />
      <Button
        displayed={transformButtonDisplayed}
        tooltipText="Edit"
        label="Edit"
        onClick={props.onTransformButtonClick}
        ligature={<EditIcon />}
      />
      {/* TODO: Dev-12624 remove !istNft after consolidating the other info button below.  Will need to use isNft to conditionally pass in props for this button */}
      {(hyperlinksV2 || !isNft) && (
        <Button
          displayed={canAddHyperlink}
          tooltipText="Info"
          label="Info"
          onClick={props.onInfoButtonClick}
          ligature={<InfoIcon />}
        />
      )}
      <Button
        displayed={duplicateButtonDisplayed}
        tooltipText="Duplicate"
        label="Duplicate"
        onClick={duplicateObject}
        ligature={<img alt="Duplicate" src={DuplicateIcon.src} className={classes.icon} />}
      />
      <Button
        displayed={customEnvironmentButtonDisplayed}
        tooltipText="Set Custom Environment"
        label="Custom Environment"
        onClick={onCustomEnvClick}
        ligature={<img alt="CustomEnvIcon" src={CustomEnvIcon.src} className={classes.icon} />}
      />
      {/* TODO: DEV-12624 remove unnecessary button after hyperlinksV2 launches.  Note you will need to make sure the onClick works properly   */}
      {!hyperlinksV2 && (
        <Button
          displayed={infoButtonDisplayed}
          tooltipText={infoDisplayed ? "Hide plaque" : "Show plaque"}
          label="Info"
          onClick={toggleNftPlaque}
          ligature={infoDisplayed ? <InfoIcon /> : <InfoOutlinedIcon />}
        />
      )}

      <Button
        displayed={frameButtonDisplayed}
        tooltipText={frameDisplayed ? "Hide frame" : "Show frame"}
        label="Frame"
        onClick={toggleFrame}
        ligature={
          <img
            alt="Frame"
            src={frameDisplayed ? FrameEnabledIcon.src : FrameDisabledIcon.src}
            className={classes.icon}
          />
        }
      />
      <Button
        displayed={pedestalButtonDisplayed}
        tooltipText={pedestalDisplayed ? "Hide pedestal" : "Show pedestal"}
        label="Pedestal"
        onClick={togglePedestal}
        ligature={
          <img
            alt="Pedestal"
            src={pedestalDisplayed ? PedestalEnabledIcon.src : PedestalDisabledIcon.src}
            className={classes.icon}
          />
        }
      />
      <Button
        displayed={deleteButtonDisplayed}
        tooltipText="Delete"
        label="Delete"
        onClick={onDeleteButtonClick}
        fakeDisabled={isLocked}
        ligature={<DeleteOutlineIcon />}
      />
    </>
  )
})

const TrackedSelectedObjectButtons = withTrackedComponent(SelectedObjectButtons, {
  id: TrackedComponents.SelectedObjectButtons,
  className: classes.container,
  as: "div",
})

export { TrackedSelectedObjectButtons as SelectedObjectButtons }
