import { useCallback, useMemo } from "react"

import {
  HyperlinkProperties,
  InteractionName,
  InteractionType,
  ObjectType,
  getUrlHost,
  useTrackInteraction,
} from "@spatialsys/react/analytics"

export function useTrackConfirmHyperlink(link: string, objectType: ObjectType) {
  const trackInteraction = useTrackInteraction()
  const host = getUrlHost(link)

  const hyperlinkProperties: HyperlinkProperties = useMemo(
    () => ({
      host,
      url: link,
      objectType,
    }),
    [host, link, objectType]
  )

  const trackConfirmHyperlink = useCallback(
    (isConfirm: boolean) => {
      const interactionName = isConfirm
        ? InteractionName.HyperlinkLeaveSpatialConfirm
        : InteractionName.HyperlinkLeaveSpatialCancel
      trackInteraction({ type: InteractionType.Click, name: interactionName }, hyperlinkProperties)
    },
    [hyperlinkProperties, trackInteraction]
  )
  return trackConfirmHyperlink
}
