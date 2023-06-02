import { memo } from "react"
import { DefaultSuggestionList, SuggestionListProps } from "stream-chat-react"

import classes from "./suggestion-list.module.scss"

/**
 * Wraps the default suggestion list from Stream chat, adding a class to add our own styling.
 * See https://getstream.io/chat/docs/sdk/react/guides/customization/suggestion_list/ or
 * https://github.com/GetStream/stream-chat-react/blob/master/src/components/AutoCompleteTextarea/List.jsx for docs.
 *
 * Note for developers: The easiest way to develop on this list is the following:
 * -  Create a timer that triggers the debugger
 * useEffect(() => {
 *   setTimeout(() => {
 *     // debugger
 *   }, 400)
 * }, [])
 * - In DevTools, focus the devtools, then hit F8 to unpause the debugger
 * - You should now be able to inspect the autocompletion list without it disapearing
 */
export const SuggestionList = memo(function SuggestionList(props: SuggestionListProps) {
  // @ts-expect-error types not available for this component.
  return <DefaultSuggestionList {...props} className={classes.container} />
})
