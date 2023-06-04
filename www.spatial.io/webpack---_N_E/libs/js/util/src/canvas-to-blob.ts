/**
 * Promisified version of `canvas.toBlob`
 * @param canvas
 * @returns
 */
export function canvasToBlob(canvas: HTMLCanvasElement, type?: string, quality?: any): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality)
  })
}
