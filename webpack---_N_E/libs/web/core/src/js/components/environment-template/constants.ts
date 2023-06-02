import { VREnvironment } from "@spatialsys/unity/app-state"
import { EnvironmentOption } from "@spatialsys/web/app-state"
import AbstractThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-abstract.png"
import AgoraThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-agora.jpg"
import AuditoriumThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-auditorium.png"
import BoardroomLoungeThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-boardroom-lounge.png"
import BoardroomWithATableThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-boardroom-with-a-table.jpg"
import CustomThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-custom.png"
import GalleryObsidianThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-gallery-obsidian.jpg"
import MountainLoungeThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-mountain-lounge.jpg"
import OutdoorThumbnail from "@spatialsys/web/core/img/environment-thumbnails/thumbnail-outdoor.jpg"
import GalleryAeriesThumbnailVar0White from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-0-white.jpg"
import GalleryAeriesThumbnailVar1Blue from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-1-blue.jpg"
import GalleryAeriesThumbnailVar2Red from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-2-red.jpg"
import GalleryAeriesThumbnailVar3Purple from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-3-purple.jpg"
import GalleryAeriesThumbnailVar4Yellow from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-4-yellow.jpg"
import GalleryAeriesThumbnailVar5Black from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-5-black.jpg"
import GalleryAeriesThumbnailVar6Pink from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/aeries-6-pink.jpg"
import IsleGalleryThumbnailVar0White from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/isle-gallery-0-white.png"
import IsleGalleryThumbnailVar1Brick from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/isle-gallery-1-brick.jpg"
import IsleGalleryThumbnailVar2Black from "@spatialsys/web/core/js/components/environment-template/environment-variants/thumbnails/isle-gallery-2-black.jpg"

// If we can construct an NFT environment ID from the chain, contract address, and token ID, we can assume it's an custom NFT environment (as opposed to built-in NFT environment).
export const isCustomNftEnvironment = (env: EnvironmentOption) => {
  return Boolean(env?.metadata?.nftChain) && Boolean(env?.metadata?.contractAddress) && Boolean(env?.metadata?.tokenID)
}

export const environmentOptions: readonly EnvironmentOption[] = [
  {
    environment: VREnvironment.Abstract,
    images: [AbstractThumbnail.src],
    name: "Upload Custom Space",
  },
  {
    environment: VREnvironment.Agora,
    images: [AgoraThumbnail.src],
    name: "Agora",
  },
  {
    environment: VREnvironment.IsleGallery,
    images: [IsleGalleryThumbnailVar0White.src, IsleGalleryThumbnailVar1Brick.src, IsleGalleryThumbnailVar2Black.src],
    iconPickCoord: { x: 0.07, y: 0.6 },
    name: "Isle Gallery",
  },
  {
    environment: VREnvironment.AeriesGallery,
    images: [
      GalleryAeriesThumbnailVar0White.src,
      GalleryAeriesThumbnailVar1Blue.src,
      GalleryAeriesThumbnailVar2Red.src,
      GalleryAeriesThumbnailVar3Purple.src,
      GalleryAeriesThumbnailVar4Yellow.src,
      GalleryAeriesThumbnailVar5Black.src,
      GalleryAeriesThumbnailVar6Pink.src,
    ],
    variantOrders: [0, 5, 1, 2, 6, 4],
    iconPickCoord: { x: 0.1, y: 0.5 },
    name: "Aeries Gallery",
  },
  {
    environment: VREnvironment.ObsidianGallery,
    images: [GalleryObsidianThumbnail.src],
    name: "Obsidian Gallery",
  },
  {
    environment: VREnvironment.Auditorium,
    images: [AuditoriumThumbnail.src],
    name: "Auditorium",
  },
  {
    environment: VREnvironment.Outdoor,
    images: [OutdoorThumbnail.src],
    name: "Outdoors",
  },
  {
    environment: VREnvironment.BoardroomLounge,
    images: [BoardroomLoungeThumbnail.src],
    name: "Boardroom Lounge",
  },
  {
    environment: VREnvironment.BoardroomWithATable,
    images: [BoardroomWithATableThumbnail.src],
    name: "Boardroom with Table",
  },
  {
    environment: VREnvironment.MountainLounge,
    images: [MountainLoungeThumbnail.src],
    name: "Mountain Lounge",
  },
]

export const customEnvironmentOption: Readonly<EnvironmentOption> = {
  environment: VREnvironment.Custom,
  images: [CustomThumbnail.src],
  name: "Custom",
}
