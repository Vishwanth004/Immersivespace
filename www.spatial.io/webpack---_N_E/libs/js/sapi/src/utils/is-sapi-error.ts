import { AxiosError } from "axios"

import { RequireProperties } from "@spatialsys/js/types"

import { SAPIError } from "../types"

type AxiosErrorWithResponse<T> = RequireProperties<AxiosError<T>, "response">

export function isSapiError(error: AxiosError): error is AxiosErrorWithResponse<{ errors: SAPIError[] }> {
  return error.response?.data != null && typeof error.response.data === "object" && "errors" in error.response.data
}
