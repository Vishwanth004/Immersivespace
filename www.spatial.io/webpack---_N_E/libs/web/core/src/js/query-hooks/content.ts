/**
 * All query hooks in this file have some dependency on `web/core`, preventing them
 * from being moved into `react/query-hooks`
 */
import { UseMutationOptions, UseQueryOptions, useMutation, useQueries, useQuery } from "@tanstack/react-query"

import { ContentObject } from "@spatialsys/unity/bridge"
import { addFiles } from "@spatialsys/web/core/js/components/content-mediator/content-mediator"
import { DownloadUrls, getDownloadUrlsForAsset } from "@spatialsys/web/core/js/sapi/content-actions"

const GET_DOWNLOAD_URL_FOR_ASSET_QUERY_KEY = "downloadUrlForAsset"

export const useGetDownloadUrlQuery = (url: string, options?: UseQueryOptions<DownloadUrls>) => {
  return useQuery([GET_DOWNLOAD_URL_FOR_ASSET_QUERY_KEY, url], () => getDownloadUrlsForAsset(url), {
    staleTime: Infinity,
    ...options,
  })
}

interface UploadFileRequest {
  files: File[]
  fileInputRef: HTMLInputElement | null
  roomId: string
  unlimitedFileSize: boolean
}

export const useUploadFilesMutation = (
  options?: UseMutationOptions<PromiseSettledResult<ContentObject>[], unknown, UploadFileRequest>
) => {
  return useMutation(
    (args: UploadFileRequest) => addFiles(args.files, args.fileInputRef, args.roomId, args.unlimitedFileSize),
    options
  )
}

export const useGetDownloadUrlQueries = <T>(
  items: { [key: number]: T & { url: string } },
  options?: T & { id: string }
) => {
  return useQueries({
    queries: items
      ? Object.entries(items).map(([id, value]) => {
          return {
            // For some reason, this causes a duplicate key error?
            // queryKey: [GET_DOWNLOAD_URL_FOR_ASSET_QUERY_KEY, value.url],
            // Thus, we must include `id` which may result in slightly more network calls
            queryKey: [GET_DOWNLOAD_URL_FOR_ASSET_QUERY_KEY, id, value.url],
            queryFn: async () => {
              const downloadUrls = await getDownloadUrlsForAsset(value.url)
              return { ...value, downloadUrls, id }
            },
            enabled: Boolean(items),
            staleTime: Infinity,
            ...options,
          }
        })
      : [],
  })
}
