import { Platform } from "@spatialsys/unity/app-state"

export const platformToString = (platform: Platform) => {
  switch (platform) {
    case Platform.WebGL:
      return "Web"
    case Platform.AndroidMobile:
    case Platform.iOSMobile:
      return "Mobile"
    case Platform.Oculus:
      return "VR"
    default:
      return "Unknown"
  }
}
