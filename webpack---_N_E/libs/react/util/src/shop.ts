import { ShopItem } from "@spatialsys/js/sapi/types"
import { ShopItemState } from "@spatialsys/unity/app-state"

/**
 * Get the shop items in a mapped format and filter out the ones that are not visible.
 */
export function getMappedShopItems(shopItems: Record<string, ShopItemState>) {
  const mappedShop: ShopItem[] = []

  for (const [key, value] of Object.entries(shopItems)) {
    if (!value.visible) {
      continue
    }

    mappedShop.push({ id: key, ...value })
  }

  return mappedShop
}
