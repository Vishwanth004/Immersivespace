import { useState } from "react"

import classes from "./input-with-submit.module.scss"

type InputWithSubmitProps = {
  /*
   * The function to call when the form is submitted.
   * Returns the new value of the input.
   */
  onSubmit: (value: string) => string
  buttonContent: React.ReactNode
  placeholder?: string
  prefix?: React.ReactNode
}

export function InputWithSubmit({ buttonContent, onSubmit, placeholder, prefix }: InputWithSubmitProps) {
  const [value, setValue] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setValue(onSubmit(value))
      }}
    >
      <div className={classes.container}>
        <div className={classes.prefix}>{prefix}</div>
        <input
          type="text"
          required
          className={classes.input}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit" disabled={!value.trim()} className={classes.submitButton}>
          {buttonContent}
        </button>
      </div>
    </form>
  )
}
