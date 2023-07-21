import React, { useCallback, useState } from "react"

import { axiMemo } from "src/client/hooks/genericMemo"
import { useStyles } from "src/client/hooks/useStyles"
import { V2 } from "src/client/types/V2"

import AxiSlider from "./AxiSlider"
import IconButton from "../../components/IconButton"
import Label from "../../components/Label"

interface AxiSliderPairProps {
  labelX?: string
  labelY?: string
  minMax?: [number, number] | undefined
  yMinMax?: [number, number]
  step?: number | [number, number]
  title: string
  valueX: number
  valueY: number
  onChange?: (value1: number, value2: number) => void
}

function AxiSliderPair({
  onChange,
  labelX = "x",
  labelY = "y",
  step,
  title,
  valueX,
  valueY,
  minMax,
  yMinMax,
}: AxiSliderPairProps) {
  console.log("Rendering", title)
  const styles = useStyles(
    () => ({
      sliderContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: -10,
      },
      iconButton: { marginTop: 17, marginLeft: 5 },
      labelContainer: { display: "flex" },
    }),
    []
  )
  const [locked, setLocked] = useState(false)
  const [mostRecentlyChangedX, setMostRecentlyChangedX] = useState(true)

  const stepV2: V2 | undefined = step ? V2.from(step) : undefined

  const handleChangeX = useCallback(
    (newValue1: number) => {
      setMostRecentlyChangedX(true)
      return locked ? onChange?.(newValue1, newValue1) : onChange?.(newValue1, valueY)
    },
    [onChange, locked, valueY]
  )

  const handleChangeY = useCallback(
    (newValue2: number) => {
      setMostRecentlyChangedX(false)
      return locked ? onChange?.(newValue2, newValue2) : onChange?.(valueX, newValue2)
    },
    [onChange, locked, valueX]
  )

  const handleChangeLocked = useCallback(() => {
    const newLocked = !locked
    if (newLocked && valueX !== valueY) {
      if (mostRecentlyChangedX) {
        handleChangeY(valueX)
      } else {
        handleChangeX(valueY)
      }
    }
    setLocked(newLocked)
  }, [handleChangeX, handleChangeY, locked, mostRecentlyChangedX, valueX, valueY])

  return (
    <>
      <div style={styles.labelContainer}>
        <Label text={title} marginBottom={0} />

        <IconButton
          icon={locked ? "LOCK" : "LOCK_OPEN"}
          tooltip={locked ? "Unlock values" : "Lock values"}
          onClick={handleChangeLocked}
          style={styles.iconButton}
        />
      </div>
      <div style={styles.sliderContainer}>
        <AxiSlider
          type="single"
          label={labelX}
          minMax={minMax}
          value={valueX}
          onChange={handleChangeX}
          step={stepV2?.x}
          gapPx={5}
          maxFractionDigits={2}
        />
        <AxiSlider
          type="single"
          label={labelY}
          minMax={yMinMax ?? minMax}
          value={valueY}
          onChange={handleChangeY}
          step={stepV2?.y}
          gapPx={5}
          maxFractionDigits={2}
        />
      </div>
    </>
  )
}

export default axiMemo(AxiSliderPair)
