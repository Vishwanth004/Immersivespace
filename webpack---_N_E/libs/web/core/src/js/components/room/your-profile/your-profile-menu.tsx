import clsx from "clsx"
import Link from "next/link"
import { memo } from "react"
import Toggle from "react-toggle"

import { ReactComponent as PersonIcon } from "@spatialsys/assets/icons/material-filled/accessibility.svg"
import { ReactComponent as ChevronRightIcon } from "@spatialsys/assets/icons/material-filled/navigate-next.svg"
import { ReactComponent as LoginIcon } from "@spatialsys/assets/icons/material-outlined/login.svg"
import { ReactComponent as ManageAccountsIcon } from "@spatialsys/assets/icons/material-outlined/manage-accounts.svg"
import { ReactComponent as WebcamIcon } from "@spatialsys/assets/icons/material-outlined/videocam.svg"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals, ParticipantWithRTC } from "@spatialsys/web/app-state"
import AvatarMediaThumbnail from "@spatialsys/web/core/js/components/avatar-icon/avatar-media-thumbnail/avatar-media-thumbnail"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"
import Menu from "@spatialsys/web/core/js/components/menu/menu"
import { YourProfileButton } from "@spatialsys/web/core/js/components/room/your-profile/your-profile-button"
import { WebcamStatus } from "@spatialsys/web/rtc/rtc-state"
import { Heading, Skeleton } from "@spatialsys/web/ui"

import classes from "./your-profile-menu.module.scss"

type YourProfileMenuProps = YourProfileMenuContentsProps & {
  participant?: ParticipantWithRTC
}

export const YourProfileMenu = memo(function YourProfileMenu(props: YourProfileMenuProps) {
  const { participant } = props

  // Just to take up space and avoid layout shift
  if (!participant) {
    return (
      <div className={clsx(classes.container, classes.loaderContainer)}>
        <Skeleton className={classes.loader} />
      </div>
    )
  }

  return (
    <Menu
      dropPosition="dropup"
      menuBuffer={16}
      menuPosition="right"
      className={classes.container}
      classNameContent={classes.menuContents}
      paddingStyle={undefined}
      render={({ setIsOpen }) => {
        return <YourProfileButton onClick={() => setIsOpen(true)} participant={participant} />
      }}
      toggleButtonHitSlop={24}
    >
      <YourProfileMenuContents {...props} participant={participant} />
    </Menu>
  )
})

type YourProfileMenuContentsProps = {
  participant: ParticipantWithRTC
  onEditAvatar: () => void
  onToggleWebcam: () => void
  webcamStatus: WebcamStatus
}

const YourProfileMenuContents = memo(function YourProfileMenuContents(props: YourProfileMenuContentsProps) {
  const { participant, onEditAvatar, onToggleWebcam, webcamStatus } = props
  const { displayName, profilePicURL, playerColors } = participant

  const { isAuthless } = useAuthState()
  const actions = useAppContext((context) => context.actions)

  const Placeholder = <NamePlaceholder displayName={displayName} isLocalUser />

  return (
    <div className={classes.contentsContainer}>
      <AvatarMediaThumbnail
        altText="Your Avatar"
        applyPlayerColorToPlaceholder
        className={classes.avatar}
        media={participant.media}
        mirrored
        playerColor={playerColors}
        profilePicUrl={profilePicURL}
        showShadow
        placeholder={Placeholder}
        loadingPlaceholder={Placeholder}
      />
      <Heading as="h2" size="h2" textAlign="center">
        {displayName}
      </Heading>

      <div className={classes.actionsContainer}>
        {isAuthless ? (
          <button
            className={classes.actionsButton}
            onClick={() => {
              actions.openModal({ type: Modals.Login, payload: { forceRedirect: true } })
            }}
          >
            <div className={classes.iconAndText}>
              <LoginIcon />
              <span>Log In</span>
            </div>
            <ChevronRightIcon />
          </button>
        ) : (
          <Link
            href={`/@${participant.socialProfile.username}`}
            className={classes.actionsButton}
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.iconAndText}>
              <ManageAccountsIcon />
              <span>View Profile</span>
            </div>
            <ChevronRightIcon />
          </Link>
        )}

        <button className={classes.actionsButton} onClick={onEditAvatar}>
          <div className={classes.iconAndText}>
            <PersonIcon />
            <span>Edit Avatar</span>
          </div>
          <ChevronRightIcon />
        </button>

        <div className={classes.actionsButton} onClick={onToggleWebcam}>
          <div className={classes.iconAndText}>
            <WebcamIcon />
            <span>Toggle Webcam</span>
          </div>
          <Toggle
            disabled={webcamStatus === WebcamStatus.Initializing || webcamStatus === WebcamStatus.RequestingPermissions}
            checked={webcamStatus === WebcamStatus.On}
            icons={false}
            onChange={onToggleWebcam}
          />
        </div>
      </div>
    </div>
  )
})
