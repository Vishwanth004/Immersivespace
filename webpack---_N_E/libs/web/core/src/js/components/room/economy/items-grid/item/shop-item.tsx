import { MouseEventHandler, memo } from "react"

import { ReactComponent as BackpackIcon } from "@spatialsys/assets/img/svg/backpack.svg"
import { ShopItem as ShopItemType } from "@spatialsys/js/sapi/types"
import { ShopItemPurchaseStatus } from "@spatialsys/unity/app-state"
import { Button, Heading, cn } from "@spatialsys/web/ui"

import { ITEM_CLASSNAMES, ITEM_HOVER_CLASSNAMES, TEXT_SHADOW } from "./shared-classes"

import classes from "../../shared.module.scss"

export type ShopItemProps = {
  item: ShopItemType
  isSelected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  onItemPurchaseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ShopItemType) => void
}

export const ShopItem = memo(function ShopItem({ item, isSelected, onClick, onItemPurchaseClick }: ShopItemProps) {
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
      {item.stackable && item.owned && item.ownedAmount > 0 && (
        <Heading
          as="h5"
          size="h5"
          className={cn("absolute right-3 top-3 z-10 flex items-center text-left normal-case", TEXT_SHADOW)}
        >
          <BackpackIcon className="mr-[2px] w-3" />
          {item.ownedAmount}
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
          className="w-full text-sm disabled:pointer-events-auto"
          leftIcon={
            item.worldPrice.customThumbnailUrl && (
              <img src={item.worldPrice.customThumbnailUrl} alt={item.worldPrice.currencyName} width={20} height={20} />
            )
          }
          onClick={(e) => onItemPurchaseClick(e, item)}
          disabled={!item.enabled}
          isLoading={item.purchaseStatus.status === ShopItemPurchaseStatus.Purchasing}
        >
          {(() => {
            if (item.owned && !item.stackable) {
              return item.ctaButtonLabel
            } else {
              if (item.worldPrice.price > 0) {
                return item.worldPrice.price
              } else {
                return "Free"
              }
            }
          })()}
        </Button>
        {!item.enabled && (
          <div className="tooltip-text tooltip-text--top">{item.disabledMessage || "This item is disabled"}</div>
        )}
      </div>
    </button>
  )
})
