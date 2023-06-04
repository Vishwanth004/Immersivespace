import { Id, Slide, ToastContent, ToastOptions, UpdateOptions, toast } from "react-toastify"

import { CloseButtonToast } from "@spatialsys/web/core/js/components/close-button/close-button"

export type ToastId = Id

export const InRoomContainerId = "inRoom"

export function isActive(toastId: Id): boolean {
  return toast.isActive(toastId)
}

export function notify(
  message = "Got it" as ToastContent,
  duration = 1600 as number | null,
  className = "toast-bg",
  customId?: string,
  closeButton = false
) {
  const toastId = toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
    className,
    bodyClassName: "toast-body",
    progressClassName: "toast-progress-bar",
    hideProgressBar: true,
    closeButton,
    closeOnClick: false,
    ...(duration && { autoClose: duration }),
    ...(customId && { toastId: customId }),
  })

  return toastId
}

export function notifyProgress(message = "Upload in progress" as ToastContent, progress = 0, className = "toast-bg") {
  const toastId = toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
    className,
    bodyClassName: "toast-body",
    progressClassName: "toast-progress-bar",
    autoClose: false,
    progress,
    closeButton: false,
    closeOnClick: false,
  })
  return toastId
}

export function notifyNoClose(message = "Got it" as ToastContent, className = "toast-bg") {
  const toastId = toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
    className,
    bodyClassName: "toast-body",
    progressClassName: "toast-progress-bar",
    hideProgressBar: true,
    autoClose: false,
    closeButton: false,
    closeOnClick: false,
  })

  return toastId
}

export function notifyManualClose(
  message = "Got it" as ToastContent,
  className = "toast-bg toast-bg-overflow",
  onClose?: ToastOptions["onClose"],
  containerId?: string | number
) {
  const toastId = toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
    className,
    bodyClassName: "toast-body",
    progressClassName: "toast-progress-bar",
    ...{ containerId },
    hideProgressBar: true,
    autoClose: false,
    closeButton: CloseButtonToast,
    closeOnClick: false,
    ...{ onClose },
  })

  return toastId
}

interface INotifyConfirmProps {
  message: ToastContent
  containerId?: string
  options?: ToastOptions
  className?: string
}

export function notifyConfirm({
  message = "Got it" as ToastContent,
  containerId = undefined,
  options = { position: toast.POSITION.TOP_CENTER } as ToastOptions,
  className = "toast-bg",
}: INotifyConfirmProps) {
  const toastId = toast(message, {
    ...options,
    transition: Slide,
    className,
    bodyClassName: "toast-body",
    progressClassName: "toast-progress-bar",
    hideProgressBar: true,
    draggable: false,
    autoClose: false,
    closeButton: false,
    closeOnClick: false,
    containerId,
  })

  return toastId
}

export function warn(message: ToastContent, duration = 1600) {
  const toastId = toast.warn(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
    hideProgressBar: true,
    autoClose: duration,
    closeButton: false,
    closeOnClick: false,
  })

  return toastId
}

export function promptConfirm(message: ToastContent, onConfirm: () => void) {
  const toastId = toast(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
    className: "toast-bg toast-prompt",
    bodyClassName: "toast-prompt-body",
    progressClassName: "toast-progress-bar",
    hideProgressBar: true,
    autoClose: false,
    closeButton: false,
    closeOnClick: true,
    onClick: onConfirm,
  })

  return toastId
}

export const update = (toastId: Id, options?: UpdateOptions) => toast.update(toastId, options)
export const dismiss = (toastId?: Id) => toast.dismiss(toastId)

export function error(message = "Error" as ToastContent, duration = 1600) {
  notify(message, duration, "toast-error")
}

export function errorManualClose(message = "Error" as ToastContent) {
  notifyManualClose(message, "toast-error")
}
