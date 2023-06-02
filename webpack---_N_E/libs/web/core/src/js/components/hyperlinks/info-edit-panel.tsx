import { memo } from "react"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"
import { AddContentHyperlink } from "@spatialsys/web/core/js/components/add-content-hyperlink/add-content-hyperlink"
import { NftInfoPanel } from "@spatialsys/web/core/js/components/nft-info-panel/nft-info-panel"

interface InfoEditPanelProps {
  selectedObjectId: number
  close3DLightbox: () => void
}

export const InfoEditPanel = memo(function InfoEditPanel(props: InfoEditPanelProps) {
  const { close3DLightbox, selectedObjectId } = props

  const { isNft } = useAppContext((context) =>
    AppStateSelectors.getSelectedObjectButtonState(context.state.unity.appState)
  )

  if (!selectedObjectId) {
    return null
  }

  return isNft ? (
    <NftInfoPanel selectedObjectId={selectedObjectId} closePanel={close3DLightbox} />
  ) : (
    <AddContentHyperlink closePanel={close3DLightbox} selectedObjectId={selectedObjectId} />
  )
})
