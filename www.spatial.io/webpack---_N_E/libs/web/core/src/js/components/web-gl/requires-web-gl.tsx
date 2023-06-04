import Link from "next/link"
import { ReactElement, memo } from "react"

import { ReactComponent as SpatialLogo } from "@spatialsys/assets/icons/logos/spatial.svg"
import { ReactComponent as ArrowForwardIos } from "@spatialsys/assets/icons/material-filled/arrow-forward-ios.svg"
import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { PropsWithChildrenRequired } from "@spatialsys/js/types"
import { WebGLAvailability, getWebGLAvailability } from "@spatialsys/js/util/is-web-gl-available"
import { Heading } from "@spatialsys/web/ui"

/**
 * Checks if a route require WebGL 2.0, showing a fallback if it's needed and the
 * browser doesn't support it.
 */
export const RequiresWebGl = memo(function RequiresWebGl({ children }: PropsWithChildrenRequired) {
  const isWebgl2Supported = getWebGLAvailability() === WebGLAvailability.WebGL2
  if (!isWebgl2Supported) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center">
        <div className="grid max-w-[640px] items-center justify-items-center gap-8 p-4 text-center">
          <SpatialLogo className="h-32 w-32" />

          <Heading as="h1" size="h1">
            Incompatible Browser
          </Heading>
          <p>
            It appears your browser does not support WebGL 2.0, which is required for Spatial. You might need to upgrade
            your browser or use a more modern machine.
          </p>
          <p>
            You can find out more about using WebGL on your device{" "}
            <a className="underline" href="https://get.webgl.org/webgl2/" target="_blank" rel="noreferrer">
              here
            </a>
            .
          </p>
          <a
            className="flex items-center"
            href="https://support.spatial.io/hc/en-us/articles/360060391652-Using-Spatial-In-a-Desktop-Web-Browser"
            target="_blank"
            rel="noreferrer"
          >
            View Compatible Browsers
            <ArrowForwardIos className="pl-1" />
          </a>
        </div>
        <Link href="/" className="absolute left-6 top-6 hover:opacity-70">
          <KeyboardBackspaceIcon />
        </Link>
      </div>
    )
  }

  return children as ReactElement
})
