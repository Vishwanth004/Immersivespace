import { memo } from "react"

import { Heading } from "@spatialsys/web/ui"

export const ConfirmDelete = memo(function ConfirmDelete() {
  return (
    <Heading as="h4" size="h4" textAlign="center" className="text-red">
      Once deleted, your space cannot be recovered!
    </Heading>
  )
})
