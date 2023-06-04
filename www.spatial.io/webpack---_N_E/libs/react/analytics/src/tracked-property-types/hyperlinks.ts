export enum ObjectType {
  Portal = "Portal",
  Image = "Image",
  Video = "Video",
  Object = "Object",
}

export type HyperlinkProperties = {
  host: string
  url: string //TODO: DEV-11950 change to URL type when we only accept valid URLs
  title?: string
  objectType: ObjectType
  creator?: string
  description?: string
  isPlaqueVisible?: boolean
}

export function getObjectType(isObjectImage: boolean, isObjectVideo: boolean): ObjectType {
  if (isObjectImage) {
    return ObjectType.Image
  } else if (isObjectVideo) {
    return ObjectType.Video
  } else {
    return ObjectType.Object
  }
}

export function getUrlHost(link: string) {
  try {
    if (!link) {
      return null
    }

    return new URL(link).host
  } catch (err) {
    return null
  }
}
