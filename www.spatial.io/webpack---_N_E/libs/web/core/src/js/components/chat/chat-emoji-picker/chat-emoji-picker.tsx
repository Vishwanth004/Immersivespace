import { memo } from "react"
import { useMessageInputContext } from "stream-chat-react"

import { EmojiPicker } from "@spatialsys/web/core/js/components/emoji-picker/emoji-picker"

/**
 * Emoji picker for chat. Wraps our custom emoji picker component
 */
export const ChatEmojiPicker = memo(function ChatEmojiPicker() {
  const { onSelectEmoji } = useMessageInputContext()

  return (
    <EmojiPicker onEmojiSelect={onSelectEmoji} theme="light" navPosition="bottom" previewPosition="none" perLine={10} />
  )
})
