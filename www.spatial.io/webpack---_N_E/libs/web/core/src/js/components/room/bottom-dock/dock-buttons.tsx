import { AnimatePresence, m } from "framer-motion"
import { isEmpty } from "lodash"
import { MutableRefObject, memo, useCallback, useRef } from "react"

import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { trackDockButtonClick } from "@spatialsys/web/analytics"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import { EmoteButton } from "@spatialsys/web/core/js/components/emote-button/emote-button"
import { EmotesTray } from "@spatialsys/web/core/js/components/emotes/emotes-tray"
import { HostToolsButton } from "@spatialsys/web/core/js/components/room/bottom-dock/buttons/host-tools-button"
import { BackpackButton } from "@spatialsys/web/core/js/components/room/economy/backpack-button/backpack-button"
import MediaCaptureButtons, {
  MediaCaptureButtonsProps,
} from "@spatialsys/web/core/js/components/room/media-capture-buttons/media-capture-buttons"
import { CameraButton } from "@spatialsys/web/core/js/components/room/recording-buttons/recording-buttons"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"

import AddContentButton from "./buttons/add-content-button"
import ScreenShareButton from "./buttons/screen-share-button"

import classes from "./dock-buttons.module.scss"

const motionProps = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

export type DockButtonsProps = {
  backpackButtonRef: MutableRefObject<HTMLDivElement | null>
  screenSharing: boolean
  screenShareDisabled: boolean
  openHostTools: () => void
  openBackpackDrawer: () => void
  toggleScreenShare: () => void
  toggleAddContentMenu: () => void
  mediaCaptureButtonsProps: MediaCaptureButtonsProps
}

export const DockButtons = memo(function DockButtons(props: DockButtonsProps) {
  const { openBackpackDrawer, openHostTools, toggleAddContentMenu, toggleScreenShare, backpackButtonRef } = props

  const [isEmoteTrayOpen, setIsEmoteTrayOpen] = useBoolean(false)
  const emoteButtonRef = useRef<HTMLDivElement>(null)

  const { user } = useUser()
  const { userCameraControls } = user.treatmentsParsed
  const isEmptyBackpack = useAppContext((context) => isEmpty(context.state.unity.appState.roomSession.backpack.items))
  const hasWorldCurrency = useAppContext((context) => context.state.unity.appState.roomSession.backpack.worldCurrencyID)

  const actions = useAppContext((context) => context.actions)
  const addContentEnabled = useAppContext((context) => context.state.unity.appState.roomSession.addContentEnabled)
  const hostToolsEnabled = useAppContext((context) =>
    AppStateSelectors.areHostToolsEnabled(context.state.unity.appState)
  )
  const isBackpackDrawerOpen = useAppContext((context) => context.state.unity.appState.roomSession.backpack.isOpen)

  const openReactionsAuthlessUpsell = useCallback(() => {
    actions.openModal({
      type: Modals.Login,
      payload: { forceRedirect: true, titleCta: "Sign up to express yourself with more reactions!" },
    })
  }, [actions])

  const onEmotesButtonClick = useCallback(() => {
    trackDockButtonClick("Reactions")
    setIsEmoteTrayOpen.toggle()
    actions.focusUnity()
  }, [actions, setIsEmoteTrayOpen])

  const onAddContentButtonClick = useCallback(() => {
    trackDockButtonClick("Add Content")
    toggleAddContentMenu()
  }, [toggleAddContentMenu])

  const onHostToolsButtonClick = useCallback(() => {
    trackDockButtonClick("Host Tools")
    openHostTools()
  }, [openHostTools])

  const onScreenShareButtonClick = useCallback(() => {
    trackDockButtonClick("Screen Share")
    toggleScreenShare()
  }, [toggleScreenShare])

  const onBackpackButtonClick = useCallback(() => {
    trackDockButtonClick("Backpack")
    openBackpackDrawer()
    actions.focusUnity()
  }, [actions, openBackpackDrawer])

  return (
    <>
      <EmotesTray
        isOpen={isEmoteTrayOpen}
        onRequestClose={setIsEmoteTrayOpen.setFalse}
        refsToIgnore={[emoteButtonRef]}
        handleAuthlessUpsell={openReactionsAuthlessUpsell}
      />

      <div className={classes.buttonsContainer}>
        <MediaCaptureButtons {...props.mediaCaptureButtonsProps} />
        <EmoteButton ref={emoteButtonRef} onClick={onEmotesButtonClick} showTooltip={!isEmoteTrayOpen} />
        {userCameraControls && <CameraButton />}
        <AnimatePresence mode="wait" initial={false}>
          {(() => {
            if (hasWorldCurrency || !isEmptyBackpack) {
              return (
                <m.div {...motionProps} key="backpack">
                  <BackpackButton
                    ref={backpackButtonRef}
                    onClick={onBackpackButtonClick}
                    showTooltip={!isBackpackDrawerOpen}
                  />
                </m.div>
              )
            }
          })()}
        </AnimatePresence>
        {addContentEnabled && (
          <>
            <ScreenShareButton
              onClick={onScreenShareButtonClick}
              disabled={props.screenShareDisabled}
              screenSharing={props.screenSharing}
            />
            {hostToolsEnabled && <HostToolsButton onClick={onHostToolsButtonClick} />}
            <AddContentButton onClick={onAddContentButtonClick} />
          </>
        )}
      </div>
    </>
  )
})
