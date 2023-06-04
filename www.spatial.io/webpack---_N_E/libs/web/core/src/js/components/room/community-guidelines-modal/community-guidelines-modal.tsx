import Image from "next/legacy/image"
import { memo } from "react"

import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import { Button } from "@spatialsys/web/ui"

import CommunityGraphic from "./community-graphic.jpg"

import classes from "./community-guidelines-modal.module.scss"

interface CommunityGuidelinesModalProps extends Pick<ModalProps, "isOpen" | "onRequestClose"> {
  roomName: string
}

export const CommunityGuidelinesModal = memo(function (props: CommunityGuidelinesModalProps) {
  const { isOpen, roomName, onRequestClose } = props

  return (
    <Modal darkOverlay isOpen={isOpen} modalBaseClass={classes.modal} onRequestClose={onRequestClose}>
      <InstanceCount />
      <div className="flex items-center text-center">
        <div className={classes.messageBody}>
          <div className={classes.header}>Welcome to {roomName}!</div>
          <ul>
            <li className={classes.text}>1. Have fun!</li>
            <li className={classes.text}>2. Keep it civil</li>
            <li className={classes.text}>3. Respect others</li>
          </ul>
          <Button className="mt-4 px-8" size="xl" onClick={onRequestClose}>
            Got it
          </Button>
          <div className={classes.subText}>
            Whatever you do here, we ask that you keep things within the bounds of our{" "}
            <a href="/guidelines" className={classes.link} target="_blank" rel="noreferrer">
              Community Guidelines
            </a>
          </div>
        </div>

        <div className="p-3">
          <Image
            src={CommunityGraphic}
            alt="Community"
            draggable={false}
            width={578}
            height={510}
            layout="fixed"
            className="rounded-2xl"
          />
        </div>
      </div>
    </Modal>
  )
})
