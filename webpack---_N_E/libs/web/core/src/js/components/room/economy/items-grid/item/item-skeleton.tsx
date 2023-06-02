import { Skeleton, cn } from "@spatialsys/web/ui"

import { ITEM_CLASSNAMES } from "./shared-classes"

const NUM_ITEMS_IN_LOADER = 9

type ItemsGridLoadingSkeletonProps = {
  isBackpack?: boolean
}

export const ItemsGridLoadingSkeleton = ({ isBackpack }: ItemsGridLoadingSkeletonProps) => {
  const loadingItemsArr = new Array(isBackpack ? NUM_ITEMS_IN_LOADER - 1 : NUM_ITEMS_IN_LOADER).fill(0)
  return (
    <>
      {loadingItemsArr.map((_, index) => (
        <div key={index} className={cn(ITEM_CLASSNAMES, "h-full w-full justify-normal bg-gray-400 opacity-20")}>
          <Skeleton className="h-full overflow-hidden rounded opacity-20" />
        </div>
      ))}
    </>
  )
}
