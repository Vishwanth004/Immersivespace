import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { SpatialSdkEndpoints, createSpatialSdkEndpoints } from "./endpoints/sdk"

export class SapiSpatialSdkClient extends SapiBaseClient {
  public readonly spatialSdk: SpatialSdkEndpoints

  constructor(params: SapiBaseClientParams) {
    super(params, "/sdk/v1")
    this.spatialSdk = createSpatialSdkEndpoints(this.client)
  }
}

export * from "./endpoints/sdk"
