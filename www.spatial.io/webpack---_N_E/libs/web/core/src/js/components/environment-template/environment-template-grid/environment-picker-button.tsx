import clsx from "clsx"
import { useCallback, useMemo, useState } from "react"

import { getCustomNftEnvironmentId } from "@spatialsys/js/sapi/helpers"
import { SpaceTemplateCategory } from "@spatialsys/js/sapi/types"
import { SpaceTemplateProcessingStatus, getSpaceTemplateProcessingStatus } from "@spatialsys/js/sapi/utils/environment"
import { AppStateSelectors, VREnvironment } from "@spatialsys/unity/app-state"
import { EnvironmentOption } from "@spatialsys/web/app-state"
import EthereumIcon from "@spatialsys/web/core/img/icons/ethereum-white-on-blue.png"
import { ReactComponent as UploadIcon } from "@spatialsys/web/core/img/upload-icon.svg"
import { EnvironmentVariantSelector } from "@spatialsys/web/core/js/components/environment-template/environment-variants/environment-variant-selector"
import { CenteredLoader } from "@spatialsys/web/ui"

import classes from "./environment-template-picker.module.scss"

interface ProcessingIndicatorProps {
  processingStatus: SpaceTemplateProcessingStatus
}

const ProcessingIndicator = (props: ProcessingIndicatorProps) => {
  const { processingStatus } = props

  if (processingStatus === SpaceTemplateProcessingStatus.NewVersion) {
    return (
      <div className={classes.overlayBanner}>
        <div className={classes.loaderOverlayMinimal}>
          <div className={classes.smallLoadingIndicator}>
            <CenteredLoader useRelativePosition color="white" />
          </div>
          <div className={clsx(classes.loaderText, classes.small)}>Processing new version...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.loaderOverlay}>
      <div>
        <CenteredLoader className={classes.loadingIndicator} useRelativePosition color="white" />
      </div>
      <div className={classes.loaderText}>Processing...</div>
    </div>
  )
}

export interface EnvironmentPickerButtonProps {
  currentEnvironment?: VREnvironment
  currentCustomNftEnvironmentId?: string
  shouldShowMetamaskTutorial: boolean
  hideByLine?: boolean
  onSelect: (option: EnvironmentOption, variant: number) => void
  option: EnvironmentOption
}

export const EnvironmentPickerButton = (props: EnvironmentPickerButtonProps) => {
  const {
    option,
    currentEnvironment,
    currentCustomNftEnvironmentId,
    shouldShowMetamaskTutorial,
    hideByLine,
    onSelect,
  } = props
  const [variant, setVariant] = useState<number>(0)
  const [previewVariant, setPreviewVariant] = useState<number>(-1)

  const onClickedPickerButton = useCallback(() => {
    onSelect(option, variant)
  }, [onSelect, option, variant])

  const isOptionSelected = useMemo(() => {
    let isSelected = currentEnvironment === option.environment
    if (option.metadata) {
      isSelected = isSelected && currentCustomNftEnvironmentId === getCustomNftEnvironmentId(option.metadata)
    }
    return isSelected
  }, [currentCustomNftEnvironmentId, currentEnvironment, option.metadata, option.environment])

  const isCustomNftEnvironment = useMemo(
    () =>
      option.environment === VREnvironment.Custom && option.metadata?.category === SpaceTemplateCategory.Collectibles,
    [option.metadata, option.environment]
  )

  const processingStatus = getSpaceTemplateProcessingStatus(option.metadata)
  const disableButton = processingStatus === SpaceTemplateProcessingStatus.FreshPackage
  const isProcessing =
    processingStatus === SpaceTemplateProcessingStatus.FreshPackage ||
    processingStatus === SpaceTemplateProcessingStatus.NewVersion

  return (
    <div
      className={clsx(classes.buttonContainer, {
        [classes.pulsatingTile]:
          AppStateSelectors.isAutoLayoutEnvironment(option.environment, isCustomNftEnvironment) &&
          shouldShowMetamaskTutorial,
      })}
      key={
        option.metadata
          ? `custom-nft-env-${getCustomNftEnvironmentId(option.metadata)}`
          : `custom-nft-env-${option.environment}`
      }
    >
      <button
        type="button"
        className={clsx(classes.imageWrap, {
          [classes.selected]: isOptionSelected,
          [classes.hoverEnabled]: !disableButton,
          [classes.disablePointer]: disableButton,
        })}
        onClick={onClickedPickerButton}
        disabled={disableButton}
      >
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${option.images[previewVariant < 0 ? variant : previewVariant]})` }}
        >
          <div
            className={clsx(
              classes.imageMask,
              AppStateSelectors.isAutoLayoutEnvironment(option.environment, isCustomNftEnvironment) &&
                shouldShowMetamaskTutorial &&
                classes.imageWithBorder
            )}
          />
          {option.environment === VREnvironment.Abstract && <UploadIcon className={classes.overlayIcon} />}
          {isProcessing && <ProcessingIndicator processingStatus={processingStatus} />}
        </div>
      </button>
      <div
        className={clsx(
          classes.infoContainer,
          option.artist ? classes.twoColumns : classes.singleColumn,
          disableButton && classes.disabledOpacity
        )}
      >
        <div className={classes.nameContainer}>
          <div className={classes.flexCenter}>
            <div className={classes.name}>{option.name}</div>
            {option.metadata?.category === SpaceTemplateCategory.Collectibles && (
              <img
                src={EthereumIcon.src}
                alt="Ethereum icon"
                className={classes.ethereumLogo}
                title="A collectible NFT environment on the Ethereum blockchain"
              />
            )}
          </div>
          {!hideByLine && option.artist && (
            <div className={classes.creatorName}>
              <div className={classes.byText}>by</div> {option.artist}
            </div>
          )}
        </div>
        {option.images.length > 1 && (
          <EnvironmentVariantSelector
            disabled={disableButton}
            pickCoord={option.iconPickCoord}
            selectedVariant={variant}
            setSelectedVariant={setVariant}
            setPreviewVariant={setPreviewVariant}
            urls={option.images}
          />
        )}
      </div>
    </div>
  )
}
