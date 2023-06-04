import { Flip, toast } from "react-toastify"
import { call, select, takeLatest } from "typed-redux-saga/macro"

import { logger } from "@spatialsys/mobile/logger"
import { GET_BADGE_QUERY_KEY } from "@spatialsys/react/query-hooks/badges"
import { ActionType, AppState, BadgeRewarded } from "@spatialsys/web/app-state"
import { BadgeRewardedBanner } from "@spatialsys/web/core/js/components/rewards/badge-rewarded-banner/badge-rewarded-banner"
import { sapiBadgesClient } from "@spatialsys/web/sapi"

import classes from "../badge-rewarded-banner/badge-rewarded-toast.module.scss"

export function* rewardsSaga() {
  yield* takeLatest(ActionType.BadgeRewarded, onBadgeRewarded)
}

function* onBadgeRewarded({ payload: badgeId }: BadgeRewarded) {
  try {
    const queryClient = yield* select((state: AppState) => state.reactQueryClient)
    const badge = yield* call(() =>
      queryClient.fetchQuery({
        queryFn: () => sapiBadgesClient.badges.getBadge({ badgeId }),
        queryKey: [GET_BADGE_QUERY_KEY, badgeId],
      })
    )
    toast(<BadgeRewardedBanner badge={badge} />, {
      className: classes.badgeRewardedToast,
      bodyClassName: classes.badgeRewardedToastBody,
      autoClose: 7500,
      closeButton: false,
      closeOnClick: false,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_CENTER,
      transition: Flip,
    })
  } catch (err: any) {
    logger.log(err as any)
  }
}
