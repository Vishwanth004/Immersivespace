import clsx from "clsx"
import { Children } from "react"

import { ReactComponent as ExpandMoreIcon } from "@spatialsys/assets/icons/material-filled/expand-more.svg"
import Menu from "@spatialsys/web/core/js/components/menu/menu"

import classes from "./manage-dropdown-menu.module.scss"

type ManageDropdownMenuProps = {
  children?: React.ReactNode
}

export function ManageDropdownMenu({ children }: ManageDropdownMenuProps) {
  // Don't render the dropdown button if the dropdown menu is empty
  if (Children.toArray(children).length === 0) {
    return null
  }

  return (
    <Menu
      classNameContent={classes.content}
      dropPosition="dropdown"
      menuBuffer={3}
      menuPosition="right"
      paddingStyle={"10px 12px"}
      touchOnly
      alwaysRemount
      render={({ setIsOpen, isOpen }) => {
        return (
          <button
            type="button"
            className={clsx(classes.toggleButton, isOpen && classes.open)}
            onClick={() => setIsOpen((open) => !open)}
          >
            Manage <ExpandMoreIcon className={classes.expandMoreIcon} />
          </button>
        )
      }}
    >
      <div className={classes.innerContents}>{children}</div>
    </Menu>
  )
}
