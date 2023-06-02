const BASE_URL = "https://www.facebook.com/sharer/sharer.php"

export const getFbShareLink = (spaceUrl: string) => {
  const queryParams = new URLSearchParams({
    u: spaceUrl,
  })

  return `${BASE_URL}?${queryParams.toString()}`
}
