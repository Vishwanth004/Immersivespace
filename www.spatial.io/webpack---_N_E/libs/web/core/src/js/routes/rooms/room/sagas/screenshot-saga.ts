import * as Sentry from "@sentry/nextjs"
import { call } from "typed-redux-saga/macro"

import { canvasToBlob } from "@spatialsys/js/util/canvas-to-blob"
import { createFileFromBlob } from "@spatialsys/js/util/create-file-from-blob"
import { UnityMessages } from "@spatialsys/unity/bridge"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"

import { makeFilename } from "./make-filename"

let nextFrameResolve: () => void | null = null

/**
 * Sends a message to unity to get a message back after the next frame has been rendered, then
 * generates a png file from the canvas's content.
 * @param canvas
 */
export function* screenshotSaga(canvas: HTMLCanvasElement) {
  yield* call(UnityMessages.notifyOnFrameEnd)
  // Without waiting until the end of the frame's rendering it's not deterministic to know that
  // reading from the canvas will retrieve the rendered image's bytes, without preserving the
  // drawing buffer which tends to cause glitchy rendering side effects.
  yield new Promise<void>((res) => void (nextFrameResolve = res))
  try {
    const blob = yield* call(canvasToBlob, canvas)
    if (!blob) {
      throw new Error("Unable to make make blob while taking screenshot of the canvas")
    }
    const filename = yield* call(makeFilename)
    yield* call(createFileFromBlob, `${filename}.png`, blob)
  } catch (err: any) {
    Toast.error("Something went wrong taking a photo. Please try again.")
    Sentry.captureException(err)
  }
}

/**
 * Called as part of handling the message from Unity
 */
export function finishScreenshot() {
  // Continue on with the screenshot saga.
  if (!nextFrameResolve) {
    // This shouldn't ever be possible
    throw new Error("finishScreenshot called before screenshotSaga")
  }
  nextFrameResolve()
}
