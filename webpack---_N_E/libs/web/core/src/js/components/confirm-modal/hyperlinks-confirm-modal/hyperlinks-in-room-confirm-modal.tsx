import { memo, useCallback } from "react"

import { TrackedComponents, getObjectType, withTrackedComponent } from "@spatialsys/react/analytics"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import { useTrackConfirmHyperlink } from "@spatialsys/web/core/js/components/confirm-modal/hyperlinks-confirm-modal/use-hyperlinks-tracking"
import { Heading } from "@spatialsys/web/ui"

type HyperlinksBaseConfirmModalProps = {
  isOpen: boolean
  close: () => void
  selectedObjectId: number
  link: string
}

export const HyperlinksInRoomConfirmModalComponent = memo((props: HyperlinksBaseConfirmModalProps) => {
  const { isOpen, close, selectedObjectId, link } = props

  const isObjectImage = useAppContext((context) =>
    AppStateSelectors.isImage(context.state.unity.appState, selectedObjectId)
  )
  const isObjectVideo = useAppContext((context) =>
    AppStateSelectors.isVideo(context.state.unity.appState, selectedObjectId)
  )
  const objectType = getObjectType(isObjectImage, isObjectVideo)
  const trackConfirmHyperlink = useTrackConfirmHyperlink(link, objectType)

  const handleClose = useCallback(
    (isConfirm: boolean) => {
      trackConfirmHyperlink(isConfirm)
      close()
    },
    [close, trackConfirmHyperlink]
  )

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="You're Leaving Spatial"
      subtitle={
        <Heading as="h4" size="h4" textAlign="center" className="mb-2 text-gray-500">
          Are you sure you want to go to
        </Heading>
      }
      message={<Heading as="h4" size="h4" textAlign="center" weight="black">{`${link} ?`}</Heading>}
      denyText="No, Stay here"
      confirmText="Yes, Let's Go"
      onDismiss={() => handleClose(false)}
      onDeny={() => handleClose(false)}
      onConfirm={() => handleClose(true)}
      withInstanceCount
      linkHref={link}
    />
  )
})

export const HyperlinksInRoomConfirmModal = withTrackedComponent(HyperlinksInRoomConfirmModalComponent, {
  id: TrackedComponents.HyperlinksConfirmModal,
})
