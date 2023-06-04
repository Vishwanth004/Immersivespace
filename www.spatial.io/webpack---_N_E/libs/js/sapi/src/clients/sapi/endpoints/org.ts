import { AxiosInstance } from "axios"

export function createOrgsEndpoints(client: AxiosInstance) {
  return {
    getOrg: async function (): Promise<any> {
      const response = await client.get<any>(`/admin/`)
      return response.data
    },
    getOrgUsers: async function (): Promise<any> {
      const response = await client.get<any>(`/admin/members`)
      return response.data
    },
    removeAccount: async function (accountID: string): Promise<any> {
      const response = await client.delete<any>(`/admin/members/${accountID}`)
      return response.data
    },
    changeOrgName: async function (name: string): Promise<any> {
      const response = await client.patch<any>(`/admin/edit`, { name })
      return response.data
    },
    sendInvitation: async function (email: string, resend = false): Promise<any> {
      const response = await client.post<any>(`/admin/invite`, {
        email,
        resend,
      })
      return response.data
    },
    changeUserPrivileges: async function (userID: string, isAdmin: boolean) {
      const response = await client.post<any>(`/admin/members/${userID}`, { isAdmin })
      return response.data
    },
    createOrg: async function (name: string, associateDomain: boolean): Promise<any> {
      const response = await client.post<any>(`/organization/`, { name, associateDomain })
      return response.data
    },
  }
}

export type OrgEndpoint = ReturnType<typeof createOrgsEndpoints>
