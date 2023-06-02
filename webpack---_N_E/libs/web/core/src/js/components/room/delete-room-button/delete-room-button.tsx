import clsx from "clsx"
import { useRouter } from "next/router"
import * as React from "react"

import { useDeleteSpaceMutation } from "@spatialsys/react/query-hooks/sapi/spaces"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { trackRoomDelete } from "@spatialsys/web/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { ConfirmDelete } from "@spatialsys/web/core/js/components/confirm-delete/confirm-delete"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { sapiClient } from "@spatialsys/web/sapi"
import { Heading } from "@spatialsys/web/ui"

import classes from "./delete-room-button.module.scss"

interface DeleteRoomButtonProps {
  roomId: string
  roomOwnerId: string
  userId: string
}

export default function DeleteRoomButton(props: DeleteRoomButtonProps) {
  const isRoomOwner = useAppContext((context) =>
    AppStateSelectors.isUserRoomOwner(context.state.unity.appState, props.userId)
  )
  const otherUsersInRoom = useAppContext((context) =>
    AppStateSelectors.areOtherUsersInRoom(context.state.unity.appState, props.userId)
  )
  const isDeleteEnabled = useAppContext((context) =>
    AppStateSelectors.isDeleteRoomEnabled(context.state.unity.appState)
  )
  const { push } = useRouter()
  const { mutate } = useDeleteSpaceMutation(sapiClient)

  const deleteRoom = React.useCallback(() => {
    mutate(
      { roomId: props.roomId },
      {
        onSuccess: () => {
          Toast.dismiss()
          void push("/")
        },
        onError: (error: any) => {
          Toast.notify(error?.response?.data)
        },
      }
    )
  }, [mutate, props.roomId, push])

  const confirmDeleteRoom = React.useCallback(() => {
    if (!isRoomOwner) {
      Toast.notify("You must be this space's owner in order to delete it.", 5000)
      return
    }
    if (otherUsersInRoom) {
      Toast.notify("You can't delete a space while there are other users in it.", 5000)
      return
    }

    Toast.notifyConfirm({
      message: ({ closeToast }) => (
        <div className="p-4">
          <InstanceCount />
          <Heading size="h2" className="pb-3">
            Delete Space
          </Heading>
          <p className="pb-4">Are you sure you want to delete the space and all its data?</p>
          <ConfirmDelete />
          <button type="button" className="hover pr-8" onClick={closeToast}>
            Cancel
          </button>

          <button
            type="button"
            className={clsx(classes.confirmButton, "hover", "pt-4")}
            onClick={() => {
              trackRoomDelete()
              deleteRoom()
              closeToast()
            }}
          >
            Yes
          </button>
        </div>
      ),
      containerId: Toast.InRoomContainerId,
    })
  }, [isRoomOwner, otherUsersInRoom, deleteRoom])

  return (
    <button type="button" className={classes.deleteRoomButton} onClick={confirmDeleteRoom} disabled={!isDeleteEnabled}>
      Delete Space
    </button>
  )
}
