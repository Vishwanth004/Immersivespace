import clsx from "clsx"
import { memo, useCallback, useMemo, useRef } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { ReactComponent as LogoutIcon } from "@spatialsys/assets/icons/material-outlined/logout.svg"
import {
  InteractionName,
  InteractionType,
  TrackedComponent,
  TrackedComponents,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { useGetRecommendedSpacesQuery } from "@spatialsys/react/query-hooks/spaces/recommended"
import { RoomJoinMethod } from "@spatialsys/unity/app-state"
import { SpaceJoinContextSource, createSpaceMetadataProperties } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { useHorizontalScrollable } from "@spatialsys/web/core/js/hooks/use-horizontal-scrollable"
import { sapiSpaceClient } from "@spatialsys/web/sapi"
import { Button, Heading, Loader } from "@spatialsys/web/ui"

import { InstanceCount } from "../../instance-count/instance-count"
import { SpacesGridItem, SpacesGridItemProps } from "../../spaces-grid/item/item"

import classes from "./explore-spaces-on-leave.module.scss"

const NUM_RECOMMENDED_SPACES = 12

const ID = TrackedComponents.RecommendedSpacesOnLeave

type ExploreSpacesOnLeaveProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
export const ExploreSpacesOnLeave = memo(function ExploreSpacesOnLeave(props: ExploreSpacesOnLeaveProps) {
  const { isOpen, onClose } = props

  const trackInteraction = useTrackInteraction()
  const close = useCallback(() => {
    onClose()
    trackInteraction({ component: ID, name: InteractionName.LeaveSpaceCancel, type: InteractionType.Click })
  }, [onClose, trackInteraction])

  return (
    <Modal disableTranslate isOpen={isOpen} modalBaseClass={classes.modal} onRequestClose={close}>
      <InstanceCount />
      <TrackedComponent id={ID}>
        <ExploreSpacesOnLeaveContents {...props} onClose={close} />
      </TrackedComponent>
    </Modal>
  )
})

const ExploreSpacesOnLeaveContents = memo(function ExploreSpacesOnLeaveContents(props: ExploreSpacesOnLeaveProps) {
  const { onClose, onConfirm } = props
  const recommendedSpacesQuery = useGetRecommendedSpacesQuery(
    sapiSpaceClient,
    {},
    // This is pre-fetched in the parent component, so we don't want to refetch it on mount here.
    { refetchOnMount: false }
  )

  return (
    <div className="grid w-full grid-flow-row rounded-2xl bg-black/40 pb-1 pt-4 text-white">
      <div className="grid grid-cols-3 items-center gap-4 px-8">
        <Button
          className="w-fit border-gray-300 text-white"
          color="outline"
          size="lg"
          leftIcon={<LogoutIcon className="icon icon-sm rotate-180" />}
          onClick={onConfirm}
        >
          Leave Space
        </Button>

        <Heading as="h3" size="h3" textAlign="center" weight="black">
          Explore More Spaces
        </Heading>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center justify-self-end text-white transition hover:opacity-70"
        >
          <CloseIcon />
        </button>
      </div>

      {/* 
      Some trickery with an invisible item and absolute position is required, to compensate for the fact that you cannot set
      overflow-x: hidden and overflow-y: visible at the same time. 
      Attempting to do so will set overflow-y: auto, see https://stackoverflow.com/questions/6421966/css-overflow-x-visible-and-overflow-y-hidden-causing-scrollbar-issue/6433475#6433475 
      */}
      <div className="relative min-h-[120px] w-full max-w-full overflow-visible">
        {recommendedSpacesQuery.data ? (
          <SpacesInner recommendSpacesData={recommendedSpacesQuery.data} onClose={onClose} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader variant="fancy" color="white" size="small" />
          </div>
        )}
      </div>
    </div>
  )
})

type SpacesInnerProps = {
  recommendSpacesData: ReturnType<typeof useGetRecommendedSpacesQuery>["data"]
  onClose: () => void
}

const SpacesInner = memo(function SpacesInner(props: SpacesInnerProps) {
  const { recommendSpacesData, onClose } = props
  const trackInteraction = useTrackInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const { canScrollLeft, canScrollRight, scrollToLeft, scrollToRight, updateCanScroll } = useHorizontalScrollable(ref)

  const actions = useAppContext((context) => context.actions)
  const openLoginModal = useCallback(
    // Always force redirect when signing in from in-room
    () => actions.openModal({ type: Modals.Login, payload: { forceRedirect: true } }),
    [actions]
  )

  const setRef = useCallback(
    (el: HTMLDivElement) => {
      ref.current = el
      updateCanScroll()
    },
    [updateCanScroll]
  )

  const handleSelectSpace = useCallback<NonNullable<SpacesGridItemProps["onSelect"]>>(
    (data, metadata) => {
      trackInteraction({ name: InteractionName.JoinRecommendedSpaceOnLeave, type: InteractionType.Click })
      actions.setSpaceJoinContext({
        method: RoomJoinMethod.UserSelected,
        spaceProperties: createSpaceMetadataProperties(data.space),
        discoveryMetadata: {
          ...metadata,
          Source: SpaceJoinContextSource.LeaveRecs,
        },
      })
    },
    [actions, trackInteraction]
  )

  const spaces = useMemo(
    () => recommendSpacesData.spaces.slice(0, NUM_RECOMMENDED_SPACES),
    [recommendSpacesData.spaces]
  )

  return (
    <>
      {/* Render an invisible item to fix the height of the "row" part of the container */}
      <div className={classes.heightSizingContainer}>
        <SpacesGridItem
          spaceData={spaces[0]}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSelect={() => {}}
          spaceListIndex={-1}
          handleDeleteSpace={() => null}
          handleLogin={openLoginModal}
          handleRenameSpace={() => null}
          hideOverflowMenu
          textColor="white"
        />
      </div>

      {/* 
      This container is absolutely positioned. It overflows the translucent-black part, so that the hover preview will be shown correctly. 
      It also attaches an onClick listener to close the modal when clicking outside the "translucent black" part.
      */}
      <div className={classes.spacesGridWrapper} onClick={onClose} ref={setRef} onScroll={updateCanScroll}>
        <div
          className={classes.spacesGrid}
          // Cancel propagation when clicking on an item in this section, to prevent closing the modal.
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {spaces.map((item, index) => {
            return (
              <SpacesGridItem
                spaceData={item}
                key={item.space.id}
                handleDeleteSpace={() => null}
                handleLogin={openLoginModal}
                handleRenameSpace={() => null}
                onSelect={handleSelectSpace}
                hideOverflowMenu
                spaceListIndex={index}
                textColor="white"
              />
            )
          })}
        </div>
      </div>

      {canScrollLeft && (
        <button className={clsx(classes.scrollButton, classes.scrollButtonLeft)} onClick={() => scrollToLeft()}>
          <KeyboardBackspaceIcon />
        </button>
      )}
      {canScrollRight && (
        <button className={clsx(classes.scrollButton, classes.scrollButtonRight)} onClick={() => scrollToRight()}>
          <KeyboardBackspaceIcon />
        </button>
      )}
    </>
  )
})
