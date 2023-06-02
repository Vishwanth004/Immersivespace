import Link from "next/link"
import { memo } from "react"

import { ReactComponent as SpatialWordMark } from "@spatialsys/assets/icons/logos/spatial-word-mark.svg"
import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { AuthConnection } from "@spatialsys/web/app-state"
import { EmailPasswordLogin } from "@spatialsys/web/core/js/components/auth/login/email-password/email-password"
import { UseLoginState } from "@spatialsys/web/core/js/components/auth/login/hooks/use-login-state"
import { Heading } from "@spatialsys/web/ui"

import { LoginConnections } from "./login-connections"

import classes from "./login-flow.module.scss"

type LoginFlowProps = {
  /**
   * If defined, the logo is rendered as a link.
   * If undefined, the logo will be rendered as a non-clickable element (a div)
   */
  backHref?: string
  label?: string
  isAuthenticating: boolean
  isEmailPwLogin: boolean
  handleCancelEmailPwLogin: () => void
  handleClickLoginWithEmailPw: () => void
  handleLoginWithConnection: (authConnection: AuthConnection) => void
} & Pick<UseLoginState, "loginWithEmailPw">

export const LoginFlow = memo(function LoginFlow(props: LoginFlowProps) {
  const {
    backHref,
    isAuthenticating,
    isEmailPwLogin,
    label,
    handleCancelEmailPwLogin,
    handleClickLoginWithEmailPw,
    handleLoginWithConnection,
    loginWithEmailPw,
  } = props

  return (
    <div className={classes.container}>
      {isEmailPwLogin ? (
        <>
          <button className={classes.backButton} onClick={handleCancelEmailPwLogin} type="button">
            <KeyboardBackspaceIcon className="icon icon-lg" />
          </button>
          <EmailPasswordLogin loginWithEmailPw={loginWithEmailPw} />
        </>
      ) : (
        <div className={classes.innerContainer}>
          <div className={classes.loginConnectionsContainer}>
            {(() => {
              if (label) {
                return (
                  <Heading as="h4" size="h4">
                    {label}
                  </Heading>
                )
              }

              return backHref ? (
                <Link href={backHref} className={classes.spatialLogolink}>
                  <div className={classes.logoContainer}>
                    <SpatialWordMark className={classes.logo} />
                  </div>
                </Link>
              ) : (
                <div className={classes.logoContainer}>
                  <SpatialWordMark className={classes.logo} />
                </div>
              )
            })()}
            <LoginConnections
              handleLoginWithConnection={handleLoginWithConnection}
              handleLoginWithEmailPw={handleClickLoginWithEmailPw}
              isAuthenticating={isAuthenticating}
            />
          </div>
        </div>
      )}
    </div>
  )
})
