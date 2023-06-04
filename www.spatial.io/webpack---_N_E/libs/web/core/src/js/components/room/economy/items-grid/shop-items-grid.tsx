import { memo, useCallback, useEffect, useMemo } from "react"
import { Slide, toast } from "react-toastify"

import { ShopItem as ShopItemType } from "@spatialsys/js/sapi/types"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { getMappedShopItems } from "@spatialsys/react/util/shop"
import { BackpackState, ShopItemState } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import { Button, Heading } from "@spatialsys/web/ui"

import { CloseButtonToast } from "../../../close-button/close-button"
import { InsufficientFundsModal } from "../insufficient-funds-modal/insufficient-funds-modal"
import { ShopItemDetailsModal } from "../item-details-modal/shop-item-details-modal"
import { ItemsGridLoadingSkeleton } from "./item/item-skeleton"
import { ShopItem } from "./item/shop-item"

export type ShopItemsGridProps = {
  items: Record<string, ShopItemState>
  backpack: BackpackState
}

export const ShopItemsGrid = memo(function ShopItemsGrid({ items, backpack }: ShopItemsGridProps) {
  const selectedItem = useAppContext((context) => context.state.space.selectedShopItem)
  const shouldOpenItemDetailsModal = useAppContext((context) => context.state.space.selectedShopItem !== null)
  const actions = useAppContext((context) => context.actions)
  const trackInteraction = useTrackInteraction()
  const { isAuthless } = useAuthState()

  const mappedShopItems = useMemo(() => getMappedShopItems(items), [items])
  const [showInsufficientFundsModal, setShowInsufficientFundsModal] = useBoolean(false)

  const handleItemClick = useCallback(
    (item: ShopItemType) => {
      trackInteraction({ name: InteractionName.OpenShopItemDetailsModal, type: InteractionType.View }, { item: item })
      actions.setSelectedShopItem(item)
    },
    [actions, trackInteraction]
  )

  const onItemDetailsModalClose = useCallback(() => {
    actions.setSelectedShopItem(null)
  }, [actions])

  const onSignInClick = useCallback(() => {
    trackInteraction({ name: InteractionName.AuthlessSignInShopToast, type: InteractionType.Click })
    actions.openModal({
      type: Modals.Login,
      payload: { forceRedirect: true, titleCta: "Sign in to buy the items from the shop" },
    })
  }, [actions, trackInteraction])

  useEffect(() => {
    return () => {
      actions.setSelectedShopItem(null)
    }
  }, [actions])

  const onItemPurchaseClick = useCallback(
    (event: React.MouseEvent, item: ShopItemType) => {
      event.stopPropagation()
      if (isAuthless) {
        toast(
          <div>
            <Button variant="text" className="p-0 text-base underline" onClick={onSignInClick}>
              Sign in
            </Button>{" "}
            to buy the items from the shop
          </div>,
          {
            toastId: "authless-shop-toast",
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Slide,
            className: "toast-bg toast-bg-overflow",
            bodyClassName: "toast-body",
            progressClassName: "toast-progress-bar",
            autoClose: false,
            closeOnClick: true,
            draggable: false,
            closeButton: CloseButtonToast,
          }
        )
        return
      }

      if (item.worldPrice.price <= backpack.worldCurrencyBalance) {
        trackInteraction({ name: InteractionName.PurchaseShopItem, type: InteractionType.Click }, { item: item })
        UnityMessages.purchaseShopItem(item.id)
      } else {
        setShowInsufficientFundsModal.setTrue()
      }

      actions.focusUnity()
    },
    [actions, backpack.worldCurrencyBalance, isAuthless, onSignInClick, setShowInsufficientFundsModal, trackInteraction]
  )

  return (
    <>
      <div className="mt-8 grid w-full auto-rows-fr grid-cols-2 justify-items-center gap-4 pb-8 lg:grid-cols-3 2xl:grid-cols-4">
        {mappedShopItems.length > 0 ? (
          mappedShopItems.map((item) => {
            return (
              <ShopItem
                key={item.id}
                item={item}
                isSelected={item.id === selectedItem?.id}
                onClick={() => handleItemClick(item)}
                onItemPurchaseClick={onItemPurchaseClick}
              />
            )
          })
        ) : (
          <>
            <ItemsGridLoadingSkeleton />
            <div className="absolute top-1/2 grid items-center justify-center text-white text-shadow-sm">
              <div>
                <Heading size="h1" weight="black">
                  Nothing For Sale Yet!
                </Heading>
                <div className="mt-1 font-heading text-lg font-demibold text-white opacity-50">
                  The Creator has not listed anything for sale yet
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ShopItemDetailsModal
        isOpen={shouldOpenItemDetailsModal}
        onRequestClose={onItemDetailsModalClose}
        item={selectedItem}
        onItemPurchaseClick={onItemPurchaseClick}
      />
      <InsufficientFundsModal
        isOpen={showInsufficientFundsModal}
        onRequestClose={setShowInsufficientFundsModal.setFalse}
        worldCurrencyName={backpack.worldCurrencyName}
      />
    </>
  )
})
