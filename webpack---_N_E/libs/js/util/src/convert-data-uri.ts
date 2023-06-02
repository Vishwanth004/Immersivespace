/**
 * Gets a `Blob` from a data URI string
 */
export function dataUriToBlob(dataUri: string) {
  // Get media type
  // dataURI syntax : data:[<mediatype>][;base64],<data>
  // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0]

  // Decode dataURI to byteString based on the encoding type base64/URL
  let byteString
  if (dataUri.split(",")[0].indexOf("base64") >= 0) {
    byteString = atob(dataUri.split(",")[1])
  } else {
    byteString = unescape(dataUri.split(",")[1])
  }

  // Convert byte string to data
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}
