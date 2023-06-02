/**
 * Helper function for dynamically creating a script element/dowloading JS.
 * @param url The script's `src`.
 * @returns A promise that will resolve when the script loads, or reject if there's an error.
 */
export function loadScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.onload = () => resolve()
    script.onerror = reject
    script.src = url
    script.type = "text/javascript"
    document.head.appendChild(script)
  })
}
