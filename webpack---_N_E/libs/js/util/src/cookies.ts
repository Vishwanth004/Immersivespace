/**
 * Gets value of a cookie from a string (returned from document.cookies)
 *
 * @param cookies should pass in document.cookies
 * @param cookieName The name of the cookie
 * @returns the cookie value or undefined if not found
 */
export const getCookieValue = (cookies: string, cookieName: string) => {
  return cookies
    .split("; ")
    .find((row) => row.startsWith(cookieName))
    ?.split("=")[1]
}

/**
 * Given a cookie name, returns the string to delete that cookie.
 * The string should be passed to `document.cookie`.
 *
 * @example
 * // Deletes the cookie "my-cookie"
 * const str = getDeleteCookieString("my-cookie")
 * document.cookie = str
 */
export const getDeleteCookieString = (cookieName: string) =>
  `${cookieName}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
