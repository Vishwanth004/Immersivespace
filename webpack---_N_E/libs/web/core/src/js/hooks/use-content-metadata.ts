import * as Sentry from "@sentry/nextjs"

import { ObjectType } from "@spatialsys/react/analytics"
import { AppStateSelectors, ImageState, ModelState, VideoPlayerState } from "@spatialsys/unity/app-state"
import { useAppContext } from "@spatialsys/web/app-context"

/**
 * Gets the metaData for NFTs and non-NFTs from unityAppState
 */
export const useContentMetadata = (objectId: number) => {
  const { fileId, fileName, objectType } = useAppContext((context) => {
    const scene = context.state.unity.appState.roomSession.sharedState.scene
    const spaceId = context.state.unity.appState.roomSession.roomID
    const isObjectImage = AppStateSelectors.isVideo(context.state.unity.appState, objectId)

    const isObjectVideo = AppStateSelectors.isImage(context.state.unity.appState, objectId)
    const is3dObject = AppStateSelectors.isModelObject(context.state.unity.appState, objectId)

    let object: ImageState | VideoPlayerState | ModelState
    let fileName: string | null = null

    let objectType: ObjectType | null = null
    if (isObjectImage) {
      object = scene.images[objectId]
      objectType = ObjectType.Image
    } else if (isObjectVideo) {
      object = scene.videoPlayers[objectId]
      objectType = ObjectType.Video
    } else if (is3dObject) {
      object = scene.models[objectId]
      fileName = object?.fileName
      objectType = ObjectType.Object
    } else {
      Sentry.withScope((scope) => {
        scope.setTag("spaceId", spaceId)
        Sentry.captureMessage(`Unexpected objectType in useContentMetadata objectId: ${objectId} spaceId: ${spaceId}`)
      })
    }

    return { fileId: object?.url.split("//")[1], fileName, objectType }
  })
  const contentMetaData = useAppContext((context) => context.state.unity.appState.contentMetaDataCache[fileId])
  const isLoading = Boolean(!contentMetaData)

  return { contentMetaData, isLoading, fileName, objectType }
}
