import { Suspense, lazy, useCallback } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals, Selectors } from "@spatialsys/web/app-state"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"

import classes from "./login-modal.module.scss"

const LoginModalContent = lazy(() =>
  import(/* webpackChunkName: "login-modal-content" */ "./login-modal-content").then((module) => ({
    default: module.LoginModalContent,
  }))
)

export const LoginModal = () => {
  const { isAuthenticated, isAuthless } = useAuthState()
  const loginModalState = useAppContext((context) => Selectors.getLoginModal(context.state))
  const actions = useAppContext((context) => context.actions)
  const close = useCallback(() => {
    actions.closeModal(Modals.Login)
  }, [actions])

  return (
    <Modal
      darkOverlay
      isOpen={Boolean(loginModalState) && (!isAuthenticated || isAuthless)}
      onRequestClose={close}
      overlayAdditionalBaseClass={classes.loginModal}
    >
      <Suspense fallback={null}>
        <TrackedComponent id={TrackedComponents.LoginModal}>
          <LoginModalContent
            forceRedirect={loginModalState?.payload.forceRedirect}
            label={loginModalState?.payload.titleCta}
            onRequestClose={close}
          />
        </TrackedComponent>
      </Suspense>
    </Modal>
  )
}
