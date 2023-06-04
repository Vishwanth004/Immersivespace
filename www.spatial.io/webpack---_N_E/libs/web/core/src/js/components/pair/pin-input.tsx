import clsx from "clsx"
import * as React from "react"

import classes from "./pair.module.scss"

interface PinInputProps {
  length: number
  forceFocus: boolean
  onComplete: (pin: string) => void
}

const PinInput = (props: PinInputProps, ref) => {
  const [pin, setPin] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef(null)
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current.focus()
      },
      clear: () => {
        setPin("")
      },
    }),
    []
  )

  React.useEffect(() => {
    if (props.forceFocus) {
      inputRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current, props.forceFocus])

  const focusInput = () => {
    inputRef.current.focus()
  }

  const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let _pin = pin

    if (e.key.length === 1 && pin.length <= props.length - 1 && !isNaN(parseInt(e.key, 10))) {
      _pin += e.key
    } else if (e.key === "Backspace") {
      _pin = pin.substring(0, pin.length - 1)
    }

    setPin(_pin)
    if (_pin.length === props.length) {
      props.onComplete(_pin)
    }
  }

  const remainingCharacters = Math.max(props.length - pin.length, 0)

  return (
    <button type="button" className={clsx(classes.pininput, focused && classes.focused)} onClick={focusInput}>
      <div className={classes.text}>
        {pin}
        <span className={clsx(classes.hint, "text-gray-400", pin.length > 0 && classes.hintHidden)}>
          {"0".repeat(Math.max(remainingCharacters, 0))}
        </span>
      </div>
      <div className={classes.underscores}>
        {"_".repeat(Math.max(pin.length, 0))}
        <span className={focused ? classes.blink : "text-gray-400"}>_</span>
        <span className="text-gray-400">{"_".repeat(Math.max(remainingCharacters - 1, 0))}</span>
      </div>
      <input
        className={classes.hiddenInput}
        ref={inputRef}
        onKeyUp={onInput}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        type="tel"
        placeholder=""
      />
    </button>
  )
}

export default React.forwardRef(PinInput)
