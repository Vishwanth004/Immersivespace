import { memo, useRef } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

import { getNextAppRootNode } from "@spatialsys/web/core/js/util/dom"
import { useClickedOutsideOf } from "@spatialsys/web/ui/hooks"

import classes from "./floating-container.module.scss"

const DURATION = parseInt(classes.transitionDuration)

type FloatingContainerProps = {
  isOpen: boolean
  refToIgnore: React.RefObject<HTMLDivElement>
  onRequestClose: () => void
  children: React.ReactNode
}

/**
 * Renders a floating text input just above the main dock buttons.
 */
export const FloatingContainer = memo(function FloatingContainer(props: FloatingContainerProps) {
  const { isOpen, children } = props

  const nodeRef = useRef<HTMLDivElement>(null)

  return createPortal(
    <div className={classes.portalContainer}>
      <CSSTransition
        nodeRef={nodeRef}
        classNames={{
          enter: classes.enter,
          enterActive: classes.entering,
          exit: classes.exit,
          exitActive: classes.exiting,
        }}
        in={isOpen}
        mountOnEnter
        timeout={DURATION}
        unmountOnExit
      >
        <div ref={nodeRef} className={classes.positionContainer}>
          <OnClickOutside {...props} nodeRef={nodeRef} />
          <div className={classes.container}>{children}</div>
        </div>
      </CSSTransition>
    </div>,
    getNextAppRootNode()
  )
})

type OnClickOutsideProps = Pick<FloatingContainerProps, "refToIgnore" | "onRequestClose"> & {
  nodeRef: React.RefObject<HTMLDivElement>
}
const OnClickOutside = memo((props: OnClickOutsideProps) => {
  useClickedOutsideOf([props.nodeRef, props.refToIgnore], props.onRequestClose)
  return null
})
