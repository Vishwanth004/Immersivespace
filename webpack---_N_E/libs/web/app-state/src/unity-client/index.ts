import { Patch, applyPatches, enablePatches, produce } from "immer"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { AppState as UnityAppState, emptyAppState } from "@spatialsys/unity/app-state"
import { VersionData } from "@spatialsys/web/config"

// We use immer's feature for creating or applying state patches immutably in the reducer.
enablePatches()

export type UnityClientState = {
  appState: UnityAppState
  appStateLoaded: boolean
  buildUrlBase: string
  downloadState: DownloadState
  initializationProgress: number
  /**
   * If true, will begin downloading Unity
   */
  shouldDownload: boolean
  version: VersionState | null
}

export enum DownloadState {
  NotStarted,
  InProgress,
  Done,
}

export type VersionSource = "config" | "localStorage" | "localUnityBuild" | "treatment"

export interface VersionState {
  isCompressed: boolean
  source: VersionSource
  urlBase: string
  versionData: VersionData
}

export const createInitialUnityState = (): UnityClientState => {
  return {
    appState: emptyAppState,
    appStateLoaded: false,
    shouldDownload: false,
    buildUrlBase: "",
    downloadState: DownloadState.NotStarted,
    initializationProgress: 0,
    version: null,
  }
}

export enum UnityClientActionType {
  PatchAppState = "PatchAppState",
  SetShouldDownloadUnity = "SetShouldDownloadUnity",
  SetUnityAppState = "SetUnityAppState",
  SetUnityDownloadState = "SetUnityDownloadState",
  SetUnityInitializationProgress = "SetUnityInitializationProgress",
  SetVersion = "SetVersion",
}

export type PatchAppState = ActionT<UnityClientActionType.PatchAppState, Patch[]>
export type SetShouldDownloadUnity = ActionT<UnityClientActionType.SetShouldDownloadUnity, boolean>
export type SetUnityAppState = ActionT<UnityClientActionType.SetUnityAppState, UnityAppState>
export type SetUnityDownloadState = ActionT<UnityClientActionType.SetUnityDownloadState, DownloadState>
export type SetUnityInitializationProgress = ActionT<UnityClientActionType.SetUnityInitializationProgress, number>
export type SetVersion = ActionT<UnityClientActionType.SetVersion, VersionState>

export const UnityClientActions = {
  patchAppState: makeActionCreator<PatchAppState>(UnityClientActionType.PatchAppState),
  setUnityAppState: makeActionCreator<SetUnityAppState>(UnityClientActionType.SetUnityAppState),
  setShouldDownloadUnity: makeActionCreator<SetShouldDownloadUnity>(UnityClientActionType.SetShouldDownloadUnity),
  setUnityDownloadState: makeActionCreator<SetUnityDownloadState>(UnityClientActionType.SetUnityDownloadState),
  setUnityInitializationProgress: makeActionCreator<SetUnityInitializationProgress>(
    UnityClientActionType.SetUnityInitializationProgress
  ),
  setVersion: makeActionCreator<SetVersion>(UnityClientActionType.SetVersion),
}

export type UnityClientAction = GetActionType<typeof UnityClientActions>

export function unityClientReducer(state: UnityClientState, action: UnityClientAction): UnityClientState {
  switch (action.type) {
    case UnityClientActionType.SetShouldDownloadUnity:
      return produce(state, (draft) => void (draft.shouldDownload = action.payload))
    case UnityClientActionType.SetUnityInitializationProgress:
      return produce(state, (draft) => void (draft.initializationProgress = action.payload))
    case UnityClientActionType.SetUnityDownloadState:
      return produce(state, (draft) => void (draft.downloadState = action.payload))
    case UnityClientActionType.SetVersion:
      return produce(state, (draft) => {
        draft.version = action.payload
        draft.buildUrlBase = action.payload.urlBase
      })
    case UnityClientActionType.SetUnityAppState:
      return produce(state, (draft) => {
        draft.appState = action.payload
        draft.appStateLoaded = true
      })
    case UnityClientActionType.PatchAppState:
      return {
        ...state,
        appState: applyPatches(state.appState, action.payload),
      }
    default:
      return state
  }
}
