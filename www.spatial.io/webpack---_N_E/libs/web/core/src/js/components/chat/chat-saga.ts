import { buffers, eventChannel } from "redux-saga"
import { Channel, Event, StreamChat } from "stream-chat"
import { call, put, select } from "typed-redux-saga/macro"

import { LogChannel } from "@spatialsys/js/logger"
import { takeEveryAndClose } from "@spatialsys/js/redux"
import { InteractionName, InteractionType, trackInteraction } from "@spatialsys/react/analytics"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { waitUntilTrue } from "@spatialsys/use-saga"
import { track } from "@spatialsys/web/analytics"
import { Actions, AppState } from "@spatialsys/web/app-state"
import Config from "@spatialsys/web/config"
import { sapiSpaceClient } from "@spatialsys/web/sapi"

export const ChatLogChannel = new LogChannel("Chat")

/**
 * A saga to manage the state of the Stream Chat client connection:
 * 1) Fetches a token from SAPI via unityAppState to connect to Stream Chat
 * 2) Instantiate a Stream Chat client and connects to the channel associated with the space
 * 3) Use another saga for for handling the messaging once connected
 * 4) On disconnection, stop watching the channel and disconnect the user
 *
 * This saga is split into 2 to ensure that the client disconnects from websockets reliably
 * For example, if async function fails & throws between connection and disconnection of a room
 * If the inner saga throws, the outer saga will catch it and disconnect properly
 *
 * To optimize our MAU & CCU numbers on Stream Chat, all authless users share a single userID(which is unique per room)
 * This is done to avoid creating a new Stream Chat user for every authless user
 * We handle this by having SAPI return a "userID" that we use to connect to Stream Chat with in addition to the token
 * Furthermore, authless users have the `read_only` role in Stream Chat instead of the `user` role
 * This means they cannot set their own properties, such as name, image, and color. The WS connection will fail if they do.
 *
 * User image, name, and color are supplied to stream chat by SAPI.
 *
 * TODO:
 * Ideally, we should only disconnect from the channel if there is an error/the user leaves the spaces page entirely
 * If a user switches rooms(eg via a portal), there should be no need to open/reopen a socket
 * We can theoretically simply switch the channel the client is watching
 */
export function* chatSaga() {
  const chatClient = StreamChat.getInstance(Config.STREAM_API_KEY)
  const meetingId = yield* select((state: AppState) => state.unity.appState.roomSession.meetingID)
  // Must wait until `inRoomAndFullyParticipating` is true before connecting to chat
  // We need to be in the photon room, otherwise a SAPI check will fail.
  yield* waitUntilTrue((state: AppState) => state.unity.appState.roomSession.inRoomAndFullyParticipating)
  let joinChatResponse
  try {
    joinChatResponse = yield* call(sapiSpaceClient.space.joinChat, meetingId)
  } catch (error) {
    yield* put(Actions.setChatError(error))
    throw error
  }

  try {
    yield* call(
      [chatClient, chatClient.connectUser],
      {
        id: joinChatResponse.userID, //use the userID from the joinChatResponse to accomodate for authless users
      },
      joinChatResponse.token
    )
  } catch (error) {
    yield* put(Actions.setChatError(error))
    throw error
  }
  yield* put(Actions.setChatClient(chatClient))
  // We track analytics on a successful connection to chat
  // If the user joins an empty channel, we track whether or not they may potentially witness the first message being sent
  // This is used to determine the potential impacts of an optimization in connecting to chat
  yield* call(trackInteraction, track, { name: InteractionName.ChatChannelJoin, type: InteractionType.View })
  if (
    joinChatResponse.messages.filter((message) => message.type !== "system" && message.type !== "deleted").length === 0
  ) {
    yield* put(Actions.setChatMaySeeFirstMessage(true))
  }

  const channel = chatClient.channel(joinChatResponse.channel.channelType, joinChatResponse.channel.channelName)

  try {
    yield* call(chatMessagesSaga, channel)
  } finally {
    yield* call([chatClient, chatClient.disconnectUser])
  }
}

/**
 * A helper saga to handle the messaging once connected to the channel
 * After watching to the channel passed to it, chatMessageSaga will
 * watch for new messages being received/sent and forward them to UnityBridge
 */
function* chatMessagesSaga(channel: Channel) {
  yield* call([channel, channel.watch])
  yield* put(Actions.setChatChannel(channel))

  const messageChannel = eventChannel<Event>((emitter) => {
    const { unsubscribe } = channel.on("message.new", emitter)
    return unsubscribe
  }, buffers.sliding())

  try {
    yield* takeEveryAndClose(messageChannel, chatMessageHandler)
  } finally {
    yield* call([channel, channel.stopWatching])
  }
}

function* chatMessageHandler(event: Event) {
  yield* call(UnityMessages.processChatMessage, event.user.id, event.message.text)
  const maySeeFirstMessage = yield* select((state: AppState) => state.space.chat.maySeeFirstMessage)
  if (maySeeFirstMessage) {
    yield* call(trackInteraction, track, {
      name: InteractionName.ChatChannelJoinAndSawFirstMessage,
      type: InteractionType.View,
    })
    yield* put(Actions.setChatMaySeeFirstMessage(false))
  }
  // Tells React app a new message has come in, giving the opportunity to update the number of unread messages
  // while chat panel is closed
  yield* put(Actions.processChatMessage())
}
