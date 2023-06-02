import { LogChannel } from "@spatialsys/js/logger"

import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { AvatarEndpoint, createAvatarEndpoints } from "./endpoints/avatars"
import { BillingEndpoint, createBillingEndpoints } from "./endpoints/billing"
import { BootstrapEndpoint, createBootstrapEndpoints } from "./endpoints/bootstrap"
import { ContentEndpoint, createContentEndpoints } from "./endpoints/content"
import { IntegrationEndpoint, createIntegrationsEndpoints } from "./endpoints/integrations"
import { OrgEndpoint, createOrgsEndpoints } from "./endpoints/org"
import { RoomsEndpoint, createRoomsEndpoints } from "./endpoints/rooms"
import { UserEndpoint, createUsersEndpoints } from "./endpoints/users"

/**
 * This is the "legacy" client, where we threw all requests under `api/v1`.
 * SAPI is moving towards splitting up requests by path, i.e. `users/v1`, `spaces/v1`, etc.
 * These can eventually be migrated to their own micro-services.
 */
export class SapiClient extends SapiBaseClient {
  public readonly avatars: AvatarEndpoint
  public readonly billing: BillingEndpoint
  public readonly bootstrap: BootstrapEndpoint
  public readonly content: ContentEndpoint
  public readonly integrations: IntegrationEndpoint
  public readonly orgs: OrgEndpoint
  public readonly rooms: RoomsEndpoint
  public readonly users: UserEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/api/v1")

    this.avatars = createAvatarEndpoints(this.client)
    this.billing = createBillingEndpoints(this.client)
    this.bootstrap = createBootstrapEndpoints(this.client, this.channelName, this.spatialUnityVersion)
    this.content = createContentEndpoints(this.client)
    this.integrations = createIntegrationsEndpoints(this.client)
    this.orgs = createOrgsEndpoints(this.client)
    this.rooms = createRoomsEndpoints(this.client)
    this.users = createUsersEndpoints(this.client)
  }
}

export const SAPILogChannel = new LogChannel("SAPI")

export * from "./endpoints/avatars"
export * from "./endpoints/billing"
export * from "./endpoints/bootstrap"
export * from "./endpoints/content"
export * from "./endpoints/integrations"
export * from "./endpoints/org"
export * from "./endpoints/rooms"
export * from "./endpoints/users"
