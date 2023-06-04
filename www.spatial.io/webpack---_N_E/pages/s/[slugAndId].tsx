import { QueryClient, dehydrate } from "@tanstack/react-query"
import { memo, useEffect } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { GET_FEATURE_FLAGS_QUERY_KEY } from "@spatialsys/react/query-hooks/feature-flags"
import { SpacesQueryKeys } from "@spatialsys/react/query-hooks/spaces"
import { getRoomIdFromUrl } from "@spatialsys/url-utils"
import { queryClientServerOptions, useAppContext, useAuthState } from "@spatialsys/web/app-context"
import { RequiresAuth } from "@spatialsys/web/core/js/components/auth/requires-auth"
import { TryToAuthenticate } from "@spatialsys/web/core/js/components/auth/try-to-authenticate"
import { MinWindowHeightContainer } from "@spatialsys/web/core/js/components/layout/min-window-height-container"
import { HideMobileBanner } from "@spatialsys/web/core/js/components/mobile-banner/mobile-banner"
import { JoinSpaceMobileInterstitial } from "@spatialsys/web/core/js/components/mobile-web-interstitials/join-space-mobile-interstitial"
import { Safari15_4Rejection } from "@spatialsys/web/core/js/components/room/safari-15-4-rejection/safari-15-4-rejection"
import { RequiresWebGl } from "@spatialsys/web/core/js/components/web-gl/requires-web-gl"
import { useIsMobile } from "@spatialsys/web/core/js/hooks/use-is-mobile"
import { RoomAuthAuthlessFallback } from "@spatialsys/web/core/js/routes/rooms/room/room-auth-fallback"
import { RoomContainer } from "@spatialsys/web/core/js/routes/rooms/room/room-container"
import { SpacePageHead } from "@spatialsys/web/core/js/routes/rooms/room/space-page-head"
import { getSapiFeatureFlagsClient, getSapiSpaceClient } from "@spatialsys/web/swag/ssr/api-clients"
import { SwagGetServerSideProps, withContext } from "@spatialsys/web/swag/ssr/context"
import { CenteredLoader } from "@spatialsys/web/ui"
import { isMobileUA, isUnsupportedSafariVersion } from "@spatialsys/web/user-agent"

export interface SpacePageProps {
  spaceId: string
  userAgent: string
}

/**
 * Pre-fetch the space preview data on the server.
 * Attempts to authenticate the user on the server
 */
const ssr: SwagGetServerSideProps<SpacePageProps, { slugAndId: string }> = async (context) => {
  const { auth, spatialUid } = context
  const spaceId = getRoomIdFromUrl(context.params.slugAndId)
  const ua = context.req.headers["user-agent"] ?? ""
  const sapiSpaceClientSsr = getSapiSpaceClient({ spatialUid, authToken: auth.authSession?.idToken })
  const sapiFeatureFlagsClient = getSapiFeatureFlagsClient({
    spatialUid,
    authToken: auth.authSession?.idToken,
  })

  /*
  See https://tanstack.com/query/v4/docs/guides/ssr#using-hydration for SSR with react-query. 
  The QueryClient must be created inside of `getServerSideProps` to ensure data is not shared between requests.
  */
  const queryClient = new QueryClient(queryClientServerOptions)

  const promises = [
    queryClient.prefetchQuery(
      [SpacesQueryKeys.GetSpacePreview, spaceId],
      () => sapiSpaceClientSsr.space.getSpacePreview(spaceId),
      // If the space is private, this request will fail with a 401 Unauthorized.
      // It could still fail for other reasons, but the majority of failures would be due to a private space.
      // Thus, avoid retrying this request.
      // An optimization of this in the future would be to parse the error, and retry if it is not a 401, as
      // React Query supports passing in a function to `retry`.
      { retry: false }
    ),
    queryClient.prefetchQuery(GET_FEATURE_FLAGS_QUERY_KEY, () => sapiFeatureFlagsClient.getFeatureFlags(), {
      retry: false,
    }),
  ]

  await Promise.allSettled(promises)

  return {
    props: {
      spaceId,
      dehydratedState: dehydrate(queryClient),
      userAgent: ua,
      ...auth,
    },
  }
}

export const getServerSideProps = withContext(ssr)

const ContentsMobile = memo(function ContentsMobile({ spaceId }: Pick<SpacePageProps, "spaceId">) {
  const { isAuthenticatingOrLoggingIn } = useAuthState()

  return (
    <TryToAuthenticate>
      {/* 
      Wait till we determine if user is authenticated or not, as that affects the `getSpacePreview` endpoint's response 
      Most of the time, this will never render as we will already have tried to authenticate on the server.
      However, this is necessary for the sign-in-with-redirect flow, as we are unable to authenticate on the server in that case.
      */}
      {isAuthenticatingOrLoggingIn ? (
        <>
          <HideMobileBanner />
          <CenteredLoader variant="fancy" color="black" />
        </>
      ) : (
        <JoinSpaceMobileInterstitial spaceId={spaceId} />
      )}
    </TryToAuthenticate>
  )
})

const ContentsDesktop = memo(function ContentsDesktop({ spaceId }: Pick<SpacePageProps, "spaceId">) {
  const actions = useAppContext((context) => context.actions)

  // Sets a isInMainlineSpatial on mount, used to tell Unity to start downloading
  useEffect(() => {
    actions.setIsInMainlineSpatial(true)
    actions.setSpaceId(spaceId)
    return () => {
      actions.setIsInMainlineSpatial(false)
      actions.setSpaceId(null)
    }
  }, [actions, spaceId])

  return (
    <RequiresAuth
      // RoomAuthAuthlessFallback attempts to start an authless session, if the space is public
      FallbackComponent={(props) => <RoomAuthAuthlessFallback {...props} />}
    >
      <RequiresWebGl>
        <RoomContainer />
      </RequiresWebGl>
    </RequiresAuth>
  )
})

const Body = (props: Pick<SpacePageProps, "spaceId" | "userAgent">) => {
  const { spaceId, userAgent } = props
  const authActions = useAppContext((context) => context.actions)

  /**
   * Clear authless session on unmount
   */
  useEffect(() => authActions.clearAuthlessSession, [authActions.clearAuthlessSession])

  const isMobile = useIsMobile(isMobileUA(userAgent))

  if (isMobile) {
    return <ContentsMobile spaceId={spaceId} />
  }

  if (isUnsupportedSafariVersion(userAgent)) {
    return <Safari15_4Rejection />
  }

  return <ContentsDesktop spaceId={spaceId} />
}

function SpacePage(props: SpacePageProps) {
  const { spaceId, userAgent } = props

  return (
    <>
      <SpacePageHead spaceId={spaceId} />
      <TrackedComponent id={TrackedComponents.SpacePage} properties={{ "Room ID": spaceId }}>
        <MinWindowHeightContainer>
          <Body spaceId={spaceId} userAgent={userAgent} />
        </MinWindowHeightContainer>
      </TrackedComponent>
    </>
  )
}

export default SpacePage
