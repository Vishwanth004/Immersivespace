export const source = "utm_source"
export const medium = "utm_medium"
export const campaign = "utm_campaign"
export const term = "utm_term"
export const content = "utm_content"

export const utmParameters = [source, medium, campaign, term, content] as const

export type UTMParameters = (typeof utmParameters)[number]

export const utmKeyToLabelMap: Record<UTMParameters, string> = {
  utm_campaign: "UTM Campaign",
  utm_content: "UTM Content",
  utm_medium: "UTM Medium",
  utm_source: "UTM Source",
  utm_term: "UTM Term",
}
