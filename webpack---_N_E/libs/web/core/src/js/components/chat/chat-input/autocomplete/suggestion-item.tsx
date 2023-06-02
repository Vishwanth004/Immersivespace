import { forwardRef } from "react"
import { DefaultSuggestionListItem, SuggestionItemProps } from "stream-chat-react"

import classes from "./suggestion-item.module.scss"

/**
 * Wraps the default suggestion item from Stream chat, adding a class to add our own styling.
 * See https://getstream.io/chat/docs/sdk/react/guides/customization/suggestion_list/ or
 * https://github.com/GetStream/stream-chat-react/blob/master/src/components/AutoCompleteTextarea/Item.jsx for docs.
 */
export const SuggestionItem = forwardRef<HTMLDivElement, SuggestionItemProps>(function SuggestionItem(props, ref) {
  // @ts-expect-error types not available for this component.
  return <DefaultSuggestionListItem ref={ref} {...props} className={classes.container} />
})
