import { QueryFunction } from "@tanstack/react-query"

import { wait } from "@spatialsys/js/util/wait"

/**
 * Decorates a query function with a delay. If the query is aborted during the delay, the original query function will not be called.
 *
 * Using this function instead of debouncing the input to the query function will allow cached results to be returned immediately
 * while still debouncing the requests for new data.
 *
 * React Query aborts the query through the AbortSignal when the query key is no longer in use. After this, it will ignore what the
 * query function returns/throws. Therefore, it is safe to reject the promise if the signal is aborted.
 *
 * @param queryFunction The query function to decorate
 * @param ms The delay in milliseconds
 */
export const debouncedQueryFunction = <T>(queryFunction: QueryFunction<T>, ms: number): QueryFunction<T> => {
  return async (context) => {
    if (ms !== 0) {
      await wait(ms, { signal: context.signal })
    }
    return queryFunction(context)
  }
}
