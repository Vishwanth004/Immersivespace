import { round } from "lodash"
import { memo, useEffect } from "react"

import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"

import classes from "./perf-statistics.module.scss"

interface PerfStatisticsProps {
  onClose: () => void
}

const PerfStatistics = memo(function PerfStatistics(props: PerfStatisticsProps) {
  // To avoid the overhead of these updates when not visible,
  // only observe this key path while mounted
  useEffect(() => {
    UnityMessages.changeAppStateObservers(["perfStatistics"], [])
    return () => {
      UnityMessages.changeAppStateObservers([], ["perfStatistics"])
    }
  }, [])

  const stats = useAppContext((context) => context.state.unity.appState.perfStatistics)

  // Since we dynamically observe this state, it might not be available
  // in the app state when we access it for the first render after mount
  if (!stats) return null

  return (
    <table className={classes.table}>
      <thead>
        <td colSpan={2}>
          Performance Statistics
          <button className={classes.closeButton} onClick={props.onClose}>
            X
          </button>
        </td>
      </thead>
      <tr>
        <td>FPS</td>
        <td>{stats.fpsCount}</td>
      </tr>
      <tr>
        <td>Dropped frames</td>
        <td>{stats.droppedFrameCount}</td>
      </tr>
      <tr>
        <td>Triangle count</td>
        <td>{stats.triangleCount}</td>
      </tr>
      <tr>
        <td>Vertex count</td>
        <td>{stats.vertexCount}</td>
      </tr>
      <tr>
        <td>System memory</td>
        <td>{round(stats.systemMemorySize, 2)}MB</td>
      </tr>
      <tr>
        <td>Graphics memory</td>
        <td>{round(stats.graphicsMemorySize, 2)}MB</td>
      </tr>
    </table>
  )
})

export default PerfStatistics
