import clsx from "clsx"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import Toggle from "react-toggle"
import { useHoverDirty } from "react-use"

import { ReactComponent as CheckIcon } from "@spatialsys/assets/icons/material-filled/check.svg"
import { ReactComponent as EmailIcon } from "@spatialsys/assets/icons/material-filled/email.svg"
import { ReactComponent as ChevronRight } from "@spatialsys/assets/icons/material-filled/navigate-next.svg"
import { ReactComponent as SettingsIcon } from "@spatialsys/assets/icons/material-filled/settings.svg"
import {
  InteractionName,
  InteractionType,
  TrackedComponents,
  useTrackInteraction,
  useTrackView,
} from "@spatialsys/react/analytics"
import {
  AdministratorPermission,
  AppStateSelectors,
  RoomData_ShareSetting as ShareSetting,
} from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { ReactComponent as InstancingIcon } from "@spatialsys/web/core/img/icons/instancing.svg"
import { ReactComponent as PrivateIcon } from "@spatialsys/web/core/img/icons/person.svg"
import { ReactComponent as PublicLinkIcon } from "@spatialsys/web/core/img/icons/public.svg"
import { ReactComponent as TeamIcon } from "@spatialsys/web/core/img/icons/supervised-user-circle.svg"
import { CopyToClipboardField } from "@spatialsys/web/core/js/components/copy-to-clipboard-field/copy-to-clipboard-field"
import { RowWithToggle } from "@spatialsys/web/core/js/components/row-with-toggle/row-with-toggle"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { canGoLive, getGoLiveCooldownString } from "@spatialsys/web/core/js/util/go-live"
import { Button, Heading, cn } from "@spatialsys/web/ui"

import SelectDropdown from "../select-dropdown/select-dropdown"
import { ShareProps, getShareUrl, isUserMemberOfRoomOrg, settingsCopyForShareSetting } from "./share"

import classes from "./sharing-permissions.module.scss"

interface SharingPermissionsProps extends ShareProps {
  shareSetting: ShareSetting
}

const SharingPermissions = memo(function SharingPermissions(props: SharingPermissionsProps) {
  const {
    room,
    shareSetting,
    user,
    userId,
    userIsAdmin,
    onEditShareSetting,
    onShowHostTools,
    onShowDirectlyInvitedUsers,
    onCopyShareUrl,
    isReadyToPublish,
    onNotReadyPublish,
  } = props
  const { spaceInstancing } = useUser().user.treatmentsParsed

  const trackInteraction = useTrackInteraction()
  const trackView = useTrackView()

  const isOwner = useAppContext((context) => AppStateSelectors.isUserRoomOwner(context.state.unity.appState, userId))
  const userIsRoomOrgMember = isUserMemberOfRoomOrg(user, room)
  const orgName = room.organizationOwnerName
  const canOpenShareSettingDropdown =
    isOwner || (shareSetting === ShareSetting.Organization && userIsRoomOrgMember) || userIsAdmin
  const canInviteUsers = canOpenShareSettingDropdown // Currently the same
  const isRestrictOthersViewOnlyEnabled = useAppContext(
    (context) =>
      context.state.unity.appStateLoaded &&
      context.state.unity.appState.roomSession.room.restrictedPermissions.includes(
        AdministratorPermission.RestrictOthersViewOnly
      )
  )
  const hostToolsEnabled = useAppContext((context) =>
    AppStateSelectors.areHostToolsEnabled(context.state.unity.appState)
  )

  const [isInstanceable, setIsInstanceable] = useState(room.isInstanceable)
  const [isPublishedToExplore, setIsPublishedToExplore] = useState(room.isPublishedToExplore)

  const shareSettingOptions = useMemo(() => {
    if (isOwner || userIsAdmin) {
      if (user.myOrganization.id) {
        return [ShareSetting.PublicLink, ShareSetting.Organization, ShareSetting.Private]
      } else {
        return [ShareSetting.PublicLink, ShareSetting.Private]
      }
    } else {
      return [ShareSetting.PublicLink, ShareSetting.Organization]
    }
  }, [user.myOrganization.id, userIsAdmin, isOwner])
  const isLive = useAppContext((context) => context.state.unity.appState.roomSession.room.isLive)

  const restrictEditDropdownOptions = useMemo(
    () => [
      {
        data: true,
        key: `Can View`,
        selected: isRestrictOthersViewOnlyEnabled,
      },
      {
        data: false,
        key: `Can Edit`,
        selected: !isRestrictOthersViewOnlyEnabled,
      },
    ],
    [isRestrictOthersViewOnlyEnabled]
  )

  const shareSettingIcon = useMemo(() => {
    switch (shareSetting) {
      case ShareSetting.Private:
        return <PrivateIcon />
      case ShareSetting.PublicLink:
        return <PublicLinkIcon />
      case ShareSetting.Organization:
        return <TeamIcon />
      default:
      case ShareSetting.None:
        return null
    }
  }, [shareSetting])

  const updateShareSetting = useCallback(
    (setting: ShareSetting) => {
      if (setting !== shareSetting) {
        if (setting === ShareSetting.PublicLink) {
          onEditShareSetting(ShareSetting.Organization, true)
        } else {
          // TODO: in the new share setting UI, a room can be both "org" and "publicLink"
          // For now, keep all org rooms as not publicly sharable (that is the pre-existing behaviour anyways)
          // Also, with the old UI: going from org -> public is going to be slightly different behaviour than personal -> public
          // org -> public leaves the room in "org" tab, personal -> public leaves it in "spaces" tab
          // This can be a bit unclear and should be fixed pre 6.0
          onEditShareSetting(setting, false)
        }
      }
    },
    [onEditShareSetting, shareSetting]
  )

  const toggleRestrictOthersViewOnly = useCallback(
    (isViewOnly: boolean) =>
      UnityMessages.setAdminPermissionRestricted(AdministratorPermission.RestrictOthersViewOnly, isViewOnly),
    []
  )

  const toggleInstanceable = useCallback(() => {
    // Optimistically set, but keep up to date if it fails with the useEffect below
    setIsInstanceable(!isInstanceable)
    UnityMessages.setInstancingEnabled(room.id, !isInstanceable)
  }, [room.id, isInstanceable])

  useEffect(() => {
    setIsInstanceable(room.isInstanceable)
  }, [room.isInstanceable])

  const toggleIsPublishedToExplore = useCallback(() => {
    const newIsPublished = !isPublishedToExplore
    trackInteraction({
      name: newIsPublished ? InteractionName.PublishSpace : InteractionName.UnpublishSpace,
      type: InteractionType.Click,
    })
    if (newIsPublished && !isReadyToPublish) {
      onNotReadyPublish()
    } else {
      // Optimistically set, but keep up to date if it fails with the useEffect below
      setIsPublishedToExplore(newIsPublished)
      UnityMessages.setPublishedToExplore(room.id, newIsPublished)
    }
  }, [isPublishedToExplore, isReadyToPublish, onNotReadyPublish, room.id, trackInteraction])

  useEffect(() => {
    setIsPublishedToExplore(room.isPublishedToExplore)
  }, [room.isPublishedToExplore])

  const notifyLinkCopied = useCallback(() => {
    Toast.notify("Copied to clipboard!")
    trackInteraction({ name: InteractionName.CopyShareUrl, type: InteractionType.Click })
    if (onCopyShareUrl) onCopyShareUrl()
  }, [onCopyShareUrl, trackInteraction])

  const onOpenShareSettingsDropdown = useCallback(() => {
    trackView(TrackedComponents.ShareSettingsDropdown)
  }, [trackView])

  const onOpenCanViewDropdown = useCallback(() => {
    trackView(TrackedComponents.ShareSettingsCanViewDropdown)
  }, [trackView])

  return (
    <div className={classes.container}>
      <div className={clsx(classes.boxWithOutline, classes.shareLinkContainer)}>
        <div className={classes.shareSettingsContainer}>
          <div className={classes.shareIconContainer}>{shareSettingIcon}</div>
          <div>
            <SelectDropdown
              options={shareSettingOptions.map((setting) => {
                return {
                  data: setting,
                  key: `${setting}`,
                  selected: setting === shareSetting,
                }
              })}
              renderOption={(option) => (
                <div className={classes.dropdownOption}>
                  {settingsCopyForShareSetting(option.data, orgName)}
                  {option.selected && <CheckIcon className={classes.checkIcon} />}
                </div>
              )}
              onSelectOption={(option) => updateShareSetting(option.data)}
              canOpen={canOpenShareSettingDropdown}
              title={settingsCopyForShareSetting(shareSetting, orgName)}
              className={clsx(classes.shareSettingDropdown, { [classes.canOpenDropdown]: canOpenShareSettingDropdown })}
              dropdownItemClassName={classes.dropdownItemButton}
              onOpen={onOpenShareSettingsDropdown}
            />
          </div>
          <SelectDropdown
            options={restrictEditDropdownOptions}
            renderOption={(option) => (
              <div className={classes.dropdownOption}>
                {option.key}
                {option.selected && <CheckIcon className={classes.checkIcon} />}
              </div>
            )}
            onSelectOption={(option) => toggleRestrictOthersViewOnly(option.data)}
            canOpen={canOpenShareSettingDropdown}
            title={`Can ${isRestrictOthersViewOnlyEnabled ? "View" : "Edit"}`}
            className={clsx(classes.restrictEditDropdown, { [classes.canOpenDropdown]: canOpenShareSettingDropdown })}
            dropdownItemOptionClassName={classes.smallMargin}
            dropdownItemClassName={classes.dropdownItemButton}
            onOpen={onOpenCanViewDropdown}
            titleClassName={classes.linkSettingsDropdownTitle}
          />
        </div>
        {isOwner && (
          <>
            <hr />
            <RowWithToggle
              label={
                <>
                  Publicly Listed
                  <span className={classes.labelSubTitle}>
                    Discoverable on Spatial homepage, search, and your profile
                  </span>
                </>
              }
              classNameLabel={classes.labelContainer}
              classNameContainer={classes.rowContainer}
              onChange={toggleIsPublishedToExplore}
              checked={isPublishedToExplore}
              id="published-to-explore"
            />
          </>
        )}
        {isOwner && (
          <>
            <hr />
            <div className={classes.rowContainer}>
              <div className={classes.labelContainer}>
                <div className={classes.labelHeading}>{isLive ? "You're Live!" : "Go Live 🎉"}</div>
                <span className={classes.labelSubTitle}>Broadcast your space to all of Spatial</span>
              </div>

              <GoLiveButton isLive={isLive} onEndGoLive={props.onEndGoLive} onStartGoLive={props.onStartGoLive} />
            </div>
          </>
        )}
        <hr />
        <CopyToClipboardField
          text={getShareUrl(room)}
          className={classes.copyLinkContainer}
          onCopy={notifyLinkCopied}
        />
      </div>
      {canInviteUsers && (
        <div className={classes.boxWithOutline}>
          <button className={classes.inviteByEmailContainer} onClick={onShowDirectlyInvitedUsers}>
            <EmailIcon className="icon icon-sm" />
            <Heading as="h5" size="h5" className="flex-1">
              Invite by email
            </Heading>
            <ChevronRight />
          </button>
        </div>
      )}
      {userIsAdmin && (
        <div className={classes.boxWithOutline}>
          {spaceInstancing && (
            <a
              href="/pro"
              target="_blank"
              rel="noreferrer"
              className={cn("text-left text-sm normal-case no-underline hover:opacity-70", classes.overflowGroups)}
            >
              <InstancingIcon className={classes.instancingIcon} />
              <div>
                <Heading as="h5" size="h5" className="pb-1">
                  Overflow Groups
                </Heading>
                <div className={classes.overflowGroupsDescription}>
                  If your space hits capacity (50 people) a new instance will be created to host 50 more - this
                  continues up to 500 people!
                </div>
              </div>
              {hostToolsEnabled && <Toggle checked={isInstanceable} onChange={toggleInstanceable} icons={false} />}
              {!hostToolsEnabled && (
                <Button
                  as="label"
                  color="outline"
                  size="sm"
                  className="cursor-pointer border-blue text-blue hover:scale-100"
                  noShadow
                >
                  Plus
                </Button>
              )}
            </a>
          )}
          <button className={cn("hover:opacity-70", classes.inviteByEmailContainer)} onClick={onShowHostTools}>
            <SettingsIcon className="icon icon-sm" />
            <div className={classes.hostToolsTitle}>
              <Heading as="h5" size="h5" className="flex-1">
                Host settings
              </Heading>
              {!hostToolsEnabled && (
                <Button
                  as="label"
                  color="outline"
                  size="sm"
                  className="cursor-pointer border-blue text-blue hover:scale-100"
                  noShadow
                >
                  Plus
                </Button>
              )}
            </div>
            {hostToolsEnabled && <ChevronRight />}
          </button>
        </div>
      )}
    </div>
  )
})

type GoLiveButtonProps = Pick<SharingPermissionsProps, "onStartGoLive" | "onEndGoLive"> & { isLive: boolean }
const GoLiveButton = memo(function GoLiveButton(props: GoLiveButtonProps) {
  const { isLive, onStartGoLive, onEndGoLive } = props

  const ref = useRef<HTMLDivElement>(null)
  const isHovering = useHoverDirty(ref)

  const lastLiveUnixMs = useAppContext((context) => context.state.unity.appState.roomSession.room.lastLiveUnixMillis)
  const [cooldownString, setCooldownString] = useState("")

  const ableToGoLive = !isLive && canGoLive(lastLiveUnixMs)
  const displayCooldown = !ableToGoLive && isHovering
  const buttonDisabled = !isLive ? !ableToGoLive : false

  // Re-render the button every second if it's disabled and hovered over to display countdown timer.
  useEffect(() => {
    if (displayCooldown) {
      setCooldownString(getGoLiveCooldownString(lastLiveUnixMs))
      const updateCooldown = setInterval(() => setCooldownString(getGoLiveCooldownString(lastLiveUnixMs)), 1000)
      return () => clearInterval(updateCooldown)
    }
  }, [displayCooldown, lastLiveUnixMs])

  const buttonTitle = useMemo(() => {
    if (displayCooldown && isHovering && !isLive) {
      return cooldownString
    }

    return isLive ? "Stop" : "Go Live"
  }, [cooldownString, displayCooldown, isHovering, isLive])

  return (
    <div ref={ref} className={clsx(buttonDisabled && "cursor-not-allowed")}>
      <Button
        className="w-20 rounded-md uppercase shadow-none"
        color="black"
        size="sm"
        disabled={buttonDisabled}
        onClick={isLive ? onEndGoLive : onStartGoLive}
      >
        {buttonTitle}
      </Button>
    </div>
  )
})

export default SharingPermissions
