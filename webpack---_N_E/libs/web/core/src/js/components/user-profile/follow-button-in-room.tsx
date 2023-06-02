import { useCallback, useEffect, useMemo, useState } from "react"

import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals, PushNotificationPermissionModalType } from "@spatialsys/web/app-state"
import { FollowButton, FollowButtonProps } from "@spatialsys/web/core/js/components/user-profile/follow-button"

export interface FollowButtonInRoomProps extends Pick<FollowButtonProps, "className"> {
  userID: string
}

export const FollowButtonInRoom = (props: FollowButtonInRoomProps) => {
  const { userID } = props
  const { followings } = useAppContext((context) => context.state.unity.appState.userProfile)
  const { isAuthless } = useAuthState()
  const trackInteraction = useTrackInteraction()
  const actions = useAppContext((context) => context.actions)
  const openLoginModal = useCallback(
    // Always force redirect when signing in from in-room
    () =>
      actions.openModal({
        type: Modals.Login,
        payload: { forceRedirect: true, titleCta: "Sign in to follow other Spatians!" },
      }),
    [actions]
  )

  const isFollowing = useMemo(() => followings.includes(userID), [followings, userID])
  const [isFollowingLocal, setIsFollowingLocal] = useState(isFollowing)

  const handleFollowUser = useCallback(() => {
    if (isAuthless) {
      openLoginModal()
      return
    }

    setIsFollowingLocal(true)
    UnityMessages.followUser(userID)
    UnityMessages.updateSelectedSocialProfileStateWithId(userID, true)
    trackInteraction({ type: InteractionType.Click, name: InteractionName.FollowUser }, { userId: userID })
    actions.requestPushNotificationPermission(PushNotificationPermissionModalType.FollowUser)
  }, [isAuthless, userID, trackInteraction, actions, openLoginModal])

  const handleUnfollowUser = useCallback(() => {
    setIsFollowingLocal(false)
    UnityMessages.unfollowUser(userID)
    trackInteraction({ type: InteractionType.Click, name: InteractionName.UnfollowUser }, { userId: userID })
  }, [setIsFollowingLocal, userID, trackInteraction])

  // refresh our profile when we gained focus on the page
  // handles refreshing app state if we opened the profile link to edit our profile or follow/unfollow someone else
  useEffect(() => {
    const focusListener = () => {
      UnityMessages.refreshUserProfile()
    }

    window.addEventListener("focus", focusListener)

    return () => {
      window.removeEventListener("focus", focusListener)
    }
  }, [])

  useEffect(() => {
    setIsFollowingLocal(isFollowing)
  }, [isFollowing])

  return (
    <FollowButton
      isFollowing={isFollowingLocal}
      onFollow={handleFollowUser}
      onUnfollow={handleUnfollowUser}
      {...props}
    />
  )
}
