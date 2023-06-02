export enum FrameReaderMessageAction {
  Setup,
  Sample,
}

export interface FrameReaderSetupPayload {
  readable: ReadableStream
}

export interface FrameReaderInputMessage {
  type: FrameReaderMessageAction
  payload?: FrameReaderSetupPayload
}

export interface FrameReaderOutputMessage {
  frame: ImageBitmap
}
