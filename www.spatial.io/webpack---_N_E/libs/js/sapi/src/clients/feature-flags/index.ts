import type { FeatureFlags, TreatmentsInBootstrapRetool } from "../../types"
import { SapiBaseClient, SapiBaseClientParams } from "../base-client"

export type GetFeatureFlagsResponse = {
  /**
   * Legacy treatments from Retool. Will be deprecated eventually,
   * should use ConfigCat flags instead (`flags`)
   */
  bootstrapTreatments: TreatmentsInBootstrapRetool
  featureFlags: FeatureFlags
}

export class SapiFeatureFlagsClient extends SapiBaseClient {
  constructor(params: SapiBaseClientParams) {
    super(params, "/feature-flags/v1")
  }

  public async getFeatureFlags(): Promise<GetFeatureFlagsResponse> {
    return (await this.client.get<GetFeatureFlagsResponse>(`/`)).data
  }
}
