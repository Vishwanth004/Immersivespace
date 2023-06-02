import { PanInfo, m, useDragControls } from "framer-motion"
import { memo, useCallback, useRef, useState } from "react"
import { useMeasure } from "react-use"

import { normalizeBetweenTwoRanges } from "@spatialsys/web/core/js/util/math"

import classes from "./infinite-slider.module.scss"

type LinearInfiniteSliderProps = {
  onChange: (value: number, prevValue: number) => void
  value: number
  /**
   * Change that corresponds to dragging slider thumb from center to right end.
   */
  visibleRange: number
}

/**
 * Quadratic (but keeps sign) if in [-1, 1] to make the slider more accurate near the center.
 * Linear if outside [-1, 1].
 * @param offset The offset from the center of the slider.
 */
const adjustOffset = (offset: number) => {
  return offset * Math.min(Math.abs(offset), 1)
}

function LinearInfiniteSlider(props: LinearInfiniteSliderProps) {
  const { onChange, visibleRange, value } = props
  const sliderRef = useRef<HTMLDivElement>(null)
  const [measureRef, { width }] = useMeasure()
  const [initialValue, setInitialValue] = useState(0)
  const [prevValue, setPrevValue] = useState<number | null>(null)

  const dragControls = useDragControls()

  const ref = useCallback(
    (node: HTMLDivElement) => {
      measureRef(node)
      sliderRef.current = node
    },
    [measureRef]
  )

  const handleClickSlider = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setInitialValue(value)
      setPrevValue(value)
      dragControls.start(e)
      // Prevent text selection
      e.preventDefault()
    },
    [dragControls, value]
  )

  const handleDrag = useCallback(
    (_, info: PanInfo) => {
      // Normalize the offset from [-width / 2, width / 2] to [-1, 1]
      // Note that overflow is allowed when dragging the slider thumb outside the slider track
      const normalizedOffset = normalizeBetweenTwoRanges(info.offset.x, -width / 2, width / 2, -1, 1)
      const newValue = initialValue + visibleRange * adjustOffset(normalizedOffset)
      if (newValue !== prevValue) {
        onChange(newValue, prevValue)
        setPrevValue(newValue)
      }
    },
    [initialValue, onChange, prevValue, visibleRange, width]
  )

  return (
    <div className={classes.slider} ref={ref} onPointerDown={handleClickSlider}>
      <div className={classes.sliderTrack} />
      <m.div
        className={classes.sliderThumb}
        drag="x"
        dragConstraints={sliderRef}
        dragElastic={0}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
        dragSnapToOrigin
        dragControls={dragControls}
        dragListener={false}
        onDrag={handleDrag}
      />
    </div>
  )
}

type LogarithmicInfiniteSliderProps = LinearInfiniteSliderProps & {
  base?: number
}

function LogarithmicInfiniteSlider(props: LogarithmicInfiniteSliderProps) {
  const { onChange, value, base = 10, ...rest } = props

  const sign = Math.sign(value)
  const absValue = Math.abs(value)
  const logValue = Math.log(absValue) / Math.log(base)
  const handleChange = useCallback(
    (logValue: number, logPrevValue: number) => {
      onChange(sign * base ** logValue, sign * base ** logPrevValue)
    },
    [base, onChange, sign]
  )

  return <LinearInfiniteSlider {...rest} value={logValue} onChange={handleChange} />
}

export type InfiniteSliderProps =
  | (LinearInfiniteSliderProps & {
      scale?: "linear"
    })
  | (LogarithmicInfiniteSliderProps & {
      scale: "logarithmic"
    })

export const InfiniteSlider = memo(function InfiniteSlider(props: InfiniteSliderProps) {
  const { scale = "linear", ...rest } = props
  if (scale === "logarithmic") {
    return <LogarithmicInfiniteSlider {...rest} />
  } else {
    return <LinearInfiniteSlider {...rest} />
  }
})
