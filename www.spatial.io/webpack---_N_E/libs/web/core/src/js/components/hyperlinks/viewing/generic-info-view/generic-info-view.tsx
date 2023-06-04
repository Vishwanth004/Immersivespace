import clsx from "clsx"
import { useCallback } from "react"

import {
  HyperlinkProperties,
  InteractionName,
  InteractionType,
  ObjectType,
  getUrlHost,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { HyperlinksInRoomConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/hyperlinks-confirm-modal/hyperlinks-in-room-confirm-modal"
import { Button, Heading, Loader } from "@spatialsys/web/ui"

import classes from "../view-info.module.scss"

interface GenericInfoViewProps {
  height?: number
  objectType: ObjectType
  objectId: number
}

export const GenericInfoView = (props: GenericInfoViewProps) => {
  const { height, objectType, objectId } = props

  const galleryInfo = useAppContext((context) =>
    AppStateSelectors.getGalleryInfo(context.state.unity.appState, objectId)
  )
  const hyperlinkState = useAppContext((context) =>
    AppStateSelectors.getObjectHyperlink(context.state.unity.appState, objectId)
  )

  const trackInteraction = useTrackInteraction()

  const [showHyperlinksConfirmModal, setShowHyperlinksConfirmModal] = useBoolean()

  const handleHyperlinkClick = useCallback(() => {
    setShowHyperlinksConfirmModal.setTrue()
    const host = getUrlHost(hyperlinkState?.linkHref)
    const hyperlinksProperties: HyperlinkProperties = {
      host,
      url: hyperlinkState?.linkHref,
      title: galleryInfo?.title,
      objectType,
      isPlaqueVisible: galleryInfo?.isVisible,
      creator: galleryInfo?.creator,
      description: galleryInfo?.description,
    }
    trackInteraction({ type: InteractionType.Click, name: InteractionName.HyperlinkClicked }, hyperlinksProperties)
  }, [
    galleryInfo?.creator,
    galleryInfo?.description,
    galleryInfo?.isVisible,
    galleryInfo?.title,
    hyperlinkState?.linkHref,
    objectType,
    setShowHyperlinksConfirmModal,
    trackInteraction,
  ])

  const minOneInfoFieldToDisplay =
    galleryInfo?.title || galleryInfo?.creator || galleryInfo?.description || hyperlinkState?.linkHref

  if (!minOneInfoFieldToDisplay) {
    return null
  }

  return (
    <div className={classes.container} style={{ height }}>
      <HyperlinksInRoomConfirmModal
        close={setShowHyperlinksConfirmModal.setFalse}
        isOpen={showHyperlinksConfirmModal}
        link={hyperlinkState?.linkHref}
        selectedObjectId={objectId}
      />
      {!height ? (
        <Loader />
      ) : (
        <>
          <div className={classes.infoSection}>
            <Heading size="h2" textAlign="center" className="line-clamp-3 pb-1">
              {galleryInfo.title}
            </Heading>
          </div>
          <p className={clsx(classes.infoSection, classes.nftDescription)}>{galleryInfo.description}</p>
          {galleryInfo.creator && (
            <div className={classes.infoSection}>
              <p className={classes.nftMinterAndOwner}>
                by <b>{galleryInfo.creator}</b>
              </p>
            </div>
          )}
          {hyperlinkState?.linkHref && (
            <Button className="mx-auto mt-2 w-4/5" size="lg" onClick={handleHyperlinkClick}>
              {hyperlinkState.linkLabel || "Visit"}
            </Button>
          )}
        </>
      )}
    </div>
  )
}
