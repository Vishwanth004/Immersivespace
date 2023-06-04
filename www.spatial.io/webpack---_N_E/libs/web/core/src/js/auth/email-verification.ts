export const TICKET_ID_PARAM = "ticket"
export const EMAIL_PARAM = "email"
export const PUBLIC_ADDRESS_PARAM = "publicAddress"

export interface EmailVerificationState {
  email?: string
  ticket?: string
  publicAddress?: string
}

export const parseEmailVerificationParams = (): EmailVerificationState => {
  const queryParams = new URLSearchParams(window.location.search)
  return {
    email: queryParams.get(EMAIL_PARAM),
    ticket: queryParams.get(TICKET_ID_PARAM),
    publicAddress: queryParams.get(PUBLIC_ADDRESS_PARAM),
  }
}
