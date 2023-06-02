import _ from "lodash"
import { Component, ErrorInfo } from "react"

type ErrorBoundaryState = {
  hasError: boolean
}

type ErrorBoundaryProps = {
  errorComponent: JSX.Element
  componentDidCatch: (error: Error, errorInfo: ErrorInfo) => void
}

/**
 *  Cross platform component to catch errors and render a custom error screen
 *
 * @param errorComponent any react component
 * @param componentDidCatch runs when the component catches an error
 */
export class ErrorBoundary extends Component<React.PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.props.componentDidCatch(error, errorInfo)
  }

  override render() {
    const { errorComponent } = this.props
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return errorComponent
    }

    return this.props.children
  }
}
