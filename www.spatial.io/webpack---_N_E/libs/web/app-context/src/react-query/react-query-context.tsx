import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import { queryClientOptions } from "./"

type ReactQueryProviderProps = {
  children?: React.ReactNode
  pageProps: any
}

/**
 * Global provider for react-query, also server-side rendering and hydration.
 *
 * We must create the query client INSIDE the app, per https://tanstack.com/query/v4/docs/guides/ssr#using-hydration,
 * to support SSR with hydration.
 */
export const ReactQueryProvider = ({ children, pageProps }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}
