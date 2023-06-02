import { memo } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import { useDefaultProps } from "@spatialsys/web/core/js/util/hooks"
import { Button, cn } from "@spatialsys/web/ui"

interface CopyToClipboardButtonProps {
  textToCopy: string
  label?: string
  className?: string
  disabled?: boolean
  onCopy?: () => void
}

export const CopyToClipboardButton = memo((props: CopyToClipboardButtonProps) => {
  const { textToCopy, label, className, disabled, onCopy } = useDefaultProps(props, {
    label: "Copy to Clipboard",
  })

  return (
    <CopyToClipboard text={textToCopy} onCopy={onCopy} options={{ format: "text/plain" }}>
      <Button className={cn("rounded-md uppercase shadow-none", className)} color="black" size="sm" disabled={disabled}>
        {label}
      </Button>
    </CopyToClipboard>
  )
})
