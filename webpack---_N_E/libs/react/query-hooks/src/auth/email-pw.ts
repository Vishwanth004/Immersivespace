import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query"

import {
  EmailPwLoginArgs,
  EmailPwResponseWithToken,
  LookupEmailResponse,
  PwResetArgs,
  SapiAuthClient,
} from "@spatialsys/js/sapi/clients/auth"

const LOOKUP_EMAIL_QUERY_KEY = "lookupAccountForEmail"

/**
 * Check if an account already exists for a given email address.
 * Results are never cached, so that we always fetch up-to-date data
 */
export const useLookupEmailQuery = (
  sapiAuthClient: SapiAuthClient,
  email: string,
  options?: UseQueryOptions<LookupEmailResponse, unknown, LookupEmailResponse, string[]>
) => {
  return useQuery([LOOKUP_EMAIL_QUERY_KEY, email], () => sapiAuthClient.emailPw.lookupAccount(email), {
    enabled: Boolean(email),
    /** Don't cache any of these results */
    cacheTime: 0,
    staleTime: 0,
    ...options,
  })
}

/**
 * Attempt to log in with email/pw
 */
export const useLoginWithEmailPwMutation = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<EmailPwResponseWithToken, unknown, EmailPwLoginArgs>
) => {
  return useMutation(sapiAuthClient.emailPw.login, options)
}

/**
 * Create an account (sign up) with email/pw
 */
export const useRegisterWithEmailPwMutation = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<EmailPwResponseWithToken, unknown, EmailPwLoginArgs>
) => {
  return useMutation(sapiAuthClient.emailPw.register, options)
}

/**
 * Request an email with a link to reset password a password for that email
 */
export const useRequestResetPasswordMutation = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<void, unknown, string>
) => {
  return useMutation(sapiAuthClient.emailPw.requestResetPassword, options)
}

/**
 * Request an email with a link to reset password a password for that email
 */
export const useResetPasswordMutation = (
  sapiAuthClient: SapiAuthClient,
  options?: UseMutationOptions<void, unknown, PwResetArgs>
) => {
  return useMutation(sapiAuthClient.emailPw.resetPassword, options)
}
