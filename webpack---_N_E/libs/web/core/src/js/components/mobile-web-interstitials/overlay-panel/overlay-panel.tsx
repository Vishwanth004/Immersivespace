import { memo, useState } from "react"

import { ReactComponent as AppleIcon } from "@spatialsys/assets/icons/material-filled/apple.svg"
import AndroidIcon from "@spatialsys/web/core/img/devices/android.svg"
import { useDynamicLink } from "@spatialsys/web/core/js/hooks/firebase/use-dynamic-link"
import { Button, Heading } from "@spatialsys/web/ui"
import { isiOS } from "@spatialsys/web/user-agent"

type OverlayPanelProps = {
  onOpenInApp: () => void
  title: string
  description: string
}

export const OverlayPanel = memo(function OverlayPanel({ onOpenInApp, title, description }: OverlayPanelProps) {
  const [isApple] = useState(() => (typeof navigator === "undefined" ? false : isiOS(navigator.userAgent)))
  const dynamicLink = useDynamicLink()

  return (
    <div className="relative mb-6 h-[270px] w-full">
      <div className="absolute inset-0 grid items-center justify-center rounded-t-3xl bg-white p-6 text-center">
        <div className="grid gap-4">
          <Heading as="h5" size="h3" textAlign="center" weight="black" className="-mb-2">
            {title}
          </Heading>
          <p className="text-xs text-gray-500">{description}</p>

          <Button
            as="a"
            className=""
            color="black"
            size="xl"
            fullWidth
            leftIcon={isApple ? <AppleIcon /> : <img src={AndroidIcon} alt="Android icon" />}
            target="_blank"
            rel="noopener noreferrer"
            href={dynamicLink.href}
            onClick={onOpenInApp}
          >
            Open in App
          </Button>
        </div>
      </div>
    </div>
  )
})
