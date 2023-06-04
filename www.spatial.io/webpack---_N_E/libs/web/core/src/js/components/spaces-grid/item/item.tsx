import clsx from "clsx"
import { memo, useCallback, useMemo, useRef } from "react"
import { useHoverDirty } from "react-use"

import { ReactComponent as CheckIcon } from "@spatialsys/assets/icons/material-filled/check.svg"
import { isAdminOfSAPIRoom } from "@spatialsys/js/sapi/helpers"
import { SAPILobbyType, SpaceAndCreator, SpaceMetadata } from "@spatialsys/js/sapi/types"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { SpaceItemClickMetadata } from "@spatialsys/unity/bridge"
import { formatSpacePath } from "@spatialsys/url-utils"
import { useAuthState } from "@spatialsys/web/app-context"
import { sapiFeatureFlagsClient } from "@spatialsys/web/sapi"

import { useIsMobile } from "../../../hooks/use-is-mobile"
import { LinkOrButton } from "../../link-or-button/link-or-button"
import { getShareUrl } from "../../share/share"
import * as Toast from "../../toast/toast"
import { useUser } from "../../user/user-query-hooks"
import { SpacesGridItemHoverPreview } from "./hover-preview/hover-preview"
import { OverflowMenu } from "./overflow-menu/overflow-menu"
import { SpaceNameAndCreator, SpaceNameAndCreatorProps } from "./space-name-and-creator/space-name-and-creator"
import { ThumbnailOverlay } from "./thumbnail-overlay/thumbnail-overlay"
import { Thumbnail } from "./thumbnail/thumbnail"

import classes from "./item.module.scss"

export type SpacesGridItemProps = {
  /** If true, renders a button instead of a link */
  asButton?: boolean
  handleDeleteSpace: (space: SpaceMetadata) => void
  handleLogin: () => void
  handleRenameSpace: (space: SpaceMetadata) => void
  /** Callback when the tile is pressed. */
  onSelect: (space: SpaceAndCreator, metadata: SpaceItemClickMetadata) => void
  /**
   * If true, renders a button in the overflow menu to "set as banner"
   */
  handleSetBanner?: (space: SpaceMetadata) => void
  /** If true, opens the creator profile in a new tab */
  openCreatorProfileInNewTab?: boolean
  spaceData: SpaceAndCreator
  spaceListIndex: number
  /**
   * If true, will hide the socialSignals to avoid immediate UI shifting
   *
   * Defaults to false.
   */
  isLoadingLoved?: boolean
  hideOverflowMenu?: boolean
  showHoverPreview?: boolean
  onCheck?: (space: SpaceAndCreator, check: boolean) => void
  isChecked?: boolean
} & Pick<SpaceNameAndCreatorProps, "textColor">

export const SpacesGridItem = memo(function SpacesGridItem(props: SpacesGridItemProps) {
  const {
    asButton,
    handleDeleteSpace,
    handleLogin,
    handleRenameSpace,
    onSelect,
    handleSetBanner,
    spaceData,
    isLoadingLoved,
    openCreatorProfileInNewTab,
    hideOverflowMenu = false,
    spaceListIndex,
    textColor = "black",
    showHoverPreview = true,
    onCheck,
    isChecked = false,
  } = props

  // Have to keep track of this state in code because we want unified animation between
  // non-sibling elements. Can use `:has()` selector for this instead when widely available.
  const [thumbnailHovered, setThumbnailHovered] = useBoolean(false)
  const [spaceNameHovered, setSpaceNameHovered] = useBoolean(false)
  const [checked, setChecked] = useBoolean(isChecked)
  const spaceHovered = thumbnailHovered || spaceNameHovered

  const { user } = useUser()
  const { isAuthenticated } = useAuthState()
  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)
  const isMobile = useIsMobile()

  const { space } = spaceData
  const spacePath = formatSpacePath(space.id, space.slug, space.shareID)

  // Overflow menu
  const containerRef = useRef<HTMLDivElement>(null)
  const isHovering = useHoverDirty(containerRef)

  const handleCopy = useCallback(() => {
    Toast.notify("Copied link to clipboard!")
  }, [])

  const isHoverPreviewEnabled = featureFlagsQuery.data?.featureFlags.spaceItemHoverPreview && !isMobile

  const handleCheck = useCallback(() => {
    setChecked.toggle()
    onCheck?.(spaceData, checked)
  }, [checked, onCheck, setChecked, spaceData])

  const overflowMenu = useMemo(() => {
    if (hideOverflowMenu) {
      return null
    }
    return (
      <OverflowMenu
        spaceID={space.id}
        spaceName={space.name}
        buttonPosition={isHoverPreviewEnabled ? "right" : "topRight"}
        copyToClipboardUrl={getShareUrl(space)}
        isAdmin={isAdminOfSAPIRoom(space, user?.id)}
        isOwner={space.ownerID === user?.id}
        isAuthenticated={isAuthenticated}
        hasParticipants={space.activeUserCount > 0}
        isHovering={isHovering}
        isLobby={space.lobbyType !== SAPILobbyType.None}
        onCopyUrl={handleCopy}
        onDelete={() => {
          handleDeleteSpace(space)
        }}
        onRename={() => {
          handleRenameSpace(space)
        }}
        onSetAsBanner={
          handleSetBanner
            ? () => {
                handleSetBanner(space)
              }
            : undefined
        }
      />
    )
  }, [
    handleCopy,
    handleDeleteSpace,
    handleRenameSpace,
    handleSetBanner,
    hideOverflowMenu,
    isHoverPreviewEnabled,
    isHovering,
    space,
    user?.id,
    isAuthenticated,
  ])

  return (
    <div
      className={clsx(
        classes.container,
        spaceHovered && classes.spaceHovered,
        isHoverPreviewEnabled && classes.disableScale
      )}
      id="spaceListGridItem"
      ref={containerRef}
    >
      <div
        className={clsx(
          "relative w-full overflow-hidden bg-black/20",
          classes.thumbnailContainer,
          spaceHovered && classes.shadow
        )}
      >
        <LinkOrButton
          className="absolute inset-0"
          asButton={asButton}
          linkHref={spacePath}
          onClick={() => onSelect(spaceData, { "Space Index": spaceListIndex, "On Space Thumbnail": true })}
          onMouseEnter={setThumbnailHovered.setTrue}
          onMouseLeave={setThumbnailHovered.setFalse}
          onFocus={setThumbnailHovered.setTrue}
          onBlur={setThumbnailHovered.setFalse}
        >
          <Thumbnail thumbnailUrl={space.thumbnail} name={space.name} />
        </LinkOrButton>
        <ThumbnailOverlay
          space={space}
          loadingLoved={isLoadingLoved}
          handleUnauthenticatedClick={handleLogin}
          tooltip={isHoverPreviewEnabled && showHoverPreview && "Keep Hovering to Preview"}
          showTooltip={isHoverPreviewEnabled && thumbnailHovered}
        />
        {onCheck && (
          <button
            className={clsx(
              checked && "border-2 border-solid border-blue bg-blue text-white hover:bg-opacity-80",
              !checked && "hover:bg-blue hover:bg-opacity-30",
              "absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-white duration-75 active:bg-opacity-70"
            )}
            onClick={handleCheck}
          >
            {checked && <CheckIcon className="icon icon-sm" />}
          </button>
        )}
      </div>
      <SpaceNameAndCreator
        overflowMenu={isHoverPreviewEnabled && overflowMenu}
        spaceHovered={spaceHovered}
        setSpaceHovered={setSpaceNameHovered}
        openCreatorProfileInNewTab={openCreatorProfileInNewTab}
        asButton={asButton}
        spaceAndCreator={spaceData}
        onClick={() => onSelect(spaceData, { "Space Index": spaceListIndex, "On Space Name": true })}
        textColor={textColor}
      />

      {isHoverPreviewEnabled && showHoverPreview && (
        <SpacesGridItemHoverPreview
          overflowMenu={overflowMenu}
          isHovering={thumbnailHovered}
          spaceData={spaceData}
          openCreatorProfileInNewTab={openCreatorProfileInNewTab}
          asButton={asButton}
          onSelectSpace={(space, metadata) =>
            onSelect(space, { ...metadata, "Space Index": spaceListIndex, "On Hover Card": true })
          }
          isLoadingLoved={isLoadingLoved}
          handleLogin={handleLogin}
          spaceListIndex={spaceListIndex}
        />
      )}

      {!isHoverPreviewEnabled && overflowMenu}
    </div>
  )
})
