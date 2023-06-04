export class FileTooLargeError extends Error {
  contentType: string
  maxSizeAllowed: number
  constructor(contentType: string, maxSizeAllowed: number) {
    super(`File is too large. Limit for ${contentType} is ${maxSizeAllowed}MB`)
    this.contentType = contentType
    this.maxSizeAllowed = maxSizeAllowed
  }
}

export class UnimplementedFileTypeError extends Error {
  fileExt: string
  fileTypeName: string
  constructor(fileType: { ext: string; name: string }) {
    super(`Sorry, we have not yet added support for ${fileType.name}.`)
    this.fileExt = fileType.ext
    this.fileTypeName = fileType.name
  }
}

export enum EXTENSION_TO_CONTENT_TYPE {
  avi = "video/avi", // non-conventional... but this is what SAPI provides.
  dae = "application/collada+xml",
  doc = "application/msword",
  docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  fbx = "model/spatial-fbx",
  gif = "image/gif",
  glb = "model/gltf-binary",
  gltf = "model/gltf+json",
  jpeg = "image/jpeg",
  jpg = "image/jpeg",
  mkv = "video/x-matroska",
  mov = "video/quicktime",
  mp4 = "video/mp4",
  obj = "application/object",
  pcd = "model/pcd",
  pdf = "application/pdf",
  ply = "model/ply",
  png = "image/png",
  ppt = "application/vnd.ms-powerpoint",
  pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  tif = "image/tiff",
  tiff = "image/tiff",
  webm = "video/webm",
  xls = "application/vnd.ms-excel",
  xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  zip = "application/zip",
}

export const CONTENT_TYPES_2D = [
  "GIF",
  "IMAGE",
  "VIDEO",
  "IMAGE_COLLECTION",
  EXTENSION_TO_CONTENT_TYPE.avi,
  EXTENSION_TO_CONTENT_TYPE.doc,
  EXTENSION_TO_CONTENT_TYPE.docx,
  EXTENSION_TO_CONTENT_TYPE.gif,
  EXTENSION_TO_CONTENT_TYPE.jpeg,
  EXTENSION_TO_CONTENT_TYPE.mkv,
  EXTENSION_TO_CONTENT_TYPE.mov,
  EXTENSION_TO_CONTENT_TYPE.mp4,
  EXTENSION_TO_CONTENT_TYPE.png,
  EXTENSION_TO_CONTENT_TYPE.ppt,
  EXTENSION_TO_CONTENT_TYPE.pptx,
  EXTENSION_TO_CONTENT_TYPE.tif,
  EXTENSION_TO_CONTENT_TYPE.webm,
  EXTENSION_TO_CONTENT_TYPE.xls,
  EXTENSION_TO_CONTENT_TYPE.xlsx,
]

export const CONTENT_TYPES_3D = [
  "3D_MODEL",
  EXTENSION_TO_CONTENT_TYPE.fbx,
  EXTENSION_TO_CONTENT_TYPE.pcd,
  EXTENSION_TO_CONTENT_TYPE.ply,
  EXTENSION_TO_CONTENT_TYPE.obj,
  EXTENSION_TO_CONTENT_TYPE.glb,
  EXTENSION_TO_CONTENT_TYPE.gltf,
]

export const CONTENT_SOURCE_TYPES_NFT = ["OPENSEA_ASSET"]

export class ContentUpload {
  static readonly TRACKED_UNIMPLEMENTED_FILE_TYPES = [
    // GIS
    { ext: ".dbf", name: "Shapefiles" },
    { ext: ".shp", name: "Shapefiles" },
    { ext: ".shx", name: "Shapefiles" },
    // 3D
    { ext: ".3ds", name: "3DS Files" },
    { ext: ".blend", name: "Blender Files" },
    { ext: ".iges", name: "IGES Files" },
    { ext: ".igs", name: "IGES Files" },
    { ext: ".stl", name: "STL Files" },
    { ext: ".stp", name: "STEP Files" },
    { ext: ".usda", name: "USDA Files" },
    { ext: ".usdc", name: "USDC Files" },
    { ext: ".usdz", name: "USDZ Files" },
    // 2D CAD
    { ext: ".dxf", name: "AutoCAD DXF Files" },
    { ext: ".dwg", name: "DWG Files" },
  ]

  // Should match limits in SpatialUnity/Assets/SpatialSys/Client/ContentLoader/Loaders/DownloadSizeLimits.cs
  static getMaxSizeInMbForContentType(contentType: string): number {
    const MAX_IMAGE_SIZE = 10
    const MAX_VIDEO_SIZE = 1000
    const MAX_PDF_SIZE = 100
    const MAX_MODEL_SIZE = 100
    const MAX_PCD_SIZE = 10
    const MAX_ZIP_SIZE = 500

    switch (contentType) {
      case EXTENSION_TO_CONTENT_TYPE.jpeg:
      case EXTENSION_TO_CONTENT_TYPE.png:
      case EXTENSION_TO_CONTENT_TYPE.tiff:
        return MAX_IMAGE_SIZE

      case EXTENSION_TO_CONTENT_TYPE.avi:
      case EXTENSION_TO_CONTENT_TYPE.gif:
      case EXTENSION_TO_CONTENT_TYPE.mkv:
      case EXTENSION_TO_CONTENT_TYPE.mov:
      case EXTENSION_TO_CONTENT_TYPE.mp4:
      case EXTENSION_TO_CONTENT_TYPE.webm:
        return MAX_VIDEO_SIZE

      case EXTENSION_TO_CONTENT_TYPE.doc:
      case EXTENSION_TO_CONTENT_TYPE.docx:
      case EXTENSION_TO_CONTENT_TYPE.pdf:
      case EXTENSION_TO_CONTENT_TYPE.ppt:
      case EXTENSION_TO_CONTENT_TYPE.pptx:
      case EXTENSION_TO_CONTENT_TYPE.xls:
      case EXTENSION_TO_CONTENT_TYPE.xlsx:
        return MAX_PDF_SIZE

      case EXTENSION_TO_CONTENT_TYPE.dae:
      case EXTENSION_TO_CONTENT_TYPE.fbx:
      case EXTENSION_TO_CONTENT_TYPE.obj:
      case EXTENSION_TO_CONTENT_TYPE.ply:
      case EXTENSION_TO_CONTENT_TYPE.glb:
      case EXTENSION_TO_CONTENT_TYPE.gltf:
        return MAX_MODEL_SIZE

      case EXTENSION_TO_CONTENT_TYPE.pcd:
        return MAX_PCD_SIZE

      case EXTENSION_TO_CONTENT_TYPE.zip:
        return MAX_ZIP_SIZE

      default:
        return 0
    }
  }

  static getAllowedUploadTypes(): string[] {
    const allowedFileTypes: string[] = Object.values(EXTENSION_TO_CONTENT_TYPE)

    // Unimplemented types that we still want to track:
    allowedFileTypes.concat(this.TRACKED_UNIMPLEMENTED_FILE_TYPES.map((f) => f.ext))

    return allowedFileTypes
  }

  // TODO: Share SAPI calls and content upload logic across web and mobile
  // https://linear.app/spatial/issue/DEV-5083/share-sapi-calls-across-web-and-mobile

  static getContentTypeForBroadcast(contentType: string) {
    // This should match the list that webapp uses at SAPI/lib/dto/common_types.go
    switch (contentType) {
      case EXTENSION_TO_CONTENT_TYPE.avi:
        return "video/avi"
      case EXTENSION_TO_CONTENT_TYPE.dae:
        return "model/vnd.collada+xml"
      case EXTENSION_TO_CONTENT_TYPE.fbx:
        return "model/gltf-binary"
      case EXTENSION_TO_CONTENT_TYPE.doc:
      case EXTENSION_TO_CONTENT_TYPE.docx:
      case EXTENSION_TO_CONTENT_TYPE.pdf:
      case EXTENSION_TO_CONTENT_TYPE.ppt:
      case EXTENSION_TO_CONTENT_TYPE.pptx:
      case EXTENSION_TO_CONTENT_TYPE.xls:
      case EXTENSION_TO_CONTENT_TYPE.xlsx:
        return "spatial-collection"
      default:
        return contentType
    }
  }

  static getContentTypeForFilename(filename: string) {
    const fileExtension = filename.split(".").pop()?.toLowerCase() ?? ""
    const fileType = EXTENSION_TO_CONTENT_TYPE[fileExtension as keyof typeof EXTENSION_TO_CONTENT_TYPE]

    if (fileType) {
      return fileType
    }

    // Unimplemented but tracked
    const unimplementedFile = this.TRACKED_UNIMPLEMENTED_FILE_TYPES.find((f) => filename.endsWith(f.ext))
    if (unimplementedFile) {
      throw new UnimplementedFileTypeError(unimplementedFile)
    }

    throw new Error("Unsupported file type")
  }

  static getFileExtensionForContentType(contentType: string) {
    for (const [entryExtension, entryContentType] of Object.entries(EXTENSION_TO_CONTENT_TYPE)) {
      if (entryContentType === contentType) {
        return entryExtension
      }
    }

    // Fall back to the second part of the content type
    const contentTypeComponents = contentType.split("/")
    if (contentTypeComponents.length > 1) {
      return contentTypeComponents[1]
    } else {
      return contentType
    }
  }
}
