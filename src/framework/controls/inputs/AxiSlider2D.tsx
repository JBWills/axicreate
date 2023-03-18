import React, { MouseEvent, useCallback, useRef, useState } from "react"

import "./AxiSlider2D.css"
import { OverlayPanel } from "primereact/overlaypanel"

import Slider2D from "./Slider2D"
import XYCoordInputs from "./XYCoordInputs"
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
    (e: MouseEvent<HTMLButtonElement>) => {
      overlayPanelRef.current?.toggle(e)
    },
    [overlayPanelRef]
  )

  const actual = value ?? local

  const [minNotNull, maxNotNull] = getMinMaxDefaults(min, max)

  const clamped = actual?.clamp([minNotNull, maxNotNull])

  return (
    <div className="AxiSlider2D">
      <Label text={label} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexShrink: 0, marginRight: 5 }}>
          <IconButton icon="PLUS_CIRCLE" onClick={handleShowModal} />
        </div>
        <XYCoordInputs value={clamped} min={minNotNull} onChange={onChange} />
      </div>
      <OverlayPanel ref={overlayPanelRef}>
        <Slider2D
          value={clamped}
          min={minNotNull}
          max={maxNotNull}
          onChange={handleChangeValue}
        />
      </OverlayPanel>
    </div>
  )
}

export default React.memo(AxiSlider2D)
