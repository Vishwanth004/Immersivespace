import { memo } from "react"

import { LoginModal } from "@spatialsys/web/core/js/components/auth/login/login-modal/login-modal"
import { BannedModal } from "@spatialsys/web/core/js/components/banned-modal/banned-modal"
import { CreateSpaceModal } from "@spatialsys/web/core/js/components/create-space/create-space-modal"
import { DebugSettingsModal } from "@spatialsys/web/core/js/components/debug-settings/debug-settings-modal"
import { NotificationPermissionModal } from "@spatialsys/web/core/js/components/notification-permission-modal/notification-permission-modal"
import { ReportSpaceModal } from "@spatialsys/web/core/js/components/report-space-menu/report-space-modal"
import { TokenGatedRoomModal } from "@spatialsys/web/core/js/components/token-gated-room-modal/token-gated-room-modal"
import { DanceStreakModal } from "@spatialsys/web/core/js/components/unlockables/dance-streak-modal/dance-streak-modal"

/**
 * Global modals that are rendered in the root of the app.
 */
export const GlobalModals = memo(function GlobalModals() {
  return (
    <>
      <BannedModal />
      <TokenGatedRoomModal />
      <NotificationPermissionModal />
      <DebugSettingsModal />
      <LoginModal />
      <DanceStreakModal />
      <CreateSpaceModal />
      <ReportSpaceModal />
    </>
  )
})
