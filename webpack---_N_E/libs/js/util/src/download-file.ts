/**
 * Triggers a download by the browser for the file at the given URL
 * @param filename
 * @param url
 */
export function downloadFile(filename: string, url: string) {
  const elem = document.createElement("a")
  elem.href = url
  elem.download = filename
  elem.style.display = "none"
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}
