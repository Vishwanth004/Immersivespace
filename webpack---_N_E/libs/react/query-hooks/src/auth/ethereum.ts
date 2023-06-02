import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import { SapiAuthClient } from "@spatialsys/js/sapi/clients/auth"
import { CompleteRegistrationArgs, CompleteRegistrationResponse } from "@spatialsys/js/sapi/types"

export const useCompleteRegistrationMutation = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<CompleteRegistrationResponse, unknown, CompleteRegistrationArgs>
) => {
  return useMutation((args: CompleteRegistrationArgs) => sapiAuthClient.ethereum.completeRegistration(args), options)
}
