import clsx from "clsx"
import { useCallback } from "react"

import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { ContentMetaDataState, NFTContentMetaDataState_PriceDataState_SaleType } from "@spatialsys/unity/app-state"
import { NFTPriceView } from "@spatialsys/web/core/js/components/nft-price-view/nft-price-view"
import { Button, Heading, Loader } from "@spatialsys/web/ui"

import classes from "../view-info.module.scss"

interface NftInfoViewProps {
  isLoading: boolean
  height?: number
  fileData: ContentMetaDataState
}

export const NftInfoView = (props: NftInfoViewProps) => {
  const { height, isLoading, fileData } = props

  const { priceData } = fileData?.nft ?? {}
  const externalWebsiteName = fileData?.nft?.marketplace ?? "OpenSea"

  const trackInteraction = useTrackInteraction()
  const handleNftLinkClickTracking = useCallback(() => {
    trackInteraction(
      { type: InteractionType.Click, name: InteractionName.NftLinkClicked },
      { externalWebsiteName, nftMetadata: fileData?.nft }
    )
  }, [externalWebsiteName, fileData?.nft, trackInteraction])

  return (
    <div className={classes.container} style={{ height }}>
      {isLoading || !height ? (
        <Loader />
      ) : (
        <>
          <div className={classes.infoSection}>
            <Heading size="h3" textAlign="center" className="line-clamp-3 pb-1">
              {fileData.name}
            </Heading>
          </div>
          {priceData && priceData.saleType !== NFTContentMetaDataState_PriceDataState_SaleType.NotListedForSale && (
            <div className={classes.infoSection}>
              <NFTPriceView nftPrice={priceData} />
            </div>
          )}
          <p className={clsx(classes.infoSection, classes.nftDescription)}>{fileData.nft?.description}</p>
          <div className={classes.infoSection}>
            {fileData.nft?.creatorID && (
              <p className={classes.nftMinterAndOwner}>
                Minted by <b>{fileData.nft?.creatorID}</b>
              </p>
            )}
            {fileData.nft?.ownerID && (
              <p className={classes.nftMinterAndOwner}>
                Owned by <b>{fileData.nft?.ownerID}</b>
              </p>
            )}
          </div>
          <Button
            as="a"
            href={fileData.nft?.externalLink}
            target="_blank"
            rel="noreferrer"
            onClick={handleNftLinkClickTracking}
            size="xl"
            className="mx-auto mt-2 w-4/5"
            noShadow
          >
            View On {externalWebsiteName}
          </Button>
        </>
      )}
    </div>
  )
}
