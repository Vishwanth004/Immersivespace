import clsx from "clsx"
import { memo, useCallback, useMemo, useState } from "react"

import {
  InteractionName,
  InteractionType,
  TrackedComponents,
  useTrackInteraction,
  withTrackedComponent,
} from "@spatialsys/react/analytics"
import { AppStateSelectors, VREnvironment } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import {
  customEnvironmentOption,
  environmentOptions,
} from "@spatialsys/web/core/js/components/environment-template/constants"
import { EnvironmentVariantSelector } from "@spatialsys/web/core/js/components/environment-template/environment-variants/environment-variant-selector"
import { RowWithToggle } from "@spatialsys/web/core/js/components/row-with-toggle/row-with-toggle"
import { Button, Heading } from "@spatialsys/web/ui"

import classes from "./environment-settings.module.scss"

export interface NewEnvironmentSettingsProps {
  openEnvPicker: () => void
  openUploadEnv: () => void
  closePanel: () => void
  roomThumbnail: string
}

enum ConfirmPanelBehavior {
  ClearFrames = 0,
  ClearEnvironment = 1,
}

const textureCompressionTooltip = "Reduces memory usage but also quality"

const EnvironmentSettingsComponent = memo(function NewEnvironmentSettings(props: NewEnvironmentSettingsProps) {
  const { openEnvPicker, openUploadEnv, closePanel } = props
  const trackInteraction = useTrackInteraction()

  const environment = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.settings.environment
  )
  const environmentVariant = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.settings.environmentVariant[environment]
  )
  const areEmptyGalleryFramesHidden = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.settings.areEmptyGalleryFramesHidden
  )
  const showHideGalleryFramesToggle = useAppContext(
    (context) => context.state.unity.appState.roomSession.isHideAllEmptyFramesAvailable
  )
  const showClearAllFrames = useAppContext(
    (context) => context.state.unity.appState.roomSession.isClearAllFramesAvailable
  )
  const showAddSpawnPoint = useAppContext((context) =>
    AppStateSelectors.isUserAdministrator(context.state.unity.appState, context.state.unity.appState.userProfile.userID)
  )
  const hasCustomSkybox = useAppContext((context) => AppStateSelectors.isCustomSkyboxSet(context.state.unity.appState))
  const isInCustomEnvironment = useAppContext(
    (context) => context.state.unity.appState.roomSession.sharedState.settings.environment === VREnvironment.Custom
  )
  const isSettingUpEnvironment = useAppContext((context) =>
    AppStateSelectors.isSettingCustomEnvironment(context.state.unity.appState)
  )
  const isChangeEnvironmentEnabled = useAppContext((context) =>
    AppStateSelectors.isChangeEnvironmentEnabled(context.state.unity.appState)
  )
  const isClearRoomEnabled = useAppContext((context) =>
    AppStateSelectors.isClearRoomEnabled(context.state.unity.appState)
  )

  const isEnvTextureCompressed = useAppContext(
    (context) => !context.state.unity.appState.roomSession.sharedState.settings.disableTextureCompressionForEnvironment
  )
  const areObjectTexturesCompressed = useAppContext(
    (context) => !context.state.unity.appState.roomSession.sharedState.settings.disableTextureCompressionForObjects
  )

  const [showConfirmPanel, setShowConfirmPanel] = useState(false)
  const [confirmPanelContext, setConfirmPanelContext] = useState<ConfirmPanelBehavior>()
  const [previewVariant, setPreviewVariant] = useState<number>(-1)

  const handleEnvironmentVariantIndexChanged = useCallback((index: number) => {
    UnityMessages.setRoomVariant(index)
  }, [])

  const openConfirmPanel = useCallback((context: ConfirmPanelBehavior) => {
    setConfirmPanelContext(context)
    setShowConfirmPanel(true)
  }, [])

  const handleClose = useCallback(() => {
    closePanel()
    setShowConfirmPanel(false)
  }, [closePanel])

  const acceptConfirmPanel = useCallback(() => {
    setShowConfirmPanel(false)
    switch (confirmPanelContext) {
      case ConfirmPanelBehavior.ClearFrames:
        UnityMessages.clearAllFrames()
        trackInteraction({ type: InteractionType.Click, name: InteractionName.ClearAllFrames })

        break
      case ConfirmPanelBehavior.ClearEnvironment:
        UnityMessages.clearRoom()
        trackInteraction({ type: InteractionType.Click, name: InteractionName.ClearContentInRoom })

        break
    }
  }, [confirmPanelContext, trackInteraction])

  const closeConfirmPanel = useCallback(() => {
    setShowConfirmPanel(false)
  }, [])

  const confirmPanelText = useMemo(() => {
    switch (confirmPanelContext) {
      case ConfirmPanelBehavior.ClearEnvironment:
        return "This will clear all content in the space"
      case ConfirmPanelBehavior.ClearFrames:
        return "This will empty all frames in the space"
    }
  }, [confirmPanelContext])

  const uploadEnvText = useMemo(() => {
    return isInCustomEnvironment ? "Upload & Replace Environment" : "Upload Custom Environment"
  }, [isInCustomEnvironment])

  const addSpawnPointAndClose = useCallback(() => {
    UnityMessages.addSpawnPoint()
    trackInteraction({ type: InteractionType.Click, name: InteractionName.AddSpawnPoint })

    handleClose()
  }, [handleClose, trackInteraction])

  const openPickerAndCloseSettings = useCallback(() => {
    openEnvPicker()
    handleClose()
  }, [openEnvPicker, handleClose])

  const openUploadModalAndCloseSettings = useCallback(() => {
    openUploadEnv()
    handleClose()
  }, [openUploadEnv, handleClose])

  const handleHideEmptyFrames = useCallback(() => {
    UnityMessages.setEmptyGalleryFrameVisibility(areEmptyGalleryFramesHidden)
    trackInteraction({ type: InteractionType.Click, name: InteractionName.HideEmptyFrames })
  }, [areEmptyGalleryFramesHidden, trackInteraction])

  const handleEditCurrentPosition = useCallback(() => {
    if (!isSettingUpEnvironment) {
      UnityMessages.startTweakCustomEnvironment()
      handleClose()
      trackInteraction({ type: InteractionType.Click, name: InteractionName.EditEnvironmentPosition })
    }
  }, [handleClose, isSettingUpEnvironment, trackInteraction])

  const handleClearCustomSkybox = useCallback(() => {
    UnityMessages.clearCustomSkybox()
    trackInteraction({ type: InteractionType.Click, name: InteractionName.ClearCustomSkybox })
  }, [trackInteraction])

  const toggleEnvTexture = useCallback(() => {
    UnityMessages.setEnvCompressTexture(!isEnvTextureCompressed)
  }, [isEnvTextureCompressed])

  const toggleObjTexture = useCallback(() => {
    UnityMessages.setObjCompressTexture(!areObjectTexturesCompressed)
  }, [areObjectTexturesCompressed])

  const { images, name, iconPickCoord, variantOrders } = useMemo(
    () => environmentOptions.find((item) => item.environment === environment) ?? customEnvironmentOption,
    [environment]
  )

  const environmentImageUrl = useMemo(() => {
    if (previewVariant >= 0) return images[previewVariant]
    if (environmentVariant) return images[environmentVariant]
    return images[0]
  }, [environmentVariant, images, previewVariant])

  return (
    <>
      {!showConfirmPanel && (
        <div className={classes.environmentSettingsContainer}>
          <Heading size="h3" textAlign="center" weight="black">
            Environment Settings
          </Heading>
          {/* We run out of room on screens under 1000px and the image is the least important */}

          <div className={classes.environmentThumbnail} style={{ backgroundImage: `url(${environmentImageUrl})` }} />
          <div className={classes.environmentLabelContainer}>
            <div className={classes.environmentName}>
              {
                /* TODO: (DEV-15349, DEV-16143) show the correct environment UI for packages when the infrastructure is up */
                environment === VREnvironment.UnityPackage ? "Unity Package" : name
              }
            </div>
            {isChangeEnvironmentEnabled && images.length > 1 && (
              <div>
                <EnvironmentVariantSelector
                  pickCoord={iconPickCoord}
                  urls={images}
                  orders={variantOrders}
                  selectedVariant={environmentVariant}
                  setSelectedVariant={handleEnvironmentVariantIndexChanged}
                  setPreviewVariant={setPreviewVariant}
                />
              </div>
            )}
          </div>

          <div className="rounded-lg border border-black/20">
            {isInCustomEnvironment && (
              <>
                <RowWithToggle
                  label="Compress Environment Textures"
                  classNameContainer={classes.block}
                  onChange={toggleEnvTexture}
                  disabled={!isChangeEnvironmentEnabled}
                  tooltip={textureCompressionTooltip}
                  checked={isEnvTextureCompressed}
                  id="Compress-Environment-Textures-13"
                />
                <hr />
              </>
            )}
            <RowWithToggle
              label="Compress Object Textures"
              classNameContainer={classes.block}
              onChange={toggleObjTexture}
              tooltip={textureCompressionTooltip}
              checked={areObjectTexturesCompressed}
              id="Compress-Object-Textures-15"
              disabled={!isChangeEnvironmentEnabled}
            />
          </div>

          {(showHideGalleryFramesToggle || showClearAllFrames) && (
            <div className="rounded-lg border border-black/20">
              {showHideGalleryFramesToggle && (
                <RowWithToggle
                  onChange={handleHideEmptyFrames}
                  classNameContainer={classes.block}
                  checked={areEmptyGalleryFramesHidden}
                  icons={false}
                  label="Hide Empty Gallery Frames"
                  id="Hide Empty Gallery Frames-16"
                />
              )}
              {showHideGalleryFramesToggle && showClearAllFrames && <hr />}
              {showClearAllFrames && (
                <button
                  className={clsx(classes.block, classes.blockHover)}
                  onClick={() => openConfirmPanel(ConfirmPanelBehavior.ClearFrames)}
                >
                  Clear All Frames
                </button>
              )}
            </div>
          )}
          {!isChangeEnvironmentEnabled && (
            <div className={classes.privateRoomWarning}>Environment customization is unavailable</div>
          )}
          <div className="rounded-lg border border-black/20">
            <button
              className={clsx(classes.block, classes.blockHover)}
              onClick={openPickerAndCloseSettings}
              disabled={!isChangeEnvironmentEnabled}
            >
              Choose New Environment
            </button>
            <hr />
            <button
              className={clsx(classes.block, classes.blockHover)}
              onClick={openUploadModalAndCloseSettings}
              disabled={!isChangeEnvironmentEnabled}
            >
              {uploadEnvText}
            </button>
            {isInCustomEnvironment && (
              <>
                <hr />
                <button
                  className={clsx(classes.block, classes.blockHover)}
                  onClick={handleEditCurrentPosition}
                  disabled={!isChangeEnvironmentEnabled}
                >
                  Edit Environment Position
                </button>
              </>
            )}
          </div>
          {hasCustomSkybox && (
            <div className="rounded-lg border border-black/20">
              <button
                className={clsx(classes.block, classes.blockHover)}
                onClick={handleClearCustomSkybox}
                disabled={!isChangeEnvironmentEnabled}
              >
                Clear Custom Skybox
              </button>
            </div>
          )}
          {showAddSpawnPoint && (
            <div className="rounded-lg border border-black/20">
              <button
                className={clsx(classes.block, classes.blockHover)}
                onClick={addSpawnPointAndClose}
                disabled={!isChangeEnvironmentEnabled}
              >
                Add Entrance Point
              </button>
            </div>
          )}
          <Button
            className="uppercase"
            color="red"
            variant="text"
            onClick={() => openConfirmPanel(ConfirmPanelBehavior.ClearEnvironment)}
            disabled={!isClearRoomEnabled}
          >
            Clear Content
          </Button>
        </div>
      )}
      {showConfirmPanel && (
        <div className="flex w-full flex-col gap-6 text-center">
          <Heading size="h1" textAlign="center">
            Are you sure?
          </Heading>
          <div className="text-base text-gray-500">{confirmPanelText}</div>
          <div className="grid w-full grid-cols-2 gap-6 px-4">
            <Button color="outline" size="lg" onClick={closeConfirmPanel}>
              Cancel
            </Button>
            <Button size="lg" onClick={acceptConfirmPanel}>
              Yes
            </Button>
          </div>
        </div>
      )}
    </>
  )
})

export const EnvironmentSettings = withTrackedComponent(EnvironmentSettingsComponent, {
  id: TrackedComponents.EnvironmentSettings,
  className: classes.container,
  as: "div",
})
