import { produce } from "immer"

export function sortScreenShareSettings(setting: any[]) {
  return produce(setting, (draft) => {
    return draft.sort((a, b) => {
      if (a.maxWidth > b.maxWidth) return -1
      if (a.maxWidth < b.maxWidth) return 1
      if (a.maxFrameRate > b.maxFrameRate) return -1
      if (a.maxFrameRate < b.maxFrameRate) return 1
      return 0
    })
  })
}

interface SupportsUserMediaReponse {
  isSupported: boolean
  message?: string
}
export function supportsUserMedia(): SupportsUserMediaReponse {
  if (typeof navigator.mediaDevices === "object" && typeof navigator.mediaDevices.getUserMedia === "function") {
    return {
      isSupported: true,
    }
  }
  return {
    isSupported: false,
    message: "Microphone and camera input is not supported in your browser.",
  }
}

export async function getMicrophoneAccess(audioDeviceId?: string): Promise<boolean> {
  if (!supportsUserMedia().isSupported) {
    throw new Error("Does not support user media")
  }
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: audioDeviceId ? { exact: audioDeviceId } : undefined },
    })
    // need to stops the tracks afterwords as it can cause a "NotReadableError: Concurrent mic process limit." on firefox
    // because getting the media stream will be handled directly by photon/liveswitch
    mediaStream.getTracks().forEach((track) => {
      track.stop()
    })
    return true
  } catch (e) {
    return false
  }
}

export async function getMicVideoAccess(audioDeviceId?: string, videoDeviceId?: string): Promise<void> {
  if (!supportsUserMedia().isSupported) {
    throw new Error("Does not support user media")
  }
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: { deviceId: audioDeviceId ? { exact: audioDeviceId } : undefined },
    video: { deviceId: videoDeviceId ? { exact: videoDeviceId } : undefined },
  })
  // need to stops the tracks afterwords as it can cause a "NotReadableError: Concurrent mic process limit." on firefox
  // because getting the media stream will be handled directly by photon/liveswitch
  mediaStream.getTracks().forEach((track) => {
    track.stop()
  })
}

export async function hasVideoAccess(): Promise<boolean> {
  try {
    const devices = await getMediaDevices()
    return devices.some((device) => device.kind === "videoinput" && device.deviceId !== "")
  } catch {
    return false
  }
}

export async function hasMicAccess(): Promise<boolean> {
  try {
    const devices = await getMediaDevices()
    return devices.some((device) => device.kind === "audioinput" && device.deviceId !== "")
  } catch {
    return false
  }
}

export async function hasVideoInput(): Promise<boolean> {
  try {
    const devices = await getMediaDevices()
    return devices.some((device) => device.kind === "videoinput")
  } catch {
    return false
  }
}

export async function hasAudioInput(): Promise<boolean> {
  try {
    const devices = await getMediaDevices()
    return devices.some((device) => device.kind === "audioinput")
  } catch {
    return false
  }
}

export function getMediaDevices(): Promise<MediaDeviceInfo[]> {
  if (!navigator.mediaDevices?.enumerateDevices) {
    throw new Error("Does not support user media")
  }
  return navigator.mediaDevices.enumerateDevices()
}

export function registerListenerForDevicesChanged(eventListener: () => void) {
  navigator.mediaDevices.addEventListener("devicechange", eventListener)
}

export function unregisterListenerForDevicesChanged(eventListener: () => void) {
  navigator.mediaDevices.removeEventListener("devicechange", eventListener)
}
