import * as Sentry from "@sentry/nextjs"
import { call, cancelled, put, race, take } from "typed-redux-saga/macro"

import { createFileFromBlob } from "@spatialsys/js/util/create-file-from-blob"
import { InteractionName } from "@spatialsys/react/analytics"
import { Mixpanel } from "@spatialsys/web/analytics"
import { ActionType, Actions } from "@spatialsys/web/app-state"
import * as Toast from "@spatialsys/web/core/js/components/toast/toast"

import { makeFilename } from "./make-filename"

const MP4 = "video/mp4"
const WEBM = "video/webm"

export function* recordingSaga(canvas: HTMLCanvasElement) {
  const stream = canvas.captureStream()
  try {
    yield* call(recordingHelperSaga, stream)
  } catch (err) {
    yield* put(Actions.stopRecording())
    Toast.error("Something went wrong during recording. Please try again.")
    Sentry.captureException(err)
  }
}

function* recordingHelperSaga(stream: MediaStream) {
  Mixpanel.time_event(InteractionName.RecordedVideo)
  const { mimeType, fileSuffix } = yield* call(getBestVideoType)
  const recorder = new MediaRecorder(stream, { mimeType })
  const chunks: Blob[] = []
  recorder.ondataavailable = (e) => {
    chunks.push(e.data)
  }
  recorder.start()
  const stopped = new Promise((resolve) => (recorder.onstop = resolve))
  const errorPromise = new Promise<never>(
    (_, reject) =>
      (recorder.onerror = (e: MediaRecorderErrorEvent) => {
        reject(e.error)
      })
  )
  try {
    yield* race([take(ActionType.StopRecording), errorPromise])
  } finally {
    recorder.stop()
    if (yield* cancelled()) {
      // If this saga's cancelled, i.e. the user left the scene,
      // don't generate a file and reset the state
      yield* put(Actions.stopRecording())
      // eslint-disable-next-line no-unsafe-finally
      return
    }
  }

  // The ondataavailable callback gets called before this resolves.
  yield stopped

  // Generate the file
  const blob = new Blob(chunks, { type: mimeType })
  const filename = yield* call(makeFilename)
  yield* call(createFileFromBlob, `${filename}.${fileSuffix}`, blob)
  Mixpanel.track(InteractionName.RecordedVideo, { "File Type": fileSuffix })
}

function getBestVideoType() {
  if (MediaRecorder.isTypeSupported(MP4)) {
    return { mimeType: MP4, fileSuffix: "mp4" }
  }
  return {
    mimeType: WEBM,
    fileSuffix: "webm",
  }
}
