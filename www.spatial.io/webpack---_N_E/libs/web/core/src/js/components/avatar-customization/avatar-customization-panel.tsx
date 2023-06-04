import { Colord } from "colord"
import { memo, useCallback, useEffect, useState } from "react"

import { ReactComponent as RpmLogo } from "@spatialsys/assets/img/svg/ready-player-me.svg"
import { AvatarScope } from "@spatialsys/js/sapi/types"
import {
  InteractionName,
  InteractionType,
  TrackedComponent,
  TrackedComponents,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useGetAvatarsQuery } from "@spatialsys/react/query-hooks/content"
import { useAvatarSdkToken, useCreateAvatar } from "@spatialsys/react/query-hooks/sapi/avatar-sdk"
import { useGenerateRpmThumbnailIfNeeded } from "@spatialsys/react/query-hooks/sapi/ready-player-me"
import { useSaveAvatarDataMutation } from "@spatialsys/react/query-hooks/sapi/user"
import { AppStateSelectors, AvatarOverrideType, CameraMode, UserAvatarStyle } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { AvatarBodyPicker } from "@spatialsys/web/core/js/components/avatar-customization/avatar-body-picker/avatar-body-picker"
import { ShirtColorSlider } from "@spatialsys/web/core/js/components/avatar-customization/shirt-color-slider/shirt-color-slider"
import { SkinColorSlider } from "@spatialsys/web/core/js/components/avatar-customization/skin-color-slider/skin-color-slider"
import { AvatarHeadGenerationModal } from "@spatialsys/web/core/js/components/avatar-head-generation-modal/avatar-head-generation-modal"
import { CapturedImage } from "@spatialsys/web/core/js/components/capture-webcam/capture-webcam"
import { RpmCustomizationModal } from "@spatialsys/web/core/js/components/rpm-customization/rpm-customization"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { RequiresAvatarSdkToken } from "@spatialsys/web/core/js/components/user/requires-avatar-sdk-token"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { logger } from "@spatialsys/web/logger"
import { sapiClient, sapiContentClient } from "@spatialsys/web/sapi"
import { Button, Heading, Loader } from "@spatialsys/web/ui"

import classes from "./avatar-customization-panel.module.scss"

const addPoundSignToColor = (hexStrWithoutPoundSign?: string) => {
  return hexStrWithoutPoundSign ? `#${hexStrWithoutPoundSign}` : undefined
}

interface AvatarCustomizationPanelProps {
  onClose?: () => void
}

const AvatarCustomizationPanelContents = memo(function AvatarCustomizationPanelContents(
  props: AvatarCustomizationPanelProps
) {
  const { onClose } = props
  const avatarSdkDataOnboarding = useAppContext((context) => context.state.avatarSdkDataOnboarding)
  const setAvatarSdkDataOnboarding = useAppContext((context) => context.actions.setAvatarSdkDataOnboarding)
  const avatarStyle = useAppContext((context) => context.state.unity.appState.userProfile.avatar.activeAvatarStyle)
  const avatarBody = useAppContext((context) =>
    AppStateSelectors.getUserCurrentAvatarBody(context.state.unity.appState)
  )
  const avatarRpmUrl = useAppContext((context) => context.state.unity.appState.userProfile.avatar.readyPlayerMeUrl)
  const isUserSpaceAdmin = useAppContext((context) =>
    AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState)
  )
  const readyPlayerMeDefaultBodies = useAppContext(
    (context) => context.state.unity.appState.userProfile.config.treatments.readyPlayerMeDefaultBodies
  )

  const { user } = useUser()
  const trackInteraction = useTrackInteraction()
  const {
    createAvatarMutation,
    data,
    isComplete,
    isProcessing: isGeneratingAsdkHead,
    isReadyToCreate,
    playerUid,
  } = useCreateAvatar(sapiClient, user, avatarSdkDataOnboarding)
  const { avatarSdkToken } = useAvatarSdkToken(sapiClient)
  const saveAvatarDataMutation = useSaveAvatarDataMutation(sapiClient)

  const [isCustomizingRpmAvatar, setIsCustomizingRpmAvatar] = useBoolean(false)
  const [isGeneratingNewHead, setIsGeneratingNewHead] = useBoolean(false)
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(Boolean(avatarSdkDataOnboarding))
  const [initialAvatarData] = useState(user.avatarData)
  const [newAvatarData, setNewAvatarData] = useState(initialAvatarData)

  const { data: creatorToolkitAvatarsResponse } = useGetAvatarsQuery(sapiContentClient)

  const { isGenerating: isGeneratingRpmThumbnail } = useGenerateRpmThumbnailIfNeeded(
    sapiClient,
    logger,
    user,
    true,
    newAvatarData.readyPlayerMeUrl,
    (resp) => {
      if (resp.renders.length) {
        setNewAvatarData((prev) => ({
          ...prev,
          readyPlayerMeThumbnails: { ...prev.readyPlayerMeThumbnails, upperBody: resp.renders[0] },
        }))
      }
    }
  )

  const closePanel = useCallback(() => {
    // To consider: the camera mode might have not been room when we switched, I think we should switch back to whichever
    // the camera mode was before we went into customization
    UnityMessages.setCameraMode(CameraMode.Room)
    onClose?.()
  }, [onClose])

  const handleRpmAvatarExported = useCallback(
    (url: string) => {
      trackInteraction({ name: InteractionName.AvatarCustomizationRpmAvatarExported, type: InteractionType.Submission })
      setIsCustomizingRpmAvatar.setFalse()

      // Clear the thumbnail on SAPI
      saveAvatarDataMutation.mutate({ ...initialAvatarData, readyPlayerMeThumbnails: { upperBody: "", lowerBody: "" } })

      // RPM will use the same URL (ID) if the user edits an existing avatar. To get around browser caching, we
      // attach a query param to the URL that is persisted.
      // This is fine as long as the query param is not in https://docs.readyplayer.me/ready-player-me/api-reference/avatar-rest-api/get-3d-avatars.
      // The RPM team also confirmed that this is the preferred approach: https://spatialsys.slack.com/archives/C02M20P6883/p1677705929194419
      const now = Date.now()
      const urlWithQueryParam = `${url}?updatedAt=${now}`

      // Optimistically set the updated url
      UnityMessages.setAvatarReadyPlayerMeUrl(urlWithQueryParam)
      UnityMessages.setUserAvatarStyle(UserAvatarStyle.ReadyPlayerMe)

      if (newAvatarData.activeAvatarStyle === "REALISTIC") {
        Toast.notify("If you'd like to use a realistic head, switch to one of our default bodies", 6500)
      }
      // Set the new state
      setNewAvatarData((prev) => ({
        ...prev,
        activeAvatarStyle: "READY_PLAYER_ME",
        readyPlayerMeUrl: urlWithQueryParam,
        // Clear the thumbnails.
        readyPlayerMeThumbnails: { ...prev.readyPlayerMeThumbnails, upperBody: "" },
      }))
    },
    [
      initialAvatarData,
      newAvatarData.activeAvatarStyle,
      saveAvatarDataMutation,
      setIsCustomizingRpmAvatar,
      trackInteraction,
    ]
  )

  // After user confirms image,
  const handleAvatarSdkImageConfirmed = useCallback(
    (image: CapturedImage) => {
      trackInteraction({ name: InteractionName.AvatarCustomizationConfirmAsdkImage, type: InteractionType.Submission })
      setIsGeneratingNewHead.setFalse()
      if (!createAvatarMutation.isLoading && isReadyToCreate) {
        const args = {
          file: image.file,
          playerUid,
          token: avatarSdkToken,
          userId: user.id,
        }

        setIsProcessingAvatar(true)
        createAvatarMutation.mutateAsync(args).catch(() => {
          Toast.error("Sorry, something went wrong. Please try again later!")
          setIsProcessingAvatar(false)
        })
      }
    },
    [
      avatarSdkToken,
      createAvatarMutation,
      isReadyToCreate,
      playerUid,
      setIsGeneratingNewHead,
      trackInteraction,
      user.id,
    ]
  )

  useEffect(() => {
    // Runs when ASDK finishes generating the avatar
    if (isComplete && data && isProcessingAvatar) {
      const avatarUserID = avatarSdkDataOnboarding?.avatarUserID ?? playerUid
      setIsProcessingAvatar(false)
      setAvatarSdkDataOnboarding(null)

      UnityMessages.setUserAvatarStyle(UserAvatarStyle.Realistic)
      UnityMessages.setAvatarSdkAvatar(avatarUserID, data.data.code)
      UnityMessages.setAvatarSkinColorOverride({ r: 0, g: 0, b: 0, a: 0 })
      setNewAvatarData((prev) => ({
        ...prev,
        activeAvatarStyle: "REALISTIC",
        avatarID: data.data.code,
        avatarUserID,
        skinColorOverride: "",
      }))
    }
  }, [
    avatarSdkDataOnboarding?.avatarUserID,
    data,
    isComplete,
    isProcessingAvatar,
    playerUid,
    setAvatarSdkDataOnboarding,
  ])

  const handleSetGenericAvatarBody = useCallback(
    (url: string) => {
      trackInteraction({ name: InteractionName.EditGenericBody, type: InteractionType.Submission }, { bodyUrl: url })
      UnityMessages.setUserAvatarStyle(UserAvatarStyle.Realistic)
      UnityMessages.setAvatarBody(url)
      setNewAvatarData((prev) => ({ ...prev, activeAvatarStyle: "REALISTIC", avatarBody: url }))
    },
    [trackInteraction]
  )

  const handleSelectRpmAvatar = useCallback(() => {
    trackInteraction({ name: InteractionName.SelectRpmAvatar, type: InteractionType.Click })
    setNewAvatarData((prev) => ({ ...prev, activeAvatarStyle: "READY_PLAYER_ME" }))
    UnityMessages.setUserAvatarStyle(UserAvatarStyle.ReadyPlayerMe)
  }, [trackInteraction])

  const handleSelectCreatorToolkitAvatar = useCallback(
    (id: string, scope: AvatarScope) => {
      const url = `spatialcontent://${id}:0`
      trackInteraction(
        { name: InteractionName.SelectCreatorToolkitAvatar, type: InteractionType.Submission },
        { bodyUrl: url }
      )

      if (scope === AvatarScope.Universal) {
        UnityMessages.setUserAvatarStyle(UserAvatarStyle.CreatorToolkitAvatar)
        UnityMessages.setAvatarBody(url)
        // Only save universal avatars to user profile via SAPI request.
        setNewAvatarData((prev) => ({ ...prev, activeAvatarStyle: "CREATOR_TOOLKIT", avatarBody: url }))
      } else if (scope === AvatarScope.World) {
        // World avatars uses a session override so it won't persist to the user profile or when leaving the space.
        UnityMessages.setSessionAvatarOverride(AvatarOverrideType.World, url, UserAvatarStyle.CreatorToolkitAvatar)
      }
    },
    [trackInteraction]
  )

  const handleSkinColorChange = useCallback(
    (color: Colord) => {
      const hexColor = color.toHex()
      trackInteraction({ name: InteractionName.EditSkinColor, type: InteractionType.Submission }, { color: hexColor })
      // For some reason, we do not store the "#" in SAPI, we need to chop it off
      setNewAvatarData((prev) => ({ ...prev, skinColorOverride: hexColor.slice(1) }))
      UnityMessages.setAvatarSkinColorOverride(color.rgba)
    },
    [trackInteraction]
  )

  const handleShirtColorChange = useCallback(
    (color: Colord) => {
      const hexColor = color.toHex()
      trackInteraction({ name: InteractionName.EditShirtColor, type: InteractionType.Submission }, { color: hexColor })
      // For some reason, we do not store the "#" in SAPI, we need to chop it off
      setNewAvatarData((prev) => ({ ...prev, shirtColorOverride: hexColor.slice(1) }))
      UnityMessages.setAvatarShirtColorOverride(color.rgba)
    },
    [trackInteraction]
  )

  const handleAvatarSdkHeadButtonClick = useCallback(() => {
    if (newAvatarData.activeAvatarStyle === "READY_PLAYER_ME" && newAvatarData.avatarID) {
      UnityMessages.setUserAvatarStyle(UserAvatarStyle.Realistic)
      setNewAvatarData((prev) => ({
        ...prev,
        activeAvatarStyle: "REALISTIC",
      }))
      return
    }
    setIsGeneratingNewHead.setTrue()
  }, [newAvatarData.activeAvatarStyle, newAvatarData.avatarID, setIsGeneratingNewHead])

  const handleSave = useCallback(() => {
    trackInteraction({ name: InteractionName.SaveAvatarCustomization, type: InteractionType.Click })
    if (newAvatarData === initialAvatarData) {
      closePanel()
      return
    }
    saveAvatarDataMutation
      .mutateAsync(newAvatarData)
      .then(() => {
        closePanel()
      })
      .catch(() => {
        Toast.error("Oops, something went wrong. Please try again later.")
      })
  }, [closePanel, initialAvatarData, newAvatarData, saveAvatarDataMutation, trackInteraction])

  const handleCancel = useCallback(() => {
    trackInteraction({ name: InteractionName.CancelAvatarCustomization, type: InteractionType.Click })
    // We don't commit the changes. Tell Unity to refetch the user profile, which will get all old data.
    UnityMessages.refreshUserProfile()
    closePanel()
  }, [closePanel, trackInteraction])

  return (
    <>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <Heading size="h3" className="-mb-4">
            Customize Avatar
          </Heading>
          {isGeneratingAsdkHead || isProcessingAvatar ? (
            <div className={classes.generatingAvatar}>
              {/* TODO (DEV-11321): nicer loading animation  */}
              <Loader color="black" variant="fancy" />
              <p>Generating avatar...</p>
            </div>
          ) : (
            <>
              <AvatarBodyPicker
                avatarStyle={avatarStyle}
                bodies={readyPlayerMeDefaultBodies}
                currentBody={avatarBody}
                hasCreatedAsdkHead={Boolean(newAvatarData.avatarID)}
                hasCreatedRpmAvatar={Boolean(avatarRpmUrl)}
                isGeneratingThumbnail={isGeneratingRpmThumbnail}
                rpmAvatarThumbnailUrl={newAvatarData.readyPlayerMeThumbnails?.upperBody}
                creatorToolkitAvatars={creatorToolkitAvatarsResponse?.avatars}
                displayWorldAvatars={isUserSpaceAdmin}
                onClickNew={setIsCustomizingRpmAvatar.setTrue}
                onSelectRpmAvatar={handleSelectRpmAvatar}
                onSetAvatar={handleSetGenericAvatarBody}
                onSelectCreatorToolkitAvatar={handleSelectCreatorToolkitAvatar}
              />

              {/* Color sliders */}
              {avatarStyle === UserAvatarStyle.Realistic && (
                <div className={classes.slidersContainer}>
                  <SkinColorSlider
                    currentColor={addPoundSignToColor(newAvatarData.skinColorOverride)}
                    onColorChange={handleSkinColorChange}
                  />
                  <ShirtColorSlider
                    currentColor={addPoundSignToColor(newAvatarData.shirtColorOverride)}
                    onColorChange={handleShirtColorChange}
                  />
                </div>
              )}

              <div className={classes.textButtonsContainer}>
                <button className={classes.textButton} onClick={setIsCustomizingRpmAvatar.setTrue}>
                  <span>Create</span>
                  <RpmLogo className={classes.rpmLogo} />
                  <span>Avatar</span>
                </button>
                <hr className="w-full" />
                <button className={classes.textButton} onClick={handleAvatarSdkHeadButtonClick}>
                  {newAvatarData.activeAvatarStyle === "READY_PLAYER_ME" && Boolean(newAvatarData.avatarID)
                    ? "Use Realistic Head"
                    : newAvatarData.avatarID
                    ? "Regenerate Head"
                    : "Generate Head"}
                </button>
              </div>

              {/* Pill buttons */}
              <div className="grid w-[90%] gap-4">
                <Button
                  noShadow
                  size="lg"
                  disabled={saveAvatarDataMutation.isLoading}
                  isLoading={saveAvatarDataMutation.isLoading}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button color="outline" size="lg" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <AvatarHeadGenerationModal
        isOpen={isGeneratingNewHead}
        onConfirmPhoto={handleAvatarSdkImageConfirmed}
        onRequestClose={setIsGeneratingNewHead.setFalse}
        shouldCloseOnOverlayClick={false}
      />
      <RpmCustomizationModal
        darkOverlay
        hasCreatedRpmAvatar={Boolean(avatarRpmUrl)}
        isOpen={isCustomizingRpmAvatar}
        onAvatarExported={handleRpmAvatarExported}
        onRequestClose={setIsCustomizingRpmAvatar.setFalse}
        shouldCloseOnOverlayClick={false}
      />
    </>
  )
})

export const AvatarCustomizationPanel = memo(function AvatarCustomizationPanel(props: AvatarCustomizationPanelProps) {
  const cameraMode = useAppContext((context) => context.state.unity.appState.roomSession.camera.mode)
  const isOpen = cameraMode === CameraMode.AvatarCustomization
  const focusOnCanvas = useAppContext((context) => context.actions.focusUnity)

  if (!isOpen) {
    return null
  }

  return (
    <RequiresAvatarSdkToken>
      <TrackedComponent id={TrackedComponents.AvatarCustomizationPanel}>
        <AvatarCustomizationPanelContents onClose={focusOnCanvas} {...props} />
      </TrackedComponent>
    </RequiresAvatarSdkToken>
  )
})
