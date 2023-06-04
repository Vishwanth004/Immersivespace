import { TextureVideoSource } from "./texture-video-source"
import { updateTexture, uploadToTexture } from "./utils"
import { FrameReaderInputMessage, FrameReaderMessageAction, FrameReaderOutputMessage } from "./video-processor-types"

export const tryCreateVideoProcessorSource = (mediaStream: MediaStream) => {
  let mediaProcessor: any //  actually a MediaStreamTrackProcessor - but have no ts definition
  let worker: Worker

  const dispose = () => {
    if (worker) {
      worker.terminate()
      worker = null
    }

    if (mediaProcessor) {
      mediaProcessor.readable.cancel()
      mediaProcessor = null
    }
  }

  try {
    const tracks = mediaStream.getVideoTracks()
    if (tracks && tracks.length > 0) {
      const track = tracks[0]
      if (track) {
        // check if we have access to WebCodecs api
        if ("VideoEncoder" in window) {
          mediaProcessor = new (window as any).MediaStreamTrackProcessor(track)

          worker = new Worker(new URL("./video-processor-frame-reader.worker.ts", import.meta.url))
          worker.onmessage = (e: MessageEvent<FrameReaderOutputMessage>) => {
            const bitmap = e.data.frame

            // sets up initial width and height of stream
            videoSource.width = bitmap.width
            videoSource.height = bitmap.height

            bitmap.close()
          }

          const readable = mediaProcessor.readable
          const msg: FrameReaderInputMessage = {
            type: FrameReaderMessageAction.Setup,
            payload: {
              readable,
            },
          }
          worker.postMessage(msg, [readable])
        }
      }
    }
  } catch (ex) {
    console.error("media stream processor failed setting up: ", ex)
    dispose()
  }

  if (!mediaProcessor || !worker) {
    dispose()
    return null
  }

  const videoSource: TextureVideoSource = {
    width: 0,
    height: 0,
    updateTexture: null,
    dispose,
  }

  videoSource.updateTexture = (GLctx: WebGLRenderingContext, texture: WebGLTexture, width: number, height: number) => {
    const texUpdate = updateTexture(videoSource, GLctx, texture, width, height)
    if (texUpdate.needsRefresh) {
      // replace onmessage to update the new texture
      worker.onmessage = (e) => {
        const bitmap = e.data.frame
        uploadToTexture(GLctx, texture, bitmap, false)

        videoSource.width = bitmap.width
        videoSource.height = bitmap.height

        bitmap.close()
      }
    }

    const msg: FrameReaderInputMessage = {
      type: FrameReaderMessageAction.Sample,
    }
    worker.postMessage(msg, [])
    return texUpdate
  }

  return videoSource
}
