import clsx from "clsx"
import { AnimatePresence, m } from "framer-motion"
import Link from "next/link"
import { memo, useCallback, useMemo, useRef } from "react"
import { CSSTransition } from "react-transition-group"

import { ReactComponent as AddIcon } from "@spatialsys/assets/icons/material-filled/add.svg"
import { UserData } from "@spatialsys/js/sapi/clients/sapi"
import { SpaceAndCreator } from "@spatialsys/js/sapi/types"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { getSpaceLoadingProgressPhases, useLoadingProgress } from "@spatialsys/react/hooks/use-loading-status"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { DownloadState, Selectors } from "@spatialsys/web/app-state"
import { UNITY_DOWNLOADED_PROGRESS_THRESHOLD } from "@spatialsys/web/config"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import { KeyboardKeyOutlined } from "@spatialsys/web/core/js/components/keyboard-key/keyboard-key"
import { LoveSpaceButton } from "@spatialsys/web/core/js/components/love-space-button/love-space-button"
import { CollapsableText } from "@spatialsys/web/core/js/components/room/participants/participants-list/collapsable-text/collapsable-text"
import { ProgressBar } from "@spatialsys/web/core/js/components/spatial-unity-web-gl/loading-splash/progress-bar/progress-bar"
import { ThumbnailImageWithMaskWithData } from "@spatialsys/web/core/js/components/thumbnail-image-with-mask/thumbnail-image-with-mask"
import { Container } from "@spatialsys/web/ui"

import classes from "./loading-splash.module.scss"

const ANIMATION_LENGTH = parseInt(classes.animationFullDuration, 10)

type SpaceInfoProps = {
  isLoggedIn: boolean
  spaceData: SpaceAndCreator
}

const SpaceInfo = ({ isLoggedIn, spaceData: { space, creator } }: SpaceInfoProps) => (
  <div className={classes.spaceInfoContainer}>
    <div className={classes.creatorInfoContainer}>
      <AvatarIcon
        className={classes.creatorAvatar}
        altText={creator.displayName}
        profilePicUrl={creator.avatarImageURL}
        playerColor={getPlayerColor(creator.appearanceCustomization.profileColor)}
      />
      <span className={classes.creatorName}>{creator.displayName}</span>
    </div>
    <div className={classes.spaceNameContainer}>
      <h2 className={classes.spaceName}>{space.name}</h2>
      {!space.sandbox && isLoggedIn && (
        <LoveSpaceButton
          spaceId={space.id}
          isLoved={space.liked}
          loveCount={space.likeCount}
          handleUnauthenticatedClick={null}
          classNameIcon={classes.loveButtonIcon}
          classNameContainer={classes.loveButtonContainer}
          hideLoveCount
        />
      )}
    </div>
    <div className={classes.spaceDescription}>
      <CollapsableText
        text={space.description}
        collapsedLines={5}
        disableAnimation
        showMoreClassName={classes.spaceDescriptionShowMore}
      />
    </div>
  </div>
)

const Key = ({ className, ...rest }: React.ComponentProps<typeof KeyboardKeyOutlined>) => (
  <KeyboardKeyOutlined
    textClassName="!text-base"
    className={clsx("box-border h-fit pt-0.5 text-white", className)}
    {...rest}
  />
)

const ControlsGroup = memo(function ControlsGroup({
  children,
  label,
}: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  return (
    <div className="relative flex flex-col justify-around pb-8">
      {children}
      {label && (
        <span className="absolute bottom-0 whitespace-nowrap text-sm text-white absolute-center-x">{label}</span>
      )}
    </div>
  )
})

const ControlsTutorial = memo(function ControlsTutorial() {
  return (
    <div className="flex items-stretch gap-4 max-md:invisible">
      <ControlsGroup label="Move">
        <div className={classes.wasdKeys}>
          <Key keyStr="W" className={classes.wKey} />
          <Key keyStr="A" className={classes.aKey} />
          <Key keyStr="S" className={classes.sKey} />
          <Key keyStr="D" className={classes.dKey} />
        </div>
      </ControlsGroup>

      <ControlsGroup>
        <AddIcon className="icon icon-lg text-white" />
      </ControlsGroup>

      <ControlsGroup label="Hold shift to run">
        <Key keyStr="Shift" className="w-16" />
      </ControlsGroup>

      <div className="ml-7 flex">
        <ControlsGroup label="Jump/Double jump">
          <Key keyStr="Spacebar" className="w-32" />
        </ControlsGroup>
      </div>
    </div>
  )
})

const LoadingProgressBar = () => {
  const unityDownloaded = useAppContext((context) => context.state.unity.downloadState === DownloadState.Done)
  const downloadProgress = useAppContext(
    (context) => context.state.unity.initializationProgress / UNITY_DOWNLOADED_PROGRESS_THRESHOLD
  )
  const unityAppStateLoaded = useAppContext((context) => context.state.unity.appStateLoaded)
  const roomSessionStatus = useAppContext((context) => context.state.unity.appState?.roomSession?.sessionStatus)
  const environmentLoadProgress = useAppContext((context) => context.state.unity.appState.environment.loadProgress)

  const progress = useLoadingProgress(
    getSpaceLoadingProgressPhases({
      unityDownload: {
        done: unityDownloaded,
        progress: downloadProgress,
      },
      unityAppStateLoaded,
      roomSessionStatus,
      environmentLoadProgress,
    })
  )

  return <ProgressBar progress={progress} />
}

type LoadingSplashProps = {
  isShowing: boolean
  isLoggedIn: boolean
  spaceData?: SpaceAndCreator
  userData?: Pick<UserData, "displayName" | "profilePicURL" | "appearanceCustomization">
}

/**
 * The loading splash screen, shown while the Unity webGL app is being downloaded/initialized,
 * or the room is being joined but not yet synced.
 *
 * When `isShowing` gets toggled to false, the component will fade/zoom out, then unmount.
 */
export const LoadingSplash = (props: LoadingSplashProps) => {
  const { isShowing, isLoggedIn, spaceData, userData } = props
  const space = spaceData?.space
  const nodeRef = useRef<HTMLDivElement>()

  const authlessUserData = useAppContext((context) => Selectors.getAuthlessUserData(context.state))

  const profileColor = useMemo(
    () => getPlayerColor(userData?.appearanceCustomization.profileColor ?? ""),
    [userData?.appearanceCustomization.profileColor]
  )

  const shouldShowNameAvatar = userData || Boolean(authlessUserData?.confirmationStatus)
  const name = userData?.displayName ?? authlessUserData?.name
  const profilePicUrl = userData?.profilePicURL ?? authlessUserData?.avatarUrls.avatarThumbnailUrl

  const syncLoveState = useCallback(() => {
    // Sync love state with Unity when loading screen fades
    // Set skipSapiCall to true to avoid making a duplicate API call
    UnityMessages.setSpaceLoved(space.id, space.liked, true)
  }, [space?.id, space?.liked])

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={{ exitActive: classes.exiting }}
      mountOnEnter
      in={isShowing && Boolean(space)}
      onExit={syncLoveState}
      onExited={syncLoveState}
      timeout={ANIMATION_LENGTH}
      unmountOnExit
    >
      <div ref={nodeRef} className={classes.container}>
        {spaceData && (
          <ThumbnailImageWithMaskWithData
            classNameImage={classes.splashImage}
            name={space.name}
            thumbnail={space.thumbnail}
          />
        )}
        <Container
          className={clsx(
            "z-10 flex h-full flex-row items-end justify-between px-12 py-20 sm:px-12",
            !shouldShowNameAvatar && classes.showingModal
          )}
        >
          <TrackedComponent id={TrackedComponents.SpaceLoadingSplash}>
            <div className={classes.infoContainer}>
              {spaceData && <SpaceInfo isLoggedIn={isLoggedIn} spaceData={spaceData} />}
              <LoadingProgressBar />
              <div className={classes.communityGuidelinesContainer}>
                {shouldShowNameAvatar && (
                  <>
                    <AvatarIcon
                      className={classes.userAvatar}
                      altText={name}
                      profilePicUrl={profilePicUrl}
                      playerColor={profileColor}
                    />
                    <span>Joining as {name}. </span>
                  </>
                )}
                <wbr />
                <span>
                  Remember to follow our{" "}
                  <Link href="/guidelines" target="_blank" rel="noopener noreferrer">
                    Community Guidelines
                  </Link>
                  .
                </span>
              </div>
            </div>
          </TrackedComponent>
          <AnimatePresence>
            {shouldShowNameAvatar && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ControlsTutorial />
              </m.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </CSSTransition>
  )
}
