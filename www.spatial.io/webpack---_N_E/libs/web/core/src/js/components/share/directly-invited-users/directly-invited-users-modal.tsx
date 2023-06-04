import clsx from "clsx"
import { memo } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import {
  DirectlyInvitedUsers,
  DirectlyInvitedUsersProps,
} from "@spatialsys/web/core/js/components/share/directly-invited-users/directly-invited-users"
import {
  InviteGuestsForm,
  InviteGuestsFormProps,
} from "@spatialsys/web/core/js/components/share/directly-invited-users/invite-guests-form"
import { Heading } from "@spatialsys/web/ui"

import classes from "./directly-invited-users-modal.module.scss"

interface DirectlyInvitedUsersModalProps extends DirectlyInvitedUsersProps, InviteGuestsFormProps {
  isOpen: boolean
  onClose: () => void
}

export const DirectlyInvitedUsersModal = memo(function DirectlyInvitedUsersModal(
  props: DirectlyInvitedUsersModalProps
) {
  const { isOpen, onClose, ...rest } = props
  const { onAddInvitedUsers, ...directlyInvitedUsersProps } = rest

  return (
    <Modal darkOverlay isOpen={isOpen} onRequestClose={onClose}>
      <InstanceCount>
        <TrackedComponent id={TrackedComponents.ShareDirectlyInvitedUsersModal}>
          <div className={clsx(classes.container)}>
            <button className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </button>
            <Heading size="h3" textAlign="center" className="mb-6">
              Invite by Email
            </Heading>
            <InviteGuestsForm onAddInvitedUsers={onAddInvitedUsers} />
            <DirectlyInvitedUsers {...directlyInvitedUsersProps} />
          </div>
        </TrackedComponent>
      </InstanceCount>
    </Modal>
  )
})
