import { memo } from "react"

import { ReactComponent as AppleLogo } from "@spatialsys/assets/icons/material-filled/apple.svg"
import { AuthConnection } from "@spatialsys/web/app-state"
import { ReactComponent as GoogleLogo } from "@spatialsys/web/core/img/icons/google-logo.svg"
import { ReactComponent as MetaMaskLogo } from "@spatialsys/web/core/img/icons/metamask.svg"
import { ReactComponent as MicrosoftLogo } from "@spatialsys/web/core/img/integrations/msft.svg"
import { LoginPillButton } from "@spatialsys/web/core/js/components/auth/login/ui/login-pill-button"
import { Button } from "@spatialsys/web/ui"

/**
 * Sort order matters
 * the order these are listed in is the order that they will be rendered!
 */
const authConnectionsDict: Record<
  AuthConnection,
  { ligature: React.FunctionComponent<React.SVGProps<SVGSVGElement>> }
> = {
  Google: { ligature: GoogleLogo },
  MetaMask: { ligature: MetaMaskLogo },
  Apple: { ligature: AppleLogo },
  Microsoft: { ligature: MicrosoftLogo },
}

interface LoginConnectionsProps {
  handleLoginWithConnection: (connection: AuthConnection) => void
  handleLoginWithEmailPw: () => void
  isAuthenticating: boolean
}

export const LoginConnections = memo(function LoginConnections(props: LoginConnectionsProps) {
  const { handleLoginWithConnection, handleLoginWithEmailPw, isAuthenticating } = props
  return (
    <div className="grid items-center justify-center gap-3 text-center md:gap-4">
      {Object.entries(authConnectionsDict).map(([authConnection, { ligature: Ligature }]) => {
        return (
          <LoginPillButton
            key={authConnection}
            disabled={isAuthenticating}
            Ligature={Ligature}
            onClick={() => handleLoginWithConnection(authConnection as AuthConnection)}
            title={authConnection}
          />
        )
      })}

      <div className="grid gap-2 md:p-2">
        <p className="text-sm">or</p>
        <Button
          className="text-lg underline hover:opacity-70"
          size="lg"
          variant="text"
          disabled={isAuthenticating}
          onClick={handleLoginWithEmailPw}
        >
          Use Email
        </Button>
      </div>
    </div>
  )
})
