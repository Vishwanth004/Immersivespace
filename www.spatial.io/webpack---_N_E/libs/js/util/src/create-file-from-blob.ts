import { downloadFile } from "./download-file"

/**
 * Saves the given blob as a file in the user's local downloads
 * @param filename
 * @param blob
 */
export function createFileFromBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  downloadFile(filename, url)
  URL.revokeObjectURL(url)
}
