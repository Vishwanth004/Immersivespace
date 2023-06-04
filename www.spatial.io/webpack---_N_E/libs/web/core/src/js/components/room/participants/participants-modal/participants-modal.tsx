import clsx from "clsx"
import { AnimatePresence, AnimationProps, Transition, m } from "framer-motion"
import { Suspense, lazy, memo, useCallback, useState } from "react"
import { useMeasure } from "react-use"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"
import { BackButton } from "@spatialsys/web/core/js/components/back-button/back-button"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import TriangleConnector from "@spatialsys/web/core/js/components/modal/triangle-connector/triangle-connector"
import { CenteredLoader } from "@spatialsys/web/ui"

import { InstanceCount } from "../../../instance-count/instance-count"
import { ParticipantsList, ParticipantsListProps } from "../participants-list/participants-list"

import classes from "./participants-modal.module.scss"

const SwitchMeeting = lazy(() =>
  import(/* webpackChunkName: "switch-meeting" */ "../participants-list/switch-meeting/switch-meeting").then((mod) => ({
    default: mod.SwitchMeeting,
  }))
)

const ManageAdmins = lazy(() =>
  import(/* webpackChunkName: "manage-admins" */ "../manage-users/manage-admins").then((mod) => ({
    default: mod.ManageAdmins,
  }))
)

const ManageBanned = lazy(() =>
  import(/* webpackChunkName: "manage-banned" */ "../manage-users/manage-banned").then((mod) => ({
    default: mod.ManageBanned,
  }))
)

const AddCategories = lazy(() =>
  import(/* webpackChunkName: "manage-categories" */ "../manage-categories/manage-categories").then((mod) => ({
    default: mod.ManageCategories,
  }))
)

export type ParticipantsModalContentProps = Omit<ParticipantsListProps, "openView"> &
  React.ComponentProps<typeof SwitchMeeting>

type ParticipantsModalProps = ParticipantsModalContentProps & {
  isOpen: boolean
  handleClose: () => void
}

const enum Views {
  ParticipantsList,
  SwitchInstance,
  BannedList,
  ManageAdmins,
  AddCategories,
}

export { Views as ParticipantsModalViews }

const transition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.5,
}

/**
 * Note on the page transition animation:
 * - The active view has `position: static` so the container can use `height: auto` when not animating
 *   - `height: auto` is applied in the CSS with `!important` to override the height set by framer-motion
 * - During the exit animation, the unmounting view becomes `position: absolute` so it doesn't affect the layout
 * - When animating, we change the container to transition between measured heights of the exiting and entering views
 * - We set the container to `overflow: hidden` only during animation to avoid clipping profile hover cards
 */
const viewAnimationProps: AnimationProps = {
  variants: {
    enter: (direction: number) => {
      return {
        translateX: `${direction * 100}%`,
        opacity: 0,
      }
    },
    center: {
      translateX: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        translateX: `${direction * 100}%`,
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
      }
    },
  },
  initial: "enter",
  animate: "center",
  exit: "exit",
  transition,
}

function LoadingSpinner() {
  return <CenteredLoader color="black" variant="fancy" />
}

const ParticipantsModalContent = memo(function ParticipantsModalContent(props: ParticipantsModalContentProps) {
  const [view, setView] = useState(Views.ParticipantsList)

  // Only animate height when switching between views.
  // This avoids modal height lagging behind when expanding/collapsing the description.
  const [isChangingView, setIsChangingView] = useBoolean(false)

  const animateToView = useCallback(
    (view: Views) => {
      setIsChangingView.setTrue()
      setView(view)
    },
    [setIsChangingView]
  )

  const measures: Record<Views, ReturnType<typeof useMeasure>> = {
    [Views.ParticipantsList]: useMeasure(),
    [Views.SwitchInstance]: useMeasure(),
    [Views.BannedList]: useMeasure(),
    [Views.ManageAdmins]: useMeasure(),
    [Views.AddCategories]: useMeasure(),
  }

  const height = measures[view][1].height
  const isMainView = view === Views.ParticipantsList
  const direction = isMainView ? -1 : 1

  return (
    <m.div
      className={clsx(classes.container, isChangingView && classes.animating)}
      initial={false}
      animate={{ height }}
      transition={isChangingView ? transition : { type: false }}
    >
      <AnimatePresence initial={false} onExitComplete={setIsChangingView.setFalse}>
        <m.div className={classes.view} key={view} ref={measures[view][0]} custom={direction} {...viewAnimationProps}>
          <div className={classes.viewInnerContainer}>
            {!isMainView && (
              <BackButton onClick={() => animateToView(Views.ParticipantsList)} className={classes.backButton} />
            )}
            <Suspense fallback={<LoadingSpinner />}>
              {(() => {
                switch (view) {
                  case Views.ParticipantsList:
                    return <ParticipantsList openView={animateToView} {...props} />
                  case Views.SwitchInstance:
                    return <SwitchMeeting {...props} />
                  case Views.BannedList:
                    return <ManageBanned />
                  case Views.ManageAdmins:
                    return <ManageAdmins {...props} />
                  case Views.AddCategories:
                    return <AddCategories />
                }
              })()}
            </Suspense>
          </div>
        </m.div>
      </AnimatePresence>
    </m.div>
  )
})

export const ParticipantsModal = memo(function ParticipantsModal(props: ParticipantsModalProps) {
  const { isOpen, handleClose, ...rest } = props

  return (
    <Modal
      disableTranslate
      isOpen={isOpen}
      modalBaseClass={classes.modal}
      overlayBaseClass={classes.modalOverlay}
      onRequestClose={handleClose}
    >
      <InstanceCount>
        <div className={clsx(modalClasses.body, classes.modalBody)}>
          <TriangleConnector />
          <button type="button" onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </button>
          <ParticipantsModalContent {...rest} />
        </div>
      </InstanceCount>
    </Modal>
  )
})
