import { sample } from "lodash"

export type PlayerColors = {
  name: string
  mainColor: string
  textColor: string
  boxShadowColor: string
}

export const PlayerColorsMap: { [playerColor: string]: PlayerColors } = {
  blue: {
    name: "blue",
    mainColor: "rgba(41, 121, 255, 1)",
    textColor: "rgba(255, 255, 255, 1)",
    boxShadowColor: "rgba(41, 121, 255, .4)",
  },
  purple: {
    name: "purple",
    mainColor: "rgba(189, 0, 255, 1)",
    textColor: "rgba(255, 255, 255, 1)",
    boxShadowColor: "rgba(189, 0, 255, .4)",
  },
  teal: {
    name: "teal",
    mainColor: "rgba(28, 233, 182, 1)",
    textColor: "rgba(0, 0, 0, 1)",
    boxShadowColor: "rgba(28, 233, 182, .4)",
  },
  orange: {
    name: "orange",
    mainColor: "rgba(255, 145, 0, 1)",
    textColor: "rgba(255, 255, 255, 1)",
    boxShadowColor: "rgba(255, 145, 0, .4)",
  },
  green: {
    name: "green",
    mainColor: "rgba(129, 215, 88, 1)",
    textColor: "rgba(0, 0, 0, 1)",
    boxShadowColor: "rgba(129, 215, 88, .4)",
  },
  pink: {
    name: "pink",
    mainColor: "rgba(255, 0, 199, 1)",
    textColor: "rgba(255, 255, 255, 1)",
    boxShadowColor: "rgba(255, 0, 199, .4)",
  },
  tan: {
    name: "tan",
    mainColor: "rgba(255, 234, 199, 1)",
    textColor: "rgba(0, 0, 0, 1)",
    boxShadowColor: "rgba(255, 234, 199, .4)",
  },
  red: {
    name: "red",
    mainColor: "rgba(255, 82, 82, 1)",
    textColor: "rgba(255, 255, 255, 1)",
    boxShadowColor: "rgba(255, 82, 82, .4)",
  },
}

export const AllPlayerColors: PlayerColors[] = Object.values(PlayerColorsMap)

/**
 * The color to use for the user's profile picture background
 *
 * @param playerColor the color spelled out
 * @returns the color corresponding to the user's profile picture on SAPI or a random color
 */
export function getPlayerColor(playerColor: string) {
  return PlayerColorsMap[playerColor] ?? sample(AllPlayerColors)
}
