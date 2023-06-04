import { getAuth, signInWithCustomToken } from "firebase/auth"
import { FormEvent, useCallback, useState } from "react"

import { AuthenticateWithEthereumResponse } from "@spatialsys/js/sapi/types"
import { useCompleteRegistrationMutation } from "@spatialsys/react/query-hooks/auth/ethereum"
import { useAppContext } from "@spatialsys/web/app-context"
import { firebaseApp } from "@spatialsys/web/app-context/firebase-app"
import { ReactComponent as MetaMaskIcon } from "@spatialsys/web/core/img/icons/metamask.svg"
import { getTokenForFirebaseUser } from "@spatialsys/web/core/js/auth/auth"
import { EmailRegex } from "@spatialsys/web/core/js/auth/constants"
import { signPersonalMessage } from "@spatialsys/web/core/js/auth/ethereum"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { sapiAuthClient } from "@spatialsys/web/sapi"
import { Button, Heading } from "@spatialsys/web/ui"

interface RegisterWithEmailProps {
  authenticateWithEthereumResponse: AuthenticateWithEthereumResponse
  publicAddress: string
}

export const MetaMaskRegisterWithEmail = (props: RegisterWithEmailProps) => {
  const {
    authenticateWithEthereumResponse: { message },
    publicAddress,
  } = props

  const setAuthSuccess = useAppContext((context) => context.actions.setAuthSuccess)
  const { mutateAsync } = useCompleteRegistrationMutation(sapiAuthClient)
  const [isLoading, setIsLoading] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!EmailRegex.test(emailInput)) {
        setErrorMessage("Not a valid email address.")
        return
      }

      try {
        setIsLoading(true)
        const signedMessage = await signPersonalMessage(message, publicAddress)
        const { token } = await mutateAsync({ email: emailInput, publicAddress, signature: signedMessage })
        const firebaseAuth = getAuth(firebaseApp)
        const credentials = await signInWithCustomToken(firebaseAuth, token)
        const authState = await getTokenForFirebaseUser(credentials.user)
        Toast.notify(`Email verification sent to ${emailInput}`)
        setAuthSuccess(authState)
      } catch (error) {
        setIsLoading(false)
        setErrorMessage("Please sign the nonce to continue!")
        return
      }
    },
    [emailInput, message, mutateAsync, publicAddress, setAuthSuccess]
  )

  return (
    <div className="h-full w-full px-6 pt-3">
      <form className="flex h-full w-full flex-col items-center justify-center" onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <MetaMaskIcon />
          <span className="pl-2 text-gray-500">{publicAddress}</span>
        </div>
        <label>
          <Heading as="h1" size="h1" textAlign="center" className="mb-6">
            What's your email?
          </Heading>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none"
            value={emailInput}
            autoFocus
            autoComplete="email"
            autoCapitalize="none"
            onChange={(e) => setEmailInput(e.target.value?.trim())}
            type={"email"}
            placeholder={"Enter email address"}
          />
          {errorMessage && (
            <div className="pt-6 text-center text-lg text-red">
              &nbsp;
              {errorMessage}
              &nbsp;
            </div>
          )}
        </label>
        <Button size="xl" className="mt-6" isLoading={isLoading} type="submit">
          Continue
        </Button>
      </form>
    </div>
  )
}
