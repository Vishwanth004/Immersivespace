import { useEffect } from "react"

interface OnMouseWheelProps {
  handler: (e: WheelEvent) => void
}

const OnMouseWheel = (props: OnMouseWheelProps) => {
  useEffect(() => {
    window.addEventListener("wheel", props.handler, { passive: false })
    return () => {
      window.removeEventListener("wheel", props.handler)
    }
  }, [props.handler])
  return null
}

export default OnMouseWheel
