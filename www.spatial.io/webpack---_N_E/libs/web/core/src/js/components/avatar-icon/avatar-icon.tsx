import { memo } from "react"

import { ReactComponent as PersonOutlineIcon } from "@spatialsys/assets/icons/material-filled/person-outline.svg"
import { PlayerColors } from "@spatialsys/js/util/player-colors"
import { PulseAnimation } from "@spatialsys/web/core/js/components/avatar-icon/pulse-animation/pulse-animation"
import { useProfilePicture } from "@spatialsys/web/core/js/hooks/use-profile-picture"
import { cn } from "@spatialsys/web/ui"

const DefaultPlaceholder = ({ className }: { className?: string }) => (
  <PersonOutlineIcon className={cn("h-full w-full rounded-full p-[3px]", className)} />
)

export interface AvatarIconProps {
  profilePicUrl: string
  className?: string

  /** Optional player color, will be set as background and border color */
  playerColor?: PlayerColors
  /**
   * The element to render if the avatar cannot be fetched / does not exist
   * Defaults to the `person_outline` Material UI icon if undefined
   * */
  placeholder?: JSX.Element
  /**
   * The element to render if while fetching the avatar
   * Defaults to the `person_outline` Material UI icon if undefined
   * */
  loadingPlaceholder?: JSX.Element
  /** Classname applied to the avatar img element */
  imageClassName?: string
  /** Classname applied to the default placeholder element */
  placeholderClassName?: string
  /** Apply player color background when placeholder is being rendered */
  applyPlayerColorToPlaceholder?: boolean
  altText: string
  /** Apply light gray mask on the entire icon */
  isFaded?: boolean
  showShadow?: boolean
  showPulseAnimation?: boolean
  generateRpmAvatarIfNeeded?: boolean
}

export const AvatarIcon = memo(function AvatarIcon(props: AvatarIconProps) {
  const {
    profilePicUrl,
    className,
    altText,
    isFaded,
    imageClassName,
    placeholderClassName,
    playerColor,
    showShadow,
    showPulseAnimation,
    generateRpmAvatarIfNeeded,
  } = props

  const { imgUrl, isGenerating, isLoading } = useProfilePicture(profilePicUrl, generateRpmAvatarIfNeeded)

  const playerColorStyles = playerColor
    ? {
        borderColor: playerColor.mainColor,
        backgroundColor: playerColor.mainColor,
        color: playerColor.textColor,
        ...(showShadow ? { filter: `drop-shadow(0px 4px 8px ${playerColor.boxShadowColor})` } : {}),
      }
    : undefined

  return (
    <div
      className={cn(
        "flex h-full items-center justify-center overflow-hidden rounded-full",
        isFaded && "opacity-40",
        className
      )}
      style={props.applyPlayerColorToPlaceholder ? playerColorStyles : undefined}
    >
      {imgUrl ? (
        <img
          loading="lazy"
          className={cn("relative top-[4%] h-full w-full rounded-full", imageClassName)}
          src={imgUrl}
          alt={altText}
          style={playerColorStyles}
        />
      ) : isLoading || isGenerating ? (
        props.loadingPlaceholder ?? <DefaultPlaceholder className={placeholderClassName} />
      ) : (
        props.placeholder ?? <DefaultPlaceholder className={placeholderClassName} />
      )}
      <PulseAnimation shouldPulse={showPulseAnimation} playerColors={playerColor} />
    </div>
  )
})
