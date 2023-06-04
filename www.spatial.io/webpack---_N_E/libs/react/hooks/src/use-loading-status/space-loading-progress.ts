import { RoomSessionStatus } from "@spatialsys/unity/app-state"

import { LoadingProgressPhase } from "./use-loading-progress"

type UnityDownloadStatus = {
  done: boolean
  progress: number
}

type LoadingStatusData = {
  /**
   * Undefined if Unity doesn't need to be downloaded (i.e. mobile app).
   */
  unityDownload?: UnityDownloadStatus
  /**
   * Undefined if Unity is already booted before loading space (i.e. mobile app).
   */
  unityAppStateLoaded?: boolean
  roomSessionStatus: RoomSessionStatus
  environmentLoadProgress?: number
}

type PhaseBuilder = (props: LoadingStatusData) => LoadingProgressPhase | undefined

const phaseBuilders: PhaseBuilder[] = [
  // downloading Unity
  ({ unityDownload }) =>
    unityDownload && {
      key: "downloading Unity",
      progress: unityDownload.progress,
      weight: 0.2,
      fakeProgressTimeMs: 0,
    },
  // booting Unity
  ({ unityDownload, unityAppStateLoaded }) =>
    unityAppStateLoaded === undefined
      ? undefined
      : {
          key: "booting Unity",
          progress: unityAppStateLoaded ? 1 : 0,
          weight: 0.1,
          fakeProgressTimeMs: unityDownload?.done === false ? 0 : 8000,
        },
  // joining room
  ({ unityAppStateLoaded, roomSessionStatus }) => {
    const isJoining =
      unityAppStateLoaded === false ||
      roomSessionStatus === RoomSessionStatus.NotConnected ||
      roomSessionStatus === RoomSessionStatus.RequestingToJoin ||
      roomSessionStatus === RoomSessionStatus.Joining ||
      roomSessionStatus === RoomSessionStatus.SessionSetup
    return {
      key: "joining room",
      progress: isJoining ? 0 : 1,
      weight: 0.1,
      fakeProgressTimeMs: unityAppStateLoaded === false ? 0 : 3000,
    }
  },
  ({ environmentLoadProgress }) => {
    return {
      key: "loading environment",
      progress: environmentLoadProgress ?? 0,
      weight: 0.6,
      fakeProgressTimeMs: 0,
    }
  },
]

/*
 * Calculates different phases of the progress for loading a space.
 * @returns A list of phases. Intended to be passed into useLoadingProgress to obtain the overall progress.
 */
export function getSpaceLoadingProgressPhases(data: LoadingStatusData) {
  return phaseBuilders.map((builder) => builder(data)).filter((phase) => phase) as LoadingProgressPhase[]
}
