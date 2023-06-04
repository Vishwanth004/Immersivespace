import { Loader, LoaderProps } from "../loader"

type CenteredLoaderProps = LoaderProps & {
  useRelativePosition?: boolean
}

/** A loader that fills its parent container and centers the loader */
export const CenteredLoader = (props: CenteredLoaderProps) => {
  const { useRelativePosition, ...rest } = props

  return (
    <div
      className={useRelativePosition ? "flex h-full w-full items-center justify-center" : "absolute absolute-center"}
    >
      <Loader {...rest} />
    </div>
  )
}
