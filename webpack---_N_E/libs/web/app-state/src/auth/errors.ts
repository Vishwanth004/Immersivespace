import { AuthenticateWithEthereumResponse } from "@spatialsys/js/sapi/types"

/** MetaMask is not installed */
export class MetaMaskNotAvailableError extends Error {}

/** User rejected MetaMask account linking */
export class MetaMaskRejectedError extends Error {}

/** User's selected wallet does not match their wallet in the SAPI user */
export class WalletAddressMismatchError extends Error {}

/**
 * This error is thrown when we fail to authenticate the user, and they are not in a "special" scenario like verifying email or waiting for Metamask
 * The application should catch this and react accordingly, for example, `RequiresAuth` will catch this and redirect the user to the login page.
 */
export class UserUnauthenticatedError extends Error {}

/**  Throw this error if we are in the MetaMask registration flow and we need to collect the user's email address */
export class MetaMaskRegisterAccountRequireEmailError extends Error {
  authenticateWithEthereumResponse: AuthenticateWithEthereumResponse
  publicAddress: string

  constructor(publicAddress: string, authenticateWithEthereumResponse: AuthenticateWithEthereumResponse, message = "") {
    super(message)
    this.publicAddress = publicAddress
    this.authenticateWithEthereumResponse = authenticateWithEthereumResponse
  }
}

/**
 * An error trying to get noauth token
 */
export class NoAuthError extends Error {
  constructor(public readonly roomId: string, public readonly shareId: string, message = "") {
    super(message)
  }
}
