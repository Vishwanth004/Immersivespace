import clsx from "clsx"
import { PropsWithChildren, memo, useMemo } from "react"
import ReactModal, { Classes as ReactModalClasses, Props as ReactModalProps } from "react-modal"

import { FreezeChildren } from "@spatialsys/react/util/freeze-children"
import modalVariables from "@spatialsys/web/core/css/components/modal-variables.module.scss"
import modalClasses from "@spatialsys/web/core/css/components/modal.module.scss"

const TRANSITION_DURATION = parseInt(modalVariables.transitionDuration, 10)

const ALLOW_SCROLL_CLASSNAME = "modalAllowScroll"
const MODAL_CLASSNAME_BODY = "ReactModal__Body--open"

/**
 * Base classes that center the modal:
 * - Translates x,y to center the modal
 * - Applies a fade in + scale in / fade out + scale out transition.
 */
export const modalClassesBase: ReactModalClasses = {
  base: modalClasses.modal,
  afterOpen: modalClasses.modalAfterOpen,
  beforeClose: modalClasses.modalBeforeClose,
}

/**
 * Base classes that don't center the modal:
 * - No translate transform is applied.
 * - Applies a fade in + scale in / fade out + scale out transition.
 */
const modalClassesNoTranslate: ReactModalClasses = {
  base: modalClasses.modalNoTranslate,
  afterOpen: modalClasses.modalNoTranslateAfterOpen,
  beforeClose: modalClasses.modalNoTranslateBeforeClose,
}

/**
 * Base classes for the modal overlay:
 * - z-index is applied on the overlay
 * - fade in / fade out transition
 */
const overlayClassesBase: ReactModalClasses = {
  base: modalClasses.overlay,
  afterOpen: modalClasses.overlayAfterOpen,
  beforeClose: modalClasses.overlayBeforeClose,
}

/**
 * Base classes for the modal overlay with dark background:
 * - z-index is applied on the overlay
 * - translucent dark background is applied to the overlay
 * - fade in / fade out transition
 */
const overlayClassesDarkBg: ReactModalClasses = {
  ...overlayClassesBase,
  base: modalClasses.overlayDarkBg,
}

export interface ModalProps extends PropsWithChildren<ReactModalProps> {
  /** If `true`, allows scrolling the content behind the modal. */
  allowScroll?: boolean
  /** If `true`, an overlay with a translucent dark background will be used. Defaults to false, using a completely transparent overlay */
  darkOverlay?: boolean
  /** If `true`, the modal will not be centered vertically and horizontally. Defaults to false  */
  disableTranslate?: boolean
  /**
   * Overrides the `base` class that is applied to the modal. Preserves the `afterOpen` and `beforeOpen`
   * classes, which are required for the fade and scale transitions.
   *
   * If `className` is passed, this prop will be ignored.
   */
  modalBaseClass?: string
  /**
   * Overrides the `base` class that is applied to the overlay. Preserves the `afterOpen` and `beforeOpen`
   * classes, which are required for the fade transition.
   *
   * If `overlayClassName` is passed, this prop will be ignored.
   */
  overlayBaseClass?: string
  /**
   * A class to add on to the base classes applied to the overlay
   */
  overlayAdditionalBaseClass?: string
  /** Backup text content for the logo in modal */
  label?: string
}

/**
 * A wrapper around `ReactModal`, with open and close transitions and centered by default.
 *
 * Extend the styling by composing the classes from `modal.module.scss`, and then
 * passing `modalBaseClass` or `overlayBaseClass
 * ` prop. Or, directly pass in `className`
 * `overlayClassName`, which is forwarded to the `ReactModal` component.
 *
 * Basic Usage
 * @example
 * <Modal darkOverlay isOpen={myState.isOpen} >{children}</Modal>
 *
 * Using modalBaseClass
 * @example
 * // in `classes`
 * // .modal {
 * //   composes: modalNoTranslate from "@spatialsys/web/core/css/components/modal.module.scss";
 * //   position: absolute;
 * //   top: 20vh;
 * // }
 * <Modal disableTransform modalBaseClass={classes.modal} />
 */
export const Modal = memo(function Modal(props: ModalProps) {
  const {
    allowScroll,
    className,
    overlayClassName,
    darkOverlay,
    disableTranslate,
    modalBaseClass,
    overlayBaseClass,
    overlayAdditionalBaseClass,
    children,
    closeTimeoutMS = TRANSITION_DURATION,
    ...rest
  } = props

  /**
   * Gets the `className` argument. Uses `className` if that is passed as a prop.
   *
   * Otherwise, uses `modalClassesNoTranslate` or `modalClassesBase`, overwriting the `base` property
   * if `modalBaseClass` prop is passed.
   */
  const modalClasses = useMemo(() => {
    if (className) {
      return className
    }
    const baseClasses = disableTranslate ? modalClassesNoTranslate : modalClassesBase

    if (!modalBaseClass) {
      return baseClasses
    }

    return { ...baseClasses, base: modalBaseClass }
  }, [className, disableTranslate, modalBaseClass])

  /**
   * Gets the `overlayClassName` argument. Uses `overlayClassName` if that is passed as a prop.
   *
   * Uses `overlayClassesDarkBg` or `overlayClassesBase` otherwise, overwriting the `base` property
   * if `overlayBaseClass` prop is passed.
   */
  const overlayClasses = useMemo(() => {
    if (overlayClassName) {
      return overlayClassName
    }

    const baseClasses = darkOverlay ? overlayClassesDarkBg : overlayClassesBase
    if (!overlayBaseClass) {
      return { ...baseClasses, base: clsx(baseClasses.base, overlayAdditionalBaseClass) }
    }

    return { ...baseClasses, base: overlayBaseClass }
  }, [darkOverlay, overlayAdditionalBaseClass, overlayBaseClass, overlayClassName])

  return (
    <ReactModal
      bodyOpenClassName={clsx(MODAL_CLASSNAME_BODY, allowScroll && ALLOW_SCROLL_CLASSNAME)}
      className={modalClasses}
      overlayClassName={overlayClasses}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      {/* Freeze children while exiting to ensure that modal content doesn't change during the transition */}
      <FreezeChildren freeze={!props.isOpen}>{children}</FreezeChildren>
    </ReactModal>
  )
})
