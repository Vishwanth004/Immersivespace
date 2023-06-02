import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { ItemsEndpoint, createItemsEndpoint } from "./endpoints"

export class SapiItemsClient extends SapiBaseClient {
  public readonly api: ItemsEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/v2/items")
    this.api = createItemsEndpoint(this.client)
  }
}
