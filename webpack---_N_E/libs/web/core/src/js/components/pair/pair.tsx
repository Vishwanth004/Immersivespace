import clsx from "clsx"
import { memo, useCallback, useEffect, useRef, useState } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as HelpOutlineIcon } from "@spatialsys/assets/icons/material-outlined/help-outline.svg"
import { SAPILogChannel } from "@spatialsys/js/sapi/clients/sapi"
import { trackDevicePair } from "@spatialsys/web/analytics"
import PairCompleteVideo from "@spatialsys/web/core/js/components/pair-complete-video/pair-complete-video"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { logger } from "@spatialsys/web/logger"
import { sapiClient } from "@spatialsys/web/sapi"
import { CenteredLoader } from "@spatialsys/web/ui"

import PinInput from "./pin-input"

import classes from "./pair.module.scss"

interface PairProps {
  pairCompleteHandler: () => any
  focusPinInput?: boolean
  visible?: boolean
  enableSkip?: boolean
  enableClose?: boolean
  enableHelp?: boolean
  className?: string
  contentClassName?: string
}

const PAIRING_CODE_LENGTH = 5
export const HELP_URL = "https://support.spatial.io/hc/en-us/categories/360002794051-Device-Set-Up"

export const Pair = memo(function Pair({
  pairCompleteHandler,
  className,
  contentClassName,
  focusPinInput = true,
  visible = true,
  enableSkip = false,
  enableClose = false,
  enableHelp = true,
}: PairProps) {
  const [screen, setScreen] = useState<"pair" | "done">("pair")
  const [isLoading, setIsLoading] = useState(false)
  const pinInputRef = useRef(null)
  const didUnload = useRef(false)

  useEffect(() => {
    didUnload.current = false
    return () => {
      didUnload.current = true
    }
  }, [])

  const validatePairingCode = async (code: string) => {
    setIsLoading(true)
    try {
      await sapiClient.users.updateCode(code)
    } finally {
      setIsLoading(false)
    }
  }

  const completePairing = () => {
    trackDevicePair("Numeric")
    setScreen("done")
  }

  const closePair = () => {
    pairCompleteHandler()
    setTimeout(() => {
      if (!didUnload.current) {
        setScreen("pair")
      }
    }, 500)
  }

  const onCompleteCodeInput = useCallback(async (code: string) => {
    try {
      await validatePairingCode(code)
      completePairing()
    } catch (e) {
      pinInputRef.current?.clear()
      const err = e?.response?.data ?? e.toString()
      Toast.error(err)
      logger.error(SAPILogChannel, "Failed to validate pairing code:", { err, status: e?.response?.status, code })
    }
  }, [])

  return (
    <div className={clsx(classes.container, className)}>
      {enableHelp && (
        <div className={classes.help}>
          <a target="_blank" rel="noopener noreferrer" href={HELP_URL}>
            <HelpOutlineIcon />
          </a>
        </div>
      )}
      {enableClose && (
        <div className={classes.close}>
          <button type="button" onClick={closePair}>
            <CloseIcon />
          </button>
        </div>
      )}
      {isLoading ? (
        <CenteredLoader color="black" className="row-span-full m-auto" />
      ) : screen === "pair" ? (
        <div className={clsx(classes.content, classes.numeric, contentClassName)}>
          <div>
            <div className={classes.title}>Pair Your Headset</div>
            <div className={classes.instructions}>Find the code in Spatial on your headset and enter it below</div>
          </div>
          <PinInput
            forceFocus={focusPinInput}
            ref={pinInputRef}
            length={PAIRING_CODE_LENGTH}
            onComplete={onCompleteCodeInput}
          />
          <div>
            <a target="_blank" rel="noopener noreferrer" href="/download">
              <button className={classes.downloadAppBtn} type="button">
                Download Spatial
              </button>
            </a>
            {enableSkip && (
              <>
                {" or "}
                <button className={classes.downloadAppBtn} type="button" onClick={closePair}>
                  Skip
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.title}>Headset Paired</div>
            <div className={classes.instructions}>You can put your headset back on now</div>
          </div>
          <div className={classes.videoContainer}>{visible && <PairCompleteVideo />}</div>
          <div className={classes.footer}>
            <div className={clsx(classes.doneBtn, "btn-round")}>
              <button className="button" type="button" onClick={closePair}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
