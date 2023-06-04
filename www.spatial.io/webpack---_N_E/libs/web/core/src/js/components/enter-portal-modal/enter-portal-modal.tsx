import { useRouter } from "next/router"
import { memo, useCallback } from "react"

import { RequestAlertToReactType, RoomJoinMethod } from "@spatialsys/unity/app-state"
import { formatSpacePath } from "@spatialsys/url-utils"
import { useAppContext } from "@spatialsys/web/app-context"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"

export const EnterPortalModal = memo(function EnterPortalModal() {
  const { push } = useRouter()
  const alertFromUnity = useAppContext((context) => context.state.alertFromUnity)
  const actions = useAppContext((context) => context.actions)
  const onClose = useCallback(() => actions.setAlertFromUnity(null), [actions])

  const onConfirm = useCallback(() => {
    actions.setSpaceJoinContext({
      method: RoomJoinMethod.UserJumpedThroughPortal,
    })
    onClose()
    const pathname = formatSpacePath(alertFromUnity.roomId, alertFromUnity.roomSlug)
    void push(pathname)
  }, [actions, alertFromUnity?.roomId, alertFromUnity?.roomSlug, onClose, push])

  return (
    alertFromUnity && (
      <ConfirmModal
        isOpen={alertFromUnity.alertType === RequestAlertToReactType.EnterPortal}
        title={alertFromUnity.title}
        denyText={alertFromUnity.deniedText}
        confirmText={alertFromUnity.permitText}
        onDismiss={onClose}
        onDeny={onClose}
        onConfirm={onConfirm}
      />
    )
  )
})
