import { useEffect, useState } from "react"

interface UseDragOptions {
  isDisabled?: boolean
}

/**
 * Tracks if the user is currently dragging using the HTML5 Drag and Drop API
 * Returns true if the user is currently dragging anywhere on the window
 * Calls `onDropCallback` when the user "drops" an item
 */
export function useDragAndDrop(onDropCallback: (e: DragEvent) => void, options?: UseDragOptions): boolean {
  // In order to use correctly track drag events through children,
  // you need to use a counter, see https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
  // https://react-dnd.github.io/react-dnd/ is a popular library, but further investigation is required.
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!options?.isDisabled) {
      const onDragEnter = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCount((prev) => prev + 1)
      }

      const onDragLeave = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCount((prev) => Math.max(0, prev - 1))
      }

      const onDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onDropCallback(e)
        setCount(0)
      }

      document.addEventListener("dragenter", onDragEnter)
      document.addEventListener("dragleave", onDragLeave)
      document.addEventListener("drop", onDrop, false)
      return () => {
        document.removeEventListener("dragenter", onDragEnter)
        document.removeEventListener("dragleave", onDragLeave)
        document.removeEventListener("drop", onDrop, false)
      }
    }
  }, [options?.isDisabled, onDropCallback])

  return count !== 0
}
