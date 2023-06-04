import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes, memo } from "react"

import { Heading } from "@spatialsys/web/ui"

import classes from "./input-with-label.module.scss"

interface CreatePortalHyperlinkInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  header: string
  placeholder: string
  currentValue: string
  setValue: (value: string) => void
}

/**
 * Renders an input field with a label.
 *
 * The plan for this component is to improve it in a second iteration so it can be used as the text input field found here: https://www.figma.com/file/vnyD9ILmg55WYEuglCV7xr/Hyperlinks?node-id=495%3A15223
 */
export const InputWithLabel = memo(function TextInputInternal(props: CreatePortalHyperlinkInputProps) {
  const { currentValue, header, placeholder, required, setValue, type, ...inputProps } = props
  return (
    <div className={classes.container}>
      <label className={classes.label}>
        <Heading as="h5" size="h5" className="text-gray-500">
          {header}
          {required && <span className={classes.requiredField}>*</span>}
        </Heading>
        <input
          className={clsx("inputtext__input", classes.inputField)}
          value={currentValue}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          placeholder={placeholder}
          required={required}
          {...inputProps}
        />
      </label>
    </div>
  )
})
