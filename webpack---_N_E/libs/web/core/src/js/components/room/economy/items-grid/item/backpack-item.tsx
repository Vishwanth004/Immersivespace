import { MouseEventHandler, memo } from "react"

import { BackpackItem as BackpackItemType } from "@spatialsys/js/sapi/types"
import { Button, Heading, cn } from "@spatialsys/web/ui"

import { ITEM_CLASSNAMES, ITEM_HOVER_CLASSNAMES, TEXT_SHADOW } from "./shared-classes"

import classes from "../../shared.module.scss"

export type BackpackItemProps = {
  item: BackpackItemType
  isSelected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  onItemUseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: BackpackItemType) => void
}

export const BackpackItem = memo(function BackpackItem({
  item,
  isSelected,
  onClick,
  onItemUseClick,
}: BackpackItemProps) {
  return (
    <button
      key={item.id}
      type="button"
      onClick={onClick}
      className={cn(
        ITEM_CLASSNAMES,
        // TODO: DEV-22412
        !isSelected && ITEM_HOVER_CLASSNAMES,
        "group/item-tile grid grid-cols-1 justify-items-center gap-1 px-2 py-3 text-white backdrop-blur-sm transition duration-200 hover:scale-[1.02]",
        classes.gradientBackground,
        classes.highlightBackground,
        isSelected &&
          "animate-outline-fade outline-2 outline-blue focus:animate-outline-fade focus:outline focus:outline-2 focus:outline-blue"
      )}
    >
      {item.isNew && (
        <div className="absolute -left-3 -top-3 z-10 rounded-xl bg-blue px-2 py-1.5 text-xs normal-case">New</div>
      )}
      {item.stackable && item.amount > 1 && (
        <Heading as="h5" size="h5" className={cn("absolute right-3 top-3 z-10 text-left normal-case", TEXT_SHADOW)}>
          x{item.amount}
        </Heading>
      )}
      <img
        src={item.thumbnailURL}
        alt={item.name}
        className="h-full max-h-96 object-contain p-1 transition duration-300 group-hover/item-tile:scale-[1.03]"
      />
      <Heading as="h5" size="h5" className={cn("line-clamp-1 w-3/4 break-all normal-case", TEXT_SHADOW)}>
        {item.name}
      </Heading>
      <div className="tooltip-host w-2/3 min-w-fit">
        <Button
          size="sm"
          color={item.isEquipped ? "outline" : "black"}
          className={cn(
            "w-full text-sm disabled:pointer-events-auto",
            item.isEquipped && "border border-gray-400 text-white"
          )}
          onClick={(e) => onItemUseClick(e, item)}
          disabled={!item.enabled}
        >
          {item.useButtonLabel}
        </Button>
        {!item.enabled && (
          <div className="tooltip-text tooltip-text--top">{item.disabledMessage || "This item is disabled"}</div>
        )}
      </div>
    </button>
  )
})
