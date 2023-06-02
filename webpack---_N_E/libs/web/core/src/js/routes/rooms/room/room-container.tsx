import clsx from "clsx"
import Link from "next/link"
import { memo, useCallback, useEffect } from "react"

import {
  InteractionName,
  InteractionType,
  TrackedComponent,
  TrackedComponents,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { useMeQuery } from "@spatialsys/react/query-hooks/sapi/user"
import { useGetSpacePreviewQuery } from "@spatialsys/react/query-hooks/spaces"
import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { SagaErrorHandler } from "@spatialsys/use-saga"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import { InstanceCountManager } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"
import { AuthlessAvatarPickerModal } from "@spatialsys/web/core/js/components/room/authless-user-name-and-avatar-picker/authless-avatar-picker-modal"
import { LoadingSplash } from "@spatialsys/web/core/js/components/spatial-unity-web-gl/loading-splash/loading-splash"
import { useRedirectToOnboarding } from "@spatialsys/web/core/js/components/user/hooks"
import { Room } from "@spatialsys/web/core/js/routes/rooms/room/room"
import { logger } from "@spatialsys/web/logger"
import { sapiClient, sapiSpaceClient } from "@spatialsys/web/sapi"
import { Button, Heading } from "@spatialsys/web/ui"

import { PhotonVoice } from "./photon-voice"
import { roomContainerSaga } from "./sagas/room-container-saga"

import classes from "./room-container.module.scss"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const RoomContainer = memo(function RoomContainer() {
  const spaceId = useAppContext((context) => context.state.space.id)
  const runSaga = useAppContext((context) => context.runSaga)

  const { isAuthless, isAuthenticated } = useAuthState()

  const actions = useAppContext((context) => context.actions)
  const trackInteraction = useTrackInteraction()

  const handleClickAuthlessNameSignIn = useCallback(() => {
    trackInteraction({ name: InteractionName.AuthlessNameSignIn, type: InteractionType.Click })
    actions.openModal({ type: Modals.Login, payload: { forceRedirect: true } })
  }, [trackInteraction, actions])

  const userQuery = useMeQuery(sapiClient, isAuthenticated)
  // Redirect to onboarding if the user is not onboarded
  useRedirectToOnboarding()

  useEffect(() => {
    const handleError: SagaErrorHandler = (err, errInfo) => {
      logger.error("roomContainerSaga crashed", err, errInfo)
    }
    const task = runSaga({ onError: handleError }, roomContainerSaga)
    return task.cancel
  }, [runSaga])

  const { data: spacePreviewData } = useGetSpacePreviewQuery(sapiSpaceClient, spaceId, {
    retry: false,
    enabled: Boolean(spaceId),
  })

  const shouldRenderRoom = useAppContext((context) => {
    const unitySpaceId = AppStateSelectors.getCurrentRoomId(context.state.unity.appState)
    return Boolean(
      // Don't mount Room if RTC client isn't prepared, room content isn't loaded, or /me query hasn't succeeded.
      context.state.rtc.localClient &&
        context.state.rtc.mediaCapture &&
        // Either fully synced or the initial data load has completed.
        (AppStateSelectors.getRoomFullySynced(context.state.unity.appState) ||
          context.state.unity.appState.roomSession?.initialDataLoadComplete) &&
        userQuery.data &&
        unitySpaceId &&
        // If the space ID in JS AppState and the space ID in Unity AppState are mismatched, unmount Room.
        // This happens when the user navigates to another space through a portal or browser navigation.
        // Unmounting Room runs its effect cleanups, which disconnects from RTC and sending a message to the
        // Unity client to leave the space.
        unitySpaceId === spaceId
    )
  })

  const isAuthlessModalOpen = useAppContext((context) => {
    return isAuthless && !context.state.authlessUserData?.confirmationStatus
  })
  const isShowingLoadingScreen = useAppContext((context) => {
    return !context.state.unity.appStateLoaded || context.state.unity.appState.roomSession?.shouldShowLoadingScreen
  })

  if (userQuery.isError) {
    return (
      <div className="pointer-events-auto relative z-10 flex h-screen !cursor-default flex-col items-center justify-center gap-6">
        <Heading size="h2">Sorry, something went wrong. Please try again later.</Heading>
        <Button as={Link} href="/" size="xl" className="px-20">
          Home
        </Button>
      </div>
    )
  }

  return (
    <>
      {!isShowingLoadingScreen && shouldRenderRoom && (
        <TrackedComponent id={TrackedComponents.Space} properties={{ "Room ID": spaceId }}>
          <PhotonVoice onInitialized={UnityMessages.setPhotonVoiceReadyForConnection} />
          <Room />
        </TrackedComponent>
      )}
      <LoadingSplash
        spaceData={spacePreviewData}
        isShowing={isShowingLoadingScreen}
        isLoggedIn={!isAuthless}
        userData={isAuthless ? undefined : userQuery.data}
      />
      {userQuery.data && (
        <InstanceCountManager onChange={noop}>
          <AuthlessAvatarPickerModal
            className={clsx(
              modalClassesBase.base,
              classes.avatarPickerModal,
              !isShowingLoadingScreen && classes.returnToCenter
            )}
            isOpen={isAuthlessModalOpen}
            allowDismissToConfirm={!isShowingLoadingScreen}
            onClickSignIn={handleClickAuthlessNameSignIn}
            user={userQuery.data}
          />
        </InstanceCountManager>
      )}
    </>
  )
})
