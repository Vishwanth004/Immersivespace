import { SapiAuthErrorWithMessage } from "@spatialsys/js/sapi/clients/auth"
import { SAPILogChannel } from "@spatialsys/js/sapi/clients/sapi"
import { useRequestEmailVerificationMutation } from "@spatialsys/react/query-hooks/auth/email-verification"
import { useAuthState } from "@spatialsys/web/app-context"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { logger } from "@spatialsys/web/logger"
import { sapiAuthClient } from "@spatialsys/web/sapi"
import { Button, Heading } from "@spatialsys/web/ui"

interface FailureProps {
  email: string
  publicAddress: string
}

export const Failure = ({ email, publicAddress }: FailureProps) => {
  const { isAuthenticated } = useAuthState()
  const { mutate: requestEmailVerification, isLoading } = useRequestEmailVerificationMutation(sapiAuthClient, {
    onSuccess: () => {
      Toast.notify(`Email verification sent to ${email}`)
    },
    onError: (error) => {
      logger.error(SAPILogChannel, `Failed to send verification email to ${email}`)
      if (error instanceof SapiAuthErrorWithMessage) Toast.error(error.message, error.toastDuration)
      else Toast.error("Oops, we couldn't send you a verification link. Please try again later.")
    },
  })

  return (
    <>
      {email && <div className="text-gray-500">{email}</div>}
      <Heading size="h3" weight="black" className="pb-3">
        Oops, that link is broken or expired! Click the button below to receive an updated link.
      </Heading>
      <Button isLoading={isLoading} size="xl" onClick={() => requestEmailVerification({ email, publicAddress })}>
        Send New Verification Email
      </Button>
      {isAuthenticated && <a href="/logout">Log out</a>}
    </>
  )
}

export default Failure
