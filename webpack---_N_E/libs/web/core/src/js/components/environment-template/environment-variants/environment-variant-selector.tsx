import clsx from "clsx"
import { memo } from "react"

import classes from "./environment-variant-selector.module.scss"

interface EnvironmentVariantSelectorProps {
  disabled?: boolean
  pickCoord?: { x: number; y: number }
  selectedVariant: number
  setSelectedVariant: (variant: number) => void
  urls: string[]
  orders?: number[]
  setPreviewVariant: (variant: number) => void
}

export const EnvironmentVariantSelector = (props: EnvironmentVariantSelectorProps) => {
  const { disabled, pickCoord, selectedVariant, setSelectedVariant, urls, orders, setPreviewVariant } = props

  return (
    <div className={classes.container}>
      {orders
        ? orders.map((idx) => (
            <EnvironmentVariantButton
              key={idx}
              index={idx}
              pickCoord={pickCoord}
              isSelected={idx === selectedVariant}
              url={urls[idx]}
              handleSetToggle={setSelectedVariant}
              setPreviewVariant={setPreviewVariant}
              disabled={disabled}
            />
          ))
        : urls.map((url, index) => (
            <EnvironmentVariantButton
              key={index}
              index={index}
              pickCoord={pickCoord}
              isSelected={index === selectedVariant}
              url={url}
              handleSetToggle={setSelectedVariant}
              setPreviewVariant={setPreviewVariant}
              disabled={disabled}
            />
          ))}
    </div>
  )
}

interface EnvironmentVariantButtonProps {
  index: number
  isSelected: boolean
  pickCoord?: { x: number; y: number }
  disabled?: boolean
  url: string
  handleSetToggle: (tab: number) => void
  setPreviewVariant: (idx: number) => void
}

const EnvironmentVariantButton = memo((props: EnvironmentVariantButtonProps) => {
  const { index, pickCoord, url, isSelected, disabled, handleSetToggle, setPreviewVariant } = props

  return (
    <button
      className={clsx(classes.buttonContainer, isSelected && classes.selected, !disabled && classes.hoverEnabled)}
      style={{
        backgroundImage: `url(${url})`,
        backgroundPosition: pickCoord && `${pickCoord.x * 100}% ${pickCoord.y * 100}%`,
      }}
      onClick={() => handleSetToggle(index)}
      onMouseOver={() => setPreviewVariant(index)}
      onMouseLeave={() => setPreviewVariant(-1)}
      disabled={disabled}
    />
  )
})
