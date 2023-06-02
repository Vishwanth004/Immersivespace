import clsx from "clsx"
import { sample } from "lodash"
import { memo, useEffect } from "react"

import { SapiAuthErrorWithMessage, UserEmailNotVerifiedError } from "@spatialsys/js/sapi/clients/auth"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useAuthState } from "@spatialsys/web/app-context"
import { MetaMaskRegisterAccountRequireEmailError } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import {
  getCopyForError,
  logLoginError,
  validFirebaseError,
} from "@spatialsys/web/core/js/components/auth/login/errors"
import { useLoginState } from "@spatialsys/web/core/js/components/auth/login/hooks/use-login-state"
import { MetaMaskRegisterWithEmail } from "@spatialsys/web/core/js/components/auth/login/metamask-login/metamask-register-with-email"
import { LoginFlow } from "@spatialsys/web/core/js/components/auth/login/ui/login-flow"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"

import classes from "./login.module.scss"

const videos = ["auditorium", "gallery-1", "gallery-2", "meeting-place", "museo"] as const
const videoName = sample(videos)

interface LoginViewProps {
  backHref?: string
}

export const LoginViewInternal = memo(function LoginViewInternal(props: LoginViewProps) {
  const { backHref } = props

  const { loginWithConnection, loginWithEmailPw, handleClickLoginWithEmailPw, isEmailPwLogin, cancelEmailPwLogin } =
    useLoginState()
  const { isAuthenticatingOrLoggingIn, loginError } = useAuthState()

  useEffect(() => {
    if (loginError instanceof SapiAuthErrorWithMessage) {
      Toast.error(loginError.message, loginError.toastDuration)
    } else if (
      loginError &&
      !(loginError instanceof MetaMaskRegisterAccountRequireEmailError) &&
      !(loginError instanceof UserEmailNotVerifiedError)
    ) {
      logLoginError(loginError)
      if (validFirebaseError(loginError)) return
      Toast.error(getCopyForError(loginError), 7000)
    }
  }, [loginError])

  if (loginError && loginError instanceof MetaMaskRegisterAccountRequireEmailError) {
    return (
      <MetaMaskRegisterWithEmail
        authenticateWithEthereumResponse={loginError.authenticateWithEthereumResponse}
        publicAddress={loginError.publicAddress}
      />
    )
  }

  return (
    <div className={classes.container}>
      <div className={clsx(!isEmailPwLogin && classes.grid)}>
        {!isEmailPwLogin && (
          <div className={classes.videoContainer}>
            <video
              className={classes.video}
              autoPlay
              disableRemotePlayback
              disablePictureInPicture
              loop
              muted
              playsInline
              poster={`${Config.PUBLIC_ASSETS_BASE_URL}/login-videos/${videoName}.jpg`}
            >
              <source src={`${Config.PUBLIC_ASSETS_BASE_URL}/login-videos/${videoName}.webm`} type="video/webm" />
              <source src={`${Config.PUBLIC_ASSETS_BASE_URL}/login-videos/${videoName}.mp4`} type="video/mp4" />
            </video>
          </div>
        )}
        <LoginFlow
          backHref={backHref}
          isAuthenticating={isAuthenticatingOrLoggingIn}
          isEmailPwLogin={isEmailPwLogin}
          handleCancelEmailPwLogin={cancelEmailPwLogin}
          handleClickLoginWithEmailPw={handleClickLoginWithEmailPw}
          handleLoginWithConnection={loginWithConnection}
          loginWithEmailPw={loginWithEmailPw}
        />
      </div>
    </div>
  )
})

export const LoginView = (props: LoginViewProps) => {
  return (
    <TrackedComponent id={TrackedComponents.LoginPage}>
      <LoginViewInternal {...props} />
    </TrackedComponent>
  )
}
