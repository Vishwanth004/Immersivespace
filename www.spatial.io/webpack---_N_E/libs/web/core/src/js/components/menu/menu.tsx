/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx"
import * as React from "react"

import { useDefaultProps } from "@spatialsys/web/core/js/util/hooks"

type DropPosition = "dropdown" | "dropup"
type MenuPosition = "left" | "right" | "center"

export interface ToggleProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  [key: string]: any
}

interface MenuProps<C extends JSX.Element> {
  className?: string
  classNameContent?: string
  render: (props: ToggleProps) => C
  [prop: string]: any
  dropPosition?: DropPosition
  menuPosition?: MenuPosition
  menuBuffer?: number
  touchOnly?: boolean
  alwaysRemount?: boolean
  stateManager?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  paddingStyle?: string
  toggleButtonHitSlop?: number
  onClose?: () => void
}

const Menu = <C extends JSX.Element>(_props: React.PropsWithChildren<MenuProps<C>>) => {
  const {
    className,
    classNameContent,
    render,
    children,
    dropPosition,
    menuPosition,
    menuBuffer,
    paddingStyle,
    toggleButtonHitSlop,
    onClose,
    ...extraProps
  } = useDefaultProps(_props, {
    dropPosition: "dropdown",
    menuPosition: "left",
    menuBuffer: 0,
    touchOnly: false,
    alwaysRemount: false,
    paddingStyle: "2rem",
  })

  // TODO: DEV-4997 - fix conditional usage of useState. Conditional use of react hooks should be avoided.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = _props.stateManager ?? React.useState(false)
  const [menuHeight, setMenuHeight] = React.useState(null)
  const menuRef = React.useRef(null as HTMLDivElement)
  const contentRef = React.useRef(null as HTMLDivElement)
  const toggle = render({ isOpen, setIsOpen, ...extraProps })
  const scaleStyle = isOpen ? "scale(1)" : "scale(0)"
  const translateStyle = menuPosition === "center" ? "translateX(50%)" : ""

  React.useEffect(() => {
    if (!isOpen) onClose?.()
  }, [isOpen, onClose])

  const touchStartHandler = () => {
    if (isOpen) {
      // delay css transforms on close so that events can propogate
      setTimeout(() => {
        setIsOpen((open) => !open)
      }, 300)
    } else {
      setIsOpen((open) => !open)
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (menuRef.current && contentRef.current) {
      const totalHeight = menuBuffer + menuRef.current.clientHeight + contentRef.current.clientHeight
      setMenuHeight(totalHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuRef.current, contentRef.current, isOpen])

  const renderChildren = React.useCallback(() => {
    return React.Children.map(children, (child) => {
      return child && <li>{child}</li>
    })
  }, [children])

  return (
    <div
      ref={menuRef}
      className={`${className} menu menu--${dropPosition}`}
      onTouchStart={!_props.touchOnly ? touchStartHandler.bind(this) : undefined}
      onMouseEnter={!_props.touchOnly ? () => setIsOpen(true) : undefined}
      onMouseLeave={!_props.touchOnly ? () => setIsOpen(false) : undefined}
    >
      {toggle}
      <div
        ref={contentRef}
        className={clsx(
          `menu__content shadowHuge menu__content--${isOpen ? "open" : "closed"} menu__content--${menuPosition}`,
          classNameContent
        )}
        style={{
          transform:
            dropPosition === "dropup"
              ? `translate(0px, -${menuHeight}px) ${scaleStyle}`
              : `${scaleStyle} ${translateStyle}`,
          transformOrigin: dropPosition === "dropup" ? `bottom ${menuPosition}` : `top ${menuPosition}`,
        }}
      >
        <ul className="menu__list" style={{ padding: paddingStyle }}>
          {_props.alwaysRemount ? isOpen && renderChildren() : renderChildren()}
        </ul>
      </div>
      {isOpen && toggleButtonHitSlop && (
        <div
          className="menu_toggle_hitslop"
          style={{
            position: `absolute`,
            top: `${-toggleButtonHitSlop}px`,
            left: `${-toggleButtonHitSlop}px`,
            right: `${-toggleButtonHitSlop}px`,
            bottom: `${-toggleButtonHitSlop}px`,
          }}
        ></div>
      )}
    </div>
  )
}

export default Menu
