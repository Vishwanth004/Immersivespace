import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import { SapiAuthClient } from "@spatialsys/js/sapi/clients/auth"
import { RequestEmailVerificationArgs, VerifyEmailArgs, VerifyEmailResponse } from "@spatialsys/js/sapi/types"

export const useRequestEmailVerificationMutation = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<null, unknown, RequestEmailVerificationArgs>
) => {
  return useMutation(
    (args: RequestEmailVerificationArgs) => sapiAuthClient.verify.requestEmailVerification(args),
    options
  )
}

export const useVerifyEmailTicket = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<VerifyEmailResponse, unknown, VerifyEmailArgs>
) => {
  return useMutation((args: VerifyEmailArgs) => sapiAuthClient.verify.verifyEmailTicket(args), options)
}
