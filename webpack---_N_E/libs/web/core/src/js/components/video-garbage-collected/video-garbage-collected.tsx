import { ComponentPropsWithRef, MutableRefObject, forwardRef, useCallback, useEffect, useRef } from "react"

type VideoGarbageCollectedProps = ComponentPropsWithRef<"video">

/**
 * A wrapper around the HTML video element that clears the `srcObject` property when the component is unmounted
 * This component should be used instead of the default `video` component any time you use a `video` with `srcObject`
 * This is to account for a bug in Chrome 92, see https://bugs.chromium.org/p/chromium/issues/detail?id=1232455 and DEV-5489 for more.
 */
const VideoGarbageCollected = forwardRef<HTMLVideoElement, VideoGarbageCollectedProps>((props, ref) => {
  const myRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const node = myRef.current
    // Clean up the srcObject on unmounting
    return () => {
      if (node) {
        node.srcObject = null
      }
    }
  }, [])

  const setRef = useCallback(
    (node: HTMLVideoElement | null) => {
      // Mutating a forwarded ref: need to keep track of a local ref, and account for a ref object and callback function
      // See https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref
      myRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ;(ref as MutableRefObject<HTMLVideoElement>).current = node
      }
    },
    [ref]
  )

  return <video {...props} ref={setRef} />
})

export default VideoGarbageCollected
