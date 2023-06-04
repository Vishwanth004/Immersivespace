import * as React from "react"

import { ReactComponent as SpatialWordMark } from "@spatialsys/assets/icons/logos/spatial-word-mark.svg"
import { EmailVerificationPayload } from "@spatialsys/web/app-state"
import { Container } from "@spatialsys/web/ui"

import { Failure } from "./failure"
import { Success } from "./success"

const EmailVerification = ({ publicAddress, email, hasVerifiedSuccessfully }: EmailVerificationPayload) => {
  return (
    <Container className="grid h-screen content-center justify-items-center gap-6 text-center">
      <SpatialWordMark className="h-11 w-auto" />
      {hasVerifiedSuccessfully ? <Success /> : <Failure email={email} publicAddress={publicAddress} />}
    </Container>
  )
}

export default EmailVerification
