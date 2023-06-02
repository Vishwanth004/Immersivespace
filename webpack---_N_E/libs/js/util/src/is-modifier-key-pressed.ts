export function isModifierKeyPressed(key: KeyboardEvent) {
  return key.ctrlKey || key.shiftKey || key.metaKey || key.altKey
}
