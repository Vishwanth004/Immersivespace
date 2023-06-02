import { clamp } from "lodash"

/* eslint-disable import/prefer-default-export */

export const deg2rad = (degrees: number) => {
  return degrees * (Math.PI / 180)
}

export const GetY4PointsBezierCurve = (t, y0, y1, y2, y3) => {
  const tt = t * t
  const ttt = tt * t

  const u = 1 - t
  const uu = u * u
  const uuu = uu * u

  // only need the value of the graph, y value of the bezier curve
  const val = uuu * y0 + 3 * uu * t * y1 + 3 * u * tt * y2 + ttt * y3

  return val
}

/**
 * Linearly interpolates between `start` and `end` by `t`. `t=0.0` returns start, `t=1.0` returns end.
 *
 * @param start The lower bound of the range
 * @param end The upper bound of the range
 * @param t The interpolation factor from 0.0 to 1.0 to use for linearly interpolating between `start` and `end`
 *
 * @returns A number between `start` and `end`
 *
 * @example
 * // returns 1.5
 * lerp(0.5, 2.5, 0.5)
 */
export const lerp = (start: number, end: number, t: number): number => start + (end - start) * clamp(t, 0.0, 1.0)

/**
 * Normalizes a value from one range (current) to another range (new).
 *
 * @param value    The current value (part of the current range).
 * @param minVal The min value of the current range.
 * @param maxVal The max value of the current range.
 * @param [newMin=0] The min value of the new range. Defaults to 0
 * @param [newMax] The max value of the new range. Defaults to 1
 *
 * @returns the normalized value.
 */
export const normalizeBetweenTwoRanges = (
  value: number,
  minVal: number,
  maxVal: number,
  newMin = 0,
  newMax = 1
): number => {
  return newMin + ((value - minVal) * (newMax - newMin)) / (maxVal - minVal)
}

export const copySign = (x, y) => (Math.sign(x) === Math.sign(y) ? x : -x)

// converted from the c++ code here: https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
export const quaternionToEuler = (q: [number, number, number, number]) => {
  const x = q[0]
  const y = q[1]
  const z = q[2]
  const w = q[3]

  const angles: [number, number, number] = [0, 0, 0]

  //x rot
  const sinr_cosp = 2 * (w * x + y * z)
  const cosr_cosp = 1 - 2 * (x * x + y * y)
  angles[0] = Math.atan2(sinr_cosp, cosr_cosp) * (180 / Math.PI)

  //y rot
  const sinp = 2 * (w * y - z * x)
  if (Math.abs(sinp) >= 1) {
    angles[1] = copySign(Math.PI / 2, sinp)
  } else {
    angles[1] = Math.asin(sinp) * (180 / Math.PI)
  }

  //z rot
  const siny_cosp = 2 * (w * z + x * y)
  const cosy_cosp = 1 - 2 * (y * y + z * z)
  angles[2] = Math.atan2(siny_cosp, cosy_cosp) * (180 / Math.PI)

  return angles
}

// converted from the c++ code here: https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
export const eulerToQuaternion = (e: [number, number, number]) => {
  const x = e[0] * (Math.PI / 180)
  const y = e[1] * (Math.PI / 180)
  const z = e[2] * (Math.PI / 180)

  const q: [number, number, number, number] = [0, 0, 0, 0]

  const cr = Math.cos(x * 0.5)
  const sr = Math.sin(x * 0.5)
  const cp = Math.cos(y * 0.5)
  const sp = Math.sin(y * 0.5)
  const cy = Math.cos(z * 0.5)
  const sy = Math.sin(z * 0.5)

  q[0] = sr * cp * cy - cr * sp * sy
  q[1] = cr * sp * cy + sr * cp * sy
  q[2] = cr * cp * sy - sr * sp * cy
  q[3] = cr * cp * cy + sr * sp * sy

  return q
}

/**
 * Get yaw angle in range [-180, 180] from quaternion.
 * This is different from the euler angle Y, which is in range [-90, 90].
 */
export const getYawFromQuaternion = (q: [number, number, number, number]) => {
  const [x, y, z, w] = q
  const angle = Math.atan2(2 * (w * y + x * z), w * w + x * x - y * y - z * z)
  return ((angle * (180 / Math.PI) + 540) % 360) - 180
}

/** Returns if a list of numbers is in ascending order */
export const isOrdered = (...args: number[]) => args.every((x, i) => i === 0 || x >= args[i - 1])
