/**
 * @param ms The number of milliseconds to wait.
 * @param signal An optional abort signal. If provided, the promise will be rejected if the signal is aborted.
 * @returns A promise that resolves after the specified number of milliseconds.
 */
export const wait = (ms: number, { signal }: { signal?: AbortSignal }) => {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, ms)
    signal?.addEventListener("abort", () => {
      clearTimeout(timeout)
      reject({ name: "AbortError" })
    })
  })
}
