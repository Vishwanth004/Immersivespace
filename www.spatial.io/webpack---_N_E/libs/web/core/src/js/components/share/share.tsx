import { memo, useMemo } from "react"

import { UserData } from "@spatialsys/js/sapi/clients/sapi"
import { SAPIRoom } from "@spatialsys/js/sapi/types"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { RoomData as Room, RoomData_ShareSetting as ShareSetting } from "@spatialsys/unity/app-state"
import { SAPIRoomSubsetSpaceShare, formatShareUrl } from "@spatialsys/url-utils"
import Config from "@spatialsys/web/config"
import SharingPermissions from "@spatialsys/web/core/js/components/share/sharing-permissions"
import { FacebookShareLink } from "@spatialsys/web/core/js/components/social-share-buttons/facebook"
import { LinkedInShareLink } from "@spatialsys/web/core/js/components/social-share-buttons/linkedin"
import { TwitterShareLink } from "@spatialsys/web/core/js/components/social-share-buttons/twitter"
import { Heading } from "@spatialsys/web/ui"

import classes from "./share.module.scss"

const shareBodyText = "Check out my space in the Spatial metaverse!"

export const getShareUrl = (room: SAPIRoomSubsetSpaceShare | Room | SAPIRoom) => {
  return formatShareUrl(Config.WEB_URL, room)
}

export interface ShareProps {
  room: Room | SAPIRoom
  shareSetting: ShareSetting
  user: UserData
  userId: string
  userIsAdmin: boolean
  onCopyShareUrl?: () => void
  onEditShareSetting: (setting: any, isPublic: any) => void
  onShowHostTools: () => void
  onShowDirectlyInvitedUsers: () => void
  onStartGoLive: () => void
  onEndGoLive: () => void
  isReadyToPublish: boolean
  onNotReadyPublish: () => void
}

export const settingsCopyForShareSetting = (setting: ShareSetting, orgName: string | null) => {
  switch (setting) {
    case ShareSetting.Private:
      return "You and invited users"
    case ShareSetting.PublicLink:
      return "Anyone with the link"
    case ShareSetting.None:
    case ShareSetting.Organization:
    default:
      return orgName ? `Members of ${orgName}` : "Members of your team"
  }
}

export const isUserMemberOfRoomOrg = (user: UserData, room: Room | SAPIRoom): boolean => {
  const roomOrgs = new Set(room.organizations)

  return user.organizations.some((userOrg) => roomOrgs.has(userOrg))
}

/**
 * Temporary map publicLink field to new shareSetting to support backend migration
 * Will be removed in DEV-5173
 *
 * roomShareSetting check handles the case where the shareSetting was set to ORG
 * but user is no longer in an org, i.e. they left the team or due to a bug (DEV-6717)
 */
export const remapShareSettingTempWorkaround = (shareSetting: ShareSetting, room: Room | SAPIRoom, user: UserData) => {
  return room.publicLink
    ? ShareSetting.PublicLink
    : shareSetting === ShareSetting.Organization && !user.myOrganization.id
    ? ShareSetting.Private
    : shareSetting
}

const Share = memo(function Share(props: ShareProps) {
  const { shareSetting, room, user, onCopyShareUrl } = props

  const remappedShareSetting = remapShareSettingTempWorkaround(shareSetting, room, user)
  const shareUrl = useMemo(() => getShareUrl(room), [room])

  return (
    <TrackedComponent id={TrackedComponents.SharePanel}>
      <div className={classes.container}>
        <div>
          <Heading
            size="h2"
            textAlign="center"
            className="mb-6 mt-12 line-clamp-2 max-h-[30vh]"
          >{`Share ${room.name}`}</Heading>
          <div className={classes.linkContainer}>
            <SharingPermissions {...props} shareSetting={remappedShareSetting} onCopyShareUrl={onCopyShareUrl} />
          </div>
        </div>

        {remappedShareSetting === ShareSetting.PublicLink && (
          <div className={classes.socialShareButtonsContainer}>
            <FacebookShareLink spaceUrl={shareUrl} />
            <TwitterShareLink bodyText={shareBodyText} spaceUrl={shareUrl} />
            <LinkedInShareLink spaceUrl={shareUrl} />
          </div>
        )}
      </div>
    </TrackedComponent>
  )
})

export default Share
