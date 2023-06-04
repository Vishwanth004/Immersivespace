const MINIMUM_GO_LIVE_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export function canGoLive(lastPromotedAtUnixMs: number) {
  return (
    !lastPromotedAtUnixMs || lastPromotedAtUnixMs === 0 || Date.now() - lastPromotedAtUnixMs > MINIMUM_GO_LIVE_INTERVAL
  )
}

export function getGoLiveCooldownSeconds(lastPromotedAtUnixMs: number) {
  return (lastPromotedAtUnixMs + MINIMUM_GO_LIVE_INTERVAL - Date.now()) / 1000
}

export function getGoLiveCooldownString(lastPromotedAtUnixMs: number) {
  const secondsUntilCanGoLive = getGoLiveCooldownSeconds(lastPromotedAtUnixMs)
  const HOUR_THRESHOLD_SECONDS = 60 * 60

  if (secondsUntilCanGoLive <= 0) {
    return "0:00"
  }

  const displaySeconds = Math.floor(secondsUntilCanGoLive % 60)
    .toString()
    .padStart(2, "0")

  if (secondsUntilCanGoLive < HOUR_THRESHOLD_SECONDS) {
    const displayMinutes = Math.floor((secondsUntilCanGoLive / 60) % 60)
    return `${displayMinutes}:${displaySeconds}`
  }

  const displayHours = Math.floor(secondsUntilCanGoLive / 60 / 60)
  const displayMinutes = Math.floor((secondsUntilCanGoLive / 60) % 60)
    .toString()
    .padStart(2, "0")
  return `${displayHours}:${displayMinutes}:${displaySeconds}`
}
