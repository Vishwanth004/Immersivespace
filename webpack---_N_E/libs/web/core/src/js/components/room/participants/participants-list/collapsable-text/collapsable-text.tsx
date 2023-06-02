import clsx from "clsx"
import { useMeasure } from "react-use"

import { useBoolean } from "@spatialsys/react/hooks/use-boolean"

import classes from "./collapsable-text.module.scss"

type CollapsableTextProps = {
  /**
   * The text to display
   */
  text: string

  /**
   * The number of lines to show when collapsed.
   */
  collapsedLines?: number

  /**
   * Whether to disable the animation when expanding/collapsing.
   */
  disableAnimation?: boolean

  /**
   * The additional class name to use for the Show more / Show less text.
   */
  showMoreClassName?: string

  /**
   * The component to use for the text.
   */
  TextComponent?: React.ElementType
}

/**
 * Text that can be collapsed if too long.
 */
export const CollapsableText = ({
  text,
  collapsedLines = 3,
  disableAnimation = false,
  showMoreClassName,
  TextComponent = "span",
}: CollapsableTextProps) => {
  const [isCollapsed, setIsCollapsed] = useBoolean(true)

  const [textRef, { height: totalHeight }] = useMeasure()
  const [placeholderRef, { height: lineHeight }] = useMeasure()

  const collapsedHeight = Math.min(collapsedLines * lineHeight, totalHeight)

  // Allow 1 extra line before collapsing because the "Show more" text also takes up space
  const isOverflow = totalHeight > collapsedHeight + lineHeight

  const ContainerComponent = isOverflow ? "button" : "div"

  return (
    <ContainerComponent className={classes.container} onClick={isOverflow ? setIsCollapsed.toggle : undefined}>
      <div
        style={{
          // Set minHeight to avoid initial transition from 0 to height
          minHeight: collapsedHeight,
          height: isCollapsed && isOverflow ? collapsedHeight : totalHeight,
        }}
        className={clsx(classes.innerContainer, !disableAnimation && classes.animate)}
      >
        <div ref={textRef}>
          <TextComponent className={classes.text}>{text}</TextComponent>
        </div>
        <div ref={placeholderRef} className={classes.placeholder}>
          {/* This is a placeholder to measure the height of a single line of text */}
          <TextComponent>.</TextComponent>
        </div>
      </div>
      {isOverflow && (
        <span className={clsx(classes.showMore, showMoreClassName)}>{isCollapsed ? "Show more" : "Show less"}</span>
      )}
    </ContainerComponent>
  )
}
