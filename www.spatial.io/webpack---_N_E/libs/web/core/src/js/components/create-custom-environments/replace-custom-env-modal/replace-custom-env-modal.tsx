import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { ReactComponent as KeyboardBackspaceIcon } from "@spatialsys/assets/icons/material-filled/keyboard-backspace.svg"
import { ContentObject } from "@spatialsys/unity/bridge"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import { Button, Heading } from "@spatialsys/web/ui"

type ReplaceCustomEnvModalProps = {
  onClickBack: () => void
  onStartNewCustomEnv: (replace: boolean, content: ContentObject[]) => void
  uploadContent?: ContentObject[]
} & ModalProps

/**
 * A modal for the user to choose if they want to replace the current environment to maintain position, scale and rotation or start new to reset those parameters
 *
 */
export function ReplaceCustomEnvModal(props: ReplaceCustomEnvModalProps) {
  const { onClickBack, onRequestClose, onStartNewCustomEnv, uploadContent, ...restOfProps } = props
  return (
    <Modal darkOverlay {...restOfProps}>
      <InstanceCount>
        <div className="flex flex-col items-center justify-center rounded-lg bg-white p-10">
          <button type="button" className="absolute left-3 top-3" onClick={onClickBack}>
            <KeyboardBackspaceIcon />
          </button>
          <button className="absolute right-3 top-3" onClick={onRequestClose}>
            <CloseIcon />
          </button>
          <Heading as="h1" size="h1" textAlign="center">
            Keep Current Position?
          </Heading>
          <p className="mt-6 max-w-[380px] text-center text-sm text-gray-500">
            Would you like to keep the custom position you had set for the previous environment?
          </p>
          <div className="grid grid-flow-col justify-between gap-4">
            <Button
              className="mt-10"
              color="outline"
              size="lg"
              onClick={(event) => {
                onStartNewCustomEnv(true, uploadContent)
                onRequestClose(event)
              }}
            >
              Keep Position
            </Button>
            <Button
              className="mt-10"
              color="black"
              size="lg"
              onClick={(event) => {
                onStartNewCustomEnv(false, uploadContent)
                onRequestClose(event)
              }}
            >
              Reset Position
            </Button>
          </div>
        </div>
      </InstanceCount>
    </Modal>
  )
}
