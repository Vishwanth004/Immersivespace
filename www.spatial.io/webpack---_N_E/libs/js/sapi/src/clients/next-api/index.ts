import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { AuthEndpoint, createAuthEndpoints } from "./endpoints/auth"

/**
 * API client for making requests to the Next.js API.
 *
 * TODO (DEV-16434): Only extends `SapiBaseClient` due to legacy naming reasons.
 * SapiBaseClient should probably be renamed to `BaseApiClient`,
 * and this entire library should probably be renamed along the lines of `api-clients`.
 */
export class NextApiClient extends SapiBaseClient {
  public readonly auth: AuthEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/api")
    this.auth = createAuthEndpoints(this.client)
  }
}
