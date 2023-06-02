import { memo } from "react"

import { useGetRecommendedSpacesQuery } from "@spatialsys/react/query-hooks/spaces/recommended"
import { sapiSpaceClient } from "@spatialsys/web/sapi"

import { ExploreSpacesOnLeave } from "./explore-spaces-on-leave"

interface ConfirmLeaveRoomModalProps {
  isOpen: boolean
  name: string
  onClose: () => void
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmLeaveRoomModal = memo(function ConfirmLeaveRoomModal(props: ConfirmLeaveRoomModalProps) {
  // Prefetch the list of recommended spaces.
  useGetRecommendedSpacesQuery(sapiSpaceClient, {}, { retry: false })

  return <ExploreSpacesOnLeave {...props} />
})
