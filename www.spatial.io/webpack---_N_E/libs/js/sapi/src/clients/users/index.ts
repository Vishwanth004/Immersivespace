import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { UsersServiceEndpoint, createUsersServiceEndpoints } from "./endpoints/profiles"
import { UnlockablesEndpoints, createUnlockablesEndpoints } from "./endpoints/unlockables"

export class SapiUsersClient extends SapiBaseClient {
  public readonly users: UsersServiceEndpoint
  public readonly unlockables: UnlockablesEndpoints

  constructor(params: SapiBaseClientParams) {
    super(params, "/users/v1")
    this.unlockables = createUnlockablesEndpoints(this.client)
    this.users = createUsersServiceEndpoints(this.client)
  }
}

export * from "./endpoints/profiles"
export * from "./endpoints/unlockables"
