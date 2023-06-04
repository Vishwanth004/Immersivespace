import { AvatarData, ENABLED_TREATMENT_VALUE, SAPIRoom, SpaceTemplate, TreatmentsRetool } from "./types"

/**
 * The treatments used internally within the React applications. Some of the keys are renamed from their Retool values to be more semantic/meaningful.
 * Each treatment is also typed correctly according to its intended usage, rather than as a string.
 *
 * This type should never be instantiated directly, but only created using `convertTreatmentsFromSapi`
 */
export interface ITreatments {
  authlessRpmAvatars: string[]
  collectibleEnvironmentsUpdateKey: string
  coreLoopQuestsV1: boolean
  cubemapPreviewEnabled: boolean
  disableUnblockAudioWeb: boolean
  hyperlinksV2: boolean
  integrationsSketchfab: boolean
  integrationsSolana: boolean
  isBugReporter: boolean
  isModifiedCameraControllerEnabled: boolean
  logBridgeTraces: boolean
  maxWebcamFPS: number | null
  mediaViewDebug: boolean
  nftContentBlockchains: string[]
  reportWebNetworkErrorsToSentry: boolean
  sendMobileJsLogsToUnity: boolean
  showDebugMenu: boolean
  spaceInstancing: boolean
  unlimitedFileSize: boolean
  userCameraControls: boolean
  voiceProvider: string
  watermarkHidden: boolean
  webGlVersion: string
}

/**
 * Converts the treatment object from SAPI into `ITreatments`, accounting for default and undefined values
 *
 * TODO (DEV-6573): we can consider memoizing this function (i.e. with `lodash.memo), when yarn workspaces is set up to enable external dependencies within `SpatialPackages`.
 */
export const convertTreatmentsFromSapi = (treatments: TreatmentsRetool): ITreatments => {
  const maxWebcamFPS = parseInt(treatments.maxWebcamFPS, 10)

  return {
    coreLoopQuestsV1: treatments.coreLoopQuestsV1 === ENABLED_TREATMENT_VALUE,
    integrationsSolana: treatments.integrationsSolana === ENABLED_TREATMENT_VALUE,
    integrationsSketchfab: treatments.integrationsSketchfab === ENABLED_TREATMENT_VALUE,
    maxWebcamFPS: isNaN(maxWebcamFPS) ? null : maxWebcamFPS,
    showDebugMenu: treatments.webShowDebugMenu === ENABLED_TREATMENT_VALUE,
    unlimitedFileSize: treatments.unlimitedFileSize === ENABLED_TREATMENT_VALUE,
    voiceProvider: treatments.voiceProvider ?? "Photon",
    webGlVersion: treatments.webglVersion,
    logBridgeTraces: treatments.recordReactBridgeTraces == ENABLED_TREATMENT_VALUE,
    isBugReporter: treatments.isBugReporter === ENABLED_TREATMENT_VALUE,
    collectibleEnvironmentsUpdateKey: treatments.collectibleEnvironmentsUpdateKey,
    mediaViewDebug: treatments.mediaViewDebug === ENABLED_TREATMENT_VALUE,
    nftContentBlockchains: treatments.nftContentBlockchains?.split("|") ?? ["ethereum"],
    hyperlinksV2: treatments.hyperlinksV2 === ENABLED_TREATMENT_VALUE,
    spaceInstancing: treatments.spaceInstancing === ENABLED_TREATMENT_VALUE,
    userCameraControls: treatments.userCameraControls === ENABLED_TREATMENT_VALUE,
    watermarkHidden: treatments.watermarkHidden === ENABLED_TREATMENT_VALUE,
    cubemapPreviewEnabled: treatments.cubemapPreviewEnabled === ENABLED_TREATMENT_VALUE,
    disableUnblockAudioWeb: treatments.disableUnblockAudioWeb === ENABLED_TREATMENT_VALUE,
    sendMobileJsLogsToUnity: treatments.sendMobileJsLogsToUnity === ENABLED_TREATMENT_VALUE,
    reportWebNetworkErrorsToSentry: treatments.reportWebNetworkErrorsToSentry === ENABLED_TREATMENT_VALUE,
    authlessRpmAvatars: treatments.authlessRpmAvatars?.split("|") ?? [],
    isModifiedCameraControllerEnabled: treatments.isModifiedCameraControllerEnabled === ENABLED_TREATMENT_VALUE,
  }
}

export type SAPIRoomSubsetSpaceAdmin = Pick<SAPIRoom, "ownerID" | "roomAdmins">

/** Determines whether a user is an admin of a room. The room owner is always an admin. */
export const isAdminOfSAPIRoom = (room: SAPIRoom | SAPIRoomSubsetSpaceAdmin, userID: string): boolean => {
  return room.roomAdmins.includes(userID) || room.ownerID === userID
}

export const getCustomNftEnvironmentId = (spaceTemplate: SpaceTemplate) => {
  return `${spaceTemplate.nftChain}/${spaceTemplate.contractAddress}/${spaceTemplate.tokenID}`
}

export const formatAvatarMixpanelProperties = (avatarData: AvatarData | undefined) => {
  const avatarStyle =
    avatarData?.activeAvatarStyle === "REALISTIC"
      ? avatarData.avatarID
        ? "REALISTIC"
        : "DEFAULT"
      : avatarData?.activeAvatarStyle
  return {
    "Avatar Style": avatarStyle,
    "Avatar Body Type": avatarData?.avatarBody,
    "Avatar Shirt Color": avatarData?.shirtColorOverride,
    "Avatar Skin Color": avatarData?.skinColorOverride,
  }
}
