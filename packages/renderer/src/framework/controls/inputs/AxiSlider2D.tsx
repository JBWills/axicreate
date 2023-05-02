import React, { MouseEvent, useCallback, useRef, useState } from "react"

import { OverlayPanel } from "primereact/overlaypanel"

import Slider2D from "./Slider2D"
import XYCoordInputs from "./XYCoordInputs"
import { axiMemo } from "../../../hooks/genericMemo"
import { useStyles } from "../../../hooks/useStyles"
import { V2 } from "../../../types/V2"
import IconButton from "../../components/IconButton"
import Label from "../../components/Label"

interface AxiSlider2DProps {
  label: string
  value?: V2
  min?: V2
  max?: V2
  onChange?: (e: V2) => void
}

function getMinMaxDefaults(min: V2 | undefined, max: V2 | undefined): [V2, V2] {
  if (min && max) {
    return [min, max]
  } else if (max) {
    return [max.minus(1), max]
  } else if (min) {
    return [min, min.plus(1)]
  } else {
    return [new V2(0, 0), new V2(1, 1)]
  }
}

function AxiSlider2D({ label, onChange, value, min, max }: AxiSlider2DProps) {
  const [local, setLocal] = useState<V2 | undefined>(undefined)
  const overlayPanelRef = useRef<OverlayPanel>(null)
  const handleChangeValue = useCallback(
    (v: V2) => {
      setLocal(v)
      onChange?.(v)
    },
    [onChange]
  )

  const handleShowModal = useCallback(
    (e: MouseEvent) => overlayPanelRef.current?.toggle(e),
    [overlayPanelRef]
  )

  const actual = value ?? local

  const [minNotNull, maxNotNull] = getMinMaxDefaults(min, max)

  const clamped = actual?.clamp([minNotNull, maxNotNull])

  const styles = useStyles(
    () => ({
      container: { width: "100%" },
      inputsContainer: { display: "flex", alignItems: "center" },
      buttonContainer: { flexShrink: 0, marginRight: 5 },
    }),
    []
  )

  return (
    <div style={styles.container}>
      <Label text={label} />
      <div style={styles.inputsContainer}>
        <IconButton style={styles.buttonContainer} icon="PLUS_CIRCLE" onClick={handleShowModal} />
        <XYCoordInputs value={clamped} min={minNotNull} onChange={handleChangeValue} />
      </div>
      <OverlayPanel ref={overlayPanelRef}>
        <Slider2D value={clamped} min={minNotNull} max={maxNotNull} onChange={handleChangeValue} />
      </OverlayPanel>
    </div>
  )
}

export default axiMemo(AxiSlider2D)
