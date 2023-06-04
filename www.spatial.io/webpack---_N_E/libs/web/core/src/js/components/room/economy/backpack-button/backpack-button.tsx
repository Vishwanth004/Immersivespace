import { forwardRef, memo } from "react"

import { ReactComponent as BackpackIcon } from "@spatialsys/assets/img/svg/backpack.svg"
import { useAppContext } from "@spatialsys/web/app-context"

import CircleButton from "../../../circle-button/circle-button"
import { NewItemNotification } from "../backpack-button/new-item-notification"

type BackpackButtonProps = {
  onClick: () => void
  showTooltip: boolean
}

export const BackpackButton = memo(
  forwardRef<HTMLDivElement, BackpackButtonProps>(({ onClick, showTooltip }, backpackButtonRef) => {
    const hasNewItems = useAppContext((context) => context.state.unity.appState.roomSession.backpack.hasNewItems)

    return (
      <CircleButton
        ligature={<BackpackIcon />}
        color="outline"
        tooltipText={showTooltip ? "Backpack (I)" : undefined}
        ref={backpackButtonRef}
        onClick={onClick}
      >
        {hasNewItems && <NewItemNotification />}
      </CircleButton>
    )
  })
)
