import clsx from "classnames"
import { SyntheticEvent, memo, useCallback, useEffect, useState } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ObjectType, TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { GenericInfoView } from "@spatialsys/web/core/js/components/hyperlinks/viewing/generic-info-view/generic-info-view"
import { NftInfoView } from "@spatialsys/web/core/js/components/hyperlinks/viewing/nft-info-view/nft-info-view"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { useContentMetadata } from "@spatialsys/web/core/js/hooks/use-content-metadata"
import { useWindowSize } from "@spatialsys/web/ui/hooks"

import objectLightboxVariables from "../../hyperlinks/viewing/variables.module.scss"
import classes from "./object-lightbox.module.scss"

const NFT_INFO_WIDTH = parseInt(objectLightboxVariables.nftInfoBoxWidth)

interface Dimensions {
  width?: number
  height?: number
}

interface ObjectLightboxProps {
  onClose: () => void
}

const ObjectLightbox = memo(function ObjectLightbox(props: ObjectLightboxProps) {
  const { onClose } = props

  const windowSize = useWindowSize()
  const { hyperlinksV2 } = useUser().user.treatmentsParsed

  const [intrinsicDimensions, setIntrinsicDimensions] = useState<Dimensions>({}) // The intrinsic dimensions of the 2D media
  const [mediaDimensions, setMediaDimensions] = useState<Dimensions>({}) // The dimensions of the HTML, maximized to fill the available screen space

  const objectId = useAppContext((context) => context.state.unity.appState.roomSession.lightBoxTargetObjectID)
  const isObjectNft = useAppContext((context) => AppStateSelectors.isNftObject(context.state.unity.appState, objectId))
  const isObjectImage = useAppContext((context) => AppStateSelectors.isImage(context.state.unity.appState, objectId))
  const isObjectVideo = useAppContext((context) => AppStateSelectors.isVideo(context.state.unity.appState, objectId))
  const is3dObject = useAppContext((context) => AppStateSelectors.isModelObject(context.state.unity.appState, objectId))
  const objectUrl = useAppContext((context) => AppStateSelectors.getObjectURL(context.state.unity.appState, objectId))
  const galleryInfo = useAppContext((context) =>
    AppStateSelectors.getGalleryInfo(context.state.unity.appState, objectId)
  )
  const hyperlinkState = useAppContext((context) =>
    AppStateSelectors.getObjectHyperlink(context.state.unity.appState, objectId)
  )

  const minOneInfoFieldToDisplay =
    galleryInfo?.title || galleryInfo?.creator || galleryInfo?.description || hyperlinkState?.linkHref

  const { isLoading: isLoadingFile, contentMetaData: fileData } = useContentMetadata(objectId)

  /**
   * Calculates the width and height of the media, maximizing it to be as large as possible
   */
  useEffect(() => {
    if (windowSize.width && windowSize.height && intrinsicDimensions.width && intrinsicDimensions.height) {
      const maxHeight = windowSize.height * 0.8
      let maxWidth = windowSize.width * 0.8 // If the object is NFT, max width is reduced by a fixed `NFT_INFO_WIDTH`
      if (isObjectNft || minOneInfoFieldToDisplay) {
        maxWidth = maxWidth - NFT_INFO_WIDTH
      }

      const ratio = Math.min(maxWidth / intrinsicDimensions.width, maxHeight / intrinsicDimensions.height)
      setMediaDimensions({ width: intrinsicDimensions.width * ratio, height: intrinsicDimensions.height * ratio })
    }
  }, [isObjectNft, intrinsicDimensions.height, intrinsicDimensions.width, windowSize.height, windowSize.width, minOneInfoFieldToDisplay])

  /** When the image is loaded, save its intrinsic dimensions    */
  const onImageLoad = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    setIntrinsicDimensions({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    })
  }, [])

  /** When the video metadata is loaded, save its intrinsic dimensions    */
  const onVideoLoad = useCallback((event: SyntheticEvent<HTMLVideoElement, Event>) => {
    setIntrinsicDimensions({
      width: event.currentTarget.videoWidth,
      height: event.currentTarget.videoHeight,
    })
  }, [])

  /** Render function for the 2D media */
  const renderMedia = useCallback(() => {
    if (isObjectImage) {
      return (
        <img
          src={objectUrl}
          alt={String(objectId)}
          className={classes.media}
          onLoad={onImageLoad}
          style={{
            width: mediaDimensions.width,
            height: mediaDimensions.height,
            opacity: mediaDimensions.width ? 1 : 0,
          }}
          width={mediaDimensions.width}
          height={mediaDimensions.height}
          draggable={false}
        />
      )
    } else if (isObjectVideo) {
      return (
        <video
          autoPlay
          controls
          className={classes.media}
          loop
          style={{
            width: mediaDimensions.width,
            height: mediaDimensions.height,
            opacity: mediaDimensions.width ? 1 : 0,
          }}
          width={mediaDimensions.width}
          height={mediaDimensions.height}
          onLoadedMetadata={onVideoLoad}
          controlsList="nodownload"
        >
          <source src={objectUrl} />
        </video>
      )
    }

    return null
  }, [isObjectImage, isObjectVideo, objectUrl, objectId, onImageLoad, mediaDimensions, onVideoLoad])

  let objectType: ObjectType | null = null
  if (isObjectImage) {
    objectType = ObjectType.Image
  } else if (isObjectVideo) {
    objectType = ObjectType.Video
  } else if (is3dObject) {
    objectType = ObjectType.Object
  }

  return (
    <TrackedComponent
      id={TrackedComponents.FlatMediaLightbox}
      properties={{ "Media Type": isObjectImage ? "Image" : "Video", isNFTObject: isObjectNft }}
    >
      <div className={classes.container}>
        <div className={clsx(classes.wrapper, { [classes.loadingMedia]: !mediaDimensions.width })}>
          {renderMedia()}
          {(() => {
            if (!mediaDimensions.width) {
              return null
            }
            if (!hyperlinksV2 && isObjectNft && fileData) {
              return <NftInfoView isLoading={isLoadingFile} height={mediaDimensions.height} fileData={fileData} />
            }
            if (!hyperlinksV2 && minOneInfoFieldToDisplay) {
              return <GenericInfoView height={mediaDimensions.height} objectType={objectType} objectId={objectId} />
            }
            return null
          })()}
        </div>
        <button type="button" onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </button>
      </div>
    </TrackedComponent>
  )
})

export default ObjectLightbox
