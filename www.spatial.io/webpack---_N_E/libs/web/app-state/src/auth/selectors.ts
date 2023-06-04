import { AuthState, AuthStatus } from "./auth-state"

type UseAuthState = Pick<
  AuthState,
  "accessToken" | "authenticationError" | "loginError" | "loginMethod" | "provider" | "status"
> & {
  isAuthenticated: boolean
  /**
   * If we are currently authenticating, i.e. at the beginning of the app's life cycle when we try to validate
   * the auth token that's stored in localStorage.
   *
   * This is different from `isLoggingIn`, which is when the user attempts to authenticate by signing in through SSO
   * or email/pw
   */
  isAuthenticating: boolean
  isAuthenticatingOrLoggingIn: boolean
  isAuthenticationError: boolean
  /** If the user is using the special "authless" token to join a public space */
  isAuthless: boolean
  isError: boolean
  /**
   * If the user is attempting to log in.
   */
  isLoggingIn: boolean
  isLoginError: boolean
}

/**
 * Computes derived properties of `AuthState` and passes through the rest.
 * @param authState
 * @returns
 */
export const getAuthState = (authState: AuthState): UseAuthState => {
  const { authenticationError, accessToken, loginError, loginMethod, provider, status } = authState
  const isAuthenticating = status === AuthStatus.Uninitialized || status === AuthStatus.Authenticating
  const isLoggingIn = status === AuthStatus.LoggingIn
  const isAuthenticatingOrLoggingIn = isAuthenticating || isLoggingIn

  const isAuthenticationError = status === AuthStatus.AuthenticationError
  const isLoginError = status === AuthStatus.LoginError
  const isError = isAuthenticationError || isLoginError

  return {
    // Derived attributes
    isAuthenticated: status === AuthStatus.Authenticated,
    isAuthless: Boolean(authState.useAuthlessToken),
    isAuthenticating,
    isLoggingIn,
    isAuthenticatingOrLoggingIn,
    isAuthenticationError,
    isLoginError,
    isError,

    // Passing through various useful attributes
    authenticationError,
    accessToken,
    status,
    loginError,
    loginMethod,
    provider,
  }
}
