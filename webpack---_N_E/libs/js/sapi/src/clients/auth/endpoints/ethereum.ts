import { AxiosInstance } from "axios"

import {
  AuthenticateWithEthereumResponse,
  CompleteRegistrationArgs,
  CompleteRegistrationResponse,
} from "../../../types"

export function createEthereumEndpoints(client: AxiosInstance) {
  return {
    /**
     * Sends intent to log in with given eth public address
     */
    authenticateWithEthereum: async function (publicAddress: string): Promise<AuthenticateWithEthereumResponse> {
      const response = await client.post<AuthenticateWithEthereumResponse>(`/register/ethereum`, { publicAddress })
      return response.data
    },
    completeRegistration: async function (args: CompleteRegistrationArgs): Promise<CompleteRegistrationResponse> {
      const response = await client.put<CompleteRegistrationResponse>("/register/ethereum", args)
      return response.data
    },
  }
}

export type EthereumEndpoint = ReturnType<typeof createEthereumEndpoints>
