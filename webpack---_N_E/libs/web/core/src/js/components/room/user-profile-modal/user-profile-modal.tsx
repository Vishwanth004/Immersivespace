import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { UserProfileCardInRoom } from "@spatialsys/web/core/js/components/user-profile/user-profile-card-in-room"

type UserProfileModalProps = {
  userId: string
  handleClose: () => void
}

export const UserProfileModal = (props: UserProfileModalProps) => {
  const { userId, handleClose } = props

  return (
    <Modal isOpen={Boolean(userId)} darkOverlay onRequestClose={handleClose}>
      <div className={modalClasses.body}>
        {userId && <UserProfileCardInRoom showModerationDropdown showViewProfileButton userID={userId} />}
        <CloseButton onClick={handleClose} />
      </div>
    </Modal>
  )
}
