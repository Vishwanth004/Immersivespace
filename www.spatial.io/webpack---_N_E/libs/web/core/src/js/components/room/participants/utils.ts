import { ParticipantProfile, UserData } from "@spatialsys/js/sapi/clients/sapi"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { ActorMetaData, AppStateSelectors } from "@spatialsys/unity/app-state"
import { ParticipantData, ParticipantWithRTC } from "@spatialsys/web/app-state"
import {
  RoomRTCLocalMediaState,
  RoomRTCMediaState,
  RoomRTCRemoteMediaState,
  RtcState,
} from "@spatialsys/web/rtc/rtc-state"
import RTCMediaFunctions from "@spatialsys/web/rtc/rtc/rtc-media-functions"

/**
 * Creates a map of participants with one participant for each user (**not** actor) in the space.
 */
export function makeParticipantsMap(
  actorsMetadata: Record<number, ActorMetaData>,
  actorsLookup: Record<string, number[]>
): Record<string, ParticipantProfile & ParticipantData> {
  const participantMap: Record<string, ParticipantProfile & ParticipantData> = {}

  for (const actor of Object.values(actorsMetadata)) {
    // Ensure we only return one participant per user so if the user joins the space from multiple
    // tabs/platforms, they only show up in the participant list once.
    if (!participantMap[actor.userID]) {
      const participant: ParticipantProfile & ParticipantData = {
        id: actor.userID,
        displayName: actor.socialProfile.displayName,
        profilePicURL: actor.socialProfile.profilePictureURL,
        appearanceCustomization: actor.socialProfile.appearanceCustomization,
        active: true,
        clientPlatform: actor.platform.toString(),
        playerColors: getPlayerColor(actor.socialProfile.appearanceCustomization.profileColor),
        clientPlatforms: new Set<string>(),
        roomActorNumbers: new Set<number>(actorsLookup[actor.userID]),
        isMuted: actor.isMutedAtSource,
        isTalking: actor.isTalking,
        socialProfile: actor.socialProfile,
        isAuthless: actor.isAuthless,
      }
      participantMap[actor.userID] = participant
      continue
    }

    // If this is another actor for an existing participant, use this actors PFP, name and
    // socialProfile for the participant. Ensure if either actor isTalking, the participant
    // isTalking, and that both actors are muted for the participant to be considered muted.
    const participant = participantMap[actor.userID]
    Object.assign(participant, {
      profilePicURL: actor.socialProfile.profilePictureURL,
      displayName: actor.socialProfile.displayName,
      socialProfile: actor.socialProfile,
      isTalking: participant.isTalking || actor.isTalking,
      isMuted: participant.isMuted && actor.isMutedAtSource,
    })
  }

  return participantMap
}

/**
 * Creates a list of participants that's filtered for actives, includes RTC state, and is sorted.
 */
export function makeParticipantsList(
  participantsMap: Record<string, ParticipantData>,
  rtcState: RtcState,
  user: UserData
): {
  participants: ParticipantWithRTC[]
  localParticipant: ParticipantWithRTC
} {
  const remoteMedias = Object.values(rtcState.remoteMedias)
  let localParticipant: ParticipantWithRTC
  const participants = Object.entries(participantsMap)
    // filter only for active participants
    .filter(([_, p]) => p.active)
    .map(([participantId, participant]) => {
      const isLocalUser = participantId === user.id
      const media = getMediaForParticipant(rtcState, remoteMedias, participantId, isLocalUser)
      const participantWithRtc = { ...participant, media, isLocalUser }
      if (isLocalUser) {
        localParticipant = participantWithRtc
      }
      return participantWithRtc
    })
    .sort(participantsComparator)
  return {
    localParticipant,
    participants,
  }
}

function getMediaForParticipant(
  rtcState: RtcState,
  remoteMedias: RoomRTCRemoteMediaState[],
  participantId: string,
  isLocalUser: boolean
): RoomRTCLocalMediaState | RoomRTCRemoteMediaState | null {
  if (isLocalUser) {
    if (rtcState.localScreenshareMediaID) {
      return rtcState.localMedias[rtcState.localScreenshareMediaID]
    } else if (rtcState.localWebcamMediaID) {
      return rtcState.localMedias[rtcState.localWebcamMediaID]
    }
    return null
  }

  let media: RoomRTCRemoteMediaState | null = null
  for (const remoteMedia of remoteMedias) {
    if (
      remoteMedia.userID === participantId &&
      !RTCMediaFunctions.mediaIsSpectator(remoteMedia.raw.mediaType) &&
      remoteMedia.raw.mediaType !== "Voice"
    ) {
      if (!media || remoteMedia.raw.mediaType === "Screen") {
        media = remoteMedia
      }
    }
  }
  return media
}

/**
 * Sorts by:
 * 1. participants screen sharing
 * 2. participants with web cam
 * 3. participants unmuted
 * 4. the order users joined in (most recent first)
 * A higher `roomActorNumber` denotes that they've joined more recently.
 */
export function participantsComparator(a: ParticipantWithRTC, b: ParticipantWithRTC) {
  const isAScreenSharing = isScreenSharing(a.media)
  const isBScreenSharing = isScreenSharing(b.media)

  if (isAScreenSharing !== isBScreenSharing) {
    return isBScreenSharing ? 1 : -1
  }

  const isAWebcamOn = isWebcamOn(a.media)
  const isBWebcamOn = isWebcamOn(b.media)

  if (isAWebcamOn !== isBWebcamOn) {
    return isBWebcamOn ? 1 : -1
  }

  return AppStateSelectors.unmutedComparator(a, b)
}

const isScreenSharing = (media: RoomRTCMediaState | undefined) => {
  if (!media?.raw) return false
  return media.raw.mediaType === "Screen" && media.status === "connected"
}

const isWebcamOn = (media: RoomRTCMediaState | undefined) => {
  if (!media?.raw) return false
  return media.raw.mediaType === "Webcam" && media.status === "connected"
}
