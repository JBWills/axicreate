import React, { useCallback, useState } from "react"

import { Slider, SliderChangeEvent } from "primereact/slider"

import "./AxiSlider.css"
import AxiInputNumber from "./AxiInputNumber"
import { regularText } from "../../../util/typography"
import unreachable from "../../../util/unreachable"
import Label from "../../components/Label"

interface AxiSliderPropsBase {
  label: string
  min?: number
  max?: number
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

  const onChangeHandler = useCallback(
    (e: SliderChangeEvent) => setValue(e.value),
    [setValue]
  )

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
    []
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

  const slider = (
    <Slider
      className="Slider"
      step={getStep({ numSteps, step, min: minNonNull, max: maxNonNull })}
      min={minNonNull}
      max={maxNonNull}
      style={regularText}
      range={type === "range"}
      value={actualValue}
      onChange={onChangeHandler}
    />
  )

  return (
    <div className="AxiSlider">
      <Label text={label} />
      {!Array.isArray(actualValue) ? (
        <div className="SliderContainer">
          <div style={{ flexGrow: 1 }}>{slider}</div>
          <AxiInputNumber
            value={actualValue}
            maxWidth="25%"
            onChange={handleChangeValueInput}
          />
        </div>
      ) : (
        <>
          {slider}
          <div className="DoubleSliderValues">
            <AxiInputNumber value={actualValue[0]} onChange={handleChangeMin} />
            <div style={{ padding: 20 }} />
            <AxiInputNumber value={actualValue[1]} onChange={handleChangeMax} />
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(AxiSlider)
