import { useCallback, useEffect, useRef } from "react"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"

export interface SpatialToast {
  category: number // not sure if this means something
  id: number // unique id for the toast for that session
  messages: string[] // array of messages, where each entry should go on its own line
  isLoadingState: boolean
  showEllipses: boolean
}

export interface SpatialToastsObject {
  [id: number]: SpatialToast
}

const useUnityToastListener = (showToasts: boolean) => {
  const toasts = useAppContext((context) => AppStateSelectors.getToasts(context.state.unity.appState))
  const existingToastIds = useRef(new Set<string>())

  const showToastFromUnity = useCallback(
    (message: string, id: string) => Toast.notify(message, null, "toast-bg", id),
    []
  )

  useEffect(() => {
    if (toasts && showToasts) {
      const newToastIds = new Set(Object.keys(toasts))
      // diff present in old vs present in new to determine what to change
      const toBeRemoved = [...existingToastIds.current].filter((id) => !newToastIds.has(id))
      const toBeAdded = [...newToastIds].filter((id) => !existingToastIds.current.has(id))

      toBeRemoved.forEach(Toast.dismiss)
      toBeAdded.forEach((id) => {
        if (!toasts[id].isLoadingState) {
          showToastFromUnity(toasts[id]?.messages?.join("\n"), id)
        }
      })

      // update to new toasts
      existingToastIds.current = newToastIds
    }
    if (!toasts && existingToastIds.current.size > 0) {
      // No toasts exist; dismiss everything.
      existingToastIds.current.forEach(Toast.dismiss)
      existingToastIds.current = new Set()
    }
  }, [toasts, showToasts, showToastFromUnity])
}

export default useUnityToastListener
