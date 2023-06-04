import { ObjectType, TrackedComponents, withTrackedComponent } from "@spatialsys/react/analytics"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import { useTrackConfirmHyperlink } from "@spatialsys/web/core/js/components/confirm-modal/hyperlinks-confirm-modal/use-hyperlinks-tracking"
import { ConfirmModalWithTrackingProps } from "@spatialsys/web/core/js/components/spatial-unity-web-gl/create-alert"
import { Heading } from "@spatialsys/web/ui"

export function HyperlinksConfirmModalComponent(props: ConfirmModalWithTrackingProps) {
  const { close, unityAlert, reply } = props

  const trackConfirmHyperlink = useTrackConfirmHyperlink(unityAlert?.linkHref, ObjectType.Portal)

  const handleClose = (feedback: string) => {
    const isConfirm = feedback === unityAlert?.permitText
    trackConfirmHyperlink(isConfirm)
    close()
    reply(feedback)
  }
  return (
    <ConfirmModal
      isOpen
      title={unityAlert.title}
      subtitle={
        <Heading as="h4" size="h4" textAlign="center" className="mb-2 text-gray-500">
          {unityAlert.message}
        </Heading>
      }
      message={<Heading as="h4" size="h4" textAlign="center" weight="black">{`${unityAlert.linkHref} ?`}</Heading>}
      denyText={unityAlert.deniedText}
      confirmText={unityAlert.permitText}
      onDismiss={() => handleClose(unityAlert.deniedText)}
      onDeny={() => handleClose(unityAlert.deniedText)}
      onConfirm={() => handleClose(unityAlert.permitText)}
    />
  )
}

export const HyperlinksConfirmModal = withTrackedComponent(HyperlinksConfirmModalComponent, {
  id: TrackedComponents.HyperlinksConfirmModal,
})
