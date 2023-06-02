import { TrackedComponents } from "@spatialsys/react/analytics"
import transitions from "@spatialsys/web/core/css/components/dialog-variables.module.scss"
import {
  NotificationBannerDialog,
  NotificationBannerDialogProps,
} from "@spatialsys/web/core/js/components/notification-banner-dialog/notification-banner-dialog"

const transitionDuration = parseInt(transitions.dialogCloseTransition)

type EditCustomEnvBannerProps = Pick<
  NotificationBannerDialogProps,
  "isVisible" | "onPrimaryButtonClick" | "onSecondaryButtonClick"
>

export function EditCustomEnvironmentBanner(props: EditCustomEnvBannerProps) {
  return (
    <NotificationBannerDialog
      primaryButtonTitle="Looks Good"
      secondaryButtonTitle="Edit"
      description="How does your environment line up?"
      exitAnimationDuration={transitionDuration}
      trackedComponentId={TrackedComponents.EditCustomEnvironmentBanner}
      {...props}
    />
  )
}
