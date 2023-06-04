import { RTCMediaRegionState } from "../rtc-state"

/**
 * Gets the css style properties to crop a regioned rtc video feed
 */
export const calculateRTCRegionStyle = (region: RTCMediaRegionState): React.CSSProperties => {
  if (!region) return null

  const mediaWidth = region.width / region.widthRatio
  const mediaHeight = region.height / region.heightRatio

  let w = region.width
  let h = region.height
  let x = region.x
  let y = region.y

  // crops to a square, to fit better into the circle with proper aspect ratio
  if (w > h) {
    const aspect = h / w
    w = h
    x += aspect * h * 0.25
  } else if (h > w) {
    const aspect = w / h
    h = w
    y += aspect * w * 0.25
  }

  x = x / mediaWidth
  w = w / mediaWidth
  y = y / mediaHeight
  h = h / mediaHeight

  const width = (1.0 / w) * 100
  const height = (1.0 / h) * 100
  const marginLeft = -x * width
  const marginTop = -y * height

  return {
    width: `${width}%`,
    height: `${height}%`,
    marginLeft: `${marginLeft}%`,
    marginTop: `${marginTop}%`,
    objectFit: "unset",
  }
}
