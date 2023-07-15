import React, { useCallback, useState } from "react"

import { Slider, SliderChangeEvent } from "primereact/slider"

import "./AxiSlider.css"
import AxiInputNumber from "./AxiInputNumber"
import { axiMemo } from "../../../hooks/genericMemo"
import { useStyles } from "../../../hooks/useStyles"
import { regularText } from "../../../util/typography"
import unreachable from "../../../util/unreachable"
import Label from "../../components/Label"

interface AxiSliderPropsBase {
  label: string
  min?: number
  max?: number

  // Pixel gap between the input and the slider.
  gapPx?: 20 | 10 | 5
  maxFractionDigits?: number
}

type AxiSliderOnChange =
  | {
      type: "single"
      value?: number
      onChange?: (n: number) => void
    }
  | {
      type: "range"
      value?: [number, number]
      onChange?: (n: [number, number]) => void
    }

type AxiSliderSteps =
  | {
      step?: number
      numSteps?: undefined
    }
  | {
      numSteps?: number
      step?: undefined
    }

type AxiSliderProps = AxiSliderPropsBase & AxiSliderOnChange & AxiSliderSteps

function getStep({
  numSteps,
  step,
  min,
  max,
}: {
  step: number | undefined
  numSteps: number | undefined
  min: number
  max: number
}): number {
  if (step !== undefined) {
    return step
  }

  if (numSteps) {
    return (max - min) / numSteps
  }

  return (max - min) / 100
}

function AxiSlider({
  label,
  min,
  max,
  onChange,
  type,
  value,
  step,
  numSteps,
  gapPx,
  maxFractionDigits,
}: AxiSliderProps) {
  const minNonNull = min ?? 0
  const maxNonNull = max ?? minNonNull + 1

  const defaultLocalValue: number | [number, number] =
    type === "range" ? [minNonNull, maxNonNull] : minNonNull
  const [localValue, setLocalValue] = useState(defaultLocalValue)

  const actualValue = value ?? localValue
  const setValue = useCallback(
    (v: number | [number, number]) => {
      if (type === "range" && Array.isArray(v)) {
        onChange?.(v)
        setLocalValue(v)
      } else if (type === "single" && !Array.isArray(v)) {
        onChange?.(v)
        setLocalValue(v)
      }
    },
    [setLocalValue, onChange, type]
  )

  const onChangeHandler = useCallback((e: SliderChangeEvent) => setValue(e.value), [setValue])

  const onChangeInput = useCallback(
    (newValue: number, changeType: "min" | "max" | "value") => {
      if (newValue < minNonNull || newValue > maxNonNull) {
        return
      }
      switch (changeType) {
        case "max": {
          const valueArr = value as [number, number]
          setValue([valueArr[0], newValue])
          break
        }
        case "min": {
          const valueArr = value as [number, number]
          setValue([newValue, valueArr[1]])
          break
        }
        case "value":
          setValue(newValue)
          break
        default:
          unreachable(changeType)
      }
    },
    [maxNonNull, minNonNull, setValue, value]
  )

  const handleChangeMax = useCallback(
    (newValue: number) => onChangeInput(newValue, "max"),
    [onChangeInput]
  )

  const handleChangeMin = useCallback(
    (newValue: number) => onChangeInput(newValue, "min"),
    [onChangeInput]
  )

  const handleChangeValueInput = useCallback(
    (newValue: number) => onChangeInput(newValue, "value"),
    [onChangeInput]
  )

  const styles = useStyles(
    () => ({
      sliderAndInputContainer: {
        display: "flex",
        alignItems: "center",
        gap: gapPx ?? 20,
      },
      sliderContainer: {
        flexGrow: 1,
        margin: 10,
        ...regularText,
      },
      doubleSliderValues: {
        width: "100%",
        paddingTop: 10,
        display: "flex",
        alignItems: "center",
        gap: gapPx ?? 20,
      },
    }),
    [gapPx]
  )

  const slider = (
    <Slider
      step={getStep({ numSteps, step, min: minNonNull, max: maxNonNull })}
      min={minNonNull}
      max={maxNonNull}
      style={styles.sliderContainer}
      range={type === "range"}
      value={actualValue}
      onChange={onChangeHandler}
    />
  )

  return (
    <div>
      <Label text={label} />
      {!Array.isArray(actualValue) ? (
        <div style={styles.sliderAndInputContainer}>
          {slider}
          <AxiInputNumber
            value={actualValue}
            maxWidth="25%"
            onChange={handleChangeValueInput}
            maxFractionDigits={maxFractionDigits}
          />
        </div>
      ) : (
        <>
          {slider}
          <div style={styles.doubleSliderValues}>
            <AxiInputNumber
              value={actualValue[0]}
              onChange={handleChangeMin}
              maxFractionDigits={maxFractionDigits}
            />
            <div style={{ padding: 20 }} />
            <AxiInputNumber
              value={actualValue[1]}
              onChange={handleChangeMax}
              maxFractionDigits={maxFractionDigits}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default axiMemo(AxiSlider)
