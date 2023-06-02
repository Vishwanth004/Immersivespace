/**
 * @fileoverview adapted from https://github.com/readyplayerme/Example-iframe/blob/develop/src/iframe.html
 */
import clsx from "clsx"
import { memo, useEffect, useRef, useState } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { CloseButton } from "@spatialsys/web/core/js/components/close-button/close-button"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import { CenteredLoader } from "@spatialsys/web/ui"

import classes from "./rpm-customization.module.scss"

function parseRpmEvent(event: any) {
  if (!event.data) return null

  try {
    return JSON.parse(event.data)
  } catch (error) {
    return null
  }
}

type RpmCustomizationProps = {
  hasCreatedRpmAvatar?: boolean
  onAvatarExported?: (url: string) => void
  onUserIdSet?: (url: string) => void
}

/**
 * Renders the iframe for customizing the RPM avatar
 *
 * Calls `onAvatarExported` when the avatar URL is done exporting
 */
export const RpmCustomization = memo(function RpmCustomization(props: RpmCustomizationProps) {
  const { hasCreatedRpmAvatar, onAvatarExported, onUserIdSet } = props
  const ref = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const receiveRpmMessage = (event: any) => {
      const parsedEvent = parseRpmEvent(event)

      // Only handle at RPM events
      if (parsedEvent?.source !== "readyplayerme") {
        return
      }

      // Subscribe to all events sent from Ready Player Me once frame is ready
      if (parsedEvent.eventName === "v1.frame.ready") {
        setIsLoading(false)
        ref.current?.contentWindow.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "subscribe",
            eventName: "v1.**",
          }),
          "*"
        )
      }

      // Avatar ready, URL is to the GLB
      if (parsedEvent.eventName === "v1.avatar.exported") {
        onAvatarExported?.(parsedEvent.data?.url)
      }
      // Get user id. currently unused by our app, but we handle the message anyways per the RPM example
      if (parsedEvent.eventName === "v1.user.set") {
        onUserIdSet?.(parsedEvent.data.id)
      }
    }

    window.addEventListener("message", receiveRpmMessage)

    return () => {
      window.removeEventListener("message", receiveRpmMessage)
    }
  }, [onAvatarExported, onUserIdSet])

  return (
    <TrackedComponent id={TrackedComponents.ReadyPlayerMeCustomizationIFrame} properties={{ hasCreatedRpmAvatar }}>
      {isLoading && <CenteredLoader variant="fancy" color="black" />}
      <iframe
        ref={ref}
        className={clsx(classes.iframe, isLoading && classes.loading)}
        title="Create Ready Player Me Avatar"
        id="rpm-customization-iframe"
        width="100%"
        height="100%"
        allow="camera * "
        /**
         * IMPORTANT: must include `?frameApi` to get the `event.data.source` attribute and isReady event
         * They do not have documentation yet, but are recommending this approach and will be using this going forward
         */
        src="https://spatial.readyplayer.me/?frameApi"
      />
    </TrackedComponent>
  )
})

type ReadyPlayerMeModalProps = ModalProps & RpmCustomizationProps

export const RpmCustomizationModal = memo(function AvatarHeadGenerationModal(props: ReadyPlayerMeModalProps) {
  const { hasCreatedRpmAvatar, onAvatarExported, onUserIdSet, ...modalProps } = props

  return (
    <Modal darkOverlay modalBaseClass={classes.modal} {...modalProps}>
      <RpmCustomization
        hasCreatedRpmAvatar={hasCreatedRpmAvatar}
        onAvatarExported={onAvatarExported}
        onUserIdSet={onUserIdSet}
      />
      <CloseButton onClick={modalProps.onRequestClose} />
    </Modal>
  )
})
