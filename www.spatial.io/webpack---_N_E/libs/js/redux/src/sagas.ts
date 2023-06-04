import { EventChannel, Task } from "redux-saga"
import { join, takeEvery, takeLatest, takeLeading } from "typed-redux-saga/macro"

import { NotUndefined } from "@spatialsys/js/types"

/**
 * Helper saga that runs the {@link takeEvery} effect and closes the given channel when the
 * saga gets cancelled. This is a blocking effect.
 * @param channel
 * @param saga
 */
export function* takeEveryAndClose<T extends NotUndefined>(channel: EventChannel<T>, saga: (item: T) => any) {
  try {
    const task: Task = yield* takeEvery(channel, saga)
    yield* join(task)
  } finally {
    channel.close()
  }
}

/**
 * Helper saga that runs the {@link takeLatest} effect and closes the given channel when the
 * saga gets cancelled. This is a blocking effect.
 * @param channel
 * @param saga
 */
export function* takeLatestAndClose<T extends NotUndefined>(channel: EventChannel<T>, saga: (item: T) => any) {
  try {
    const task: Task = yield* takeLatest(channel, saga)
    yield* join(task)
  } finally {
    channel.close()
  }
}

/**
 * Helper saga that runs the {@link takeLeading} effect and closes the given channel when the
 * saga gets cancelled. This is a blocking effect.
 * @param channel
 * @param saga
 */
export function* takeLeadingAndClose<T extends NotUndefined>(channel: EventChannel<T>, saga: (item: T) => any) {
  try {
    const task: Task = yield* takeLeading(channel, saga)
    yield* join(task)
  } finally {
    channel.close()
  }
}
