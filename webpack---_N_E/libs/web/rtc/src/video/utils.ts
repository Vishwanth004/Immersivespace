import { TextureVideoSource, UpdateTextureResult } from "./texture-video-source"

export const uploadToTexture = (
  gl: WebGLRenderingContext,
  glTexture: WebGLTexture,
  src: TexImageSource,
  initialize: boolean
) => {
  gl.bindTexture(gl.TEXTURE_2D, glTexture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)

  if (initialize) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  }
}

export const updateTexture = (
  videoSource: TextureVideoSource,
  gl: WebGLRenderingContext,
  glTexture: WebGLTexture,
  width: number,
  height: number
): UpdateTextureResult => {
  if (videoSource.width <= 0 || videoSource.height <= 0) return { texture: glTexture, needsRefresh: false }

  let needsRefresh = false

  // texture can be destroyed if wasm heap needs to recreated/grow
  if (!glTexture) {
    glTexture = gl.createTexture()

    needsRefresh = true
  } else if (videoSource.width !== width || videoSource.height !== height) {
    width = videoSource.width
    height = videoSource.height

    needsRefresh = true
  }

  return { texture: glTexture, needsRefresh }
}
