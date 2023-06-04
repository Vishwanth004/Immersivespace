export function formatHyperlinks(link: string) {
  if (!link) {
    return
  }
  const isHttpPrepended = link.startsWith("http")

  return isHttpPrepended ? link : `http://${link}`
}
