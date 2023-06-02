import { TextureVideoSource } from "./texture-video-source"
import { updateTexture, uploadToTexture } from "./utils"

export const createVideoElementSource = (video: HTMLVideoElement): TextureVideoSource => {
  const videoSource: TextureVideoSource = {
    width: 0,
    height: 0,
    updateTexture: null,
    dispose: null,
  }

  videoSource.updateTexture = (GLctx: WebGLRenderingContext, texture: WebGLTexture, width: number, height: number) => {
    if (!video || video.paused) return { texture, needsRefresh: false }

    videoSource.width = video.videoWidth
    videoSource.height = video.videoHeight

    const texUpdate = updateTexture(videoSource, GLctx, texture, width, height)

    uploadToTexture(GLctx, texUpdate.texture, video, texUpdate.needsRefresh)
    return texUpdate
  }
  videoSource.dispose = () => {
    if (video) {
      video.srcObject = null
      video.remove()
    }
  }
  return videoSource
}
