import React, { useCallback } from "react"

import "./AxiColorPicker.css"
import {
  ColorPicker,
  ColorPickerChangeEvent,
  ColorPickerRGBType,
} from "primereact/colorpicker"

import { RgbColor } from "../../../types/color"
import Label from "../../components/Label"

interface AxiColorPickerProps {
  label: string
  onChange?: (rgb: RgbColor) => void
}

function AxiColorPicker({ label, onChange }: AxiColorPickerProps) {
  const handleChange = useCallback(
    (e: ColorPickerChangeEvent) =>
      onChange?.({ type: "rgb", ...(e.value as ColorPickerRGBType) }),
    [onChange]
  )
  return (
    <div className="AxiColorPicker">
      <Label text={label} />
      <ColorPicker onChange={handleChange} type="rgb" />
    </div>
  )
}

export default React.memo(AxiColorPicker)
