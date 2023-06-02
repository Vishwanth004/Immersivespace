import { memo, useMemo, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

import { ComposerType } from "@spatialsys/web/app-state"

import classes from "./composer.module.scss"

interface ComposerProps {
  type: ComposerType
  isGoogleConnected: boolean
  onSubmit: (message: string) => void
}

export const Composer = memo(function Composer(props: ComposerProps) {
  const { isGoogleConnected, type } = props
  const [inputVal, setInputVal] = useState("")

  const placeholder = useMemo(() => {
    switch (type) {
      case ComposerType.Note:
        return "Type Something"

      case ComposerType.SearchOrURL: {
        const searchTypes: string[] = ["Search term", "web URL"]

        if (isGoogleConnected) {
          searchTypes.push("Google Drive")
        }
        return searchTypes.join(searchTypes.length > 2 ? ", " : " or ")
      }
      default:
        return ""
    }
  }, [isGoogleConnected, type])

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputVal(e.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault()
      props.onSubmit(inputVal)
      setInputVal("")
    }
  }

  return (
    <div className={classes.editor}>
      <TextareaAutosize
        autoFocus
        className={classes.editorInner}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputVal}
        onClick={(e) => {
          e.stopPropagation()
        }}
        onBlur={() => {
          props.onSubmit(null)
        }}
      />
    </div>
  )
})
