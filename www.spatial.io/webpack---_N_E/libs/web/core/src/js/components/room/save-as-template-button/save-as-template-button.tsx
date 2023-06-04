import { useEffect, useRef } from "react"

import { UnityMessages } from "@spatialsys/unity/bridge"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import { sapiClient } from "@spatialsys/web/sapi"
import { Heading } from "@spatialsys/web/ui"

const SaveAsTemplateButton = () => {
  const templateNameRef = useRef<HTMLInputElement>(null)
  const currentToastId = useRef<Toast.ToastId>(null)

  useEffect(() => {
    return () => {
      if (currentToastId.current) {
        Toast.dismiss(currentToastId.current)
      }
    }
  }, [])

  const showSaveAsTemplate = () => {
    currentToastId.current = Toast.notifyConfirm({
      message: ({ closeToast }) => (
        <div className="p-4">
          <InstanceCount />
          <Heading size="h3" className="pb-3">
            Save as Template
          </Heading>
          <p>What would you like to name it?</p>
          <input
            ref={templateNameRef}
            type="text"
            placeholder="Name"
            id="template_name"
            className="mx-auto my-2 block h-8 pb-4 pt-3 text-center align-middle text-base"
            autoComplete="off"
          />

          <button type="button" className="hover pr-8 text-black" onClick={closeToast}>
            Cancel
          </button>

          <button type="button" className="text-blue" onClick={() => confirmSaveAsTemplate()}>
            Save
          </button>
        </div>
      ),
      containerId: Toast.InRoomContainerId,
    })

    setTimeout(() => {
      templateNameRef.current.focus()
    }, 100)
  }

  const confirmSaveAsTemplate = async () => {
    const templateName = templateNameRef.current.value.trim()

    if (!templateName) {
      return
    }

    Toast.dismiss(currentToastId.current)

    const existingTemplateIDs = await sapiClient.content.findTemplateIDsWithName(templateName)
    const existingTemplateID = existingTemplateIDs.pop()

    if (existingTemplateID) {
      const shouldOverwrite = await saveAsTemplateAskShouldOverwrite(templateName)
      if (shouldOverwrite) {
        UnityMessages.saveRoomAsTemplate(templateName, existingTemplateID)
      }
    } else {
      UnityMessages.saveRoomAsTemplate(templateName)
    }
  }

  const saveAsTemplateAskShouldOverwrite = (templateName: string): Promise<boolean> => {
    return new Promise((resolve) => {
      currentToastId.current = Toast.notifyConfirm({
        message: ({ closeToast }) => (
          <div className="p-4">
            <InstanceCount />
            <Heading size="h3" className="pb-3">
              Save as Template
            </Heading>
            <p className="pb-4">
              There is already a template named &ldquo;{templateName}&rdquo;.
              <br />
              Do you want to overwrite it?
            </p>
            <button
              type="button"
              className="hover pr-8 text-black"
              onClick={() => {
                closeToast()
                resolve(false)
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="hover text-red"
              onClick={() => {
                closeToast()
                resolve(true)
              }}
            >
              Overwrite
            </button>
          </div>
        ),
        containerId: Toast.InRoomContainerId,
      })
    })
  }

  return (
    <button type="button" onClick={showSaveAsTemplate}>
      <div>Save as Template</div>
    </button>
  )
}

export default SaveAsTemplateButton
