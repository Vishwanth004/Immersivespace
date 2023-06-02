import { memo, useCallback, useState } from "react"

import classes from "./number-input.module.scss"

export type NumberInputProps = {
  onChange: (value: number, prevValue: number) => void
  value: number
  step: number
}

/**
 * Returns the number of decimal places to use for a given step value.
 * @example stepToFractionDigits(0.01) === 2
 */
const stepToFractionDigits = (step: number) => {
  if (step >= 1) {
    return 0
  }
  return Math.round(-Math.log10(step))
}

const parseValue = (value: string) => {
  const parsedValue = Number(value)
  if (Number.isFinite(parsedValue)) {
    return parsedValue
  }
  return 0
}

export const NumberInput = memo(function NumberInput({ onChange, step, value }: NumberInputProps) {
  const [inputOverride, setInputOverride] = useState<string | undefined>()
  const roundedValue = (Math.round(value / step) * step).toFixed(stepToFractionDigits(step))
  const inputValue = inputOverride ?? roundedValue

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(parseValue(newValue), parseValue(inputValue))
      setInputOverride(newValue)
    },
    [inputValue, onChange]
  )

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setInputOverride(roundedValue)
      e.target.select()
    },
    [roundedValue]
  )

  const handleBlur = useCallback(() => {
    setInputOverride(undefined)
  }, [])

  return (
    <input
      type="number"
      step={step}
      value={inputOverride ?? roundedValue}
      className={classes.input}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
})
