import { isEmpty } from "lodash"
import { memo, useCallback, useEffect, useMemo } from "react"
import { Slide, toast } from "react-toastify"

import { ReactComponent as StoreIcon } from "@spatialsys/assets/icons/material-filled/store.svg"
import { BackpackItem as BackpackItemType } from "@spatialsys/js/sapi/types"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { getMappedBackpackItems } from "@spatialsys/react/util/backpack"
import { BackpackItemState } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import { sapiFeatureFlagsClient } from "@spatialsys/web/sapi"
import { Button, Heading, cn } from "@spatialsys/web/ui"

import { useRoomActions } from "../../../../routes/rooms/room/room-actions"
import { CloseButtonToast } from "../../../close-button/close-button"
import { BackpackItemDetailsModal } from "../item-details-modal/backpack-item-details-modal"
import { BackpackItem } from "./item/backpack-item"
import { ItemsGridLoadingSkeleton } from "./item/item-skeleton"
import { TEXT_SHADOW } from "./item/shared-classes"

export type BackpackItemsGridProps = {
  items: Record<string, BackpackItemState>
}

export const BackpackItemsGrid = memo(function BackpackItemsGrid({ items }: BackpackItemsGridProps) {
  const selectedItem = useAppContext((context) => context.state.space.selectedBackpackItem)
  const shouldOpenItemDetailsModal = useAppContext((context) => context.state.space.selectedBackpackItem !== null)
  const actions = useAppContext((context) => context.actions)
  const isEmptyShop = useAppContext((context) => isEmpty(context.state.unity.appState.roomSession.shop.items))
  const hasWorldCurrency = useAppContext((context) => context.state.unity.appState.roomSession.backpack.worldCurrencyID)

  const mappedBackpackItems = useMemo(() => getMappedBackpackItems(items), [items])

  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)
  const showShop = featureFlagsQuery.data?.featureFlags.shop ?? false

  const trackInteraction = useTrackInteraction()
  const { isAuthless } = useAuthState()
  const roomActions = useRoomActions(actions)

  const handleItemClick = useCallback(
    (item: BackpackItemType) => {
      actions.setSelectedBackpackItem(item)
    },
    [actions]
  )

  const onItemDetailsModalClose = useCallback(() => {
    actions.setSelectedBackpackItem(null)
  }, [actions])

  const onItemUseClick = useCallback(
    (event: React.MouseEvent, item: BackpackItemType) => {
      event.stopPropagation()
      trackInteraction(
        { name: InteractionName.UseBackpackItem, type: InteractionType.Click },
        { "Backpack Item": item }
      )
      UnityMessages._useBackpackItem(item.id)
      actions.focusUnity()
    },
    [actions, trackInteraction]
  )

  const onSignInClick = useCallback(() => {
    trackInteraction({ name: InteractionName.AuthlessSignInBackpackToast, type: InteractionType.Click })
    actions.openModal({
      type: Modals.Login,
      payload: { forceRedirect: true, titleCta: "Sign in to save the items in your backpack" },
    })
  }, [actions, trackInteraction])

  const onClickShopButton = useCallback(() => {
    roomActions.closeBackpackDrawer()
    roomActions.openShopDrawer()
  }, [roomActions])

  useEffect(() => {
    return () => {
      actions.setSelectedBackpackItem(null)
    }
  }, [actions])

  useEffect(() => {
    isAuthless &&
      toast(
        <div>
          <Button variant="text" className="p-0 text-base underline" onClick={onSignInClick}>
            Sign in
          </Button>{" "}
          to save the items in your backpack
        </div>,
        {
          toastId: "authless-backpack-toast",
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
  }, [isAuthless, onSignInClick])

  return (
    <>
      <div className="mt-8 grid w-full auto-rows-fr grid-cols-2 justify-items-center gap-4 pb-8 lg:grid-cols-3 2xl:grid-cols-4">
        {showShop && !isEmptyShop && hasWorldCurrency && (
          <button
            className="grid h-full w-full flex-col items-center justify-items-center rounded-lg border border-solid text-center text-white transition duration-200 hover:scale-[1.02]"
            onClick={onClickShopButton}
          >
            <StoreIcon className="h-24 w-24 self-end" />

            <Heading
              as="h5"
              size="h5"
              className={cn("line-clamp-1 w-3/4 self-start break-all normal-case", TEXT_SHADOW)}
            >
              Shop
            </Heading>
          </button>
        )}
        {mappedBackpackItems.length > 0 ? (
          mappedBackpackItems.map((item) => {
            return (
              <BackpackItem
                key={item.id}
                item={item}
                isSelected={item.id === selectedItem?.id}
                onClick={() => handleItemClick(item)}
                onItemUseClick={onItemUseClick}
              />
            )
          })
        ) : (
          <>
            <ItemsGridLoadingSkeleton isBackpack />
            <div className="absolute top-1/2 grid items-center justify-center text-white text-shadow-sm">
              <div>
                <Heading size="h1" weight="black">
                  Nothing Yet.
                </Heading>
                <div className="mt-1 font-heading text-lg font-demibold text-white opacity-50">
                  Keep Exploring. We're sure you'll find something.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <BackpackItemDetailsModal
        isOpen={shouldOpenItemDetailsModal}
        onRequestClose={onItemDetailsModalClose}
        item={selectedItem}
        onItemUseClick={onItemUseClick}
      />
    </>
  )
})
