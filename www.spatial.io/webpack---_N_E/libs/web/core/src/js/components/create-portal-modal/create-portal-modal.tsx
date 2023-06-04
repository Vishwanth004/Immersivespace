import { Suspense, lazy, memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import type { CreatePortalModalContentProps } from "@spatialsys/web/core/js/components/create-portal-modal/create-portal-modal-content"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import {
  ModalWithInstanceCount,
  ModalWithInstanceCountProps,
} from "@spatialsys/web/core/js/components/modal-with-instance-count/modal-with-instance-count"

export type CreatePortal = (spaceId?: string, linkHref?: string, linkLabel?: string) => void

type CreatePortalModalProps = { currentSpaceId: string } & CreatePortalModalContentProps & ModalWithInstanceCountProps

const CreatePortalModalContent = lazy(() =>
  import(/* webpackChunkName: "create-portal-modal-content" */ "./create-portal-modal-content").then((module) => ({
    default: module.CreatePortalModalContent,
  }))
)

export const CreatePortalModal = memo(function CreatePortalModal(props: CreatePortalModalProps) {
  const { handleOpenSpacePicker, handleOpenCreateHyperlinkPortal, ...rest } = props

  return (
    <ModalWithInstanceCount {...rest}>
      <TrackedComponent id={TrackedComponents.CreatePortalModal}>
        <InstanceCount />
        <Suspense fallback={null}>
          <CreatePortalModalContent
            handleOpenSpacePicker={handleOpenSpacePicker}
            handleOpenCreateHyperlinkPortal={handleOpenCreateHyperlinkPortal}
          />
        </Suspense>
      </TrackedComponent>
    </ModalWithInstanceCount>
  )
})
