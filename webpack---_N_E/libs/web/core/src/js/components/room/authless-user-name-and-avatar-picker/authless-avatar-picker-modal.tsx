import clsx from "clsx"
import { Suspense, lazy, memo, useCallback } from "react"

import { UserData } from "@spatialsys/js/sapi/clients/sapi"
import { useAppContext } from "@spatialsys/web/app-context"
import { Selectors } from "@spatialsys/web/app-state"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"

import classes from "./authless-avatar-picker-modal.module.scss"

const AuthlessUserNameAndAvatarPicker = lazy(() =>
  import(
    "@spatialsys/web/core/js/components/room/authless-user-name-and-avatar-picker/authless-user-name-and-avatar-picker"
  ).then((module) => ({ default: module.AuthlessUserNameAndAvatarPicker }))
)

type AuthlessAvatarPickerModalProps = {
  isOpen: boolean
  allowDismissToConfirm: boolean
  className: string
  user: UserData
} & Pick<React.ComponentProps<typeof AuthlessUserNameAndAvatarPicker>, "onClickSignIn">

export const AuthlessAvatarPickerModal = memo(function AuthlessAvatarPickerModal(
  props: AuthlessAvatarPickerModalProps
) {
  const { isOpen, allowDismissToConfirm, className, user, ...rest } = props

  const avatars = user.treatmentsParsed.authlessRpmAvatars

  const data = useAppContext((context) => Selectors.getAuthlessUserData(context.state))
  const actions = useAppContext((context) => context.actions)

  const handleSubmit = useCallback(
    () => actions.patchAuthlessUserData({ confirmationStatus: "Clicked continue" }),
    [actions]
  )

  const handleDismiss = useCallback(
    () => actions.patchAuthlessUserData({ confirmationStatus: "Dismissed modal" }),
    [actions]
  )

  return (
    <Modal
      isOpen={isOpen && Boolean(data)}
      shouldCloseOnOverlayClick={allowDismissToConfirm}
      shouldCloseOnEsc={allowDismissToConfirm}
      onRequestClose={handleDismiss}
      modalBaseClass={clsx(className, classes.modal, modalClassesBase.base)}
      overlayAdditionalBaseClass={clsx(!allowDismissToConfirm && classes.clickThrough)}
    >
      <InstanceCount>
        <Suspense fallback={null}>
          <AuthlessUserNameAndAvatarPicker
            state={data}
            setState={actions.patchAuthlessUserData}
            onSubmit={handleSubmit}
            avatars={avatars}
            {...rest}
          />
        </Suspense>
      </InstanceCount>
    </Modal>
  )
})
