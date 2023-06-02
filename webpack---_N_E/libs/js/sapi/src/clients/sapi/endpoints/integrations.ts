import { AxiosInstance } from "axios"

export type IntegrationStatus = "COMING_SOON" | "CONNECTED" | "EXPIRED"

export type WalletIntegrationNames = "ethereum" | "solana"
export type ProviderIntegrationNames = "google" | "msft" | "sketchfab"

export type IntegrationConnection = ProviderIntegrationNames | WalletIntegrationNames
export type IntegrationStateType = "integration" | "wallet"

export const enum Blockchain {
  Ethereum = "ethereum",
  Matic = "matic",
  Solana = "solana",
}

export const blockchainWallet: { [key in Blockchain]: WalletIntegrationNames } = {
  ethereum: Blockchain.Ethereum,
  matic: Blockchain.Ethereum,
  solana: Blockchain.Solana,
}

export interface ConnectedAccount {
  connection: ProviderIntegrationNames
  icon?: { [resolution: string]: string }
  status: IntegrationStatus
  teamName?: string
  userName?: string
}

export interface ConnectedWallet {
  address: string
  connection: WalletIntegrationNames
  status: IntegrationStatus
}

export interface IntegrationsResponse {
  connectedAccounts: ConnectedAccount[]
  connectedWallets: ConnectedWallet[]
}

export interface AuthIntegrationResponse {
  url: string
}

export function checkIntegrationAccountStatus(connection: IntegrationConnection, response: IntegrationsResponse) {
  let status = findWalletFromConnection(connection, response)?.status
  if (!status) {
    status = findAccountFromConnection(connection, response)?.status
  }
  return status
}

export function findAccountFromConnection(connection: IntegrationConnection, response: IntegrationsResponse) {
  return response.connectedAccounts.find((s) => s.connection === connection)
}

export function findWalletFromConnection(connection: IntegrationConnection, response: IntegrationsResponse) {
  return response.connectedWallets.find((s) => s.connection === connection)
}

export function createIntegrationsEndpoints(client: AxiosInstance) {
  return {
    getIntegrationResponse: async function (): Promise<IntegrationsResponse> {
      const response = await client.get<IntegrationsResponse>(`/integrations/`)
      return response.data
    },
    disconnectIntegration: async function (connection: IntegrationConnection): Promise<void> {
      const type: IntegrationStateType = connection === "ethereum" || connection === "solana" ? "wallet" : "integration"
      await client.post<void>(`/integrations/disconnect`, { provider: connection, type })
    },
    authIntegration: async function (connection: ProviderIntegrationNames): Promise<AuthIntegrationResponse> {
      const response = await client.get<AuthIntegrationResponse>(`/integrations/auth/`, { params: { api: connection } })
      return response.data
    },
    connectWallet: async function (address: string, connection: WalletIntegrationNames): Promise<void> {
      await client.post<void>(`/integrations/wallets/connect`, {
        address,
        connection,
      })
    },
  }
}

export type IntegrationEndpoint = ReturnType<typeof createIntegrationsEndpoints>
