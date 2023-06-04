import { memo, useCallback } from "react"

import { ReactComponent as OutlinedHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite-border.svg"
import { ReactComponent as LockIcon } from "@spatialsys/assets/icons/material-filled/lock.svg"
import { ReactComponent as VisitIcon } from "@spatialsys/assets/icons/material-filled/visibility.svg"
import { abbreviateNumber } from "@spatialsys/js/util/format-numbers"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import {
  InteractionName,
  InteractionType,
  TrackedComponents,
  useTrackInteraction,
  withTrackedComponent,
} from "@spatialsys/react/analytics"
import { useGetSpacePreviewQuery } from "@spatialsys/react/query-hooks/spaces"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import { HideMobileBanner } from "@spatialsys/web/core/js/components/mobile-banner/mobile-banner"
import { OverlayPanel } from "@spatialsys/web/core/js/components/mobile-web-interstitials/overlay-panel/overlay-panel"
import { Navbar } from "@spatialsys/web/core/js/components/navbar/navbar"
import { LiveBadge } from "@spatialsys/web/core/js/components/space-badges/live-badge"
import {
  ThumbnailImageWithMask,
  ThumbnailImageWithMaskWithData,
} from "@spatialsys/web/core/js/components/thumbnail-image-with-mask/thumbnail-image-with-mask"
import { sapiSpaceClient } from "@spatialsys/web/sapi"
import { Heading } from "@spatialsys/web/ui"

import { CollapsableText } from "../room/participants/participants-list/collapsable-text/collapsable-text"
import PrivateSpaceAbstractThumbnail from "./private-space-abstract.jpg"

import classes from "./join-space-mobile-interstitial.module.scss"

const panelContent = {
  title: "To explore this space, download our mobile app",
  description: "We'll place you right in the space!",
}

type JoinSpaceMobileInterstitialProps = {
  spaceId: string
}

/**
 * Tells user that in-space exp is not supported on mobile. Shows a CTA to open/download the app.
 */
export const JoinSpaceMobileInterstitial = withTrackedComponent(
  memo(function JoinSpaceInterstitial({ spaceId }: JoinSpaceMobileInterstitialProps) {
    const { data: spacePreviewData, isError: getSpacePreviewIsError } = useGetSpacePreviewQuery(
      sapiSpaceClient,
      spaceId,
      { retry: false }
    )
    const trackInteraction = useTrackInteraction()

    const onJoin = useCallback(() => {
      trackInteraction({ name: InteractionName.OpenSpaceInApp, type: InteractionType.Click })
    }, [trackInteraction])
    return (
      <>
        <Navbar />
        <HideMobileBanner />
        <div className={classes.mainInfo}>
          {(() => {
            // If private space or space doesn't exist, show generic thumbnail
            if (getSpacePreviewIsError) {
              return (
                <>
                  <ThumbnailImageWithMask
                    spaceName=""
                    thumbnailUrl={PrivateSpaceAbstractThumbnail.src}
                    classNameImage={classes.image}
                  />
                  <LockIcon className={classes.lockIcon} />
                </>
              )
            }

            if (spacePreviewData) {
              return (
                <>
                  <ThumbnailImageWithMaskWithData
                    classNameContainer={classes.imageContainer}
                    classNameImage={classes.image}
                    name={spacePreviewData.space.name}
                    thumbnail={spacePreviewData.space.thumbnail}
                  />
                  <div className={classes.spaceDataContainer}>
                    <h1 className="line-clamp-2 text-4xl font-black mobile:text-5xl ">{spacePreviewData.space.name}</h1>
                    <div className={classes.creatorInfo}>
                      <AvatarIcon
                        altText={spacePreviewData.creator.displayName}
                        className={classes.avatar}
                        profilePicUrl={spacePreviewData.creator.avatarImageURL}
                        playerColor={getPlayerColor(spacePreviewData.creator.appearanceCustomization.profileColor)}
                      />
                      <Heading as="h3" size="h4">
                        {spacePreviewData.creator.displayName}
                      </Heading>
                    </div>
                    <div className={classes.metadataContainer}>
                      <LiveBadge
                        alwaysRender
                        activeUserCount={spacePreviewData.space.activeUserCount}
                        isLive={spacePreviewData.space.live}
                      />
                      <div className={classes.joinLikesContainer}>
                        <VisitIcon className="font-size-inherit" />
                        <span>
                          {spacePreviewData.space.joinCount === 0
                            ? "-"
                            : abbreviateNumber(spacePreviewData.space.joinCount, 1)}
                        </span>
                      </div>
                      <div className={classes.joinLikesContainer}>
                        <OutlinedHeartIcon className="font-size-inherit" />
                        <span>{abbreviateNumber(spacePreviewData.space.likeCount, 1)}</span>
                      </div>
                    </div>
                    {spacePreviewData.space.description && (
                      <div className={classes.descriptionContainer}>
                        <CollapsableText
                          text={spacePreviewData.space.description}
                          collapsedLines={4}
                          TextComponent={({ children }) => <h2 className={classes.description}>{children}</h2>}
                        />
                      </div>
                    )}
                  </div>
                </>
              )
            }
          })()}
        </div>

        <OverlayPanel onOpenInApp={onJoin} {...panelContent} />
      </>
    )
  }),
  { id: TrackedComponents.MobileWebSpaceInterstitial, className: classes.container, as: "div" }
)
