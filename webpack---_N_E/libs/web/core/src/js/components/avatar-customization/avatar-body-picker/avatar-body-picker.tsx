import clsx from "clsx"
import { memo, useMemo } from "react"

import { ReactComponent as PersonIcon } from "@spatialsys/assets/icons/material-filled/accessibility.svg"
import { ReactComponent as AddIcon } from "@spatialsys/assets/icons/material-filled/add.svg"
import { ReactComponent as EditIcon } from "@spatialsys/assets/icons/material-filled/edit.svg"
import { ReactComponent as RpmLogo } from "@spatialsys/assets/img/svg/ready-player-me.svg"
import { Avatar, AvatarScope } from "@spatialsys/js/sapi/types"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { UserAvatarStyle } from "@spatialsys/unity/app-state"

import classes from "./avatar-body-picker.module.scss"

const getThumbnailPath = (glbPath: string) => glbPath.replace("model.glb", "thumbnail-192.png")

interface AvatarBodyPickerProps {
  avatarStyle: UserAvatarStyle
  bodies: string[]
  currentBody: string
  hasCreatedAsdkHead: boolean
  hasCreatedRpmAvatar: boolean
  isGeneratingThumbnail?: boolean
  rpmAvatarThumbnailUrl?: string
  creatorToolkitAvatars: Avatar[]
  /** Controls visibility of world-scoped avatars in the creatorToolkitAvatars list */
  displayWorldAvatars?: boolean
  onClickNew: () => void
  onSetAvatar: (url: string) => void
  onSelectRpmAvatar: () => void
  onSelectCreatorToolkitAvatar: (id: string, scope: AvatarScope) => void
}

type GenericBodyTileProps = Pick<
  AvatarBodyPickerProps,
  "avatarStyle" | "currentBody" | "hasCreatedAsdkHead" | "onSetAvatar"
> & {
  path: string
}

const GenericBodyTile = memo(function GenericBodyTile(props: GenericBodyTileProps) {
  const { avatarStyle, path, currentBody, onSetAvatar } = props
  const thumbnailPath = useMemo(() => getThumbnailPath(path), [path])
  const isSelected =
    currentBody === path &&
    (avatarStyle === UserAvatarStyle.Realistic || avatarStyle === UserAvatarStyle.RealisticRpmHybrid)
  return (
    <button
      className={clsx(classes.selectionButton, isSelected && classes.selected)}
      onClick={() => {
        if (!isSelected) {
          onSetAvatar(path)
        }
      }}
    >
      <img alt="Avatar" src={thumbnailPath} className={clsx(classes.image)} />
    </button>
  )
})

const RpmAvatarTile = memo(function RpmAvatarTile(
  props: Pick<
    AvatarBodyPickerProps,
    "avatarStyle" | "hasCreatedRpmAvatar" | "isGeneratingThumbnail" | "rpmAvatarThumbnailUrl" | "onSelectRpmAvatar"
  >
) {
  const { avatarStyle, hasCreatedRpmAvatar, isGeneratingThumbnail, rpmAvatarThumbnailUrl, onSelectRpmAvatar } = props
  const isSelected = avatarStyle === UserAvatarStyle.ReadyPlayerMe
  const shouldRenderRpmLogo = isGeneratingThumbnail || !rpmAvatarThumbnailUrl

  if (!hasCreatedRpmAvatar) {
    return null
  }

  return (
    <button
      className={clsx(classes.selectionButton, isSelected && classes.selected)}
      onClick={() => {
        if (!isSelected) {
          onSelectRpmAvatar()
        }
      }}
    >
      {shouldRenderRpmLogo ? (
        <RpmLogo className={clsx(classes.image, classes.rpmLogo, isGeneratingThumbnail && classes.loading)} />
      ) : (
        <img
          className={clsx(classes.image, classes.rpmAvatarThumbnail, isGeneratingThumbnail && classes.loading)}
          alt="Use your RPM avatar"
          src={rpmAvatarThumbnailUrl}
        />
      )}
    </button>
  )
})

type CreatorToolkitAvatarTileProps = Pick<
  AvatarBodyPickerProps,
  "avatarStyle" | "currentBody" | "onSelectCreatorToolkitAvatar"
> & {
  avatarData: Avatar
}

const CreatorToolkitAvatarTile = memo(function CreatorToolkitAvatarTile(props: CreatorToolkitAvatarTileProps) {
  const { avatarStyle, currentBody, avatarData, onSelectCreatorToolkitAvatar } = props
  const isSelected = avatarStyle === UserAvatarStyle.CreatorToolkitAvatar && currentBody.includes(avatarData.id)
  const [thumbnailLoadFailed, setThumbnailLoadFailed] = useBoolean(false)

  return (
    <button
      className={clsx(classes.selectionButton, isSelected && classes.selected, "tooltip-host")}
      onClick={() => {
        if (!isSelected) {
          onSelectCreatorToolkitAvatar(avatarData.id, avatarData.scope)
        }
      }}
    >
      {/* img element is hidden through CSS when loading fails, so that the onLoad callback can properly invoke when the src changes to a valid thumbnail */}
      <img
        className={clsx(classes.image, classes.rpmAvatarThumbnail, thumbnailLoadFailed && classes.hide)}
        alt={avatarData.name}
        src={avatarData.thumbnail}
        onError={setThumbnailLoadFailed.setTrue}
        onLoad={setThumbnailLoadFailed.setFalse}
      />
      {thumbnailLoadFailed && <PersonIcon />}
      <span className="tooltip-text tooltip-text--top" style={{ marginBottom: "16px" }}>
        {avatarData.name}
      </span>
    </button>
  )
})

export const AvatarBodyPicker = memo(function AvatarBodyPicker(props: AvatarBodyPickerProps) {
  const {
    bodies,
    hasCreatedRpmAvatar,
    isGeneratingThumbnail,
    rpmAvatarThumbnailUrl,
    creatorToolkitAvatars,
    displayWorldAvatars,
    onClickNew,
    onSelectRpmAvatar,
    ...rest
  } = props

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {bodies.map((path) => {
          return <GenericBodyTile key={path} path={path} {...rest} />
        })}
        {/* Temporary until we get the 5th avatar again: always show "+" button */}
        {/* {!hasCreatedRpmAvatar && ( */}
        <button className={classes.addEditButton} onClick={onClickNew}>
          <div className={classes.addEditButtonInner}>
            <AddIcon />
          </div>
        </button>
        {/* )} */}
      </div>
      {hasCreatedRpmAvatar && (
        <>
          <hr />
          <div className={classes.grid}>
            <RpmAvatarTile
              avatarStyle={rest.avatarStyle}
              hasCreatedRpmAvatar={hasCreatedRpmAvatar}
              isGeneratingThumbnail={isGeneratingThumbnail}
              rpmAvatarThumbnailUrl={rpmAvatarThumbnailUrl}
              onSelectRpmAvatar={onSelectRpmAvatar}
            />

            <button className={classes.addEditButton} onClick={onClickNew}>
              <div className={classes.addEditButtonInner}>
                <EditIcon className="icon icon-sm" />
              </div>
            </button>
          </div>
        </>
      )}

      {creatorToolkitAvatars?.length ? (
        <>
          <hr />
          <div className={classes.grid}>
            {creatorToolkitAvatars
              .filter((avatar) => avatar.scope !== AvatarScope.World || displayWorldAvatars)
              .map((avatar) => {
                return <CreatorToolkitAvatarTile key={avatar.id} avatarData={avatar} {...rest} />
              })}
          </div>
        </>
      ) : null}
    </div>
  )
})
