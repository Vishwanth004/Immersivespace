import { clamp } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"

export type LoadingProgressPhase = {
  key: string
  /**
   * This phase will take `weight / totalWeight` of the overall progress.
   */
  weight: number
  /**
   * The progress of this phase, between 0 and 1.
   */
  progress: number
  /**
   * The amount of time in milliseconds to fake progress for this phase.
   * If this is 0, no fake progress will be added.
   */
  fakeProgressTimeMs: number
}

type UseLoadingProgressOptions = {
  fakeIncrementIntervalMs?: number
}

/**
 * Calculates the overall loading progress from a list of phases.
 * @returns The weighted average of all phases including fake progresses, between 0 and 1.
 */
export function useLoadingProgress(
  phases: LoadingProgressPhase[],
  { fakeIncrementIntervalMs = 1000 }: UseLoadingProgressOptions = {}
): number {
  const [fakeProgresses, setFakeProgresses] = useState(new Map<string, number>())
  const phasesRef = useRef(phases)

  // Get the progress of a phase including fake progress.
  const getCombinedProgress = useCallback(
    (phase: LoadingProgressPhase) => clamp(phase.progress + (fakeProgresses.get(phase.key) ?? 0), 0, 1),
    [fakeProgresses]
  )

  // We want to avoid resetting the setInterval when the phases change,
  // because that would cause the interval between increments to be longer than expected.
  // So we store the phases in a ref and use that in the setInterval callback.
  useEffect(() => {
    phasesRef.current = phases
  }, [phases])

  const incrementFakeProgress = useCallback(
    () =>
      setFakeProgresses(
        (prev) =>
          new Map(
            phasesRef.current.map((phase) => {
              let fakeProgress = prev.get(phase.key) ?? 0
              if (phase.fakeProgressTimeMs > 0) {
                fakeProgress += fakeIncrementIntervalMs / phase.fakeProgressTimeMs
              }
              return [phase.key, fakeProgress]
            })
          )
      ),
    [fakeIncrementIntervalMs]
  )

  // Whether any of the phases have fake progress and are not yet complete.
  // If none of the phases have fake progress, we don't need to set up the interval.
  const anyFakeProgress = phases.some((phase) => phase.fakeProgressTimeMs > 0 && getCombinedProgress(phase) < 1)

  // Increment fake progress every intervalMs milliseconds.
  useEffect(() => {
    if (!anyFakeProgress) {
      return undefined
    }
    const interval = setInterval(incrementFakeProgress, fakeIncrementIntervalMs)
    return () => clearInterval(interval)
  }, [anyFakeProgress, incrementFakeProgress, fakeIncrementIntervalMs])

  // The sum of all the weights. This is used to calculate the weighted average of all phases.
  const totalWeight = phases.reduce((total, phase) => total + phase.weight, 0)

  // Calculate the weighted average of all phases including fake progresses.
  return phases.reduce((total, phase) => {
    return total + getCombinedProgress(phase) * (phase.weight / totalWeight)
  }, 0)
}
