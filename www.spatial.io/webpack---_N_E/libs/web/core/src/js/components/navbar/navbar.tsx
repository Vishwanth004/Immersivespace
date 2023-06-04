import clsx from "clsx"
import Link from "next/link"
import { Suspense, lazy, memo, useCallback, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { useTimeoutFn } from "react-use"

import { ReactComponent as SpatialWordMark } from "@spatialsys/assets/icons/logos/spatial-word-mark.svg"
import { ReactComponent as SpatialLogo } from "@spatialsys/assets/icons/logos/spatial.svg"
import { ReactComponent as AddIcon } from "@spatialsys/assets/icons/material-filled/add.svg"
import { ReactComponent as SearchIcon } from "@spatialsys/assets/icons/material-filled/search.svg"
import { ReactComponent as MenuRounded } from "@spatialsys/assets/icons/material-rounded/menu.svg"
import { getPlayerColor } from "@spatialsys/js/util/player-colors"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { Modals } from "@spatialsys/web/app-state"
import { TryToAuthenticate } from "@spatialsys/web/core/js/components/auth/try-to-authenticate"
import { AvatarIcon } from "@spatialsys/web/core/js/components/avatar-icon/avatar-icon"
import NamePlaceholder from "@spatialsys/web/core/js/components/avatar-icon/name-placeholder/name-placeholder"
import { Modal } from "@spatialsys/web/core/js/components/modal/modal"
import TriangleConnector from "@spatialsys/web/core/js/components/modal/triangle-connector/triangle-connector"
import triangleVars from "@spatialsys/web/core/js/components/modal/triangle-connector/triangle-connector.module.scss"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { useIsMobile } from "@spatialsys/web/core/js/hooks/use-is-mobile"
import { TransitionComponentHidden } from "@spatialsys/web/core/js/routes/rooms/room/transition-components"
import { Button, Container } from "@spatialsys/web/ui"

import classes from "./navbar.module.scss"
import cssVars from "./variables.module.scss"

const TRIANGLE_CONNECTOR_OFFSET =
  parseInt(cssVars.modalWidth) -
  parseInt(cssVars.modalPadding) -
  parseInt(triangleVars.triangleWidth) -
  parseInt(cssVars.modalOffset)

export const CREATE_SPACE_QUERY_PARAM_KEY = "create"
export const LOGIN_QUERY_PARAM_KEY = "login"

const importProfileMenu = () =>
  import(
    /* webpackChunkName: "profile-menu" */ "@spatialsys/web/core/js/components/profile-menu/live-explore/profile-menu"
  ).then((module) => ({
    default: module.ProfileMenu,
  }))

const ProfileMenu = lazy(() => importProfileMenu())

interface NavLink {
  label: string
  href: string
}

const links: NavLink[] = [
  {
    label: "Creator Toolkit",
    href: "/toolkit",
  },
  {
    label: "Blog",
    href: "/community",
  },
  {
    label: "Support",
    href: "https://support.spatial.io",
  },
]

export const enum NavbarColorTheme {
  Transparent = "Transparent",
  Light = "Light",
}

type SearchButtonProps = {
  color: NavbarColorTheme
}
/**
 * Pushes to `/search` if user is authenticated, otherwise opens the login modal.
 */
const SearchButton = memo(function SearchButton(props: SearchButtonProps) {
  const { color } = props
  const { isAuthenticated, isAuthenticatingOrLoggingIn } = useAuthState()
  const actions = useAppContext((context) => context.actions)
  const openLoginModal = useCallback(
    () => actions.openModal({ type: Modals.Login, payload: { titleCta: "Sign in to search" } }),
    [actions]
  )

  const searchButtonClasses = clsx(
    "transition-color flex items-center justify-center text-black hover:opacity-70",
    color === NavbarColorTheme.Transparent && "sm:text-white"
  )

  if (isAuthenticated) {
    return (
      <Link href="/search" className={searchButtonClasses}>
        <SearchIcon />
      </Link>
    )
  }

  return (
    <button className={searchButtonClasses} disabled={isAuthenticatingOrLoggingIn} onClick={openLoginModal}>
      <SearchIcon />
    </button>
  )
})

type NavbarProps = {
  /** Applies negative top margin in order to hide space reserved for the navbar */
  applyNegativeMarginTop?: boolean
  color?: NavbarColorTheme
  /** Disables the createSpace modal. Clicking "Create a Space" button pushes to the current page (no-op) */
  disableCreateSpaceModal?: boolean
  children?: React.ReactNode
  /** If true, hides search. Defaults to false */
  hideSearch?: boolean
  hideWordInLogo?: boolean
  showBorder?: boolean
}

/**
 * The navbar used in "Live Explore"
 */
export function Navbar(props: NavbarProps) {
  const {
    disableCreateSpaceModal,
    applyNegativeMarginTop,
    color = NavbarColorTheme.Light,
    hideSearch,
    showBorder,
  } = props
  const isMobile = useIsMobile()
  // for mobile only. wide screens have menu always showing
  const [isMenuOpen, setIsMenuOpen] = useBoolean(false)
  const [isProfileOpen, setIsProfileOpen] = useBoolean(false)

  const actions = useAppContext((context) => context.actions)
  const { user } = useUser()
  const menuRef = useRef<HTMLDivElement>(null)

  const { isAuthenticated, isAuthenticatingOrLoggingIn } = useAuthState()

  const openLoginModal = useCallback(() => actions.openModal({ type: Modals.Login, payload: {} }), [actions])
  const openCreateSpaceModal = useCallback(() => actions.openModal({ type: Modals.CreateSpace }), [actions])
  const onClickCtaButton = useCallback(() => {
    if (isMobile && isAuthenticated) {
      // Pushes to `/create`, so do not open any modals
      return
    }
    if (!isAuthenticated) {
      openLoginModal()
    } else {
      if (!disableCreateSpaceModal) {
        openCreateSpaceModal()
      }
    }
  }, [disableCreateSpaceModal, isAuthenticated, isMobile, openCreateSpaceModal, openLoginModal])

  // Pre-load the lazy-loaded Profile Menu so it's immediately available when user taps
  useTimeoutFn(importProfileMenu, 200)

  const namePlaceholder = user && (
    <NamePlaceholder displayName={user.displayName} className={classes.avatarIconPlaceholder} />
  )
  const avatarIconBtn = user && (
    <button onClick={setIsProfileOpen.toggle} className={classes.desktopOnlyButton}>
      <AvatarIcon
        className={classes.avatar}
        loadingPlaceholder={namePlaceholder}
        placeholder={namePlaceholder}
        applyPlayerColorToPlaceholder
        playerColor={getPlayerColor(user.appearanceCustomization.profileColor)}
        altText={`${user.displayName}'s avatar`}
        profilePicUrl={user.profilePicURL}
      />
    </button>
  )

  const CtaButton = (
    <Button
      as={isMobile && isAuthenticated ? "a" : "button"}
      href={isMobile && isAuthenticated ? "/create" : undefined}
      className="w-fit min-w-[180px] self-center justify-self-center text-base"
      size="lg"
      isLoading={isAuthenticatingOrLoggingIn}
      leftIcon={isAuthenticated ? <AddIcon className="icon h-[1.125rem] w-[1.125rem]" /> : undefined}
      noShadow
      onClick={onClickCtaButton}
    >
      {isAuthenticated ? "Create a Space" : "Log In"}
    </Button>
  )

  const desktopNavbarLinksRef = useRef()
  let children = props.children
  if (!children) {
    children = (
      <div ref={desktopNavbarLinksRef} className="hidden w-full justify-end gap-10 pr-10 font-heading sm:flex">
        {links.map((link, i) => {
          return (
            <Link
              href={link.href}
              key={i}
              className={clsx(
                "text-h4 tracking-normal no-underline",
                color === NavbarColorTheme.Light ? "text-black" : "text-white"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <TryToAuthenticate>
      <div
        className={clsx(
          classes.outerContainer,
          color === NavbarColorTheme.Transparent && classes.transparentNav,
          applyNegativeMarginTop && classes.negativeMarginTop,
          showBorder && classes.border
        )}
        id="headerNav"
      >
        <Container
          as="nav"
          className={clsx(
            "flex h-full content-center items-center justify-between text-black",
            isMenuOpen && classes.menuOpen
          )}
        >
          <div className={classes.innerContainer}>
            <Link
              href="/"
              className={clsx(
                "flex h-8 w-auto shrink-0 items-center text-black no-underline transition hover:opacity-70",
                color === NavbarColorTheme.Transparent && "sm:text-white"
              )}
              aria-label="Home"
            >
              {props.hideWordInLogo ? (
                <SpatialLogo className="h-full w-auto" />
              ) : (
                <SpatialWordMark className="h-full w-auto" />
              )}
            </Link>
            <TransitionComponentHidden in={Boolean(props.children || !isAuthenticated)} ref={desktopNavbarLinksRef}>
              {children}
            </TransitionComponentHidden>
          </div>

          <div className={classes.rightSection}>
            {!hideSearch && <SearchButton color={color} />}
            {user && avatarIconBtn}

            <div className="none sm:flex sm:items-center">{CtaButton}</div>

            {/* Mobile-only: hamburger menu */}
            <button className="flex items-center text-black sm:hidden" onClick={setIsMenuOpen.toggle}>
              <MenuRounded />
            </button>

            {user && (
              <Modal
                allowScroll
                disableTranslate
                isOpen={isProfileOpen}
                modalBaseClass={clsx(classes.modal, classes.floatingProfile)}
                onRequestClose={setIsProfileOpen.setFalse}
              >
                <Suspense fallback={null}>
                  <TriangleConnector leftOffset={TRIANGLE_CONNECTOR_OFFSET} />
                  <ProfileMenu className={classes.profileMenu} onRequestClose={setIsProfileOpen.setFalse} />
                </Suspense>
              </Modal>
            )}
          </div>

          <div className={clsx(classes.backdrop, isMenuOpen && classes.visible)} onClick={setIsMenuOpen.setFalse} />

          {/* Mobile menu */}
          <CSSTransition
            in={isMenuOpen}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: classes.menuEnter,
              enterActive: classes.menuEnterActive,
              enterDone: classes.menuEnterDone,
              exit: classes.menuExit,
              exitActive: classes.menuExitActive,
              exitDone: classes.menuExitDone,
            }}
            timeout={400}
            nodeRef={menuRef}
          >
            <Container
              ref={menuRef}
              className={clsx(
                "absolute left-0 right-0 top-full grid items-center bg-white pb-3 sm:hidden",
                classes.menu,
                isMenuOpen && classes.menuOpen
              )}
            >
              {user ? (
                <Suspense fallback={null}>
                  <ProfileMenu
                    className={clsx(classes.profileMenu, classes.mobileProfile)}
                    onRequestClose={setIsProfileOpen.setFalse}
                  />
                </Suspense>
              ) : (
                links.map((link, i) => {
                  return (
                    <Link href={link.href} key={i} className="py-2 font-heading no-underline">
                      {link.label}
                    </Link>
                  )
                })
              )}
              {CtaButton}
            </Container>
          </CSSTransition>
        </Container>
      </div>
    </TryToAuthenticate>
  )
}
