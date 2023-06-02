import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react"

import { SapiAuthErrorWithMessage, UserEmailNotVerifiedError } from "@spatialsys/js/sapi/clients/auth"
import {
  InteractionName,
  InteractionType,
  TrackedComponent,
  TrackedComponents,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import {
  useLookupEmailQuery,
  useRegisterWithEmailPwMutation,
  useRequestResetPasswordMutation,
} from "@spatialsys/react/query-hooks/auth/email-pw"
import { useRequestEmailVerificationMutation } from "@spatialsys/react/query-hooks/auth/email-verification"
import { useAuthState } from "@spatialsys/web/app-context"
import { UseLoginState } from "@spatialsys/web/core/js/components/auth/login/hooks/use-login-state"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { sapiAuthClient } from "@spatialsys/web/sapi"
import { Button, Heading } from "@spatialsys/web/ui"

import classes from "./email-password.module.scss"

export const MINIMUM_PASSWORD_LENGTH = 8
const TOAST_DURATION = 6000

const EmailPwInputField = memo(
  forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(function EmailPwInputField(props, ref) {
    return (
      <input ref={ref} autoComplete="on" autoCapitalize="off" className={classes.input} autoFocus required {...props} />
    )
  })
)

interface EmailFormProps {
  emailInputValue: string
  handleEmailInputChange: ChangeEventHandler<HTMLInputElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
  isFetching: boolean
}

const EmailForm = memo(function EmailForm(props: EmailFormProps) {
  const { emailInputValue, handleEmailInputChange, handleSubmit, isFetching } = props

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.mainContentGrid}>
        <Heading as="h1" size="h3">
          What's your email?
        </Heading>
        <EmailPwInputField
          disabled={isFetching}
          name="email"
          onChange={handleEmailInputChange}
          placeholder="name@example.com"
          value={emailInputValue}
          type="email"
        />
      </label>
      <Button isLoading={isFetching} size="xl" type="submit" className="min-w-[180px]">
        Continue
      </Button>
    </form>
  )
})

type EnterPasswordFormProps = {
  email: string
} & Pick<UseLoginState, "loginWithEmailPw">

const EnterPasswordForm = memo(function EnterPasswordForm(props: EnterPasswordFormProps) {
  const { email, loginWithEmailPw } = props

  const [password, setPassword] = useState("")

  const requestResetPasswordEmail = useRequestResetPasswordMutation(sapiAuthClient, {
    onSuccess: () => {
      Toast.notify(`Check your email ${email} to reset your password!`, TOAST_DURATION)
    },
    onError: () => {
      Toast.error("Unable to reset password, try again later", TOAST_DURATION)
    },
  })
  const { isAuthenticatingOrLoggingIn, loginError } = useAuthState()
  const isLoading = isAuthenticatingOrLoggingIn || requestResetPasswordEmail.isLoading

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      loginWithEmailPw({ email, password })
    },
    [email, loginWithEmailPw, password]
  )

  if (loginError instanceof UserEmailNotVerifiedError)
    return <VerifyEmailForm email={email} allowRequestVerificationEmail />

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.mainContentGrid}>
        <Heading as="h1" size="h3">
          Enter your password
        </Heading>
        <EmailPwInputField
          disabled={isLoading}
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value.trim())}
          value={password}
          type="password"
        />
      </label>
      <Button isLoading={isLoading} size="xl" type="submit" className="min-w-[180px]">
        Continue
      </Button>
      <Button
        onClick={() => requestResetPasswordEmail.mutate(email)}
        disabled={requestResetPasswordEmail.isLoading}
        type="button"
        size="lg"
        variant="text"
        className="underline hover:opacity-70"
      >
        Reset password
      </Button>
    </form>
  )
})

type ResetPasswordPromptFormProps = EnterPasswordFormProps

const ResetPasswordPromptForm = memo(function EnterPasswordForm(props: ResetPasswordPromptFormProps) {
  const { email } = props

  const requestResetPasswordEmail = useRequestResetPasswordMutation(sapiAuthClient, {
    onSuccess: () => {
      Toast.notify(`Check your email ${email} to reset your password!`, TOAST_DURATION)
    },
    onError: () => {
      Toast.error("Unable to reset password, try again later", TOAST_DURATION)
    },
  })

  return (
    <TrackedComponent id={TrackedComponents.ForceResetPasswordForm} className={classes.form} as="div">
      <label className={classes.mainContentGrid}>
        <Heading as="h1" size="h3">
          Your password is expired and needs to be reset
        </Heading>
        Click the button below to send a password reset link to your email
      </label>
      <Button
        onClick={() => requestResetPasswordEmail.mutate(email)}
        disabled={requestResetPasswordEmail.isLoading}
        type="button"
        size="lg"
        variant="text"
        className="underline hover:opacity-70"
      >
        Reset password
      </Button>
    </TrackedComponent>
  )
})

const VerifyEmailForm = (props: { email: string; allowRequestVerificationEmail?: boolean }) => {
  const { email, allowRequestVerificationEmail = false } = props

  const { mutate: requestEmailVerification } = useRequestEmailVerificationMutation(sapiAuthClient, {
    onSuccess: () => {
      Toast.notify(`Email verification sent to ${email}`)
    },
    onError: (error) => {
      if (error instanceof SapiAuthErrorWithMessage) Toast.error(error.message, error.toastDuration)
      else Toast.error("Oops, we couldn't send you a verification link. Please try again later.")
    },
  })

  return (
    <div className={classes.form}>
      <Heading size="h3" weight="black" className="pb-3">
        Please verify your email
      </Heading>
      <p className={classes.description}>
        In order to use Spatial, you must verify your email address. Please check your email ({email}).
      </p>

      {allowRequestVerificationEmail && (
        <Button
          onClick={() => requestEmailVerification({ email })}
          type="button"
          size="lg"
          variant="text"
          className="underline hover:opacity-70"
        >
          Re-send email verification link
        </Button>
      )}
    </div>
  )
}

interface CreatePasswordFormProps {
  email: string
}
const CreatePasswordForm = memo(function CreatePasswordForm(props: CreatePasswordFormProps) {
  const { email } = props

  const [password, setPassword] = useState("")

  const trackInteraction = useTrackInteraction()
  const { mutate: signUpWithEmailPw, isSuccess } = useRegisterWithEmailPwMutation(sapiAuthClient)
  const { isAuthenticatingOrLoggingIn } = useAuthState()

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      signUpWithEmailPw({ email, password })
      trackInteraction(
        { name: InteractionName.SignUp, type: InteractionType.Submission },
        { loginMethod: "email password" }
      )
    },
    [password, signUpWithEmailPw, email, trackInteraction]
  )

  // TODO (DEV-15469): handle errors.
  // useEffect(() => {
  //   if (signUpWithEmailPassword.error) {
  //     Toast.error("Oops, something went wrong. Please try again later.", TOAST_DURATION)
  //   }
  // }, [signUpWithEmailPassword.error])

  if (isSuccess) return <VerifyEmailForm email={email} />

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.mainContentGrid}>
        <div>
          <Heading as="h1" size="h3">
            Create your password
          </Heading>
          <Heading as="h2" size="h5" className="mt-2">
            (minimum 8 characters)
          </Heading>
        </div>
        <EmailPwInputField
          disabled={isAuthenticatingOrLoggingIn}
          name="createPassword"
          onChange={(e) => setPassword(e.currentTarget.value.trim())}
          pattern={`.{${MINIMUM_PASSWORD_LENGTH},}`}
          value={password}
          type="password"
        />
      </label>
      <Button
        disabled={isAuthenticatingOrLoggingIn}
        isLoading={isAuthenticatingOrLoggingIn}
        size="xl"
        type="submit"
        className="min-w-[180px]"
      >
        Continue
      </Button>
    </form>
  )
})

type EmailPasswordLoginProps = Pick<UseLoginState, "loginWithEmailPw">

export const EmailPasswordLogin = memo(function EmailPasswordLogin(props: EmailPasswordLoginProps) {
  const { loginWithEmailPw } = props
  const [emailInput, setEmailInput] = useState("")
  const [emailToCheck, setEmailToCheck] = useState("")

  const lookupAccountExistsQuery = useLookupEmailQuery(sapiAuthClient, emailToCheck, {
    onError: () => {
      Toast.error("Oops, something went wrong. Make sure you entered a valid email address!", TOAST_DURATION)
    },
  })

  const handleEmailInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value.trim()),
    []
  )

  const handleSubmitEmailAddress: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      setEmailToCheck(emailInput)
    },
    [emailInput]
  )

  return (
    <TrackedComponent id={TrackedComponents.EmailPasswordLogin}>
      <div className={classes.container}>
        {lookupAccountExistsQuery.data ? (
          lookupAccountExistsQuery.data.emailAccount ? (
            lookupAccountExistsQuery.data.loginType === "legacy" ? (
              <ResetPasswordPromptForm email={emailInput} loginWithEmailPw={loginWithEmailPw} />
            ) : (
              <EnterPasswordForm email={emailInput} loginWithEmailPw={loginWithEmailPw} />
            )
          ) : (
            <CreatePasswordForm email={emailInput} />
          )
        ) : (
          <EmailForm
            emailInputValue={emailInput}
            handleEmailInputChange={handleEmailInputChange}
            handleSubmit={handleSubmitEmailAddress}
            isFetching={lookupAccountExistsQuery.isFetching}
          />
        )}
      </div>
    </TrackedComponent>
  )
})
