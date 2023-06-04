import { Suspense, lazy } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"

import { ContentMenuProps } from "./content-menu"

const ContentMenu = lazy(() =>
  import(/* webpackChunkName: "content-menu" */ "./content-menu").then((module) => ({
    default: module.ContentMenu,
  }))
)

type ContentMenuModalProps = ContentMenuProps & Pick<ModalProps, "isOpen">

export const ContentMenuModal = (props: ContentMenuModalProps) => {
  const { isOpen, ...rest } = props

  return (
    <Modal darkOverlay isOpen={isOpen} onRequestClose={rest.closeContentMenu}>
      <Suspense fallback={null}>
        <TrackedComponent id={TrackedComponents.ContentMenuModal}>
          <InstanceCount>
            <ContentMenu {...rest} />
          </InstanceCount>
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
}
