import { useState } from "react"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { Button } from "@spatialsys/web/ui"

export default function SaveRoomButton() {
  const isSavingRoom = useAppContext((context) => AppStateSelectors.isSavingRoom(context.state.unity.appState))
  const isSaveRoomEnabled = useAppContext((context) =>
    AppStateSelectors.isSaveRoomEnabled(context.state.unity.appState)
  )

  const [saveButtonCooldown, setSaveButtonCooldown] = useState(false)

  const onClickSave = () => {
    if (!isSaveRoomEnabled) {
      Toast.notify("You are not allowed to save the room.", 3000)
      return
    }

    if (!isSavingRoom && !saveButtonCooldown) {
      UnityMessages.saveRoom()

      // Cooldown to avoid spam clicking
      setSaveButtonCooldown(true)
      setTimeout(() => {
        setSaveButtonCooldown(false)
      }, 2000)
    }
  }

  return (
    <Button
      className="hover:no-underline"
      variant="text"
      disabled={!isSaveRoomEnabled || isSavingRoom || saveButtonCooldown}
      onClick={onClickSave}
    >
      Save Space
    </Button>
  )
}
