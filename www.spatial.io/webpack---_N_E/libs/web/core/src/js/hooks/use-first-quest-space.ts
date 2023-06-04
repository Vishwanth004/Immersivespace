import { useMemo } from "react"

import { useGetFeatureFlagsQuery } from "@spatialsys/react/query-hooks/feature-flags"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { getFeatureFlagSpace } from "@spatialsys/url-utils"
import { useAppContext } from "@spatialsys/web/app-context"
import { sapiFeatureFlagsClient } from "@spatialsys/web/sapi"

type FirstQuestSpace = ReturnType<typeof getFeatureFlagSpace> & {
  isCurrent: boolean
}

export const useFirstQuestSpace = (): FirstQuestSpace | undefined => {
  const featureFlagsQuery = useGetFeatureFlagsQuery(sapiFeatureFlagsClient)
  const firstQuestFeatureFlag = featureFlagsQuery.data?.featureFlags.firstQuestSpacePath
  const spaceId = useAppContext((context) => AppStateSelectors.getCurrentRoomId(context.state.unity.appState))
  return useMemo(() => {
    const firstQuestSpace = getFeatureFlagSpace(firstQuestFeatureFlag)
    return (
      firstQuestSpace && {
        ...firstQuestSpace,
        isCurrent: spaceId === firstQuestSpace.id,
      }
    )
  }, [firstQuestFeatureFlag, spaceId])
}
