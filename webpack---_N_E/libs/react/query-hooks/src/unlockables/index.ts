import { UseMutationOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { UserData } from "@spatialsys/js/sapi/clients/sapi"
import {
  MarkUnlockableReadRequest,
  RegisterUnlockableRequest,
  RegisterUnlockableResponse,
  SapiUsersClient,
} from "@spatialsys/js/sapi/clients/users"
import { UnlockableType } from "@spatialsys/js/sapi/types"

import { updateGetMeCache } from "../sapi/user"

export const GET_UNLOCKABLES_CONFIG_KEY = "getUnlockablesConfig"

type UnlockableRequirement = {
  id: string
  type: UnlockableType
  lockedItems: LockedItem[]
}

type LockedItem = {
  /** A list of locked items. You can have more than one item locked for a given cost */
  ids: string[]
  /** If the type is streak, cost is in "days" */
  cost: number
}

/**
 * The key is the ID of the unlockable requirement
 */
export type UnlockablesConfigResponse = Record<string, UnlockableRequirement>

export const useGetUnlockablesConfigQuery = (publicAssetBaseUrl: string) => {
  return useQuery(
    [GET_UNLOCKABLES_CONFIG_KEY],
    async () => {
      const res = await axios.get<UnlockablesConfigResponse>(
        `${publicAssetBaseUrl}/unlockables/unlockable_requirements.json`
      )
      return res.data
    },
    {
      // We set the cache time and stale time to infinity to never invalidate the cache(only fetch once)
      // because we expect the animations list to be updated very rarely
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  )
}

export const useRegisterUnlockableMutation = (
  sapiUsersClient: SapiUsersClient,
  options?: UseMutationOptions<RegisterUnlockableResponse, unknown, RegisterUnlockableRequest>
) => {
  const queryClient = useQueryClient()

  return useMutation(sapiUsersClient.unlockables.registerUnlockable, {
    onSuccess: async (response) => {
      const previousUserProfile = await updateGetMeCache(queryClient, (prev) => {
        return { ...prev, unlockables: response.unlockables }
      })
      return { previousUserProfile }
    },
    ...options,
  })
}

export const useMarkReadMutation = (
  sapiUsersClient: SapiUsersClient,
  options?: UseMutationOptions<void, unknown, MarkUnlockableReadRequest, { previousUserProfile: UserData | undefined }>
) => {
  const queryClient = useQueryClient()

  return useMutation(sapiUsersClient.unlockables.markRead, {
    onMutate: async ({ unlockableId }) => {
      const previousUserProfile = await updateGetMeCache(queryClient, (prev) => {
        const newUnlockables = { ...prev.unlockables }
        if (!newUnlockables?.[unlockableId]) {
          return prev
        }

        newUnlockables[unlockableId] = {
          ...newUnlockables[unlockableId],
          unlocks: newUnlockables[unlockableId].unlocks.map((unlockable) => ({
            ...unlockable,
            read: true,
          })),
        }

        return { ...prev, unlockables: newUnlockables }
      })

      return { previousUserProfile }
    },
    ...options,
  })
}
