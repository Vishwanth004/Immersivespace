export default class RTCMediaFunctions {
  public static mediaIsSpectator(mediaTypeString: string): boolean {
    if (mediaTypeString === null) return false
    return mediaTypeString === "Spectator" || mediaTypeString === "Spectator-B"
  }
}
