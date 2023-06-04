import clsx from "clsx"
import { useCallback } from "react"

import { ReactComponent as MoreHorizIcon } from "@spatialsys/assets/icons/material-filled/more-horiz.svg"
import Menu from "@spatialsys/web/core/js/components/menu/menu"

import classes from "./moderation-dropdown-menu.module.scss"

export interface ModerationDropdownMenuProps {
  isBlocked: boolean
  showRemoveButton?: boolean
  onBlock: () => void
  onUnblock: () => void
  onReport: () => void
  onRemove: () => void
}

export function ModerationDropdownMenu(props: ModerationDropdownMenuProps) {
  const { isBlocked, showRemoveButton, onBlock, onUnblock, onRemove, onReport } = props

  const handleBlock = useCallback(() => {
    if (isBlocked) {
      onUnblock()
    } else {
      onBlock()
    }
  }, [onBlock, onUnblock, isBlocked])

  const handleReport = useCallback(() => {
    onReport()
  }, [onReport])

  const handleRemove = useCallback(() => {
    onRemove()
  }, [onRemove])

  return (
    <Menu
      className={classes.container}
      classNameContent={classes.content}
      dropPosition="dropdown"
      menuBuffer={10}
      menuPosition="right"
      paddingStyle={"10px 12px"}
      touchOnly
      alwaysRemount
      render={({ setIsOpen, isOpen }) => {
        return (
          <button
            type="button"
            className={clsx(classes.toggleButton, { [classes.open]: isOpen })}
            onClick={() => setIsOpen((open) => !open)}
          >
            <MoreHorizIcon />
          </button>
        )
      }}
    >
      <div className={classes.innerContents}>
        <button onClick={handleBlock}>{isBlocked ? "Unblock" : "Block"}</button>
        <button onClick={handleReport}>Report</button>
        {showRemoveButton && <button onClick={handleRemove}>Remove</button>}
      </div>
    </Menu>
  )
}
