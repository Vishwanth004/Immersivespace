import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { BadgesEndpoint, createBadgesEndpoint } from "./endpoints/badges"
import { PackagesEndpoint, createPackagesEndpoint } from "./endpoints/packages"
import { WorldsEndpoint, createWorldsEndpoint } from "./endpoints/worlds"

/**
 * SAPI is migrating to a new version of the users service. This route is under `<baseUrl>/v2/users`
 */
export class SapiUsersV2Client extends SapiBaseClient {
  public readonly badges: BadgesEndpoint
  public readonly packages: PackagesEndpoint
  public readonly worlds: WorldsEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/v2/users")
    this.badges = createBadgesEndpoint(this.client)
    this.packages = createPackagesEndpoint(this.client)
    this.worlds = createWorldsEndpoint(this.client)
  }
}
