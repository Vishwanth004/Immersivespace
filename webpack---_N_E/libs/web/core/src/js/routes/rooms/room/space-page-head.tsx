import Head from "next/head"
import { memo, useMemo } from "react"

import { useGetSpacePreviewQuery } from "@spatialsys/react/query-hooks/spaces"
import { formatSpacePath } from "@spatialsys/url-utils"
import {
  CanonicalUrlTag,
  DescriptionTags,
  NoRobotsTag,
  OgImageTag,
  TitleTags,
  TwitterCardTags,
} from "@spatialsys/web/core/js/components/seo/seo"
import { sapiSpaceClient } from "@spatialsys/web/sapi"

const makeDescription = (description: string, tags?: string[]) => {
  if (!tags?.length) {
    return description
  }
  return `${description} ${tags.map((tag) => `#${tag}`).join(" ")}`
}

type SpacePageHeadProps = { spaceId: string }

/**
 * Renders the head tags for the space page (title, description, OG tags, etc.)
 * - The title of the page is the name of the space
 * - The description of the page is the description + tags of the space
 * - The OG image is the thumbnail of the space. If a custom thumbnail is set, the custom thumbnail is used
 * If the space is private, or no space is found, the default OG tags are rendered
 */
export const SpacePageHead = memo(function SpacePageHead(props: SpacePageHeadProps) {
  const { spaceId } = props
  const getSpacePreviewQuery = useGetSpacePreviewQuery(sapiSpaceClient, spaceId, {
    /** Disable retrying */
    retry: false,
  })
  const previewData = getSpacePreviewQuery.data

  const { pathname } = useMemo(() => {
    const pathname = previewData ? formatSpacePath(spaceId, previewData.space.slug) : `/s/${spaceId}`

    return { pathname }
  }, [previewData, spaceId])

  return (
    <Head>
      {previewData?.space.name && TitleTags(previewData.space.name)}
      {previewData?.space.thumbnail && OgImageTag(previewData.space.thumbnail)}
      {previewData?.space.description &&
        DescriptionTags(makeDescription(previewData.space.description, previewData.space.tags))}
      {TwitterCardTags("summary_large_image")}
      {CanonicalUrlTag(pathname)}
      {/* Only let search engines crawl if the space is published. */}
      {!previewData?.space.published && NoRobotsTag()}
    </Head>
  )
})
