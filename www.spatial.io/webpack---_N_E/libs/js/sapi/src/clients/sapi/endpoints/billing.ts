import { AxiosInstance } from "axios"

import { GetStripeCheckoutArgs, GetStripeCheckoutResponse, GetStripePortalResponse } from "../../../types"

export function createBillingEndpoints(client: AxiosInstance) {
  return {
    /**
     * Gets a session ID to create a Stripe checkout session
     */
    getStripeCheckoutSession: async (args: GetStripeCheckoutArgs): Promise<GetStripeCheckoutResponse> => {
      const response = await client.post<GetStripeCheckoutResponse>("/stripe/checkout", args)
      return response.data
    },
    /**
     * Gets a URL for Stripe billing portal session
     */
    getStripePortal: async (): Promise<GetStripePortalResponse> => {
      const response = await client.post<GetStripePortalResponse>("/stripe/portal")
      return response.data
    },
  }
}

export type BillingEndpoint = ReturnType<typeof createBillingEndpoints>
