import Link from "next/link"
import { memo } from "react"

import { ReactComponent as SpatialLogo } from "@spatialsys/assets/icons/logos/spatial.svg"
import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { Heading } from "@spatialsys/web/ui"

/**
 * Tells user that in-room exp is not supported on their current version of Safari (15.4 and 15.5). See DEV-11074, DEV-12053.
 */
export const Safari15_4Rejection = memo(function Safari15_4Rejection() {
  return (
    <TrackedComponent
      as="div"
      id={TrackedComponents.Safari15_4Rejection}
      className="relative flex h-screen w-full flex-col items-center justify-center p-12 text-center"
    >
      <SpatialLogo className="h-32 w-32 shrink-0" />
      <Heading as="h1" size="h1" className="my-4">
        Browser Unsupported
      </Heading>
      <p className="mt-2 max-w-[800px] text-base">
        This version of Safari has a bug that breaks Spatial and many other 3D applications.
      </p>
      <p className="mt-2 max-w-[800px] text-base">
        To experience Spatial, use Chrome, Firefox, or Safari 15.6 or newer.
      </p>
      <Link href="/" className="absolute left-6 top-6 hover:opacity-70">
        <KeyboardBackspaceIcon />
      </Link>
    </TrackedComponent>
  )
})
