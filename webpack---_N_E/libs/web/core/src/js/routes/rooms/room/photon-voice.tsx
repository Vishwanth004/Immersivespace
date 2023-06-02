import { useEffect, useRef } from "react"

import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { voiceManager } from "@spatialsys/web/rtc/photon-voice/voice-manager"

import silenceMp3 from "./silence.mp3"

export interface PhotonVoiceProps {
  onInitialized: () => void
}

export const PhotonVoice = (props: PhotonVoiceProps) => {
  const { onInitialized } = props
  const audioUnblockerRef = useRef<HTMLAudioElement>(null)
  const { user } = useUser()
  const { disableUnblockAudioWeb } = user.treatmentsParsed

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    voiceManager.lazyUnblockAudioContext()
    if (!disableUnblockAudioWeb) {
      voiceManager.setup(audioUnblockerRef.current)
    }
    voiceManager.preparePhotonVoiceClientIfNeeded(onInitialized)
  }, [disableUnblockAudioWeb, onInitialized])

  if (disableUnblockAudioWeb) {
    return null
  }

  return <audio src={silenceMp3} ref={audioUnblockerRef} />
}
