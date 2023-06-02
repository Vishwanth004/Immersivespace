import { pick } from "lodash"
import Mixpanel, { Config as MixpanelConfig } from "mixpanel-browser"
import { NextRouter } from "next/router"

import { getWebGLAvailability } from "@spatialsys/js/util/is-web-gl-available"
import { UTMParameters, utmKeyToLabelMap, utmParameters } from "@spatialsys/js/util/utm-parameters"
import Config from "@spatialsys/web/config"
import { Storage } from "@spatialsys/web/storage"

export { Mixpanel }

declare global {
  interface Navigator {
    readonly connection: NetworkInformation | undefined
  }
}

const debug = Storage.fetch(Storage.MIXPANEL_DEBUG, false, { raw: false })

Mixpanel.init(Config.MIXPANEL_TOKEN, {
  api_host: Config.FAN_URL,
  api_payload_format: "json",
  batch_requests: true,
  secure_cookie: true,
  debug,
} as Partial<MixpanelConfig>)

// Clear stale properties that shouldn't be recorded till they're set again.
// We unregister the Room ID here in JS to make sure it's initially unset.
// It's registered and unregistered as it changes from Unity-side code.
Mixpanel.unregister("Room ID")
Mixpanel.unregister("UI Mode")
unregisterRTCQuality()

Mixpanel.register({
  AppPlatform: "WebGL", // Keep this in sync with the `Platform` enum in AppState.cs
  "WebGL Support": getWebGLAvailability(),
})

if (typeof navigator !== "undefined" && navigator.connection !== undefined) {
  Mixpanel.register(getConnectionProperties(navigator.connection))
  navigator.connection.addEventListener("change", () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Mixpanel.register(getConnectionProperties(navigator.connection!))
  })
}

function getConnectionProperties(connection: NetworkInformation): Record<string, any> {
  const properties = {
    "Connection RTT": connection.rtt,
    "Connection Downlink": connection.downlink,
    "Connection Effective Type": connection.effectiveType,
    "Connection Type": connection.type,
  }
  return properties
}

/**
 * Bound version of `Mixpanel.track`.
 */
export const track = Mixpanel.track.bind(Mixpanel)

export function registerOnboardingStatus() {
  Mixpanel.register({ "Onboarding Status": "Onboarding" })
}

export function unregisterOnboardingStatus() {
  Mixpanel.unregister("Onboarding Status")
}

export function trackOnboardingComplete() {
  Mixpanel.track("Onboarding Complete")
}

export function trackTermsAccept(marketingChecked: boolean) {
  Mixpanel.track("Terms Accept", {
    "Checked Feature Updates": marketingChecked,
  })
}

export function trackNameCreate() {
  Mixpanel.track("Name Create")
}

export function trackOrgSelect(createdOrg: boolean) {
  Mixpanel.track("Org Select", {
    "Create Org": createdOrg,
  })
}

/**
 * Track a route change/page view. The event name has the path pattern, e.g.
 * `/s/[slugAndId]`. The actual path is sent as the `path` property,
 * @param router
 */
export function trackRouteChange(router: NextRouter) {
  recordUtmParameters(router.query as Record<string, string>)
  // For paths with dynamic segments, e.g. `/s/[slugAndId]`, use the path pattern
  // For paths with rewrites, e.g. `/mine` -> `/?tab=mine`, use the actual path
  const path = router.pathname.includes("[") ? router.pathname : router.asPath
  Mixpanel.track(`Nav: ${path}`, {
    "Path Pattern": router.pathname,
    Path: router.asPath,
    ...router.query,
  })
}

export const recordUtmParameters = (query: Record<string, string>) => {
  // Mixpanel registers utm parameters as super properties by default for the initial URL,
  // doing the "first touch" attribution. For subsequent route changes, or "last touch" attribution
  // we have to register it ourselves. See https://help.mixpanel.com/hc/en-us/articles/115004561786-Track-UTM-Tags
  const utmParams = pick(query, ...utmParameters)
  const labeledUtmParams: Record<string, string> = {}
  const lastTouchUtmParams: Record<string, string> = {}
  for (const [key, value] of Object.entries(utmParams) as Array<[UTMParameters, string]>) {
    labeledUtmParams[key] = value
    lastTouchUtmParams[`${utmKeyToLabelMap[key]} (last touch)`] = value
  }
  Mixpanel.register(lastTouchUtmParams, 1) // Expire the last touch properties after 1 day
  // As well as tracking UTM parameters on profiles, we must do manually.
  // We use set_once because we want the initial UTM parameters to persist.
  Mixpanel.people.set_once(labeledUtmParams)
  Mixpanel.people.set(lastTouchUtmParams)
}

export function trackSpaceJoinFailure(roomId: string, reason: string) {
  Mixpanel.track("Space Join Failure", {
    "Room ID": roomId,
    "Failure Reason": reason,
  })
}

export function trackRoomRename() {
  Mixpanel.track("Room Rename")
}

export function trackRoomDelete() {
  Mixpanel.track("Room Delete")
}

export function trackRTCRemoteVideoJoin(mediaType: string) {
  Mixpanel.track("RTC Remote Video Join", {
    "Media Type": mediaType,
  })
}

export function trackRTCRemoteVideoLeave(mediaType: string) {
  Mixpanel.track("RTC Remote Video Leave", {
    "Media Type": mediaType,
  })
}

//TODO: change 'any' to 'ScreenShareSetting'; untangle the circular import from web/core
export function registerRTCQuality(setting: any) {
  Mixpanel.register_once({
    "RTC Media Quality": setting,
  })
}

export function unregisterRTCQuality() {
  Mixpanel.unregister("RTC Media Quality")
}

export function trackFileUploadBegin(contentType: string, fileSize: number) {
  Mixpanel.track("File Upload Begin", {
    "Content Type": contentType,
    "File Size (MB)": fileSize / 1000000,
  })
}

export function trackFileUploadComplete(contentType: string, fileSize: number) {
  Mixpanel.track("File Upload Complete", {
    "Content Type": contentType,
    "File Size (MB)": fileSize / 1000000,
  })
}

export function trackFileUploadFail(
  contentType: string,
  fileSize: number,
  reason: "Unimplemented Type" | "Too Large" | "Contained Non-Embedded Resources" | "Error"
) {
  Mixpanel.track("File Upload Fail", {
    "Content Type": contentType,
    "File Size (MB)": fileSize / 1000000,
    "Failure Reason": reason,
  })
}

export function trackWebcamToggle(newState: "on" | "off") {
  Mixpanel.track("Webcam Toggle", {
    "New State": newState,
  })
}

export function trackDockButtonClick(
  button:
    | "Note"
    | "Search"
    | "File Upload"
    | "Portal"
    | "Screen Share"
    | "Add Content"
    | "Add NFT"
    | "Mic"
    | "Webcam"
    | "Reactions"
    | "Host Tools"
    | "Backpack"
) {
  Mixpanel.track("Dock Button Click", {
    "Dock Feature": button,
  })
}

export function trackDevicePair(pairingMethod: string) {
  Mixpanel.track("Device Pair", {
    "Pairing Method": pairingMethod,
  })
}

export function trackMemberChangePrivilege(newPrivilege: "admin" | "member") {
  Mixpanel.track("Team Member Change Privilege", {
    "New Privilege": newPrivilege,
  })
}

export function trackMemberInvite() {
  Mixpanel.track("Team Member Invite")
}

export function trackMemberResendInvite() {
  Mixpanel.track("Team Member Resend Invite")
}

export function trackMemberRemove() {
  Mixpanel.track("Team Member Remove")
}

/**
 * Registers version info as a super property.
 * We intentionally duplicate logic from the C# side (`RoomSession/Photon/RoomConnectionCommands.cs`)
 *
 * i.e.
 * App Version Channel: "store"
 * App Version Full: "6.27.1.50348 (b9fff66e)"
 * App Version Simple: "6.27.1"
 */
export function registerVersionInfo(args: { version: string; shortSha: string; channel: string }) {
  Mixpanel.register({
    "App Version Channel": args.channel,
    "App Version Full": `${args.version} (${args.shortSha})`,
    "App Version Simple": args.version,
  })
}

export type UnsupportedBrowserReason = "No WebGL 2.0" | "Browser older than officially supported browsers"
