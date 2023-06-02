import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { NotificationEndpoint, createNotificationEndpoints } from "./endpoints/tokens"

export class SapiNotificationClient extends SapiBaseClient {
  public readonly notification: NotificationEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/notification/v1")
    this.notification = createNotificationEndpoints(this.client)
  }
}

export * from "./endpoints/tokens"
