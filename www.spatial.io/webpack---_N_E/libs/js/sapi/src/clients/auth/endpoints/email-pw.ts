import { AxiosInstance } from "axios"

import { isAxiosError } from "@spatialsys/js/types"

import { SAPIError } from "../../../types"
import { isSapiError } from "../../../utils/is-sapi-error"

/** POST /lookup/email */
export type LookupEmailResponse = {
  /** If an email/pw account has been created */
  emailAccount: boolean
  /**
   * Legacy implies that the account was Auth0 but did not get migrated into Firebase
   * This should never happen, but we've added a guard for this edge case just in case.
   */
  loginType: "firebase" | "legacy"
}

export type EmailPwLoginArgs = {
  email: string
  password: string
}

export type PwResetArgs = {
  email: string
  password: string
  ticket: string
}

/** From login or signup */
export type EmailPwResponseWithToken = {
  accessToken: string
}

/** Error returned from `login` function if user's email is not verified */
export class UserEmailNotVerifiedError extends Error {
  email: string

  constructor(email: string, message = "") {
    super(message)
    this.email = email
  }
}

/** Error returned from `login` function if user's email is not verified */
export class SapiAuthErrorWithMessage extends Error {
  toastDuration: number

  constructor(message = "", toastDuration = 5000) {
    super(message)
    this.toastDuration = toastDuration
  }
}

export function createEmailPwEndpoints(client: AxiosInstance) {
  return {
    /**
     * Checks whether or not an account exists for a given email address
     */
    lookupAccount: async function (email: string): Promise<LookupEmailResponse> {
      const response = await client.post<LookupEmailResponse>(`/lookup/email`, { email })
      return response.data
    },
    /** Attempts to log in with email/pw */
    login: async function (args: EmailPwLoginArgs): Promise<EmailPwResponseWithToken> {
      try {
        const response = await client.post<EmailPwResponseWithToken>(`/login`, args)
        return response.data
      } catch (error) {
        if (isAxiosError(error) && isSapiError(error)) {
          const sapiErrors = error.response.data.errors

          for (const sapiError of sapiErrors) {
            // Weirdly, the message is a double-nested SAPIError
            // Just take the first one
            const nestedErrors: { errors: SAPIError[] } = JSON.parse(sapiError.message)
            const firstErr = nestedErrors.errors[0]
            if (firstErr) {
              if (firstErr.code === "NOT_VERIFIED") {
                throw new UserEmailNotVerifiedError(args.email)
              } else if (firstErr.code === "INVALID_CREDENTIAL" || firstErr.code === "ACCOUNT_LOCKED") {
                throw new SapiAuthErrorWithMessage(firstErr.message, 5000)
              }
            }
          }
        }

        throw error
      }
    },
    /** Create an account (sign up) with email/pw */
    register: async function (args: EmailPwLoginArgs): Promise<EmailPwResponseWithToken> {
      const response = await client.post<EmailPwResponseWithToken>(`/register/email`, args)
      return response.data
    },
    /** Request to get an email with a link to reset password */
    requestResetPassword: async function (email: string): Promise<void> {
      await client.post<void>(`/reset/password`, { email })
    },
    /** Request to change password for given email using ticket */
    resetPassword: async function (args: PwResetArgs): Promise<void> {
      await client.patch<void>(`/reset/password`, args)
    },
  }
}

export type EmailPwEndpoint = ReturnType<typeof createEmailPwEndpoints>
