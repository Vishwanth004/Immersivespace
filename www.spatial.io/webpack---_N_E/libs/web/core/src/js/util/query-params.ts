export const convertQueryParamToString = (param?: string | string[], defaultValue = "") => {
  if (typeof param === "string") {
    return param
  }

  return param?.[0] || defaultValue
}
