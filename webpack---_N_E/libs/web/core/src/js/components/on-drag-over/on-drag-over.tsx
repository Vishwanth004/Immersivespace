import { useEffect } from "react"

interface OnDragOverProps {
  handler: (e: DragEvent) => void
}

const OnDragOver = (props: OnDragOverProps) => {
  useEffect(() => {
    window.addEventListener("dragover", props.handler, { passive: false })
    return () => {
      window.removeEventListener("dragover", props.handler)
    }
  }, [props.handler])
  return null
}

export default OnDragOver
