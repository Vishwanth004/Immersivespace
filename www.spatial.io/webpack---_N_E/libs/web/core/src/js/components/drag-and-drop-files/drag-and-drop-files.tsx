import { useRef } from "react"
import { CSSTransition } from "react-transition-group"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { Heading } from "@spatialsys/web/ui"

import classes from "./drag-and-drop-files.module.scss"

const TRANSITION_TIMEOUT = parseInt(classes.transitionDuration)

/** Retrieves all files from a drop event */
export const getFilesFromDropEvent = (evt: DragEvent) => {
  evt.dataTransfer.dropEffect = "copy"
  const files: File[] = []
  // From: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
  if (evt.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (const item of evt.dataTransfer.items) {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile()
        files.push(file)
      }
    }
  } else if (evt.dataTransfer.files) {
    // Use DataTransfer interface to access the file(s)
    files.push(...evt.dataTransfer.files)
  }

  return files
}

interface DragAndDropFilesOverlayProps {
  isVisible: boolean
}

export const DragAndDropFilesOverlay = ({ isVisible }: DragAndDropFilesOverlayProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      nodeRef={ref}
      mountOnEnter
      in={isVisible}
      timeout={TRANSITION_TIMEOUT}
      unmountOnExit
      classNames={{
        enter: classes.enter,
        enterActive: classes.entering,
        exit: classes.exit,
        exitActive: classes.exiting,
      }}
    >
      <TrackedComponent id={TrackedComponents.DragAndDropFilesOverlay}>
        <div ref={ref} className={classes.container}>
          <div className={classes.overlay}>
            <Heading className="text-5xl">Drop content here</Heading>
            <span className={classes.description}>Upload a 3D model, image, video, or document</span>
          </div>
        </div>
      </TrackedComponent>
    </CSSTransition>
  )
}
