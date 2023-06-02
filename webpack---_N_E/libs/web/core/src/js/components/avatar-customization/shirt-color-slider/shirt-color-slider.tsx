import { colord } from "colord"
import { memo } from "react"

import {
  ColorSlider,
  ColorSliderProps,
} from "@spatialsys/web/core/js/components/avatar-customization/color-slider/color-slider"
import cssVars from "@spatialsys/web/core/js/components/avatar-customization/variables.module.scss"

import classes from "./shirt-color-slider.module.scss"

// On dev, the formatter adds spaces to the list, but on prod, the spaces are trimmed after minifying
export const shirtColors = cssVars.shirtColorGradient.replace(/\s/g, "").split(",").map(colord)
const CSS_VAR_NAME = cssVars.currShirtColorCssVar

type ShirtColorSliderProps = Pick<ColorSliderProps, "currentColor" | "onColorChange">

export const ShirtColorSlider = memo(function (props: ShirtColorSliderProps) {
  const { currentColor, onColorChange } = props

  return (
    <ColorSlider
      cssVarName={CSS_VAR_NAME}
      colors={shirtColors}
      currentColor={currentColor}
      inputProps={{ className: classes.slider }}
      onColorChange={onColorChange}
    />
  )
})
