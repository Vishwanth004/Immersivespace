import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  CMSPreviewFile,
  CMSType,
  GetContentArgs,
  GetContentResponse,
  SapiClient,
} from "@spatialsys/js/sapi/clients/sapi"
import { GetFileResponse } from "@spatialsys/js/sapi/types"
import { TemplateState as Template } from "@spatialsys/unity/app-state"

const GET_FILE_QUERY_KEY = "GET_FILE"

export const useGetFileQuery = (
  sapiClient: SapiClient,
  fileId: string,
  options?: Omit<UseQueryOptions<GetFileResponse, unknown, GetFileResponse, string[]>, "queryKey" | "queryFn">
) => {
  return useQuery([GET_FILE_QUERY_KEY, fileId], () => sapiClient.content.getFile(fileId), {
    enabled: Boolean(fileId),
    ...options,
  })
}
const CACHE_AND_STALE_TIME = 15 * 1000 // 15 seconds
const CONTENT_MENU_QUERY_KEY = "GET_CONTENT_MENU"
type ContentMenuQueryKey = [string, GetContentArgs]

export const useGetContentMenuQuery = (
  sapiClient: SapiClient,
  args: GetContentArgs,
  options?: UseInfiniteQueryOptions<
    GetContentResponse,
    unknown,
    GetContentResponse,
    GetContentResponse,
    ContentMenuQueryKey
  >
) =>
  useInfiniteQuery(
    [CONTENT_MENU_QUERY_KEY, args],
    ({ pageParam }) => sapiClient.content.getContentMenu({ offset: pageParam, ...args }),
    {
      getNextPageParam: (prevPage) => (prevPage?.nextCursor < 0 ? undefined : prevPage?.nextCursor),
      cacheTime: CACHE_AND_STALE_TIME,
      staleTime: CACHE_AND_STALE_TIME,
      ...options,
    }
  )

export const useInvalidateRecentFiles = () => {
  const queryClient = useQueryClient()
  const contentKey: ContentMenuQueryKey = [CONTENT_MENU_QUERY_KEY, { cmsType: "recent" }]
  return () => queryClient.invalidateQueries(contentKey)
}

/** Hides content menu file by setting its visibility to false */
export function useHideContentItemMutation(
  sapiClient: SapiClient,
  cmsType: CMSType,
  chain?: string,
  options?: Omit<UseMutationOptions<void, unknown, CMSPreviewFile, ContentMenuQueryKey>, "mutationFn">
) {
  const queryClient = useQueryClient()
  // NOTE: above query key also uses `search` as part of the key, hence need to partially match this key below

  return useMutation({
    mutationFn: (file: CMSPreviewFile) =>
      sapiClient.content.toggleContentItemVisibility({ idList: [{ id: file.id, hidden: true }] }),
    onSettled: () => {
      // invalidate all queries that partially match that key
      void queryClient.invalidateQueries([CONTENT_MENU_QUERY_KEY, { cmsType, chain }])
    },
    ...options,
  })
}

const GET_TEMPLATES_QUERY_KEY = ["GET_ROOM_TEMPLATES"]

/** Fetch the list of templates. */
export const useTemplatesQuery = (
  sapiClient: SapiClient,
  options?: UseQueryOptions<Template[], unknown, Template[], string[]>
) => {
  return useQuery(GET_TEMPLATES_QUERY_KEY, sapiClient.content.getTemplates, options)
}
