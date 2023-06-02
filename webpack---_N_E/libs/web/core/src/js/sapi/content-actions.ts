import axios from "axios"
import saveAs from "file-saver"

import { CMSPreviewFile, CMSType, SAPILogChannel } from "@spatialsys/js/sapi/clients/sapi"
import { SAPIFileUrls } from "@spatialsys/js/sapi/types"
import {
  CONTENT_SOURCE_TYPES_NFT,
  CONTENT_TYPES_2D,
  CONTENT_TYPES_3D,
  ContentObject,
  ContentUpload,
  EXTENSION_TO_CONTENT_TYPE,
  FileTooLargeError,
  UnimplementedFileTypeError,
} from "@spatialsys/unity/bridge"
import { trackFileUploadBegin, trackFileUploadComplete, trackFileUploadFail } from "@spatialsys/web/analytics"
import { LogChannel, logger } from "@spatialsys/web/logger"
import { sapiClient } from "@spatialsys/web/sapi"

import * as Toast from "../components/toast/toast"

export enum ContentType {
  SearchOrURL,
  Note,
  FileUpload,
}

export const FileUploadLogChannel = new LogChannel("FileUpload")

const runtimePDFtypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-excel",
  "application/msword",
]

const runtimePNGtypes = ["image/tiff", "image/png"]

const runtimeGLBtypes = ["model/vnd.collada+xml", "model/spatial-fbx", "model/gltf-binary", "application/object"]

const runtimeVideoTypes = [
  "video/avi",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-flv",
  "video/x-matroska",
]

const TRACKED_UNIMPLEMENTED_FILE_TYPES = [
  // GIS
  { ext: ".shp", name: "Shapefiles" },
  { ext: ".shx", name: "Shapefiles" },
  { ext: ".dbf", name: "Shapefiles" },
  // 3D
  { ext: ".stl", name: "STL Files" },
  { ext: ".3ds", name: "3DS Files" },
  { ext: ".igs", name: "IGES Files" },
  { ext: ".iges", name: "IGES Files" },
  { ext: ".stp", name: "STEP Files" },
  { ext: ".blend", name: "Blender Files" },
  // 2D CAD
  { ext: ".dxf", name: "AutoCAD DXF Files" },
  { ext: ".dwg", name: "DWG Files" },
  // Images
  { ext: ".tiff", name: "TIFF Images" },
  { ext: ".tif", name: "TIFF Images" },
  { ext: ".heic", name: "HEIC Images" },
  { ext: ".svg", name: "SVG Vectors" },
]

/**
 * A list of all allowed types for file uploads, joined into a comma-separated string
 */
export const ALL_ALLOWED_FILE_TYPES = ["image/jpeg", ".gltf", ".zip", ".glb", ".obj", ".fbx", ".dae", ".gif"]
  .concat(
    TRACKED_UNIMPLEMENTED_FILE_TYPES.map((f) => f.ext),
    runtimePDFtypes,
    runtimeVideoTypes,
    runtimePNGtypes,
    runtimeGLBtypes,
    [".mkv"]
  )
  .join(", ")

/**
 * A list of allowed types for frames (2D assets like images, gifs, videos)
 * joined into a comma-separated string
 */
export const ALLOWED_FILE_TYPES_FOR_FRAMES = ["image/jpeg", ".gif"]
  .concat(runtimeVideoTypes, runtimePNGtypes, [".mkv"])
  .join(", ")

export function getRawContentTypeForFile(file: File) {
  const filetype = file.type.toLowerCase()
  const filename = file.name.toLowerCase()
  if (runtimePDFtypes.concat(runtimePNGtypes, runtimeVideoTypes, ["image/jpeg"]).includes(filetype)) {
    return filetype
  }

  const supportedFileExt = Object.keys(EXTENSION_TO_CONTENT_TYPE).find((ext) => filename.endsWith(ext))
  if (supportedFileExt) {
    return EXTENSION_TO_CONTENT_TYPE[supportedFileExt]
  }

  // Unimplemented but tracked
  const unimplementedFile = TRACKED_UNIMPLEMENTED_FILE_TYPES.find((f) => filename.endsWith(f.ext))
  if (unimplementedFile) {
    throw new UnimplementedFileTypeError(unimplementedFile)
  }

  throw new Error(`Unsupported file type ${filetype}`)
}

export function getRuntimeContentTypeForFile(file: File) {
  const rawContentType = getRawContentTypeForFile(file)
  if (runtimePDFtypes.includes(rawContentType)) {
    return "application/pdf"
  }

  if (runtimePNGtypes.includes(rawContentType)) {
    return "image/png"
  }

  if (runtimeGLBtypes.includes(rawContentType)) {
    return "model/gltf-binary"
  }

  if (runtimeVideoTypes.includes(rawContentType)) {
    return "video/mp4"
  }

  return rawContentType
}

export class GLTFEmbeddedResourceValidationError extends Error {
  constructor() {
    super("GLTF buffers and images must be embedded as data URIs instead of referenced externally")
  }
}

function validateFileContent(contentType, content) {
  if (contentType === "model/gltf+json") {
    const gltf = JSON.parse(content)
    const embeddedRegexp = RegExp("^data:")
    gltf.buffers?.forEach((buffer) => {
      if (buffer.uri && !embeddedRegexp.exec(buffer.uri)) {
        throw new GLTFEmbeddedResourceValidationError()
      }
    })
    gltf.images?.forEach((image) => {
      if (image.uri && !embeddedRegexp.exec(image.uri)) {
        throw new GLTFEmbeddedResourceValidationError()
      }
    })
  }
}

const FILE_UPLOAD_TIMEOUT = 5 * 60 * 1000 // 5 minutes

function uploadFileToS3(file, putUrl) {
  let toastId = null
  return axios
    .request({
      method: "PUT",
      url: putUrl,
      data: file,
      headers: {
        "Content-Type": file.type,
      },
      timeout: FILE_UPLOAD_TIMEOUT,
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total

        // check if we already displayed a toast
        if (toastId === null) {
          toastId = Toast.notifyProgress("Upload in Progress", progress)
        } else {
          Toast.update(toastId, { progress })
        }
      },
    })
    .then((data) => {
      // Upload is done!
      // The remaining progress bar will be filled up
      // The toast will be closed when the transition end
      Toast.dismiss(toastId)
      return data
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

function readFile(file, contentType, sapiFile, putUrl) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let processingToastID = null
    reader.onload = (e) => {
      const fileContent = e.target.result

      try {
        validateFileContent(contentType, fileContent)
      } catch (err) {
        reject(err)
        return
      }

      uploadFileToS3(file, putUrl)
        .then(() => {
          processingToastID = Toast.notifyNoClose("Processing...")
        })
        .then(async () => {
          const resp = await sapiClient.content.completeFileUpload(sapiFile.id)
          Toast.dismiss(processingToastID)
          if (resp.status === 202) {
            Toast.notify(`Uploaded. We need to process the file, we will notify you once it's complete.`, 6000)
            resolve(false)
          } else {
            resolve(true)
          }
        })
        .catch((err) => {
          Toast.dismiss(processingToastID)
          reject(err)
        })
    }

    reader.onabort = () => {
      Toast.notify("Aborted.")
      reject()
    }
    reader.onerror = () => {
      Toast.notify("Error reading file.")
      reject()
    }

    reader.readAsBinaryString(file)
  })
}

/*
 Uploads a single file to SAPI given idx, file, roomID, unlimitedFileSize with analytic tracking
 
 @param idx enumerated id
 @param file to upload
 @param roomID current roomID
 @param unlimitedFileSize if unlimited file size
 */
export async function createFileUpload(
  idx: number,
  file: File,
  roomID: string,
  unlimitedFileSize: boolean
): Promise<ContentObject> {
  const contentType = getRawContentTypeForFile(file)
  let runtimeContentType = getRuntimeContentTypeForFile(file)
  try {
    trackFileUploadBegin(contentType, file.size)

    logger.info(FileUploadLogChannel, `File Uploaded with type ${contentType} and runtime type ${runtimeContentType}`)

    const maxSizeAllowed = ContentUpload.getMaxSizeInMbForContentType(runtimeContentType)
    if (!unlimitedFileSize && file.size > maxSizeAllowed * 1000000) {
      throw new FileTooLargeError(contentType, maxSizeAllowed)
    }

    const resp = await sapiClient.content.createFileUpload(file.name, file.size, roomID, contentType)
    const {
      fileUrls: { putUrl },
      file: sapiFile,
    } = resp

    try {
      await readFile(file, contentType, sapiFile, putUrl)
      trackFileUploadComplete(contentType, file.size)

      if (contentType === "application/zip") {
        // if uploaded a zip, get the file back from sapi, to determine what the processed file runtime content type is
        // processed files for zip are currently only being used for model files and this should be a glb
        const uploadedFile = await sapiClient.content.getFile(sapiFile.id)
        runtimeContentType = uploadedFile.fileUrls.getUrlFileType
      }

      return {
        contentId: sapiFile.id,
        contentName: sapiFile.name,
        contentType: "",
        contentSourceType: "DIRECT_UPLOAD",
        mimeType: runtimeContentType,
      }
    } catch (err) {
      logger.error(FileUploadLogChannel, `Error uploading file. Error: ${err}`)

      await sapiClient.content.failedFileUpload(sapiFile.id)
      throw err
    }
  } catch (e) {
    if (e instanceof GLTFEmbeddedResourceValidationError) {
      trackFileUploadFail(contentType, file.size, "Contained Non-Embedded Resources")
    } else if (e instanceof UnimplementedFileTypeError) {
      trackFileUploadFail(e.fileTypeName, file.size, "Unimplemented Type")
    } else if (e instanceof FileTooLargeError) {
      trackFileUploadFail(e.contentType, file.size, "Too Large")
    } else {
      trackFileUploadFail(file.type, file.size, "Error")
    }
    throw e
  }
}

/**
 * Downloads a file at a specified url
 *
 * @param url URL to be downloaded. Make sure it has the right CORS headers or else you will get error.
 * @param filename Default name that will be saved to user's hard drive. Note this may not actually be the final file name.
 * @param cb Callback once it's done downloading/erroring
 */
export async function downloadUrl(url: string, filename: string) {
  try {
    if (!url) {
      throw new Error(`URL is falsy: ${url}`)
    }

    const res = await fetch(url)
    return await saveAs(await res.blob(), filename)
  } catch (err) {
    logger.error(SAPILogChannel, `User failed to download content (to be named ${filename}) from ${url}:`, err)
    throw err
  }
}

// the types of content that come from integrations
export type CMSIntegrationsType = Exclude<
  CMSType,
  "recent" | "photo" | "stuff" | "roomTemplates" | "environment" | "files"
>

export interface CMSPage {
  fileList: CMSPreviewFile[]
  nextCursor: number
}

export interface CMSPages {
  pageParams: any[]
  pages: CMSPage[]
}

export const cmsPreviewFileToContentObject = (file: CMSPreviewFile): ContentObject => {
  return {
    contentId: file.id,
    contentName: file.name,
    contentType: file.contentType,
    contentSourceType: file.contentSourceType,
  }
}

export const has2dObjects = (files: ContentObject[]) => {
  return files.filter(
    (file) =>
      CONTENT_TYPES_2D.includes(file.contentType) ||
      CONTENT_TYPES_2D.includes(file.mimeType) ||
      CONTENT_SOURCE_TYPES_NFT.includes(file.contentSourceType)
  ).length
}

export const is2dObject = (file: CMSPreviewFile) => {
  return CONTENT_TYPES_2D.includes(file.contentType) || CONTENT_SOURCE_TYPES_NFT.includes(file.contentSourceType)
}

export const has3dObjects = (files: ContentObject[]) => {
  return files.filter((file) => CONTENT_TYPES_3D.includes(file.contentType) || CONTENT_TYPES_3D.includes(file.mimeType))
    .length
}

export const parsedFilesToContents = (files: CMSPreviewFile[]): ContentObject[] => {
  return Object.values(files).map((item) => cmsPreviewFileToContentObject(item))
}

export type DownloadUrls = Pick<SAPIFileUrls, "getUrl" | "modelCompressedUrl" | "modelLowResUrl" | "thumbnailUrl">

/**
 * Gets available download URLs for an asset
 */
export const getDownloadUrlsForAsset = async (assetUrl: string): Promise<DownloadUrls> => {
  if (!assetUrl.startsWith("spatialcontent://")) {
    return { getUrl: assetUrl }
  } else {
    const fileInfo = await sapiClient.content.getFile(assetUrl.replace("spatialcontent://", ""))
    return fileInfo.fileUrls
  }
}

type GetUrlToUseParams = {
  /** The download URLs object */
  urls: DownloadUrls
  /** Denotes whether the URL points to an image */
  isImage: boolean
  maxImageSize?: number
  /**
   * If true, will try to use compressed URLs wherever possible. Will use
   * thumbnail URL for images, and `modelCompressedUrl` for models
   */
  shouldUseCompression?: boolean
  /**
   * If true, will try to use compressed URLs wherever possible. Will use
   * thumbnail URL for images, and `lowResUrl` for models
   */
  shouldUseLowRes?: boolean
}

/**
 * Returns the download URL to use based on given parameteres
 */
export const getUrlToUse = ({
  urls,
  isImage,
  shouldUseCompression,
  shouldUseLowRes,
  maxImageSize = 512,
}: GetUrlToUseParams) => {
  if (shouldUseCompression || shouldUseLowRes) {
    if (isImage) {
      if (urls.thumbnailUrl) {
        const url = new URL(urls.thumbnailUrl)
        url.searchParams.set("width", `${maxImageSize}`)
        url.searchParams.set("height", `${maxImageSize}`)
        return url.toString()
      }
      return urls.getUrl
    }

    if (shouldUseLowRes && urls.modelLowResUrl) {
      return urls.modelLowResUrl
    }

    return urls.modelCompressedUrl ?? urls.getUrl
  }

  return urls.getUrl
}
