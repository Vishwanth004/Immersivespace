import clsx from "clsx"
import { useCallback } from "react"

import { UnityMessages } from "@spatialsys/unity/bridge"
import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { Button } from "@spatialsys/web/ui"

import classes from "./block-ban-confirmation-modal.module.scss"

export interface BlockBanUserPayload {
  displayName: string
  userId: string
}

interface BlockConfirmModalProps {
  blockTarget?: BlockBanUserPayload
  handleClose: () => void
}

export const BlockConfirmationModal = (props: BlockConfirmModalProps) => {
  const { blockTarget, handleClose } = props

  const handleBlock = useCallback(() => {
    UnityMessages.blockUser(blockTarget?.userId)
    handleClose()
  }, [blockTarget?.userId, handleClose])

  return (
    <Modal isOpen={Boolean(blockTarget)} darkOverlay onRequestClose={handleClose}>
      <div className={clsx(modalClasses.body, classes.container)}>
        <div className={classes.title}>{`Block ${blockTarget?.displayName}?`}</div>
        <div className={classes.bodyText}>
          {`Blocking ${blockTarget?.displayName} will hide their messages in chat and prevent you from seeing or hearing their actions in this space.`}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button color="outline" size="xl" onClick={handleClose}>
            Don't Block
          </Button>
          <Button color="red" size="xl" onClick={handleBlock} type="submit">
            Block
          </Button>
        </div>
      </div>
    </Modal>
  )
}

interface BanConfirmModalProps {
  banTarget: BlockBanUserPayload
  handleClose: () => void
}

export const BanConfirmationModal = (props: BanConfirmModalProps) => {
  const { banTarget, handleClose } = props

  const handleBan = useCallback(() => {
    UnityMessages.banUserFromRoom(banTarget?.userId, 0)
    handleClose()
  }, [banTarget?.userId, handleClose])

  return (
    <Modal isOpen={Boolean(banTarget)} darkOverlay onRequestClose={handleClose}>
      <div className={clsx(modalClasses.body, classes.container)}>
        <div className={classes.title}>{`Block ${banTarget?.displayName}?`}</div>
        <div className={classes.bodyText}>
          {`Banning ${banTarget?.displayName} will hide their messages in chat for all Spatians and remove this user from the space.`}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button color="outline" size="xl" onClick={handleClose}>
            Don't Ban
          </Button>
          <Button color="red" size="xl" onClick={handleBan} type="submit">
            Ban
          </Button>
        </div>
      </div>
    </Modal>
  )
}
