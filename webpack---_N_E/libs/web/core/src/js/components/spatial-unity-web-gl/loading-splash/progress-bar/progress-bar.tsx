import { clamp } from "lodash"

import classes from "./progress-bar.module.scss"

type ProgressBarProps = {
  progress: number
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={classes.container} style={{ "--progress": clamp(progress, 0, 1) } as React.CSSProperties}>
      <div className={classes.progress} />
    </div>
  )
}
