import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { PushNotificationPermissionModalType } from "@spatialsys/web/app-state"
import { Modal, modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"

import classes from "./notification-permission-modal.module.scss"

const NotificationPermissionModalContent = lazy(() =>
  import(/* webpackChunkName: "notif-permission-modal-content" */ "./notification-permission-modal-content").then(
    (mod) => ({ default: mod.NotificationPermissionModalContent })
  )
)

export const NotificationPermissionModal = memo(function NotificationPermissionModal() {
  const pushNotificationPermissionModalType = useAppContext(
    (context) => context.state.pushNotificationPermissionModalType
  )
  const actions = useAppContext((context) => context.actions)

  return (
    <Modal
      isOpen={pushNotificationPermissionModalType !== PushNotificationPermissionModalType.None}
      modalBaseClass={modalClassesBase.base}
      overlayAdditionalBaseClass={classes.overlay}
      onRequestClose={actions.dismissPushNotificationPermission}
      darkOverlay
    >
      <Suspense fallback={null}>
        <TrackedComponent
          id={TrackedComponents.NotificationPermissionModal}
          properties={{ "Modal Type": PushNotificationPermissionModalType[pushNotificationPermissionModalType] }}
        >
          <NotificationPermissionModalContent
            type={pushNotificationPermissionModalType}
            onDismiss={actions.dismissPushNotificationPermission}
            onConfirm={actions.acceptPushNotificationPermission}
          />
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
})
