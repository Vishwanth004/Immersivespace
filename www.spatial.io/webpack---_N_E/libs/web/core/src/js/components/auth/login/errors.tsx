import { FirebaseError } from "firebase/app"
import { AuthErrorCodes } from "firebase/auth"

import { MetaMaskRejectedError } from "@spatialsys/web/app-state"
import { AuthLogChannel } from "@spatialsys/web/core/js/auth/log-channel"
import { logger } from "@spatialsys/web/logger"

export const validFirebaseError = (error: any) => {
  if (error instanceof FirebaseError) {
    return error.code === AuthErrorCodes.POPUP_CLOSED_BY_USER
  }
  return false
}

export const getCopyForError = (error: any) => {
  if (error instanceof MetaMaskRejectedError) {
    return "Make sure your MetaMask extension is unlocked, then try again."
  }

  return "Something went wrong. Try again later, or if the issue persists, contact support@spatial.io"
}

export const logLoginError = (error: any) => {
  if (validFirebaseError(error)) {
    logger.info(AuthLogChannel, "User closed login popup", { ...error })
    return
  }
  logger.error(AuthLogChannel, "Error logging in", error)
}
