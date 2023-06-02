import clsx from "clsx"
import Link from "next/link"
import { ReactNode, memo } from "react"

import { SpaceAndCreator } from "@spatialsys/js/sapi/types"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { SetBoolean, useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { formatSpacePath } from "@spatialsys/url-utils"

import { AvatarIcon } from "../../../avatar-icon/avatar-icon"
import NamePlaceholder from "../../../avatar-icon/name-placeholder/name-placeholder"
import { LinkOrButton } from "../../../link-or-button/link-or-button"

import classes from "./space-name-and-creator.module.scss"

type TextColor = "white" | "black"

export type SpaceNameAndCreatorProps = {
  openCreatorProfileInNewTab: boolean
  asButton: boolean
  spaceAndCreator: SpaceAndCreator
  onClick: (spaceData: SpaceAndCreator) => void
  spaceHovered?: boolean
  setSpaceHovered?: SetBoolean
  overflowMenu?: ReactNode
  textColor?: TextColor
}

const getSetHoveredProps = (setHovered?: SetBoolean) => ({
  onMouseEnter: setHovered?.setTrue,
  onMouseLeave: setHovered?.setFalse,
  onFocus: setHovered?.setTrue,
  onBlur: setHovered?.setFalse,
})

export const SpaceNameAndCreator = memo(function SpaceNameAndCreator(props: SpaceNameAndCreatorProps) {
  const {
    openCreatorProfileInNewTab,
    spaceAndCreator: { space, creator },
    asButton,
    onClick,
    spaceHovered,
    setSpaceHovered,
    overflowMenu,
    textColor = "black",
  } = props
  const [creatorHovered, setCreatorHovered] = useBoolean(false)
  const spacePath = formatSpacePath(space.id, space.slug, space.shareID)
  const creatorPath = `/@${creator.username}`
  const namePlaceholder = (
    <span className={classes.namePlaceholder}>
      <NamePlaceholder displayName={creator.displayName} />
    </span>
  )
  return (
    <div
      className={clsx(
        classes.container,
        creatorHovered && classes.creatorHovered,
        spaceHovered && classes.spaceHovered
      )}
    >
      <Link
        href={creatorPath}
        className={classes.creatorLink}
        target={openCreatorProfileInNewTab ? "_blank" : undefined}
        rel={openCreatorProfileInNewTab ? "noreferrer" : undefined}
        {...getSetHoveredProps(setCreatorHovered)}
      >
        <AvatarIcon
          className={classes.creatorAvatarThumbnail}
          profilePicUrl={creator.avatarImageURL}
          altText={creator.displayName}
          playerColor={getPlayerColor(creator.appearanceCustomization.profileColor)}
          placeholder={namePlaceholder}
          loadingPlaceholder={namePlaceholder}
          applyPlayerColorToPlaceholder
        />
      </Link>
      <div className={classes.infoRightPanel}>
        <LinkOrButton
          className={classes.spaceLink}
          asButton={asButton}
          linkHref={spacePath}
          onClick={() => onClick(props.spaceAndCreator)}
          {...getSetHoveredProps(setSpaceHovered)}
        >
          <h2 className={clsx(classes.spaceName, textColor === "white" && classes.whiteText)}>
            <UnderlineContainer>{space.name}</UnderlineContainer>
          </h2>
        </LinkOrButton>
        <Link
          href={creatorPath}
          className={classes.creatorLink}
          target={openCreatorProfileInNewTab ? "_blank" : undefined}
          rel={openCreatorProfileInNewTab ? "noreferrer" : undefined}
          {...getSetHoveredProps(setCreatorHovered)}
        >
          <span className={clsx(classes.creatorName, textColor === "white" && classes.whiteText)}>
            {creator.displayName}
          </span>
        </Link>
      </div>
      {overflowMenu}
    </div>
  )
})

function UnderlineContainer({ children }: { children: string }) {
  return (
    <span className={classes.underlineOuter}>
      <span className={classes.underlineInner}>{children}</span>
    </span>
  )
}
