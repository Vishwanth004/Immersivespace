// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview and https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
const BASE_URL = "https://twitter.com/intent/tweet"
const SPATIAL_TWITTER_USERNAME = "spatial_io"

export const getTwitterShareLink = (bodyText: string, spaceUrl: string, includeVia = true) => {
  const params: Record<string, string> = {
    text: bodyText,
    url: spaceUrl,
    related: SPATIAL_TWITTER_USERNAME,
  }
  if (includeVia) {
    params.via = SPATIAL_TWITTER_USERNAME
  }
  const queryParams = new URLSearchParams(params)

  return `${BASE_URL}?${queryParams.toString()}`
}
