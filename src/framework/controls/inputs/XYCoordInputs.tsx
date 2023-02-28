import React from "react"

import AxiInputNumber from "./AxiInputNumber"
import { Vec2Object, Vec2, formatVec2 } from "../../../types/Vec2"
import getNumberFixedDigits from "../../../util/getNumberFixedDigits"

export default function XYCoordInputs({
  value,
  min,
  onChange,
}: {
  value: Vec2 | undefined
  min: Vec2
  onChange?: (v: Vec2Object) => void
}) {
  const valueObj = formatVec2(value)
  const minObj = formatVec2(min)
  return (
    <>
      <AxiInputNumber
        label="x"
        labelDir="left"
        value={getNumberFixedDigits(valueObj?.x)}
        onChange={(x) => onChange?.(formatVec2([x, valueObj?.y ?? minObj.y]))}
      />
      <AxiInputNumber
        label="y"
        labelDir="left"
        value={getNumberFixedDigits(valueObj?.y)}
        onChange={(y) => onChange?.(formatVec2([valueObj?.x ?? minObj.x, y]))}
      />
    </>
  )
}
