import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, ModalProps } from "@spatialsys/web/core/js/components/modal/modal"
import { Button, Heading } from "@spatialsys/web/ui"

type SetCustomEnvModalProps = {
  selectedObjectID: number
  onSetEnvironment: () => void
} & ModalProps

/**
 * A modal for the user to choose if they want to set an uploaded file as an environment or a skybox
 *
 */
export function SetCustomEnvModal(props: SetCustomEnvModalProps) {
  const { onRequestClose, onSetEnvironment, selectedObjectID, ...restOfProps } = props

  return (
    <Modal darkOverlay onRequestClose={onRequestClose} {...restOfProps}>
      <InstanceCount>
        <div className="grid min-w-[280px] items-center justify-center gap-10 rounded-lg bg-white p-10">
          <button className="absolute right-2 top-2" onClick={onRequestClose}>
            <CloseIcon />
          </button>
          <Heading size="h2" textAlign="center">
            Set Custom
          </Heading>
          <div className="grid gap-3">
            <Button size="lg" onClick={onSetEnvironment}>
              Environment
            </Button>
            <Button
              size="lg"
              onClick={(event) => {
                UnityMessages.setCustomSkyboxFromObject(selectedObjectID)
                onRequestClose(event)
              }}
            >
              Skybox
            </Button>
          </div>
        </div>
      </InstanceCount>
    </Modal>
  )
}
