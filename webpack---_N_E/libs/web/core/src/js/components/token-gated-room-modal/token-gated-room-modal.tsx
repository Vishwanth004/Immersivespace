import clsx from "clsx"
import Link from "next/link"
import { memo, useCallback } from "react"

import { TokenGateConfig } from "@spatialsys/js/sapi/types"
import { useAppContext } from "@spatialsys/web/app-context"
import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import { Button } from "@spatialsys/web/ui"

import classes from "./token-gated-room-modal.module.scss"

interface TokenGatedRoomModalProps extends Pick<ModalProps, "onRequestClose"> {
  tokenGatedRoomConfig: TokenGateConfig
  roomName: string
  hasWallet: boolean
}

const TokenGatedRoomModalContents = memo(function TokenGatedRoomModalContents(props: TokenGatedRoomModalProps) {
  const { tokenGatedRoomConfig, roomName, hasWallet, onRequestClose } = props

  const defaultLink = tokenGatedRoomConfig
    ? `https://opensea.io/assets/${tokenGatedRoomConfig.blockchainIdentifier}/${tokenGatedRoomConfig.contractAddress}/${
        tokenGatedRoomConfig.anyToken ? 1 : tokenGatedRoomConfig.tokenID
      }`
    : "https://opensea.io"

  const link = tokenGatedRoomConfig?.purchaseLink ?? defaultLink

  return (
    <div className={clsx(modalClasses.body, classes.container)}>
      <div>
        <div className={classes.roomName}>{roomName}</div>
        <div>is exclusive for token owners</div>
      </div>

      {tokenGatedRoomConfig && (
        <>
          <div className={classes.accessRequirements}>Access Requirement</div>
          <div className={classes.tokenInfoBody}>
            {tokenGatedRoomConfig.tokenName ? (
              <div className={classes.tokenInfoRow}>
                <div className={classes.tokenInfoTitle}>Name of NFT</div>
                <div className={classes.tokenInfoValue}>{`${tokenGatedRoomConfig.tokenName}`}</div>
              </div>
            ) : (
              <>
                <div className={classes.tokenInfoRow}>
                  <div className={classes.tokenInfoTitle}>Blockchain</div>
                  <div className={classes.tokenInfoValue}>{tokenGatedRoomConfig.blockchainIdentifier}</div>
                </div>
                <hr />
                <div className={classes.tokenInfoRow}>
                  <div className={classes.tokenInfoTitle}>Contract Address</div>
                  <div className={classes.tokenInfoValue}>{tokenGatedRoomConfig.contractAddress}</div>
                </div>
                <hr />
                {!tokenGatedRoomConfig.anyToken && (
                  <div className={classes.tokenInfoRow}>
                    <div className={classes.tokenInfoTitle}>TokenID</div>
                    <div className={classes.tokenInfoValue}>{tokenGatedRoomConfig.tokenID}</div>
                  </div>
                )}
              </>
            )}

            <hr />
            <div className={classes.tokenInfoRow}>
              <div className={classes.tokenInfoTitle}>Minimum Quantity</div>
              <div className={classes.tokenInfoValue}>{`${tokenGatedRoomConfig.quantity}`}</div>
            </div>
          </div>
          {!hasWallet && <div className={classes.connectWalletDialog}>Connect your wallet and verify your token</div>}
          <div className="flex justify-evenly pt-4">
            {!hasWallet ? (
              <Button className="min-w-[250px]" as={Link} href="/integrations" size="xl">
                Connect Wallet
              </Button>
            ) : (
              <Button className="min-w-[250px]" as="a" href={link} target="_blank" rel="noreferrer" size="xl">
                Purchase Token
              </Button>
            )}
          </div>
        </>
      )}
      <div className="flex justify-evenly pt-4">
        <Button className="min-w-[250px]" color="white" size="xl" onClick={onRequestClose}>
          Close
        </Button>
      </div>
    </div>
  )
})

export const TokenGatedRoomModal = memo(function TokenGatedRoomModal() {
  const actions = useAppContext((context) => context.actions)
  const { isTokenGatedFromRoom, tokenGatedRoomConfig, tokenGatedRoomName, tokenGatedUserHasWallet } = useAppContext(
    (context) => context.state.tokenGate
  )

  const handleClose = useCallback(() => {
    actions.setTokenGate({
      isTokenGatedFromRoom: false,
      tokenGatedRoomConfig: null,
      tokenGatedUserHasWallet: false,
    })
  }, [actions])

  return (
    <Modal
      isOpen={isTokenGatedFromRoom}
      darkOverlay
      onRequestClose={handleClose}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <TokenGatedRoomModalContents
        tokenGatedRoomConfig={tokenGatedRoomConfig}
        roomName={tokenGatedRoomName}
        hasWallet={tokenGatedUserHasWallet}
        onRequestClose={handleClose}
      />
    </Modal>
  )
})
