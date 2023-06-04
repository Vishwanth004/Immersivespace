import { memo } from "react"

export const NewItemNotification = memo(function NewItemNotification() {
  return (
    <span className="absolute right-0 top-0 flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-notification-ping rounded-full bg-blue opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-blue"></span>
    </span>
  )
})
