import { memo, useCallback, useMemo } from "react"

import { UnityMessages } from "@spatialsys/unity/bridge"
import {
  AudioGroupAvatarIcon,
  AudioGroupParticipant,
} from "@spatialsys/web/core/js/components/audio-groups/audio-group-avatar-icon"
import { Button, Heading } from "@spatialsys/web/ui"

import { platformToString } from "./utils"

const MAX_ICONS_TO_DISPLAY = 3

interface AudioGroupRowProps {
  currentActorNumber: number
  groupId: number
  members: AudioGroupParticipant[]
}

export const AudioGroupRow = memo(function AudioGroupRow(props: AudioGroupRowProps) {
  const { groupId, members, currentActorNumber } = props

  const isCurrentGroup = useMemo(
    () => members.some((member) => member.actorNumber === currentActorNumber),
    [currentActorNumber, members]
  )

  const membersSortedAndSliced = useMemo(() => {
    return members
      .sort((memberA, memberB) => {
        if (memberB.actorNumber === currentActorNumber && memberA.actorNumber !== currentActorNumber) {
          return 1
        } else {
          return 0
        }
      })
      .slice(0, MAX_ICONS_TO_DISPLAY)
  }, [currentActorNumber, members])

  const title = useMemo(() => {
    return (
      membersSortedAndSliced
        .map((member) => `${member.displayName} (${platformToString(member.platform)})`)
        .join(", ") +
      (members.length > MAX_ICONS_TO_DISPLAY ? "(+" + (members.length - MAX_ICONS_TO_DISPLAY) + ")" : "")
    )
  }, [members.length, membersSortedAndSliced])

  const onClick = useCallback(() => {
    if (isCurrentGroup) {
      UnityMessages.createGroup()
    } else {
      UnityMessages.joinGroup(groupId)
    }
  }, [groupId, isCurrentGroup])

  return (
    <div className="mt-2.5 flex w-full flex-col items-start justify-around">
      <Heading size="h4" className="line-clamp-1">
        {title}
      </Heading>
      <div className="wfull mt-2.5 flex justify-between">
        <div className="flex">
          {membersSortedAndSliced.map((member) => (
            <div className="-mr-7" key={member.id}>
              <AudioGroupAvatarIcon user={member} />
            </div>
          ))}
        </div>
        <Button size="xl" onClick={onClick}>
          {isCurrentGroup ? "Leave Audio Group" : "Join Audio Group"}
        </Button>
      </div>
    </div>
  )
})
