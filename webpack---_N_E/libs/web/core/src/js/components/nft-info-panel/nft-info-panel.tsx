import { useCallback, useMemo } from "react"

import { SaleType } from "@spatialsys/js/sapi/types"
import { useGetFileQuery } from "@spatialsys/react/query-hooks/sapi/content"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { NFTPriceView } from "@spatialsys/web/core/js/components/nft-price-view/nft-price-view"
import { RowWithToggle } from "@spatialsys/web/core/js/components/row-with-toggle/row-with-toggle"
import { Button, Heading, Loader } from "@spatialsys/web/ui"

type NftInfoPanelProps = { selectedObjectId: number; closePanel: () => void }

export function NftInfoPanel(props: NftInfoPanelProps) {
  const { closePanel, selectedObjectId } = props

  const isObjectNft = useAppContext((context) =>
    AppStateSelectors.isNftObject(context.state.unity.appState, selectedObjectId)
  )
  const isObjectImage = useAppContext((context) =>
    AppStateSelectors.isImage(context.state.unity.appState, selectedObjectId)
  )
  const isObjectVideo = useAppContext((context) =>
    AppStateSelectors.isVideo(context.state.unity.appState, selectedObjectId)
  )
  const images = useAppContext((context) => context.state.unity.appState.roomSession.sharedState.scene.images)
  const videos = useAppContext((context) => context.state.unity.appState.roomSession.sharedState.scene.videoPlayers)
  const sapiClient = useAppContext((context) => context.state.sapi.client)

  /** Gets the fileId for the object if it's an NFT */
  const nftFileId = useMemo(() => {
    if (!isObjectNft) {
      return null
    }

    if (isObjectImage) {
      return images[selectedObjectId]?.url.split("//")[1]
    } else if (isObjectVideo) {
      return videos[selectedObjectId]?.url.split("//")[1]
    }

    return null
  }, [images, isObjectImage, isObjectNft, isObjectVideo, selectedObjectId, videos])

  const { isInitialLoading, data: fileData } = useGetFileQuery(sapiClient, nftFileId, {
    enabled: isObjectNft && Boolean(nftFileId),
  })

  const isPlaqueDisplayed = useAppContext((context) =>
    AppStateSelectors.isGalleryInfoDisplayed(context.state.unity.appState, selectedObjectId)
  )

  const { nftPrice } = fileData?.nftMetadata ?? {}
  const toggleNftPlaque = useCallback(
    () => UnityMessages.setGalleryInfoVisibility(selectedObjectId, !isPlaqueDisplayed),
    [isPlaqueDisplayed, selectedObjectId]
  )

  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      {isInitialLoading ? (
        <Loader />
      ) : (
        <>
          <Heading size="h2" textAlign="center" className="line-clamp-3 pb-1">
            {fileData.file.name}
          </Heading>
          {nftPrice && nftPrice.saleType !== SaleType.NOT_LISTED_FOR_SALE && <NFTPriceView nftPrice={nftPrice} />}
          <p className="shrink overflow-auto text-sm">{fileData.nftMetadata?.description}</p>
          <div>
            {fileData.nftMetadata?.creator && (
              <p className="line-clamp-1 text-sm text-black">
                Minted by <b>{fileData.nftMetadata.creator}</b>
              </p>
            )}
            {fileData.nftMetadata?.owner && (
              <p className="line-clamp-1 text-sm text-black">
                Owned by <b>{fileData.nftMetadata.owner}</b>
              </p>
            )}
            <div className="mt-4">
              <RowWithToggle
                label="Show Info Panel"
                onChange={toggleNftPlaque}
                checked={isPlaqueDisplayed}
                showBorder
              />
            </div>
          </div>

          <Button size="lg" className="self-center" onClick={closePanel}>
            Done
          </Button>
        </>
      )}
    </div>
  )
}
