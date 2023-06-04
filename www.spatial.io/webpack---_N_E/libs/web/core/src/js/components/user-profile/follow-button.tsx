import { memo } from "react"

import { Button, ButtonProps } from "@spatialsys/web/ui"

export interface FollowButtonProps {
  isFollowing: boolean
  onFollow: () => void
  onUnfollow: () => void
  followButtonColor?: ButtonProps["color"]
  followingButtonColor?: ButtonProps["color"]
  className?: string
}

export const FollowButton = memo(function FollowButton(props: FollowButtonProps) {
  const {
    isFollowing,
    className,
    followingButtonColor = "outline",
    followButtonColor = "black",
    onUnfollow,
    onFollow,
  } = props
  return isFollowing ? (
    <Button color={followingButtonColor} size="xl" className={className} onClick={onUnfollow}>
      Following
    </Button>
  ) : (
    <Button color={followButtonColor} size="xl" className={className} onClick={onFollow}>
      Follow
    </Button>
  )
})
