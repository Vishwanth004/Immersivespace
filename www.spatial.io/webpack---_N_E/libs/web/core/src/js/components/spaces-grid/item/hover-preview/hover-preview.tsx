import clsx from "clsx"
import Link from "next/link"
import { Suspense, lazy, memo, useCallback, useEffect, useMemo, useRef } from "react"
import { Transition } from "react-transition-group"

import type { SpaceAndCreator } from "@spatialsys/js/sapi/types"
import { TrackedComponentByMount, TrackedComponents, useTrackView } from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { ErrorBoundary } from "@spatialsys/react/util/error-boundary"
import { SpaceItemClickMetadata } from "@spatialsys/unity/bridge"
import { formatSpacePath } from "@spatialsys/url-utils"
import { logger } from "@spatialsys/web/logger"
import { sapiFeatureFlagsClient } from "@spatialsys/web/sapi"
import { Loader } from "@spatialsys/web/ui"

import { useMouseRelative } from "../../../../hooks/use-mouse-relative"
import { HorizontalScrollable } from "../../../horizontal-scrollable/horizontal-scrollable"
import { LinkOrButton } from "../../../link-or-button/link-or-button"
import { CollapsableText } from "../../../room/participants/participants-list/collapsable-text/collapsable-text"
import { Tag } from "../../../tag/tag"
import { SpaceNameAndCreator } from "../space-name-and-creator/space-name-and-creator"
import { ThumbnailOverlay } from "../thumbnail-overlay/thumbnail-overlay"
import { Thumbnail } from "../thumbnail/thumbnail"

import classes from "./hover-preview.module.scss"

const CubemapPreview = lazy(() =>
  import(
    /* webpackChunkName: "cubemap-preview" */ "@spatialsys/web/core/js/components/cubemap-preview/cubemap-preview"
  ).then((module) => ({
    default: module.CubemapPreview,
  }))
)

// The duration of time in ms a user has to hover over a thumbnail before we attempt to render it
const RENDER_CUBEMAP_PREVIEW_TIMEOUT = 500

type SpacesGridItemHoverPreviewProps = {
  overflowMenu: React.ReactNode
  isHovering: boolean
  spaceData: SpaceAndCreator
  openCreatorProfileInNewTab: boolean
  asButton: boolean
  onSelectSpace: (spaceData: SpaceAndCreator, metadata?: SpaceItemClickMetadata) => void
  isLoadingLoved: boolean
  handleLogin: () => void
  spaceListIndex: number
}

const LoadingSpinner = () => (
  <div className={classes.loaderContainer}>
    <Loader color="white" className={classes.loader} />
  </div>
)

const HoverPreviewCard = memo(function HoverPreviewCard({
  asButton,
  handleLogin,
  onSelectSpace,
  isLoadingLoved,
  mousePos,
  openCreatorProfileInNewTab,
  overflowMenu,
  spaceData,
  spaceListIndex,
}: SpacesGridItemHoverPreviewProps & Pick<React.ComponentProps<typeof CubemapPreview>, "mousePos">) {
  const { space } = spaceData
  const [thumbnailHovered, setThumbnailHovered] = useBoolean(true)
  const [spaceNameHovered, setSpaceNameHovered] = useBoolean(false)
  const [cubemapPreviewLoaded, setCubemapPreviewLoaded] = useBoolean(false)

  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)
  const isCubemapPreviewEnabled = featureFlagsQuery.data?.featureFlags.cubemap3dPreview
  const isSpaceInfoEnabled = featureFlagsQuery.data?.featureFlags.spaceItemHoverPreviewSpaceInfo
  const isDeetsEnabled = featureFlagsQuery.data?.featureFlags.spaceItemHoverPreviewDeets

  const spacePath = formatSpacePath(space.id, space.slug, space.shareID)
  const hasCubemap = Boolean(space.roomThumbnails.cubemapGetUrl)

  const trackView = useTrackView()

  const properties = useMemo(
    () => ({
      "Room ID": space.id,
      "Space List Index": spaceListIndex,
    }),
    [space.id, spaceListIndex]
  )

  const handleCubemapPreviewLoaded = useCallback(() => {
    setCubemapPreviewLoaded.setTrue()
    trackView(TrackedComponents.CubemapPreviewMesh, properties)
  }, [properties, setCubemapPreviewLoaded, trackView])

  const handlePreviewClick = useCallback(() => {
    if (cubemapPreviewLoaded && thumbnailHovered) {
      onSelectSpace(spaceData, { "On Cubemap Preview": true })
    } else {
      onSelectSpace(spaceData, { "On Space Thumbnail": true })
    }
  }, [cubemapPreviewLoaded, onSelectSpace, spaceData, thumbnailHovered])

  const handleNameClick = useCallback(() => {
    onSelectSpace(spaceData, { "On Space Name": true })
  }, [onSelectSpace, spaceData])

  return (
    <TrackedComponentByMount id={TrackedComponents.SpaceListItemHoverPreviewCard} properties={properties}>
      <LinkOrButton
        className={clsx(classes.thumbnailContainer, isSpaceInfoEnabled && classes.flatBottom)}
        asButton={asButton}
        linkHref={spacePath}
        onClick={handlePreviewClick}
        onMouseEnter={setThumbnailHovered.setTrue}
        onFocus={setThumbnailHovered.setTrue}
      >
        <Thumbnail thumbnailUrl={space.thumbnail} name={space.name} sharpCorners />

        {hasCubemap && isCubemapPreviewEnabled && (
          <ErrorBoundary errorComponent={null} componentDidCatch={logger.error}>
            <div className={classes.cubemapPreviewContainer}>
              <Suspense fallback={<LoadingSpinner />}>
                <TrackedComponentByMount id={TrackedComponents.CubemapPreview} properties={properties}>
                  <CubemapPreview
                    className={clsx(classes.cubemapPreview, cubemapPreviewLoaded && classes.withFade)}
                    src={space.roomThumbnails.cubemapGetUrl}
                    isHovered={thumbnailHovered}
                    onLoaded={handleCubemapPreviewLoaded}
                    mousePos={mousePos}
                  />
                </TrackedComponentByMount>
              </Suspense>
            </div>
          </ErrorBoundary>
        )}
      </LinkOrButton>
      <div className={classes.thumbnailOverlay}>
        <ThumbnailOverlay space={space} loadingLoved={isLoadingLoved} handleUnauthenticatedClick={handleLogin} />
      </div>
      <div
        className={classes.innerContainer}
        onMouseEnter={setThumbnailHovered.setFalse}
        onFocus={setThumbnailHovered.setFalse}
      >
        <div className={classes.thumbnailPlaceholder} />
        {isSpaceInfoEnabled && (
          <div className={classes.spaceInfo}>
            <SpaceNameAndCreator
              overflowMenu={overflowMenu}
              spaceHovered={thumbnailHovered || spaceNameHovered}
              setSpaceHovered={setSpaceNameHovered}
              openCreatorProfileInNewTab={openCreatorProfileInNewTab}
              asButton={asButton}
              spaceAndCreator={spaceData}
              onClick={handleNameClick}
            />
            {isDeetsEnabled && space.description && (
              <div className={classes.description}>
                <CollapsableText text={space.description} />
              </div>
            )}
            {isDeetsEnabled && space.tags?.length > 0 && (
              <HorizontalScrollable>
                <div className={classes.tags}>
                  {space.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={{
                        pathname: "/search",
                        query: {
                          q: `#${tag}`,
                        },
                      }}
                      className={classes.tagAnchor}
                    >
                      <Tag className={classes.tag} clickable>
                        {tag}
                      </Tag>
                    </Link>
                  ))}
                </div>
              </HorizontalScrollable>
            )}
          </div>
        )}
      </div>
    </TrackedComponentByMount>
  )
})

/**
 * Displays a preview of a space when the user hovers
 */
export const SpacesGridItemHoverPreview = memo(function SpacesGridItemHoverPreview(
  props: SpacesGridItemHoverPreviewProps
) {
  const { isHovering } = props
  const [isVisible, setIsVisible] = useBoolean(false)
  const transitionNodeRef = useRef(null)
  const finalSizeContainerRef = useRef(null)

  // If the user is hovering over item, show the preview after a short delay
  useEffect(() => {
    if (isHovering) {
      const timer = setTimeout(setIsVisible.setTrue, RENDER_CUBEMAP_PREVIEW_TIMEOUT)
      return () => clearTimeout(timer)
    }
  }, [isHovering, setIsVisible])

  const mousePos = useMouseRelative({ ref: finalSizeContainerRef, enabled: isHovering || isVisible })

  return (
    <div className={classes.container}>
      <div className={classes.finalSizeContainer} ref={finalSizeContainerRef}>
        <div className={clsx(classes.scaleInContainer, isVisible && classes.visible)}>
          <Transition nodeRef={transitionNodeRef} in={isVisible} timeout={250} mountOnEnter unmountOnExit>
            <div ref={transitionNodeRef} onMouseLeave={setIsVisible.setFalse}>
              <HoverPreviewCard {...props} mousePos={mousePos} />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  )
})
