import type { AxiosError } from "axios"
import type { ReactNode } from "react"

export * from "./cookie"
export * from "./unity-instance"

export type ValueOf<T> = T[keyof T]

/**
 * Tuple of length N (n-ary). Only supports tuples where all entries in the tuple are be the same type `T`
 * https://stackoverflow.com/questions/52489261/typescript-can-i-define-an-n-length-tuple-type
 */
export type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>

export const isAxiosError = (err: any): err is AxiosError => {
  return (err as AxiosError).isAxiosError
}

/** Like `PropsWithChildren`, but the `children` prop is **required** */
export type PropsWithChildrenRequired<P = {}> = P & { children: ReactNode }

/**
 * Define a POJO with a property `type` and an optional property of `payload`.
 */
export type Message<T, P = undefined> = {
  type: T
} & (P extends undefined ? {} : { payload: P })

/**
 * Requires all properties of a given type to be defined and non-null. This is more strict than
 * the built-in `Required` which does not exclude properties from being `null`.
 */
export type RequireAllProperties<T> = { [P in keyof T]-?: NonNullable<T[P]> }

/**
 * Requires specific properties of a given type to be defined and non-null.
 */
export type RequireProperties<T, P extends keyof T> = T & RequireAllProperties<Pick<T, P>>

export type NotUndefined = {} | null

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Utility to make a type more readable, for display purposes. Non-recursive.
 * Also often referred to as `Id`, `Compute`, `Identify`
 *
 * @see https://twitter.com/mattpocockuk/status/1622730173446557697?s=20
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
