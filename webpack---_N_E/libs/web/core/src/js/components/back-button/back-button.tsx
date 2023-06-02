import { memo } from "react"

import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"

interface BackButtonProps {
  className?: string
  color?: string
  onClick: () => void
}

export const BackButton = memo(function BackButton(props: BackButtonProps) {
  const { className, color, onClick } = props

  return (
    <button
      className={className}
      style={{
        width: "50px",
        height: "50px",
      }}
      onClick={onClick}
      type="button"
    >
      <KeyboardBackspaceIcon className={`font-semibold ${color}`} style={{ verticalAlign: "middle" }} />
    </button>
  )
})
