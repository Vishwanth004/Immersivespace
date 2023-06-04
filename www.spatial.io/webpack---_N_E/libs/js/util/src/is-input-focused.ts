export function isInputFocused() {
  const el = document.activeElement as HTMLElement | null
  if (el == null) {
    return false
  }
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    el.contentEditable === "true"
  )
}
