/**
 * Serializes a keyboard event to a string, maintaining a consistent lexical order.
 */
export const serializeKeyboardEvent = (
  evt: Pick<KeyboardEvent, "code" | "altKey" | "ctrlKey" | "metaKey" | "shiftKey">
): string => {
  // The modifier keys are pushed in lexographical order
  const modifiers: string[] = []
  if (evt.altKey) modifiers.push("alt")
  if (evt.ctrlKey) modifiers.push("ctrl")
  if (evt.metaKey) modifiers.push("meta")
  if (evt.shiftKey) modifiers.push("shift")
  modifiers.push(evt.code)
  return modifiers.join("+")
}

export const numberToSerializedKeybind = (number: number) => {
  return `Digit${number}`
}
