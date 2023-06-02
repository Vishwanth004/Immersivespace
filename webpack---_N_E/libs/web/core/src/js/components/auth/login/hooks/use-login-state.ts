import { useCallback } from "react"

import { EmailPwLoginArgs } from "@spatialsys/js/sapi/clients/auth"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useAppContext } from "@spatialsys/web/app-context"
import { AuthConnection } from "@spatialsys/web/app-state"

export type UseLoginState = {
  /**
   * Call this to login with SSO (i.e. Google, Apple, Metamask)
   * When using SSO, login and signup are the same call.
   */
  loginWithConnection: (authConnection: AuthConnection) => void
  /**
   * Call this to initiate login with email/pw.
   * Sets `isEmailPwLogin` to `true`,
   */
  handleClickLoginWithEmailPw: () => void
  /**
   * Call this to login with email/pw. Uses the Firebase flow.
   */
  loginWithEmailPw: (payload: EmailPwLoginArgs) => void
  /**
   * Denotes if we are on the email/pw login flow. If true, UI components should render a flow to collect email + pw
   */
  isEmailPwLogin: boolean
  /**
   * Cancel email/pw login flow
   */
  cancelEmailPwLogin: () => void
}

type UseLoginStateArgs = { forceRedirect?: boolean }
/**
 * Abstraction to manage logic for logging in.
 * Returns functions to sign in with SSO or with email.
 */
export const useLoginState = (args?: UseLoginStateArgs): UseLoginState => {
  const [isEmailPwLogin, setIsEmailPwLogin] = useBoolean(false)

  const actions = useAppContext((context) => context.actions)
  const trackInteraction = useTrackInteraction()

  const loginWithConnection = useCallback(
    (authConnection: AuthConnection) => {
      actions.loginWithConnection({ authConnection, forceRedirect: args?.forceRedirect })
      trackInteraction(
        { name: InteractionName.LoginAttempt, type: InteractionType.Click },
        { loginMethod: authConnection }
      )
    },
    [actions, args?.forceRedirect, trackInteraction]
  )

  const loginWithEmailPw = useCallback(
    (payload: EmailPwLoginArgs) => {
      actions.loginWithEmailPw({ ...payload, forceRedirect: args?.forceRedirect })
      trackInteraction(
        { name: InteractionName.LoginAttempt, type: InteractionType.Submission },
        { loginMethod: "email password" }
      )
    },
    [actions, args?.forceRedirect, trackInteraction]
  )

  const handleClickLoginWithEmailPw = useCallback(() => {
    setIsEmailPwLogin.setTrue()
  }, [setIsEmailPwLogin])

  const handleCancelEmailPwLogin = useCallback(() => {
    setIsEmailPwLogin.setFalse()
    actions.resetLoginError()
  }, [actions, setIsEmailPwLogin])

  return {
    loginWithConnection,
    handleClickLoginWithEmailPw,
    loginWithEmailPw,
    isEmailPwLogin,
    cancelEmailPwLogin: handleCancelEmailPwLogin,
  }
}
