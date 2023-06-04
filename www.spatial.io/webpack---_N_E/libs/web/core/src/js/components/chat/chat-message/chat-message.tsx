import clsx from "clsx"
import { m } from "framer-motion"
import { memo, useCallback, useMemo } from "react"
import { MessageText, useMessageContext } from "stream-chat-react"
import { DefaultStreamChatGenerics, DefaultUserType } from "stream-chat-react/dist/types/types"

import { ReactComponent as MoreHorizIcon } from "@spatialsys/assets/icons/material-filled/more-horiz.svg"
import { formatTimestampAsRelative } from "@spatialsys/js/util/chat-utils"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { stiffSpring } from "@spatialsys/theme"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import { BlockBanUserPayload } from "@spatialsys/web/core/js/components/chat/block-confirmation-modal/block-ban-confirmation-modal"
import { StreamChatUserPayload } from "@spatialsys/web/core/js/components/chat/types"
import Menu from "@spatialsys/web/core/js/components/menu/menu"

import { useChatPanelEntered } from "../chat"

import classes from "./chat-message.module.scss"

/**
 * A custom message component for the chat panel.
 * We use the useMessageContext hook from Stream Chat to get the message data/metadata.
 * This component uses Stream's provided MessageText component,
 * adding additional UI such as AvatarIcon to display the user's avatar.
 *
 * Properties of message.user are passed to Stream Chat by us in the chat-saga.tsx.
 */

type ChatMessageProps = {
  attemptBlockUser: (payload: BlockBanUserPayload) => void
  attemptBanUser: (payload: BlockBanUserPayload) => void
  openUserProfile: (userId: string) => void
}

export const ChatMessage = memo(function ChatMessage(props: ChatMessageProps) {
  const { attemptBlockUser, attemptBanUser, openUserProfile } = props
  const isPanelEntered = useChatPanelEntered()

  const { message, isMyMessage, handleDelete } = useMessageContext<
    DefaultStreamChatGenerics & { userType: DefaultUserType & StreamChatUserPayload }
  >()
  const isOwnMessage = isMyMessage()

  const isBlocked = useAppContext((context) =>
    AppStateSelectors.isUserBlocked(context.state.unity.appState, message.user.id)
  )
  const isUserBannedFromSpace = useAppContext((context) =>
    AppStateSelectors.isUserBannedFromSpace(context.state.unity.appState, message.user.id)
  )

  const userColor = message.user.color ?? "blue"
  const messageText = useMemo(() => {
    if (isBlocked) return "You’ve blocked this user"
    if (isUserBannedFromSpace) return "This Spatian has been removed by a host"
    // We want to set our own messages instead of the Stream Chat defaults
    // Unfortunately, there is no better way to identify these messages than by the message text
    if (message.type === "error") {
      if (message.text === "Message was blocked by moderation policies")
        return "Message not sent: Keep the vibes positive!"
      if (message.text === "The message you are trying to send is larger than 800 characters")
        return "Message not sent: Keep messages under 800 characters."
    }
    return message.text
  }, [isBlocked, isUserBannedFromSpace, message.text, message.type])
  const areHostToolsEnabled = useAppContext((context) =>
    AppStateSelectors.areHostToolsEnabled(context.state.unity.appState)
  )

  const isCurrentUserAdmin = useAppContext((context) =>
    AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState)
  )
  const isMessageSenderAdmin = useAppContext((context) =>
    AppStateSelectors.isUserAdministrator(context.state.unity.appState, message.user.id)
  )
  const [showOverflowMenu, setShowOverflowMenu] = useBoolean(false)
  const [messageHovered, setMessageHovered] = useBoolean(false)
  const handleUnblock = useCallback(() => {
    UnityMessages.unblockUser(message.user.id)
    setShowOverflowMenu.setFalse()
  }, [message.user.id, setShowOverflowMenu])

  const handleUnban = useCallback(() => {
    areHostToolsEnabled && UnityMessages.unbanUserFromRoom(message.user.id)
    setShowOverflowMenu.setFalse()
  }, [areHostToolsEnabled, message.user.id, setShowOverflowMenu])

  const clickUserAvatar = useCallback(() => {
    openUserProfile(message.user.id)
  }, [message.user.id, openUserProfile])

  const { isAuthless } = useAuthState()

  return (
    <m.div
      // When the panel is entering, don't animate the entering of each individual message.
      initial={isPanelEntered ? { scale: 0, y: "100%" } : false}
      animate={{ scale: 1, y: 0 }}
      transition={stiffSpring}
      className={clsx(
        classes.container,
        message.type === "error" ? classes.whiteBackground : classes.transparentBackground,
        showOverflowMenu && classes.overflowMenuOpen
      )}
      onMouseEnter={setMessageHovered.setTrue}
      onMouseLeave={setMessageHovered.setFalse}
    >
      <div
        className={clsx((isBlocked || isUserBannedFromSpace || message.type === "error") && classes.blockedOrBanned)}
      >
        <button className={classes.avatarContainer} onClick={clickUserAvatar}>
          <AvatarIcon
            applyPlayerColorToPlaceholder
            profilePicUrl={message.user.image}
            playerColor={getPlayerColor(userColor)}
            altText={`${message.user.name}'s avatar`}
            className={classes.avatar}
            showShadow
          />
        </button>
        <div className={clsx(classes.content, classes.message)}>
          <span className={classes.name}>{message.user.name}</span>
          <MessageText
            customInnerClass={classes.messageText}
            customWrapperClass={classes.messageTextContainer}
            // We need to set the message type to "regular" so Stream Chat does not inject its own error messages
            message={{ ...message, text: messageText, type: "regular" }}
          />
        </div>
      </div>
      {(messageHovered || showOverflowMenu) && (
        <div className={clsx(classes.topRightBar)}>
          <ChatTimestamp timestamp={message.updated_at} />
          {!isAuthless && (
            <Menu
              dropPosition="dropdown"
              menuPosition="right"
              touchOnly
              paddingStyle="4px 12px"
              classNameContent={classes.overflowMenuContent}
              onClose={setShowOverflowMenu.setFalse}
              render={({ setIsOpen }) => (
                <button
                  onClick={() => {
                    setShowOverflowMenu.setTrue()
                    setIsOpen((isOpen) => !isOpen)
                  }}
                  className={classes.showOverflowMenuButton}
                >
                  <MoreHorizIcon />
                </button>
              )}
            >
              {/* 
                The menu component automatically turns its children into <li>s, which it applies styling for. 
                To facilitate organizing the overflow menu without this styling, we use a fragment to treat the collection
                of possible buttons as 1 child to <Menu> 
              */}
              <>
                {(isOwnMessage || isCurrentUserAdmin) && (
                  <button className={clsx(classes.overflowMenuButton, classes.redText)} onClick={handleDelete}>
                    Delete
                  </button>
                )}
                {!isOwnMessage && (
                  <>
                    <button
                      className={classes.overflowMenuButton}
                      onClick={() =>
                        //if the user is blocked, we don't display a confirmation to unblock them
                        isBlocked
                          ? handleUnblock()
                          : attemptBlockUser({ displayName: message.user.name, userId: message.user.id })
                      }
                    >
                      {isBlocked ? "Unblock" : "Block"}
                    </button>

                    {areHostToolsEnabled && !isMessageSenderAdmin && (
                      <button
                        className={classes.overflowMenuButton}
                        onClick={() =>
                          //if the user is banned, we don't display a confirmation to unban them
                          isUserBannedFromSpace
                            ? handleUnban()
                            : attemptBanUser({ displayName: message.user.name, userId: message.user.id })
                        }
                      >
                        {isUserBannedFromSpace ? "Unban" : "Ban"}
                      </button>
                    )}
                  </>
                )}
              </>
            </Menu>
          )}
        </div>
      )}
    </m.div>
  )
})

type ChatTimestampProps = {
  timestamp: string | Date
}

const ChatTimestamp = memo(function ChatMessage(props: ChatTimestampProps) {
  const { timestamp } = props
  const relativeTimestamp = useMemo(() => formatTimestampAsRelative(timestamp), [timestamp])
  return <time className={classes.timestamp}>{relativeTimestamp}</time>
})
