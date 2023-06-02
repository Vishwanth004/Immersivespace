// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/plugins/share-plugin
const BASE_URL = "https://www.linkedin.com/sharing/share-offsite/"

export const getLinkedInShareLink = (spaceUrl: string) => {
  const queryParams = new URLSearchParams({
    url: spaceUrl,
  })

  return `${BASE_URL}?${queryParams.toString()}`
}
