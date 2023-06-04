import clsx from "clsx"
import { KeyboardEventHandler, memo, useCallback, useMemo } from "react"
import { ChatAutoComplete, EmojiPicker, useChannelStateContext, useMessageInputContext } from "stream-chat-react"

import { ReactComponent as CloseChatIcon } from "@spatialsys/assets/icons/material-filled/forum.svg"
import { ReactComponent as InsertEmoticonIcon } from "@spatialsys/assets/icons/material-filled/insert-emoticon.svg"
import { ReactComponent as OpenChatIcon } from "@spatialsys/assets/icons/material-outlined/forum.svg"
import { useAppContext } from "@spatialsys/web/app-context"

import classes from "./chat-input.module.scss"

/*
 * This is a custom component used to replace the default input box for the chat
 * We use Stream Chat's provided context & components to build our own
 */
export const ChatInput = memo(function ChatInput() {
  const { isOpen, numNewMessages } = useAppContext((context) => context.state.space.chat)
  const { emojiPickerIsOpen, closeEmojiPicker, openEmojiPicker } = useMessageInputContext()
  const { messages } = useChannelStateContext()
  const actions = useAppContext((context) => context.actions)

  const messageCount = useMemo(
    () => messages.filter((m) => m.type !== "deleted" && m.type !== "system").length,
    [messages]
  )

  const focusUnityCallback: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => e.key === "Escape" && actions.focusUnity(),
    [actions]
  )

  const handleClickEmojiButton = useMemo(
    () => (emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker),
    [closeEmojiPicker, emojiPickerIsOpen, openEmojiPicker]
  )

  const openChat = useCallback(() => {
    if (!isOpen) actions.toggleChat()
  }, [actions, isOpen])

  const onToggleChatClick = useCallback(() => {
    actions.toggleChat()
    actions.focusUnity()
  }, [actions])

  return (
    <div className={classes.container} onKeyDown={focusUnityCallback}>
      <ChatAutoComplete onFocus={openChat} placeholder={isOpen && !messageCount ? "Say hello!" : "Chat"} />

      <div className={classes.buttonsContainer}>
        {isOpen && (
          <button
            aria-label="Toggle Emoji Picker"
            className={clsx("tooltip-host", classes.actionButton)}
            onClick={handleClickEmojiButton}
          >
            <span className={clsx("tooltip-text tooltip-text--top", classes.tooltip)}>Emojis</span>
            <InsertEmoticonIcon />
          </button>
        )}

        <button
          aria-label="Toggle Chat"
          className={clsx("tooltip-host", classes.actionButton)}
          onClick={onToggleChatClick}
        >
          <span className={clsx("tooltip-text tooltip-text--top", classes.tooltip)}>
            {isOpen ? "Hide Chat" : "Open Chat"}
          </span>
          {isOpen ? <CloseChatIcon /> : <OpenChatIcon />}
          {!isOpen && numNewMessages > 0 && <span className={classes.redDot} />}
        </button>
      </div>

      <div className={classes.emojiPicker}>
        <EmojiPicker />
      </div>
    </div>
  )
})
