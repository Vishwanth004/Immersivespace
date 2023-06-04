import { InfiniteSlider, InfiniteSliderProps } from "../infinite-slider/infinite-slider"
import { NumberInput, NumberInputProps } from "../number-input/number-input"

import classes from "./slider-with-input.module.scss"

type SliderWithInputProps = InfiniteSliderProps & NumberInputProps

export function SliderWithInput(props: SliderWithInputProps) {
  return (
    <div className={classes.container}>
      <InfiniteSlider {...props} />
      <NumberInput {...props} />
    </div>
  )
}
