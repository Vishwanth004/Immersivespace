import { VariantProps, cva } from "class-variance-authority"
import clsx from "clsx"
import { AnimatePresence, m } from "framer-motion"
import { ReactNode, memo, useCallback, useEffect, useRef } from "react"

import { ReactComponent as CloseIcon } from "@spatialsys/assets/icons/material-filled/close.svg"
import { OUT_CUBIC } from "@spatialsys/theme"

import { cn } from "../utils/cn"

type Position = "left" | "right"

export const drawerOverlayVariants = cva("fixed inset-0 z-overlay", {
  variants: {
    overlay: {
      translucent: "bg-black/50",
      transparent: "bg-transparent",
      none: "none",
    },
  },
  defaultVariants: { overlay: "translucent" },
})

// dynamic variants for the drawer https://www.framer.com/motion/animation/##dynamic-variants
const framerVariants = {
  open: { x: "0" },
  closed: (position: Position) => ({
    x: position === "left" ? "-100%" : "100%",
  }),
}

const framerOverlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
}

const transition = { ease: OUT_CUBIC, duration: 0.3 } as const

export type DrawerProps = {
  children: ReactNode
  closeOnEsc?: boolean
  closeOnOverlayClick?: boolean
  isOpen: boolean
  closeHandler: () => any
  showCloseButton?: boolean
  className?: string
  closeButtonClassName?: string
  overlayClassName?: string
  fullHeight?: boolean
  position?: Position
} & VariantProps<typeof drawerOverlayVariants>

export const Drawer = memo(function Drawer(props: DrawerProps) {
  const {
    className,
    closeButtonClassName,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    showCloseButton = true,
    closeHandler,
    isOpen,
    children,
    fullHeight,
    position = "right",
    overlay,
    overlayClassName,
  } = props

  const mouseDownTarget = useRef<EventTarget | null>(null)

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        if (closeOnEsc && isOpen) closeHandler()
      }
    },
    [closeHandler, closeOnEsc, isOpen]
  )

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    mouseDownTarget.current = e.target
  }, [])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      /**
       * Make sure the event starts and ends on the same DOM element.
       *
       * This is used to prevent the modal from closing when you
       * start dragging from the content, and release drag outside the content.
       *
       * We prevent this because it is technically not a considered "click outside"
       */
      if (mouseDownTarget.current !== e.target) return
      if (closeOnOverlayClick) closeHandler()
    },
    [closeHandler, closeOnOverlayClick]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [handleKeydown])

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="drawer" onMouseDown={handleMouseDown}>
          {overlay !== "none" && (
            <m.div
              className={cn(drawerOverlayVariants({ overlay, className: overlayClassName }))}
              animate={isOpen ? "open" : "closed"}
              variants={framerOverlayVariants}
              transition={transition}
              initial="closed"
              exit="closed"
              onClick={handleOverlayClick}
            />
          )}

          <m.div
            className={cn(
              "absolute bottom-0 top-0 z-drawer flex w-[500px] items-center justify-center bg-white shadow-drawer",
              position === "left" && "left-0 rounded-r-2xl ",
              position === "right" && "right-0 rounded-l-2xl",
              className
            )}
            animate={isOpen ? "open" : "closed"}
            custom={position}
            variants={framerVariants}
            transition={transition}
            initial="closed"
            exit="closed"
          >
            {showCloseButton && (
              <button type="button" onClick={closeHandler}>
                <CloseIcon
                  className={cn(
                    "absolute top-12 z-[1]",
                    position === "left" ? "left-8" : "right-8",
                    closeButtonClassName
                  )}
                />
              </button>
            )}
            <div
              className={clsx("max-h-full w-full !overflow-visible overflow-y-auto px-8 py-12", fullHeight && "h-full")}
            >
              {children}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
})
