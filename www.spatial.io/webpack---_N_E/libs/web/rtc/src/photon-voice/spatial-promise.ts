// Adapted from: https://ourcodeworld.com/articles/read/317/how-to-check-if-a-javascript-promise-has-been-fulfilled-rejected-or-resolved

export interface SpatialPromise<T> extends Promise<T> {
  isPending: boolean
  isRejected: boolean
  isFulfilled: boolean
  value: T | null
  error: null

  // Makes the promise never fulfill if still pending for all subscribers
  cancel: () => void

  __spatial: "SpatialPromise"
}

function isSpatialPromise<T>(promise: Promise<T> | SpatialPromise<T>): promise is SpatialPromise<T> {
  return (promise as SpatialPromise<T>).__spatial === "SpatialPromise"
}

const makeSpatialPromise = <T>(promise: Promise<T> | SpatialPromise<T>): SpatialPromise<T> => {
  // Don't modify any promise that has been already modified.
  if (isSpatialPromise(promise)) {
    return promise
  }

  // Set initial state
  let isPending = true
  let isRejected = false
  let isFulfilled = false
  let isCanceled = false
  let value = null
  let error = null

  const result = new Promise((resolve, reject) => {
    promise.then(
      (v) => {
        isFulfilled = true
        isPending = false
        value = v
        if (!isCanceled) resolve(v)
      },
      (e) => {
        isRejected = true
        isPending = false
        error = e
        if (!isCanceled) reject(e)
      }
    )
  }) as SpatialPromise<T>

  result.__spatial = "SpatialPromise"
  result.cancel = () => {
    isCanceled = true
  }

  void Object.defineProperties(result, {
    isFulfilled: {
      get: () => isFulfilled,
    },
    isPending: {
      get: () => isPending,
    },
    isRejected: {
      get: () => isRejected,
    },
    value: {
      get: () => value,
    },
    error: {
      get: () => error,
    },
  })
  return result
}

export default makeSpatialPromise
