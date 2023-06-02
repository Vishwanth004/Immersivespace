import clsx from "clsx"
import { memo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { Heading } from "@spatialsys/web/ui"

import { BackpackItemsGrid, BackpackItemsGridProps } from "../items-grid/backpack-items-grid"
import { TEXT_SHADOW } from "../items-grid/item/shared-classes"

type BackpackProps = BackpackItemsGridProps

export const Backpack = memo(function Backpack({ items }: BackpackProps) {
  return (
    <TrackedComponent as="div" id={TrackedComponents.Backpack} className={clsx("text-center", TEXT_SHADOW)}>
      <Heading as="h1" weight="black" className="text-white">
        Backpack
      </Heading>
      {/* TODO: revive world name when the creator is able to set it */}
      {/* <Heading as="h4" size="h4" textAlign="center" className="mx-auto my-0 line-clamp-1 w-1/2 break-all text-white/50">
        for {Object.values(items)[0].worldName || "World"}
      </Heading> */}
      <BackpackItemsGrid items={items} />
    </TrackedComponent>
  )
})
