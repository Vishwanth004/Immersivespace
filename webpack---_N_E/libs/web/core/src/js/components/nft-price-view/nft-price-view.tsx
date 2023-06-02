import clsx from "clsx"

import { NftPrice } from "@spatialsys/js/sapi/types"
import { NFTContentMetaDataState_PriceDataState } from "@spatialsys/unity/app-state"
import { ReactComponent as ETHIcon } from "@spatialsys/web/core/img/icons/ethereum.svg"
import { ReactComponent as WETHIcon } from "@spatialsys/web/core/img/icons/wrapped-ethereum.svg"

import classes from "./nft-price-view.module.scss"

interface NFTPriceProps {
  nftPrice: NftPrice | NFTContentMetaDataState_PriceDataState
}

export const NFTPriceView = (props: NFTPriceProps) => {
  const { nftPrice } = props

  return (
    <div className={clsx("tooltip-host", classes.container)}>
      {nftPrice.currency === "ETH" ? (
        <ETHIcon className={classes.nftCurrencyIcon} />
      ) : (
        <WETHIcon className={classes.nftCurrencyIcon} />
      )}
      <span className={classes.priceValue}>{Math.round((nftPrice.price + Number.EPSILON) * 100) / 100}</span>
      <span className={"tooltip-text tooltip-text--top"}>{nftPrice.priceLabel || "price"}</span>
    </div>
  )
}
