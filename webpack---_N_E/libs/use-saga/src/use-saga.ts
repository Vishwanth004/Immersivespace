import { useCallback, useEffect, useRef, useState } from "react"
import { MulticastChannel, Saga, Task, runSaga as rootRunSaga, stdChannel } from "redux-saga"
// eslint-disable-next-line @jambit/typed-redux-saga/use-typed-effects
import { Tail, effectTypes } from "redux-saga/effects"
import { call, select, take } from "typed-redux-saga/macro"

import { NotUndefined } from "@spatialsys/js/types"

export const StateUpdated = "@@STATE_UPDATED"
export type { Tail }

interface SagaEnv<S, A extends NotUndefined> {
  state: S
  actions: A[]
  channel: MulticastChannel<A>
  stateChangePossible: boolean
}

/**
 * Helper saga for pausing selector effects until the useSaga-specific
 * `StateUpdated` action has been dispatched indicating that the state
 * is up-to-date.
 * @param selector The state selector function.
 * @param args Any parameters the selector requires.
 * @returns The result of the given selector.
 */
function* selectWhenStateReady<S extends (...args: any) => any, T extends Tail<Parameters<S>>>(
  selector: S,
  ...args: T
): Generator<any, ReturnType<S>, any> {
  yield* take(StateUpdated)
  return yield* select(selector, ...args)
}

type ActionType<A> = { type: typeof StateUpdated } | A
type ErrorInfo = { sagaStack: string }
export type SagaErrorHandler = (error: Error, errorInfo: ErrorInfo) => void
export type RunSaga = <T extends any[]>({ onError }: { onError?: SagaErrorHandler }, saga: Saga<T>, ...args: T) => Task

/**
 * Runs the given Saga wired up to the given state and dispatch, typically
 * created by React's useReducer hook. Automatically cancels the saga when
 * the component is unmounted.
 *
 * Be careful about `args` not changing. `args` should never be React state
 * variables. If `args` changes (or `dispatch` or `saga`) the running saga will
 * be cancelled and restarted, probably leading to unintended side effects.
 *
 * @param state The state the saga will read from when running select effects.
 * @param dispatch The function used to send actions to the reducer.* @param onError
 * @param onError Optional. Called for uncaught exceptions from the saga.
 * @param saga The root saga to run.
 * @param args Any parameters that the saga function requires.
 * @returns A dispatch function that will send actions to the reducer first
 *   and then the saga.
 */
export function useSaga<S, A extends NotUndefined, T extends any[]>(
  {
    state,
    dispatch,
    onError,
  }: {
    state: S
    dispatch: (action: A) => void
    onError?: SagaErrorHandler
  },
  saga: Saga<T>,
  ...args: T
): {
  dispatch: (action: A) => void
  runSaga: RunSaga
} {
  const environment = useRef<SagaEnv<S, ActionType<A>>>({
    state,
    channel: stdChannel(),
    actions: [],
    stateChangePossible: false,
  })
  const isFirstSync = useRef(true)

  const [stateUpdateFlag, forceUpdate] = useState({})

  const wrappedDispatch = useCallback(
    (action: A) => {
      // This does not update the state synchronously. React batches state
      // updates. Because of the we need to queue the actions to be processed
      // into the saga after the state has been updated.
      dispatch(action)
      environment.current.stateChangePossible = true
      environment.current.actions.push(action)
      // This ensures that the useEffect below that handles flushing the
      // actions from the queue into the saga's channel gets executed.
      forceUpdate({})
    },
    [dispatch]
  )

  const runSaga = useCallback(
    <Args extends any[]>({ onError }: { onError?: SagaErrorHandler }, saga: Saga<Args>, ...args: Args) => {
      return rootRunSaga(
        {
          getState: () => environment.current.state,
          dispatch: wrappedDispatch,
          onError,
          channel: environment.current.channel,
          effectMiddlewares: [
            (next) => (effect) => {
              // For selector effects, when the state may have changed, wait until the
              // state has been freshly updated before executing them.
              if (effect.type === effectTypes.SELECT && environment.current.stateChangePossible) {
                return next(call(selectWhenStateReady, effect.payload.selector, effect.payload.args))
              }
              return next(effect)
            },
          ],
        },
        saga as Saga<any[]>,
        ...args
      )
    },
    [wrappedDispatch]
  )

  // One-time effect that starts the root saga.
  useEffect(() => {
    const task = runSaga({ onError }, saga, ...args)
    return task.cancel
    // The exhaustive deps rule doesn't understand variables used with the
    // spread operator correctly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrappedDispatch, saga, ...args])

  // Sync the latest state from the reducer with the state read from within
  // the saga, and send any actions that were dispatched into the saga's
  // channel, resolving any pending `take` effects.
  useEffect(() => {
    // Do not sync the state on the first commit. There may be actions that were dispatched
    // that have not been handled by the reducer; the state will have not changed yet from
    // its initial value.
    if (isFirstSync.current) {
      isFirstSync.current = false
    } else {
      environment.current.state = state
      environment.current.stateChangePossible = false
      // Let the selector effects continue that are waiting on fresh state.
      environment.current.channel.put({
        type: StateUpdated,
      })
    }

    if (environment.current.actions.length > 0) {
      // Copy the actions and reset them on the environment so in case any
      // sagas dispatch more actions, they go through the reducer first
      // instead of being immediately processed by sagas.
      const actions = environment.current.actions
      environment.current.actions = []
      // Flush the actions into the saga through the channel.
      actions.forEach(environment.current.channel.put)
    }
  }, [stateUpdateFlag, state])

  return { dispatch: wrappedDispatch, runSaga }
}
