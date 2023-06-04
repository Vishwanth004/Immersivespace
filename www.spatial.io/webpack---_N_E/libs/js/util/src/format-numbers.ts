import { ceil, floor } from "lodash"

interface AbbreviationThreshold {
  value: number
  letter: string
}

const abbreviationThresholds: AbbreviationThreshold[] = [
  { value: 1000, letter: "K" },
  { value: 1000000, letter: "M" },
  { value: 1000000000, letter: "B" },
  { value: 1000000000000, letter: "T" },
]

/**
 * Truncates the number without rounding before abbreviating/formatting (ex: 42.7M)
 *
 * Examples (maxDecimalDigits set to 1):
 * 999 -> 999
 * 1000 -> 1K
 * 1092 -> 1K
 * 1324 -> 1.3K
 * 334285 -> 334.2K
 * 4218321 -> 4.2M
 *
 * @param value The value to abbreviate to a string format
 * @param maxDecimalDigits The maximum number of decimal places to display
 * @returns the abbreviated value as a string
 */
//
export const abbreviateNumber = (value: number, maxDecimalDigits: number) => {
  const absValue = Math.abs(value)
  const fractionalMultiplier = Math.pow(10, maxDecimalDigits)

  for (let i = abbreviationThresholds.length - 1; i >= 0; i--) {
    const threshold = abbreviationThresholds[i]

    if (absValue >= threshold.value) {
      const wholeValue = floor(value / threshold.value).toString()
      const fractionalValue = floor(((absValue / threshold.value) % 1) * fractionalMultiplier)

      if (fractionalValue != 0) {
        return (
          wholeValue.toString() + "." + fractionalValue.toString().padStart(maxDecimalDigits, "0") + threshold.letter
        )
      } else {
        return wholeValue.toString() + threshold.letter
      }
    }
  }

  return value >= 0 ? floor(value, maxDecimalDigits).toString() : ceil(value, maxDecimalDigits).toString()
}
