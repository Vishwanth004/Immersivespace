import clsx from "clsx"
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react"

import classes from "./input.module.scss"

type TextareaWithCharCountProps = { label: string; value: string } & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export function TextareaWithCharCount(props: TextareaWithCharCountProps) {
  const { value, label, maxLength, ...inputProps } = props

  const showMaxCharCounter = maxLength !== undefined
  const currentLength = value?.length ?? 0

  return (
    <div className={clsx(classes.container, !showMaxCharCounter && classes.containerWithoutCharCount)}>
      <label className={clsx(classes.label, classes.labelTextarea)}>
        {label}

        <textarea
          className={clsx(classes.userInput, classes.textarea)}
          maxLength={maxLength}
          value={value}
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
