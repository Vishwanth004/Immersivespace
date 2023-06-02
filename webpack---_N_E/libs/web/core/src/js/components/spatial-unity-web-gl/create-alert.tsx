import { toast } from "react-toastify"

import { TrackingContextProvider } from "@spatialsys/react/analytics"
import { RequestAlertToReactType } from "@spatialsys/unity/app-state"
import { ReactAlertMessage } from "@spatialsys/unity/bridge"
import { track } from "@spatialsys/web/analytics"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import { HyperlinksConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/hyperlinks-confirm-modal/hyperlinks-confirm-modal"
import { ConfirmToast } from "@spatialsys/web/core/js/components/confirm-toast/confirm-toast"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { createDialog } from "@spatialsys/web/core/js/util/create-dialog"
import { Heading } from "@spatialsys/web/ui"

export type ConfirmModalWithTrackingProps = {
  unityAlert: ReactAlertMessage
  reply: (feedback: string) => void
  close: () => void
}

export default function createAlert(unityAlert: ReactAlertMessage, reply: (feedback: string) => void) {
  switch (unityAlert.alertType) {
    case RequestAlertToReactType.ConfirmPortalPermissions:
    case RequestAlertToReactType.NFTEnvironmentFallback:
    case RequestAlertToReactType.ChangeEnvironmentFromContentMenu:
      createDialog(({ close }) => {
        const handleClose = (feedback: string) => {
          close()
          reply(feedback)
        }

        return (
          <ConfirmModal
            isOpen
            title={unityAlert.title}
            subtitle={
              <Heading as="h5" size="h5" textAlign="center">
                {unityAlert.linkHref}
              </Heading>
            }
            message={
              <Heading as="h5" size="h5" textAlign="center">
                {unityAlert.message}
              </Heading>
            }
            denyText={unityAlert.deniedText}
            confirmText={unityAlert.permitText}
            // Do not allow background dismiss - do nothing
            onDismiss={() => undefined}
            onDeny={() => handleClose(unityAlert.deniedText)}
            onConfirm={() => handleClose(unityAlert.permitText)}
          />
        )
      })
      break
    case RequestAlertToReactType.NavigateWithHyperlink:
      createDialog(({ close }) => (
        <TrackingContextProvider track={track}>
          <HyperlinksConfirmModal close={close} unityAlert={unityAlert} reply={reply} />
        </TrackingContextProvider>
      ))
      break
    default:
      // need prefix to make sure toastID doesn't collide with our actual toasts
      // eslint-disable-next-line no-case-declarations
      const toastId = `spatial_unity_alert_${unityAlert.callbackID}`

      Toast.notifyConfirm({
        message: ({ closeToast }) => {
          const handleClose = (feedback: string) => {
            reply(feedback)
            closeToast()
          }

          return (
            <InstanceCount>
              <ConfirmToast
                title={unityAlert.title}
                message={unityAlert.message}
                denyText={unityAlert.deniedText}
                confirmText={unityAlert.permitText}
                onDeny={() => handleClose(unityAlert.deniedText)}
                onConfirm={() => handleClose(unityAlert.permitText)}
              />
            </InstanceCount>
          )
        },
        containerId: Toast.InRoomContainerId,
        options: { toastId, position: toast.POSITION.TOP_CENTER },
      })
  }
}
