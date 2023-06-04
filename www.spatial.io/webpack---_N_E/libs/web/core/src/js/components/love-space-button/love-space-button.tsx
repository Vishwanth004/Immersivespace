import clsx from "clsx"
import { memo, useCallback, useMemo } from "react"

import { ReactComponent as OutlinedHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite-border.svg"
import { ReactComponent as FilledHeartIcon } from "@spatialsys/assets/icons/material-filled/favorite.svg"
import { abbreviateNumber } from "@spatialsys/js/util/format-numbers"
import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useSetSpaceLovedMutation } from "@spatialsys/react/query-hooks/spaces"
import { useAppContext } from "@spatialsys/web/app-context"
import { PushNotificationPermissionModalType } from "@spatialsys/web/app-state"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { sapiSpaceClient } from "@spatialsys/web/sapi"

import classes from "./love-space-button.module.scss"

export type LoveSpaceButtonProps = {
  classNameContainer?: string
  classNameIcon?: string
  classNameText?: string
  handleUnauthenticatedClick: () => void
  hideLoveCount?: boolean
  isDisabled?: boolean
  isLoved?: boolean
  loveCount: number
  spaceId: string
}

export const LoveSpaceButton = memo(function LoveSpaceButton(props: LoveSpaceButtonProps) {
  const {
    classNameContainer,
    classNameIcon,
    classNameText,
    handleUnauthenticatedClick,
    hideLoveCount,
    isDisabled,
    isLoved,
    loveCount,
    spaceId,
  } = props

  const [isHovering, setIsHovering] = useBoolean(false)
  const [isFocused, setIsFocused] = useBoolean(false)
  const isAuthenticated = useAppContext((context) => Boolean(context.state.auth.accessToken))
  const setSpaceLovedMutation = useSetSpaceLovedMutation(sapiSpaceClient)
  const trackInteraction = useTrackInteraction()
  const actions = useAppContext((context) => context.actions)

  const loveIcon = useMemo(() => {
    if (loveCount > 0 && isLoved) {
      return <FilledHeartIcon className={clsx(classes.icon, classes.redIcon, classNameIcon)} />
    }
    if (isHovering || isFocused) {
      return <FilledHeartIcon className={clsx(classes.icon, classNameIcon)} />
    }
    return <OutlinedHeartIcon className={clsx(classes.icon, classNameIcon)} />
  }, [classNameIcon, isFocused, isHovering, isLoved, loveCount])

  const loveCountText = useMemo(() => {
    if (loveCount === 0 || hideLoveCount) {
      return undefined
    }
    return abbreviateNumber(loveCount, 1)
  }, [hideLoveCount, loveCount])

  const handleSetSpaceLoved = useCallback(() => {
    const newLoveState = !isLoved
    setSpaceLovedMutation.mutate(
      { spaceId, isLoved: newLoveState },
      {
        onError: () =>
          Toast.error(`Error occurred when ${newLoveState ? "loving" : "unloving"} space. Please try again later`),
      }
    )
    trackInteraction(
      {
        name: newLoveState ? InteractionName.LoveSpace : InteractionName.UnloveSpace,
        type: InteractionType.Click,
      },
      {
        "Room ID": spaceId,
      }
    )
    if (newLoveState) {
      actions.requestPushNotificationPermission(PushNotificationPermissionModalType.LoveSpace)
    }
  }, [actions, isLoved, setSpaceLovedMutation, spaceId, trackInteraction])

  return (
    <button
      aria-label="Love this space"
      className={clsx(classes.container, classNameContainer)}
      disabled={isDisabled}
      onClick={(e) => {
        // Prevent click event of parent button from executing
        e.preventDefault()
        // Also stop propagation to parent elements (e.g. portal destination picker modal button events that preventDefault() fails to stop)
        e.stopPropagation()
        if (isAuthenticated) {
          handleSetSpaceLoved()
        } else {
          handleUnauthenticatedClick()
        }
        // Unfocus button so filled visual doesn't stay in place
        e.currentTarget.blur()
      }}
      onFocus={setIsFocused.setTrue}
      onBlur={setIsFocused.setFalse}
      onMouseEnter={setIsHovering.setTrue}
      onMouseLeave={setIsHovering.setFalse}
    >
      {loveIcon}
      <span className={classNameText}>{loveCountText}</span>
    </button>
  )
})
