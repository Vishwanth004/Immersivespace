/**
 * Returns a string representing the time since the given timestamp as a relative time.
 * @param timestampMs A Date object or Unix Epoch timestamp in milliseconds
 */
export const formatTimestampAsRelative = (timestampMs: Date | string) => {
  const timestamp = new Date(timestampMs)
  const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000)

  if (seconds < 20) return "Just now"
  const hours = seconds / (60 * 60)
  if (hours >= 1) return Math.floor(hours) + ` hour${hours > 1 ? "s" : ""} ago`
  const minutes = seconds / 60
  if (minutes >= 1) return Math.floor(minutes) + ` min${minutes > 1 ? "s" : ""} ago`
  return Math.floor(seconds) + " secs ago"
}
