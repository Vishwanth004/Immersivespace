import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { SapiSpaceClient } from "@spatialsys/js/sapi/clients/spaces"
import {
  GetRecommendedSpacesRequest,
  GetRecommendedSpacesResponse,
} from "@spatialsys/js/sapi/clients/spaces/endpoints/recommended"

export const GET_RECOMMENDED_SPACES_QUERY_KEY = "getRecommendedSpaces"
const DEFAULT_RECOMMENDED_SPACES_COUNT = 25

export const useGetRecommendedSpacesQuery = (
  sapiSpaceClient: SapiSpaceClient,
  args: Partial<GetRecommendedSpacesRequest>,
  options?: UseQueryOptions<GetRecommendedSpacesResponse, unknown>
) => {
  const argsWithDefaults = { count: DEFAULT_RECOMMENDED_SPACES_COUNT, ...args }
  return useQuery({
    queryKey: [GET_RECOMMENDED_SPACES_QUERY_KEY, argsWithDefaults.count],
    queryFn: () => sapiSpaceClient.recommended.getRecommendedSpaces(argsWithDefaults),
    ...options,
  })
}
