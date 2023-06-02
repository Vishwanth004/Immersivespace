import { AxiosInstance } from "axios"

import { isAxiosError } from "@spatialsys/js/types"

import {
  RequestEmailVerificationArgs,
  SAPIError,
  VerifyEmailArgs,
  VerifyEmailResponse,
  VerifySignatureResponse,
} from "../../../types"
import { isSapiError } from "../../../utils/is-sapi-error"
import { SapiAuthErrorWithMessage } from "./email-pw"

export function createVerifyEndpoints(client: AxiosInstance) {
  return {
    verifySignature: async function (publicAddress: string, signature: string): Promise<VerifySignatureResponse> {
      const response = await client.post<VerifySignatureResponse>(`/verify/signature`, {
        publicAddress,
        signature,
      })
      return response.data
    },
    requestEmailVerification: async function (args: RequestEmailVerificationArgs): Promise<any> {
      try {
        const response = await client.post<any>(`/verify/email`, args)
        return response.data
      } catch (error) {
        if (isAxiosError(error) && isSapiError(error)) {
          const sapiErrors = error.response.data.errors

          for (const sapiError of sapiErrors) {
            // Weirdly, the message is a nested SAPIError encoded as a string
            const message: SAPIError = JSON.parse(sapiError.message)

            if (message.code === "TICKET_ALREADY_EXISTS") {
              throw new SapiAuthErrorWithMessage(message.message, 10000)
            }
          }
        }

        throw error
      }
    },
    verifyEmailTicket: async function (args: VerifyEmailArgs): Promise<VerifyEmailResponse> {
      const response = await client.put<VerifyEmailResponse>(`/verify/email`, args)
      return response.data
    },
  }
}

export type VerifyEndpoint = ReturnType<typeof createVerifyEndpoints>
