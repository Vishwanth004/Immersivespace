import { produce } from "immer"
import type { Channel, StreamChat } from "stream-chat"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"

export interface ChatState {
  channel: Channel | null
  client: StreamChat | null
  error: Error | null
  /** Whether or not the chat panel is currently open */
  isOpen: boolean
  loaded: boolean
  /**
   * Whether the user joined an empty channel and may potentially witness the first message being sent in the channel
   * Used for analytic purposes to determine the potential impacts of an optimization in connecting to chat
   */
  maySeeFirstMessage: boolean
  /** The number of new messages sent while the panel is closed */
  numNewMessages: number
}

export const initialChatState: ChatState = {
  channel: null,
  client: null,
  loaded: false,
  error: null,
  isOpen: true,
  numNewMessages: 0,
  maySeeFirstMessage: false,
}

export enum ChatActionType {
  ProcessChatMessage = "ProcessChatMessage",
  SetChatChannel = "SetChatChannel",
  SetChatClient = "SetChatClient",
  SetChatError = "SetChatError",
  SetChatMaySeeFirstMessage = "SetChatMaySeeFirstMessage",
  ToggleChat = "ToggleChat",
}

export type SetChatChannel = ActionT<ChatActionType.SetChatChannel, Channel | null>
export type SetChatClient = ActionT<ChatActionType.SetChatClient, StreamChat | null>
export type SetChatError = ActionT<ChatActionType.SetChatError, Error | null>
export type ProcessChatMessage = ActionT<ChatActionType.ProcessChatMessage>
export type SetChatMaySeeFirstMessage = ActionT<ChatActionType.SetChatMaySeeFirstMessage, boolean>
export type ToggleChat = ActionT<ChatActionType.ToggleChat>

export const ChatActions = {
  setChatChannel: makeActionCreator<SetChatChannel>(ChatActionType.SetChatChannel),
  setChatClient: makeActionCreator<SetChatClient>(ChatActionType.SetChatClient),
  setChatError: makeActionCreator<SetChatError>(ChatActionType.SetChatError),
  processChatMessage: makeActionCreator<ProcessChatMessage>(ChatActionType.ProcessChatMessage),
  setChatMaySeeFirstMessage: makeActionCreator<SetChatMaySeeFirstMessage>(ChatActionType.SetChatMaySeeFirstMessage),
  toggleChat: makeActionCreator<ToggleChat>(ChatActionType.ToggleChat),
}

export type ChatAction = GetActionType<typeof ChatActions>

export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ChatActionType.SetChatChannel:
      return produce(state, (draft) => {
        draft.channel = action.payload
        draft.loaded = true
      })
    case ChatActionType.SetChatClient:
      return produce(state, (draft) => void (draft.client = action.payload))
    case ChatActionType.SetChatError:
      return produce(state, (draft) => void (draft.error = action.payload))
    case ChatActionType.ProcessChatMessage:
      return produce(state, (draft) => {
        if (!state.isOpen) {
          draft.numNewMessages = state.numNewMessages + 1
        }
      })
    case ChatActionType.SetChatMaySeeFirstMessage:
      return produce(state, (draft) => void (draft.maySeeFirstMessage = action.payload))
    case ChatActionType.ToggleChat:
      return produce(state, (draft) => {
        draft.isOpen = !state.isOpen
        if (state.isOpen) {
          // If closing chat, reset the number of new messages to 0
          draft.numNewMessages = 0
        }
      })
    default:
      return state
  }
}
