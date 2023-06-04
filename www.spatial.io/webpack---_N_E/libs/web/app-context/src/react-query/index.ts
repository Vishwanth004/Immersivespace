import type { QueryClientConfig } from "@tanstack/react-query"

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}

/**
 * Default options for the query client on the server.
 *
 * Sets `retry` to false, as we don't want to retry queries on the server which could
 * take a very long time
 */
export const queryClientServerOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  // Custom loggers will be deprecated in react-query v5, but failed queries will also
  // no longer be logged. Can remove once v5 is out and we've migrated.
  logger: {
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
  },
}

export * from "./react-query-context"
