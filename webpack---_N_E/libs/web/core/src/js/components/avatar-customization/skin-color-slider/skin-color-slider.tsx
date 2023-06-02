import { colord } from "colord"
import { memo } from "react"

import {
  ColorSlider,
  ColorSliderProps,
} from "@spatialsys/web/core/js/components/avatar-customization/color-slider/color-slider"
import cssVars from "@spatialsys/web/core/js/components/avatar-customization/variables.module.scss"

import classes from "./skin-color-slider.module.scss"

// Hardcoded skin tones, from lightest to darkest
// On dev, the formatter adds spaces to the list, but on prod, the spaces are trimmed after minifying
export const skinColors = cssVars.skinColorGradient.replace(/\s/g, "").split(",").map(colord)
const CSS_VAR_NAME = cssVars.currSkinColorCssVar

type SkinColorSliderProps = Pick<ColorSliderProps, "currentColor" | "onColorChange">

export const SkinColorSlider = memo(function (props: SkinColorSliderProps) {
  const { currentColor, onColorChange } = props

  return (
    <ColorSlider
      cssVarName={CSS_VAR_NAME}
      colors={skinColors}
      currentColor={currentColor}
      inputProps={{ className: classes.slider }}
      onColorChange={onColorChange}
    />
  )
})
