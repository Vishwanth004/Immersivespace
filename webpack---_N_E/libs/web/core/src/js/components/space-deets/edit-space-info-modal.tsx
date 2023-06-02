import { AxiosError } from "axios"
import { lazy, useCallback, useEffect, useRef } from "react"

import { SAPIRequestError } from "@spatialsys/js/sapi/types"
import { parseError } from "@spatialsys/js/sapi/utils/parse-error"
import {
  InteractionName,
  InteractionType,
  TrackedComponent,
  TrackedComponents,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useEditSpaceMutation } from "@spatialsys/react/query-hooks/sapi/spaces"
import { useDeleteCustomThumbnailMutation, useSetCustomThumbnailMutation } from "@spatialsys/react/query-hooks/spaces"
import { RoomData } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { RoomModalBase } from "@spatialsys/web/core/js/routes/rooms/room/room-modal-base"
import { sapiClient, sapiSpaceClient } from "@spatialsys/web/sapi"

import { type ConfirmEditSpaceInfo, type EditSpaceInfoHandle } from "./edit-space-info"

import classes from "./edit-space-info-modal.module.scss"

const EditSpaceInfo = lazy(() =>
  import(/* webpackChunkName: "edit-space-info" */ "./edit-space-info").then((module) => ({
    default: module.EditSpaceInfo,
  }))
)

type EditSpaceInfoModalProps = {
  space: RoomData
  isOpen: boolean
  close: () => void
  dismissCopy?: string
  title?: string
}

const ID = TrackedComponents.EditSpaceInfo

export const EditSpaceInfoModal = ({ space, isOpen, close, dismissCopy, title }: EditSpaceInfoModalProps) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useBoolean(false)
  const trackInteraction = useTrackInteraction()
  const { mutateAsync: editSpace, isLoading: isEditSpaceLoading } = useEditSpaceMutation(sapiClient)
  const { mutateAsync: setThumbnail, isLoading: isSetThumbnailLoading } = useSetCustomThumbnailMutation(sapiSpaceClient)
  const { mutateAsync: deleteThumbnail, isLoading: isDeleteThumbnailLoading } =
    useDeleteCustomThumbnailMutation(sapiSpaceClient)
  const editSpaceInfoRef = useRef<EditSpaceInfoHandle>()

  useEffect(() => {
    if (!isOpen) {
      setIsCancelModalOpen.setFalse()
    }
  }, [isOpen, setIsCancelModalOpen])

  const handleDismiss = useCallback(() => {
    editSpaceInfoRef.current?.isModified ? setIsCancelModalOpen.setTrue() : close()
  }, [close, setIsCancelModalOpen])

  const saveEditSpaceInfo = useCallback(
    async ({ name, description, tags, isCustomThumbnail, customThumbnail }: ConfirmEditSpaceInfo) => {
      const onError = (error: AxiosError<SAPIRequestError<any>>) => {
        const sapiError = error.response?.data?.errors?.at(0)
        if (sapiError) {
          const errorMessage = parseError(sapiError)
          Toast.error(errorMessage[0]?.message, 5000)
        } else {
          Toast.error("Error saving space info, try again later.")
        }
      }
      const editPromises = [editSpace({ roomId: space.id, name, description, tags }, { onError })]
      if (!isCustomThumbnail) {
        editPromises.push(deleteThumbnail({ roomId: space.id }, { onError }))
      } else if (isCustomThumbnail && customThumbnail) {
        editPromises.push(setThumbnail({ roomId: space.id, thumbnail: customThumbnail.file }, { onError }))
      }
      try {
        await Promise.all(editPromises)
        Toast.notify("Your space info has been saved.")
        UnityMessages.editRoomInfo({ roomId: space.id, skipSapiCall: true, name, description, tags })
        close()
        trackInteraction(
          {
            name: InteractionName.EditSpaceInfoSave,
            type: InteractionType.Submission,
            component: ID,
          },
          {
            // If title is passed, then this is from the publish flow (publish space/go live)
            "Is From Publish Flow": Boolean(title),
            "Has Custom Thumbnail": isCustomThumbnail,
            "Has Description": Boolean(description.length),
            "Has Tags": Boolean(tags.length),
          }
        )
      } catch (err) {
        // The error is already handled by the onError callback
        console.error("Error saving space info", err)
      }
    },
    [editSpace, space.id, deleteThumbnail, setThumbnail, close, trackInteraction, title]
  )

  const confirmCancel = useCallback(() => {
    trackInteraction({
      name: InteractionName.EditSpaceInfoCancelConfirm,
      type: InteractionType.Click,
      component: TrackedComponents.EditSpaceInfo,
    })
    close()
  }, [close, trackInteraction])

  return (
    <>
      <RoomModalBase isOpen={isOpen} close={handleDismiss} modalBodyClassName={classes.container} showCloseButton>
        <TrackedComponent id={ID}>
          <EditSpaceInfo
            ref={editSpaceInfoRef}
            space={space}
            onDismiss={handleDismiss}
            onConfirm={saveEditSpaceInfo}
            isSaving={isEditSpaceLoading || isSetThumbnailLoading || isDeleteThumbnailLoading}
            dismissCopy={dismissCopy}
            title={title}
          />
        </TrackedComponent>
      </RoomModalBase>

      <ConfirmModal
        isOpen={isCancelModalOpen}
        title="Are you sure?"
        message={<div className={classes.confirmModalMessage}>Your changes will be lost.</div>}
        confirmText="Yes"
        denyText="Go back"
        onConfirm={confirmCancel}
        onDeny={setIsCancelModalOpen.setFalse}
        onDismiss={setIsCancelModalOpen.setFalse}
      />
    </>
  )
}
