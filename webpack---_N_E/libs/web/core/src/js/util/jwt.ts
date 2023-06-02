/**
 * From https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jsonwebtoken/index.d.ts
 */
export interface JwtPayload {
  [key: string]: any
  iss?: string | undefined
  sub?: string | undefined
  aud?: string | string[] | undefined
  exp?: number | undefined
  nbf?: number | undefined
  iat?: number | undefined
  jti?: string | undefined
}

/**
 * Parses they payload of a base64-encoded JWT token
 */
export const parseJwt = (base64EncodedToken: string): JwtPayload => {
  return JSON.parse(Buffer.from(base64EncodedToken.split(".")[1], "base64").toString())
}
