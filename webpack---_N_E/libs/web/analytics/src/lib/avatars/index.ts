import { AvatarData } from "@spatialsys/js/sapi/types"

export const formatAvatarMixpanelProperties = (avatarData: AvatarData) => {
  const avatarStyle = (() => {
    if (avatarData?.activeAvatarStyle === "REALISTIC") {
      return avatarData?.avatarID ? "REALISTIC" : "DEFAULT"
    } else {
      return avatarData?.activeAvatarStyle
    }
  })()
  return {
    "Avatar Style": avatarStyle,
    "Avatar Body Type": avatarData?.avatarBody,
    "Avatar Shirt Color": avatarData?.shirtColorOverride,
    "Avatar Skin Color": avatarData?.skinColorOverride,
  }
}
