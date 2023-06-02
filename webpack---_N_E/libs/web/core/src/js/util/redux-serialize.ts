/**
 * Serializer util to avoid serializing HTML Elements and custom classes, as doing so often crashes
 * Redux dev tools (particularly ones rendered by React).
 *
 * @param key
 * @param value the value being serialized
 * @returns the serialized value
 */
export const replacer = (_: string, value: unknown): unknown | string => {
  if (value instanceof HTMLElement) {
    return `<${value.nodeName.toLowerCase()} />`
  }
  if (value instanceof Object && value.constructor !== Object && value.constructor !== Array) {
    return `(${value.constructor.name})`
  }
  return value
}
