import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { useAuthState } from "@spatialsys/web/app-context"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { Button, Heading } from "@spatialsys/web/ui"

export const Success = () => {
  const { replace } = useRouter()
  const { isAuthenticated } = useAuthState()
  useEffect(() => {
    if (isAuthenticated) {
      Toast.notify("Email successfully verified", 7500)
      void replace("/")
    }
  }, [isAuthenticated, replace])

  return (
    <>
      <Heading size="h3" weight="black" className="pb-3">
        Account successfully verified
      </Heading>
      <Button as={Link} href="/login" size="lg">
        Continue to Login
      </Button>
    </>
  )
}
