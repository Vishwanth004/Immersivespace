import { RtcWindow } from "./rtc-window"

declare const window: RtcWindow

export const autoPlayMedia = (mediaElement: HTMLMediaElement) => {
  // attempts to play media, if it fails, add listener for when audio context state changes, so can try again
  const attemptToPlayMedia = () => {
    removeAudioContextStateListener()
    if (mediaElement?.paused) {
      mediaElement.play().catch(() => {
        addAudioContextStateListener()
      })
    }
  }

  const audioContext = window.globalAudioContext

  const addAudioContextStateListener = () => {
    audioContext.addEventListener("statechange", attemptToPlayMedia)
  }

  const removeAudioContextStateListener = () => {
    audioContext.removeEventListener("statechange", attemptToPlayMedia)
  }

  attemptToPlayMedia()
}
