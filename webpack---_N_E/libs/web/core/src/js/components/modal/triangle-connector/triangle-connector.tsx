import classes from "./triangle-connector.module.scss"

/** Calculates the amount to shift the triangle connector by (in the horizontal direction)
 * currentItemIndex is 1-indexed
 */
export const calculateXOffset = (totalItems: number, currentItemIndex: number, offsetWidth: number) => {
  if (currentItemIndex <= 0) {
    return 0
  } else {
    const isEven = totalItems % 2 === 0
    const midpoint = isEven ? (totalItems + 1.0) / 2 : Math.ceil(totalItems / 2)

    const numOffsetSlots = currentItemIndex - midpoint
    const offsetValue = numOffsetSlots * offsetWidth

    return offsetValue
  }
}

interface TriangleConnectorProps {
  /** Amount to shift the triangle by in pixels */
  leftOffset?: number
}

/**
 * Renders the triangle connector that connects the top dock to the modal
 * This cannot be attached directly to the top dock, or there will be z-index issues because the modal is attached as a React Portal and applies an overlay
 * meaning either the top dock will be covered, or the modal will be covered by this triangle.
 *
 * Thus, the triangle is rendered separately, by the child modal itself, also allowing for it to be programmatically hidden
 *  */
const TriangleConnector = ({ leftOffset = 0 }: TriangleConnectorProps) => {
  return (
    <div
      className={classes.triangleconnector}
      style={{
        transform: `${`translateX(${leftOffset + "px"})`} `,
      }}
    />
  )
}

export default TriangleConnector
