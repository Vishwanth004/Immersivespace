import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { RecommendedSpacesEndpoint, createRecommendedEndpoints } from "./endpoints/recommended"
import { SpaceEndpoint, createSpaceEndpoints } from "./endpoints/space"
import { SpacesEndpoint, createSpacesEndpoints } from "./endpoints/spaces"

export class SapiSpaceClient extends SapiBaseClient {
  public readonly recommended: RecommendedSpacesEndpoint
  public readonly space: SpaceEndpoint
  public readonly spaces: SpacesEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/space/v1")
    this.recommended = createRecommendedEndpoints(this.client)
    this.space = createSpaceEndpoints(this.client)
    this.spaces = createSpacesEndpoints(this.client)
  }
}

export * from "./endpoints/space"
export * from "./endpoints/spaces"
