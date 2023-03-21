import React, { useCallback } from "react"

import {
  ColorPicker,
  ColorPickerChangeEvent,
  ColorPickerRGBType,
} from "primereact/colorpicker"

import { axiMemo } from "../../../hooks/genericMemo"
import { useStyles } from "../../../hooks/useStyles"
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

  const styles = useStyles(
    () => ({
      container: { width: "100%" },
    }),
    []
  )
  return (
    <div style={styles.container}>
      <Label text={label} />
      <ColorPicker onChange={handleChange} type="rgb" />
    </div>
  )
}

export default axiMemo(AxiColorPicker)
