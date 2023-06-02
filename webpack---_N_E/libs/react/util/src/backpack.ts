import { BackpackItem } from "@spatialsys/js/sapi/types"
import { BackpackItemState, ItemType } from "@spatialsys/unity/app-state"

export function getMappedBackpackItems(backpackItems: Record<string, BackpackItemState>) {
  const mappedBackpack: BackpackItem[] = []

  for (const [key, value] of Object.entries(backpackItems)) {
    if (value.type === ItemType.Currency) {
      continue
    }

    mappedBackpack.push({ id: key, ...value })
  }

  return mappedBackpack
}
