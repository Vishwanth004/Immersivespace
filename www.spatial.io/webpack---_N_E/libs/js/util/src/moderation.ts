// An arbitrary value. A user banned for longer than a year might as well be banned permanently.
// Permanent ban will last until the date equivalent to the max value of Unix milliseconds.
const YEAR_MINUTES = 365 * 24 * 60

export const isPermanentlyBanned = (bannedUntilUnixMs: number) => {
  return getRemainingBanDurationMinutes(bannedUntilUnixMs) > YEAR_MINUTES
}

export const getRemainingBanDurationMinutes = (bannedUntilUnixMs: number) => {
  return (bannedUntilUnixMs - Date.now()) / 1000 / 60
}

export const getRemainingBanDurationString = (bannedUntilUnixMs: number) => {
  const minutesUntilUnbanned = getRemainingBanDurationMinutes(bannedUntilUnixMs)

  if (minutesUntilUnbanned < 1) {
    return "less than a minute"
  } else {
    const displayHours = Math.floor(minutesUntilUnbanned / 60)
    const displayMinutes = Math.floor(minutesUntilUnbanned % 60)
    return `${displayHours}h ${displayMinutes}m`
  }
}

export type BanKickAction = {
  description: string
} & (
  | {
      type: "ban"
      durationMinutes: number
    }
  | {
      type: "kick"
    }
)

const kickActions: BanKickAction[] = [
  {
    type: "kick",
    description: "Kick",
  },
]

const banActions: BanKickAction[] = [
  {
    type: "ban",
    durationMinutes: 60,
    description: "Ban for an hour",
  },
  {
    type: "ban",
    durationMinutes: 60 * 24,
    description: "Ban for a day",
  },
  {
    type: "ban",
    durationMinutes: 0,
    description: "Ban permanently",
  },
]

type GetBanKickActionsArgs = {
  isInSpace: boolean
  isAuthless: boolean
}

export const getBanKickActions = (args: GetBanKickActionsArgs) => {
  const actions: BanKickAction[] = []
  if (args.isInSpace) {
    actions.push(...kickActions)
  }
  if (!args.isAuthless) {
    actions.push(...banActions)
  }
  return actions
}
