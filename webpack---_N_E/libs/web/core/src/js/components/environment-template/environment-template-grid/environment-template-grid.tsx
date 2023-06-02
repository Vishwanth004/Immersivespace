import clsx from "clsx"
import { ReactNode } from "react"

import classes from "./environment-template-grid.module.scss"

interface EnvironmentTemplateGridProps {
  useTemplateGrid?: boolean
  children: ReactNode
}

/** Grid layout for the environment and template pickers */
const EnvironmentTemplateGrid = (props: EnvironmentTemplateGridProps) => {
  const { useTemplateGrid } = props
  return (
    // Must be wrapped in a div for box-shadow padding to work.
    <div className={classes.container}>
      <div className={clsx(classes.grid, useTemplateGrid ? classes.templateLayout : classes.layout)}>
        {props.children}
      </div>
    </div>
  )
}

export default EnvironmentTemplateGrid
