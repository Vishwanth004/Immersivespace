import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { WorldsEndpoint, createWorldsEndpoint } from "./endpoints"

export class SapiWorldsClient extends SapiBaseClient {
  public readonly api: WorldsEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/v2/worlds")
    this.api = createWorldsEndpoint(this.client)
  }
}
