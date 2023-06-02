import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { SapiSpaceClient } from "@spatialsys/js/sapi/clients/spaces"
import { GetMeetingResponse } from "@spatialsys/js/sapi/types"

export const GET_MEETING_ID_QUERY_KEY = "getMeetingId"

export const useGetMeetingQuery = (
  sapiSpaceClient: SapiSpaceClient,
  roomId: string,
  options?: UseQueryOptions<GetMeetingResponse, unknown, GetMeetingResponse, string[]>
) => {
  return useQuery(makeMeetingQueryConfig(sapiSpaceClient, roomId, options))
}

export const makeMeetingQueryConfig = (
  sapiSpaceClient: SapiSpaceClient,
  roomId: string,
  options?: UseQueryOptions<GetMeetingResponse, unknown, GetMeetingResponse, string[]>
) => ({
  queryKey: [GET_MEETING_ID_QUERY_KEY, roomId],
  queryFn: () => sapiSpaceClient.space.getMeeting(roomId),
  // It's important that we never cache this because the correct instance to join depends on
  // exactly how many users are in each instance, which can change at any point
  cacheTime: 0,
  staleTime: 0,
  ...options,
})
