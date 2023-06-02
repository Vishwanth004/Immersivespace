import { memo, useRef } from "react"
import { CSSTransition } from "react-transition-group"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { Button } from "@spatialsys/web/ui"

import classes from "./notification-banner-dialog.module.scss"

export type NotificationBannerDialogProps = {
  primaryButtonTitle: string
  secondaryButtonTitle?: string
  description: string
  exitAnimationDuration: number
  isVisible: boolean
  onPrimaryButtonClick: () => void
  onSecondaryButtonClick?: () => void
  onClose?: () => void
  trackedComponentId: TrackedComponents
}

export const NotificationBannerDialog = memo(function NotificationBannerDialog(props: NotificationBannerDialogProps) {
  const {
    primaryButtonTitle,
    secondaryButtonTitle,
    description,
    exitAnimationDuration,
    isVisible,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    onClose,
    trackedComponentId,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      nodeRef={containerRef}
      in={isVisible}
      timeout={{ exit: exitAnimationDuration }}
      unmountOnExit
      classNames={{
        enter: classes.containerEnter,
        enterActive: classes.containerEnterActive,
        enterDone: classes.containerEnterDone,
        exit: classes.containerExit,
        exitActive: classes.containerExitActive,
      }}
      appear
    >
      <TrackedComponent id={trackedComponentId} className={classes.container}>
        <div
          ref={containerRef}
          className="grid grid-flow-col items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-md"
        >
          <p className="ml-2.5 mr-8 text-lg">{description}</p>
          <div className="grid auto-cols-[180px] grid-flow-col gap-4">
            {secondaryButtonTitle && onSecondaryButtonClick && (
              <Button color="outline" size="xl" onClick={onSecondaryButtonClick}>
                {secondaryButtonTitle}
              </Button>
            )}
            <Button size="xl" onClick={onPrimaryButtonClick}>
              {primaryButtonTitle}
            </Button>
          </div>

          {onClose && <CloseButton onClick={onClose} />}
        </div>
      </TrackedComponent>
    </CSSTransition>
  )
})
