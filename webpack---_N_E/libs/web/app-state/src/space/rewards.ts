import { ActionT, GetActionType, makeActionCreator } from "@spatialsys/js/redux"

export enum RewardsActionType {
  BadgeRewarded = "BadgeRewarded",
}

export type BadgeRewarded = ActionT<RewardsActionType.BadgeRewarded, string>

export const RewardsActions = {
  badgeRewarded: makeActionCreator<BadgeRewarded>(RewardsActionType.BadgeRewarded),
}

export type RewardsAction = GetActionType<typeof RewardsActions>
