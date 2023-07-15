import React, { useCallback, useState } from "react"

import { axiMemo } from "src/client/hooks/genericMemo"
import { useStyles } from "src/client/hooks/useStyles"

import AxiSlider from "./AxiSlider"
import IconButton from "../../components/IconButton"
import Label from "../../components/Label"

interface AxiSliderPairProps {
  labelX?: string
  labelY?: string
  title: string
  valueX: number
  valueY: number
  handleChange?: (value1: number, value2: number) => void
}

function AxiSliderPair({
  labelX = "x",
  labelY = "y",
  valueX,
  valueY,
  title,
  handleChange,
}: AxiSliderPairProps) {
  const styles = useStyles(
    () => ({
      sliderContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: -10,
      },
    }),
    []
  )
  const [locked, setLocked] = useState(false)
  const [mostRecentlyChangedX, setMostRecentlyChangedX] = useState(true)

  const handleChangeX = useCallback(
    (newValue1: number) => {
      setMostRecentlyChangedX(true)
      return locked ? handleChange(newValue1, newValue1) : handleChange(newValue1, valueY)
    },
    [handleChange, locked, valueY]
  )

  const handleChangeY = useCallback(
    (newValue2: number) => {
      setMostRecentlyChangedX(false)
      return locked ? handleChange(newValue2, newValue2) : handleChange(valueX, newValue2)
    },
    [handleChange, locked, valueX]
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
      <div style={{ display: "flex" }}>
        <Label text={title} marginBottom={0} />

        <IconButton
          icon={locked ? "LOCK" : "LOCK_OPEN"}
          tooltip={locked ? "Unlock values" : "Lock values"}
          onClick={handleChangeLocked}
          style={{ marginTop: 17, marginLeft: 5 }}
        />
      </div>
      <div style={styles.sliderContainer}>
        <AxiSlider
          type="single"
          label={labelX}
          min={0}
          max={1}
          value={valueX}
          onChange={handleChangeX}
          gapPx={5}
          maxFractionDigits={2}
        />
        <AxiSlider
          type="single"
          label={labelY}
          min={0}
          max={1}
          value={valueY}
          onChange={handleChangeY}
          gapPx={5}
          maxFractionDigits={2}
        />
      </div>
    </>
  )
}

export default axiMemo(AxiSliderPair)
