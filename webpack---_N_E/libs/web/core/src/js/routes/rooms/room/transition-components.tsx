import { PropsWithChildren, forwardRef } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { CSSTransitionProps } from "react-transition-group/CSSTransition"
import { SwitchTransitionProps } from "react-transition-group/SwitchTransition"

import cssVars from "@spatialsys/web/core/js/routes/rooms/variables.module.scss"

import classes from "./transition-components.module.scss"

const TIMEOUT_DURATION = parseInt(cssVars.transitionHiddenDuration)

type TransitionComponentHiddenProps<T extends HTMLElement> = PropsWithChildren<CSSTransitionProps<T>>
type SwitchTransitionComponentProps = PropsWithChildren<SwitchTransitionProps> & { state: string }

function TransitionComponentHiddenInner<T extends HTMLElement>(
  props: TransitionComponentHiddenProps<T>,
  ref: React.ForwardedRef<T>
) {
  const { children, ...rest } = props

  return (
    <CSSTransition
      nodeRef={ref}
      mountOnEnter
      classNames={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        exit: classes.exit,
        exitActive: classes.exitActive,
        exitDone: classes.exitDone,
      }}
      timeout={TIMEOUT_DURATION}
      unmountOnExit
      {...rest}
    >
      {children}
    </CSSTransition>
  )
}

export function SwitchTransitionComponent(props: SwitchTransitionComponentProps) {
  const { mode, state, children, ...rest } = props

  return (
    <SwitchTransition mode={mode}>
      <CSSTransition
        key={state}
        classNames={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          exit: classes.exit,
          exitActive: classes.exitActive,
          exitDone: classes.exitDone,
        }}
        timeout={TIMEOUT_DURATION}
        unmountOnExit
        {...rest}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  )
}

export const TransitionComponentHidden = forwardRef(TransitionComponentHiddenInner)
