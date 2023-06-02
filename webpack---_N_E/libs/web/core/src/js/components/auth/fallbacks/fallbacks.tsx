import { memo, useEffect } from "react"

import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import {
  AuthConnection,
  MetaMaskNotAvailableError,
  MetaMaskRegisterAccountRequireEmailError,
  MetaMaskRejectedError,
  NoAuthError,
  UserUnauthenticatedError,
  WalletAddressMismatchError,
} from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import EmailVerification from "@spatialsys/web/core/js/components/auth/email-verification/email-verification"
import { LoginView } from "@spatialsys/web/core/js/components/auth/login/login"
import { MetaMaskRegisterWithEmail } from "@spatialsys/web/core/js/components/auth/login/metamask-login/metamask-register-with-email"
import { FallbackProps } from "@spatialsys/web/core/js/components/requires-with-fallback"
import { VERIFY_EMAIL } from "@spatialsys/web/core/js/util/error-type"
import { Heading, Loader } from "@spatialsys/web/ui"

import classes from "./fallbacks.module.scss"

export type AuthErrorProps = FallbackProps<any>

// TODO(DEV-10191): add a 4th return piece, component ID, for analytics. See https://github.com/spatialsys/Spatial-2.0/pull/8378#discussion_r810221121
const bodyContentForError = (error: any): [message: string, cta: string, ctaHref: string] => {
  if (error instanceof MetaMaskNotAvailableError) {
    return [
      "Please make sure MetaMask is installed",
      "Help",
      "https://support.spatial.io/hc/en-us/articles/360060896151-How-To-Add-Your-MetaMask-NFT-Wallet-to-Spatial",
    ]
  } else if (error instanceof MetaMaskRejectedError) {
    return ["Please link your wallet using MetaMask!", "Try Again", `${Config.WEB_URL}/login`]
  } else if (error instanceof WalletAddressMismatchError) {
    return [
      "Oops! Looks like your currently selected wallet doesn't match the one you signed up for Spatial with — select the correct wallet, then refresh the page.",
      "Refresh",
      Config.WEB_URL,
    ]
  }

  switch (error?.errorDescription) {
    case VERIFY_EMAIL:
      return [
        "In order to use Spatial, you must verify your email address. Please check your email. After verifying, try logging in again.",
        "Login",
        `${Config.WEB_URL}/login`,
      ]
    default:
      return [
        "We're sorry, there was an error in trying to process your request. Please reach out to us and let us know what happened.",
        "Contact Us",
        `mailto:support@spatial.io`,
      ]
  }
}

/**
 * The default fallback behavior for when authentication fails.
 * Renders the login component if the user is unauthenticated, and also handles other edge cases like
 * completing email verification.
 */
export const GenericErrorHandler = memo(function GenericErrorHandler(props: AuthErrorProps) {
  const { error } = props
  const trackInteraction = useTrackInteraction()

  if (error instanceof MetaMaskRegisterAccountRequireEmailError) {
    return (
      <MetaMaskRegisterWithEmail
        authenticateWithEthereumResponse={error.authenticateWithEthereumResponse}
        publicAddress={error.publicAddress}
      />
    )
  }

  const [message, cta, ctaHref] = bodyContentForError(error)

  return (
    <div className={classes.container}>
      <h1 className="mb-5 text-4xl font-semibold leading-tight">{message}</h1>
      <div>
        <a
          className={classes.button}
          href={ctaHref}
          onClick={() =>
            trackInteraction({ name: InteractionName.AuthErrorCta, type: InteractionType.Click }, { error })
          }
        >
          {cta}
        </a>
        <a
          className={classes.button}
          href="/logout"
          onClick={() =>
            trackInteraction({ name: InteractionName.AuthErrorStartOver, type: InteractionType.Click }, { error })
          }
        >
          Start Over
        </a>
      </div>
    </div>
  )
})

export const LoginViewFallback = memo(function LoginViewFallback(props: AuthErrorProps) {
  const { error } = props

  if (error instanceof UserUnauthenticatedError || error instanceof NoAuthError) {
    return <LoginView backHref="/" />
  }

  return <GenericErrorHandler error={error} />
})

/** Sign in with MetaMask  */
export const LoginWithMetaMask = memo(function LoginWithMetaMask(props: AuthErrorProps) {
  const { error } = props
  const loginWithConnection = useAppContext((context) => context.actions.loginWithConnection)
  const loginError = useAppContext((context) => context.state.auth.loginError)

  useEffect(() => {
    loginWithConnection({ authConnection: AuthConnection.MetaMask })
  }, [loginWithConnection])

  if (loginError) {
    return <GenericErrorHandler error={loginError} />
  }

  if (error instanceof UserUnauthenticatedError) {
    // TODO(DEV-10191): wrap return in `TrackedElement`
    return (
      <div className={classes.fullHeightContainer}>
        <Loader variant="fancy" color="black" />
        <Heading as="h3" size="h3" className="mt-4">
          Click the MetaMask extension if it doesn't open automatically!
        </Heading>
      </div>
    )
  }

  return <GenericErrorHandler error={error} />
})

/** Verify user email  */
export const VerifyEmail = memo(function VerifyEmail(props: AuthErrorProps) {
  const { error } = props
  const emailVerificationStatus = useAppContext((context) => context.state.auth.emailVerificationStatus)
  const verifyEmail = useAppContext((context) => context.actions.verifyEmail)

  useEffect(() => {
    verifyEmail()
  }, [verifyEmail])

  if (emailVerificationStatus) {
    return <EmailVerification {...emailVerificationStatus} />
  }

  if (error instanceof UserUnauthenticatedError) {
    return (
      <div className={classes.fullHeightContainer}>
        <Loader variant="fancy" color="black" />
        <Heading as="h3" size="h3" className="mt-4">
          Verifying email...
        </Heading>
      </div>
    )
  }

  return <GenericErrorHandler error={error} />
})

export const DefaultAuthFallback = LoginViewFallback
