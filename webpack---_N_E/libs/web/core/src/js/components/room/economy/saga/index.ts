import { select, takeLatest } from "typed-redux-saga/macro"

import { UnityMessages } from "@spatialsys/unity/bridge"
import { ActionType, AppState } from "@spatialsys/web/app-state"

/**
 * A saga to manage in-space economy system, handling UI logic such as:
 * 1) Previewing backpack items when selected item changes
 * 2) Previewing shop items when selected item changes
 * 3)
 */
export function* economySaga() {
  yield* takeLatest(ActionType.SetSelectedBackpackItem, onSelectedBackpackItemChange)
  yield* takeLatest(ActionType.SetSelectedShopItem, onSelectedShopItemChange)
}

/**
 * Observes the selected backpack item change, and call the Unity message for item preview.
 */
function* onSelectedBackpackItemChange() {
  const selectedItem = yield* select((state: AppState) => state.space.selectedBackpackItem)
  if (selectedItem !== null) {
    UnityMessages.previewBackpackItem(selectedItem.id)
  }
}

/**
 * Observes the selected shop item change, and call the Unity message for item preview.
 */
function* onSelectedShopItemChange() {
  const selectedItem = yield* select((state: AppState) => state.space.selectedShopItem)
  if (selectedItem !== null) {
    UnityMessages.previewShopItem(selectedItem.id)
  }
}
