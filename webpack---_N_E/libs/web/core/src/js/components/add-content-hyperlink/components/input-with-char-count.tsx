import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

import classes from "./input.module.scss"

type InputWithCharCountProps = { label: string; value: string } & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export function InputWithCharCount(props: InputWithCharCountProps) {
  const { value, label, maxLength, ...inputProps } = props

  const showMaxCharCounter = maxLength !== undefined
  const currentLength = value?.length ?? 0

  return (
    <div className={clsx(classes.container, !showMaxCharCounter && classes.containerWithoutCharCount)}>
      <label className={clsx(classes.label, classes.labelInput)}>
        {label}

        <input
          value={value}
          className={clsx(classes.userInput, classes.input)}
          type="text"
          maxLength={maxLength}
          {...inputProps}
        />
      </label>
      {showMaxCharCounter && (
        <span
          className={clsx(classes.charCount, currentLength === maxLength && classes.charCountReached)}
        >{`${currentLength}/${maxLength}`}</span>
      )}
    </div>
  )
}
