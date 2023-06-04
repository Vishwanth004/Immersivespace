import clsx from "clsx"
import { memo } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { InvitedGuestUserData } from "@spatialsys/unity/app-state"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import { Heading } from "@spatialsys/web/ui"

import classes from "./directly-invited-users.module.scss"

export interface DirectlyInvitedUsersProps {
  canRemoveInvitedUsers: boolean
  directlyInvitedGuests: { [key: string]: InvitedGuestUserData }
  onRemoveUser?: (userIds: string[]) => void
}

/**
 * The list of users directly invited to a space (i.e. directly invited by email).
 */
export const DirectlyInvitedUsers = memo(function DirectlyInvitedUsers(props: DirectlyInvitedUsersProps) {
  const { canRemoveInvitedUsers, directlyInvitedGuests, onRemoveUser } = props
  const directlyInvitedGuestsKeys = Object.keys(directlyInvitedGuests)

  if (directlyInvitedGuestsKeys.length === 0) {
    return null
  }

  return (
    <div className={classes.container}>
      <Heading as="h4" size="h5" className="mb-2">
        Shared with
      </Heading>
      <div className={classes.grid}>
        {directlyInvitedGuestsKeys.map((userId) => {
          const invitedUser = directlyInvitedGuests[userId]
          return (
            <div key={userId} className={classes.row}>
              <div className={classes.avatar}>
                <AvatarIcon
                  profilePicUrl={invitedUser.profilePicURL}
                  playerColor={getPlayerColor(invitedUser.playerColor ?? "")}
                  className={clsx(classes.avatarIcon, !invitedUser.profilePicURL && classes.noAvatar)}
                  placeholderClassName={classes.avatarIconPlaceholder}
                  altText={`${invitedUser.displayName}'s avatar`}
                />
              </div>
              <div className={`${classes.nameAndEmail} hide-scrollbar`}>
                {invitedUser.displayName || invitedUser.email}
                {invitedUser.displayName && <span className={classes.nameAndEmailOnHover}>({invitedUser.email})</span>}
              </div>
              {canRemoveInvitedUsers && Boolean(onRemoveUser) && (
                <div className={classes.removeUser}>
                  <button type="button" onClick={() => onRemoveUser([userId])}>
                    <CloseIcon />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
