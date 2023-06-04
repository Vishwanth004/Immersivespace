import { memo, useState } from "react"

import { AppStateSelectors } from "@spatialsys/unity/app-state"
import { ContentObject, UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import { Button, Heading } from "@spatialsys/web/ui"

interface ConfirmAutoLayoutModalProps {
  autoLayoutFiles: ContentObject[]
  onClose: () => void
}

export const ConfirmAutoLayoutModal = memo(function ConfirmAutoLayoutModal(props: ConfirmAutoLayoutModalProps) {
  const { autoLayoutFiles, onClose } = props

  const [hideFrames, setHideFrames] = useState(false)

  const isAdmin = useAppContext((context) => AppStateSelectors.isCurrentUserAdministrator(context.state.unity.appState))

  const spawnContent = (shouldAutoLayout: boolean) => {
    UnityMessages.spawnContent(hideFrames, shouldAutoLayout, autoLayoutFiles)
    onClose()
  }

  return (
    <Modal isOpen={autoLayoutFiles.length !== 0} darkOverlay>
      <div className="border-lg max-w-[600px] bg-white p-10 text-center">
        <Heading size="h1" textAlign="center" className="mb-8">
          Place in frames?
        </Heading>
        <div className="my-4">
          We noticed that you're bringing in a lot of content. Would you like us to place it in gallery frames for you?
        </div>
        {isAdmin && (
          <div className="my-6 flex items-center justify-center">
            <input id="hideEmpties" type="checkbox" onClick={() => setHideFrames((prev) => !prev)} />
            <label htmlFor="hideEmpties" className="mx-2 text-sm">
              Hide empty frames (you can change this later in environment settings)
            </label>
          </div>
        )}
        <div className="my-4 grid w-full auto-cols-[200px] grid-flow-col justify-center gap-5">
          <Button color="outline" size="lg" onClick={() => spawnContent(false)}>
            No Thanks
          </Button>
          <Button size="lg" onClick={() => spawnContent(true)}>
            Yes, lay it out!
          </Button>
        </div>
      </div>
    </Modal>
  )
})
