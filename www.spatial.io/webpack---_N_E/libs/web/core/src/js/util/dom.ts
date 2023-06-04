export const NEXT_ROOT_NODE_ID = "__next"

/** Returns the DOM node corresponding to the root of the Next.js app */
export const getNextAppRootNode = () => {
  if (typeof document !== "undefined") {
    return document.getElementById(NEXT_ROOT_NODE_ID)
  }
}
