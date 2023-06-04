import { useMemo } from "react"

import { AssetSourceType, SpaceTemplateCategory } from "@spatialsys/js/sapi/types"
import { useGetSpaceTemplatesQuery } from "@spatialsys/react/query-hooks/content"
import { VREnvironment } from "@spatialsys/unity/app-state"
import { EnvironmentOption } from "@spatialsys/web/app-state"
import PrivateLobbyThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-private-lobby.jpg"
import { customEnvironmentOption } from "@spatialsys/web/core/js/components/environment-template/constants"
import {
  EnvironmentPickerButton,
  EnvironmentPickerButtonProps,
} from "@spatialsys/web/core/js/components/environment-template/environment-template-grid/environment-picker-button"
import EnvironmentTemplateGrid from "@spatialsys/web/core/js/components/environment-template/environment-template-grid/environment-template-grid"
import { useShouldShowMetamaskTutorial } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { sapiContentClient } from "@spatialsys/web/sapi"
import { Button, CenteredLoader, Heading } from "@spatialsys/web/ui"

const privateLobbyEnvironmentOption: Readonly<EnvironmentOption> = {
  environment: VREnvironment.PrivateLobby,
  images: [PrivateLobbyThumbnail.src],
  name: "Home",
}

interface EnvironmentPickerProps extends Pick<EnvironmentPickerButtonProps, "hideByLine"> {
  currentEnvironment?: VREnvironment
  currentCustomNftEnvironmentId?: string
  onSelect: (option: EnvironmentOption, variant: number) => void
  includeDefaultEnvironments: boolean
  includeNFTEnvironments?: boolean
  includeCustomEnvironment?: boolean
  includePrivateLobbyEnvironment?: boolean
  includeCreatorToolkitEnvironments?: boolean
}

const EnvironmentPicker = (props: EnvironmentPickerProps) => {
  const {
    currentEnvironment,
    currentCustomNftEnvironmentId,
    onSelect,
    hideByLine,
    includeDefaultEnvironments,
    includeCustomEnvironment,
    includePrivateLobbyEnvironment,
    includeNFTEnvironments,
    includeCreatorToolkitEnvironments,
  } = props

  const {
    isInitialLoading: isInitialLoadingSpaceTemplates,
    isError: loadSpaceTemplatesFailed,
    data: spaceTemplatesResponseData,
  } = useGetSpaceTemplatesQuery(sapiContentClient)

  const allSpaceTemplates = useMemo(() => {
    if (spaceTemplatesResponseData) {
      const builtInEnvTypes = Object.values(VREnvironment)
      return Object.entries(spaceTemplatesResponseData.spaceTemplates)
        .filter(([_, env]) => env.variants) // Filter out invalid entries where no variants are defined.
        .map(([_, env]) => {
          let environment: VREnvironment
          if (env.environmentAssetType === AssetSourceType.UnityPackage) {
            environment = VREnvironment.UnityPackage
          } else if (builtInEnvTypes.includes(env.id)) {
            // Some NFT environments are included in these built-in environments, so we can't simply just check for built-in.
            environment = VREnvironment[env.id]
          } else if (env.environmentAssetType === AssetSourceType.NFT) {
            // NFT environments that aren't in the Unity build function as a custom environment template.
            environment = VREnvironment.Custom
          }

          const variantThumbnailUrls = env.variants.map((variant) => variant.thumbnail)
          const option: Readonly<EnvironmentOption> = {
            environment,
            images: variantThumbnailUrls,
            name: env.name,
            artist: env.creatorName,
            metadata: env,
            id: env.id,
          }
          return option
        })
    }

    return null
  }, [spaceTemplatesResponseData])

  const options = useMemo(() => {
    let spaceTemplates = allSpaceTemplates ?? []

    if (!includeDefaultEnvironments) {
      spaceTemplates = spaceTemplates.filter((env) => env.metadata?.category !== SpaceTemplateCategory.Free)
    }
    if (!includeNFTEnvironments) {
      spaceTemplates = spaceTemplates.filter((env) => env.metadata?.category !== SpaceTemplateCategory.Collectibles)
    }
    if (!includeCreatorToolkitEnvironments) {
      spaceTemplates = spaceTemplates.filter((env) => env.metadata?.category !== SpaceTemplateCategory.Packages)
    }

    // add specialized environments as the first options when available
    if (includeCustomEnvironment && !currentCustomNftEnvironmentId) {
      spaceTemplates = [customEnvironmentOption].concat(spaceTemplates)
    }

    if (includePrivateLobbyEnvironment) {
      spaceTemplates = [privateLobbyEnvironmentOption].concat(spaceTemplates)
    }

    return spaceTemplates
  }, [
    currentCustomNftEnvironmentId,
    allSpaceTemplates,
    includeDefaultEnvironments,
    includeCustomEnvironment,
    includeNFTEnvironments,
    includePrivateLobbyEnvironment,
    includeCreatorToolkitEnvironments,
  ])

  const shouldShowMetamaskTutorial = useShouldShowMetamaskTutorial()

  if (isInitialLoadingSpaceTemplates) {
    return <CenteredLoader useRelativePosition size="large" color="black" />
  }

  if (options?.length === 0) {
    // Only display error that it failed if all space templates failed to load.
    if (loadSpaceTemplatesFailed) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">Failed to load space templates.</div>
      )
    }

    // If there are no space templates in the data and we're exclusively showing package space templates, display the appropriate message + docs link.
    if (
      includeCreatorToolkitEnvironments &&
      !includeDefaultEnvironments &&
      !includeCustomEnvironment &&
      !includePrivateLobbyEnvironment &&
      !includeNFTEnvironments
    ) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Heading as="h3" size="h3" className="mb-2">
            Create Your Own Custom Environment
          </Heading>
          <div>
            The Spatial Creator Toolkit allows you to build immersive, interactive, and beautiful 3D spaces with Unity
          </div>
          <Button size="lg" className="mt-6" as="a" href="https://docs.spatial.io/" target="_blank" rel="noreferrer">
            Get Started Now
          </Button>
        </div>
      )
    }
  }

  return (
    <EnvironmentTemplateGrid>
      {options.map((option) => (
        <EnvironmentPickerButton
          key={option.name}
          currentEnvironment={currentEnvironment}
          currentCustomNftEnvironmentId={currentCustomNftEnvironmentId}
          shouldShowMetamaskTutorial={shouldShowMetamaskTutorial}
          hideByLine={hideByLine}
          onSelect={onSelect}
          option={option}
        />
      ))}
    </EnvironmentTemplateGrid>
  )
}

export default EnvironmentPicker
