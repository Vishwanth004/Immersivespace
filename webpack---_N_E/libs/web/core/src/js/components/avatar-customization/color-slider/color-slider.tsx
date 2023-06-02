import { Colord, colord } from "colord"
import { range, round } from "lodash"
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo, useCallback, useMemo, useState } from "react"

import { lerp } from "@spatialsys/web/core/js/util/math"

const STEP_SIZE = 0.01

/**
 *
 * @param colorGradient The list of colors to use (the gradient)
 * @param fraction A number from 0 to 1
 * @returns The color interpolated along the gradient
 */
export const getColorInGradient = (colorGradient: Colord[], fraction: number) => {
  const lengthMinusOne = colorGradient.length - 1
  const colorsRgba = colorGradient.map((color) => color.rgba)

  const lerpingStartIndex = Math.min(colorGradient.length - 1, Math.floor(fraction * lengthMinusOne)) // start index of color to be lerping
  const lerpAlpha = fraction * lengthMinusOne - lerpingStartIndex // how far in the section it is

  const colorAtStartIndex = colorsRgba[lerpingStartIndex]
  const nextIndex = Math.min(lerpingStartIndex + 1, colorGradient.length - 1)
  const colorAtNextIndex = colorsRgba[nextIndex]

  // Get the exact color to use by lerping
  const newColorObj = {
    r: lerp(colorAtStartIndex.r, colorAtNextIndex.r, lerpAlpha),
    g: lerp(colorAtStartIndex.g, colorAtNextIndex.g, lerpAlpha),
    b: lerp(colorAtStartIndex.b, colorAtNextIndex.b, lerpAlpha),
    a: 1,
  }
  const newColor = colord(newColorObj)
  return newColor
}

/**
 * Gets the initial slider position by matching the currently selected color (hex string) to a possible color value on
 * the slider. If there is no match, defaults to 0.5.
 *
 * @param colorGradient The list of colors to use (the gradient)
 * @param selectedColorHex The current selected color, in hex format. If undefined, this function
 * always returns 0.5
 * @returns A number from 0 to 1, representing the initial position of the slider
 */
const getInitialSliderPosition = (colorGradient: Colord[], selectedColorHex?: string) => {
  if (!selectedColorHex) {
    return 0.5
  }

  const steps = range(0, 1 + STEP_SIZE, STEP_SIZE).map((x) => round(x, 2))
  for (let i = 0; i < steps.length; i++) {
    const color = getColorInGradient(colorGradient, steps[i])

    if (color.toHex() === selectedColorHex) {
      return steps[i]
    }
  }

  return 0.5
}

export interface ColorSliderProps {
  /** A list of colors to use, they should be ordered from brightest to darkest */
  colors: Colord[]
  /** Current color, in hex */
  currentColor?: string
  cssVarName?: string
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  onColorChange: (color: Colord) => void
}

export const ColorSlider = memo(function (props: ColorSliderProps) {
  const { colors, cssVarName, currentColor, onColorChange, inputProps } = props

  const [initialSliderValue] = useState(() => getInitialSliderPosition(colors, currentColor))
  const { startingColor } = useMemo(() => {
    const startingColor = colors[Math.floor(colors.length / 2)].toHex()
    return {
      startingColor,
    }
  }, [colors])

  const handleColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newFraction = e.target.valueAsNumber
      const newColor = getColorInGradient(colors, newFraction)
      onColorChange(newColor)
    },
    [colors, onColorChange]
  )

  return (
    <input
      style={{ [cssVarName]: currentColor ?? startingColor }}
      type="range"
      min="0"
      max="1"
      step={STEP_SIZE}
      defaultValue={initialSliderValue}
      onChange={handleColorChange}
      {...inputProps}
    />
  )
})
