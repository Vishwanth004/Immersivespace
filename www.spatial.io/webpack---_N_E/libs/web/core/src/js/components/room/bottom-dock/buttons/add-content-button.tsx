import * as React from "react"

import { ReactComponent as AddIcon } from "@spatialsys/assets/icons/material-filled/add.svg"

import Button from "./button"

interface AddContentProps {
  onClick: () => void
  disabled?: boolean
  fakeDisabled?: boolean
}

const AddContentButton = React.memo((props: AddContentProps) => {
  return (
    <Button
      onClick={props.onClick}
      color="outline"
      ligature={<AddIcon />}
      tooltipText="Add content"
      label="Add content"
      disabled={props.disabled}
      fakeDisabled={props.fakeDisabled}
    />
  )
})

export default AddContentButton
