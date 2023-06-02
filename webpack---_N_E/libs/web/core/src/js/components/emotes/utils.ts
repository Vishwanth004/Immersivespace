import {
  AvatarAnimation,
  AvatarAnimationType,
  EmotePayload,
  EmoteType,
  ProfileUnlockableItem,
} from "@spatialsys/js/sapi/types"
import { EmotesAnalyticsData, UnityMessages } from "@spatialsys/unity/bridge"

export type UnlockableDanceData = Omit<ProfileUnlockableItem, "ids">
export type UnlockableDanceAnimation = AvatarAnimation & {
  unlockableData?: UnlockableDanceData
}

export type Emote = Emoji | UnlockableDanceAnimation

export interface Emoji {
  id: string
  displayEmoji: string
}

/**
 * Type guard which differentiates whether an `Emote` is an `Emoji` or `Animation`.
 * For documentation, see:
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 **/
export const isEmoji = (emote: Emote): emote is Emoji => {
  return (emote as Emoji).displayEmoji !== undefined
}

export const getEmoteAnimationsList = (animations: AvatarAnimation[]): AvatarAnimation[] => {
  return animations?.filter((animation) => animation.animationType === AvatarAnimationType.Emote)
}

export const parseEmotePayload = (emote: EmotePayload, emoteAnimationsList: AvatarAnimation[]): Emote => {
  return emote.emoteType === EmoteType.Emoji
    ? {
        id: emote.identifier,
        displayEmoji: displayEmojiFromCodepoint(emote.identifier),
      }
    : emoteAnimationsList.find((anim) => anim.id === emote.identifier) ?? emoteAnimationsList[0]
}

export const makeEmotePayload = (emote: Emote): EmotePayload => {
  return {
    emoteType: isEmoji(emote) ? EmoteType.Emoji : EmoteType.Animation,
    identifier: emote.id,
  }
}

/**
 * Reassemble emoji from codepoints - some emojis may be comprised of multiple codepoints
 * For example, the astronaut emoji is comprised of the codepoint for man + the codepoint for rocket
 * Modified from https://stackoverflow.com/questions/63456170/how-to-render-multi-code-point-emojis-with-javascript
 */
export const displayEmojiFromCodepoint = (codepoint: string) =>
  String.fromCodePoint(...codepoint.split("-").map((c) => parseInt(c, 16)))

/**
 * Plays the emote associated with the given `Emote` object.
 * @param emote The `Emote` object to play.
 * @param method How the emoji was triggered (e.g. `Keypress` or `Click`). Used for analytics.
 * @param source Where the emoji was triggered (e.g. `EmotePicker`, `EmotesTray`, etc). Used for analytics.
 */
export const playEmote = (emote: Emote, analytics: EmotesAnalyticsData, isHolding?: boolean) => {
  if (isEmoji(emote)) {
    UnityMessages.playEmoteEmoji(emote.id.toLowerCase(), analytics, isHolding)
  } else {
    UnityMessages.playEmoteAnimation(emote.id, analytics, isHolding)
  }
}

/**
 * Plays the emote associated with the given `EmotePayload` object.
 * @param emote The `EmotePayload` object to play.
 * @param method How the emoji was triggered (e.g. `Keypress` or `Click`). Used for analytics.
 * @param source Where the emoji was triggered (e.g. `EmotePicker`, `EmotesTray`, etc). Used for analytics.
 */
export const playEmotePayload = (emote: EmotePayload, analytics: EmotesAnalyticsData, isHolding?: boolean) => {
  if (emote.emoteType === EmoteType.Emoji) {
    UnityMessages.playEmoteEmoji(emote.identifier.toLowerCase(), analytics, isHolding)
  } else {
    UnityMessages.playEmoteAnimation(emote.identifier, analytics, isHolding)
  }
}
