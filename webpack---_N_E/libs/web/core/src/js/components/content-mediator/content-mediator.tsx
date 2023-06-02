import * as React from "react"

import { ContentObject, FileTooLargeError, UnimplementedFileTypeError } from "@spatialsys/unity/bridge"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"
import * as ContentActions from "@spatialsys/web/core/js/sapi/content-actions"
import { logger } from "@spatialsys/web/logger"

/*
 adds a list of files to SAPI 
 
 @param idx enumerated id
 @param file to upload
 @param roomID current roomID
 @param unlimitedFileSize if unlimited file size
 */
export function addFiles(
  files: File[],
  fileInputRef: HTMLInputElement | null,
  roomId: string,
  unlimitedFileSize: boolean
): Promise<PromiseSettledResult<ContentObject>[]> {
  logger.info(ContentActions.FileUploadLogChannel, "Initiated File Upload")

  return Promise.allSettled(
    files.map(async (file, idx) => {
      try {
        const res = await ContentActions.createFileUpload(idx, file, roomId, unlimitedFileSize)
        tryUnsetFile(idx, fileInputRef)
        return res
      } catch (err) {
        sendToastFromErrors(idx, err, fileInputRef, file)
        throw err
      }
    })
  )
}

export function sendToastFromErrors(idx, e, fileInputRef, file) {
  if (e instanceof ContentActions.GLTFEmbeddedResourceValidationError) {
    fileUploadError(
      idx,
      fileInputRef,
      "Uploaded GLTFs must have their assets (images, textures, etc) embedded. Alternatively, you can convert the model to a GLB file before upload.",
      e.message,
      e,
      5000
    )
  } else {
    const toastMessage = `An error occurred uploading your file: ${e.toString()}`
    fileUploadError(idx, fileInputRef, toastMessage, "Error occurred during file upload", e)
  }

  if (e instanceof UnimplementedFileTypeError) {
    const toastId = fileUploadWarning(idx, fileInputRef, e.message, "", 7000)
    Toast.update(toastId, {
      render: (
        <>
          {`Sorry, you can't upload ${e.fileTypeName} yet.`}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://spatialxr.zendesk.com/hc/en-us/articles/360036170911-Uploading-Content-into-Spatial"
          >
            See what file types we do support.
          </a>
        </>
      ),
    })
  } else if (e instanceof FileTooLargeError) {
    const toastMessage = `File is too large. Limit for ${e.contentType} is ${e.maxSizeAllowed}MB`
    const logMessage = `Attempted to upload file that is too large: ${file.size}`
    fileUploadError(idx, fileInputRef, toastMessage, logMessage)
  }
}

function fileUploadWarning(
  fileIdx: number,
  fileInputRef: HTMLInputElement,
  toastMessage: string,
  logMessage: string,
  toastDuration = 5000
) {
  logger.warn(ContentActions.FileUploadLogChannel, logMessage)
  tryUnsetFile(fileIdx, fileInputRef)
  return Toast.warn(toastMessage, toastDuration)
}

function fileUploadError(
  fileIdx: number,
  fileInputRef: HTMLInputElement,
  toastMessage: string,
  logMessage: string,
  error: any = undefined,
  duration = 2000
) {
  Toast.notify(toastMessage, duration, "toast-error")
  if (error === undefined) {
    logger.info(ContentActions.FileUploadLogChannel, logMessage)
  } else {
    logger.error(ContentActions.FileUploadLogChannel, logMessage, error)
  }
  tryUnsetFile(fileIdx, fileInputRef)
}

// unset file so you can upload it again
// fileInputRef can be null when using drag/drop upload component
function tryUnsetFile(fileIdx: number, fileInputRef: HTMLInputElement) {
  if (!fileInputRef) return

  if (fileInputRef[fileIdx]) {
    fileInputRef[fileIdx].value = ""
  } else {
    fileInputRef.value = ""
  }
}
