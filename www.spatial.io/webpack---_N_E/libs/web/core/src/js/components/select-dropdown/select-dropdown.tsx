import clsx from "clsx"
import * as React from "react"

import { ReactComponent as KeyboardArrowDownIcon } from "@spatialsys/assets/icons/material-filled/keyboard-arrow-down.svg"

interface SelectDropdownProps<T> {
  canOpen?: boolean
  title?: string
  ligature?: JSX.Element
  className?: string
  titleClassName?: string
  dropdownClassName?: string
  dropdownItemClassName?: string
  dropdownItemOptionClassName?: string
  /** Callback to be called when the dropdown is opened. */
  onOpen?: () => void
  options: SelectDropdownOption<T>[]
  renderOption: (option: SelectDropdownOption<T>) => React.ReactNode
  onSelectOption: (option: SelectDropdownOption<T>) => void
}

export type SelectDropdownOption<T> = {
  data: T
  key: string
  selected?: boolean
}

export default function SelectDropdown<T>(props: SelectDropdownProps<T>) {
  const { onOpen } = props
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    /** Call optional callback when the dropdown is opened */
    if (isOpen && onOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  const ref = React.useRef(null as HTMLDivElement)

  const handleSelect = (option: SelectDropdownOption<T>) => {
    setIsOpen(false)
    props.onSelectOption(option)
  }

  return (
    <div
      className={`selectdropdown ${
        !props.canOpen ? `selectdropdown--static ${props.className ? `${props.className}--static` : ""}` : ""
      } ${props.className}`}
    >
      <button
        type="button"
        className={clsx("selectdropdown__title", props.titleClassName)}
        onClick={() => props.canOpen && setIsOpen(!isOpen)}
      >
        {props.title ?? null}
        {props.canOpen ? props.ligature ?? <KeyboardArrowDownIcon className="selectdropdown__icon" /> : null}
      </button>
      {props.canOpen ? (
        <div
          ref={ref}
          className={clsx(
            `selectdropdown__dropdown ${isOpen ? "selectdropdown__dropdown--visible" : ""} ${
              props.className ? `${props.className}__dropdown` : ""
            }`,
            props.dropdownClassName
          )}
        >
          <ul>
            {props.options.map((option) => {
              return (
                <li key={option.key} className="selectdropdown__dropdown_item">
                  <button
                    type="button"
                    onClick={() => !option.selected && handleSelect(option)}
                    className={clsx(
                      "selectdropdown__dropdown_item_button",
                      option.selected && "selectdropdown__dropdown_item--selected",
                      props.dropdownItemClassName
                    )}
                  >
                    <div className={clsx("selectdropdown__dropdown_item_option", props.dropdownItemOptionClassName)}>
                      {props.renderOption(option)}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
