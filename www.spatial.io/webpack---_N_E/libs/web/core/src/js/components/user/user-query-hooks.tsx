import { UseQueryResult } from "@tanstack/react-query"
import { useMemo } from "react"

import {
  UserData,
  getShouldShowMetamaskTutorial,
  getShouldShowSettingsTutorial,
} from "@spatialsys/js/sapi/clients/sapi"
import { useMeQuery } from "@spatialsys/react/query-hooks/sapi/user"
import { useAuthState } from "@spatialsys/web/app-context"
import { sapiClient } from "@spatialsys/web/sapi"

type UserQuery = { user: UserData } & Omit<UseQueryResult<UserData, unknown>, "data">

/**
 * A convenience wrapper around `useMeQuery` to get the user profile. It
 * renames the `data` field to `user` and explicitly types as `UserData` rather
 * than `UserData | undefined`. There must be an ancestor `RequiresUser`
 * somewhere in the component tree for this type guarantee to hold true.
 */
export function useUser(): UserQuery {
  const { isAuthenticated } = useAuthState()
  const { data, ...rest } = useMeQuery(sapiClient, isAuthenticated)
  return { user: data, ...rest }
}

export function useShouldShowAcceptUpdatedTermsSept2022(): boolean {
  const { user } = useUser()
  const showAcceptUpdatedTerms = useMemo(() => {
    return user.acceptedSept2022PrivacyPolicy == null || user.acceptedSept2022StandardTerms == null
  }, [user.acceptedSept2022PrivacyPolicy, user.acceptedSept2022StandardTerms])
  return showAcceptUpdatedTerms
}

export function useShouldShowMetamaskTutorial(): boolean {
  const { user } = useUser()
  const showMetamaskTutorial = useMemo(() => {
    return user.acknowledgedInAppNotificationKeys
      ? getShouldShowMetamaskTutorial(user.acknowledgedInAppNotificationKeys)
      : false
  }, [user.acknowledgedInAppNotificationKeys])
  return showMetamaskTutorial
}

export function useShouldShowSettingsTutorial(): boolean {
  const { user } = useUser()
  const shouldShowSettingsTutorial = useMemo(() => {
    return user.acknowledgedInAppNotificationKeys
      ? getShouldShowSettingsTutorial(user.acknowledgedInAppNotificationKeys)
      : false
  }, [user.acknowledgedInAppNotificationKeys])
  return shouldShowSettingsTutorial
}

export function useShouldShowCollectibleEnvironmentsUpdated(updateKey: string): boolean {
  const { user } = useUser()
  const showCollectibeEnvironmentsUpdated = useMemo(() => {
    return user.acknowledgedInAppNotificationKeys ? !user.acknowledgedInAppNotificationKeys.includes(updateKey) : false
  }, [user.acknowledgedInAppNotificationKeys, updateKey])
  return showCollectibeEnvironmentsUpdated
}
