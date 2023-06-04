import { useEffect } from "react"

interface OnDropProps {
  handler: (e: DragEvent) => void
}

const OnDrop = (props: OnDropProps) => {
  useEffect(() => {
    window.addEventListener("drop", props.handler, { passive: false })
    return () => {
      window.removeEventListener("drop", props.handler)
    }
  }, [props.handler])
  return null
}

export default OnDrop
