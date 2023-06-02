import * as ReactDOM from "react-dom"

interface CreateContentParams {
  close: () => void
}

/**
 * Create's a dialog component, rendered at a new root in DOM. Allows easy
 * imperative creation of dialogs.
 * @param createContent - function to create the dialog's content
 * @returns the close function. Useful for cleanup if calling in `useEffect`.
 */
export const createDialog = (createContent: (params: CreateContentParams) => JSX.Element): (() => void) => {
  let open = true
  const container = document.createElement("div")
  const close = () => {
    if (!open) return
    open = false
    ReactDOM.unmountComponentAtNode(container)
    container.remove()
  }
  const content = createContent({ close })
  document.body.appendChild(container)
  ReactDOM.render(content, container)
  return close
}
