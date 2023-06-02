import { waitUntilExists } from "@spatialsys/use-saga"
import { AppState } from "@spatialsys/web/app-state"
import { attachErrorLoggers, attachSentryLogging } from "@spatialsys/web/sapi"

/**
 * Sets up logging for 1st party network request errors. We conditionally log error to Sentry based
 * on a treatment while we get the quantity of errors sent under control.
 */
export function* networkErrorsSaga() {
  attachErrorLoggers()
  const { reportWebNetworkErrorsToSentry } = yield* waitUntilExists((state: AppState) => state.user?.treatmentsParsed)
  if (reportWebNetworkErrorsToSentry) {
    attachSentryLogging()
  }
}
