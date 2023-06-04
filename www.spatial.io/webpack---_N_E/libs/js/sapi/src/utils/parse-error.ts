import { SAPIError } from "../types"

type SAPIErrors = {
  errors: SAPIError[]
}

/**
 * Unwraps error message that have been JSON encoded multiple times
 * This is a temporary fix until SAPI is fixed to not double encode errors
 */
export function parseError(error: SAPIError | SAPIErrors): SAPIError[] {
  return Array.from(parse(error))
}

function* parse(error: SAPIError | SAPIErrors): Generator<SAPIError> {
  try {
    if ("message" in error) {
      if (error.message.startsWith("{") && error.message.endsWith("}")) {
        yield* parse(JSON.parse(error.message))
      }
      yield error as SAPIError
    } else if ("errors" in error) {
      for (const err of error.errors) {
        yield* parse(err)
      }
    }
  } catch (e) {
    if ("message" in error) {
      yield error as SAPIError
    }
  }
}
