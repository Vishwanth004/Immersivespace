import clsx from "clsx"
import { memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { Heading } from "@spatialsys/web/ui"

import { TEXT_SHADOW } from "../items-grid/item/shared-classes"
import { ShopItemsGrid, ShopItemsGridProps } from "../items-grid/shop-items-grid"

type ShopProps = ShopItemsGridProps

export const Shop = memo(function Shop({ items, backpack }: ShopProps) {
  return (
    <TrackedComponent as="div" id={TrackedComponents.Shop} className={clsx("text-center", TEXT_SHADOW)}>
      <div className="grid grid-cols-3 items-center text-white">
        <Heading as="h1" weight="black" className="col-start-2">
          Shop
        </Heading>
        {/* TODO: this should open the currency shop when after spatial coin is implemented */}
        {backpack.worldCurrencyID && backpack.worldCurrencyBalance >= 0 && (
          <Heading as="h5" className="tooltip-host flex items-center justify-self-end py-1 text-lg">
            {backpack.worldCurrencyThumbnail && (
              <img
                src={backpack.worldCurrencyThumbnail}
                alt={backpack.worldCurrencyName}
                width={24}
                height={24}
                className="mr-1"
              />
            )}
            {backpack.worldCurrencyBalance}
            <div className="tooltip-text tooltip-text--bottom w-24 !whitespace-normal !rounded-md !text-xs text-shadow-none">
              <b>{backpack.worldCurrencyName ?? "World Currency"}</b>. This currency is local to this space or spaces
              within the same world.
            </div>
          </Heading>
        )}
      </div>
      {/* TODO: revive world name when the creator is able to set it */}
      {/* <Heading as="h4" size="h4" textAlign="center" className="mx-auto my-0 line-clamp-1 w-1/2 break-all text-white/50">
        for {Object.values(items)[0].worldName || "World"}
      </Heading> */}
      <ShopItemsGrid items={items} backpack={backpack} />
    </TrackedComponent>
  )
})
