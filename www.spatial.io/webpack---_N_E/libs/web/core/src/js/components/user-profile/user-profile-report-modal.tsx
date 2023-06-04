import { useCallback, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"

import { ReportCategory, UnityMessages } from "@spatialsys/unity/bridge"
import { ConfirmModal } from "@spatialsys/web/core/js/components/confirm-modal/confirm-modal"
import SelectDropdown from "@spatialsys/web/core/js/components/select-dropdown/select-dropdown"
import { Heading } from "@spatialsys/web/ui"

import classes from "./user-profile-report-modal.module.scss"

type UserProfileReportModalProps = {
  isOpen: boolean
  onClose: () => void
  userId: string
  displayName: string
  roomId: string
}

export function UserProfileReportModal({ isOpen, onClose, displayName, roomId, userId }: UserProfileReportModalProps) {
  const [details, setDetails] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(ReportCategory.Harassment)

  const confirmReport = useCallback(() => {
    UnityMessages.reportUser(userId, selectedCategory, details, roomId)
    onClose()
  }, [details, onClose, roomId, selectedCategory, userId])

  return (
    <ConfirmModal
      title={`Report ${displayName}?`}
      confirmText="Report"
      denyText="Cancel"
      onDismiss={onClose}
      onDeny={onClose}
      onConfirm={confirmReport}
      isOpen={isOpen}
      message={
        <>
          <Heading as="h4" size="h4" textAlign="center" className="text-gray-500">
            What are they doing?
          </Heading>
          <div>
            <SelectDropdown
              options={Object.values(ReportCategory).map((category) => {
                return {
                  data: category,
                  key: `${category}`,
                  selected: category === selectedCategory,
                }
              })}
              renderOption={(option) => option.data}
              onSelectOption={(option) => {
                setSelectedCategory(option.data)
              }}
              canOpen
              title={selectedCategory}
              className={classes.reportSelectDropdownSettings}
            />
          </div>
          <div>
            <TextareaAutosize
              className={classes.reportTextArea}
              placeholder="(Optional) Enter details..."
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </div>
        </>
      }
    />
  )
}
