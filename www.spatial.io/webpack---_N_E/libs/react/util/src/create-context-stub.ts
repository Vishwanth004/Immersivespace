/**
 * A stub function that throws an error if called. Useful when defining the initial state of a React context
 */
export const createContextStub = (contextName: string) => (): never => {
  throw new Error(`You forgot to wrap your component in <${contextName}>`)
}
