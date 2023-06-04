import { select, take } from "typed-redux-saga/macro"

import { StateUpdated, Tail } from "./use-saga"

/**
 * A saga function to wait on a certain part of state changing. Uses referentially equality for
 * comparison (`!==`). If the selected state is an array, each element in the array is compared.
 *
 * To compare an array using a shallow equality, pass it as a 1-element array,
 * `waitUntilChanged(context => ([context.list]))`.
 * @param selector The function given to a `select` effect.
 * @param args Any arguments the selector takes in addition to the automatically passed `state`.
 * @returns A 2-element array containing the newly-changed selected state value, and the previous value.
 */
export function* waitUntilChanged<S extends (...args: any) => any, T extends Tail<Parameters<S>>>(
  selector: S,
  ...args: T
): Generator<any, [ReturnType<S>, ReturnType<S>], any> {
  const value = yield* select(selector, ...args)
  const isArray = Array.isArray(value)
  while (true) {
    yield* take(StateUpdated)
    const newValue = yield* select(selector, ...args)
    const isDifferent = isArray ? isArrayDifferent(value, newValue) : newValue !== value
    if (isDifferent) {
      return [newValue, value]
    }
  }
}

/**
 * Given an array and any possible value, compares the two. The arrays are different if
 * they are not both an array and if one of the elements is `!==` to one of the elements
 * in the same position of the other array; a 1-level deep shallow equality check.
 */
function isArrayDifferent(a: any[], b: any): boolean {
  if (!Array.isArray(b)) {
    return true
  }
  if (a.length !== b.length) {
    return true
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return true
    }
  }
  return false
}

/**
 * Utility saga for ensuring the selected piece of state has a certain condition before proceeding.
 * @param comparator function to compare whether the value has the desired condition.
 * @param selector the state selector function
 * @param args Any arguments the selector takes in addition to the `state`.
 * @returns the selected state.
 */
export function* waitUntil<S extends (...args: any) => any, T extends Tail<Parameters<S>>>(
  comparator: (value: ReturnType<S>) => boolean,
  selector: S,
  ...args: T
): Generator<any, ReturnType<S>, any> {
  while (true) {
    const result = yield* select(selector, ...args)
    if (comparator(result)) {
      return result
    }
    yield* take(StateUpdated)
  }
}

/**
 * Saga for waiting until a selected part of state exists. Uses `!= null` to check for existence.
 * Returns the selected value immediately if it already exists.
 * @param selector The state selector function.
 * @param args Any parameters that the selector function needs in addition to the state.
 * @returns The non-null selected state.
 */
export function* waitUntilExists<S extends (...args: any) => any, T extends Tail<Parameters<S>>>(
  selector: S,
  ...args: T
): Generator<any, NonNullable<ReturnType<S>>, any> {
  return yield* waitUntil((value: ReturnType<S>) => value != null, selector, ...args) as any
}

/**
 * Saga for waiting until a selected part of state is true.
 * @param selector The state selector function. Must return a boolean.
 * @param args Any parameters that the selector function needs in addition to the state.
 * @returns true.
 */
export function* waitUntilTrue<S extends (...args: any) => boolean, T extends Tail<Parameters<S>>>(
  selector: S,
  ...args: T
): Generator<any, true, any> {
  return (yield* waitUntil((value: boolean) => value, selector, ...args)) as true
}
