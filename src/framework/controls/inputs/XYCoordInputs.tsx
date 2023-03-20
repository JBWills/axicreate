import React from "react"

import AxiInputNumber from "./AxiInputNumber"
import { useStyles } from "../../../hooks/useStyles"
import { V2 } from "../../../types/V2"
import getNumberFixedDigits from "../../../util/getNumberFixedDigits"

export default function XYCoordInputs({
  value,
  min,
  onChange,
}: {
  value: V2 | undefined
  min: V2
  onChange?: (v: V2) => void
}) {
  const styles = useStyles(
    () => ({
      gap: { padding: 10 },
    }),
    []
  )
  return (
    <>
      <AxiInputNumber
        label="x"
        labelDir="left"
        value={getNumberFixedDigits(value?.x)}
        onChange={(x) => onChange?.(new V2(x, value?.y ?? min.y))}
      />
      <div style={styles.gap} />
      <AxiInputNumber
        label="y"
        labelDir="left"
        value={getNumberFixedDigits(value?.y)}
        onChange={(y) => onChange?.(new V2(value?.x ?? min.x, y))}
      />
    </>
  )
}
