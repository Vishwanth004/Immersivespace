import emailParser, { ParsedMailbox } from "email-addresses"
import { memo, useCallback } from "react"

import * as Toast from "@spatialsys/web/core/js/components/toast/toast"

import { InputWithSubmit } from "./input-and-submit/input-with-submit"

export interface InviteGuestsFormProps {
  onAddInvitedUsers: (emails: any) => void
}

/*
 * Extracts emails from a string, discards names, etc.
 *
 * @param rawInput String that includes comma separated emails compliant to RFC 5322
 */
const extractEmails = (rawInput: string): string[] => {
  return emailParser.parseAddressList(rawInput)?.map((emailObj: ParsedMailbox) => emailObj.address)
}

export const InviteGuestsForm = memo(function InviteGuestsForm(props: InviteGuestsFormProps) {
  const { onAddInvitedUsers } = props

  /**
   * Gets called when text area is submitted, and accommodates for lists and single emails.
   */
  const handleEmailShareSubmit = useCallback(
    (emailInputVal: string) => {
      const emailList = extractEmails(emailInputVal)
      if (emailList?.length > 50) {
        Toast.error("You cannot share to over 50 emails at once.")
        return emailInputVal
      }
      if (emailList) {
        onAddInvitedUsers(emailList)
      } else {
        onAddInvitedUsers([emailInputVal])
      }
      return ""
    },
    [onAddInvitedUsers]
  )

  return (
    <InputWithSubmit
      onSubmit={handleEmailShareSubmit}
      buttonContent="Send"
      placeholder="Separate multiple addresses by commas"
    />
  )
})
