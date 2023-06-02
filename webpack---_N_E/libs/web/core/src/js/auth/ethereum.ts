import { MetaMaskNotAvailableError, MetaMaskRejectedError } from "@spatialsys/web/app-state"

/**
 * Gets the wallet address using MetaMask. Adopted from https://docs.metamask.io/guide/getting-started.html#basic-considerations
 *
 * @throws {MetaMaskNotAvailable} No web3 provider is available in the browser
 * @throws {MetamaskRejected} The does not connect with metamask
 * @returns The connected wallet address in lowercase.
 */
export const getPublicAddress = async (): Promise<string> => {
  if (typeof window.ethereum === "undefined") {
    throw new MetaMaskNotAvailableError()
  }

  let publicAddress: string

  try {
    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" })
    publicAddress = accounts[0]?.toLowerCase()
  } catch (err) {
    throw new MetaMaskRejectedError()
  }

  return publicAddress
}

/**
 * Uses a `personal_sign` on a message/nonce with the currently selected metamask wallet
 *
 * @param message String to sign
 * @returns signed message
 */
export const signPersonalMessage = (message: string, publicAddress: string): Promise<string> => {
  // Also looks like there's a bug for messages that are exactly 42 characters (gets confused between message and address), but I think ours is longer so it should be fine.
  // https://github.com/MetaMask/metamask-extension/issues/10297
  return window.ethereum.request({ method: "personal_sign", params: [message, publicAddress] })
}
