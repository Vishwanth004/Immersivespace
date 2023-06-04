import { forwardRef, memo } from "react"

import { useAppContext } from "@spatialsys/web/app-context"
import { UiModes } from "@spatialsys/web/app-state"
import { CameraModeButtons } from "@spatialsys/web/core/js/components/room/recording-buttons/recording-buttons"

import { DockButtons, DockButtonsProps } from "./dock-buttons"
import { SelectedObjectButtons, SelectedObjectButtonsProps } from "./selected-object-buttons"

import classes from "./bottom-dock.module.scss"

type BottomDockProps = {
  isReadOnlyActor: boolean
  selectedObjectID: number
} & DockButtonsProps &
  SelectedObjectButtonsProps

export const BottomDock = memo(
  forwardRef<HTMLDivElement, BottomDockProps>(function BottomDock(props, ref) {
    const showSelectedObjectButtons = !props.isReadOnlyActor && props.selectedObjectID !== 0
    const showDockButtons = props.selectedObjectID === 0
    const uiMode = useAppContext((context) => context.state.space.uiMode)

    return (
      <div className={classes.container} ref={ref}>
        {(() => {
          if (uiMode === UiModes.Camera) {
            return <CameraModeButtons />
          }

          if (showSelectedObjectButtons) {
            return (
              <SelectedObjectButtons
                onTransformButtonClick={props.onTransformButtonClick}
                onInfoButtonClick={props.onInfoButtonClick}
                addContentDisabled={props.addContentDisabled}
                toggleObjectLightbox={props.toggleObjectLightbox}
              />
            )
          }

          if (showDockButtons) {
            return <DockButtons {...props} />
          }

          return null
        })()}
      </div>
    )
  })
)
