import { useCallback, useMemo, useState } from "react"

import { GetSocialProfileRequest } from "@spatialsys/js/sapi/types"
import { BanKickAction, getBanKickActions } from "@spatialsys/js/util/moderation"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useGetSocialProfileQueryInRoom } from "@spatialsys/react/query-hooks/users/use-get-social-profile-query-in-room"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import { ConfirmModalBase } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal-base"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { sapiUsersClient } from "@spatialsys/web/sapi"
import { Button, CenteredLoader, Heading } from "@spatialsys/web/ui"

import classes from "./space-ban-confirm-modal.module.scss"

export type SpaceBanConfirmModalProps = {
  isOpen: boolean
  user: GetSocialProfileRequest
  onClose: () => void
}

function SpaceBanConfirmModalContents({ onClose, user }: Required<SpaceBanConfirmModalProps>) {
  const [selectedAction, setSelectedAction] = useState<BanKickAction | undefined>()

  const participantMetadata = useAppContext(
    (context) => user.userID && AppStateSelectors.getParticipantMetadata(context.state.unity.appState, user.userID)
  )

  const {
    isAuthless,
    isInitialLoading,
    data: socialProfile,
  } = useGetSocialProfileQueryInRoom(sapiUsersClient, user, participantMetadata)

  const { displayName, avatarImageURL, appearanceCustomization, userID } = { ...socialProfile }

  const isInSpace = useAppContext((context) => AppStateSelectors.isUserInRoom(context.state.unity.appState, userID))
  const errorCopy = useAppContext((context) =>
    AppStateSelectors.getBanErrorCopy(context.state.unity.appState, userID, displayName)
  )

  const cancelAction = useCallback(() => {
    setSelectedAction(undefined)
  }, [])

  const confirmAction = useCallback(() => {
    if (!userID) {
      return
    }
    if (selectedAction.type === "ban") {
      UnityMessages.banUserFromRoom(userID, selectedAction.durationMinutes)
    } else if (selectedAction.type === "kick") {
      UnityMessages.removeUser(userID)
    }
    onClose()
  }, [userID, selectedAction, onClose])

  const banKickActions = useMemo(() => getBanKickActions({ isInSpace, isAuthless }), [isAuthless, isInSpace])

  if (isInitialLoading) {
    return (
      <div className={classes.body}>
        <CenteredLoader color="black" useRelativePosition variant="fancy" />
      </div>
    )
  }

  if (errorCopy) {
    return <ConfirmModalBase title={errorCopy} onConfirm={onClose} confirmText={"OK"} />
  }

  return (
    <>
      <div className={classes.body}>
        <AvatarIcon
          className="mx-auto mb-5 h-20 w-20"
          altText={displayName}
          profilePicUrl={avatarImageURL}
          loadingPlaceholder={<NamePlaceholder displayName={displayName} />}
          placeholder={<NamePlaceholder displayName={displayName} />}
          applyPlayerColorToPlaceholder
          playerColor={getPlayerColor(appearanceCustomization?.profileColor)}
        />
        <Heading className="mb-5">Remove {displayName}?</Heading>
        <div className="mb-8 text-gray-500">
          {isInSpace && "Kicking a user removes them from the space. "}
          {!isAuthless && "Banning removes the user and prevents them from rejoining for the specified duration."}
        </div>
        <div className="grid auto-cols-[250px] justify-center gap-3">
          {banKickActions.map((action, i) => (
            <Button key={i} color="outline" size="xl" onClick={() => setSelectedAction(action)}>
              {action.description}
            </Button>
          ))}
          <Button size="xl" variant="text" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
      <ConfirmModal
        title={`Are you sure you want to ${selectedAction?.type} ${displayName}?`}
        confirmText={"Yes"}
        denyText={"No"}
        onDismiss={cancelAction}
        onDeny={cancelAction}
        onConfirm={confirmAction}
        isOpen={Boolean(selectedAction)}
      />
    </>
  )
}

export function SpaceBanConfirmModal(props: SpaceBanConfirmModalProps) {
  const { isOpen, user, onClose } = props
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} darkOverlay>
      <TrackedComponent id={TrackedComponents.SpaceBanConfirmModal}>
        <CloseButton onClick={onClose} />
        <SpaceBanConfirmModalContents {...props} user={user} />
      </TrackedComponent>
    </Modal>
  )
}
