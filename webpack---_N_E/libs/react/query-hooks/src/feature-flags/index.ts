import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { GetFeatureFlagsResponse, SapiFeatureFlagsClient } from "@spatialsys/js/sapi/clients/feature-flags"

export const GET_FEATURE_FLAGS_QUERY_KEY = ["getFeatureFlags"]

/**
 * Check if an account already exists for a given email address.
 * Results are never cached, so that we always fetch up-to-date data
 */
export const useGetFeatureFlagsQuery = (
  sapiFeatureFlagsClient: SapiFeatureFlagsClient,
  options?: UseQueryOptions<GetFeatureFlagsResponse, unknown, GetFeatureFlagsResponse, string[]>
) => {
  return useQuery(GET_FEATURE_FLAGS_QUERY_KEY, () => sapiFeatureFlagsClient.getFeatureFlags(), {
    /** Never mark the flags as stale. This result is only invalidated manually! */
    cacheTime: Infinity,
    staleTime: Infinity,
    ...options,
  })
}
