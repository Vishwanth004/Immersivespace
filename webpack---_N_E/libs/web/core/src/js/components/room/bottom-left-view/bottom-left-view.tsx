import clsx from "clsx"
import { AnimatePresence, m } from "framer-motion"
import { Suspense, forwardRef, lazy, memo, useCallback, useRef } from "react"

import { ReactComponent as HelpIcon } from "@spatialsys/assets/icons/material-outlined/help-outline.svg"
import { usePatchMeMutation } from "@spatialsys/react/query-hooks/sapi/user"
import { AppStateSelectors, CameraMode } from "@spatialsys/unity/app-state"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { UiModes } from "@spatialsys/web/app-state"
import { PlayControls } from "@spatialsys/web/core/js/components/play-controls/play-controls"
import { QuestStatusPill } from "@spatialsys/web/core/js/components/quests/quest-status-pill/quest-status-pill"
import { DockPillButton } from "@spatialsys/web/core/js/components/room/dock-pill-button/dock-pill-button"
import MediaCaptureButtons, {
  MediaCaptureButtonsProps,
} from "@spatialsys/web/core/js/components/room/media-capture-buttons/media-capture-buttons"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { TransitionComponentHidden } from "@spatialsys/web/core/js/routes/rooms/room/transition-components"
import { sapiClient } from "@spatialsys/web/sapi"
import { Storage } from "@spatialsys/web/storage"

import { EmoteButton, EmoteButtonProps } from "../../emote-button/emote-button"
import { EmotesTray } from "../../emotes/emotes-tray"

import classes from "./bottom-left-view.module.scss"

const FirstTutorial = lazy(() =>
  import("@spatialsys/web/core/js/components/first-tutorial/first-tutorial").then((mod) => ({
    default: mod.FirstTutorial,
  }))
)

const motionProps = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

type BottomLeftViewProps = {
  is2dUiVisible: boolean
  isCustomizingAvatar: boolean
  isBackpackDrawerOpen: boolean
  isShopDrawerOpen: boolean
  isEmoteTrayOpen: boolean
  showTutorial: boolean
  supportsUserMedia: boolean
  onOpenControls: () => void
  mediaCaptureButtonsProps: MediaCaptureButtonsProps
  emoteButtonProps: EmoteButtonProps
}

export const BottomLeftView = memo(
  forwardRef<HTMLDivElement, BottomLeftViewProps>(function BottomLeftView(
    props: BottomLeftViewProps,
    bottomLeftViewRef
  ) {
    const {
      is2dUiVisible,
      isBackpackDrawerOpen,
      isShopDrawerOpen: isMirroredView,
      isEmoteTrayOpen,
      isCustomizingAvatar,
      showTutorial,
      supportsUserMedia,
      onOpenControls,
      mediaCaptureButtonsProps,
      emoteButtonProps,
    } = props

    const ref = useRef<HTMLDivElement>(null)
    const emoteButtonRef = useRef<HTMLDivElement>(null)

    const { isAuthless } = useAuthState()
    const { user } = useUser()
    const { coreLoopQuestsV1 } = user.treatmentsParsed
    const { mutate: patchUser } = usePatchMeMutation(sapiClient)

    const actions = useAppContext((context) => context.actions)
    const cameraMode = useAppContext((context) => context.state.unity.appState.roomSession.camera.mode)
    const questSystemReady = useAppContext((context) => context.state.unity.appState.roomSession.questSystem.isReady)
    const activeQuest = useAppContext((context) => AppStateSelectors.getActiveQuest(context.state.unity.appState))
    const uiMode = useAppContext((context) => context.state.space.uiMode)

    const shouldShowAutoplay = useAppContext((context) =>
      AppStateSelectors.shouldShowAutoplayControls(context.state.unity.appState)
    )

    const closeTutorial = useCallback(() => {
      Storage.setItem(Storage.STORAGE_FINISHED_TUTORIAL_KEY, true)
      actions.setSpaceState({ showFirstTutorial: false })

      if (!isAuthless) {
        // This call fails for authless users
        patchUser({
          disableWebControlsTutorial: true,
        })
      }

      // TODO(DEV-19593): if user is in onboarding, show recommended spaces to join.
    }, [actions, isAuthless, patchUser])

    const closeEmotesTray = useCallback(() => {
      actions.setSpaceState({ isEmoteTrayOpen: false })
    }, [actions])

    const isVisibleWithPanel = supportsUserMedia && (isCustomizingAvatar || isBackpackDrawerOpen || isMirroredView)

    return (
      <TransitionComponentHidden ref={ref} in={is2dUiVisible && uiMode !== UiModes.Camera}>
        <div
          className={clsx(
            "ml-5 grid w-fit grid-flow-col items-center gap-4 self-end",
            isMirroredView ? classes.mirrorContainer : classes.container,
            "scaleIn",
            isVisibleWithPanel ? "z-above-modal" : "z-10"
          )}
          ref={bottomLeftViewRef}
        >
          <AnimatePresence mode="wait" initial={false}>
            {(() => {
              // Show AV controls at bottom-left when one of the following panels is open:
              // avatar customization panel, backpack panel, shop panel
              if (isVisibleWithPanel) {
                return (
                  <m.div className="grid gap-5 lg:grid-flow-col" {...motionProps} key="av">
                    <div className={isMirroredView ? undefined : "lg:order-2"}>
                      <EmotesTray
                        isOpen={isEmoteTrayOpen}
                        refsToIgnore={[emoteButtonRef]}
                        onRequestClose={closeEmotesTray}
                      />
                    </div>
                    <div
                      className={clsx(
                        "grid grid-flow-col items-center gap-3",
                        isMirroredView ? "justify-end" : "justify-start"
                      )}
                    >
                      {isMirroredView ? (
                        <>
                          <EmoteButton ref={emoteButtonRef} {...emoteButtonProps} />
                          <MediaCaptureButtons {...mediaCaptureButtonsProps} />
                        </>
                      ) : (
                        <>
                          <MediaCaptureButtons {...mediaCaptureButtonsProps} />
                          <EmoteButton ref={emoteButtonRef} {...emoteButtonProps} />
                        </>
                      )}
                    </div>
                  </m.div>
                )
              }

              if (showTutorial) {
                return (
                  <m.div {...motionProps} key="tutorial">
                    <Suspense fallback={null}>
                      <FirstTutorial onDone={closeTutorial} />
                    </Suspense>
                  </m.div>
                )
              }

              // Is in autoplay (i.e. via keyboard shortcut), show autoplay UI with priority over quest UI
              if (cameraMode === CameraMode.ArtNavigation || cameraMode === CameraMode.AutoPlay) {
                return (
                  <m.div {...motionProps} key="autoplay">
                    <PlayControls />
                  </m.div>
                )
              }

              // If there is an active quest, show the quest UI with priority over autoplay UI
              if (questSystemReady && activeQuest && coreLoopQuestsV1) {
                return (
                  <m.div {...motionProps} key="questPill">
                    <QuestStatusPill />
                  </m.div>
                )
              }

              // Show autoplay UI if there is no active quest, and autoplay is enabled for the space
              if (shouldShowAutoplay) {
                return (
                  <m.div {...motionProps} key="autoplay">
                    <PlayControls />
                  </m.div>
                )
              }

              // There is no active quest and autoplay is disabled, show help button
              return isAuthless ? (
                <m.div {...motionProps} key="help">
                  <DockPillButton onClick={onOpenControls} leftIcon={<HelpIcon />}>
                    Controls
                  </DockPillButton>
                </m.div>
              ) : (
                <m.button
                  {...motionProps}
                  key="help"
                  className={"tooltip-host flex h-12 w-12 items-center justify-center text-white"}
                  onClick={onOpenControls}
                >
                  <HelpIcon />
                  <span className={"tooltip-text tooltip-text--top mb-2"}>Controls</span>
                </m.button>
              )
            })()}
          </AnimatePresence>
        </div>
      </TransitionComponentHidden>
    )
  })
)
