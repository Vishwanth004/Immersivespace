import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { ContentEndpoints, createContentEndpoints } from "./endpoints/content"

export class SapiContentClient extends SapiBaseClient {
  public readonly content: ContentEndpoints

  constructor(params: SapiBaseClientParams) {
    super(params, "/content/v1")
    this.content = createContentEndpoints(this.client)
  }
}

export * from "./endpoints/content"
