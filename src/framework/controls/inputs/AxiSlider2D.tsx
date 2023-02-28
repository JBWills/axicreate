import React, { MouseEvent, useCallback, useRef, useState } from "react"

import "./AxiSlider2D.css"
import { OverlayPanel } from "primereact/overlaypanel"

import Slider2D from "./Slider2D"
import XYCoordInputs from "./XYCoordInputs"
import { Vec2Object, Vec2, formatVec2 } from "../../../types/Vec2"
import { clampVec2 } from "../../../util/clamp"
import { vec2Plus, vec2Minus } from "../../../util/vec/vec2Arithmetic"
import IconButton from "../../components/IconButton"
import Label from "../../components/Label"

interface AxiSlider2DProps {
  label: string
  value?: Vec2Object
  min?: Vec2
  max?: Vec2
  onChange?: (e: Vec2Object) => void
}

function getMinMaxDefaults(
  min: Vec2 | undefined,
  max: Vec2 | undefined
): [Vec2, Vec2] {
  if (min === undefined && max === undefined) {
    return [
      [0, 0],
      [1, 1],
    ]
  }

  if (min === undefined && max !== undefined) {
    return [vec2Minus(max, 1), max]
  }

  if (max === undefined && min !== undefined) {
    return [min, vec2Plus(min, 1)]
  }

  return [min as Vec2, max as Vec2]
}

function AxiSlider2D({ label, onChange, value, min, max }: AxiSlider2DProps) {
  const [local, setLocal] = useState<Vec2Object | undefined>(undefined)
  const overlayPanelRef = useRef<OverlayPanel>(null)
  const handleChangeValue = useCallback(
    (e: Vec2) => {
      const obj = formatVec2(e)
      setLocal(obj)
      onChange?.(obj)
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

  const clamped =
    actual !== undefined
      ? clampVec2(actual, [minNotNull, maxNotNull])
      : undefined

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
