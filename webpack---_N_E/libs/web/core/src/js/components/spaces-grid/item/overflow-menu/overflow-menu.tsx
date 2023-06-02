import clsx from "clsx"
import { FunctionComponent, SVGProps, useCallback } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import { ReactComponent as MoreHorizIcon } from "@spatialsys/assets/icons/material-filled/more-horiz.svg"
import { ReactComponent as MoreVertIcon } from "@spatialsys/assets/icons/material-filled/more-vert.svg"
import {
  InteractionName,
  InteractionType,
  TrackedComponent,
  TrackedComponents,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"

import Menu from "../../../menu/menu"

import classes from "./overflow-menu.module.scss"

const Id = TrackedComponents.SpacesListItemOverflowMenu

interface OverflowMenuProps {
  spaceID: string
  spaceName: string
  className?: string
  buttonPosition?: "right" | "topRight"
  copyToClipboardUrl: string
  isOwner: boolean
  isAdmin: boolean
  isAuthenticated: boolean
  hasParticipants: boolean
  isHovering: boolean
  isLobby: boolean
  onCopyUrl: () => void
  onDelete: () => void
  onRename: () => void
  onSetAsBanner?: () => void
}

const buttonStyles: Record<
  OverflowMenuProps["buttonPosition"],
  { className: string; Icon: FunctionComponent<SVGProps<SVGSVGElement>> }
> = {
  right: {
    className: classes.right,
    Icon: MoreVertIcon,
  },
  topRight: {
    className: classes.topRight,
    Icon: MoreHorizIcon,
  },
}

export const OverflowMenu = (props: OverflowMenuProps) => {
  const {
    spaceID,
    spaceName,
    className,
    buttonPosition = "right",
    copyToClipboardUrl,
    isOwner,
    isAuthenticated,
    hasParticipants,
    isAdmin,
    isHovering,
    isLobby,
    onDelete,
    onRename,
    onCopyUrl,
    onSetAsBanner,
  } = props
  const trackInteraction = useTrackInteraction()

  const canReport = !isAdmin && !isOwner && isAuthenticated
  const canRename = isAdmin
  const canDelete = isOwner && !hasParticipants && !isLobby
  const buttonStyle = buttonStyles[buttonPosition]

  const actions = useAppContext((context) => context.actions)
  const openReportSpaceModal = useCallback(() => {
    actions.openModal({ type: Modals.ReportSpace, payload: { spaceID, spaceName } })
  }, [actions, spaceID, spaceName])

  return (
    <Menu
      className={clsx(classes.container, className, buttonStyle.className)}
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
            className={clsx(classes.toggleButton, { [classes.visible]: isHovering || isOpen })}
            onClick={() => setIsOpen((open) => !open)}
          >
            <buttonStyle.Icon />
          </button>
        )
      }}
    >
      <TrackedComponent id={Id}>
        {onSetAsBanner && (
          <button
            className={classes.listItem}
            type="button"
            onClick={() => {
              onSetAsBanner()
              trackInteraction({
                name: InteractionName.SetProfileBackgroundBanner,
                type: InteractionType.Click,
                component: Id,
              })
            }}
          >
            Set Banner
          </button>
        )}
        <CopyToClipboard
          text={copyToClipboardUrl}
          onCopy={() => {
            trackInteraction({ name: InteractionName.CopyShareUrl, type: InteractionType.Click, component: Id })
            onCopyUrl()
          }}
          options={{ format: "text/plain" }}
        >
          <button className={classes.listItem} type="button">
            Copy Link
          </button>
        </CopyToClipboard>
        {canReport && (
          <button className={classes.listItem} type="button" onClick={openReportSpaceModal}>
            Report
          </button>
        )}
        {canRename && (
          <button
            className={classes.listItem}
            type="button"
            onClick={() => {
              onRename()
              trackInteraction({ name: InteractionName.RenameSpace, type: InteractionType.Click, component: Id })
            }}
          >
            Rename
          </button>
        )}
        {canDelete && (
          <button
            className={clsx(classes.listItem, classes.deleteButton)}
            type="button"
            onClick={() => {
              onDelete()
              trackInteraction({ name: InteractionName.DeleteSpace, type: InteractionType.Click, component: Id })
            }}
          >
            Delete
          </button>
        )}
      </TrackedComponent>
    </Menu>
  )
}
