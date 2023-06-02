import { QueryClient } from "@tanstack/react-query"

import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"
import { EmailPwLoginArgs } from "@spatialsys/js/sapi/clients/auth"
import { RequireProperties } from "@spatialsys/js/types"
import { GET_ME_QUERY_KEY } from "@spatialsys/react/query-hooks/sapi/user"
import { SpacesQueryKeys } from "@spatialsys/react/query-hooks/spaces"
import { clearAuthHeaders, setAuthHeaders } from "@spatialsys/web/sapi"
import { AuthSessionAppProps } from "@spatialsys/web/swag/services/auth/types"

import { NoAuthError, UserUnauthenticatedError } from "./errors"

export interface AuthState {
  accessToken?: string | null
  /** Error that occurs when authenticating */
  authenticationError?: any
  /** We use these fields to prevent an infinite loop of trying to no-auth */
  authlessRoomId?: string | null
  authlessShareId?: string | null
  /** add comment */
  emailVerificationStatus?: EmailVerificationPayload
  /** The time that the token will expire, in milliseconds from the epoch */
  expiresAt?: number | null
  /** Error that occurs when logging in */
  loginError?: any
  loginMethod?: AuthConnection
  provider?: AuthProvider
  /** The public wallet address, if the user signed up for Spatial using MetaMask */
  publicAddress?: string
  status: AuthStatus
  tokenRenewalTimeoutId?: number | null
  /**
   * When true, indicates the user has an authless token that can be used to join a space when they're not logged in to their Spatial account
   */
  useAuthlessToken: boolean | null
}

export enum AuthProvider {
  Firebase,
  SAPI, // authless token is provided by SAPI
}

export const enum AuthConnection {
  Apple = "Apple",
  Google = "Google",
  MetaMask = "MetaMask",
  Microsoft = "Microsoft",
}

export const enum AuthStatus {
  /**
   * This does not mean the user is logged in.  It indicates that the user has an auth token.
   *
   * This will be true when:
   * 1. The user has an authless token required to join a space when not logged in to their Spatial account
   * 2. The user is logged in to their Spatial account
   */
  Authenticated = "Authenticated",
  Authenticating = "Authenticating",
  AuthenticationError = "AuthenticationError",
  LoggingIn = "LoggingIn",
  LoginError = "LoginError",
  /** Initial state */
  Uninitialized = "Uninitialized",
}

export interface EmailVerificationPayload {
  email: string
  hasVerifiedSuccessfully: boolean
  publicAddress: string
}

export type AuthContextAppProps = {
  /** The initial auth session, from server-side auth */
  authSession?: AuthSessionAppProps
  /**
   * If true, we tried to authenticate during SSR, so the client should set the initial auth state
   * to "Unauthenticated" if `authSession` is undefined.
   */
  hasTriedAuth: boolean
}
export type InitialAuthStateArgs = AuthContextAppProps

export const initialAuthState: AuthState = {
  accessToken: null,
  expiresAt: null,
  tokenRenewalTimeoutId: null,
  useAuthlessToken: false,
  status: AuthStatus.Uninitialized,
}

export const createInitialAuthState = (args: InitialAuthStateArgs): AuthState => {
  const { authSession, hasTriedAuth } = args

  const state: AuthState = { ...initialAuthState }

  // We tried authenticating on the server, and succeeded. Set initial state to Authenticated.
  if (authSession) {
    state.accessToken = authSession.idToken
    state.expiresAt = authSession.expiresAt
    state.status = AuthStatus.Authenticated

    // We must set these headers immediately here, otherwise API calls will not have this header set.
    setAuthHeaders(authSession.idToken)
  }

  // We tried authenticating on the server, but failed. Set initial state to AuthenticationError (Unauthenticated)
  // So that we don't try authenticating again on the client.
  if (hasTriedAuth && !authSession) {
    state.status = AuthStatus.AuthenticationError
    state.authenticationError = new UserUnauthenticatedError()
  }
  return state
}

export enum AuthActionType {
  /** Attempt to authenticate the user */
  Authenticate = "Authenticate",
  AuthenticateAuthless = "AuthenticateAuthless",
  ClearAuthlessSession = "ClearAuthlessSession",
  LoginWithConnection = "LoginWithConnection",
  LoginWithEmailPw = "LoginWithEmailPw",
  ResetLoginError = "ResetLoginError",
  SetAuth = "SetAuth",
  SetAuthSuccess = "SetAuthSuccess",
  SetAuthenticationError = "SetAuthenticationError",
  SetEmailVerification = "SetEmailVerification",
  SetIsLoggingIn = "SetIsLoggingIn",
  SetLoginError = "SetLoginError",
  VerifyEmail = "VerifyEmail",
}

export type LoginWithConnectionPayload = { authConnection: AuthConnection; forceRedirect?: boolean }
type LoginWithEmailPwPayload = EmailPwLoginArgs & { forceRedirect?: boolean }

export type AuthSuccessPayload = RequireProperties<Omit<AuthState, "status">, "accessToken">

export type Authenticate = ActionT<AuthActionType.Authenticate>
export type AuthenticateAuthless = ActionT<AuthActionType.AuthenticateAuthless, { roomId: string; shareId: string }>
export type ClearAuthlessSession = ActionT<AuthActionType.ClearAuthlessSession>
export type LoginWithConnection = ActionT<AuthActionType.LoginWithConnection, LoginWithConnectionPayload>
export type LoginWithEmailPw = ActionT<AuthActionType.LoginWithEmailPw, LoginWithEmailPwPayload>
export type ResetLoginError = ActionT<AuthActionType.ResetLoginError>
export type SetAuth = ActionT<AuthActionType.SetAuth, AuthState>
export type SetAuthSuccess = ActionT<AuthActionType.SetAuthSuccess, AuthSuccessPayload>
export type SetAuthenticationError = ActionT<AuthActionType.SetAuthenticationError, any>
export type SetEmailVerification = ActionT<AuthActionType.SetEmailVerification, EmailVerificationPayload>
export type SetIsLoggingIn = ActionT<AuthActionType.SetIsLoggingIn, AuthConnection>
export type SetLoginError = ActionT<AuthActionType.SetLoginError, any>
export type VerifyEmail = ActionT<AuthActionType.VerifyEmail>

export const AuthActions = {
  authenticate: makeActionCreator<Authenticate>(AuthActionType.Authenticate),
  authenticateAuthless: makeActionCreator<AuthenticateAuthless>(AuthActionType.AuthenticateAuthless),
  clearAuthlessSession: makeActionCreator<ClearAuthlessSession>(AuthActionType.ClearAuthlessSession),
  loginWithConnection: makeActionCreator<LoginWithConnection>(AuthActionType.LoginWithConnection),
  loginWithEmailPw: makeActionCreator<LoginWithEmailPw>(AuthActionType.LoginWithEmailPw),
  resetLoginError: makeActionCreator<ResetLoginError>(AuthActionType.ResetLoginError),
  setAuthState: makeActionCreator<SetAuth>(AuthActionType.SetAuth),
  setAuthSuccess: makeActionCreator<SetAuthSuccess>(AuthActionType.SetAuthSuccess),
  setAuthenticationError: makeActionCreator<SetAuthenticationError>(AuthActionType.SetAuthenticationError),
  setEmailVerification: makeActionCreator<SetEmailVerification>(AuthActionType.SetEmailVerification),
  setIsLoggingIn: makeActionCreator<SetIsLoggingIn>(AuthActionType.SetIsLoggingIn),
  setLoginError: makeActionCreator<SetLoginError>(AuthActionType.SetLoginError),
  verifyEmail: makeActionCreator<VerifyEmail>(AuthActionType.VerifyEmail),
}

export type AuthAction = GetActionType<typeof AuthActions>

export const authReducer = (state: AuthState, action: AuthAction, reactQueryClient: QueryClient): AuthState => {
  switch (action.type) {
    case AuthActionType.Authenticate:
      if (state.status !== AuthStatus.LoggingIn && state.status !== AuthStatus.Authenticating) {
        return { ...state, status: AuthStatus.Authenticating, authenticationError: null }
      }
      return state
    case AuthActionType.AuthenticateAuthless:
      // Do nothing if auth is already in progress.
      if (state.status === AuthStatus.LoggingIn || state.status === AuthStatus.Authenticating) {
        return state
      }

      // Prevent infinite loop. If we already tried Authless with the given roomId and shareId comobo, do nothing
      if (state.authenticationError) {
        if (
          state.authenticationError instanceof NoAuthError &&
          state.authenticationError.roomId === action.payload.roomId &&
          state.authenticationError.shareId === action.payload.shareId
        ) {
          return state
        }
      }

      return {
        ...state,
        status: AuthStatus.Authenticating,
        authenticationError: null,
        authlessRoomId: action.payload.roomId,
        authlessShareId: action.payload.shareId,
      }
    case AuthActionType.ClearAuthlessSession:
      if (state.status === AuthStatus.Authenticated && state.useAuthlessToken) {
        // An authless user has a special access token that gives them access to a space,
        // But does not give them access to other parts of the app like their Recent spaces.
        // When an authless user leaves a space, we clear all their auth states.
        // Otherwise, parts of our app will check things like `Boolean(user)` and send API calls
        // or show info that doesn't make sense for an authless user

        // Clear all auth headers from our API clients
        clearAuthHeaders()

        // Clear the cached `/me` response. `/me` actually works with the authless access token,
        // But this results in various parts of the app showing "signed in" UI, like the profile
        // menu dropdown.
        void reactQueryClient.resetQueries(GET_ME_QUERY_KEY)
        // We should also clear any other queries that require authentication.
        void reactQueryClient.resetQueries([SpacesQueryKeys.GetLovedSpaces])

        // Reset our app auth state to "unauthenticated"
        // which is actually "error" state, the error being "User Unauthenticated"
        return {
          ...state,
          status: AuthStatus.AuthenticationError,
          accessToken: null,
          authenticationError: new UserUnauthenticatedError(),
          authlessRoomId: null,
          authlessShareId: null,
          useAuthlessToken: null,
        }
      }
      return state

    case AuthActionType.LoginWithEmailPw:
      if (state.status !== AuthStatus.Authenticating) {
        return { ...state, status: AuthStatus.LoggingIn }
      }
      return { ...state }

    case AuthActionType.ResetLoginError:
      return { ...state, loginError: undefined }
    case AuthActionType.SetAuth:
      return action.payload
    case AuthActionType.SetAuthSuccess:
      // We set the header (a side effect) in the reducer rather than the saga, as the reducer appears to run "right away"
      // while the saga "take" seems to run one cycle later at times. This leads to a race condition where API calls are dispatched
      // without the token in the header at times.
      setAuthHeaders(action.payload.accessToken)
      return {
        ...state,
        ...action.payload,
        authenticationError: null,
        publicAddress: action.payload.publicAddress?.toLowerCase(),
        status: AuthStatus.Authenticated,
      }
    case AuthActionType.SetAuthenticationError:
      return { ...state, authenticationError: action.payload, status: AuthStatus.AuthenticationError }
    case AuthActionType.SetEmailVerification:
      return { ...state, emailVerificationStatus: action.payload }
    case AuthActionType.SetIsLoggingIn:
      return { ...state, status: AuthStatus.LoggingIn, loginMethod: action.payload }
    case AuthActionType.SetLoginError:
      return { ...state, loginError: action.payload, status: AuthStatus.LoginError }
    default:
      return state
  }
}
