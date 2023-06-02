import Config from "@spatialsys/web/config"

/**
 * The keys/names/types of various meta tags. Use as `key` in addition to `name`/`property` on
 * `<meta>` elements for Next.js to properly dedupe tags in the rendered `<head>`.
 */
const enum MetaTags {
  canonicalLink = "canonical",
  description = "description",
  ogDescription = "og:description",
  ogImage = "og:image",
  ogTitle = "og:title",
  robots = "robots",
  twitterCard = "twitter:card",
}

/**
 * Meta tag that prevents a page from crawled/indexed by search engines
 * See https://developers.google.com/search/docs/advanced/robots/robots_meta_tag for full documentation.
 *
 * This must be called as a function, i.e. `NoRobotsMetaTag()`, and not as a component due to how the
 * Next.js `Head` component works.
 */
export const NoRobotsTag = () => {
  return <meta key={MetaTags.robots} name={MetaTags.robots} content="noindex, nofollow" />
}

/**
 * Renders the two `meta` elements that control the description for link previews and search engines.
 *
 * This must be called as a function, i.e. `Description("content")`, and not as a component due to
 * how the Next.js `Head` component works.
 */
export const DescriptionTags = (content: string) => {
  return (
    <>
      <meta key={MetaTags.description} name={MetaTags.description} content={content} />
      <meta key={MetaTags.ogDescription} property={MetaTags.ogDescription} content={content} />
    </>
  )
}

type TitleOptions = {
  /**
   * If true, appends ` | Spatial` to the title. Defaults to true.
   * If a string is passed, appends that string to the title, separated by ` | `.
   */
  suffix?: boolean | string
}

/**
 * Renders the `title` and `meta` elements that control the title for link previews and search engines.
 *
 * This must be called as a function, i.e. `TitleTag("content")`, and not as a component due to
 * how the Next.js `Head` component works.
 */
export const TitleTags = (title: string, { suffix = true }: TitleOptions = {}) => {
  const suffixStr = typeof suffix === "string" ? suffix : suffix ? "Spatial" : ""
  const content = suffixStr ? `${title} | ${suffixStr}` : title
  return (
    <>
      <title>{content}</title>
      <meta key={MetaTags.ogTitle} property={MetaTags.ogTitle} content={content} />
    </>
  )
}

/**
 * Link tag to specify the canonical URL of a page
 * See https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls for full documentation.
 *
 * This must be called as a function, i.e. `CanonicalUrlTag("/foo")`, and not as a component due to
 * how the Next.js `Head` component works.
 */
export const CanonicalUrlTag = (pathname: string) => {
  return <link key={MetaTags.canonicalLink} rel="canonical" href={`${Config.CANONICAL_URL_ORIGIN}${pathname}`} />
}

/**
 * meta tag to specify the image that will appear for link previews on social media & messaging apps
 *
 * This must be called as a function, i.e. `OgImageTag(myThumbnailSrc)`, and not as a component due to
 * how the Next.js `Head` component works.
 */
export const OgImageTag = (src: string) => {
  return <meta key={MetaTags.ogImage} property={MetaTags.ogImage} content={src} />
}

type TwitterCardType = "summary" | "summary_large_image" | "app" | "player"

/**
 * meta tag to specify the type of layout that Twitter will use links to the page are shared.
 * See https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started for more.
 *
 * This must be called as a function, i.e. `TwitterCardTags(myThumbnailSrc)`, and not as a component due to
 * how the Next.js `Head` component works.
 */
export const TwitterCardTags = (content: TwitterCardType) => {
  return <meta key={MetaTags.twitterCard} property={MetaTags.twitterCard} content={content} />
}
