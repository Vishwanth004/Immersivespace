import { useMemo } from "react"

import { ValueOf } from "@spatialsys/js/types"

export type ActionT<T, P = undefined> = {
  type: T
  payload: P
}

export type ActionCreator<T = any, P = any> = (payload: P) => { type: T; payload: P }

type ActionMap = Record<string, ActionCreator>

type GetReturnTypes<Fn extends ActionCreator> = ReturnType<Fn>

export type GetActionType<T extends ActionMap> = GetReturnTypes<ValueOf<T>>

export function makeActionCreator<T extends ActionT<any, any>>(
  type: T["type"]
): ActionCreator<T["type"], T["payload"] extends undefined ? {} | void : T["payload"]> {
  return function actionCreator(payload: T["payload"]): T {
    return { type, payload } as T
  }
}

/**
 * Helper type function for taking an action map and typing a "bound" version of that action map,
 * where every property is a function that has the same input, but has `void` as a return value.
 */
export type BoundActions<T extends ActionMap> = {
  [Property in keyof T]: (...args: Parameters<T[Property]>) => void
}

/**
 * Takes a map of actions and return a new map, where each action creator property has been bound
 * to/wrapped with the given dispatch function.
 *
 * You probably want to use {@link useBindActions}.
 * @param actions
 * @param dispatch
 * @returns a new action map where the functions dispatch actions to the reducer
 */
export function bindActions<T extends ActionMap>(actions: T, dispatch: (action: any) => void): BoundActions<T> {
  return Object.keys(actions).reduce((obj, key) => {
    const actionCreator = actions[key]
    obj[key as keyof T] = (payload: any) => {
      dispatch(actionCreator(payload))
    }
    return obj
  }, {} as BoundActions<T>)
}

/**
 * Takes a map of actions and return a new map, where each action creator property has been bound
 * to/wrapped with the given dispatch function. Typically used when setting up context, as a
 * better alternative than manually creating a callback for each action creator.
 * @param actions
 * @param dispatch
 * @returns
 */
export function useBindActions<T extends ActionMap>(actions: T, dispatch: (action: any) => void): BoundActions<T> {
  return useMemo(() => bindActions(actions, dispatch), [actions, dispatch])
}
