import clsx from "clsx"
import { AnimatePresence, m } from "framer-motion"
import { createContext, memo, useCallback, useContext, useEffect, useRef, useState } from "react"
import {
  Channel,
  Chat,
  EventComponentProps,
  MessageActionsArray,
  MessageInput,
  MessageList,
  MessageToSend,
  useChannelActionContext,
} from "stream-chat-react"

import { InteractionName, InteractionType, useTrackInteraction } from "@spatialsys/react/analytics"
import { stiffSpring } from "@spatialsys/theme"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import {
  BanConfirmationModal,
  BlockBanUserPayload,
  BlockConfirmationModal,
} from "@spatialsys/web/core/js/components/chat/block-confirmation-modal/block-ban-confirmation-modal"
import { ChatMessage } from "@spatialsys/web/core/js/components/chat/chat-message/chat-message"
import { logger } from "@spatialsys/web/logger"

import { ChatEmojiPicker } from "./chat-emoji-picker/chat-emoji-picker"
import { SuggestionItem } from "./chat-input/autocomplete/suggestion-item"
import { SuggestionList } from "./chat-input/autocomplete/suggestion-list"
import { ChatInput } from "./chat-input/chat-input"
import { ChatLogChannel, chatSaga } from "./chat-saga"

import classes from "./chat.module.scss"

type ChatProps = { isOpen: boolean; displayAboveModals?: boolean; onSelectUser: (userId: string) => void }

// This is a list of allowed stream chat provided actions the chat can perform
// For a complete list, see: https://getstream.io/chat/docs/sdk/react/components/core-components/message_list/
const allowedMessageActions: MessageActionsArray = ["delete"]

// We use an empty component to discard some Stream Chat provided components we don't need
const EmptyComponent = () => null

const systemMessageHandler = (props: EventComponentProps) => {
  const { message } = props

  // Directly comparing the text seems to be the best way to identify system messages. We always hide "truncate" messages.
  if (message.text === "Truncated channel history.") return <EmptyComponent />
  return <div className={clsx(classes.errorMessage, classes.container)}>{message.text}</div>
}

type ChannelInnerProps = {
  isOpen: boolean
  onAnimationComplete: () => void
}

const ChannelInner = memo(function ChannelInner({ onAnimationComplete, isOpen }: ChannelInnerProps) {
  const { sendMessage } = useChannelActionContext()
  const trackInteraction = useTrackInteraction()

  const actions = useAppContext((context) => context.actions)
  const { maySeeFirstMessage } = useAppContext((context) => context.state.space.chat)
  const openLoginModal = useCallback(() => {
    actions.openModal({ type: Modals.Login, payload: { forceRedirect: true, titleCta: "Log in/Sign up to chat" } })
  }, [actions])
  const { isAuthless } = useAuthState()

  const handleSubmit = useCallback(
    (message: MessageToSend) => {
      if (isAuthless) {
        trackInteraction({ name: InteractionName.AuthlessUserSendChatMessage, type: InteractionType.Click })
        openLoginModal()
        return
      }
      trackInteraction(
        { name: InteractionName.ChatMessageSent, type: InteractionType.Submission },
        { "Message Length": message.text.length }
      )
      if (maySeeFirstMessage) {
        trackInteraction({ name: InteractionName.ChatChannelJoinAndSawFirstMessage, type: InteractionType.View })
        actions.setChatMaySeeFirstMessage(false)
      }
      void sendMessage(message)
    },
    [actions, isAuthless, maySeeFirstMessage, openLoginModal, sendMessage, trackInteraction]
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 150, opacity: 0 }}
            transition={stiffSpring}
            className={classes.transitionComponent}
            onAnimationComplete={onAnimationComplete}
          >
            <MessageList
              hideDeletedMessages
              disableDateSeparator // We don't want to differentiate between messages by date/time in the flow of the chat
              disableQuotedMessages // We don't want users to be able to quote messages
              messageActions={allowedMessageActions} // For now, we only want to allow users to delete messages
              scrolledUpThreshold={200} // After 200px of scrolling up, we want to notify the users when new messages are sent
            />
          </m.div>
        )}
      </AnimatePresence>

      <MessageInput maxRows={2} grow noFiles disableMentions overrideSubmitHandler={handleSubmit} />
    </>
  )
})

/**
 * Passes through the isEntered state because passing it through props to `ChatMessage` was not
 * re-rendering the component when the state changed.
 */
const ChatPanelEnteredContext = createContext(false)
export const useChatPanelEntered = () => useContext(ChatPanelEnteredContext)

export const ChatPanel = memo(function ChatPanel(props: ChatProps) {
  const { displayAboveModals, isOpen, onSelectUser } = props
  const { client, channel, loaded, error } = useAppContext((context) => context.state.space.chat)

  const [blockUserPayload, setBlockUserPayload] = useState<BlockBanUserPayload | null>(null)
  const [banUserPayload, setBanUserPayload] = useState<BlockBanUserPayload | null>(null)

  const runSaga = useAppContext((context) => context.runSaga)
  useEffect(() => {
    const onError = (err) => logger.error(ChatLogChannel, "ChatSaga encountered an error", err)
    const task = runSaga({ onError }, chatSaga)
    return task.cancel
  }, [runSaga])

  const [isEntered, setIsEntered] = useState(false)
  const isOpenRef = useRef(isOpen)
  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])
  const onAnimationComplete = useCallback(() => {
    setIsEntered(isOpenRef.current)
  }, [])

  return (
    <ChatPanelEnteredContext.Provider value={isEntered}>
      <div className={clsx(classes.container, classes.streamChat, displayAboveModals && classes.displayAboveModals)}>
        {(() => {
          if (!loaded || !client) {
            return <div className={classes.infoMessage}>Loading chat...</div>
          }

          if (error) {
            return <div className={classes.infoMessage}>Something went wrong</div>
          }

          return (
            <Chat client={client}>
              <Channel
                channel={channel} // The channel to connect to
                EmojiPicker={ChatEmojiPicker}
                Input={ChatInput} // Our custom input component
                Message={() => (
                  <ChatMessage
                    attemptBlockUser={setBlockUserPayload}
                    attemptBanUser={setBanUserPayload}
                    openUserProfile={onSelectUser}
                  />
                )} // Our custom input component
                // Style chat autocomplete (i.e. when you type `:` and it shows a list of emojis)
                AutocompleteSuggestionHeader={EmptyComponent} // Remove the header
                AutocompleteSuggestionItem={SuggestionItem}
                AutocompleteSuggestionList={SuggestionList}
                MessageSystem={systemMessageHandler} // Hide certain system messages
              >
                <ChannelInner isOpen={isOpen} onAnimationComplete={onAnimationComplete} />
              </Channel>
            </Chat>
          )
        })()}
      </div>

      {/* Modals */}
      <BlockConfirmationModal blockTarget={blockUserPayload} handleClose={() => setBlockUserPayload(null)} />
      <BanConfirmationModal banTarget={banUserPayload} handleClose={() => setBanUserPayload(null)} />
    </ChatPanelEnteredContext.Provider>
  )
})
