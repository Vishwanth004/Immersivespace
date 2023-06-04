import { memo } from "react"

import { CopyToClipboardButton } from "@spatialsys/web/core/js/components/copy-to-clipboard-button/copy-to-clipboard-button"
import { cn } from "@spatialsys/web/ui"

import classes from "./copy-to-clipboard-field.module.scss"

interface CopyToClipboardFieldProps {
  text: string
  className?: string
  onCopy?: () => void
}

export const CopyToClipboardField = memo((props: CopyToClipboardFieldProps) => {
  const { text, className, onCopy } = props

  return (
    <div className={cn("grid w-full grid-flow-col items-center gap-2", className)}>
      <div className={`${classes.text} mr-2 flex-1 overflow-scroll whitespace-nowrap break-all border-0 text-sm `}>
        {text}
      </div>
      <CopyToClipboardButton textToCopy={text} label="Copy" className="my-1 w-20" onCopy={onCopy} />
    </div>
  )
})
