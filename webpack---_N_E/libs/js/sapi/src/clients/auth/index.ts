import { SapiBaseClient, SapiBaseClientParams } from "../base-client"
import { AppleSsoEndpoint, createAppleSsoEndpoints } from "./endpoints/apple-sso"
import { AzureSsoEndpoint, createAzureSsoEndpoints } from "./endpoints/azure-sso"
import { EmailPwEndpoint, createEmailPwEndpoints } from "./endpoints/email-pw"
import { EthereumEndpoint, createEthereumEndpoints } from "./endpoints/ethereum"
import { PostLoginEndpoint, createPostLoginEndpoints } from "./endpoints/post-login"
import { VerifyEndpoint, createVerifyEndpoints } from "./endpoints/verify"

export class SapiAuthClient extends SapiBaseClient {
  public readonly appleSso: AppleSsoEndpoint
  public readonly azureSso: AzureSsoEndpoint
  public readonly emailPw: EmailPwEndpoint
  public readonly postLogin: PostLoginEndpoint
  public readonly verify: VerifyEndpoint
  public readonly ethereum: EthereumEndpoint

  constructor(params: SapiBaseClientParams) {
    super(params, "/auth/v1")
    this.appleSso = createAppleSsoEndpoints(this.client)
    this.azureSso = createAzureSsoEndpoints(this.client)
    this.emailPw = createEmailPwEndpoints(this.client)
    this.postLogin = createPostLoginEndpoints(this.client)
    this.verify = createVerifyEndpoints(this.client)
    this.ethereum = createEthereumEndpoints(this.client)
  }
}

export * from "./endpoints/apple-sso"
export * from "./endpoints/azure-sso"
export * from "./endpoints/email-pw"
export * from "./endpoints/ethereum"
export * from "./endpoints/verify"
