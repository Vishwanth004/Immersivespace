import { memo } from "react"

import { Button } from "@spatialsys/web/ui"

type LoginPillButtonProps = Pick<React.ComponentProps<"button">, "disabled" | "onClick"> & {
  Ligature: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
}

export const LoginPillButton = memo(function LoginPillButton(props: LoginPillButtonProps) {
  const { Ligature, title, ...rest } = props

  return (
    <Button className="w-[270px] md:w-[310px]" color="outline" size="xl" {...rest}>
      <Ligature className="icon icon-sm absolute left-4 absolute-center-y" />
      {title}
    </Button>
  )
})
