import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { BadgesEndpoint, createBadgesEndpoint } from "./endpoints/badges"

export class SapiBadgesClient extends SapiBaseClient {
  public readonly badges: BadgesEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/v2/badges")
    this.badges = createBadgesEndpoint(this.client)
  }
}
